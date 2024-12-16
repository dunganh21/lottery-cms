import type { CollectionConfig } from 'payload'
import { notGuest } from './access/access-right'

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
    read: () => true,
    create: notGuest,
    update: notGuest,
    delete: notGuest,
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
