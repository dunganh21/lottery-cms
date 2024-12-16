// Server Component
import type { AdminViewProps } from 'payload'
import { DefaultTemplate } from '@payloadcms/next/templates'
import { Gutter } from '@payloadcms/ui'
import { NotificationForm } from './Notification-form.client'

const PushNotification: React.FC<AdminViewProps> = ({ initPageResult, params, searchParams }) => {
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
      <Gutter>
        <h1>Thông báo đấy</h1>
        <NotificationForm />
      </Gutter>
    </DefaultTemplate>
  )
}

export default PushNotification
