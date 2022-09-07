import { useState, useEffect, useRef } from 'react'
import { SwiperSlide, Swiper } from 'swiper/react'
import tmdbApi from '../../api/tmdbApi'
import './MovieList.scss'
import MovieCard from './MovieCard/MovieCard'


const MovieList = ({ category, type, id }) => {
    
    const [items, setItems] = useState([])

    const swiperRef = useRef()

    useEffect(() => {
        let response;
        let params = {}

        const getList = async () => {

            if (type !== 'similar') {
                switch (category) {
                    case 'movie':
                        // params внутри объекта для paramsSerializer чтобы добавить ключ
                        response = await tmdbApi.getMoviesList(type, { params });
                        break
                    default:
                        response = await tmdbApi.getTvList(type, { params })
                }
            } else {
                response = await tmdbApi.similar(category, id)
            }

            setItems(response.results)
        }

        getList()

    }, [category, id, type])

    const swipeNext = () => {
        swiperRef.current.swiper.slidePrev()
    }
    const swipePrev = () => {
        swiperRef.current.swiper.slideNext()
    }
    return (
        <div className='movie-list'>
            <Swiper
                ref={swiperRef}
                rewind={true}
                spaceBetween={10}
                slidesPerView={'auto'}
            >
                {items.map((item, index) => (
                    <SwiperSlide key={index}>
                        <MovieCard item={item} urlCategory={category} />
                    </SwiperSlide>
                ))}

                <i className="fa fa-angle-left fa-5x" onClick={swipeNext}></i>
                <i className="fa fa-angle-right fa-5x" onClick={swipePrev}></i>

            </Swiper>
        </div>
    )
}

export default MovieList