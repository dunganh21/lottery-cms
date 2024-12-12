import { UserRole } from '@/types/User'
import { HTMLConverterFeature, lexicalEditor, lexicalHTML } from '@payloadcms/richtext-lexical'
import type { CollectionConfig } from 'payload'
import { formatSlug } from './hooks/formatSlug'
import { loggedIn } from './access/loggedIn'

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
    hideAPIURL: true,
  },

  access: {
    // Writers and above can create posts
    create: loggedIn,
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
      type: 'text',
      required: true,
    },

    {
      name: 'author',
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
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'tags',
      type: 'relationship',
      relationTo: 'tags',
      hasMany: true,
    },

    {
      name: 'rawContent',
      type: 'richText',
      required: true,
      editor: lexicalEditor({
        features: ({ defaultFeatures }) => [
          ...defaultFeatures,
          // The HTMLConverter Feature is the feature which manages the HTML serializers.
          // If you do not pass any arguments to it, it will use the default serializers.
          HTMLConverterFeature({}),
        ],
      }),
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
