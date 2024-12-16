import type { CollectionConfig } from 'payload'
import { loggedIn, notGuest } from './access/access-right'
import { Notification as NotificationType } from '../payload-types'

export const Notification: CollectionConfig = {
  slug: 'notification',
  labels: {
    singular: 'Thông báo lập lịch',
    plural: 'Thông báo lập lịch',
  },

  admin: {
    useAsTitle: 'content',
    defaultColumns: ['title', 'content', 'pushType', 'pushTimeDate', 'pushTimeHour'],
    hideAPIURL: true,
    group: 'Thông báo',
  },
  access: {
    read: () => true,
    create: notGuest,
    update: notGuest,
    delete: notGuest,
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
    // afterRead: [
    //   async ({ doc }: { doc: NotificationType }) => {
    //     let pushTime = ''
    //     if (doc.pushType === 'once') {
    //       pushTime = doc.pushTimeDate || ''
    //     } else {
    //       pushTime = doc.pushTimeHour || ''
    //     }
    //     const { pushType, id } = doc
    //     return {
    //       pushType,
    //       pushTime,
    //       id,
    //     }
    //   },
    // ],
  },
  timestamps: true,
}
