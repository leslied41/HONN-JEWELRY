import type { GetStaticPropsContext } from 'next'
import commerce from '../lib/api/commerce'
import Layout from '../components/common/Layout'
import CurrentPath from '../components/common/CurrentPath'
import Container from '../components/ui/Container'
import Image from 'next/image'

export async function getStaticProps({
  preview,
  locale,
  locales,
}: GetStaticPropsContext) {
  const config = { locale, locales }
  const pagesPromise = commerce.getAllPages({ config, preview })
  const siteInfoPromise = commerce.getSiteInfo({ config, preview })
  const { pages } = await pagesPromise
  const { categories } = await siteInfoPromise

  return {
    props: { pages, categories },
  }
}

export default function About() {
  return (
    <Container className="w-full px-0 md:px-10 pb-16 md:pb-[100px]" clean>
      <CurrentPath className="px-4 md:px-0" />
      <section className="px-4 md:px-10  mt-8">
        <h1 className="uppercase text-center text-brown text-h2 font-kessler">
          about us
        </h1>
        <div className="text-body-1 text-brown mt-6 mb-10">
          <p className="text-center">
            Welcome to visit us at Birger Jarlsgatan 23,Stockholm
          </p>
          <p className="text-center">
            Honn Fine Jewelry is a Stockholm based jewelry brand since 2013.
          </p>
        </div>
        <div className="relative hidden sm:block h-[400px] lg:h-[500px] xl:h-[600px] w-full overflow-hidden">
          <Image
            src="/about_one.png"
            alt="about first background image"
            objectFit="cover"
            layout="fill"
            priority
          />
        </div>
        <div className="relative block sm:hidden h-[400px] lg:h-[500px] xl:h-[600px] w-full overflow-hidden">
          <Image
            src="/about_one_mobile.png"
            alt="about first background image"
            objectFit="cover"
            layout="fill"
            priority
          />
        </div>
        <div className="grid grid-cols-2  mt-8 md:mt-16 gap-x-40 gap-y-6">
          <div className="md:col-span-1 col-span-2">
            <div className=" text-brown text-[18px] leading-7 md:text-h2 font-kessler uppercase">
              <p>As a diamond</p>
              <p>wholesaler and GIA diamonds strategic partner,</p>
              <p>
                we want to give our customers endless possibilities to create
                something unique or straightforward but of the best possible
                quality and friendly
              </p>
              <p>price.</p>
            </div>
          </div>
          <div className="md:col-span-1 col-span-2">
            <div className="max-w-[414px] text-brown text-body-1">
              <p>We specialize in custom</p>
              <p>jewelry</p>
              <p>engagement rings</p>
              <p>wedding bands.</p>
              <p>
                We handle the entire process from sourcing your stone,
                authenticity, design, craftsmanship to delivery.
              </p>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-x-7 md:gap-x-20 mt-[60px] md:mt-[90px]">
          <div className="col-span-1 justify-self-end -ml-4 md:ml-0">
            <Image
              src="/about_two.png"
              width="418"
              height="628"
              layout="intrinsic"
            />
          </div>
          <div className="col-span-1  pt-20 justify-self-start -mr-4 md:mr-0">
            <Image
              src="/about_three.png"
              width="418"
              height="628"
              layout="intrinsic"
            />
          </div>
        </div>
        {/* 45:9:3 75:15:5 */}
        <div className="grid grid-cols-12 mt-[50px] md:mt-[100px]">
          <div className="col-span-2 hidden md:block"></div>
          <div className="col-span-12 md:col-span-8 max-w-[750px] justify-self-center">
            <h2 className="text-[32px] leading-[44px] font-kessler text-brown uppercase">
              01. specialize in custom jewelry
            </h2>
            <div className="mt-4 md:mt-8 text-brown text-body-1">
              <div>
                <p>
                  As a diamond wholesaler and GIA diamonds strategic partner,
                </p>
                <p>
                  we want to give our customers endless possibilities to create
                  something unique
                </p>
                <p>
                  or straightforward but of the best possible quality and
                  friendly price.
                </p>
              </div>
              <div className="mt-6">
                <p>
                  We specialize in custom jewelry, such as engagement rings and
                  wedding bands.
                </p>
                <p>
                  We handle the entire process from sourcing your stone,
                  authenticity, design, craftsmanship to delivery.
                </p>
              </div>
            </div>
          </div>
          <div className="col-span-2 hidden md:block"></div>
        </div>
      </section>
    </Container>
  )
}

About.Layout = Layout
