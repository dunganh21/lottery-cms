import { lexicalHTML } from '@payloadcms/richtext-lexical'
import { validateUrl } from '@/utils/validate'
import type { GlobalConfig } from 'payload'
import _ from 'lodash'

const Popup: GlobalConfig = {
  slug: 'popup',
  label: {
    singular: 'Popup',
    plural: 'Popup',
  },
  admin: {
    group: 'Quản lí chung',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Tiêu đề',
      required: true,
    },
    {
      name: 'content',
      type: 'richText',
      label: 'Nội dung',
      required: true,
    },
    lexicalHTML('content', { name: 'htmlContent', hidden: true, storeInDB: true }),
    {
      name: 'image',
      type: 'upload',
      label: 'Ảnh',
      relationTo: 'media',
    },
    {
      name: 'link',
      type: 'text',
      label: 'Link',
      validate: validateUrl,
    },
    {
      name: 'buttonText',
      type: 'text',
      label: 'Nội dung nút',
    },
    {
      name: 'displayDate',
      type: 'date',
      label: 'Thời gian hiển thị',
      admin: {
        date: {
          pickerAppearance: 'dayAndTime',
        },
      },
    },
    {
      name: 'frequency',
      type: 'select',
      label: 'Tần suất hiển thị',
      options: [
        {
          label: 'Mỗi lần truy cập',
          value: 'every_visit',
        },
        {
          label: 'Hàng ngày',
          value: 'once_per_day',
        },
        {
          label: 'Hàng tuần',
          value: 'once_per_week',
        },
        {
          label: 'Hàng tháng',
          value: 'once_per_month',
        },
        {
          label: 'Hàng năm',
          value: 'once_per_year',
        },
        {
          label: 'Một lần duy nhất',
          value: 'once',
        },
      ],
      defaultValue: 'every_visit',
    },
    {
      name: 'isActive',
      type: 'checkbox',
      label: 'Kích hoạt',
      defaultValue: false,
    },
  ],
  hooks: {
    afterRead: [
      async ({ doc, req }) => {
        if (req.payloadAPI === 'local') {
          return doc
        }

        return {
          ...doc,
          image: doc.image?.thumbnailURL,
        }
      },
    ],
  },
}

export default Popup
