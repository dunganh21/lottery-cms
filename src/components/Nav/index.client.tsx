'use client'

import { NavGroup } from '@payloadcms/ui'
import { EntityType, NavGroupType } from '@payloadcms/ui/shared'
import LinkWithDefault from 'next/link.js'
import { usePathname } from 'next/navigation.js'
import { StaticLabel } from 'payload'
import React, { Fragment, useCallback } from 'react'

const baseClass = 'nav'

type CustomNavEntity = {
  label: StaticLabel
  slug: string
  type: EntityType
  href?: string
}
type CustomNavGroup = Omit<NavGroupType, 'entities'> & { entities: CustomNavEntity[] }

const DEFAULT_GROUPS: CustomNavGroup[] = [
  {
    entities: [
      {
        slug: 'post',
        type: EntityType.collection,
        label: 'Danh sách bài viết',
      },
      {
        slug: 'post',
        type: EntityType.collection,
        label: 'Tạo bài viết',
        href: '/admin/collections/post/new',
      },
      {
        slug: 'categories',
        type: EntityType.collection,
        label: 'Danh mục',
      },
    ],
    label: 'Bài viết',
  },
  {
    entities: [
      {
        slug: 'notification',
        type: EntityType.collection,
        label: 'Thông báo lập lịch',
      },
      {
        slug: 'notification',
        type: EntityType.collection,
        label: 'Thông báo đẩy',
        href: '/admin/push-notification',
      },
    ],
    label: 'Thông báo',
  },
  {
    entities: [
      {
        slug: 'faqs',
        type: EntityType.collection,
        label: 'Câu hỏi thường gặp',
      },
      {
        slug: 'post-video',
        type: EntityType.collection,
        label: 'Thay thế video',
        href: '/admin/video-replace',
      },
    ],
    label: 'Quản lí tổng',
  },
]

const INJECT_GROUPS: CustomNavEntity[] = [
  {
    slug: 'users',
    type: EntityType.collection,
    label: 'Người dùng',
  },
  {
    slug: 'media',
    type: EntityType.collection,
    label: 'Media',
  },
]

export const DefaultNavClient: React.FC<{}> = () => {
  const pathname = usePathname()

  const getCurrentOpenGroup = () => {
    return DEFAULT_GROUPS.find((group) =>
      group.entities.some((entity) =>
        pathname.startsWith(entity.href || `/admin/collections/${entity.slug}`),
      ),
    )
  }

  const getActivePath = useCallback(
    (href: string) => {
      return href === pathname
    },
    [pathname],
  )

  return (
    <Fragment>
      {DEFAULT_GROUPS.map(({ entities, label }, key) => {
        return (
          <NavGroup isOpen={label === getCurrentOpenGroup()?.label} key={key} label={label}>
            {entities.map(({ slug, label, href: hrefTemp }, i) => {
              const href = hrefTemp || `/admin/collections/${slug}`
              const id = `nav-${slug}`

              const Link = (LinkWithDefault as any).default || LinkWithDefault

              const LinkElement = Link || 'a'
              const activeCollection =
                pathname.startsWith(href) && ['/', undefined].includes(pathname[href.length])

              return (
                <LinkElement
                  className={[`${baseClass}__link`, activeCollection && `active`]
                    .filter(Boolean)
                    .join(' ')}
                  href={href}
                  id={id}
                  key={i}
                  prefetch={Link ? false : undefined}
                >
                  {activeCollection && <div className={`${baseClass}__link-indicator`} />}
                  <span className={`${baseClass}__link-label`}>{label.toString() || ''}</span>
                </LinkElement>
              )
            })}
          </NavGroup>
        )
      })}
      {INJECT_GROUPS.map(({ slug, label }, key) => {
        const Link = (LinkWithDefault as any).default || LinkWithDefault
        const LinkElement = Link || 'a'

        const activeCollection = getActivePath(`/admin/collections/${slug}`)
        return (
          <LinkElement href={`/admin/collections/${slug}`} id={`nav-${slug}`} key={key}>
            {activeCollection && <div className={`${baseClass}__link-indicator`} />}
            <span className={`${baseClass}__link-label`}>{label?.toString() || ''}</span>
          </LinkElement>
        )
      })}
    </Fragment>
  )
}
