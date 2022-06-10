import { useRef } from 'react'
import type { AppProps } from 'next/app'
import Toolbar from '../components/toolbar'
import { LanguageContextProvider } from '../contexts/language'
import { ThemeContextProvider } from '../contexts/theme'
import appStyles from '../styles/app.module.css'
import '../styles/globals.css'
import '../styles/themes.css'

function App({ Component, pageProps }: AppProps) {
  const contentRef = useRef(null)

  return (
    <LanguageContextProvider initial={pageProps.language}>
      <ThemeContextProvider
        reference={contentRef}
        initial={JSON.parse(pageProps.theme || null)}
      >
        <div className={appStyles.App} ref={contentRef}>
          <Toolbar />
          <Component {...pageProps} />
        </div>
      </ThemeContextProvider>
    </LanguageContextProvider>
  )
}

export default App
