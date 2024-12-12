import type { CollectionConfig } from 'payload'
import { loggedIn } from './access/loggedIn'

export const Tags: CollectionConfig = {
  slug: 'tags',
  admin: {
    useAsTitle: 'tag',
    defaultColumns: ['tag', 'createdAt'],
  },
  access: {
    create: loggedIn,
    update: loggedIn,
    delete: loggedIn,
  },
  fields: [
    {
      name: 'tag',
      type: 'text',
      required: true,
    },
  ],
  timestamps: true,
}
