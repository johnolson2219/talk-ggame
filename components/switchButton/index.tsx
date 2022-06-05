import { type MouseEvent, useEffect, useState } from 'react'
import cn from 'classnames'
import styles from './switchButton.module.css'

interface SwitchButtonProps {
  text: string
  active?: boolean
  initialValue?: boolean
  onClick?: (value: boolean, event: MouseEvent<HTMLButtonElement>) => void
}

interface SwitchButtonState {
  active: boolean
}

function SwitchButton({
  text,
  active: isActive,
  initialValue,
  onClick = () => {},
}: SwitchButtonProps) {
  const [active, setActive] = useState<SwitchButtonState['active']>(
    initialValue ?? false
  )

  function handleClickSwitch(event: MouseEvent<HTMLButtonElement>) {
    onClick(active, event)
    setActive(!active)
  }

  useEffect(() => {
    if (typeof isActive === 'undefined') return
    setActive(isActive)
  }, [isActive])

  return (
    <button
      className={cn(styles.button, { [styles.buttonActive]: active })}
      onClick={handleClickSwitch}
    >
      <span>{text}</span>
      <span className={styles.switch} />
    </button>
  )
}

export default SwitchButton
