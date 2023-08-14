import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import StaffsPerCategory from "/Users/lavanya/Desktop/eegai copy/src/Admin/StaffPerCategory.js";

const StaffAssignmentsBarChart = () => {
  const [projectData, setProjectData] = useState([]);
  const [activityData, setActivityData] = useState([]);
  const [eventData, setEventData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch the data for project assignments
    axios
      .get('/staffProjectAssignments')
      .then((response) => {
        setProjectData(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setError('An error occurred while fetching staff project assignments data.');
        setLoading(false);
      });

    // Fetch the data for activity assignments
    axios
      .get('/staffActivityAssignments')
      .then((response) => {
        setActivityData(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setError('An error occurred while fetching staff activity assignments data.');
        setLoading(false);
      });

    // Fetch the data for event assignments
    axios
      .get('/staffEventAssignments')
      .then((response) => {
        setEventData(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setError('An error occurred while fetching staff event assignments data.');
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  // Prepare the data for the Bar Chart for projects
  const projectChartData = {
    labels: projectData.map((data) => `Project ${data.projectId}`),
    datasets: [
      {
        label: 'Number of Staff Members',
        data: projectData.map((data) => data.count),
        backgroundColor: '#1c1c1e',
        borderWidth: 2,
      },
    ],
  };

  // Prepare the data for the Bar Chart for activities
  const activityChartData = {
    labels: activityData.map((data) => `Activity ${data.activityId}`),
    datasets: [
      {
        label: 'Number of Staff Members',
        data: activityData.map((data) => data.count),
        backgroundColor: '#1c1c1e',
        borderWidth: 2,
      },
    ],
  };

  // Prepare the data for the Bar Chart for events
  const eventChartData = {
    labels: eventData.map((data) => `Event ${data.eventId}`),
    datasets: [
      {
        label: 'Number of Staff Members',
        data: eventData.map((data) => data.count),
        backgroundColor: '#1c1c1e',
        borderWidth: 2,
      },
    ],
  };

  return (
    <div>
      <div style={{ display: 'flex', gap: '20px' }}>
        <StaffsPerCategory />

        <div className="chart-container">
          <h3 style={{ textAlign: 'center' }}>Staff Assignments per Project</h3>
          <Bar
            data={projectChartData}
            options={{
              indexAxis: 'y',
              plugins: {
                title: {
                  display: true,
                  text: 'Staff Assignments per Project',
                },
              },
            }}
          />
        </div>
      </div>

      <br></br><br></br>

      <div style={{ display: 'flex', gap: '20px' }}>
        <div className="chart-container">
          <h3 style={{ textAlign: 'center' }}>Staff Assignments per Activity</h3>
          <Bar
            data={activityChartData}
            options={{
              indexAxis: 'y',
              plugins: {
                title: {
                  display: true,
                  text: 'Staff Assignments per Activity',
                },
              },
            }}
          />
        </div>
        <div className="chart-container">
          <h3 style={{ textAlign: 'center' }}>Staff Assignments per Event</h3>
          <Bar
            data={eventChartData}
            options={{
              indexAxis: 'y',
              plugins: {
                title: {
                  display: true,
                  text: 'Staff Assignments per Event',
                },
              },
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default StaffAssignmentsBarChart;
