// VolunteerAssignmentSection.js
import React from 'react';
import VolunteerAssignmentOverview from './VolunteerAssignmentOverview';
import VolunteerAssignmentsBarChart from './VolunteerAssignmentsBarChart';
import VolunteerSkillsPieChart from './VolunteerSkillsPieChart';
import VolunteerInterestsPieChart from './VolunteerInterestsPieChart';
import VolunteerHometownBarChart from './VolunteerHometownBarChart';
import TopAssignedVolunteersTable from './TopAssignedVolunteers';

const VolunteerAssignmentSection = () => {
  return (
    <div>
      <VolunteerAssignmentOverview />
      <h2>Volunteers Assignments Distribution</h2>
      <VolunteerAssignmentsBarChart />
      <br />
      <br />
      <h2>Top Volunteers List</h2>
      <TopAssignedVolunteersTable />
      <br />
      <br />
      <h2>Volunteers Skills & Interests Overall Distribution</h2>
      <div style={{ display: 'flex', gap: '20px' }}>
        <VolunteerSkillsPieChart />
        <VolunteerInterestsPieChart />
      </div>
      <br />
      <br />
      <VolunteerHometownBarChart />
    </div>
  );
};

export default VolunteerAssignmentSection;
