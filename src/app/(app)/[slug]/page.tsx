import { notFound } from 'next/navigation'
import { getPayload } from 'payload'
import { Fragment } from 'react'
import type { Post as PostType } from '../../../payload-types'
import config from '../../../payload.config'
import classes from './index.module.scss'
import { RefreshRouteOnSave } from './RefreshRouteOnSave'
import { PageClient } from './page.client'

interface PageParams {
  params: Promise<{
    slug?: string
  }>
}

// eslint-disable-next-line no-restricted-exports
export default async function Page({ params: paramsPromise }: PageParams) {
  const { slug = 'home' } = await paramsPromise
  const payload = await getPayload({ config })

  const pageRes = await payload.find({
    collection: 'post',
    draft: true,
    limit: 1,
    where: {
      slug: {
        equals: slug,
      },
    },
  })

  const data = pageRes?.docs?.[0] as null | PostType

  if (data === null) {
    return notFound()
  }

  return (
    <Fragment>
      <RefreshRouteOnSave />
      <main className={classes.page}>
        <PageClient initialData={data} />
      </main>
    </Fragment>
  )
}

export async function generateStaticParams() {
  const payload = await getPayload({ config })

  const pagesRes = await payload.find({
    collection: 'post',
    depth: 0,
    draft: true,
    limit: 100,
  })

  const pages = pagesRes?.docs

  return pages.map(({ slug }) =>
    slug !== 'home'
      ? {
          slug,
        }
      : {},
  )
}
