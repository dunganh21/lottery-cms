import type { ServerProps } from 'payload'
import { Logout } from '@payloadcms/ui'
import { RenderServerComponent } from '@payloadcms/ui/elements/RenderServerComponent'
import React from 'react'
import { NavWrapper } from './NavWrapper'
import DefaultNavClient from './nav.client'
import { NavHamburger } from './NavHamburger'

const baseClass = 'nav'

// import './index.scss'

export type NavProps = ServerProps

export default function DefaultNav({
  i18n,
  locale,
  params,
  payload,
  permissions,
  searchParams,
  user,
}: NavProps) {
  if (!payload?.config) {
    if (!payload?.config) {
      return null
    }

    const {
      admin: {
        components: { logout },
      },
    } = payload.config

    const LogoutComponent = RenderServerComponent({
      Component: logout?.Button,
      Fallback: Logout,
      importMap: payload.importMap,
      serverProps: {
        i18n,
        locale,
        params,
        payload,
        permissions,
        searchParams,
        user,
      },
    })

    return (
      <NavWrapper baseClass={baseClass}>
        <nav className={`${baseClass}__wrap`}>
          <DefaultNavClient />
          <div className={`${baseClass}__controls`}>{LogoutComponent}</div>
        </nav>
        <div className={`${baseClass}__header`}>
          <div className={`${baseClass}__header-content`}>
            <NavHamburger baseClass={baseClass} />
          </div>
        </div>
      </NavWrapper>
    )
  }
}
