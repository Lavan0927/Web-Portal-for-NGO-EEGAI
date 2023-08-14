import React, { useState, useEffect } from "react";
import axios from 'axios';

function StaffOverview() {
  const [totalStaffsCount, setTotalStaffsCount] = useState(0);
  const [totalAssignments, setTotalAssignments] = useState(0);
  const [averageAssignmentsPerStaff, setAverageAssignment] = useState(0);

  useEffect(() => {
    axios.get('/api/totalStaffs')
      .then(response => {
        setTotalStaffsCount(response.data.totalStaffsCount);
      })
      .catch(error => {
        console.error('Error fetching total staffs count:', error);
      });

    axios.get('/api/totalAssignments')
      .then(response => {
        setTotalAssignments(response.data.totalAssignments);
      })
      .catch(error => {
        console.error('Error fetching total donors:', error);
      });
  }, []);

  // Calculate averageAssignmentsPerStaff when totalStaffsCount or totalAssignments changes
  useEffect(() => {
    if (totalStaffsCount > 0) {
      const averageAssignments = totalAssignments / totalStaffsCount;
      setAverageAssignment(averageAssignments);
    }
  }, [totalStaffsCount, totalAssignments]);

  return (
    <div style={cardStyle}>
      <h2 style={headingStyle}>Staff Overview</h2>
      <div style={contentStyle}>
        <div style={metricStyle}>
          <h4>Total Staff Members</h4>
          <div style={valueStyle}>{totalStaffsCount}</div>
        </div>
        <div style={metricStyle}>
          <h4>Total Assignments</h4>
          <div style={valueStyle}>{totalAssignments}</div>
        </div>
        <div style={metricStyle}>
          <h4>Average Assignments per Staff</h4>
          <div style={valueStyle}>{averageAssignmentsPerStaff}</div>
        </div>
      </div>
    </div>
  );
}

const cardStyle = {
  backgroundColor: '#f9f9f9',
  padding: '20px',
  borderRadius: '8px',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  marginBottom: '20px',
};

const headingStyle = {
  color: '#1c1c1e',
  marginBottom: '10px',
};

const contentStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  marginBottom: '10px',
};

const metricStyle = {
  flex: '1',
  textAlign: 'center',
};

const valueStyle = {
  fontSize: '24px',
  fontWeight: 'bold',
  color: '#f94144',
};

export default StaffOverview;
