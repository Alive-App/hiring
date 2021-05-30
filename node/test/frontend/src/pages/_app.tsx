import type { AppProps } from 'next/app'
import Head from 'next/head'

import AppProvider from 'contexts'
import GlobalStyles from 'styles/global'

import Header from 'components/Header'
import Modal from 'components/Modal'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Stock SPA</title>
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600;700&display=swap"
          rel="stylesheet"
        />
      </Head>

      <GlobalStyles />

      <AppProvider>
        <Header />
        <Modal />
        <Component {...pageProps} />
      </AppProvider>
    </>
  )
}

export default MyApp
