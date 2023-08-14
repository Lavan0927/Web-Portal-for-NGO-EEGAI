import React, { useState, useEffect } from 'react';
import HeaderTemp from './HeaderTemp';
import NavBarTest from './NavBarTest';
import Footer from './Footer';
import './VolunteerRegistrationForm.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);
  const [userDetails, setUserDetails] = useState(null);
  const [notification, setNotification] = useState('');
  const [error, setError] = useState(''); 
  const navigate = useNavigate();

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const data = {
      username,
      password,
    };

    try {
      const response = await axios.post('/submit-loginform', data);

      const { token, userRole, userId, userName, userDetails } = response.data;


      setSession(token, userId, userName, userRole);
      setLoggedIn(true);
      setUserDetails(userDetails);

      setUsername('');
      setPassword('');

      // alert(userId);
      setNotification('Login Successfully!');
      setError(''); 

      if (userRole === 'admin') {
        navigate('/admin');
      } else if (userRole === 'volunteer') {
        navigate('/VolunteerDashboard');
      } else if (userRole === 'staff') {
        navigate('/StaffDashboard');
      } else if (userRole === 'donor') {
        navigate('/DonorDashboard');
      } else {
        navigate('/');
      }
    } catch (error) {
      console.error(error);
      if (error.response) {
        if (error.response.status === 401) {
          setError('Invalid username or password');
        } else {
          setError('Internal Server Error');
        }
      } else {
        setError('Error connecting to the server');
      }
    }
  };

  const handleClick = () => {
    navigate('/Signup');
  };

  const setSession = (token, userId, userName, userRole) => {
    sessionStorage.setItem('token', token);
    sessionStorage.setItem('userID', userId);
    sessionStorage.setItem('userName', userName);
    sessionStorage.setItem('userRole', userRole); 
  };
  
  useEffect(() => {
    // Check if user is already logged in
    const token = sessionStorage.getItem('token');
    const userRole = sessionStorage.getItem('userRole');
    const userId = sessionStorage.getItem('userID');
  
    if (token && userRole && userId) {
      setLoggedIn(true);
      // Fetch user details based on userID and set userDetails state
      fetchUserDetails(userId);
    }
  }, []);
  

  const handleLogout = () => {
    clearSession();
    setLoggedIn(false);
    setUserDetails(null);
    navigate('/');
  };

  const clearSession = () => {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('userRole');
    sessionStorage.removeItem('userID');
  };

  const fetchUserDetails = async (userID) => {
    try {
      const response = await axios.get(`/user/${userID}`);
      const userDetails = response.data;
      setUserDetails(userDetails);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <HeaderTemp />
      <NavBarTest loggedIn={loggedIn} userDetails={userDetails} onLogout={handleLogout} />
      <div className="volunteer-form">
        <h2>Welcome Back!</h2>
        <h4>
          Don't have an account yet? 
          <span onClick={handleClick} style={{ cursor: 'pointer' }}>
            Register
          </span>
        </h4>
        <center>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        {notification && <p>{notification}</p>}
      </center>
        <form onSubmit={handleFormSubmit}>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button type="submit">Submit</button>
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default Login;
