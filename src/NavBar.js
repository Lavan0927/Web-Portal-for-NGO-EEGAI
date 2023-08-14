import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { FiMenu } from 'react-icons/fi';
import './NavBar.css';
import logo from './Logo.png';

const NavBar = () => {
  const [showDropdown, setShowDropdown] = useState(false);

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  return (
    <nav className={`navbar ${showDropdown ? 'responsive' : ''}`}>
      <div className="logo">
        <img src={logo} alt="Logo" className="logo-image" />
      </div>
      <div className={`topnav ${showDropdown ? 'responsive' : ''}`} id="myTopnav">
        <NavLink exact to="/" className="nav-link" activeClassName="active">
          Home
        </NavLink>
        <NavLink to="/about" className="nav-link" activeClassName="active">
          About Us
        </NavLink>
        <NavLink to="/contact" className="nav-link" activeClassName="active">
          Contact Us
        </NavLink>
        <NavLink to="/projects" className="nav-link" activeClassName="active">
          Projects
        </NavLink>
        <NavLink to="/events" className="nav-link" activeClassName="active">
          Events
        </NavLink>
        <NavLink to="/crowdfunding" className="nav-link" activeClassName="active">
          Crowdfunding
        </NavLink>
        <NavLink to="/GetInvolved" className="nav-link" activeClassName="active">
          GetInvolved
        </NavLink>
        <NavLink to="/donateus">
          <button className="button">Donate Us</button>
        </NavLink>
        <NavLink to="/Login">
          <span className="login-link">Login</span>
        </NavLink>
        <NavLink to="/Signup" className="signup-link">
          Signup
        </NavLink>
        <div className="icon" onClick={toggleDropdown}>
          <FiMenu />
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
