import React from 'react'
import { Link } from 'react-router-dom'
import logo from './fortune-empire-4.png'
import './Header.scss'

const authenticatedOptions = (
  <React.Fragment>
    <Link className="link" to="/bills">Bills</Link>
    <Link className="link" to="/change-password">Change Password</Link>
    <Link className="link" to="/sign-out">Sign Out</Link>
  </React.Fragment>
)

const unauthenticatedOptions = (
  <React.Fragment>
    <Link className="link" to="/sign-up">Sign Up</Link>
    <Link className="link" to="/sign-in">Sign In</Link>
  </React.Fragment>
)

const Header = ({ user }) => (
  <header className="main-header">
    <h2>
      <Link to="/">
        <img src={logo}height="125px" width="220px"/>
      </Link>
    </h2>
    <nav>
      { user && <span>Welcome, {user.email}</span>}
      { user ? authenticatedOptions : unauthenticatedOptions }
    </nav>
  </header>
)

export default Header
