import { useState, useEffect, useCallback } from "react"
import { useNavigate } from "react-router-dom"
import Button from "../../Buttons/Button"
import { useStateContext } from "../../../context/StateContext"

const MovieSearch = ({ urlCategory, className }) => {

    const [searchWord, setSearchWord] = useState('')
    const navigate = useNavigate()

    const { getNeededList, setShowSearchWords, showSearchWords } = useStateContext()

    const goToSearch = useCallback(
        () => {
            if (searchWord.trim().length > 0) {

                getNeededList(urlCategory, searchWord)
                navigate(`/${urlCategory}/search/${searchWord}`)
            }

            setShowSearchWords(true)
            // setSearchWord('')
        }, [searchWord, navigate])

    useEffect(() => {
        const enterEvent = (e) => {
            e.preventDefault()
            if (e.keyCode === 13) {
                goToSearch()
            }
        }

        document.addEventListener('keyup', enterEvent)

        return () => {
            document.removeEventListener('keyup', enterEvent)
        }
    }, [searchWord, goToSearch])


    return (
        <div className={`movie-search ${className}`}>
            <input
                type='text'
                placeholder='Enter...'
                value={searchWord}
                onChange={e => setSearchWord(e.target.value)}
            />
            <Button onClick={goToSearch} >
                {className ? `Find ${urlCategory}` : 'Search'}
            </Button>
        </div>
    )
}

export default MovieSearch