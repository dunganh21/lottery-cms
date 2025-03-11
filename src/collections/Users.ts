import { UserRole } from '@/types/User'
import type { CollectionConfig } from 'payload'
import { isRoot } from './access/access-right'
import { validateAge, validateEmail } from '@/utils/validate'
import _ from 'lodash'

export const Users: CollectionConfig = {
  slug: 'users',
  labels: {
    singular: 'Người dùng',
    plural: 'Người dùng',
  },
  admin: {
    useAsTitle: 'fullName',
    // @ts-ignore
    group: 'Tài nguyên',
    defaultColumns: ['fullName', 'email', 'role', 'createdAt'],
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
      name: 'fullName',
      type: 'text',
      label: 'Họ tên',
    },
    {
      name: 'phoneNumber',
      type: 'text',
      label: 'Số điện thoại',
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
        // Generate default name for low privilege users without fullName
        if (!doc.fullName) {
          if ([UserRole.Guest, UserRole.User].includes(doc.role)) {
            return {
              ...doc,
              fullName: `Guest_${doc.id.slice(-4)}`,
            }
          } else {
            return {
              ...doc,
              fullName: `${_.capitalize(doc?.role as string)}_${doc.id.slice(-4)}`,
            }
          }
        }

        return doc
      },
    ],
  },
}
