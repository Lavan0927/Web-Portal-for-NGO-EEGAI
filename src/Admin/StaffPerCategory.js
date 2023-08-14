import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';

const StaffPerCategory = () => {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get('/staffsPerCategory')
      .then(response => {
        setData(response.data);
        setLoading(false);
      })
      .catch(error => {
        setError("An error occurred while fetching data.");
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  // Prepare the data for the Bar Chart
  const chartData = {
    labels: ['Projects', 'Activities', 'Events'],
    datasets: [
      {
        label: 'Total Staff Members',
        data: [data.project || 0, data.activity || 0, data.event || 0],
        backgroundColor: ['#f94144', '#f3722c', '#f8961e'],
        borderWidth: 2,
      },
    ],
  };

  // Define custom legend to label the bars with their corresponding categories
  const legend = {
    display: true,
    position: 'top',
    align: 'center',
    labels: {
      usePointStyle: true,
      pointStyle: 'circle',
      padding: 20,
      font: {
        size: 14,
        weight: 'bold',
      },
      generateLabels: (chart) => {
        const { data } = chart;
        if (data.labels.length && data.datasets.length) {
          return data.labels.map((label, i) => {
            const dataset = data.datasets[0];
            const backgroundColor = dataset.backgroundColor[i];
            return {
              text: label,
              fillStyle: backgroundColor,
              hidden: false,
              index: i,
            };
          });
        }
        return [];
      },
    },
  };

  return (
    <div className="chart-container">
      <h3 style={{ textAlign: 'center' }}>Staff Members per Category</h3>
      <Bar
        data={chartData}
        options={{
          plugins: {
            legend: legend,
            title: {
              display: true,
              text: 'Total Staff Members per Category',
            },
          },
          scales: {
            y: {
              beginAtZero: true,
              title: {
                display: true,
                text: 'Number of Staff Members',
              },
            },
          },
        }}
      />
    </div>
  );
};

export default StaffPerCategory;
