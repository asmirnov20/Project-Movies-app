import './Header.scss'
import logo from '../../assets/logo.png'
import { NavLink } from 'react-router-dom'
import { useEffect, useRef } from 'react'

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

  useEffect(() => {
    const shrinkHeader = () => {
      if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
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
            Amovies
          </NavLink>
        </div>

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