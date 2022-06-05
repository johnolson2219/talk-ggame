import { createContext, type RefObject } from 'react'
import cookie from 'js-cookie'
import type { ContextProviderProps } from './context'

import { useTheme } from '../hooks/useTheme'

type Theme = { type?: 'dark' | 'light'; isAuto: boolean }

interface ThemeContextValue {
  theme?: Theme | null
  contentRef?: RefObject<HTMLDivElement>
  selectTheme: (theme: Theme) => void
}

interface ThemeContextProviderProps extends ContextProviderProps {
  reference: RefObject<HTMLDivElement>
  initial?: Theme | null
}

const ThemeContext = createContext<ThemeContextValue>({
  selectTheme: () => {},
})

function ThemeContextProvider({
  children,
  reference,
  initial,
}: ThemeContextProviderProps) {
  const { theme, contentRef, selectTheme } = useTheme({
    reference,
    initial,
    afterSelect: (theme) => {
      if (typeof window === 'undefined') return
      cookie.set('theme', JSON.stringify(theme))
    },
  })

  return (
    <ThemeContext.Provider value={{ theme, contentRef, selectTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export {
  type Theme,
  type ThemeContextValue,
  ThemeContext,
  ThemeContextProvider,
}
