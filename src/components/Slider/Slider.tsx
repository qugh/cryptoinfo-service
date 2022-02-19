import { cryptoValuesType } from 'redux/reducers/cryptoReducer'
import { A11y, Navigation, Pagination, Scrollbar } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'
import CryptoItem from '../common/CryptoItem/CryptoItem'
import {FC, useState} from 'react'
import { Dispatch, SetStateAction } from 'react'
import { ReactComponent as BitcoinLogo } from '../../assets/images/bitcoin-btc-logo.svg'
import { ReactComponent as BNBLogo } from '../../assets/images/bnb-bnb-logo.svg'
import { ReactComponent as ADALogo } from '../../assets/images/cardano-ada-logo.svg'
import { ReactComponent as DogeLogo } from '../../assets/images/dogecoin-doge-logo.svg'
import { ReactComponent as ETHLogo } from '../../assets/images/ethereum-eth-logo.svg'
import { ReactComponent as DOTLogo } from '../../assets/images/polkadot-new-dot-logo.svg'

const cryptoLogos = {
  BTC:BitcoinLogo,
    BNB: BNBLogo,
    ADA: ADALogo,
    DOGE: DogeLogo,
    // ETH:ETHLogo,
    DOT:DOTLogo
}

interface ISliderTypes {
  cryptoValues: cryptoValuesType[]
  activeItem: number
  setActiveItem: Dispatch<SetStateAction<number>>
}

export const Slider: FC<ISliderTypes> = ({
  cryptoValues,
  activeItem,
  setActiveItem,
}: any) => {

    return <><Swiper
        modules={[Navigation, Pagination, Scrollbar, A11y]}
        spaceBetween={15}
        slidesPerView={1}
        breakpoints={{
            '650': {slidesPerView: 2},
            '968': {slidesPerView: 3},
            '1268': {slidesPerView: 4},
        }}
        navigation
    >
        {cryptoValues.map((item: cryptoValuesType, key: number) => (
            <SwiperSlide key={item.value} virtualIndex={key}>
                <CryptoItem
                    title={item.name}
                    /*oldValue={item.value}*/
                    value={item.value}
                    isGreen={true}
                    tabIndex={key}
                    activeItem={activeItem}
                    setActiveItem={setActiveItem}
                    cryptoLogos={cryptoLogos}
                />
            </SwiperSlide>
        ))}
    </Swiper>
        </>
}

