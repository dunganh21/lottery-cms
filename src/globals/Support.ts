import { validateUrl } from '@/utils/validate'
import { GlobalConfig } from 'payload'

const Support: GlobalConfig = {
  slug: 'support',
  label: {
    singular: 'Hỗ trợ',
    plural: 'Hỗ trợ',
  },
  admin: {
    group: 'Quản lí chung',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'content',
      type: 'text',
      label: 'Nội dung',
      required: true,
    },
    {
      name: 'link',
      type: 'text',
      label: 'Link',
      required: true,
      validate: validateUrl,
    },
  ],
}

export default Support
