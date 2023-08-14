import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";

function TopDonorsTable() {
  const [topDonors, setTopDonors] = useState([]);

  useEffect(() => {
    // Fetch the top donors' information from the backend API
    axios.get("/api/getTopDonors").then((response) => {
      // Add a unique 'id' property for each row (required by DataGrid)
      const rowsWithIds = response.data.map((row, index) => ({ ...row, id: index }));
      setTopDonors(rowsWithIds);
    });
  }, []);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "LKR",
    }).format(amount);
  };

  const columns = [
    { field: "donorId", headerName: "Donor ID", flex: 1 },
    { field: "donorName", headerName: "Donor Name", flex: 1 },
    {
      field: "totalDonationAmount",
      headerName: "Donation Amount",
      flex: 1,
      valueFormatter: (params) => formatCurrency(params.value),
    }, // Ensure field name matches the property in API response
  ];

  return (
    <div style={{ height: 400, width: "100%" }}>
      <DataGrid rows={topDonors} columns={columns} />
    </div>
  );
}

export default TopDonorsTable;
