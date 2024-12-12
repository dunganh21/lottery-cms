import type { CollectionConfig } from 'payload'
import { loggedIn } from './access/loggedIn'

export const Notification: CollectionConfig = {
  slug: 'notification',
  admin: {
    useAsTitle: 'content',
    defaultColumns: ['content', 'pushTime', 'createdAt'],
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
    },
    {
      name: 'pushTime',
      type: 'date',
      required: true,
      admin: {
        date: {
          pickerAppearance: 'dayAndTime',
          displayFormat: 'MMM d, yyyy h:mm a',
        },
      },
    },
  ],
  timestamps: true,
}
