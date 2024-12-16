import type { CollectionConfig } from 'payload'
import { loggedIn, notGuest } from './access/access-right'

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
    read: () => true,
    create: notGuest,
    update: notGuest,
    delete: notGuest,
  },
  fields: [
    {
      name: 'question',
      type: 'text',
      required: true,
      label: 'Câu hỏi',
    },
    {
      name: 'answer',
      type: 'textarea',
      required: true,
      label: 'Câu trả lời',
    },
  ],
  timestamps: true,
}
