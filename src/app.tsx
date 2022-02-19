import React, {FC, useState} from 'react'
import Header from './components/Header/Header'
import { Route, Routes, useRoutes } from 'react-router-dom'
import routes, { menuItems } from './constants/routes'
import styles from './app.module.scss'
import BurgerNavigation from './components/Navigation/BurgerNavigation'

const AppContainer: FC = () => {
    const [burgerMenuStatus,setBurgerMenuStatus] = useState(false)
  const elements = useRoutes(routes)
  return (
    <>
      <div className={styles.container}>
        <Header setBurgerMenuStatus={setBurgerMenuStatus} />
        {elements}
      </div>
        <BurgerNavigation burgerMenuStatus={burgerMenuStatus} setBurgerMenuStatus={setBurgerMenuStatus} items={menuItems} header={'Neoflex'} />
    </>
  )
}

export default AppContainer
