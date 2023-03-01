import Head from 'next/head'
import Header from '@/components/header'
import Footer from '@/components/footer'

export default function Home() {
  return (
    <>
      <Head>
        <title>Dukoz.com - Affiliate</title>
        <meta name="description" content="Affiliate" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <main></main>
      <Footer />
    </>
  )
}
