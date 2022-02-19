import { FC, SetStateAction, Dispatch } from 'react'
import styles from '../../../pages/CryptoPage/CryptoPage.module.scss'
import clsx from 'clsx'
import { CryptoItemType } from 'pages/CryptoPage/CryptoPage'
import { useAppDispatch } from '../../../hooks/redux'
import { loadGraphicsDataByCryptoName } from '../../../redux/reducers/cryptoReducer'
import { ReactComponent as BitcoinLogo } from '../../../assets/images/bitcoin-btc-logo 1.svg'

interface ICryptoItem {
  value: number
  title: string
  isGreen: boolean
  tabIndex: number
  activeItem: number
  setActiveItem: Dispatch<SetStateAction<number>>
}

const CryptoItem: FC<ICryptoItem> = ({
  value,
  title,
  isGreen,
  tabIndex,
  setActiveItem,
  activeItem,
}) => {
  const isActive = tabIndex === activeItem
  const dispatch = useAppDispatch()
  const handleClick = () => {
    dispatch(loadGraphicsDataByCryptoName(title))
    setActiveItem(tabIndex)
  }
  return (
    <div
      onClick={handleClick}
      tabIndex={tabIndex}
      className={clsx([
        isActive && styles.card_items__active,
        styles.card_items__item,
      ])}
    >
      <BitcoinLogo
        className={clsx([
          styles.card_items__image,
          isGreen ? styles.green : styles.red,
        ])}
      />

      <div className={styles.currency_block}>
        <span className={styles.crypto_16px}>{title}</span>
        {/*  <span
          className={clsx([
            styles.currency_percent,
            isUp ? styles.green : styles.red,
          ])}
        >
          {percent}
        </span>*/}
      </div>
      <span className={styles.crypto_currency}>{value} $</span>
      {/*<span className={styles.crypto_16px}>{oldValue}</span>*/}
    </div>
  )
}

export default CryptoItem