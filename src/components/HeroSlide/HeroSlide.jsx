import tmdbApi, { movieType } from "../../api/tmdbApi"
import { useState, useEffect, useRef } from "react"
import SwiperCore, { Autoplay } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'
import './HeroSlide.scss'
import SlideItem from "./SlideItem/SlideItem"

const HeroSlide = () => {

    SwiperCore.use([Autoplay])

    const [movieItems, setMovieItems] = useState([])

    useEffect(() => {
        const getMovies = async () => {
            // const params = { page: 1, language: 'ru-RU' }
            const params = { page: 1 }
            try {
                const response = await tmdbApi.getMoviesList(movieType.popular, { params })
                setMovieItems(response.results.slice(0, 4))
            } catch (err) {
                console.log(err);
            }
        }

        getMovies()
    }, [])

    const swiperRef = useRef(null);

    const autoplayOff = () => {
        swiperRef.current.swiper.autoplay.stop()
    }
    const autoplayOn = () => {
        swiperRef.current.swiper.autoplay.start()
    }

    return (
        <div className="hero-slide"
            onMouseEnter={autoplayOff}
            onMouseLeave={autoplayOn}>
            <Swiper
                ref={swiperRef}
                modules={[Autoplay]}
                spaceBetween={0}
                slidesPerView={1}
                rewind={true}
                autoplay={{ delay: 5000 }}
            >
                {movieItems.map((item, index) => (
                    <SwiperSlide key={index}>
                        <SlideItem
                            item={item}
                        />
                    </SwiperSlide>
                ))}

            </Swiper >

        </div >
    )
}

export default HeroSlide