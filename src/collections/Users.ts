import { UserRole } from '@/types/User'
import type { CollectionConfig } from 'payload'
import { isRoot } from './access/access-right'

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
    read: isRoot,
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
        { label: 'Guest', value: UserRole.Guest },
        { label: 'Writer', value: UserRole.Writer },
        { label: 'Moderator', value: UserRole.Moderator },
        { label: 'Root Admin', value: UserRole.Root },
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
}
