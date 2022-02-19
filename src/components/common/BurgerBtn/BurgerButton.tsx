import {FC} from "react";
import styles from './BurgerButton.module.scss'

interface IBurgerButton {
    onClick: () => void
}

const BurgerButton:FC<IBurgerButton> = ({onClick}) => (<button onClick={onClick} className={styles.burger_btn}>
    <span></span>
</button>)

export default BurgerButton
