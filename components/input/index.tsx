import type { ComponentProps } from 'react'
import cn from 'classnames'
import styles from './input.module.css'
import utilStyles from '../../styles/utils.module.css'

interface InputProps extends ComponentProps<'input'> {
  id: string
  label: string
  value: string
}

function Input({ id, label, value, ...props }: InputProps) {
  return (
    <div className={cn(styles.inputWrapper, utilStyles.flexColumnCenter)}>
      <input className={styles.input} id={id} value={value} {...props} />
      {label && (
        <label
          className={cn(styles.label, { [styles.activeLabel]: value })}
          htmlFor={id}
        >
          {label}
        </label>
      )}
    </div>
  )
}

export default Input
