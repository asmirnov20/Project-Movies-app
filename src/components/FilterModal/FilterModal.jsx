import Button from "../Buttons/Button"
import { useStateContext } from "../../context/StateContext"
import { useEffect } from "react"
import './FilterModal.scss'
import { useNavigate } from "react-router-dom"


const FilterModal = ({ urlCategory }) => {

    const navigate = useNavigate()
    const { genres, handleFindByGenre, getAllGenres, setGenreId, genreId } = useStateContext()

    useEffect(() => {
        getAllGenres(urlCategory)
    }, [])

    useEffect(() => {
        setGenreId([])
    }, [urlCategory])

    const handleClick = (e, id) => {
        // если элемент выбран и id уникально, то добавляем id
        if (e.target.checked) {

            if (!genreId.includes(id)) {
                setGenreId(prevState => [...prevState, id])
            }
        }
        // если элемент не выбран, то удаляем его id
        else {
            setGenreId(genreId.filter(item => item !== id))
        }
    }

    const handleFilterContent = () => {
        handleFindByGenre(urlCategory, genreId)
        navigate(`/${urlCategory}`)
    }

    return (
        <div className="filter" >
            <h2>Choose Category</h2>

            <div className="filter__content">
                {genres && genres.map(({ name, id }, index) => (
                    <label className="myCheckbox" key={id} >
                        <input
                            type="checkbox"
                            name="radio"
                            onClick={(e) => handleClick(e, id)}
                        />
                        <span className="checkmark"></span>
                        <span className="title" >
                            {name}
                        </span>
                    </label>
                ))}
            </div>

            <Button
                onClick={handleFilterContent}
                className='button__find'
            >
                Let's Find
            </Button>

        </div>
    )
}

export default FilterModal