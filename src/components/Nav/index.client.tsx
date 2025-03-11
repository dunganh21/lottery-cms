'use client'

import { NavGroup, useConfig } from '@payloadcms/ui'
import { EntityType, formatAdminURL, NavGroupType } from '@payloadcms/ui/shared'
import LinkWithDefault from 'next/link.js'
import { usePathname } from 'next/navigation.js'
import { StaticLabel } from 'payload'
import React, { Fragment } from 'react'

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
        slug: 'post-create',
        type: EntityType.collection,
        label: 'Tạo bài viết',
        href: '/admin/collections/post/create',
      },
      // {
      //   slug: 'categories',
      //   type: EntityType.collection,
      //   label: 'Danh mục',
      // },
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
        slug: 'push-notification',
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
        type: EntityType.global,
        label: 'Câu hỏi thường gặp',
      },
      {
        slug: 'post-video',
        type: EntityType.collection,
        label: 'Thay thế video',
        href: '/admin/video-replace',
      },
      {
        slug: 'soi-cau',
        type: EntityType.global,
        label: 'Cấu hình video soi cầu',
        href: '/admin/globals/soi-cau',
      },
      {
        slug: 'about-us',
        type: EntityType.global,
        label: 'Về chúng tôi',
        href: '/admin/globals/about-us',
      },
      {
        slug: 'share-link',
        type: EntityType.global,
        label: 'Link chia sẻ',
        href: '/admin/globals/share-link',
      },
      {
        slug: 'banner',
        type: EntityType.global,
        label: 'Banner',
        href: '/admin/globals/banner',
      },
      {
        slug: 'support',
        type: EntityType.global,
        label: 'Hỗ trợ',
        href: '/admin/globals/support',
      },
      {
        slug: 'popup',
        type: EntityType.global,
        label: 'Popup',
        href: '/admin/globals/popup',
      },
    ],
    label: 'Quản lí chung',
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

  const {
    config: {
      routes: { admin: adminRoute },
    },
  } = useConfig()

  const getCurrentOpenGroup = () => {
    return DEFAULT_GROUPS.find((group) =>
      group.entities.some((entity) =>
        pathname.startsWith(entity.href || `/admin/collections/${entity.slug}`),
      ),
    )
  }

  const getLinkEl = (entity: CustomNavEntity) => {
    const { slug, type, href: hrefTemp, label } = entity
    let href: string = ''
    let id: string = ''

    if (hrefTemp) {
      href = hrefTemp
      id = `nav-${slug}`
    } else if (type === EntityType.collection) {
      href = formatAdminURL({ adminRoute, path: `/collections/${slug}` })
      id = `nav-${slug}`
    } else if (type === EntityType.global) {
      href = formatAdminURL({ adminRoute, path: `/globals/${slug}` })
      id = `nav-global-${slug}`
    }

    const Link = (LinkWithDefault as any).default || LinkWithDefault
    const LinkElement = Link || 'a'

    return (
      <LinkElement
        className={[`${baseClass}__link`, pathname === href && `active`].filter(Boolean).join(' ')}
        href={href}
        id={id}
        key={id}
        prefetch={Link ? false : undefined}
      >
        {pathname === href && <div className={`${baseClass}__link-indicator`} />}
        <span className={`${baseClass}__link-label`}>{label.toString() || ''}</span>
      </LinkElement>
    )
  }

  return (
    <Fragment>
      {DEFAULT_GROUPS.map(({ entities, label }, key) => {
        return (
          <NavGroup isOpen={label === getCurrentOpenGroup()?.label} key={key} label={label}>
            {entities.map((entity, i) => getLinkEl(entity))}
          </NavGroup>
        )
      })}
      {INJECT_GROUPS.map((entity, key) => getLinkEl(entity))}
    </Fragment>
  )
}
