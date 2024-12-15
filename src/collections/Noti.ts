import type { CollectionConfig } from 'payload'
import { loggedIn } from './access/loggedIn'

export const Notification: CollectionConfig = {
  slug: 'notification',
  labels: {
    singular: 'Thông báo lập lịch',
    plural: 'Thông báo lập lịch',
  },

  admin: {
    useAsTitle: 'content',
    defaultColumns: ['content', 'pushTime', 'createdAt'],
    group: 'Thông báo',
  },
  access: {
    create: loggedIn,
    update: loggedIn,
    delete: loggedIn,
  },
  fields: [
    {
      name: 'content',
      type: 'text',
      required: true,
      label: 'Nội dung',
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
      name: 'pushTime',
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
      name: 'pushTimeLocal',
      label: 'Thời gian thông báo',
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
  timestamps: true,
}
