
import { useSwiper } from 'swiper/react';

export default function SlideNextButton() {
    const swiper = useSwiper();

    return (
        <button onClick={() => swiper.slideNext(200,true)}>Slide to the next slide</button>
    );
}