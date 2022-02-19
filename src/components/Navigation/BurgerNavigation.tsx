import {Dispatch, FC, SetStateAction} from "react";
import {INavigation} from "./Navigation";
import styles from './BurgerNavigation.module.scss'
import { NavLink } from 'react-router-dom'
import ContactsIcon from '@mui/icons-material/Contacts';
import BurgerButton from "../common/BurgerBtn/BurgerButton";
import clsx from "clsx";
interface IBurgerNavigation extends  INavigation {
    title:string,
    setBurgerMenuStatus: Dispatch<SetStateAction<boolean>>,
    burgerMenuStatus: boolean
}

const BurgerNavigation:FC<IBurgerNavigation> = ({items,title,setBurgerMenuStatus,burgerMenuStatus}) => {
    const handleClick = () => {
        setBurgerMenuStatus((prev)=>!prev)
    }
    return(
<div className={clsx([styles.menu, burgerMenuStatus && styles.active])}>
    <div className={styles.blur}></div>
    <div className={styles.menu__content}>

        <div className={styles.menu__header}><BurgerButton onClick={handleClick}/><span className={styles.menu__title}>{title}</span></div>
        <ul className={styles.menu__header_ul}>
            {items.map(item=> (
                <li key={item.title}>
                    <NavLink onClick={handleClick} to={item.path}>{item.title}</NavLink>
                    {/*<ContactsIcon className={styles.menu__icon}/>*/}
                </li>
            ))}
        </ul>
    </div>
</div>
    )

}

export default BurgerNavigation