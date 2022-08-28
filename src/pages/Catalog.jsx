import { useParams } from "react-router-dom"
import PageHeader from "../components/page-header/PageHeader";
import { category as categ } from '../api/tmdbApi'
import MovieGrid from "../components/MovieGrid/MovieGrid";
const Catalog = () => {

  const { category } = useParams()

  return (
    <div>
      <PageHeader>
        <h2>{category === categ.movie ? 'Movies' : 'TV Series'}</h2>
      </PageHeader>
      <div className="container">
        <div className="section mb-3">
          <MovieGrid kind={category} />
        </div>
      </div>
    </div>
  )
}

export default Catalog