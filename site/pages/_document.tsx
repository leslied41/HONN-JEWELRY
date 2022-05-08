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
        </body>
      </Html>
    )
  }
}

export default MyDocument
