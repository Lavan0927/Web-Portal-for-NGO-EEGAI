import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';

const VolunteerHometownBarChart = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch the data from the backend API
    axios
      .get('/homeTownDistribution') // Replace '/homeTownDistribution' with the actual API endpoint URL
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

  // Prepare the data for the Bar Chart
  const chartData = {
    labels: data.map((town) => town.homeTown),
    datasets: [
      {
        label: 'Number of Volunteers',
        data: data.map((town) => town.count),
        backgroundColor: '#1c1c1e',
        borderWidth: 2,
      },
    ],
  };

  return (
    <div className="chart-container">
      <h2 style={{ textAlign: 'center' }}>Volunteers Hometown Distribution</h2>
      <Bar
        data={chartData}
        options={{
          indexAxis: 'y',
          plugins: {
            title: {
              display: true,
              text: 'Volunteers Hometown Distribution',
            },
          },
        }}
      />
    </div>
  );
};

export default VolunteerHometownBarChart;
