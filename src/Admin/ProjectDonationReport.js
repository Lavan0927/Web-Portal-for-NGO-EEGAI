import React, { useEffect, useState } from "react";
// import { Button } from "@chakra-ui/react";
import axios from "axios";
import { saveAs } from "file-saver";
import * as XLSX from 'xlsx';
import "./ManageUsers.css"; // Import custom CSS file
import SideBarTest from "./SideBarTest";
import { DataGrid } from '@mui/x-data-grid';
import Button from '@mui/material/Button';

function ProjectDonationReport() {
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await axios.get('/api/manageprojects');
      // Add unique IDs to rows
      const dataWithIds = response.data.map((row) => ({ ...row, id: row.projectId }));
      setUserData(dataWithIds);
    } catch (error) {
      console.error(error);
    }
  };

  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(userData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Projects");
    const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
    const data = new Blob([excelBuffer], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });
    saveAs(data, "Project-Donation_Report.xlsx");
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "LKR",
    }).format(amount);
  };

  const columns = [
    { field: 'projectId', headerName: 'Project ID', width: 150 },
    { field: 'projectName', headerName: 'Project Name', width: 200 },
    {
      field: "raisedAmount",
      headerName: "Raised Amount",
      flex: 1,
      valueFormatter: (params) => formatCurrency(params.value),
    },
    {
      field: "goalAmount",
      headerName: "Goal Amount",
      flex: 1,
      valueFormatter: (params) => formatCurrency(params.value),
    },
    {
      field: 'donationPercentage',
      headerName: 'Goal Accomplished Percentage',
      width: 220,
      renderCell: (params) => {
        const donationPercentage = params.value;
        if (donationPercentage !== null && donationPercentage !== undefined) {
          return `${donationPercentage.toFixed(2)}%`;
        }
        return '';
      },
    }
    
  ];

  return (
    <>
      <SideBarTest />
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
              rows={userData}
              columns={columns}
              pageSize={5}
              checkboxSelection={false}
              disableSelectionOnClick
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default ProjectDonationReport;
