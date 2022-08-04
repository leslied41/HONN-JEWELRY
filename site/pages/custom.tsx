import type {
  GetStaticPathsContext,
  GetStaticPropsContext,
  InferGetStaticPropsType,
} from 'next'
import { useRouter } from 'next/router'
import commerce from '@lib/api/commerce'
import { Layout } from '@components/common'
import { CustomView } from '@components/custom'
import { ProductProvider } from '@components/product/productProvider'
export async function getStaticProps({
  params,
  locale,
  locales,
  preview,
}: GetStaticPropsContext<{ slug: string }>) {
  const config = { locale, locales }

  const allProductsPromise = commerce.getAllProducts({
    //variables: { first: 4 },
    config,
    preview,
  })

  const { products: allProducts } = await allProductsPromise

  return {
    props: {
      allProducts,
    },
    revalidate: 20,
  }
}

export default function Custom({
  allProducts,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const router = useRouter()

  return router.isFallback ? (
    <h1>Loading...</h1>
  ) : (
    <ProductProvider>
      <CustomView products={allProducts} />
    </ProductProvider>
  )
}

Custom.Layout = Layout
