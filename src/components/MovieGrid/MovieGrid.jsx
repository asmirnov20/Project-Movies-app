import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import tmdbApi, { movieType, tvType } from "../../api/tmdbApi"
import { OutlineButton } from "../buttons/Button"
import MoviCard from '../MovieList/MovieCard/MovieCard'
import MovieSearch from './MovieSearch/MovieSearch'
import './MovieGrid.scss'


const MovieGrid = ({ kind }) => {

    const { category } = useParams()

    const [items, setItems] = useState()
    const [displayedPages, setDisplayedPages] = useState(1)
    const [existingPages, setExistingPages] = useState(0)

    useEffect(() => {
        const getInitialList = async () => {
            let response;
            const params = {}
            if (category === 'tv') {
                response = await tmdbApi.getTvList(tvType.popular, { params })
            }
            if (category === 'movie') {
                response = await tmdbApi.getMoviesList(movieType.upcoming, { params })
                console.log(response);
            }

            setItems(response.results)
            setExistingPages(response.total_pages)
        }

        getInitialList()
    }, [category])

    const loadMore = async () => {
        let response;
        const params = {
            page: displayedPages + 1
        }
        if (category === 'tv') {
            response = await tmdbApi.getTvList(tvType.popular, { params })
        }
        if (category === 'movie') {
            response = await tmdbApi.getMoviesList(movieType.upcoming, { params })
            console.log(response);
        }

        setItems([...items, ...response.results])
        setDisplayedPages(displayedPages + 1)
    }


    return (
        <>
            <div className="section mb-3">
                <MovieSearch />
            </div>
            
            <div className="movie-grid">
                {items && items.map((item, index) => (
                    <MoviCard categorization={kind} item={item} key={index} />
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