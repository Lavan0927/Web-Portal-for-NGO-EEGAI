import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container, Typography } from "@mui/material";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";

const MonthlyDonationBarChart = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  if (loading) {
    return <Typography variant="body1">Loading...</Typography>;
  }

  if (error) {
    return <Typography variant="body1">{error}</Typography>;
  }

  return (
    <Container>
      <Typography variant="h5" gutterBottom>
        Monthly Donation Amounts
      </Typography>
      {data.length > 0 ? (
        <BarChart width={600} height={400} data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="monthYear" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="totalDonation" fill="#8884d8" />
        </BarChart>
      ) : (
        <Typography variant="body1">No donation data available.</Typography>
      )}
    </Container>
  );
};

export default MonthlyDonationBarChart;
