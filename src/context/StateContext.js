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
    const [showSearchWords, setShowSearchWords] = useState(false)
    const [showTrailer, setShowTrailer] = useState(false)
    const [showFilter, setShowFilter] = useState(false)

    const getDefaultList = async (urlCategory) => {
        let response;
        const params = {}

        if (urlCategory === 'tv') {
            response = await tmdbApi.getTvList(tvType.popular, { params })
        }
        if (urlCategory === 'movie') {
            response = await tmdbApi.getMoviesList(movieType.upcoming, { params })
        }

        setItems(response.results)
        setExistingPages(response.total_pages)
    }
    

    const getSearch = async (urlCategory, searchWord) => {
        let response;
        const params = {
            query: searchWord
        }
        response = await tmdbApi.search(urlCategory, { params })

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
        setGenres(response.genres)
    }


    function handleFindByGenre(urlCategory, genreId = []) {
        const params = {
            with_genres: genreId
        }
        const getFilterResults = async () => {
            const response = await tmdbApi.filterGenres(urlCategory, { params })
            setItems(response.results)
            setExistingPages(response.total_pages)
        }

        getFilterResults()
    }

    return (
        <Context.Provider
            value={{
                getDefaultList,
                getSearch,
                loadMore,
                items,
                displayedPages,
                existingPages,
                showTrailer,
                setShowTrailer,
                handleFindByGenre,
                genres,
                getAllGenres,
                setGenreId,
                genreId,
                showFilter,
                setShowFilter,
                showSearchWords,
                setShowSearchWords,
            }}
        >
            {children}
        </Context.Provider>

    )
}

export const useStateContext = () => useContext(Context)