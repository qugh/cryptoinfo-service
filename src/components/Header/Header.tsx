import { FC,Dispatch,SetStateAction} from 'react'
import styles from './Header.module.scss'
import { NavLink } from 'react-router-dom'
import Button from '../Button/Button'
import { BLUE_BUTTON, TRANSPARENT_BUTTON } from './../../constants/types'
import Navigation from '../Navigation/Navigation'
import { menuItems } from '../../constants/routes'
import BurgerButton from "../common/BurgerBtn/BurgerButton";

interface IHeader {
    setBurgerMenuStatus:  Dispatch<SetStateAction<boolean>>
}

const Header: FC<IHeader> = ({setBurgerMenuStatus}) => {
    const handleClick = () =>{
        setBurgerMenuStatus((prev)=>!prev)
    }
  return (
    <div className={styles.header_container}>
      <div className={styles.menu_with_logo}>
          <BurgerButton onClick={handleClick}/>
        <h1 className={styles.header_logo}>
          <NavLink to={''}>Neoflex</NavLink>
        </h1>
        <Navigation items={menuItems} />
      </div>
      <div className={styles.buttons_block}>
        <Button path={''} title={'Start'} className={styles.button_margin} type={BLUE_BUTTON} />
        <Button path={''} title={'FAQ'} type={TRANSPARENT_BUTTON} />
      </div>
    </div>
  )
}

export default Header