import { useEffect } from "react"
import { useParams } from "react-router-dom"
// import tmdbApi, { movieType, tvType } from "../../api/tmdbApi"
import { OutlineButton } from "../Buttons/Button"
import MoviCard from '../MovieList/MovieCard/MovieCard'
import MovieSearch from './MovieSearch/MovieSearch'
import './MovieGrid.scss'
import { useStateContext } from "../../context/StateContext"
import FilterModal from "../../components/FilterModal/FilterModal";
import FilterButton from "../Buttons/FilterButton"
import { AnimatePresence } from "framer-motion"
import { motion } from "framer-motion"
import { filterAnimate } from "../../animations/animations"


const MovieGrid = ({ urlCategory }) => {

    const { searchWord } = useParams()

    const { items, displayedPages, existingPages, getNeededList, loadMore, showFilter } = useStateContext()
    console.log('items', items);
    useEffect(() => {

        getNeededList(urlCategory, searchWord)
        window.scrollTo(0, 0)
    }, [urlCategory, searchWord])

    return (
        <>
            <div className="section mb-2">
                <MovieSearch urlCategory={urlCategory} />
                <FilterButton />
            </div>
            <AnimatePresence>
                {showFilter && (
                    <motion.div className="mb-3" variants={filterAnimate} initial='initial' animate='animate' exit='exit'>
                        <FilterModal urlCategory={urlCategory} />
                    </motion.div>
                )}
            </AnimatePresence>
            <div className="movie-grid">
                {items && items.map((item, index) => (
                    <MoviCard urlCategory={urlCategory} item={item} key={index} />
                ))}
            </div>

            {displayedPages < existingPages ? (
                <div className="movie-grid__loadmore">
                    <OutlineButton className='small' onClick={() => loadMore(urlCategory, searchWord)}>
                        Load more
                    </OutlineButton>
                </div>
            ) : null}

        </>
    )
}

export default MovieGrid