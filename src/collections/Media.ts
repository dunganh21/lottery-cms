import type { CollectionConfig } from 'payload'
import { notGuest } from './access/access-right'

export const Media: CollectionConfig = {
  slug: 'media',
  access: {
    read: () => true,
    create: () => true,
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
      return `${process.env.NEXT_PUBLIC_SERVER_URL}/api/media/file/${doc.filename}`
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
  hooks: {
    beforeOperation: [
      ({ req, operation }) => {
        if ((operation === 'create' || operation === 'update') && req.file) {
          const currentFileName = req.file.name
          req.file.name = currentFileName.replaceAll(' ', '-')
        }
      },
    ],
  },
}
