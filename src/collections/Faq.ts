import type { CollectionConfig } from 'payload'
import { loggedIn } from './access/loggedIn'

export const Faqs: CollectionConfig = {
  slug: 'faqs',
  labels: {
    singular: 'Câu hỏi thường gặp',
    plural: 'Câu hỏi thường gặp',
  },

  admin: {
    useAsTitle: 'question',
    defaultColumns: ['question', 'answer', 'createdAt'],
    group: 'Quản lí tổng',
  },
  access: {
    create: loggedIn,
    update: loggedIn,
    delete: loggedIn,
  },
  fields: [
    {
      name: 'question',
      type: 'text',
      required: true,
    },
    {
      name: 'answer',
      type: 'textarea',
      required: true,
    },
  ],
  timestamps: true,
}
