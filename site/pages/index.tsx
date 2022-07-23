import commerce from '@lib/api/commerce'
import { Layout } from '@components/common'
import Image from 'next/image'
import type { GetStaticPropsContext, InferGetStaticPropsType } from 'next'
import ImageGallery from '@components/ui/ImageGallery'
import Hero from '@components/home/hero'
import Intro from '@components/home/intro'
import { Container } from '@components/ui'
import {
  getStartAndToken,
  getData,
  update,
} from '../lib/utilities/ins-accesskey-funcs'
import { Slider } from '@components/common'

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
  products,
  insData,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  console.log(insData)
  return (
    <>
      <Container className="pb-20 w-full" clean>
        <Hero />
        <Intro />
        {/* third section */}
        <div className="grid grid-cols-1 relative -top-40 mt-16 md:top-0">
          <div className="relative  h-[35rem]  w-full">
            <div className="sm:hidden absolute top-16 left-4 text-h2 uppercase text-white z-10">
              <p className="">the perfect</p>
              <p>piece of</p>
              <p className="">jewelry</p>
              <p className="">the perfect</p>
              <p>price</p>
            </div>
            <div className="hidden sm:block absolute top-16 left-10 text-h1 uppercase text-white z-10">
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

        {/* fourth section */}
        <div className="grid grid-cols-6  mx-4 md:mx-10 text-brown gap-x-0 md:gap-x-5 gap-y-10 sm:gap-y-20  relative -top-40 md:top-0 ">
          {/*  row 1*/}
          <div className="col-span-6 justify-self-center pt-4 sm:pt-32">
            <ul className="flex gap-x-5 sm:gap-x-10 text-btn">
              <li>
                <button className="focus:border-b">POPULAR</button>
              </li>
              <li>
                <button className="focus:border-b">WEDDING</button>
              </li>
              <li>
                <button className="focus:border-b">ENGAGEMENT</button>
              </li>
            </ul>
          </div>
          {/*  row 2*/}
          <div className="col-span-4 ">
            <p className="text-h2 md:text-h1">
              MADE WITH THE FINEST MATERIALS.
            </p>
          </div>
          <div className="col-span-2 justify-self-end">
            <img src="/cherry.svg" alt="cherry svg" />
          </div>
        </div>
        {/*  row 3*/}
        <div className="relative -top-40 md:top-0 px-4 sm:px-10">
          <Slider
            products={products}
            className="w-full"
            controlBtn
            bottomLine
            productInfo
          />
        </div>

        {/* fifth section */}
        <div className="grid grid-cols-12 gap-x-0 md:gap-x-16 mx-4 md:mx-10 mt-16 md:mt-30 relative -top-40 md:top-0">
          <div className="col-span-12 md:col-span-5 md:justify-self-center">
            <p className="text-h2 text-brown md:text-h1">HIGH</p>
            <p className="text-h2 text-brown md:text-h1 md:ml-8">JEWELLERY</p>
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
            <p className="text-h2 md:text-h1 pb-5 text-brown">
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
