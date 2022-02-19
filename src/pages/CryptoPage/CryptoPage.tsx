import {FC, LegacyRef, useEffect, useRef, useState} from 'react'
import styles from './CryptoPage.module.scss'
import image from '../../assets/images/header_image.jpg'
import CryptoItem from '../../components/common/CryptoItem/CryptoItem'
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper'
import ParentSize from '@visx/responsive/lib/components/ParentSize';
import { Swiper, SwiperSlide } from 'swiper/react'
import { v4  } from 'uuid';
// Import Swiper styles
import 'swiper/scss'
import 'swiper/scss/navigation'
import 'swiper/scss/pagination'
import 'swiper/scss/scrollbar'
import SlideNextButton from './SliderComp'
import Chart from 'components/Chart/Chart'
import useWindowSize from 'hooks/useWindowSize'
import Chart2 from "../../components/Chart2/Chart2";
import Chart3 from "../../components/Chart3/Chart3";
import {useAppDispatch, useAppSelector} from "../../hooks/redux";
import {loadAllCardsData, loadGraphicsDataByCryptoName} from "../../redux/reducers/cryptoReducer";
import getCrypto, {getBTCGraphics, getBTCPrice} from "../../redux/selectors/cryptoSelector";
import {CryptoCurrency} from "../../types/CryptoCurrency";


export type CryptoItemType = {
  title: string
  oldValue?: number
  value: number
  percent?: string
  isUp?: boolean | true
  isGreen?: boolean | true
  onClick?: any
  tabIndex? :number
}



export type graphicDataType = {
  title:string,high:number,low:number,date:string
}
const CryptoPage: FC = () => {
const [cryptoItems,setCryptoItems] = useState<Array<CryptoItemType>>([
  {
    title: 'BTC/UTC',
    oldValue: 36.211,
    value: 36.272,
    percent: '7,3%',
    isUp: false,
    isGreen: false,
  },
])
  const [data, setData] = useState<graphicDataType[]>([
    {title:'BTC',high:35,low:20,date:'23'},{title:'BTC',high:35,low:30,date:'23'}
  ])
const dispatch = useAppDispatch()
const {error,loading,cryptoValues} = useAppSelector(getCrypto)
  console.log('cryptova',cryptoValues)
  const items = useAppSelector(getBTCPrice)
  const graphicItems = useAppSelector(getBTCGraphics)
  useEffect(() => {
    dispatch(loadAllCardsData())
  },[])

  const Slider = () => (  <Swiper
      modules={[Navigation, Pagination, Scrollbar, A11y]}
      spaceBetween={15}
      slidesPerView={2}
      breakpoints={{
        '650': {slidesPerView: 2},
        '968': { slidesPerView: 2 },
        '1268': {slidesPerView: 3},
        /* '650': {slidesPerView: 2},
         '968': { slidesPerView: 3 },
         '1268': {slidesPerView: 4},*/
      }}
      navigation
  >

    {cryptoValues.map((item, key) => (
        <>
        <SwiperSlide key={v4()} virtualIndex={key}>
          <CryptoItem
              title={item.name}
              /*oldValue={item.value}*/
              value={item.value}
              percent={'2.3%'}
              isUp={true}
              isGreen={true}
              // tabIndex={key}
          />
        </SwiperSlide>
        </>
    ))}
  </Swiper>)
  useEffect(()=> {
     //dispatch(loadGraphicsDataByCryptoName('BTC')) // загрузка данных о монетах
  },[])

  useEffect(() => {
    if(graphicItems.length) {
      setCryptoItems([{title:'BTC',percent:'2',value:items.high,oldValue:items.low}])
      setData([...graphicItems])
    }
  },[graphicItems])
  return (
    <>
      <div className={styles.container}>
{/*        <ParentSize>{(parent) => ( <Chart width={ parent.width} height={350}/>)}</ParentSize>
<Chart2/>*/}
   {/*     {!error && loading==='succeeded' && BTC.map((item)=>{
          return(<div key={item.low}><span>low: {item.low}</span> <br/><span>time: {new Date(item.time*1000).toLocaleString()}</span></div>)
        })}*/}
        {loading==='pending' && 'Loading'}
        {!!error && error}

        {loading ==='succeeded' &&  <div style={{height:'350px'}}>
          <Chart3 data={data}/></div>}


        <div className={styles.card_items}>
          {loading ==='succeeded'&& <Slider/>}
        </div>
      </div>
    </>
  )
}

export default CryptoPage
