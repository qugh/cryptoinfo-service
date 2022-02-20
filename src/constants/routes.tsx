import CryptoPage from '../pages/CryptoPage/CryptoPage'
import { RouteObject } from 'react-router-dom'
import ErrorPage from '../pages/ErrorPage/ErrorPage'
import HomePage from '../pages/HomePage/HomePage'
import SettingsPage from "../pages/SettingsPage/SettingsPage";

export const ABOUT_PATH = '/about'
export const HOME_PATH = ''
export const FAQ_PATH = '/faq'
export const SETTINGS_PATH = '/settings'
export const CONTACT_PATH = '/contact'
export const CRYPTO_PATH = '/crypto'

const routes: RouteObject[] = [
  {
    path: HOME_PATH,
    element: <HomePage />,
  },
  {
    path: CRYPTO_PATH,
    element: <CryptoPage />,
  },
  {
    path:SETTINGS_PATH,
    element: <SettingsPage />
  },
  {
    path: '*',
    element: <ErrorPage />,
  },
]

export type menuItemsType = {
  title: string
  path: string
}

export const menuItems: Array<menuItemsType> = [
  { title: 'Home', path: HOME_PATH },
/*  {
    title: 'About',
    path: ABOUT_PATH,
  },
  {
    title: 'Contact us',
    path: CONTACT_PATH,
  },*/
  {
    title: 'Settings',
    path: SETTINGS_PATH,
  },
]

export default routes
