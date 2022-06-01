import { createContext, useEffect, useState } from 'react'
import cookie from 'js-cookie'
import type { Language } from '../assets/languages/language'
import type { ContextProviderProps } from './context'

import { en, es } from '../assets/languages'

type LanguageSelected = 'es' | 'en'

interface LanguageContextValue {
  lang: Language
  toggleLang: (forcedLang?: LanguageSelected | false) => void
}

interface LanguageContextProviderProps extends ContextProviderProps {
  initial?: LanguageSelected | null
}

interface LanguageContextProviderState {
  lang: {
    selected: LanguageSelected | 'default'
    lang: Language
  }
}

const LanguageContext = createContext<LanguageContextValue>({
  lang: en,
  toggleLang: () => {},
})

function LanguageContextProvider({
  children,
  initial,
}: LanguageContextProviderProps) {
  const [lang, setLang] = useState<LanguageContextProviderState['lang']>({
    selected: initial || 'default',
    lang: initial === 'es' ? es : en,
  })

  function setCookie(language: LanguageSelected) {
    if (typeof window === 'undefined') return
    cookie.set('language', language)
  }

  function toggleLang(forcedLang: LanguageSelected | false = false) {
    if (forcedLang) {
      forcedLang === 'es'
        ? setLang({ selected: 'es', lang: es })
        : setLang({ selected: 'en', lang: en })

      setCookie(forcedLang)
    }

    const isDefault = lang.selected === 'default'
    const isEnglish = lang.selected === 'en'

    if (isEnglish) {
      setLang({ selected: 'es', lang: es })
      setCookie('es')
    } else if (!isDefault && !isEnglish) {
      setLang({ selected: 'en', lang: en })
      setCookie('en')
    }
  }

  useEffect(() => {
    if (lang.selected !== 'default') return
    navigator.language.includes('es') && toggleLang('es')
  }, [])

  return (
    <LanguageContext.Provider value={{ lang: lang.lang, toggleLang }}>
      {children}
    </LanguageContext.Provider>
  )
}

export { type LanguageContextValue, LanguageContext, LanguageContextProvider }
