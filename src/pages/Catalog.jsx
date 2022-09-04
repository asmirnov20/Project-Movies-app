import { useParams } from "react-router-dom"
import PageHeader from "../components/page-header/PageHeader";
import { category } from '../api/tmdbApi'
import MovieGrid from "../components/MovieGrid/MovieGrid";
import { pageTransition } from '../animations/animations'
import { motion, AnimateSharedLayout } from 'framer-motion'


const Catalog = () => {

  const { urlCategory } = useParams()

  return (
    <AnimateSharedLayout>
      <motion.div initial='initial' animate='animate' exit='exit' variants={pageTransition}>
        <PageHeader>
          <h2>{urlCategory === category.movie ? 'Movies' : 'TV Series'}</h2>
        </PageHeader>
        <div className="container">

          <motion.div className="section mb-3" layout>
            <MovieGrid urlCategory={urlCategory} />
          </motion.div>

        </div>
      </motion.div>
    </AnimateSharedLayout>
  )
}

export default Catalog