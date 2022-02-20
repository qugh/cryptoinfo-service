import { FC, useEffect, useState } from 'react'
import styles from './CryptoPage.module.scss'
import 'swiper/scss'
import 'swiper/scss/navigation'
import 'swiper/scss/pagination'
import 'swiper/scss/scrollbar'
import Chart from '../../components/Chart/Chart'
import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import {
  loadAllCardsData,
  loadGraphicsDataByCryptoName,
} from '../../redux/reducers/cryptoReducer'
import getCrypto from '../../redux/selectors/cryptoSelector'
import { Slider } from '../../components/Slider/Slider'
import {refreshItemsInterval} from "../../constants/variables";

export type CryptoItemType = {
  title: string
  oldValue?: number
  value: number
  percent?: string
  isUp?: boolean | true
  isGreen?: boolean | true
  onClick?: any
  tabIndex?: number
}

export type graphicDataType = {
  title: string
  high: number
  low: number
  date: string
}
const CryptoPage: FC = () => {
  const [activeItem, setActiveItem] = useState(0)

  const dispatch = useAppDispatch()
  const { error, loading, cryptoValues, chartData } = useAppSelector(getCrypto)
  useEffect(() => {
    setInterval(()=>dispatch(loadAllCardsData()),refreshItemsInterval)
    dispatch(loadAllCardsData())
    dispatch(loadGraphicsDataByCryptoName('BTC'))
  }, [])

  return (
    <>
      <div className={styles.container}>
        {!!error && error}
        <div style={{ height: '375px' }}>
          {loading === 'succeeded' && <Chart data={chartData} />}
        </div>
        <div className={styles.card_items}>
          {loading === 'succeeded' && (
            <Slider
              activeItem={activeItem}
              setActiveItem={setActiveItem}
              cryptoValues={cryptoValues}
            />
          )}
        </div>
      </div>
    </>
  )
}

export default CryptoPage
