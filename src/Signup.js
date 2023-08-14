import React from 'react';
import HeaderTemp from './HeaderTemp';
import NavBarTest from './NavBarTest';
import Footer from './Footer';
import "/Users/lavanya/Desktop/eegai copy/src/css/bootstrap.min.css";
import "/Users/lavanya/Desktop/eegai copy/src/css/bootstrap-icons.css";
import "/Users/lavanya/Desktop/eegai copy/src/css/templatemo-kind-heart-charity.css";
import { Link } from 'react-router-dom';
import './VolunteerRegistrationForm.css';
import SignUpTemp from './SignUpTemp';


const Signup = () => {
  return (
    <div>
      <HeaderTemp />
      <NavBarTest />
      <SignUpTemp />
  <Footer />
  </div>
  );
};

export default Signup;
