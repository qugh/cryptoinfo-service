import { FC, LegacyRef, useEffect, useRef, useState } from 'react'
import styles from './CryptoPage.module.scss'
import image from '../../assets/images/header_image.jpg'
import CryptoItem from '../../components/common/CryptoItem/CryptoItem'
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper'
import ParentSize from '@visx/responsive/lib/components/ParentSize'
import { Swiper, SwiperSlide } from 'swiper/react'
import { v4 } from 'uuid'
// Import Swiper styles
import 'swiper/scss'
import 'swiper/scss/navigation'
import 'swiper/scss/pagination'
import 'swiper/scss/scrollbar'
import SlideNextButton from './SliderComp'
import Chart from 'components/Chart/Chart'
import useWindowSize from 'hooks/useWindowSize'
import Chart2 from '../../components/Chart2/Chart2'
import Chart3 from '../../components/Chart3/Chart3'
import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import {
  loadAllCardsData,
  loadGraphicsDataByCryptoName,
} from '../../redux/reducers/cryptoReducer'
import getCrypto from '../../redux/selectors/cryptoSelector'
import { CryptoCurrency } from '../../types/CryptoCurrency'
import {Slider} from "../../components/Slider/Slider";

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

  const [activeItem,setActiveItem] = useState(0)

  const dispatch = useAppDispatch()
  const { error, loading, cryptoValues,  chartData } = useAppSelector(getCrypto)
  useEffect(() => {
    dispatch(loadAllCardsData())
    dispatch(loadGraphicsDataByCryptoName('BTC'))

  }, [])





  return (
    <>
      <div className={styles.container}>
        {/*        <ParentSize>{(parent) => ( <Chart width={ parent.width} height={350}/>)}</ParentSize>
<Chart2/>*/}
        {/*     {!error && loading==='succeeded' && chartData.map((item)=>{
          return(<div key={item.low}><span>low: {item.low}</span> <br/><span>time: {new Date(item.time*1000).toLocaleString()}</span></div>)
        })}*/}

        {!!error && error}

        <div style={{ height: '350px' }}>
          {loading === 'succeeded' && <Chart3 data={chartData} />}
        </div>

        <div className={styles.card_items}>
          {loading === 'succeeded' && <Slider activeItem={activeItem} setActiveItem={setActiveItem} cryptoValues={cryptoValues} />}
        </div>
      </div>
    </>
  )
}

export default CryptoPage
