import { createContext, useContext, useState } from "react";
import tmdbApi from "../api/tmdbApi";
import { movieType, tvType } from "../api/tmdbApi";

const Context = createContext()

export const StateContext = ({ children }) => {

    const [items, setItems] = useState([])
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
            }}
        >
            {children}
        </Context.Provider>

    )
}

export const useStateContext = () => useContext(Context)