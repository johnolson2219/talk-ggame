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
  const { selectedLang, toggleLang }: LanguageContextValue =
    useContext(LanguageContext)

  return (
    <>
      <li>
        <SwitchButton
          text='Auto theme:'
          initialValue={theme?.isAuto}
          onClick={(active) =>
            selectTheme({ type: theme?.type, isAuto: !active })
          }
        />
      </li>
      <li>
        <SelectButton
          text='Theme'
          values={['Dark', 'Light']}
          value={capitalize(theme?.type || '')}
          disabled={theme?.isAuto}
          onClickOption={(target) => {
            const themeTarget = target.toLowerCase()
            if (themeTarget === theme?.type) return
            themeAllowed(themeTarget) &&
              selectTheme({ type: themeTarget, isAuto: false })
          }}
        />
      </li>
      <li>
        <SelectButton
          text='Language'
          values={['English', 'Spanish']}
          value={selectedLang === 'en' ? 'English' : 'Spanish'}
          onClickOption={() => toggleLang()}
        />
      </li>
    </>
  )
}

export default Settings
