import { type MouseEvent, useEffect, useState } from 'react'
import cn from 'classnames'
import styles from './selectButton.module.css'
import utilStyle from '../../styles/utils.module.css'

interface SelectButtonProps {
  text: string
  values: string[]
  value?: string
  initialValue?: string
  disabled?: boolean
  onClickSelect?: (event: MouseEvent<HTMLElement | HTMLButtonElement>) => void
  onClickOption?: (
    target: string,
    event: MouseEvent<HTMLElement | HTMLDivElement>
  ) => void
}

interface SwitchButtonState {
  menu: {
    open: boolean
    value?: string | null
  }
}

function SelectButton({
  text,
  values,
  value,
  initialValue,
  disabled,
  onClickSelect,
  onClickOption,
}: SelectButtonProps) {
  const [menu, setMenu] = useState<SwitchButtonState['menu']>({
    open: false,
    value: initialValue || value || '',
  })

  function handleClickSelect(
    event: MouseEvent<HTMLElement | HTMLButtonElement>
  ) {
    onClickSelect && onClickSelect(event)
    setMenu({ open: !menu.open, value: menu.value })
  }

  function handleBlurSelect() {
    setMenu({ open: false, value: menu.value })
  }

  function handleClickOption(event: MouseEvent<HTMLElement | HTMLDivElement>) {
    event.stopPropagation()
    if (!event.currentTarget.dataset.option) return

    onClickOption && onClickOption(event.currentTarget.dataset.option, event)
    setMenu({ open: false, value: event.currentTarget.dataset.option })
  }

  useEffect(() => {
    if (typeof value === 'undefined' || value === menu.value) return
    setMenu({ open: false, value })
  }, [value])

  return (
    <button
      className={styles.button}
      disabled={disabled}
      onClick={handleClickSelect}
      onBlur={handleBlurSelect}
    >
      <span>{text}</span>
      <div>
        <span className={cn(styles.textValue, utilStyle.small)}>
          {menu.value || ''}
        </span>
        <ul className={cn(styles.menu, { [styles.menuOpen]: menu.open })}>
          {values.map((value, index) => (
            <li key={index}>
              <div
                className={styles.option}
                data-option={value}
                onClick={handleClickOption}
              >
                {value}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </button>
  )
}

export default SelectButton
