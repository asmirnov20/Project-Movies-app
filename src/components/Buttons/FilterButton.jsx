import { FaFilter } from 'react-icons/fa'
import './FilterButton.scss'
import { IconContext } from "react-icons";
import { useStateContext } from '../../context/StateContext';

const FilterButton = () => {

    const { setShowFilter, showFilter, setShowFilterResults } = useStateContext()

    const switchFilter = () => {
        setShowFilter(prev => !prev)

        if (showFilter) {
            setShowFilterResults(false)
        }
    }

    return (
        <IconContext.Provider value={{ color: '#2bff01', className: 'button__filter__icon' }}>
            <div className="button__filter btn" onClick={switchFilter}>
                <FaFilter />
                <div>Filter</div>
            </div>
        </IconContext.Provider>
    )
}

export default FilterButton