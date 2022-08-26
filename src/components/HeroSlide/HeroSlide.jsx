import tmdbApi, { movieType } from "../../api/tmdbApi"
import { useState, useEffect } from "react"
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
                console.log(response);
                setMovieItems(response.results.slice(0, 4))
            } catch (err) {
                console.log(err);
            }
        }

        getMovies()
    }, [])

    const [showTrailer, setShowTrailer] = useState(false)

    return (
        <div className="hero-slide">
            <Swiper
                modules={[Autoplay]}
                grabCursor={true}
                spaceBetween={0}
                slidesPerView={1}
            // autoplay={{ delay: 3000 }}
            >
                {movieItems.map((item, index) => (
                    <SwiperSlide key={index}>
                        {({ isActive }) => (

                            <SlideItem item={item} className={`${isActive ? 'active' : ''}`} setShowTrailer={setShowTrailer} showTrailer={showTrailer} />
                        )}
                    </SwiperSlide>
                ))}
            </Swiper>



        </div >
    )
}

export default HeroSlide