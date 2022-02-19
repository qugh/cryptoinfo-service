import {FC} from "react";
import styles from './HomePage.module.scss'
import Button from "../../components/Button/Button";
import {BLUE_BUTTON} from "../../constants/types";
import graphImage from '../../assets/images/header_image.jpg'
const HomePage:FC = () => {
    return(<div className={styles.container}>
        <div className={styles.header_text}>
            <h1 className={styles.header_h1}>Find out the cryptocurrency rate right now</h1>
            <span className={styles.header_span}>This is going to be the most exciting crypto service you have ever tried in your life, keep going ;)</span>
            <Button  path={'/crypto'} type={BLUE_BUTTON} title={'Get started Now'}/>
        </div>
        <div className={styles.header_image}>
            <img src={graphImage} alt='image'/>
        </div>
    </div>)
}

export default HomePage
