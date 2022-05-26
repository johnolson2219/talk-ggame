import { createContext, useEffect, useState } from 'react'
import type { Language } from '../assets/languages/language'

import { en, es } from '../assets/languages'

interface LanguageContextValue {
  lang: Language
  toggleLang: (lang: 'es' | 'en') => void
}

interface ContextProviderProps {
  children: JSX.Element
}

interface LanguageContextProviderState {
  lang: Language
}

const LanguageContext = createContext<LanguageContextValue>({
  lang: en,
  toggleLang: () => {},
})

function LanguageContextProvider({ children }: ContextProviderProps) {
  const [lang, setLang] = useState<LanguageContextProviderState['lang']>(en)

  function toggleLang(lang: 'es' | 'en') {
    lang === 'es' ? setLang(es) : setLang(en)
  }

  useEffect(() => {
    navigator.language.includes('es') && setLang(es)
  }, [])

  return (
    <LanguageContext.Provider value={{ lang, toggleLang }}>
      {children}
    </LanguageContext.Provider>
  )
}

export { type LanguageContextValue, LanguageContext, LanguageContextProvider }
