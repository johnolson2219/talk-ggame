import { useContext } from 'react'
import { ThemeContext, type ThemeContextValue } from '../../contexts/theme'
import {
  LanguageContext,
  type LanguageContextValue,
} from '../../contexts/language'
import SwitchButton from '../switchButton'
import SelectButton from '../selectButton'
import { capitalize } from '../../utils/capitalize'

function themeAllowed(theme: string): theme is 'dark' | 'light' {
  const allowTheme = ['dark', 'light']
  return allowTheme.includes(theme)
}

function Settings() {
  const { theme, selectTheme }: ThemeContextValue = useContext(ThemeContext)
  const { lang, selectedLang, toggleLang }: LanguageContextValue =
    useContext(LanguageContext)

  return (
    <>
      <li>
        <SwitchButton
          text={lang.settings.themeAuto}
          initialValue={theme?.isAuto}
          onClick={(active) =>
            selectTheme({ type: theme?.type, isAuto: !active })
          }
        />
      </li>
      <li>
        <SelectButton
          text={lang.settings.theme}
          values={[lang.settings.themeDark, lang.settings.themeLight]}
          value={capitalize(
            theme
              ? theme.type === 'dark'
                ? lang.settings.themeDark
                : lang.settings.themeLight
              : ''
          )}
          disabled={theme?.isAuto}
          onClickOption={(target) => {
            const themeTarget =
              target === lang.settings.themeDark ? 'dark' : 'light'
            if (themeTarget === theme?.type) return
            themeAllowed(themeTarget) &&
              selectTheme({ type: themeTarget, isAuto: false })
          }}
        />
      </li>
      <li>
        <SelectButton
          text={lang.settings.language}
          values={[
            lang.settings.languageSpanish,
            lang.settings.languageEnglish,
          ]}
          value={
            selectedLang === 'en'
              ? lang.settings.languageEnglish
              : lang.settings.languageSpanish
          }
          onClickOption={(target) =>
            toggleLang(target === lang.settings.languageSpanish ? 'es' : 'en')
          }
        />
      </li>
    </>
  )
}

export default Settings
