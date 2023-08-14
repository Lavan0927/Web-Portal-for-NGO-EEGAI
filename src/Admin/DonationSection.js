// DonationSection.js
import React from 'react';
import DonationOverview from './DonationOverview';
import DonationPieChart from './DonationPieChart';
import DonationCategoryPieChart from './DonationCategoryPieChart';
import AnnualBarChart from './AnnualBarChart';
import TopDonorsTable from './TopDonorsTable';
import TopUnRegisteredDonorsTable from './TopUnRegisteredDonorsTable';

const DonationSection = () => {
  return (
    <div>
      <DonationOverview />
      <h2>Overall Donation Distribution</h2>
      <div style={{ display: 'flex', gap: '20px' }}>
        <DonationCategoryPieChart />
        <DonationPieChart />
      </div>
      <br />
      <br />
      <h2>Top Registered Donors List</h2>
      <TopDonorsTable />
      <br />
      <br />
      <h2>Top Unregistered Donors List</h2>
      <TopUnRegisteredDonorsTable />
      <br />
      <br />
      <AnnualBarChart />
    </div>
  );
};

export default DonationSection;
