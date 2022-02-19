import {FC} from "react";
import styles from "../Header/Header.module.scss";
import { NavLink } from 'react-router-dom'
import { menuItemsType } from 'constants/routes'

export interface INavigation {
    items: Array<menuItemsType>
}

const Navigation: FC<INavigation> = ({items}) => (
    <div className={styles.header_menu}>
    <ul >
        {items.map((item)=> (
            <li key={item.title}><NavLink to={item.path}>{item.title}</NavLink></li>
        ))}
    </ul>
    </div>
)

export default Navigation