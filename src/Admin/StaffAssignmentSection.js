// StaffAssignmentSection.js
import React from 'react';
import StaffOverview from './StaffOverview';
import StaffPerCategory from './StaffPerCategory';
import StaffAssignmentsBarChart from './StaffAssignmentsBarChart';
import TopAssignedStaffTable from './TopAssignedStaffTable';

const StaffAssignmentSection = () => {
  return (
    <div>
      <StaffOverview />
      <h2>Top Staff List</h2>
      <TopAssignedStaffTable />
      <br />
      <br />
      <h2>Staff Assignments Distribution</h2>
      <StaffAssignmentsBarChart />
    </div>
  );
};

export default StaffAssignmentSection;
