import commerce from '@lib/api/commerce'
import { Layout } from '@components/common'
import { ProductCard } from '@components/product'
import { Grid, Marquee, Hero, GridContainer } from '@components/ui'
import Image from 'next/image'
// import HomeAllProductsGrid from '@components/common/HomeAllProductsGrid'
import type { GetStaticPropsContext, InferGetStaticPropsType } from 'next'

export async function getStaticProps({
  preview,
  locale,
  locales,
}: GetStaticPropsContext) {
  const config = { locale, locales }
  const productsPromise = commerce.getAllProducts({
    //this commerse can include all the data fetch functions.
    variables: { first: 6 },
    config,
    preview,
    // Saleor provider only
    ...({ featured: true } as any),
  })
  //a version of the page will be generated for each locale.
  const pagesPromise = commerce.getAllPages({ config, preview })
  const siteInfoPromise = commerce.getSiteInfo({ config, preview })
  const { products } = await productsPromise
  const { pages } = await pagesPromise
  const { categories, brands } = await siteInfoPromise

  return {
    props: {
      products,
      categories,
      brands,
      pages,
    },
    revalidate: 60,
  }
}

export default function Home({
  products,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <>
      <div className="bg-gray pb-20">
        {/* first section */}
        <div className="grid grid-cols-1">
          <div className="relative  h-[50rem]  w-full">
            <img
              src="/landing_pic3.png"
              alt="flower pic"
              className="absolute top-[35rem] z-10"
            />
            <button className="absolute bg-gold  z-10 top-5 left-10 text-primary text-xs px-10 py-4">
              BOOK AN APPOINTMENT
            </button>
            <Image
              className="object-cover z-0"
              layout="fill"
              src="/landing_bg1.jpg"
            />
          </div>
        </div>
        {/* second section */}
        <div className="grid grid-cols-6  text-primary gap-x-7  ">
          {/* row 1 */}
          <div className="col-span-2"></div>
          <div className="col-span-4 text-6xl mt-32 mb-12">
            <p className="ml-8">THE</p>
            <p>CAFTSMANSHIP</p>
            <p className="ml-4">AND EXPERTISE SERVICES</p>
          </div>
          {/* row 2 */}
          <div className="col-span-3">
            <div className="ml-10 ">
              <Image
                layout="intrinsic"
                src="/landing_pic2.png"
                width="529px"
                height="548px"
                className="z-20"
              />
            </div>
          </div>
          <div className="col-span-3 text-basic">
            <p className="mr-[5.5rem]">
              Honn Fine Jewelry is a Stockholm based jewelry brand since 2013.
              We have the craftsmanship and expertise to bring your inspiration
              to life. Whether you already have a singular idea, need help
              designing something unique, or just want help in your search for
              the perfect piece of jewelry for that special occasion - we are
              here to help.
            </p>
            <div className="mt-[13rem] relative">
              <Image
                layout="intrinsic"
                src="/landing_pic1.png"
                width="395px"
                height="335px"
              />
              <img
                src="/landing_pic4.png"
                alt="light pic"
                className="absolute top-40 left-28"
              />
            </div>
          </div>
          {/* row 3 */}
          <div className="col-span-4 mb-[7.5rem]">
            <p className="text-primary ml-[12.125rem] text-6xl">MADE </p>
            <p className="text-primary ml-[16.375rem] text-6xl">FOR YOU</p>
            <p className="text-basic ml-[16.375rem] mt-12  max-w-md">
              Honn Fine Jewelry is a Stockholm based jewelry brand since 2013.
              We have the craftsmanship and expertise to bring your inspiration
              to life. Whether you already have a singular idea, need help
              designing something unique, or just want help in your search for
              the perfect piece of jewelry for that special occasion - we are
              here to help.
            </p>
          </div>
          <div className="col-span-2"></div>
        </div>

        {/* third section */}
        <div className="grid grid-cols-1">
          <div className="relative  h-[40rem]  w-full">
            <div className="absolute top-28 left-10 z-10">
              <p className="ml-10"> THE</p>
              <p>PROJECT PRICE</p>
              <p className="ml-10">OF JEWELRY</p>
            </div>

            <Image
              className="object-cover z-0"
              layout="fill"
              src="/landing_bg2.jpg"
            />
          </div>
        </div>

        {/* fourth section */}
        <div className="grid grid-cols-6    mx-10 text-primary gap-x-5 gap-y-20 border-b ">
          {/*  row 1*/}
          <div className="col-span-2 row-span-1"></div>
          <div className="col-span-2 row-span-1 pt-32">
            <ul className="flex gap-x-10 text-base">
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
          <div className="col-span-2 row-span-1"></div>
          {/*  row 2*/}
          <div className="col-span-4 row-span-1">
            <p className="text-6xl">MADE WITH THE FINEST MATERIALS.</p>
          </div>
          <div className="col-span-2 row-span-1 justify-self-end">
            <img src="/cherry.svg" alt="cherry svg" />
          </div>
          {/*  row 3*/}
          <div className="col-span-2 row-span-1 cursor-pointer pb-14 hover:border-b">
            <Image
              src="/test_pic.png"
              layout="responsive"
              width="360px"
              height="500px"
            />
          </div>
          <div className="col-span-2 row-span-1 cursor-pointer pb-14 hover:border-b">
            <Image
              src="/test_pic.png"
              layout="responsive"
              width="360px"
              height="500px"
            />
          </div>
          <div className="col-span-2 row-span-1 cursor-pointer pb-14 hover:border-b">
            <Image
              src="/test_pic.png"
              layout="responsive"
              width="360px"
              height="500px"
            />
          </div>
        </div>

        {/* fifth section */}
        <div className="grid grid-cols-12  text-primary  mx-10 pt-40">
          <div className="col-span-5 justify-self-center">
            <p className="text-6xl">HIGH</p>
            <p className="text-6xl ml-8">JEWELLERY</p>
          </div>
          <div className="col-span-7">
            <p className="text-basic ">
              We have the craftsmanship and expe rtise to bring your inspiration
              to life. Whether you already have a singular idea, need help
              designing something unique, or just want help in your search for
              the perfect piece of jewelry for that special occasion - we are
              here to help.
            </p>
          </div>
          <div className="col-span-4"></div>
          <div className="col-span-4">
            <div className="w-fit relative">
              <img src="/fish_base_pic.svg" alt="fish base" />
              <img
                src="/fish_pic.png"
                className="absolute top-0 left-2/4 -translate-x-2/4"
              />
            </div>
          </div>
          <div className="col-span-4"></div>
        </div>

        {/* sixth section */}
        <div className="grid-cols-12 grid  text-primary  mx-10 pt-60">
          <div className="col-span-12">
            <p className="text-6xl pb-5">
              FOLLOW US ON <span>#HONN</span>
            </p>
          </div>
          <div className="col-span-6 row-span-2">
            <Image
              src="/landing_pic6.png"
              layout="responsive"
              width="100%"
              height="100%"
            />
          </div>
          <div className="col-span-3 row-span-1">
            <Image
              src="/landing_pic5.png"
              layout="responsive"
              width="100%"
              height="100%"
            />
          </div>
          <div className="col-span-3 row-span-1">
            <Image
              src="/landing_pic5.png"
              layout="responsive"
              width="100%"
              height="100%"
            />
          </div>
          <div className="col-span-3 row-span-1">
            <Image
              src="/landing_pic5.png"
              layout="responsive"
              width="100%"
              height="100%"
            />
          </div>
          <div className="col-span-3 row-span-1">
            <Image
              src="/landing_pic5.png"
              layout="responsive"
              width="100%"
              height="100%"
            />
          </div>
        </div>
      </div>
    </>
  )
}

Home.Layout = Layout
