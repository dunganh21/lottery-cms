// Server Component
import type { AdminViewProps } from 'payload'
import { DefaultTemplate } from '@payloadcms/next/templates'
import { Gutter } from '@payloadcms/ui'
import { ReplaceVideoForm } from './replace-video-form'

const ReplaceVideo: React.FC<AdminViewProps> = ({ initPageResult, params, searchParams }) => {
  return (
    <DefaultTemplate
      i18n={initPageResult.req.i18n}
      locale={initPageResult.locale}
      params={params}
      payload={initPageResult.req.payload}
      permissions={initPageResult.permissions}
      searchParams={searchParams}
      user={initPageResult.req.user || undefined}
      visibleEntities={initPageResult.visibleEntities}
    >
      <Gutter className="doc-header">
        <h1 className="doc-header__title render-title">Thay thế video links</h1>
      </Gutter>
      <Gutter className="document-fields__edit">
        <ReplaceVideoForm />
      </Gutter>
    </DefaultTemplate>
  )
}

export default ReplaceVideo
