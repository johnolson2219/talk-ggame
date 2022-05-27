import { createContext, useLayoutEffect, useState } from 'react'
import type { Language } from '../assets/languages/language'
import type { ContextProviderProps } from './context'

import { en, es } from '../assets/languages'

interface LanguageContextValue {
  lang: Language
  toggleLang: (forcedLang?: 'es' | 'en' | false) => void
}

interface LanguageContextProviderState {
  lang: {
    selected: 'es' | 'en' | 'none'
    lang: Language | null
  }
}

const LanguageContext = createContext<LanguageContextValue>({
  lang: en,
  toggleLang: () => {},
})

function LanguageContextProvider({ children }: ContextProviderProps) {
  const [lang, setLang] = useState<LanguageContextProviderState['lang']>({
    selected: 'none',
    lang: null,
  })

  function toggleLang(forcedLang: 'es' | 'en' | false = false) {
    if (forcedLang === 'es') return setLang({ selected: 'es', lang: es })
    if (forcedLang === 'en') return setLang({ selected: 'en', lang: en })

    lang.selected === 'en' && setLang({ selected: 'es', lang: es })
    lang.selected === 'es' && setLang({ selected: 'en', lang: en })
  }

  useLayoutEffect(() => {
    navigator.language.includes('es') ? toggleLang('es') : toggleLang('en')
  }, [])

  if (!lang.lang) return null

  return (
    <LanguageContext.Provider value={{ lang: lang.lang, toggleLang }}>
      {children}
    </LanguageContext.Provider>
  )
}

export { type LanguageContextValue, LanguageContext, LanguageContextProvider }
