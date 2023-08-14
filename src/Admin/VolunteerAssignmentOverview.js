import React, { useState, useEffect } from "react";
import axios from 'axios';

function DonationOverview() {
  const [totalSuggested, setTotalSuggested] = useState(0);
  const [totalAssigned, setTotalAssigned] = useState(0);
  const [totalCancelled, setTotalCancelled] = useState(0);

  useEffect(() => {
    axios.get('/api/totalSuggested')
      .then(response => {
        setTotalSuggested(response.data.totalSuggested);
      })
      .catch(error => {
        console.error('Error fetching total donations:', error);
      });

    axios.get('/api/totalAssigned')
      .then(response => {
        setTotalAssigned(response.data.totalAssigned);
      })
      .catch(error => {
        console.error('Error fetching total donors:', error);
      });

    axios.get('/api/totalCancelled')
      .then(response => {
        setTotalCancelled(response.data.totalCancelled);
      })
      .catch(error => {
        console.error('Error fetching average donation:', error);
      });
  }, []);

  return (
    <div style={cardStyle}>
      <h2 style={headingStyle}>Volunteer Assignment Overview</h2>
      <div style={contentStyle}>
        <div style={metricStyle}>
          <h4>Total Suggested</h4>
          <div style={valueStyle}>{totalSuggested}</div>
        </div>
        <div style={metricStyle}>
          <h4>Total Assigned</h4>
          <div style={valueStyle}>{totalAssigned}</div>
        </div>
        <div style={metricStyle}>
          <h4>Total Cancelled</h4>
          <div style={valueStyle}>{totalCancelled}</div>
        </div>
      </div>
    </div>
  );
}

const cardStyle = {
  backgroundColor: '#f9f9f9',
  padding: '20px',
  borderRadius: '8px',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  marginBottom: '20px',
};

const headingStyle = {
  color: '#1c1c1e',
  marginBottom: '10px',
};

const contentStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  marginBottom: '10px',
};

const metricStyle = {
  flex: '1',
  textAlign: 'center',
};

const valueStyle = {
  fontSize: '24px',
  fontWeight: 'bold',
  color: '#f94144',
};

export default DonationOverview;
