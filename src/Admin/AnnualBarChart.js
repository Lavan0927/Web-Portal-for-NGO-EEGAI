import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container, Typography, Select, MenuItem, FormControl, InputLabel } from "@mui/material";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";

const AnnualBarChart = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedYear, setSelectedYear] = useState("");
  const [monthlyTotal, setMonthlyTotal] = useState([]);

  useEffect(() => {
    // Fetch the data from the backend API
    axios
      .get("/monthly-donations")
      .then((response) => {
        setData(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setError("An error occurred while fetching data.");
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    // Calculate the monthly total donation amounts based on the selected year
    const monthlyTotalAmounts = {};

    data.forEach((donation) => {
      const { monthYear, totalDonation } = donation;
      const [month, year] = monthYear.split("-");
      if (selectedYear === "" || year === selectedYear) {
        const key = `${month}-${year}`;
        if (monthlyTotalAmounts[key]) {
          monthlyTotalAmounts[key] += parseFloat(totalDonation);
        } else {
          monthlyTotalAmounts[key] = parseFloat(totalDonation);
        }
      }
    });

    // Convert the monthlyTotalAmounts object into an array of objects for monthly total bar chart data
    const monthlyChartData = Object.keys(monthlyTotalAmounts).map((monthYear) => ({
      monthYear,
      totalDonation: monthlyTotalAmounts[monthYear],
    }));

    setMonthlyTotal(monthlyChartData);
  }, [data, selectedYear]);

  if (loading) {
    return <Typography variant="body1">Loading...</Typography>;
  }

  if (error) {
    return <Typography variant="body1">{error}</Typography>;
  }

  // Extract unique years from the data for the filter option
  const years = [...new Set(data.map((item) => item.monthYear.split("-")[1]))];

  // Filter the data based on the selected year
  const handleYearChange = (event) => {
    setSelectedYear(event.target.value);
  };

  return (
    <Container>
      <Typography variant="h5" gutterBottom>
        Monthly Donation Amounts
      </Typography>
      <FormControl fullWidth variant="outlined">
        <InputLabel id="year-filter-label">Select Year</InputLabel>
        <Select
          labelId="year-filter-label"
          id="year-filter"
          value={selectedYear}
          label="Select Year"
          onChange={handleYearChange}
        >
          <MenuItem value="">All</MenuItem>
          {years.map((year) => (
            <MenuItem key={year} value={year}>
              {year}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      {monthlyTotal.length > 0 ? (
        <MonthlyDonationBarChart data={monthlyTotal} />
      ) : (
        <Typography variant="body1">No donation data available.</Typography>
      )}
    </Container>
  );
};

const MonthlyDonationBarChart = ({ data }) => {
  return (
    <BarChart
      width={600}
      height={400}
      data={data}
      margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="monthYear" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Bar dataKey="totalDonation" fill="#8884d8" />
    </BarChart>
  );
};

export default AnnualBarChart;
