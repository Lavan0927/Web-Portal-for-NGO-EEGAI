import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';

const VolunteerAssignmentComaprisonBarChart = () => {
  const [assignmentsData, setAssignmentsData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch the combined data for all assignment types
    axios
      .get('/combinedAssignments')
      .then((response) => {
        setAssignmentsData(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setError('An error occurred while fetching assignments data.');
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
    labels: assignmentsData.map((data) => {
      if (data.assignmentType === 'project') {
        return `Project ${data.id}`;
      } else if (data.assignmentType === 'activity') {
        return `Activity ${data.id}`;
      } else if (data.assignmentType === 'event') {
        return `Event ${data.id}`;
      } else {
        return '';
      }
    }),
    datasets: [
      {
        label: 'Number of Volunteers',
        data: assignmentsData.map((data) => data.count),
        backgroundColor: '#1c1c1e',
        borderWidth: 2,
      },
    ],
  };

  return (
    <div className="chart-container">
      <h2 style={{ textAlign: 'center' }}>Volunteer Assignments Comparison</h2>
      <Bar
        data={chartData}
        options={{
          indexAxis: 'y',
          plugins: {
            title: {
              display: true,
              text: 'Volunteer Assignments Comparison',
            },
          },
        }}
      />
    </div>
  );
};

export default VolunteerAssignmentComaprisonBarChart;
