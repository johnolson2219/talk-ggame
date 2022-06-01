import { createContext, type RefObject } from 'react'
import cookie from 'js-cookie'
import type { ContextProviderProps } from './context'

import { useTheme } from '../hooks/useTheme'

type Theme = 'dark' | 'light' | 'auto'

interface ThemeContextValue {
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
  const { contentRef, selectTheme } = useTheme({
    reference,
    initial,
    afterSelect: (theme) => {
      if (typeof window === 'undefined') return
      console.log('theme after toggle')
      cookie.set('theme', theme)
    },
  })

  return (
    <ThemeContext.Provider value={{ contentRef, selectTheme }}>
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
