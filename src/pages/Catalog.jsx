import { useParams } from "react-router-dom"
import PageHeader from "../components/page-header/PageHeader";
import { category } from '../api/tmdbApi'
import MovieGrid from "../components/MovieGrid/MovieGrid";
const Catalog = () => {

  const { urlCategory } = useParams()

  return (
    <div>
      <PageHeader>
        <h2>{urlCategory === category.movie ? 'Movies' : 'TV Series'}</h2>
      </PageHeader>
      <div className="container">
        <div className="section mb-3">
          <MovieGrid category={category} />
        </div>
      </div>
    </div>
  )
}

export default Catalog