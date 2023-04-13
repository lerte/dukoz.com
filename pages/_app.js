import Head from 'next/head'
import '@/styles/globals.css'

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <meta name="author" content="Lerte Smith<lerte@qq.com>" />
        <title>Meta</title>
      </Head>
      <Component {...pageProps} />
    </>
  )
}

export default MyApp
