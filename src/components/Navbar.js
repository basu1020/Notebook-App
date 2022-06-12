import React, { useEffect, useContext } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import authContext from '../context/auth/authContext'
import noteContext from '../context/note/noteContext'

const Navbar = () => {
  const location = useLocation()
  const authcontext = useContext(authContext)
  const {setLoggedIN } = authcontext
  const navigate = useNavigate()

  useEffect(() => {
  }, [location])

  const handleClick = () => {
    let confirmation = window.confirm("Are you sure you want to Sign Out?")
    if (confirmation) {
      setLoggedIN(false)
      localStorage.removeItem("token")
      navigate("/")
    }
  }

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">Notebook</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav" style={{ justifyContent: "space-between" }}>
            <div>
              <ul className="navbar-nav">
                {
                  !localStorage.getItem("token") &&
                  <li className="nav-item">
                    <Link className={`nav-link ${location.pathname === "/" ? "active" : ""}`} aria-current="page" to="/">Login</Link>
                  </li>
                }

                {
                  localStorage.getItem("token") && <li className="nav-item">
                    <Link className={`nav-link ${location.pathname === "/" ? "active" : ""}`} aria-current="page" disabled={true} to="/user">Home</Link>
                  </li>
                }
                <li className="nav-item">
                  <Link className={`nav-link ${location.pathname === "/about" ? "active" : ""}`} to="/about">About</Link>
                </li>
              </ul>
            </div>

            {!localStorage.getItem("token") &&
              <ul className='navbar-nav'>
                <li className='nav-item' style={{ color: "white" }}>New User?
                  <Link to="/signup">
                    <button className='btn-primary btn mx-2'> Signup </button>
                  </Link>
                </li>
              </ul>
            }

            {localStorage.getItem("token") &&
              <div>
                <ul className="navbar-nav">
                  <li className="nav-item">
                    <button className='btn-primary btn' onClick={handleClick}>Signout</button>
                  </li>
                </ul>
              </div>
            }
          </div>
        </div>
      </nav>
    </>
  )
}

export default Navbar