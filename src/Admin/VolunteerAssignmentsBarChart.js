import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Bar } from 'react-chartjs-2';
import VolunteersPerCategory from "./VolunteersPerCategory";

const VolunteerAssignmentsBarChart = () => {
  const [projectData, setProjectData] = useState([]);
  const [activityData, setActivityData] = useState([]);
  const [eventData, setEventData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch the data for project assignments
    axios
      .get('/projectAssignments')
      .then((response) => {
        setProjectData(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setError('An error occurred while fetching project assignments data.');
        setLoading(false);
      });

    // Fetch the data for activity assignments
    axios
      .get('/activityAssignments')
      .then((response) => {
        setActivityData(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setError('An error occurred while fetching activity assignments data.');
        setLoading(false);
      });

    // Fetch the data for event assignments
    axios
      .get('/eventAssignments')
      .then((response) => {
        setEventData(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setError('An error occurred while fetching event assignments data.');
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
        label: 'Number of Volunteers',
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
        label: 'Number of Volunteers',
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
        label: 'Number of Volunteers',
        data: eventData.map((data) => data.count),
        backgroundColor: '#1c1c1e',
        borderWidth: 2,
      },
    ],
  };

  return (
    <div>
        <div  style={{ display: 'flex', gap: '20px'}}>
        <VolunteersPerCategory />
       
      <div className="chart-container">
        <h2 style={{ textAlign: 'center' }}>Volunteer Assignments per Project</h2>
        <Bar
          data={projectChartData}
          options={{
            indexAxis: 'y',
            plugins: {
              title: {
                display: true,
                text: 'Volunteer Assignments per Project',
              },
            },
          }}
        />
      </div>
      </div>

      <br></br><br></br>

      <div  style={{ display: 'flex', gap: '20px'}}>
      <div className="chart-container">
        <h2 style={{ textAlign: 'center' }}>Volunteer Assignments per Activity</h2>
        <Bar
          data={activityChartData}
          options={{
            indexAxis: 'y',
            plugins: {
              title: {
                display: true,
                text: 'Volunteer Assignments per Activity',
              },
            },
          }}
        />
      </div>
      <div className="chart-container">
        <h2 style={{ textAlign: 'center' }}>Volunteer Assignments per Event</h2>
        <Bar
          data={eventChartData}
          options={{
            indexAxis: 'y',
            plugins: {
              title: {
                display: true,
                text: 'Volunteer Assignments per Event',
              },
            },
          }}
        />
      </div>
      </div>
      
    </div>
  );
};

export default VolunteerAssignmentsBarChart;
