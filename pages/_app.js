import '../styles/globals.css'
import { SessionProvider } from "next-auth/react"
import Head from 'next/head'
import jalaaliAdapter from "@date-io/jalaali";
import { LocalizationProvider, faIR } from '@mui/x-date-pickers'


function MyApp({ Component, pageProps: { session, ...pageProps }, }) {

  return (
    <>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <SessionProvider session={session}>

        <LocalizationProvider dateAdapter={jalaaliAdapter} localeText={faIR.components.MuiLocalizationProvider.defaultProps.localeText}>

          <Component {...pageProps} />
        </LocalizationProvider>

      </SessionProvider>
    </>
  )



}

export default MyApp
