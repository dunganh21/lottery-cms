import { lexicalHTML } from '@payloadcms/richtext-lexical'
import { GlobalConfig } from 'payload'

const AboutUs: GlobalConfig = {
  slug: 'about-us',
  label: {
    singular: 'Về chúng tôi',
    plural: 'Về chúng tôi',
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
      type: 'richText',
      label: 'Nội dung',
      required: true,
    },
    lexicalHTML('content', { name: 'htmlContent', hidden: true, storeInDB: true }),
  ],
}

export default AboutUs
