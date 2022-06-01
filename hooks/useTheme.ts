import { type RefObject, useState } from 'react'
import { useLayoutEffect } from './useIsomorphicLayoutEffect'
import type { Theme } from '../contexts/theme'

interface UseThemeProps {
  reference: RefObject<HTMLDivElement>
  initial?: Theme | null
  afterSelect?: (theme: Theme) => void
}

interface UseThemeState {
  theme?: Theme | null
}

function useTheme({ reference, initial, afterSelect }: UseThemeProps) {
  const [theme, setTheme] = useState<UseThemeState['theme']>(initial || 'auto')

  function selectTheme(theme: Theme, execAfterSelect = false) {
    let counter = 1000

    while (counter > 0) {
      if (!reference.current) {
        counter--
        continue
      }

      reference.current.dataset.theme = theme
      execAfterSelect && afterSelect && afterSelect(theme)
      setTheme(theme)
      break
    }
  }

  useLayoutEffect(() => {
    if (initial) {
      selectTheme(initial, true)
      return
    }

    const matchDark = matchMedia('(prefers-color-scheme: dark)')
    matchDark.matches ? selectTheme('dark') : selectTheme('light')

    function changeHandler(event: MediaQueryListEvent) {
      if (!reference.current) return
      event.matches ? selectTheme('dark') : selectTheme('light')
    }

    matchMedia('(prefers-color-scheme: dark)').addEventListener(
      'change',
      changeHandler
    )
    return () =>
      matchMedia('(prefers-color-scheme: dark)').removeEventListener(
        'change',
        changeHandler
      )
  }, [])

  return { contentRef: reference, theme, selectTheme }
}

export { useTheme }
