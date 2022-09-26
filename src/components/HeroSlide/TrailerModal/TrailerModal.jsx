import { useState, useEffect } from "react"
import tmdbApi, { category } from "../../../api/tmdbApi"
import { useStateContext } from "../../../context/StateContext"
import { motion } from 'framer-motion'
import { fadeInDown } from "../../../animations/animations"
import { useRef } from "react"
import './TrailerModal.scss'

const TrailerModal = ({ item }) => {

    const { setShowTrailer } = useStateContext()
    const [trailerSrc, setTrailerSrc] = useState('')
    const trailerRef = useRef()

    useEffect(() => {
        // получаем трейлер
        const getTrailer = async () => {
            const response = await tmdbApi.getVideos(category.movie, item.id)

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

    return (
        <motion.div
            ref={trailerRef}
            className='modal'
            variants={fadeInDown}
            initial='initial'
            animate='animate'
            exit='exit'
        >
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
        </motion.div>
    )
}

export default TrailerModal