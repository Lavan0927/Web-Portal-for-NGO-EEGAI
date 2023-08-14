import React, { useEffect, useState } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "@mui/x-charts";
import { Typography, Container } from "@mui/material";

const DonationBarChart = ({ donations }) => {
  const [monthlyData, setMonthlyData] = useState([]);

  useEffect(() => {
    // Create an object to store total donation amounts for each month
    const monthlyTotal = {};

    // Loop through each donation to calculate the total amount per month
    donations.forEach((donation) => {
      const donationDate = new Date(donation.donationDate);
      const monthYear = `${donationDate.getMonth() + 1}-${donationDate.getFullYear()}`;
      monthlyTotal[monthYear] = (monthlyTotal[monthYear] || 0) + donation.donationAmount;
    });

    // Convert the monthlyTotal object into an array of objects for Bar Chart data
    const chartData = Object.keys(monthlyTotal).map((monthYear) => ({
      month: monthYear,
      amount: monthlyTotal[monthYear],
    }));

    setMonthlyData(chartData);
  }, [donations]);

  return (
    <Container>
      <Typography variant="h5" gutterBottom>
        Monthly Donation Amounts
      </Typography>
      <BarChart
        width={600}
        height={400}
        data={monthlyData}
        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="amount" fill="#8884d8" />
      </BarChart>
    </Container>
  );
};

export default DonationBarChart;
