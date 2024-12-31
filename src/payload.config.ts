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

import { Media } from './collections/Media'
import { Posts } from './collections/Post'
import { Faqs } from './globals/Faq'

import { Categories } from './collections/Categories'
import { Notification } from './collections/Noti'
import { Users } from './collections/Users'
import { ReplaceVideoEndpoint } from './views/ReplaceVideo/action'

import PostSub from './collections/Post-sub'
import AboutUs from './globals/AboutUs'
import ShareLink from './globals/ShareLink'
import SoiCau from './globals/SoiCau'
import { BannerGlobal } from './globals/Banner'
import Support from './globals/Support'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  debug: true,
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
    components: {
      Nav: '/components/Nav/index',
      graphics: {
        Icon: '/components/Logo/Icon',
        Logo: '/components/Logo/Icon',
      },
      views: {
        pushNotification: {
          Component: '/views/Push-notification/index',
          path: '/push-notification',
        },
        replaceVideo: {
          Component: '/views/ReplaceVideo/index',
          path: '/video-replace',
        },
      },
    },
    meta: {
      titleSuffix: ' - Thần sổ xố',
      icons: [
        {
          url: 'https://bachtuocso789.org/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Flogo.6b7d4694.png&w=128&q=75',
        },
      ],
    },
  },

  collections: [Posts, Notification, Categories, Users, Media, PostSub],
  globals: [Faqs, SoiCau, AboutUs, ShareLink, BannerGlobal, Support],

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
  plugins: [payloadCloudPlugin()],
  endpoints: [ReplaceVideoEndpoint],
})
