import type { Access, CollectionConfig } from 'payload'
import { UserRole } from '@/types/User'
import { IPost } from '@/types/bridge'
import { HTMLConverterFeature, lexicalEditor, lexicalHTML } from '@payloadcms/richtext-lexical'

export const Posts: CollectionConfig = {
  slug: 'bridge',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'author', 'rawContent', 'createdAt'],
  },

  access: {
    // Writers and above can create posts
    create: ({ req: { user } }) =>
      user?.role
        ? [UserRole.Writer, UserRole.Moderator, UserRole.Root].includes(user.role as UserRole)
        : false,
    // Writers can update their own posts, moderators and root can update any
    update: (({ req: { user }, data }) => {
      if (!user || !data) return false
      if (user.role === UserRole.Root || user.role === UserRole.Moderator) return true
      return user.role === UserRole.Writer && data.author === user.id
    }) as Access<IPost>,

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
      admin: {
        position: 'sidebar',
      },
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
      admin: {
        position: 'sidebar',
      },
    },
    {
      name: 'youtubeLink',
      type: 'text',
      required: true,
      admin: {
        position: 'sidebar',
      },
    },

    lexicalHTML('rawContent', { name: 'htmlContent', hidden: true, storeInDB: true }),
  ],

  hooks: {
    beforeChange: [
      async ({ req, data }) => {
        if (!data.author && req.user?.id) {
          console.log('[DEBUG] / beforeChange:', data, req.user?.id)
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
