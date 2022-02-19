import { FC } from 'react'
import styles from '../../../pages/CryptoPage/CryptoPage.module.scss'
import clsx from 'clsx'
import { CryptoItemType } from 'pages/CryptoPage/CryptoPage'
import {useAppDispatch} from "../../../hooks/redux";
import {loadGraphicsDataByCryptoName} from "../../../redux/reducers/cryptoReducer";



const CryptoItem: FC<CryptoItemType> = ({
  value,
  oldValue,
  percent,
  title,
  isUp,
    isGreen,
    tabIndex
}) => {

    const dispatch = useAppDispatch()
    const handleClick = () => {

    }
  return (
    <div onClick={handleClick} tabIndex={tabIndex} className={styles.card_items__item}>
      <svg
        className={clsx([styles.card_items__image,isGreen?styles.green:styles.red])}
        width="46"
        height="46"
        viewBox="0 0 46 46"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M45.3093 28.5638C42.2375 40.8854 29.7577 48.384 17.4347 45.3114C5.11687 42.2396 -2.38179 29.7591 0.69138 17.4385C3.76185 5.11564 16.2416 -2.38358 28.5608 0.688238C40.8829 3.76005 48.3811 16.2419 45.3089 28.564L45.3092 28.5638H45.3093Z"
          fill="#FF5C00"
        />
        <path
          d="M33.142 19.7231C33.5998 16.6623 31.2695 15.017 28.083 13.9194L29.1167 9.77329L26.5928 9.1444L25.5865 13.1814C24.923 13.0159 24.2416 12.8599 23.5644 12.7054L24.578 8.64177L22.0557 8.01288L21.0214 12.1576C20.4724 12.0326 19.9331 11.9091 19.4099 11.7789L19.4128 11.7659L15.9323 10.8967L15.2609 13.5924C15.2609 13.5924 17.1334 14.0216 17.094 14.048C18.116 14.3031 18.3008 14.9797 18.2701 15.5159L17.0926 20.2393C17.163 20.2572 17.2543 20.2831 17.355 20.3235C17.2708 20.3026 17.1812 20.2798 17.0882 20.2575L15.4378 26.8743C15.3129 27.1849 14.9958 27.6508 14.2813 27.4739C14.3066 27.5105 12.4469 27.0161 12.4469 27.0161L11.1938 29.9051L14.4783 30.7239C15.0893 30.8771 15.688 31.0374 16.2777 31.1882L15.2333 35.3819L17.7542 36.0108L18.7885 31.8616C19.4772 32.0486 20.1456 32.221 20.7998 32.3836L19.7691 36.5132L22.293 37.1421L23.3373 32.9563C27.6411 33.7708 30.8771 33.4424 32.2392 29.5497C33.3368 26.4156 32.1846 24.6078 29.9204 23.429C31.5695 23.0486 32.8117 21.964 33.1429 19.7234L33.1421 19.7229L33.142 19.7231ZM27.3755 27.8091C26.5955 30.9432 21.3187 29.249 19.6078 28.8242L20.9938 23.2683C22.7045 23.6954 28.1907 24.5406 27.3756 27.8091H27.3755ZM28.1561 19.6777C27.4445 22.5285 23.0526 21.0801 21.6278 20.725L22.8844 15.6861C24.3091 16.0413 28.8973 16.7041 28.1563 19.6777H28.1561Z"
          fill="white"
        />
      </svg>

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
