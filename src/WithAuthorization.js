import React from 'react';
import { useNavigate } from 'react-router-dom';

const withAuthorization = (allowedRoles) => (WrappedComponent) => {
  const WithAuthorization = (props) => {
    const navigate = useNavigate();
    const userRole = sessionStorage.getItem('role'); // Update this based on your session storage mechanism

    if (allowedRoles.includes(userRole)) {
      return <WrappedComponent {...props} />;
    } else {
      // Redirect the user to an appropriate page (e.g., login or access denied)
      navigate('/Login');
      return null; // or display a loading/spinner component
    }
  };

  return WithAuthorization;
};

export default withAuthorization;
