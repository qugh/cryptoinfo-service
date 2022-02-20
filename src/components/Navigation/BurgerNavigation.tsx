import { Dispatch, FC, SetStateAction, useEffect } from 'react'
import { INavigation } from './Navigation'
import styles from './BurgerNavigation.module.scss'
import { NavLink, useLocation } from 'react-router-dom'
import BurgerButton from '../common/BurgerBtn/BurgerButton'
import clsx from 'clsx'
import useWindowSize from '../../hooks/useWindowSize'
import Button from '../Button/Button'
import { CRYPTO_PATH } from '../../constants/routes'
import { TRANSPARENT_BUTTON } from 'constants/types'

interface IBurgerNavigation extends INavigation {
  title: string
  setBurgerMenuStatus: Dispatch<SetStateAction<boolean>>
  burgerMenuStatus: boolean
}

const BurgerNavigation: FC<IBurgerNavigation> = ({
  items,
  title,
  setBurgerMenuStatus,
  burgerMenuStatus,
}) => {
  const handleClick = () => {
    setBurgerMenuStatus((prev) => !prev)
  }
  const { width } = useWindowSize()
  useEffect(() => {
    if (burgerMenuStatus && width! > 992) {
      setBurgerMenuStatus(false)
    }
  }, [width,setBurgerMenuStatus,burgerMenuStatus])
  let location = useLocation()
  const isButtonVisible = location.pathname !== '/crypto'
  return (
    <div className={clsx([styles.menu, burgerMenuStatus && styles.active])}>
      <div className={styles.blur}></div>
      <div className={styles.menu__content}>
        <div className={styles.menu__header}>
          <BurgerButton onClick={handleClick} />
          <span className={styles.menu__title}>{title}</span>
        </div>
        <ul className={styles.menu__header_ul}>
          {items.map((item) => (
            <li key={item.title}>
              <NavLink onClick={handleClick} to={item.path}>
                {item.title}
              </NavLink>
            </li>
          ))}
          {isButtonVisible && (
            <Button
              onClick={handleClick}
              type={TRANSPARENT_BUTTON}
              title={'Start'}
              path={CRYPTO_PATH}
            />
          )}
        </ul>
      </div>
    </div>
  )
}

export default BurgerNavigation
