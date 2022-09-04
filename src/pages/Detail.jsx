import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import tmdbApi from "../api/tmdbApi"
import apiConfig from "../api/apiConfig"
import CastList from "../components/Detail/CastList"
import VideoList from "../components/Detail/VideoList"
import MovieList from '../components/MovieList/MovieList'
import '../components/Detail/Detail.scss'
import { pageTransition, fadeInRight, stagger, detailsFadeInUp } from '../animations/animations'
import { motion } from 'framer-motion'
import MovieSearch from "../components/MovieGrid/MovieSearch/MovieSearch"

const Detail = () => {

  const { urlCategory, id } = useParams()

  const [item, setItem] = useState([])

  useEffect(() => {
    const getDetail = async () => {
      const response = await tmdbApi.detail(urlCategory, id, { params: {} })
      setItem(response)
      window.scrollTo(0, 0)
    }

    getDetail()
  }, [urlCategory, id])

  const background = { backgroundImage: `url(${apiConfig.originalImage(item.backdrop_path || item.poster_path)})` }

  return (


    <motion.div initial='initial' animate='animate' exit='exit' variants={pageTransition}>
    
      {item && (
        <>
          <div className="banner" style={background}></div>
          <div className="mb-3 movie-content container">
            <div className="movie-content__poster">
              <motion.div variants={fadeInRight} className="movie-content__poster__img" style={background}>
              </motion.div>
            </div>

            <motion.div
              initial='initial'
              whileInView='animate'
              variants={stagger}
              viewport={{ once: true }}
              className="movie-content__info"
            >
              <motion.h1 variants={detailsFadeInUp} className="title">
                {item.title || item.name}
              </motion.h1>
              <motion.div variants={detailsFadeInUp} className="genres">
                {item.genres && item.genres.slice(0, 5).map((genre, index) => (
                  <span key={index} className="genres__item">
                    {genre.name}
                  </span>
                ))}
              </motion.div>
              <motion.p variants={detailsFadeInUp} className="overview">
                {item.overview}
              </motion.p>
              <motion.div variants={detailsFadeInUp} className="cast">
                <div className="section__header">
                  <h2>Casts</h2>
                </div>
                <CastList id={item.id} />
              </motion.div>
            </motion.div>
          </div>

          <div className="container">
            <div className="section mb-3">
              <VideoList id={item.id} urlCategory={urlCategory} />
            </div>

            <div className="section mb-3">
              <div className="section__header mb-2">
                <h2>Similar</h2>
              </div>
              <MovieList category={urlCategory} type="similar" id={item.id} />
            </div>
          </div>

        </>
      )
      }
    </motion.div>
  )
}

export default Detail