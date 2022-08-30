import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import tmdbApi from "../api/tmdbApi"
import apiConfig from "../api/apiConfig"
import CastList from "../components/Detail/CastList"
import '../components/Detail/Detail.scss'

const Detail = () => {

  const { urlCategory, id } = useParams()
  console.log(useParams());

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
    <>
      {item && (
        <>
          <div className="banner" style={background}></div>
          <div className="mb-3 movie-content container">

            <div className="movie-content__poster">
              <div className="movie-content__poster__img" style={background}>
              </div>
            </div>

            <div className="movie-content__info">
              <h1 className="title">
                {item.title || item.name}
              </h1>
              <div className="genres">
                {item.genres && item.genres.slice(0, 5).map((genre, index) => (
                  <span key={index} className="genres__item">
                    {genre.name}
                  </span>
                ))}
              </div>

              <p className="overview">
                {item.overview}
              </p>

              <div className="cast">
                <div className="section__header">
                  <h2>Casts</h2>
                </div>
                <CastList id={item.id} />
              </div>

            </div>
          </div>

        </>
      )
      }
    </>
  )
}

export default Detail