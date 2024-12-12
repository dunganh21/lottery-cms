'use client'
import { useLivePreview } from '@payloadcms/live-preview-react'
import { Post as PostType } from '@/payload-types'
import { RichText } from '@payloadcms/richtext-lexical/react'

// Fetch the page in a server component, pass it to the client component, then thread it through the hook
// The hook will take over from there and keep the preview in sync with the changes you make
// The `data` property will contain the live data of the document
export const PageClient: React.FC<{
  initialData: PostType
}> = ({ initialData }) => {
  const { data, isLoading } = useLivePreview<PostType>({
    initialData,
    serverURL: process.env.NEXT_PUBLIC_SERVER_URL as string,
    depth: 5,
  })
  return (
    <div>
      <h1>{data.title}</h1>
      <RichText
        data={
          data.rawContent || {
            root: {
              children: [],
            },
          }
        }
      />
    </div>
  )
}
