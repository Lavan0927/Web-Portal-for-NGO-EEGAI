// src/components/DonationLineChart.js
import React from 'react';
import { Line } from 'react-chartjs-2';

function DonationLineChart({ lineChartData }) {
  return (
    <div className="chart-container">
      <h2 style={{ textAlign: 'center' }}>Donation Amount by Month</h2>
      <Line
        data={lineChartData}
        options={{
          plugins: {
            legend: {
              display: true,
              position: 'top',
            },
          },
          scales: {
            x: {
              type: 'time',
              time: {
                unit: 'month',
              },
              display: true,
              title: {
                display: true,
                text: 'Month',
              },
            },
            y: {
              display: true,
              title: {
                display: true,
                text: 'Donation Amount',
              },
            },
          },
        }}
      />
    </div>
  );
}

export default DonationLineChart;
