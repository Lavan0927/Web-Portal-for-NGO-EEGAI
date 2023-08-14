import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';

const VolunteerAssignmentsBarChart = () => {
  const [assignmentsData, setAssignmentsData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch the data for total number of volunteers per category
    axios
      .get('/volunteersPerCategory')
      .then((response) => {
        setAssignmentsData(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setError('An error occurred while fetching data.');
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
        label: 'Total Volunteers',
        data: [assignmentsData.project || 0, assignmentsData.activity || 0, assignmentsData.event || 0],
        backgroundColor: ['#2ecc71', '#f1c40f', '#3498db'],
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
      <h2 style={{ textAlign: 'center' }}>Volunteer Assignments Comparison</h2>
      <Bar
        data={chartData}
        options={{
          plugins: {
            legend: legend,
            title: {
              display: true,
              text: 'Total Volunteers per Category',
            },
          },
        }}
      />
    </div>
  );
};

export default VolunteerAssignmentsBarChart;
