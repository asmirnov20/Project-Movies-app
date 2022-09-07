import { useEffect } from "react"
import { useParams } from "react-router-dom"
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

    const { searchWord, genre } = useParams()

    const { items, displayedPages, existingPages, getNeededList, loadMore, showFilter, setShowFilter, showSearchWords, setShowSearchWords, handleFindByGenre, genreId } = useStateContext()

    useEffect(() => {

        // если ищем по категориям
        if (genreId) {
            handleFindByGenre(urlCategory, genreId)
            // дефолт
        } else {
            getNeededList(urlCategory, searchWord)
        }

        window.scrollTo(0, 0)
    }, [urlCategory, genre])


    useEffect(() => {
        setShowFilter(false)

        // если не на странице поиска
        if (!searchWord) {
            setShowSearchWords(false)
        }

    }, [urlCategory])

    return (
        <>
            <motion.div className="section mb-2" layout>
                <MovieSearch urlCategory={urlCategory} />
                <FilterButton />
            </motion.div>
            <AnimatePresence>
                {showFilter && (
                    <motion.div
                        className="mb-3"
                        variants={filterAnimate}
                        initial='initial'
                        animate='animate'
                        exit='exit'
                        layout
                        style={{ originX: 0, originY: -0.1 }}
                    >
                        <FilterModal urlCategory={urlCategory} />
                    </motion.div>
                )}
            </AnimatePresence>

            {showSearchWords && (
                <motion.div layout className="movie-search__results">
                    <motion.h3 layout>
                        {items.length > 0
                            ? `Search results for '${searchWord}'`
                            : 'Nothing was found'}
                    </motion.h3>
                </motion.div>
            )}

            {genre && (
                <motion.div layout className="movie-search__results">
                    <motion.h3 layout>
                        {`${genre} ${urlCategory === 'movie' ? 'Movies' : 'TV'}`}
                    </motion.h3>
                </motion.div>
            )}

            <motion.div className="movie-grid" layout>
                {items && items.map((item, index) => (
                    <MoviCard
                        urlCategory={urlCategory}
                        item={item}
                        key={index}
                    />
                ))}
            </motion.div>

            {displayedPages < existingPages ? (
                <div className="movie-grid__loadmore">
                    <OutlineButton
                        className='small'
                        onClick={() => loadMore(urlCategory, searchWord)}
                    >
                        Load more
                    </OutlineButton>
                </div>
            ) : null}

        </>
    )
}

export default MovieGrid