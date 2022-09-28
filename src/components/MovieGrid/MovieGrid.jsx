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

    const { urlSearch, genre } = useParams()

    const { items, displayedPages, existingPages, getDefaultList, getSearch, loadMore, showFilter, setShowFilter, showSearchWords, setShowSearchWords, handleFindByGenre, genreId } = useStateContext()

    useEffect(() => {
        // если ищем по категориям
        if (genre) {
            handleFindByGenre(urlCategory, genreId)
        }
        // если поиск
        else if (urlSearch) {
            getSearch(urlCategory, urlSearch)
        }
        // дефолт
        else {
            getDefaultList(urlCategory, urlSearch)
        }

        window.scrollTo(0, 0)
    }, [urlCategory, urlSearch, genreId])

    useEffect(() => {
        setShowFilter(false)

        // если не на странице поиска
        if (!urlSearch) {
            setShowSearchWords(false)
        }

    }, [urlCategory])

    useEffect(() => {
        if (urlSearch) {
            setShowSearchWords(true)
        }
    }, [])

    return (
        <>
            <motion.div className="section mb-2" layout>
                <MovieSearch urlCategory={urlCategory} urlSearch={urlSearch} />
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
                            ? `Search results for '${urlSearch}'`
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
                        onClick={() => loadMore(urlCategory, urlSearch)}
                    >
                        Load more
                    </OutlineButton>
                </div>
            ) : null}

        </>
    )
}

export default MovieGrid