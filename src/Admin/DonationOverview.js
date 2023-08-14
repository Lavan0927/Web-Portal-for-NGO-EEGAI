import React, { useState, useEffect } from "react";
import axios from 'axios';

function DonationOverview() {
  const [totalDonations, setTotalDonations] = useState(0);
  const [totalDonors, setTotalDonors] = useState(0);
  const [averageDonation, setAverageDonation] = useState(0);

  useEffect(() => {
    axios.get('/api/totalDonations')
      .then(response => {
        setTotalDonations(response.data.totalDonations);
      })
      .catch(error => {
        console.error('Error fetching total donations:', error);
      });

    axios.get('/api/totalDonors')
      .then(response => {
        setTotalDonors(response.data.totalDonors);
      })
      .catch(error => {
        console.error('Error fetching total donors:', error);
      });

    axios.get('/api/averageDonation')
      .then(response => {
        setAverageDonation(response.data.averageDonation);
      })
      .catch(error => {
        console.error('Error fetching average donation:', error);
      });
  }, []);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'LKR',
    }).format(amount);
  };

  return (
    <div style={cardStyle}>
      <h2 style={headingStyle}>Donation Overview</h2>
      <div style={contentStyle}>
        <div style={metricStyle}>
          <h4>Total Donations</h4>
          <div style={valueStyle}>{formatCurrency(totalDonations)}</div>
        </div>
        <div style={metricStyle}>
          <h4>Total Donors</h4>
          <div style={valueStyle}>{totalDonors}</div>
        </div>
        <div style={metricStyle}>
          <h4>Average Donation</h4>
          <div style={valueStyle}>{formatCurrency(averageDonation)}</div>
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
