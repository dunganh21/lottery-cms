import { UserRole } from '@/types/User'
import { lexicalHTML } from '@payloadcms/richtext-lexical'
import type { CollectionConfig } from 'payload'
import { loggedIn, notGuest } from './access/access-right'
import { formatSlug } from './hooks/formatSlug'

export const Posts: CollectionConfig = {
  slug: 'post',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'tags', 'rawContent', 'author', 'createdAt'],

    livePreview: {
      url: ({ data }) => {
        const isHomePage = data.slug === 'home'
        const urlReturn = `${process.env.NEXT_PUBLIC_SERVER_URL}${!isHomePage ? `/${data.slug}` : ''}`
        return urlReturn
      },
    },
    // hideAPIURL: true,
    group: 'Bài viết',
  },
  // endpoints: [ReplaceVideoEndpoint],
  labels: {
    singular: 'Bài viết',
    plural: 'Danh sách bài viết',
  },
  access: {
    // Writers and above can create posts
    create: notGuest,
    // Writers can update their own posts, moderators and root can update any
    update: ({ req: { user }, data }) => {
      if (!user || !data) return false
      if (user.role === UserRole.Root || user.role === UserRole.Moderator) return true
      return user.role === UserRole.Writer && data.author === user.id
    },

    // Only moderators and root can delete posts
    delete: ({ req: { user } }) =>
      user?.role ? [UserRole.Moderator, UserRole.Root].includes(user.role as UserRole) : false,
  },
  defaultPopulate: {
    author: {
      username: true,
    },
  },
  fields: [
    {
      name: 'title',
      label: 'Tiêu đề',
      type: 'text',
      required: true,
    },

    {
      name: 'author',
      label: 'Tác giả',
      type: 'relationship',
      relationTo: 'users',
      hasMany: false,
      access: {
        read: ({ req: { user } }) => user?.role === UserRole.Root,
        create: ({ req: { user } }) => user?.role === UserRole.Root,
        update: ({ req: { user } }) => user?.role === UserRole.Root,
      },
    },
    {
      name: 'thumbnail',
      label: 'Thumbnail',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'categories',
      label: 'Chủ đề',
      type: 'relationship',
      relationTo: 'categories',
      hasMany: true,
    },
    {
      name: 'rawContent',
      label: 'Nội dung',
      type: 'richText',
      required: true,
    },
    {
      name: 'youtubeLink',
      type: 'text',
      required: true,
      validate: async (value: any): Promise<string | true> => {
        if (!value) return true
        if (Array.isArray(value)) return 'YouTube link must be a single URL'
        const isValid = /^(https?:\/\/)?(www\.)?youtube\.com\/watch\?v=[\w-]{11}$/.test(value)
        return isValid ? true : 'Invalid YouTube video URL format'
      },
    },

    lexicalHTML('rawContent', { name: 'htmlContent', hidden: true, storeInDB: true }),
    {
      name: 'slug',
      type: 'text',
      hooks: {
        beforeValidate: [formatSlug('title')],
      },
      index: true,
      label: 'Slug',
      admin: {
        hidden: true,
      },
    },
  ],

  hooks: {
    beforeChange: [
      async ({ req, data }) => {
        if (!data.author && req.user?.id) {
          // Add user id thành author sau khi save
          return {
            ...data,
            author: req.user?.id,
          }
        }
      },
    ],
  },
  timestamps: true,
}
