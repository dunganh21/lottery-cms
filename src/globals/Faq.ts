import type { GlobalConfig } from 'payload'

export const Faqs: GlobalConfig = {
  slug: 'faqs',
  label: {
    singular: 'Câu hỏi thường gặp',
    plural: 'Câu hỏi thường gặp',
  },

  admin: {
    group: 'Quản lí chung',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'faqItems',
      type: 'array',
      label: 'Danh sách câu hỏi',
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
    },
  ],
}
