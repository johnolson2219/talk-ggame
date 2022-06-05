import { type RefObject, useState } from 'react'
import { useLayoutEffect } from './useIsomorphicLayoutEffect'
import type { Theme } from '../contexts/theme'

interface UseThemeProps {
  reference: RefObject<HTMLDivElement>
  initial?: Theme | null
  afterSelect?: (theme: Theme) => void
}

interface UseThemeState {
  theme: Theme
}

function useTheme({ reference, initial, afterSelect }: UseThemeProps) {
  const [theme, setTheme] = useState<UseThemeState['theme']>(
    initial || {
      type: 'light',
      isAuto: true,
    }
  )

  function selectTheme(themeSelected: Theme, execAfterSelect = true) {
    let counter = 1000

    while (counter > 0) {
      if (!reference.current) {
        counter--
        continue
      }

      reference.current.dataset.theme = themeSelected.type
      execAfterSelect && afterSelect && afterSelect(themeSelected)

      if (
        themeSelected.type !== theme.type ||
        themeSelected.isAuto !== theme.isAuto
      )
        setTheme(themeSelected)
      break
    }
  }

  useLayoutEffect(() => {
    if (!theme.isAuto) {
      selectTheme(theme)
      return
    }

    const matchDark = matchMedia('(prefers-color-scheme: dark)')
    matchDark.matches
      ? selectTheme({ type: 'dark', isAuto: true })
      : selectTheme({ type: 'light', isAuto: true })

    function changeHandler(event: MediaQueryListEvent) {
      if (!reference.current) return
      event.matches
        ? selectTheme({ type: 'dark', isAuto: true })
        : selectTheme({ type: 'light', isAuto: true })
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
  }, [theme.isAuto])

  return { contentRef: reference, theme, selectTheme }
}

export { useTheme }
