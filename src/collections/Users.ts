import { UserRole } from '@/types/User'
import type { CollectionConfig } from 'payload'

export const Users: CollectionConfig = {
  slug: 'users',
  admin: {
    useAsTitle: 'username',
  },

  access: {
    // Only root admins can create users
    create: ({ req: { user } }) => user?.role === UserRole.Root,
    // Only root admins can update users
    update: ({ req: { user } }) => user?.role === UserRole.Root,
    // Only root admins can delete users
    delete: ({ req: { user } }) => user?.role === UserRole.Root,
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
