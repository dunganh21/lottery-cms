import { UserRole } from '@/types/User'
import type { CollectionConfig } from 'payload'
import { isRoot } from './access/access-right'
import { validateAge, validateEmail } from '@/utils/validate'

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
    create: () => true,
    update: ({ req: { user }, id }) => {
      if (!user) return false
      if (user.role === UserRole.Root) return true
      return user.id === id
    },
    delete: isRoot,
  },

  auth: {
    loginWithUsername: {
      allowEmailLogin: true,
      requireEmail: false,
      requireUsername: true,
    },
    maxLoginAttempts: 0,
  },
  fields: [
    {
      name: 'email',
      type: 'email',
      label: 'Email',
      required: true,
      validate: validateEmail,
    },
    {
      name: 'role',
      type: 'select',
      defaultValue: UserRole.Writer,
      options: [
        { label: 'Khách', value: UserRole.Guest },
        { label: 'Người dùng', value: UserRole.User },
        { label: 'Người viết bài', value: UserRole.Writer },
        { label: 'Kiểm duyệt bài viết', value: UserRole.Moderator },
        { label: 'Quản trị viên', value: UserRole.Root },
      ],
      access: {
        // update: () => true,
        update: ({ req: { user }, id, data }) => {
          if (!user) return false
          if (user?.role === UserRole.Root) return true

          // Only allow update own user info
          if (user.id !== id) return false
          return (data as any)?.role === UserRole.User
        },
      },
    },
    {
      name: 'gender',
      type: 'select',
      options: [
        { label: 'Nam', value: 'male' },
        { label: 'Nữ', value: 'female' },
      ],
      label: 'Giới tính',
    },
    {
      name: 'age',
      type: 'number',
      label: 'Tuổi',
      validate: validateAge,
    },
    {
      name: 'city',
      type: 'text',
      label: 'Tỉnh/Thành phố',
    },
    {
      name: 'firebaseKey',
      type: 'text',
      label: 'Firebase Key',
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
