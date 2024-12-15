import type { CollectionConfig } from 'payload'
import { loggedIn } from './access/loggedIn'

export const Categories: CollectionConfig = {
  slug: 'categories',
  admin: {
    useAsTitle: 'label',
    defaultColumns: ['label', 'createdAt'],
    group: 'Bài viết',
    hideAPIURL: true,
  },
  labels: {
    singular: 'Danh mục',
    plural: 'Danh mục',
  },
  access: {
    create: loggedIn,
    update: loggedIn,
    delete: loggedIn,
  },
  fields: [
    {
      name: 'label',
      type: 'text',
      required: true,
    },
  ],
  timestamps: true,
}
