import Document, { Head, Html, Main, NextScript } from 'next/document'

// User can have a custome document to update tags like html, body and this file is only rerender
//on the sever, so event handlers like onClick cannot be used here.
//to override the default Document, create the file pages/_document.js.
//in this use case, we are just update body tag by adding a loading class on it.

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head />
        <body className="loading">
          <Main />
          <NextScript />
          <script type="text/javascript" src="/scripts/quote_params.js" />
          <script type="text/javascript" src="/scripts/quote.js" />
          <script type="text/javascript" src="//cdn.shopify.com/s/files/1/0264/3171/7422/t/7/assets/globorequestforquote.min.js?v=6522257995224210151653381403"></script>
        </body>
      </Html>
    )
  }
}

export default MyDocument
