import Button from "../Buttons/Button"
import { useStateContext } from "../../context/StateContext"
import { useEffect } from "react"
import './FilterModal.scss'
import { useState } from "react"
import { motion } from "framer-motion"


const FilterModal = ({ urlCategory }) => {

    const [selectedCategoryNames, setSelectedCategoryNames] = useState([])

    const { genres, handleFindByGenre, getAllGenres, setGenreId, genreId, showCategories } = useStateContext()

    useEffect(() => {

        getAllGenres(urlCategory)

    }, [])

    const handleClick = (e, id) => {

        const checkedCategory = genres.find(genre => genre.id === id ? genre : null)
        // если элемент выбран и id уникально, то добавляем имя и id
        if (e.target.checked) {
            if (!genreId.includes(id)) {

                setSelectedCategoryNames(prev => [...prev, checkedCategory.name])
                setGenreId(prevState => [...prevState, id])
            }
        }
        // если элемент не выбран, то удаляем его имя и id
        else {
            setSelectedCategoryNames(selectedCategoryNames.filter(item => item !== checkedCategory.name))
            setGenreId(genreId.filter(item => item !== id))
        }
    }

    return (
        <div className="filter" >
            <h2>Choose Category</h2>
            <div className="filter__content">
                {genres && genres.map(({ name, id }) => (
                    <label className="myCheckbox" key={id} >
                        <input type="checkbox" name="radio"
                            onClick={(e) => handleClick(e, id)}
                        />
                        <span className="checkmark"></span>
                        <span className="title" >
                            {name}
                        </span>
                    </label>
                ))}
            </div>

            <Button onClick={() => handleFindByGenre(urlCategory)} >
                Let's Find
            </Button>

            {showCategories && selectedCategoryNames.map(category => (
                <ul>
                    <li>{category}</li>
                </ul>
            ))}

        </div>
    )
}

export default FilterModal