import { useParams } from "react-router-dom"
import PageHeader from "../components/page-header/PageHeader";
import { category } from '../api/tmdbApi'
import MovieGrid from "../components/MovieGrid/MovieGrid";
import { pageTransition } from '../animations/animations'
import { motion } from 'framer-motion'
import { useEffect } from "react";
import Button from "../components/Buttons/Button";
import { useStateContext } from "../context/StateContext";

const Catalog = () => {

  const { urlCategory } = useParams()

  const { genres, handleFindByGenre, getAllGenres, setGenreId } = useStateContext()

  useEffect(() => {

    getAllGenres(urlCategory)
    
  }, [])

  const handleClick = (id) => {
    setGenreId(prevState => [...prevState, id])
  }

  return (
    <motion.div initial='initial' animate='animate' exit='exit' variants={pageTransition}>
      <PageHeader>
        <h2>{urlCategory === category.movie ? 'Movies' : 'TV Series'}</h2>
      </PageHeader>
      <div className="container">
        <div className="filter">
          <ul className="filter-content">
            {genres && genres.map((genre) => (
              <li key={genre.id} onClick={() => handleClick(genre.id)}>
                {genre.name}
              </li>
            ))}
          </ul>
          <Button onClick={() => handleFindByGenre(urlCategory)}>Find</Button>
        </div>
        <div className="section mb-3">
          <MovieGrid urlCategory={urlCategory} />
        </div>
      </div>
    </motion.div>
  )
}

export default Catalog