import apiConfig from "../../../api/apiConfig"
import { useNavigate } from 'react-router-dom'
import Button, { OutlineButton } from '../../Buttons/Button'
import TrailerModal from "../TrailerModal/TrailerModal"

const SlideItem = ({ item, setShowTrailer, showTrailer }) => {

    const navigate = useNavigate()

    const navigateToMovie = () => {
        navigate('/movie/' + item.id)
    }

    const background = apiConfig.originalImage(item.backdrop_path ? item.backdrop_path : item.poster_path)

    const getTrailer = () => {
        setShowTrailer(true)
    }

    return (
        <div className='hero-slide__item' style={{ backgroundImage: `url(${background})` }}>
            <div className="hero-slide__item__content container">

                <div className="hero-slide__item__content__info">
                    <h2 className="title">{item.title}</h2>
                    <div className="overview">{item.overview}</div>

                    <div className="btns">
                        <Button onClick={navigateToMovie}>
                            Watch Now
                        </Button>

                        <OutlineButton className='btn-outline btn' onClick={getTrailer}>
                            Watch trailer
                        </OutlineButton>
                    </div>
                </div>

                <div className="hero-slide__item__content__poster">
                    <img src={apiConfig.w500Image(item.poster_path)} alt="poster" />
                </div>
            </div>

            {showTrailer && (
                <TrailerModal item={item} setShowTrailer={setShowTrailer} />
            )}

        </div >
    )
}

export default SlideItem