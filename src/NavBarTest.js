import React, { useState, useEffect} from "react";
import { NavLink } from "react-router-dom";
import "./NavBarTest.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import logo from "./Logo.png";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function NavBarTest() {
  const [click, setClick] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [userId, setUserId] = useState('');
  const [userRole, setUserRole] = useState('');
  const [volunteerId, setVolunteerId] = useState('');
  const navigate = useNavigate();

  const handleClick = () => setClick(!click);

  useEffect(() => {
    // Check if user is already logged in
    const token = sessionStorage.getItem('token');
    const userRole = sessionStorage.getItem('userRole');
    const userId = sessionStorage.getItem('userID');
    setUserId(userId);
    setUserRole(userRole);
  
    if (token && userRole && userId) {
      setLoggedIn(true);
      // Fetch user details based on userID and set userDetails state
      // fetchUserDetails(userId);
    }
  }, []);

  // useEffect(() => {
  //  // Fetch donorId using userId from the backend API
  //  if (userId) {
  //   axios.get(`/api/getUserDetailByUserId/${userId}`)
  //       .then((response) => {
  //           setEmail(response.data.email);
  //           setContactNo(response.data.contactNo);
  //       })
  //     .catch((error) => {
  //       console.error(error);
  //       // Handle error if donorId retrieval fails
  //     });
  // }
  // }, []);

  const handleLogout = () => {
    clearSession();
    setLoggedIn(false);
  };

  const clearSession = () => {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('userRole');
    sessionStorage.removeItem('userID');
    sessionStorage.removeItem('userName');
  };

  const handleDonatePageNav = () => {
    if (userRole === 'donor') {
      navigate('/DonatePageforDonor');
    } else {
      navigate('/DonatePage');
    }
  };

  return (
    <>
      <nav className="navbar">
        <div className="nav-container">
          <NavLink exact to="/" className="nav-logo">
            <img src={logo} alt="Logo" className="logo-image" />
          </NavLink>

          <ul className={click ? "nav-menu active" : "nav-menu"}>
            <li className="nav-item">
              <NavLink
                exact
                to="/"
                activeClassName="active"
                className="nav-links"
                onClick={handleClick}
              >
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                exact
                to="/about"
                activeClassName="active"
                className="nav-links"
                onClick={handleClick}
              >
                About
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                exact
                to="/ContactPage"
                activeClassName="active"
                className="nav-links"
                onClick={handleClick}
              >
                Contact
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                exact
                to="/projects"
                activeClassName="active"
                className="nav-links"
                onClick={handleClick}
              >
                Projects
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                exact
                to="/Activities"
                activeClassName="active"
                className="nav-links"
                onClick={handleClick}
              >
                Activities
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                exact
                to="/Events"
                activeClassName="active"
                className="nav-links"
                onClick={handleClick}
              >
                Events
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink
                exact
                to="/DonateOnUSD"
                activeClassName="active"
                className="nav-links"
                onClick={handleDonatePageNav}
              >
                GetInvolved
              </NavLink>
            </li>
            <li>
              <a href="/DonatePage">
                <button className="button" onClick={handleClick}>
                  Donate Us
                </button>
              </a>
            </li>
            {loggedIn ? (
              <li className="nav-item dropdown">
                <a
                  href="#"
                  className="nav-links"
                  onClick={handleClick}
                >
                  <i className="fas fa-user"></i>
                </a>
                <div className="dropdown-content">
                  <NavLink
                    exact
                    to="/manage-account"
                    activeClassName="active"
                    className="dropdown-link"
                    onClick={handleClick}
                  >
                    Manage Account
                  </NavLink>
                  <NavLink
                    exact
                    to="/Login"
                    activeClassName="active"
                    className="dropdown-link"
                    onClick={handleLogout}
                  >
                    Logout
                  </NavLink>
                </div>
              </li>
            ) : (
              <>
                <li>
                <NavLink
                  exact
                  to="/Signup"
                  activeClassName="active"
                  className="nav-links"
                  onClick={handleClick}
                >
                  Signup
                </NavLink>
                </li>
                <li>
                <NavLink
                  exact
                  to="/login"
                  activeClassName="active"
                  className="nav-links"
                  onClick={handleClick}
                >
                  Login
                </NavLink>
              </li>
              </>
            )}
          </ul>
          <div className="nav-icon" onClick={handleClick}>
            <i className={click ? "fas fa-times" : "fas fa-bars"}></i>
          </div>
        </div>
      </nav>
    </>
  );
}

export default NavBarTest;
