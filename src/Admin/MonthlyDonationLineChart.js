import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container, Typography } from "@mui/material";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";

const MonthlyDonationLineChart = () => {
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
        Monthly Donation Amounts - Line Chart
      </Typography>
      {data.length > 0 ? (
        <LineChart width={600} height={400} data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="monthYear" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="totalDonation" stroke="#8884d8" />
        </LineChart>
      ) : (
        <Typography variant="body1">No donation data available.</Typography>
      )}
    </Container>
  );
};

export default MonthlyDonationLineChart;
