import { validateUrl } from '@/utils/validate'
import _ from 'lodash'
import type { CollectionConfig } from 'payload'
import { isAdmin } from './access/access-right'

export const Notification: CollectionConfig = {
  slug: 'notification',
  labels: {
    singular: 'Thông báo lập lịch',
    plural: 'Thông báo lập lịch',
  },

  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'content', 'pushType', 'pushTimeDate', 'pushTimeHour'],
    hideAPIURL: true,
    group: 'Thông báo',
  },
  access: {
    read: () => true,
    create: isAdmin,
    update: isAdmin,
    delete: isAdmin,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      label: 'Tiêu đề',
    },
    {
      name: 'content',
      type: 'textarea',
      required: true,
      label: 'Nội dung',
    },
    {
      name: 'link',
      type: 'text',
      label: 'Link',
      validate: validateUrl,
    },
    {
      name: 'pushType',
      label: 'Loại thông báo',
      type: 'select',
      options: [
        {
          label: 'Thông báo một lần',
          value: 'once',
        },
        {
          label: 'Thông báo lặp lại',
          value: 'schedule',
        },
      ],
      required: true,
      defaultValue: 'once',
    },
    {
      name: 'pushTimeDate',
      label: 'Ngày thông báo',
      type: 'date',
      required: true,
      admin: {
        condition: (data) => data.pushType === 'once',
        date: {
          pickerAppearance: 'dayAndTime',
          displayFormat: 'MMM d, yyyy h:mm a',
        },
      },
    },
    {
      name: 'pushTimeHour',
      label: 'Giờ thông báo',
      type: 'date',
      required: true,
      admin: {
        condition: (data) => data.pushType === 'schedule',
        date: {
          pickerAppearance: 'timeOnly',
          displayFormat: 'h:mm a',
        },
      },
    },
  ],
  hooks: {
    afterRead: [
      async ({ doc, req }) => {
        if (req.payloadAPI === 'local') {
          return doc
        }
        let pushTime = ''
        if (doc.pushType === 'once') {
          pushTime = doc.pushTimeDate || ''
        } else {
          pushTime = doc.pushTimeHour || ''
        }
        return {
          ..._.omit(doc, ['pushTimeDate', 'pushTimeHour']),
          pushTime,
        }
      },
    ],
    afterChange: [
      async ({ doc }) => {
        fetch(`${process.env.NEXT_PUBLIC_API_SERVER_URL}/api/v1/notification/schedule`, {
          method: 'POST',
          body: JSON.stringify(doc),
          headers: {
            'Content-Type': 'application/json',
          },
        })
      },
    ],
    beforeDelete: [
      async ({ id }) => {
        fetch(`${process.env.NEXT_PUBLIC_API_SERVER_URL}/api/v1/notification/schedule/${id}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
        })
      },
    ],
  },
  timestamps: true,
}
