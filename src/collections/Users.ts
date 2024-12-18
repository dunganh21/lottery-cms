import { UserRole } from '@/types/User'
import type { CollectionConfig } from 'payload'
import { isRoot, notGuest } from './access/access-right'

export const Users: CollectionConfig = {
  slug: 'users',
  labels: {
    singular: 'Người dùng',
    plural: 'Người dùng',
  },
  admin: {
    useAsTitle: 'username',
    // @ts-ignore
    group: 'Tài nguyên',
  },

  access: {
    read: () => true,
    create: isRoot,
    update: isRoot,
    delete: isRoot,
  },

  auth: {
    loginWithUsername: {
      allowEmailLogin: true,
      requireEmail: false,
      requireUsername: true,
    },
  },
  fields: [
    {
      name: 'phoneNumber',
      type: 'text',
    },
    {
      name: 'role',
      type: 'select',
      defaultValue: UserRole.Writer,
      options: [
        { label: 'Người dùng', value: UserRole.User },
        { label: 'Người viết bài', value: UserRole.Writer },
        { label: 'Kiểm duyệt bài viết', value: UserRole.Moderator },
        { label: 'Quản trị viên', value: UserRole.Root },
      ],
      access: {
        update: ({ req: { user } }) => user?.role === UserRole.Root,
      },
    },
    {
      name: 'avatar',
      type: 'upload',
      relationTo: 'media',
    },
  ],
  hooks: {
    afterRead: [
      async ({ req: { user }, doc }) => {
        // Not logged in - only allow reading writer and above roles
        if (!user && [UserRole.Guest, UserRole.User].includes(doc.role)) {
          return null
        }

        // Logged in - allow reading writer and above roles, plus own user info
        if (user && [UserRole.Guest, UserRole.User].includes(doc.role) && doc.id !== user.id) {
          return null
        }

        return doc
      },
    ],
  },
}
