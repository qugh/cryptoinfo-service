import CryptoPage from '../pages/CryptoPage/CryptoPage'
import { RouteObject } from 'react-router-dom'
import ErrorPage from '../pages/ErrorPage/ErrorPage'
import HomePage from '../pages/HomePage/HomePage'

const ABOUT_PATH = '/about'
const HOME_PATH = ''
const FAQ_PATH = '/faq'
const SETTINGS_PATH = '/settings'
const CONTACT_PATH = '/contact'
const CRYPTO_PATH = '/crypto'

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
  {
    title: 'About',
    path: ABOUT_PATH,
  },
  {
    title: 'Contact us',
    path: CONTACT_PATH,
  },
  {
    title: 'Settings',
    path: SETTINGS_PATH,
  },
]

export default routes
