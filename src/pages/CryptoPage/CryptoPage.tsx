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
import getCrypto, {getSortedCurrencies} from '../../redux/selectors/cryptoSelector'
import { Slider } from '../../components/Slider/Slider'
import { refreshItemsInterval } from '../../constants/variables'


const CryptoPage: FC = () => {
  const [activeItem, setActiveItem] = useState(0)
  const sortedCurrencies = useAppSelector(getSortedCurrencies)
  const dispatch = useAppDispatch()
  const { loading, chartData } = useAppSelector(getCrypto)
  useEffect(() => {
    console.log(sortedCurrencies[0]?.name)
    dispatch(loadAllCardsData())
    dispatch(loadGraphicsDataByCryptoName(sortedCurrencies[0]?.name)) //
  },[dispatch,sortedCurrencies[0]?.name])

  useEffect(() => {
    setInterval(() => dispatch(loadAllCardsData()), refreshItemsInterval)
  }, [dispatch])

  return (
    <>
      <div className={styles.container}>
        <div style={{ height: '375px' }}>
          {loading === 'succeeded' && <Chart data={chartData} />}
        </div>
        <div className={styles.card_items}>
          {loading === 'succeeded' && (
            <Slider
              activeItem={activeItem}
              setActiveItem={setActiveItem}
            />
          )}
        </div>
      </div>
    </>
  )
}

export default CryptoPage
