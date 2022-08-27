import React from 'react'
import background from '../../assets/footer-bg.jpg'
import { Link } from 'react-router-dom'
import logo from '../../assets/logo.png'
import './Footer.scss'

const Footer = () => {
  return (
    <div className='footer' style={{ backgroundImage: `url(${background})` }}>
      <div className="footer__content container">

        <div className="footer__content logo">
          <div className="logo">
            <img src={logo} alt="logo" />
            <Link to='/'>Amovies</Link>
          </div>
        </div>

        <div className="footer__content__menus">
          <div className="footer__content__menu">
            <Link to='/'>Home</Link>
            <Link to='/'>Contact us</Link>
            <Link to='/'>Terms of service</Link>
            <Link to='/'>About us</Link>
          </div>
          <div className="footer__content__menu">
            <Link to='/'>Live</Link>
            <Link to='/'>FAQ</Link>
            <Link to='/'>Premium</Link>
            <Link to='/'>Privacy policy</Link>
          </div>
          <div className="footer__content__menu">
            <Link to='/'>Must watch</Link>
            <Link to='/'>Recent releases</Link>
            <Link to='/'>Top IMDB</Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Footer