import '../styles/globals.css';
import '../styles/bootstrap.min.css';
// remove this if you want to use CDN instead
// import '../styles/bootstrap-icons.min.css'; 

import Head from "next/head";

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        {/* Bootstrap Icons via CDN */}
        <link
          href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.3/font/bootstrap-icons.min.css"
          rel="stylesheet"
        />
      </Head>
      
      <Component {...pageProps} />
    </>
  );
}


