import type { AppProps } from 'next/app'
import { LanguageContextProvider } from '../contexts/language'
import '../styles/globals.css'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <LanguageContextProvider>
      <Component {...pageProps} />
    </LanguageContextProvider>
  )
}

export default MyApp
