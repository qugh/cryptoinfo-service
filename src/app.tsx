import React, { FC, useState } from 'react'
import Header from './components/Header/Header'
import { useRoutes } from 'react-router-dom'
import routes, { menuItems } from './constants/routes'
import styles from './app.module.scss'
import BurgerNavigation from './components/Navigation/BurgerNavigation'
import { appTitle } from 'constants/variables'

const AppContainer: FC = () => {
  const [burgerMenuStatus, setBurgerMenuStatus] = useState(false)
  const elements = useRoutes(routes)
  return (
    <>
      <div className={styles.container}>
        <Header setBurgerMenuStatus={setBurgerMenuStatus} />
        {elements}
      </div>
      <BurgerNavigation
        burgerMenuStatus={burgerMenuStatus}
        setBurgerMenuStatus={setBurgerMenuStatus}
        items={menuItems}
        title={appTitle}
      />
    </>
  )
}

export default AppContainer
