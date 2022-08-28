import React from 'react'
import { Link } from 'react-router-dom'
import { category, movieType, tvType } from '../api/tmdbApi'
import { OutlineButton } from '../components/buttons/Button'
import HeroSlide from '../components/HeroSlide/HeroSlide'
import MovieList from '../components/MovieList/MovieList'

const Home = () => {
  return (
    <>
      <HeroSlide />

      <div className="container">

        {/* Trending Movies */}
        <div className="section mb-3">
          <div className="section__header mb-2">
            <h2>Trending Movies</h2>
            <Link to='/movie'>
              <OutlineButton className='small'>View more</OutlineButton>
            </Link>
          </div>
          <MovieList category={category.movie} type={movieType.popular} />
        </div>

        {/* Top Rated Movies */}
        <div className="section mb-3">
          <div className="section__header mb-2">
            <h2>Top Rated Movies</h2>
            <Link to='/movie'>
              <OutlineButton className='small'>View more</OutlineButton>
            </Link>
          </div>
          <MovieList category={category.movie} type={movieType.top_rated} />
        </div>

        {/* Trending TV Series */}
        <div className="section mb-3">
          <div className="section__header mb-2">
            <h2>Trending TV Series</h2>
            <Link to='/tv'>
              <OutlineButton className='small'>View more</OutlineButton>
            </Link>
          </div>
          <MovieList category={category.tv} type={tvType.popular} />
        </div>

        {/* Top Rated TV Series */}
        <div className="section mb-3">
          <div className="section__header mb-2">
            <h2> Top Rated TV Series</h2>
            <Link to='/tv'>
              <OutlineButton className='small'>View more</OutlineButton>
            </Link>
          </div>
          <MovieList category={category.tv} type={tvType.top_rated} />
        </div>
      </div>
    </>
  )
}

export default Home