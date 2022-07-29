import commerce from '@lib/api/commerce'
import { Layout } from '@components/common'
import Image from 'next/image'
import type { GetStaticPropsContext, InferGetStaticPropsType } from 'next'
import ImageGallery from '@components/ui/ImageGallery'
import { Hero, Intro, CollectionTab } from '@components/home'
import { Container } from '@components/ui'
import {
  getStartAndToken,
  getData,
  update,
} from '../lib/utilities/ins-accesskey-funcs'

type InsData = {
  media_url?: string
  id: string
  caption?: string
  media_type: string
}[]

export async function getStaticProps({
  preview,
  locale,
  locales,
}: GetStaticPropsContext) {
  const config = { locale, locales }
  const productsPromise = commerce.getAllProducts({
    variables: { first: 3 },
    config,
    preview,
    ...({ featured: true } as any),
  })
  //a version of the page will be generated for each locale.
  const pagesPromise = commerce.getAllPages({ config, preview })
  const siteInfoPromise = commerce.getSiteInfo({ config, preview })
  const { products } = await productsPromise
  const { pages } = await pagesPromise
  const { categories, brands } = await siteInfoPromise
  //this is to grab instagram data
  let { start, access_key } = await getStartAndToken()
  const insData: InsData = await getData(access_key)
  if (Date.now() - start > 2592000000) {
    start = Date.now()
    update(start, access_key)
  }
  if (!insData) {
    start = Date.now()
    update(start, access_key)
    return {
      notFound: true,
    }
  }
  const newInsData = insData
    ?.filter((item) => {
      if (item.media_type !== 'VIDEO') return item
    })
    .slice(0, 5)

  return {
    props: {
      products,
      categories,
      brands,
      pages,
      insData: newInsData,
    },
    revalidate: 60,
  }
}

export default function Home({
  insData,
  categories,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <>
      <Container className="pb-20 w-full" clean>
        <Hero />
        <Intro />
        {/* third section */}
        <div className="grid grid-cols-1 relative -top-40 mt-16 md:top-0">
          <div className="relative  h-[35rem]  w-full">
            <div className="sm:hidden absolute top-16 left-4 text-h2 font-kessler uppercase text-white z-10">
              <p className="">the perfect</p>
              <p>piece of</p>
              <p className="">jewelry</p>
              <p className="">the perfect</p>
              <p>price</p>
            </div>
            <div className="hidden sm:block absolute top-16 left-10 text-h1 font-kessler uppercase text-white z-10">
              <p className="ml-10">the</p>
              <p>perfect piece</p>
              <p className="ml-10">of jewelry</p>
              <p className="ml-10">the</p>
              <p>perfect price</p>
            </div>

            <Image
              className="z-0 !hidden sm:!block "
              layout="fill"
              objectFit="cover"
              src="/landing_bg2.jpg"
              quality={100}
            />
            <Image
              className="z-0 !block sm:!hidden "
              layout="fill"
              objectFit="cover"
              src="/landing_bg2_mobile.png"
              quality={100}
            />
          </div>
        </div>

        <CollectionTab categories={categories} />
        {/* fifth section */}
        <div className="grid grid-cols-12 gap-x-0 md:gap-x-16 mx-4 md:mx-10 mt-16 md:mt-30 relative -top-40 md:top-0">
          <div className="col-span-12 md:col-span-5 md:justify-self-center">
            <p className="text-h2 font-kessler text-brown md:text-h1">HIGH</p>
            <p className="text-h2 font-kessler text-brown md:text-h1 md:ml-8">
              JEWELLERY
            </p>
          </div>
          <div className="col-span-12 md:col-span-7 mt-6 md:mt-0">
            <p className="text-darkGray ">
              We have the craftsmanship and expe rtise to bring your inspiration
              to life. Whether you already have a singular idea, need help
              designing something unique, or just want help in your search for
              the perfect piece of jewelry for that special occasion - we are
              here to help.
            </p>
          </div>
          <div className="col-span-4 mt-10"></div>
          <div className="col-span-4 mt-10">
            <div className="w-fit relative">
              <img src="/fish_base_pic.svg" alt="fish base" />
              <img
                src="/fish_pic.png"
                className="absolute top-0 left-2/4 -translate-x-2/4"
              />
            </div>
          </div>
          <div className="col-span-4 mt-10"></div>
        </div>

        {/* sixth section INSTAGRAM */}

        <div className="grid grid-cols-1 mx-4 md:mx-10 mt-8 md:mt-60 ">
          <div>
            <p className="text-h2 font-kessler md:text-h1 pb-5 text-brown">
              FOLLOW US ON <span>#HONN</span>
            </p>
          </div>
          <div className="hidden md:block">
            <ImageGallery insData={insData} layout="A" />
          </div>
        </div>
      </Container>
    </>
  )
}

Home.Layout = Layout
