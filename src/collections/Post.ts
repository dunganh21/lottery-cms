import { Post } from '@/payload-types'
import { UserRole } from '@/types/User'
import { validateYoutubeUrl } from '@/utils/validate'
import { lexicalHTML } from '@payloadcms/richtext-lexical'
import type { CollectionConfig } from 'payload'
import { notGuest } from './access/access-right'
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
  labels: {
    singular: 'Bài viết',
    plural: 'Danh sách bài viết',
  },
  access: {
    // Writers and above can create posts
    read: () => true,
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
        read: () => true,
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
      name: 'tags',
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
      label: 'URL video YouTube',
      type: 'text',
      required: true,
      validate: validateYoutubeUrl,
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
    afterRead: [
      async ({ doc, findMany }) => {
        if (findMany) {
          return {
            title: doc.title,
            id: doc.id,
            authorName: doc.author?.username,
            authorAvatar: doc.author?.avatar?.thumbnailURL,
            thumbnail: doc.thumbnail?.thumbnailURL,
          }
        } else {
          return {
            title: doc.title,
            id: doc.id,
            authorName: doc.author?.username,
            authorAvatar: doc.author?.avatar?.thumbnailURL,
            thumbnail: doc.thumbnail?.thumbnailURL,
            content: doc.htmlContent,
            youtubeLink: doc.youtubeLink,
            tags: (doc.tags || []).map((tag: any) => tag.label),
          }
        }
      },
    ],
  },
  timestamps: true,

  endpoints: [
    {
      path: '/subscribes',
      method: 'get',
      handler: async ({ user, payload }) => {
        if (!user?.id) {
          return Response.json('Unauthorized', {
            status: 401,
          })
        }

        const postSubscribes = await payload.find({
          collection: 'post-subscribes',
          where: {
            userId: { equals: user?.id },
          },
          select: {
            postIds: true,
          },
        })

        if (!postSubscribes.docs.length && !postSubscribes.docs[0].postIds?.length) {
          return Response.json([])
        }

        const postFormat = postSubscribes.docs[0].postIds as Post[]
        return Response.json({
          docs: postFormat,
          totalDocs: postFormat.length,
          limit: postFormat.length,
          totalPages: 1,
          page: 1,
          pagingCounter: 1,
          hasPrevPage: false,
          hasNextPage: false,
          prevPage: null,
          nextPage: null,
        })
      },
    },
  ],
}
