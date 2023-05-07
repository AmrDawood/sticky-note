import React from 'react'
import { Link } from 'react-router-dom'
export default function Navbar() {
  return (
    <>
        <nav className="navbar navbar-expand-lg bg-body-tertiary navbar-dark">
  <div className="container-fluid">
    <Link className="navbar-brand" to={'../home'}>
      Navbar
    </Link>
    <button
      className="navbar-toggler"
      type="button"
      data-bs-toggle="collapse"
      data-bs-target="#navbarSupportedContent"
      aria-controls="navbarSupportedContent"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span className="navbar-toggler-icon" />
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
       
        <li className="nav-item dropdown">
          <Link
            className="nav-link dropdown-toggle"
            href="#"
            role="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            Dropdown
          </Link>
          <ul className="dropdown-menu">
            <li>
              <Link className="dropdown-item" to={'../signup'}>
                sign up
              </Link>
            </li>
            <li>
              <Link className="dropdown-item" to={'../signin'}>
                sign in
              </Link>
            </li>
          </ul>
        </li>

      </ul>
     
    </div>
  </div>
</nav>

    </>
  )
}
