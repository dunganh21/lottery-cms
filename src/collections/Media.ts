import type { CollectionConfig } from 'payload'

export const Media: CollectionConfig = {
  slug: 'media',
  access: {
    read: () => true,
  },
  upload: {
    staticDir: 'media',
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
