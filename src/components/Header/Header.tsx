import { FC, Dispatch, SetStateAction } from 'react'
import styles from './Header.module.scss'
import { NavLink, useLocation } from 'react-router-dom'
import Button from '../Button/Button'
import { BLUE_BUTTON } from './../../constants/types'
import Navigation from '../Navigation/Navigation'
import { menuItems } from '../../constants/routes'
import BurgerButton from '../common/BurgerBtn/BurgerButton'
import { appTitle } from '../../constants/variables'

interface IHeader {
  setBurgerMenuStatus: Dispatch<SetStateAction<boolean>>
}

const Header: FC<IHeader> = ({ setBurgerMenuStatus }) => {
  const handleClick = () => {
    setBurgerMenuStatus((prev) => !prev)
  }
  let location = useLocation()
  const isButtonVisible = location.pathname !== '/crypto'
  return (
    <div className={styles.header_container}>
      <div className={styles.menu_with_logo}>
        <BurgerButton onClick={handleClick} />
        <h1 className={styles.header_logo}>
          <NavLink to={'/'}>{appTitle}</NavLink>
        </h1>
        <Navigation items={menuItems} />
      </div>
      <div className={styles.buttons_block}>
        {isButtonVisible && (
          <Button
            path={'/crypto'}
            title={'Start'}
            className={styles.button_margin}
            type={BLUE_BUTTON}
          />
        )}
        {/*<Button path={'/faq'} title={'FAQ'} type={TRANSPARENT_BUTTON} />*/}
      </div>
    </div>
  )
}

export default Header
