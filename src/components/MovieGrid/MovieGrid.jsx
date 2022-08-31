import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import tmdbApi, { movieType, tvType } from "../../api/tmdbApi"
import { OutlineButton } from "../buttons/Button"
import MoviCard from '../MovieList/MovieCard/MovieCard'
import MovieSearch from './MovieSearch/MovieSearch'
import './MovieGrid.scss'


const MovieGrid = ({ urlCategory }) => {

    const { searchWord } = useParams()
    const [items, setItems] = useState()
    const [displayedPages, setDisplayedPages] = useState(1)
    const [existingPages, setExistingPages] = useState(0)

    useEffect(() => {
        const getInitialList = async () => {
            let response;

            if (searchWord === undefined) {
                const params = {}

                if (urlCategory === 'tv') {
                    response = await tmdbApi.getTvList(tvType.popular, { params })
                }
                if (urlCategory === 'movie') {
                    response = await tmdbApi.getMoviesList(movieType.upcoming, { params })
                    console.log(response);
                }
            } else {
                const params = {
                    query: searchWord
                }
                response = await tmdbApi.search(urlCategory, { params })
            }

            setItems(response.results)
            setExistingPages(response.total_pages)
        }

        getInitialList()
    }, [urlCategory, searchWord])

    const loadMore = async () => {
        let response;

        if (searchWord === undefined) {

            const params = {
                page: displayedPages + 1
            }
            if (urlCategory === 'tv') {
                response = await tmdbApi.getTvList(tvType.popular, { params })
            }
            if (urlCategory === 'movie') {
                response = await tmdbApi.getMoviesList(movieType.upcoming, { params })
            }
        } else {
            const params = {
                page: displayedPages + 1,
                query: searchWord
            }
            response = await tmdbApi.search(urlCategory, { params })
        }

        setItems([...items, ...response.results])
        setDisplayedPages(displayedPages + 1)
    }


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
                    <OutlineButton className='small' onClick={loadMore}>
                        Load more
                    </OutlineButton>
                </div>
            ) : null}

        </>
    )
}

export default MovieGrid