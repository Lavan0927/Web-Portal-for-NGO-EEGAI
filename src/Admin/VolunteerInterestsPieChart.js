import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Pie } from 'react-chartjs-2';

const VolunteerInterestsPieChart = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch the data from the backend API
    axios
      .get('/interestsDistribution') // Replace '/interestsDistribution' with the actual API endpoint URL
      .then((response) => {
        setData(response.data);
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

  // Prepare the data for the Pie Chart
  const chartData = {
    labels: data.map((interest) => interest.interest),
    datasets: [
      {
        data: data.map((interest) => interest.count),
        backgroundColor: [
          '#2ecc71',
          '#3498db',
          '#9b59b6',
          '#f1c40f',
          '#e67e22',
          '#e74c3c',
          // Add more colors as needed
        ],
        borderColor: '#1c1c1e',
        borderWidth: 2,
      },
    ],
  };

  return (
    <div className="chart-container">
      <h2 style={{ textAlign: 'center' }}>Overall Interests Distribution</h2>
      <Pie
        data={chartData}
        options={{
          plugins: {
            title: {
              display: true,
            //   text: 'Overall Interests Distribution',
            },
          },
        }}
      />
    </div>
  );
};

export default VolunteerInterestsPieChart;
