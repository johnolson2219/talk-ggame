import { type ComponentProps } from 'react'
import cn from 'classnames'
import styles from './button.module.css'
import utilStyles from '../../styles/utils.module.css'

interface ButtonProps extends ComponentProps<'button'> {
  children: JSX.Element | string
  newClass?: string
  handleClick?: () => void
}

function Button({ children, newClass, handleClick, ...props }: ButtonProps) {
  return (
    <button
      className={cn(styles.button, utilStyles.mediumq, {
        [newClass || 'none']: newClass,
      })}
      onClick={handleClick}
      {...props}
    >
      {children}
    </button>
  )
}

export default Button
