import React from 'react'
import './header.css'
import { Link } from 'react-router-dom'
import logo from '../../assets/logo.jpg'

const Header = ({isAuth}) => {
  return (
   <header>
    <img src={logo} alt="logo" className='logo-img' />
    <div className="logo">  </div> 
    
    <div className="link">
      <Link to={'/'}>Home</Link>  
      <Link to={'/courses'}>Courses</Link>  
      <Link to={'/about'}>About</Link>  
      {isAuth?(<Link to={'/account'}>Account</Link>  ):(<Link to={'/login'}>Login</Link>  )}
    </div>
   </header>
  )
}

export default Header