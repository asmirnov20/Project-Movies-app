import apiConfig from "../../../api/apiConfig"
import { useNavigate } from 'react-router-dom'
import Button, { OutlineButton } from '../../Buttons/Button'
import TrailerModal from "../TrailerModal/TrailerModal"
import { useStateContext } from "../../../context/StateContext"
import { motion } from "framer-motion"
import { fadeInUp, stagger, scaleAnimate } from "../../../animations/animations"
import { AnimatePresence } from 'framer-motion'

const SlideItem = ({ item }) => {

    const navigate = useNavigate()
    const { showTrailer, setShowTrailer } = useStateContext()

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

                <motion.div className="hero-slide__item__content__info"
                    initial='initial'
                    whileInView='animate'
                    exit={{ opacity: 0 }}
                    variants={stagger}
                    viewport={{ once: true }}
                >
                    <motion.h2 className="title" variants={fadeInUp}>
                        {item.title}
                    </motion.h2>
                    <motion.div variants={fadeInUp} className="overview">
                        {item.overview}
                    </motion.div>
                    <motion.div variants={fadeInUp} className="btns">
                        <Button onClick={navigateToMovie}>
                            Watch Now
                        </Button>

                        <OutlineButton className='btn-outline btn' onClick={getTrailer}>
                            Watch trailer
                        </OutlineButton>
                    </motion.div>
                </motion.div>

                <div className="hero-slide__item__content__poster">
                    <motion.img
                        variants={scaleAnimate}
                        initial='initial'
                        whileInView='animate'
                        src={apiConfig.w500Image(item.poster_path)} alt="poster" />
                </div>
            </div>

            <AnimatePresence>
                {showTrailer && (
                    <TrailerModal item={item} />
                )}
            </AnimatePresence>
        </div >
    )
}

export default SlideItem