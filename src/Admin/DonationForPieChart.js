import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container, Typography } from "@mui/material";
import { PieChart, Pie, Tooltip, Legend, Cell } from "recharts";

const DonationForPieChart = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch the data from the backend API
    axios
      .get("/donationForCounts")
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

  // Convert the data object to an array of objects for the PieChart
  const pieChartData = Object.keys(data).map((category) => ({
    name: category,
    value: data[category],
  }));

  // Define custom colors for the pie chart slices
  const COLORS = ["#8884d8", "#82ca9d", "#ffc658"];

  return (
    <Container>
      <Typography variant="h5" gutterBottom>
        Donation Categories
      </Typography>
      {pieChartData.length > 0 ? (
        <PieChart width={600} height={400}>
          <Pie
            data={pieChartData}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={150}
            fill="#8884d8"
            label={(entry) => entry.name}
          >
            {pieChartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      ) : (
        <Typography variant="body1">No donation category data available.</Typography>
      )}
    </Container>
  );
};

export default DonationForPieChart;
