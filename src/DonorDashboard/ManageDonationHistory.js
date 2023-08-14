import React, { useEffect, useState } from "react";
// import { Button } from "@chakra-ui/react";
import axios from "axios";
import { saveAs } from "file-saver";
import * as XLSX from 'xlsx';
import DonorSideBar from "./DonorSideBar";
import "/Users/lavanya/Desktop/eegai copy/src/css/templatemo-kind-heart-charity.css";
import { DataGrid } from '@mui/x-data-grid';
import Button from '@mui/material/Button';

function ManageDonationHistory() {
  const [donationDetails, setDonationDetails] = useState([]);
  const [donorId, setDonorId] = useState(null); // Define donorId in state and initialize it to null

  useEffect(() => {
    // Check if user is already logged in
    const userId = sessionStorage.getItem('userID');

    // Fetch donorId using userId from the backend API
    if (userId) {
      axios.get(`/api/getDonorIdByUserId/${userId}`)
        .then((response) => {
          setDonorId(response.data.donorId);
        })
        .catch((error) => {
          console.error(error);
          // Handle error if donorId retrieval fails
        });
    }
  }, []);

  useEffect(() => {
    // Fetch the donation details based on the donorId from the backend API
    if (donorId) {
      axios.get(`/api/getDonationDetailsByDonorId/${donorId}`)
        .then((response) => {
          // Add unique 'id' property to each row in donationDetails
          const donationDataWithId = response.data.map((donation) => ({ ...donation, id: donation.donationId }));
          setDonationDetails(donationDataWithId);
        })
        .catch((error) => {
          console.error(error);
          // Handle error if donation details retrieval fails
        });
    }
  }, [donorId]);

  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(donationDetails);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Donation Details");
    const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
    const data = new Blob([excelBuffer], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });
    saveAs(data, "Donation_Details.xlsx");
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "LKR",
    }).format(amount);
  };

  const columns = [
    { field: 'donationId', headerName: 'Donation ID', width: 150 },
    { field: 'donationFor', headerName: 'Donation For', width: 200 },
    {
      field: "donationAmount",
      headerName: "Donation Amount",
      flex: 1,
      valueFormatter: (params) => formatCurrency(params.value),
    },
    { field: 'donationMethod', headerName: 'Donation Method', width: 200 },
    // Add more columns as needed
  ];

  return (
    <>
      <DonorSideBar />
      <div className="main-container">
        <div className="content-container">
          <br />
          {/* <Button onClick={exportToExcel}>
            Export to Excel
          </Button> */}
          <Button variant="outlined" onClick={exportToExcel} > Export to Excel</Button>
          <br /><br />
          <div style={{ height: 400, width: '100%' }}>
            <DataGrid
              rows={donationDetails}
              columns={columns}
              autoHeight
              disableSelectionOnClick
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default ManageDonationHistory;
