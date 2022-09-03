import { FaFilter } from 'react-icons/fa'
import './FilterButton.scss'
import { IconContext } from "react-icons";
import { useStateContext } from '../../context/StateContext';

const FilterButton = () => {

    const { setShowFilter } = useStateContext()

    const switchFilter = () => {
        setShowFilter(prev => !prev)
    }

    return (
        <IconContext.Provider value={{ color: '#2bff01', className: 'button__filter__icon' }}>
            <div class="button__filter btn" onClick={switchFilter}>
                <FaFilter />
                <div>Filter</div>
            </div>
        </IconContext.Provider>
    )
}

export default FilterButton