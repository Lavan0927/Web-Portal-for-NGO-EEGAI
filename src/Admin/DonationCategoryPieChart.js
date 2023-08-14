import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Pie } from 'react-chartjs-2';
import '/Users/lavanya/Desktop/eegai copy/src/Admin/styles.css';

const DonationCategoryPieChart = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch the data from the backend API
    axios
      .get('/donationForCounts')
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

  // Convert the data object to an array of objects for the PieChart
  const pieChartData = Object.keys(data).map((category) => ({
    name: category,
    value: data[category],
  }));

  // Prepare the data for the Pie Chart
  const chartData = {
    labels: pieChartData.map((entry) => entry.name),
    datasets: [
      {
        data: pieChartData.map((entry) => entry.value),
        backgroundColor: ['#0f52ba', '#7df9ff','#87ceeb'],
        borderColor: '#1c1c1e',
        borderWidth: 2,
      },
    ],
  };

  return (
    <div className="chart-container">
      <h3 style={{ textAlign: 'center' }}>Donation For NGO/Project/Activity Distribution</h3>
      <Pie
        id="donationPieChart"
        data={chartData}
        options={{
          plugins: {
            title: {
              display: true,
              // text: 'Donation For NGO/Project/Activity Distribution',
            },
          },
        }}
      />
    </div>
  );
};

export default DonationCategoryPieChart;
