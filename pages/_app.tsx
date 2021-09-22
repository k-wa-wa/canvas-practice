import { AppProps } from 'next/app';
import Head from "next/head";

import "@/styles/global.scss";

const App = ({Component, pageProps}: AppProps) => {
  return (
    <div>
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>

      <Component {...pageProps} />
    </div>
  )
}

export default App;