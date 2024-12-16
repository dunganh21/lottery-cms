// storage-adapter-import-placeholder
import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { payloadCloudPlugin } from '@payloadcms/payload-cloud'
import {
  FixedToolbarFeature,
  HTMLConverterFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'
import path from 'path'
import { buildConfig } from 'payload'
import sharp from 'sharp'
import { fileURLToPath } from 'url'

import { Faqs } from './collections/Faq'
import { Media } from './collections/Media'
import { Posts } from './collections/Post'

import { Users } from './collections/Users'
import { Notification } from './collections/Noti'
import { Categories } from './collections/Categories'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  debug: true,
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
    // components: {
    //   Nav: '/components/Nav/index',
    // },
    components: {
      views: {
        myCustomView: {
          Component: '/views/Push-noti',
          path: '/push-notification',
        },
      },
    },
  },

  collections: [Posts, Notification, Faqs, Categories, Users, Media],
  // globals: [Users, Media],

  editor: lexicalEditor({
    features: ({ defaultFeatures }) => [
      ...defaultFeatures,
      FixedToolbarFeature(),
      HTMLConverterFeature(),
    ],
  }),

  secret: process.env.PAYLOAD_SECRET || '',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: mongooseAdapter({
    url: process.env.DATABASE_URI || '',
  }),
  sharp,
  plugins: [
    payloadCloudPlugin(),
    // storage-adapter-placeholder
  ],
})
