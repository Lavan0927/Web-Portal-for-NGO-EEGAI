import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container, Typography } from "@mui/material";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts";

const MonthlyDonationForecast = () => {
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

  // Extrapolate future data points for forecasting
  const forecastMonths = 6; // Number of future months to forecast
  const latestMonthYear = data[data.length - 1]?.monthYear || "0-0"; // Get the latest month in the data

  const [latestMonth, latestYear] = latestMonthYear.split("-").map(Number);
  let forecastData = [];

  for (let i = 1; i <= forecastMonths; i++) {
    const nextMonth = (latestMonth + i) % 12;
    const nextYear = latestYear + Math.floor((latestMonth + i - 1) / 12);

    // Extrapolate totalDonation based on a simple assumption (you can use a more advanced approach for better forecasting)
    const forecastedTotalDonation = data[data.length - 1]?.totalDonation || 0;
    forecastData.push({
      monthYear: `${nextMonth}-${nextYear}`,
      totalDonation: forecastedTotalDonation, // Replace with the predicted value from more advanced forecasting methods
      isForecast: true, // Flag to differentiate forecasted data
    });
  }

  // Combine historical and forecast data
  const combinedData = [...data, ...forecastData];

  return (
    <Container>
      <Typography variant="h5" gutterBottom>
        Monthly Donation Amounts - Line Chart
      </Typography>
      {combinedData.length > 0 ? (
        <LineChart width={600} height={400} data={combinedData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="monthYear" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="totalDonation" stroke="#8884d8" name="Historical" />
          <Line type="monotone" dataKey="totalDonation" stroke="#82ca9d" name="Forecast" dot={false} />
        </LineChart>
      ) : (
        <Typography variant="body1">No donation data available.</Typography>
      )}
    </Container>
  );
};

export default MonthlyDonationForecast;
