import { CollectionConfig } from 'payload'

const UserSub: CollectionConfig = {
  slug: 'post-subscribes',
  admin: {
    hidden: true, // Hides from admin UI
  },
  access: {
    read: () => false,
    create: () => false,
    update: () => false,
    delete: () => false,
  },
  fields: [
    {
      name: 'userId',
      type: 'relationship',
      relationTo: 'users',
      required: true,
    },
    {
      name: 'postIds',
      type: 'relationship',
      relationTo: 'post',
      hasMany: true,
    },
  ],
}

export default UserSub
