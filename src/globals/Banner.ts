import { validateUrl } from '@/utils/validate'
import type { GlobalConfig } from 'payload'

export const BannerGlobal: GlobalConfig = {
  slug: 'banner',
  label: {
    singular: 'Banner',
    plural: 'Banner',
  },
  admin: {
    group: 'Quản lí chung',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'bannerItems',
      type: 'array',
      label: 'Danh sách banner',
      fields: [
        {
          name: 'banner',
          type: 'upload',
          required: true,
          label: 'Ảnh banner',
          relationTo: 'media',
        },
        {
          name: 'link',
          type: 'text',
          required: true,
          label: 'Link',
          validate: validateUrl,
        },
      ],
    },
  ],
}
