import { FC } from 'react'
import { NavLink } from 'react-router-dom'
import clsx from 'clsx'
import styles from './Button.module.scss'
import { TRANSPARENT_BUTTON, BLUE_BUTTON } from '../../constants/types'

interface ButtonProps {
  type: typeof TRANSPARENT_BUTTON | typeof BLUE_BUTTON
  title: string
  className?: string
  path: string | ''
  onClick?: () => void
}

const Button: FC<ButtonProps> = ({ type, className, title, path, onClick }) => {
  return (
    <NavLink
      className={clsx(
        type === TRANSPARENT_BUTTON
          ? styles.transparent_button
          : styles.blue_button,
        styles.default_button,
        className
      )}
      to={path}
      onClick={onClick}
    >
      {title}
    </NavLink>
  )
}

export default Button
