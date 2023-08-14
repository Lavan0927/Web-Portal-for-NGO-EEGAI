import React from 'react';
import { Route, Navigate, Outlet } from 'react-router-dom';

// Import your Dashboard component
import Dashboard from './Dashboard';

const ProtectedRoute = () => {
  // Check the user's authorization here
  const isAuthorized = true; // Replace with your authorization logic

  if (isAuthorized) {
    return (
      <Route path="/Dashboard" element={<Dashboard />} />
    );
  } else {
    return <Navigate to="/Login" />;
  }
};

export default ProtectedRoute;
