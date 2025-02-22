'use client'
import { useLivePreview } from '@payloadcms/live-preview-react'
import { Post as PostType } from '@/payload-types'
import { JSXConvertersFunction, RichText } from '@payloadcms/richtext-lexical/react'
import { SerializedBlockNode } from '@payloadcms/richtext-lexical'
import { DefaultNodeTypes } from '@payloadcms/richtext-lexical'
import { CodeBlockProps } from '@/converters/CodeBlockHTMLConverter'

type NodeTypes = DefaultNodeTypes | SerializedBlockNode<CodeBlockProps>

const jsxConverters: JSXConvertersFunction<NodeTypes> = ({ defaultConverters }) => ({
  ...defaultConverters,
  blocks: {
    code: ({ node }: { node: { fields: CodeBlockProps } }) => (
      <div dangerouslySetInnerHTML={{ __html: node.fields?.code }} />
    ),
  },
})
// Fetch the page in a server component, pass it to the client component, then thread it through the hook
// The hook will take over from there and keep the preview in sync with the changes you make
// The `data` property will contain the live data of the document
export const PageClient: React.FC<{
  initialData: PostType
}> = ({ initialData }) => {
  const { data } = useLivePreview<PostType>({
    initialData,
    serverURL: process.env.NEXT_PUBLIC_SERVER_URL as string,
    depth: 5,
  })
  return (
    <div>
      <h1>{data?.title}</h1>
      <RichText
        converters={jsxConverters}
        data={
          data?.rawContent || {
            root: {
              children: [],
            },
          }
        }
      />
    </div>
  )
}
