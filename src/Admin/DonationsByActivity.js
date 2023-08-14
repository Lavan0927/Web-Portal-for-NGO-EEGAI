import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";

function DonationsByActivity() {
  const [activityData, setActivityData] = useState([]);

  useEffect(() => {
    fetchDonationsByActivity();
  }, []);

  const fetchDonationsByActivity = async () => {
    try {
      const response = await axios.get("/api/donationsByActivity");
      // Add a unique 'id' property to each activity object
      const activitiesWithId = response.data.map((activity, index) => ({
        ...activity,
        id: index + 1, // You can use any unique identifier here
      }));
      setActivityData(activitiesWithId);
    } catch (error) {
      console.error(error);
    }
  };

  const columns = [
    { field: "activityId", headerName: "Activity ID", width: 150 },
    { field: "activityName", headerName: "Activity Name", width: 200 },
    {
      field: "donationCount",
      headerName: "Donation Count",
      width: 180,
      type: "number",
    },
    {
      field: "totalDonationAmount",
      headerName: "Total Donation Amount",
      width: 220,
      valueFormatter: (params) =>
        new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "LKR",
        }).format(params.value),
    },
    {
      field: "goalAmount",
      headerName: "Goal Amount",
      width: 180,
      valueFormatter: (params) =>
        new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "LKR",
        }).format(params.value),
    },
  ];

  return (
    <div style={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={activityData}
        columns={columns}
        pageSize={5}
        autoHeight
        disableSelectionOnClick
      />
    </div>
  );
}

export default DonationsByActivity;
