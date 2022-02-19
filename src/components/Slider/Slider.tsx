import { cryptoValuesType } from 'redux/reducers/cryptoReducer'
import {A11y, Navigation, Pagination, Scrollbar} from "swiper";
import { Swiper, SwiperSlide } from 'swiper/react'
import CryptoItem from "../common/CryptoItem/CryptoItem";
import {FC} from "react";
import {Dispatch,SetStateAction} from "react";

interface ISliderTypes {
    cryptoValues: cryptoValuesType[],
    activeItem: number,
    setActiveItem: Dispatch<SetStateAction<number>>
}

export const Slider:FC<ISliderTypes> = ({cryptoValues,activeItem,setActiveItem}:any) => (
    <Swiper
        modules={[Navigation, Pagination, Scrollbar, A11y]}
        spaceBetween={15}
        slidesPerView={1}
        breakpoints={{
            '650': { slidesPerView: 2 },
            '968': { slidesPerView: 3 },
            '1268': { slidesPerView: 4 },
        }}
        navigation
    >
        {cryptoValues.map((item:cryptoValuesType, key:number) => (
            <SwiperSlide key={item.value} virtualIndex={key}>
                <CryptoItem
                    title={item.name}
                    /*oldValue={item.value}*/
                    value={item.value}
                    isGreen={true}
                    tabIndex={key}
                    activeItem={activeItem}
                    setActiveItem={setActiveItem}
                />
            </SwiperSlide>
        ))}
    </Swiper>
)