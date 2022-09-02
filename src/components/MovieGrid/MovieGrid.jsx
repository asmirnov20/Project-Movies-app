import { useEffect } from "react"
import { useParams } from "react-router-dom"
// import tmdbApi, { movieType, tvType } from "../../api/tmdbApi"
import { OutlineButton } from "../Buttons/Button"
import MoviCard from '../MovieList/MovieCard/MovieCard'
import MovieSearch from './MovieSearch/MovieSearch'
import './MovieGrid.scss'
import { useStateContext } from "../../context/StateContext"


const MovieGrid = ({ urlCategory }) => {

    const { searchWord } = useParams()

    const { items, displayedPages, existingPages, getNeededList, loadMore } = useStateContext()

    useEffect(() => {

        getNeededList(urlCategory, searchWord)
        window.scrollTo(0, 0)
    }, [urlCategory, searchWord])

    return (
        <>
            <div className="section mb-3">
                <MovieSearch urlCategory={urlCategory} />
            </div>

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