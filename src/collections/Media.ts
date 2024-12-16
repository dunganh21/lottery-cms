import type { CollectionConfig } from 'payload'
import { loggedIn, notGuest } from './access/access-right'

export const Media: CollectionConfig = {
  slug: 'media',
  access: {
    create: notGuest,
    update: notGuest,
    delete: notGuest,
  },
  admin: {
    group: 'Tài nguyên',
  },

  upload: {
    staticDir: process.env.ASSETS_DIR,
    imageSizes: [
      {
        name: 'avatar',
        width: 400,
        height: 300,
        position: 'centre',
      },
      {
        name: 'thumbnail',
        width: 768,
        height: 1024,
        position: 'centre',
      },
    ],
    adminThumbnail: ({ doc }: any) => {
      return `${process.env.PUBLIC_ASSETS_URL}/${doc.filename}?${new Date().getTime()}`
    },
    mimeTypes: ['image/png', 'image/jpeg', 'image/gif', 'image/webp'],
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
      label: 'Alt Text',
    },
    {
      name: 'caption',
      type: 'text',
      label: 'Caption',
    },
    {
      name: 'filename',
      type: 'text',
      admin: {
        readOnly: true,
      },
    },
  ],
}
