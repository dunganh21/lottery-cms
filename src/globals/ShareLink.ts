import { validateUrl } from '@/utils/validate'
import { GlobalConfig } from 'payload'

const ShareLink: GlobalConfig = {
  slug: 'share-link',
  label: {
    singular: 'Link chia sẻ',
    plural: 'Link chia sẻ',
  },
  admin: {
    group: 'Quản lí chung',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'link',
      type: 'text',
      label: 'Link chia sẻ',
      required: true,
      validate: validateUrl,
    },
  ],
}

export default ShareLink
