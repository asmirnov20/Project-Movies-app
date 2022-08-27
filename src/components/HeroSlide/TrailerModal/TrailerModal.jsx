import { useState, useEffect } from "react"
import tmdbApi, { category } from "../../../api/tmdbApi"
import './TrailerModal.scss'

const TrailerModal = ({ item, setShowTrailer }) => {


    const [trailerSrc, setTrailerSrc] = useState('')

    useEffect(() => {
        // получаем трейлер
        const getTrailer = async () => {
            const response = await tmdbApi.getVideos(category.movie, item.id)
            console.log(response);
            if (response.results) {
                const fullURL = 'https://www.youtube.com/embed/' + response.results[0].key
                setTrailerSrc(fullURL)
            }
        }

        getTrailer()

    }, [item.id])


    const closeModal = () => {
        setShowTrailer(false)
    }

    console.log(trailerSrc);
    return (
        <div className='modal' >
            <div className="modal__content">

                {trailerSrc && (
                    <>
                        <iframe src={trailerSrc} width='100%' height='500px' title='trailer'></iframe>

                        <div className="modal__content__close" onClick={closeModal}>
                            <i className="bx bx-x"></i>
                        </div>
                    </>
                )}

                {!trailerSrc && (
                    <div> No trailer...</div>
                )}

            </div>
        </div>
    )
}

export default TrailerModal