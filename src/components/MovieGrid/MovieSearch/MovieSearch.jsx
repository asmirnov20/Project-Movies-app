import { useState, useEffect, useCallback } from "react"
import { useNavigate } from "react-router-dom"
import Button from "../../Buttons/Button"
import { useStateContext } from "../../../context/StateContext"

const MovieSearch = ({ urlCategory }) => {

    const [searchWord, setSearchWord] = useState('')
    const navigate = useNavigate()

    const { getNeededList } = useStateContext()

    const goToSearch = useCallback(
        () => {
            if (searchWord.trim().length > 0) {

                getNeededList(urlCategory, searchWord)
            }
            setSearchWord('')
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
        <div className="movie-search">
            <input
                type='text'
                placeholder='Enter...'
                value={searchWord}
                onChange={e => setSearchWord(e.target.value)}
            />
            <Button className='small' onClick={goToSearch}>
                Search
            </Button>
        </div>
    )
}

export default MovieSearch