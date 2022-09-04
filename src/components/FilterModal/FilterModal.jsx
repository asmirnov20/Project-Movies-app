import Button from "../Buttons/Button"
import { useStateContext } from "../../context/StateContext"
import { useEffect } from "react"
import './FilterModal.scss'

const FilterModal = ({ urlCategory }) => {

    const { genres, handleFindByGenre, getAllGenres, setGenreId, genreId} = useStateContext()

    useEffect(() => {

        getAllGenres(urlCategory)

    }, [])

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

    return (
        <div className="filter" >
            <h2>Choose Category</h2>

            <div className="filter__content">
                {genres && genres.map(({ name, id }) => (
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
                onClick={() => handleFindByGenre(urlCategory)}
                className='button__find'
            >
                Let's Find
            </Button>

        </div>
    )
}

export default FilterModal