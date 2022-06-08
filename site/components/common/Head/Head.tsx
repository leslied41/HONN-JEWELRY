import type { VFC } from 'react'
import { SEO } from '@components/common'

const Head: VFC = () => {
  return (
    <SEO>
      <meta
        key="viewport"
        name="viewport"
        content="width=device-width, initial-scale=1"
      />
      <link rel="manifest" href="/site.webmanifest" key="site-manifest" />
      <script type="text/javascript" src="https://cdn.shopify.com/s/files/1/0264/3171/7422/t/7/assets/globorequestforquote_init.min.js?shop=honn-jewelry.myshopify.com"></script>
    </SEO>
  )
}

export default Head
