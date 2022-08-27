import { Link } from "react-router-dom"
import { category } from "../../../api/tmdbApi"
import apiConfig from "../../../api/apiConfig"
import Button from "../../Buttons/Button"
import './MovieCard.scss'

const MovieCard = ({ item, categorization }) => {

    const link = `/${category[categorization]}/${item.id}`

    const background = apiConfig.w500Image(item.poster_path)
    return (
        <Link to={link}>
            <div className="movie-card" style={{ backgroundImage: `url(${background})` }}>
                <Button>
                    <i className="bx bx-play"></i>
                </Button>
            </div>
            <h3>{item.title || item.name}</h3>
            
        </Link>
    )
}

export default MovieCard