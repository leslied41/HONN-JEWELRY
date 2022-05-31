import '@assets/main.css'
import '@assets/chrome-bug.css'
import 'keen-slider/keen-slider.min.css'
import { FC, useEffect } from 'react'
import type { AppProps } from 'next/app'
import { Head } from '@components/common'
import { ManagedUIContext } from '@components/ui/context'

const Noop: FC = ({ children }) => <>{children}</>

export default function MyApp({ Component, pageProps }: AppProps) {
  console.log(Component)
  console.log(pageProps)
  {
    /* The Component prop is the active page, so whenever you navigate between routes, 
          Component will change to the new page. Therefore, any props you send to Component will
           be received by the page. */
  }
  {
    /* pageProps is an object with the initial props that were preloaded for your page 
           by one of our data fetching methods, otherwise it's an empty object.
       And this pageProps is from each page that fetched by getstaticprops or getseversideprops*/
  }
  const Layout = (Component as any).Layout || Noop
  //as is type assertion in typescript. it is used to specify the type.
  //this NestedLayout is for another layout for a specefic page other than the common layout.

  useEffect(() => {
    document.body.classList?.remove('loading')
  }, [])

  return (
    <>
      {/* this <Head/> is for seo. */}
      <Head />
      <ManagedUIContext>
        <Layout pageProps={pageProps}>
          <Component {...pageProps} />
        </Layout>
      </ManagedUIContext>
    </>
  )
}
