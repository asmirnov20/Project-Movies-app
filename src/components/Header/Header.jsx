import './Header.scss'
import logo from '../../assets/logo.png'
import { NavLink, useParams } from 'react-router-dom'
import { useEffect, useRef } from 'react'
import MovieSearch from '../MovieGrid/MovieSearch/MovieSearch'
import { useState, useCallback } from 'react'

const headerNav = [
  {
    display: 'Home',
    path: '/'
  },
  {
    display: 'Movies',
    path: '/movie'
  },
  {
    display: 'TV Series',
    path: '/tv'
  }
]

const Header = () => {

  const [shrinkClass, setShrinkClass] = useState()
  const headerRef = useRef(null)
  const param = useParams()


  useEffect(() => {

    const shrinkHeader = () => {
      if (document.body.scrollTop > 90 || document.documentElement.scrollTop > 90) {
        setShrinkClass('shrink')
      } else {
        setShrinkClass('')
      }
    }

    window.addEventListener('scroll', shrinkHeader)

    return () => {
      window.removeEventListener('scroll', shrinkHeader)
    }
  }, [])

  return (
    <div ref={headerRef} className={`header ${shrinkClass}`}>
      <div className="header__wrapper container">

        <div className="logo">
          <NavLink to='/'>
            <img src={logo} alt="logo" />
            <div>Amovies</div>
          </NavLink>
        </div>

        {param.id && (
          <MovieSearch urlCategory={param.urlCategory} className='inHeader' />
        )}

        <ul className="header__nav">
          {headerNav.map((element, index) => (
            <li key={index}>
              <NavLink to={element.path}>
                {element.display}
              </NavLink>
            </li>
          ))}
        </ul>

      </div>
    </div>
  )
}

export default Header