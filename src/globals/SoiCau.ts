import { validateFacebookUrl, validateYoutubeUrl } from '@/utils/validate'
import { GlobalConfig } from 'payload'

const SoiCau: GlobalConfig = {
  slug: 'soi-cau',
  label: {
    singular: 'Cấu hình video soi cầu',
    plural: 'Cấu hình video soi cầu',
  },
  admin: {
    group: 'Quản lí chung',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'youtubeVideo',
      type: 'text',
      label: 'URL video YouTube',
      required: true,
      validate: validateYoutubeUrl,
    },
    {
      name: 'facebookVideo',
      type: 'text',
      label: 'URL video Facebook',
      required: true,
      validate: validateFacebookUrl,
    },
  ],
}

export default SoiCau
