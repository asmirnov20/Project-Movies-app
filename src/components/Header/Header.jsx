import './Header.scss'
import logo from '../../assets/logo.png'
import { NavLink, useParams } from 'react-router-dom'
import { useEffect, useRef } from 'react'
import MovieSearch from '../MovieGrid/MovieSearch/MovieSearch'

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

  const headerRef = useRef(null)
  const param = useParams()

  useEffect(() => {
    const shrinkHeader = () => {
      if (document.body.scrollTop > 90 || document.documentElement.scrollTop > 90) {
        headerRef.current.classList.add('shrink')
      } else {
        headerRef.current.classList.remove('shrink')
      }
    }

    window.addEventListener('scroll', shrinkHeader)

    return () => {
      window.removeEventListener('scroll', shrinkHeader)
    }
  }, [])

  return (
    <div ref={headerRef} className='header'>
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