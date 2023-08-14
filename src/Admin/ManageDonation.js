import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import SideBarTest from "./SideBarTest";

function ManageDonation() {
  const [donationData, setDonationData] = useState([]);

  useEffect(() => {
    fetchDonations();
  }, []);

  const fetchDonations = async () => {
    try {
      const response = await axios.get("/api/donationsDetails");
      console.log(response.data);
      const dataWithIds = response.data.map((row, index) => ({
        ...row,
        id: index + 1, // Assuming that index 0 is not a valid id
      }));
      setDonationData(dataWithIds);
    } catch (error) {
      console.error("Error fetching donations:", error);
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "LKR",
    }).format(amount);
  };


  const columns = [
    { field: "donationId", headerName: "Donation ID", width: 100 },
    { field: "donationFor", headerName: "Donation For", width: 100 },
    // { field: "donationAmount", headerName: "Donation Amount", width: 200 },
    {
        field: "donationAmount",
        headerName: "Donation Amount",
        flex: 1,
        width: 250,
        valueFormatter: (params) => formatCurrency(params.value),
      },
    { field: "donationMethod", headerName: "Donation Method", width: 200 },
    { field: "donorId", headerName: "Donor ID", width: 150 },
    { field: "tempDonorId", headerName: "Temp Donor ID", width: 150 },
    { field: "projectId", headerName: "Project ID", width: 150 },
    { field: "activityId", headerName: "Activity ID", width: 150 },
    { field: "donationDate", headerName: "Donation Date", width: 200 },
    { field: "donationTime", headerName: "Donation Time", width: 200 },
  ];

  return (
    <>
    <SideBarTest />
    <div className="main-container">
        <div className="content-container">
            <div style={{ height: 400, width: "100%" }}>
            <DataGrid rows={donationData} columns={columns} />
            </div>
        </div>
    </div>
    </>
  );
}

export default ManageDonation;
