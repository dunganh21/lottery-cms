import { HTMLConverter, SerializedBlockNode } from '@payloadcms/richtext-lexical'

export type CodeBlockProps = {
  code: string
  language?: string
}

type SerializedCodeBlockNode = SerializedBlockNode<CodeBlockProps>

const CodeBlockHTMLConverter: HTMLConverter<SerializedCodeBlockNode> = {
  converter: ({ node }) => {
    return node.fields?.code
  },
  nodeTypes: ['block'],
}

export default CodeBlockHTMLConverter
