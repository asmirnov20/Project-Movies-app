import React from 'react'
import { Link } from 'react-router-dom'
import { category, movieType, tvType } from '../api/tmdbApi'
import { OutlineButton } from '../components/buttons/Button'
import HeroSlide from '../components/HeroSlide/HeroSlide'
import MovieList from '../components/MovieList/MovieList'
import { pageTransition } from '../animations/animations'
import { motion } from 'framer-motion'
import { fadeInUp, stagger } from '../animations/animations'
import { useEffect } from 'react'

const homeContent = [
  {
    title: 'Trending Movies',
    link: '/movie',
    category: category.movie,
    type: movieType.popular
  },
  {
    title: 'Top Rated Movies',
    link: '/movie',
    category: category.movie,
    type: movieType.top_rated
  },
  {
    title: 'Trending TV Series',
    link: '/tv',
    category: category.tv,
    type: tvType.popular
  },
  {
    title: 'Top Rated TV Series',
    link: '/tv',
    category: category.tv,
    type: tvType.top_rated
  }
]


const Home = () => {

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <motion.div initial='initial' animate='animate' exit='exit' variants={pageTransition}>
      <HeroSlide />

      <motion.div className="container" initial='initial'
        whileInView='animate'
        exit={{ opacity: 0 }}
        variants={fadeInUp}
      // viewport={{ once: true }}
      >

        {homeContent.map((item, index) => (
          <motion.div variants={stagger} className="section mb-3">
            <div variants={fadeInUp} className="section__header mb-2">
              <h2 variants={fadeInUp}>{item.title}</h2>
              <Link to={item.link}>
                <OutlineButton className='small'>
                  View more
                </OutlineButton>
              </Link>
            </div>
            <MovieList category={item.category} type={item.type} key={index} />
          </motion.div>
        ))}

      </motion.div>
    </motion.div>
  )
}

export default Home