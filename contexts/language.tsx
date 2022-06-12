import { createContext, useEffect, useState } from 'react'
import cookie from 'js-cookie'
import type { Language } from '../assets/languages/language'
import type { ContextProviderProps } from './context'

import { en, es } from '../assets/languages'

type LanguageSelected = 'es' | 'en'

interface LanguageContextValue {
  selectedLang: LanguageSelected
  lang: Language
  toggleLang: (forcedLang?: LanguageSelected | false) => void
}

interface LanguageContextProviderProps extends ContextProviderProps {
  initial?: LanguageSelected | null
}

interface LanguageContextProviderState {
  lang: {
    selected: LanguageSelected
    lang: Language
  }
}

const LanguageContext = createContext<LanguageContextValue>({
  selectedLang: 'en',
  lang: en,
  toggleLang: () => {},
})

function LanguageContextProvider({
  children,
  initial,
}: LanguageContextProviderProps) {
  const [lang, setLang] = useState<LanguageContextProviderState['lang']>({
    selected: initial || 'en',
    lang: initial === 'es' ? es : en,
  })

  function setCookie(language: LanguageSelected) {
    if (typeof window === 'undefined') return
    cookie.set('language', language)
  }

  function toggleLang(forcedLang: LanguageSelected | false = false) {
    if (forcedLang) {
      if (forcedLang !== lang.selected) {
        forcedLang === 'es'
          ? setLang({ selected: 'es', lang: es })
          : setLang({ selected: 'en', lang: en })

        setCookie(forcedLang)
      }

      return
    }

    const isEnglish = lang.selected === 'en'
    const isSpanish = lang.selected === 'es'

    if (isEnglish) {
      setLang({ selected: 'es', lang: es })
      setCookie('es')
    } else if (isSpanish) {
      setLang({ selected: 'en', lang: en })
      setCookie('en')
    }
  }

  useEffect(() => {
    if (initial) return
    navigator.language.includes('es') && toggleLang('es')
  }, [])

  return (
    <LanguageContext.Provider
      value={{ selectedLang: lang.selected, lang: lang.lang, toggleLang }}
    >
      {children}
    </LanguageContext.Provider>
  )
}

export { type LanguageContextValue, LanguageContext, LanguageContextProvider }
