import { createContext, useContext, useState } from "react";
import tmdbApi from "../api/tmdbApi";
import { movieType, tvType } from "../api/tmdbApi";

const Context = createContext()

export const StateContext = ({ children }) => {

    const [items, setItems] = useState([])
    const [genres, setGenres] = useState([])
    const [genreId, setGenreId] = useState([])
    const [displayedPages, setDisplayedPages] = useState(1)
    const [existingPages, setExistingPages] = useState(0)

    const [showTrailer, setShowTrailer] = useState(false)

    const getNeededList = async (urlCategory, searchWord) => {
        let response;

        if (searchWord === undefined) {
            const params = {}

            if (urlCategory === 'tv') {
                response = await tmdbApi.getTvList(tvType.popular, { params })
            }
            if (urlCategory === 'movie') {
                response = await tmdbApi.getMoviesList(movieType.upcoming, { params })

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

    const loadMore = async (urlCategory, searchWord) => {
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

    const getAllGenres = async (urlCategory) => {
        let params = {}
        const response = await tmdbApi.genres(urlCategory, params)
        console.log(response);
        setGenres(response.genres)
    }

    const handleFindByGenre = (urlCategory) => {
        const params = {
            with_genres: genreId
        }
        const getFilterResults = async () => {
            const response = await tmdbApi.filterGenres(urlCategory, { params })
            console.log(response);
            setItems(response.results)
            setExistingPages(response.total_pages)
        }

        getFilterResults()

        setGenreId([])
    }

    return (
        <Context.Provider
            value={{
                getNeededList,
                loadMore,
                items,
                displayedPages,
                existingPages,
                showTrailer,
                setShowTrailer,
                handleFindByGenre,
                genres,
                getAllGenres,
                setGenreId
            }}
        >
            {children}
        </Context.Provider>

    )
}

export const useStateContext = () => useContext(Context)