//so this page is to transfer shopify's pages created by user to here and embed them in this page.
import type {
  GetStaticPathsContext,
  GetStaticPropsContext,
  InferGetStaticPropsType,
} from 'next'
import commerce from '@lib/api/commerce'
import { Text } from '@components/ui'
import { Layout } from '@components/common'
import Request from '@components/request/request'
import getSlug from '@lib/get-slug'
import { missingLocaleInPages } from '@lib/usage-warns'
import type { Page } from '@commerce/types/page'
import { useRouter } from 'next/router'

export async function getStaticProps({
  preview,
  params,
  locale,
  locales,
}: GetStaticPropsContext<{ pages: string[] }>) {
  const config = { locale, locales }
  const pagesPromise = commerce.getAllPages({ config, preview })
  const siteInfoPromise = commerce.getSiteInfo({ config, preview })
  const { pages } = await pagesPromise
  const { categories } = await siteInfoPromise
  const path = params?.pages.join('/')
  const slug = locale ? `${locale}/${path}` : path
  const pageItem = pages.find((p: Page) =>
    p.url ? getSlug(p.url) === slug : false
  ) //if the entered url in browser exist in pages, grab this target page.
  const data =
    pageItem &&
    (await commerce.getPage({
      variables: { id: pageItem.id! },
      config,
      preview,
    }))

  const page = data?.page

  if (!page) {
    return {
      notFound: true,
    }
  }

  return {
    props: { pages, page, categories, path },
    revalidate: 60 * 60, // Every hour
  }
}

export async function getStaticPaths({ locales }: GetStaticPathsContext) {
  const config = { locales }
  const { pages }: { pages: Page[] } = await commerce.getAllPages({ config })
  const [invalidPaths, log] = missingLocaleInPages()
  const paths = pages
    .map((page) => page.url)
    .filter((url) => {
      if (!url || !locales) return url
      // If there are locales, only include the pages that include one of the available locales
      if (locales.includes(getSlug(url).split('/')[0])) return url

      invalidPaths.push(url)
    })
  log()

  return {
    paths,
    fallback: 'blocking',
  }
}

export default function Pages({ page, path }: { page: Page; path: string }) {
  const router = useRouter()

  return router.isFallback ? (
    <h1>Loading...</h1> // TODO (BC) Add Skeleton Views
  ) : (
    <>
      {path === 'request-for-quote' ? (
        <Request available_time={page.availableTime?.value} />
      ) : (
        <div className="max-w-2xl mx-8 sm:mx-auto py-20">
          {page?.body && <Text html={page.body} />}
        </div>
      )}
    </>
  )
}

Pages.Layout = Layout
