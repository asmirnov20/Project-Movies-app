import tmdbApi, { movieType } from "../../api/tmdbApi"
import { useState, useEffect, useRef } from "react"
import SwiperCore, { Navigation } from 'swiper'
import { Swiper, SwiperSlide } from 'swiper/react'
import './HeroSlide.scss'
import SlideItem from "./SlideItem/SlideItem"

const HeroSlide = () => {

    SwiperCore.use([Navigation])

    const [movieItems, setMovieItems] = useState([])

    useEffect(() => {
        const getMovies = async () => {
            // const params = { page: 1, language: 'ru-RU' }
            const params = { page: 1 }
            try {
                const response = await tmdbApi.getMoviesList(movieType.popular, { params })
                console.log(response);
                setMovieItems(response.results.slice(0, 4))
            } catch (err) {
                console.log(err);
            }
        }

        getMovies()
    }, [])

    const [showTrailer, setShowTrailer] = useState(false)

    const swiperRef = useRef(null);

    return (
        <div className="hero-slide">
            <Swiper
                ref={swiperRef}
                modules={[Navigation]}
                // grabCursor={true}
                // spaceBetween={0}
                // slidesPerView={1}
                rewind={true}

            // autoplay={{ delay: 3000 }}
            >
                {movieItems.map((item, index) => (
                    <SwiperSlide key={index}>
                        <SlideItem
                            item={item}
                            setShowTrailer={setShowTrailer}
                            showTrailer={showTrailer} />
                    </SwiperSlide>
                ))}
                <div className="slider-prev" onClick={() => swiperRef.current.swiper.slidePrev()}>
                    Prev
                </div>
                <div className='slider-next' onClick={() => swiperRef.current.swiper.slideNext()}>
                    Next
                </div>

            </Swiper >

        </div >
    )
}

export default HeroSlide