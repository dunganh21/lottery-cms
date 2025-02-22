'use client'

import type { CodeFieldClient, CodeFieldClientProps } from 'payload'
import { CodeField, useFormFields } from '@payloadcms/ui'
import React, { useMemo } from 'react'

const languageKeyToMonacoLanguageMap = {
  html: 'html',
}

const CodeComponent: React.FC<CodeFieldClientProps> = ({
  autoComplete,
  field,
  forceRender,
  path,
  permissions,
  readOnly,
  renderedBlocks,
  schemaPath,
  validate,
}) => {
  const languageField = useFormFields(([fields]) => fields['language'])
  const language: string =
    (languageField?.value as string) || (languageField?.initialValue as string) || 'html'

  const props: CodeFieldClient = useMemo<CodeFieldClient>(
    () => ({
      ...field,
      type: 'code',
      admin: {
        ...field.admin,
        language:
          languageKeyToMonacoLanguageMap[language as keyof typeof languageKeyToMonacoLanguageMap] ||
          language,
        editorOptions: field.admin?.editorOptions || {},
      },
    }),
    [field, language],
  )

  const key = `${field.name}-${language}`

  return (
    <CodeField
      autoComplete={autoComplete}
      field={props}
      forceRender={forceRender}
      key={key}
      path={path}
      permissions={permissions}
      readOnly={readOnly}
      renderedBlocks={renderedBlocks}
      schemaPath={schemaPath}
      validate={validate}
    />
  )
}

export default CodeComponent
