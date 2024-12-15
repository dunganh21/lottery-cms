'use client'

import { NavGroup, useConfig } from '@payloadcms/ui'
import type { NavGroupType } from '@payloadcms/ui/shared'
import { EntityType, formatAdminURL } from '@payloadcms/ui/shared'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Fragment } from 'react'

const baseClass = 'nav'

const PREDEFINED_NAV_ITEMS: NavGroupType[] = [
  {
    label: 'Bài viết',
    entities: [
      {
        label: 'Tạo bài viết',
        slug: 'post/create',
        type: EntityType.collection,
      },
      {
        label: 'Bài viết',
        slug: 'post',
        type: EntityType.collection,
      },
      {
        label: 'Danh mục',
        slug: 'categories',
        type: EntityType.collection,
      },
    ],
  },
  {
    label: 'Thông báo',
    entities: [
      {
        label: 'Lập lịch',
        slug: 'notification',
        type: EntityType.collection,
      },
      {
        label: 'Thông báo đẩy',
        slug: 'notification/push',
        type: EntityType.collection,
      },
    ],
  },
  {
    label: 'Quản lí tổng',
    entities: [
      {
        label: 'Câu hỏi thường gặp',
        slug: 'faqs',
        type: EntityType.collection,
      },
      {
        label: 'Thay video',
        slug: 'replace-video',
        type: EntityType.collection,
      },
    ],
  },
]

const NON_GROUP_NAV_ITEMS: NavGroupType['entities'] = [
  {
    label: 'Người dùng',
    slug: 'users',
    type: EntityType.collection,
  },
  {
    label: 'Media',
    slug: 'media',
    type: EntityType.collection,
  },
]

export default function DefaultNavClient() {
  const pathname = usePathname()

  const {
    config: {
      routes: { admin: adminRoute },
    },
  } = useConfig()

  const getEntityHref = (slug: string) => {
    return formatAdminURL({ adminRoute, path: `/collections/${slug}` })
  }

  return (
    <Fragment>
      {PREDEFINED_NAV_ITEMS.map(({ entities, label }, key) => {
        return (
          <NavGroup isOpen={label === 'Bài viết'} key={key} label={label}>
            {entities.map(({ slug, label }, i) => {
              const href = getEntityHref(slug)

              const activeCollection =
                pathname.startsWith(href) && ['/', undefined].includes(pathname[href.length])

              return (
                <Link
                  className={[`${baseClass}__link`, activeCollection && `active`]
                    .filter(Boolean)
                    .join(' ')}
                  href={href}
                  id={`nav-${slug}`}
                  key={i}
                >
                  {activeCollection && <div className={`${baseClass}__link-indicator`} />}
                  <span className={`${baseClass}__link-label`}>{label.toString()}</span>
                </Link>
              )
            })}
          </NavGroup>
        )
      })}
    </Fragment>
  )
}
