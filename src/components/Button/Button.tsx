import { FC } from 'react'
import { NavLink } from 'react-router-dom'
import clsx from 'clsx'
import styles from './Button.module.scss'
import { TRANSPARENT_BUTTON, BLUE_BUTTON } from '../../constants/types'

interface ButtonProps {
  type: string
  title: string
  className?: string
  path: string | ''
}

const Button: FC<ButtonProps> = ({ type, className, title, path }) => {
  return (
    // <button
    //   className={clsx(
    //     type == TRANSPARENT_BUTTON
    //       ? styles.transparent_button
    //       : styles.blue_button,
    //     styles.default_button,
    //     className
    //   )}
    // >
      <NavLink  className={clsx(
          type == TRANSPARENT_BUTTON
              ? styles.transparent_button
              : styles.blue_button,
          styles.default_button,
          className
      )} to={path}>{title}</NavLink>
    // </button>
  )
}

export default Button