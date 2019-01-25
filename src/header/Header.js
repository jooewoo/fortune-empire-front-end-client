import React from 'react'
import { Link } from 'react-router-dom'
import logo from './fortune-empire.png'
import './Header.scss'

const authenticatedOptions = (
  <React.Fragment>
    <Link to="/bills">Bills</Link>
    <Link to="/change-password">Change Password</Link>
    <Link to="/sign-out">Sign Out</Link>
  </React.Fragment>
)

const unauthenticatedOptions = (
  <React.Fragment>
    <Link to="/sign-up">Sign Up</Link>
    <Link to="/sign-in">Sign In</Link>
  </React.Fragment>
)

const Header = ({ user }) => (
  <header className="main-header">
    <h2>
      <Link to="/">
        <img src={logo}height="120px" width="390px"/>
      </Link>
    </h2>
    <nav>
      { user && <span>Welcome, {user.email}</span>}
      { user ? authenticatedOptions : unauthenticatedOptions }
    </nav>
  </header>
)

export default Header
