import { type MouseEvent, useState, useEffect, useRef } from 'react'
import cn from 'classnames'
import CogSVG from '../svgIcons/cogIcon'
import styles from './toolbar.module.css'
import Settings from '../settings'

type Tag = 'setting' | 'account' | 'messages'

interface ToolbarProps {
  invisible?: boolean
}

interface ToolbarState {
  menu:
    | {
        open: false
      }
    | { open: true; tag: Tag }
}

function tagAllowed(tag: string): tag is Tag {
  const allowTags = ['setting', 'account', 'messages']
  return allowTags.includes(tag)
}

function Toolbar({ invisible }: ToolbarProps) {
  const [menu, setMenu] = useState<ToolbarState['menu']>({ open: false })
  const menuRef = useRef<HTMLUListElement>(null)

  function handleClickOverlay() {
    setMenu({ open: false })
  }

  function handleClickIcon({
    currentTarget,
  }: MouseEvent<HTMLElement | SVGSVGElement>) {
    const tag = currentTarget.dataset.tag

    if (!tag) return
    if (!tagAllowed(tag)) return

    setMenu(({ open }) => {
      if (open) return { open: false }
      return {
        open: true,
        tag: tag,
      }
    })
  }

  useEffect(() => {
    if (!menuRef.current) return

    if (menu.open === true) {
      menuRef.current.style.zIndex = '100'
    } else {
      setTimeout(() => menuRef.current?.removeAttribute('style'), 500)
    }
  }, [menu.open])

  return (
    <div
      className={cn(styles.container, {
        [styles.containerInvisible]: invisible,
      })}
    >
      <div
        className={cn(styles.overlay, { [styles.overlayShow]: menu.open })}
        onClick={handleClickOverlay}
      />
      <nav className={styles.nav}>
        <span>
          <CogSVG
            className={cn(styles.icon, {
              [styles.iconActive]: menu.open && menu.tag === 'setting',
            })}
            data-tag='setting'
            onClick={handleClickIcon}
          />
        </span>
      </nav>
      <ul
        className={cn(styles.menu, { [styles.menuOpen]: menu.open })}
        ref={menuRef}
      >
        <Settings />
      </ul>
    </div>
  )
}

export default Toolbar
