// src/components/DonationPieChart.js
import React from 'react';
import { Pie } from 'react-chartjs-2';

function DonationPieChart({ donationData }) {
  const chartData = {
    labels: ['Registered Donors', 'Unregistered Donors'],
    datasets: [
      {
        data: [donationData.registeredDonorsCount, donationData.unregisteredDonorsCount],
        backgroundColor: ['#0f52ba', '#87ceeb'],
        borderColor: '#1c1c1e',
        borderWidth: 2,
      },
    ],
  };

  return (
    <div className="chart-container">
      <h3 style={{ textAlign: 'center' }}>Donation By Registered/UnRegistered-Donors Distribution</h3>
      <Pie
        id="donationPieChart"
        data={chartData}
        options={{
          plugins: {
            title: {
              display: true,
              // text: 'Donation By Registered/UnRegistered-Donors Distribution',
            },
          },
        }}
      />
    </div>
  );
}

export default DonationPieChart;
