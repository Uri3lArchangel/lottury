import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import Head from 'next/head'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
  <Head>
    <title>Lottury.com | Decentralized lottery system</title>
    <link rel="shortcut icon" href="/lotterylogo.png" type="image/x-icon" />
    <meta name='description' content='Enter the world of Lottury, a decentralized blockchain lottery game where you can play, win, and earn big rewards. With its secure and transparent platform, Lottury offers a fair chance to every player. Join now and experience the fun and excitement of this innovative game.' />
    <meta http-equiv="Content-Type" content="text/html;charset=UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <link rel="canonical" href="https://lottury.com" />
  </Head>
  <Component {...pageProps} />
  </>
  )
}
