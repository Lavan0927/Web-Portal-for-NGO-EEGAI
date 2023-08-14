import React, { useEffect, useState } from "react";
// import { Button } from "@chakra-ui/react";
import axios from "axios";
import { saveAs } from "file-saver";
import * as XLSX from 'xlsx';
import "./ManageUsers.css"; // Import custom CSS file
import SideBarTest from "./SideBarTest";
import { DataGrid } from '@mui/x-data-grid';
import { v4 as uuidv4 } from 'uuid'; // Import uuid
import Button from '@mui/material/Button';

function ProjectStaffReport() {
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('/api/project-staff');
      // Add unique IDs to rows
      const dataWithIds = response.data.map((row) => ({ ...row, id: uuidv4() }));
      setUserData(dataWithIds);
    } catch (error) {
      console.error(error);
    }
  };

  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(userData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Users");
    const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
    const data = new Blob([excelBuffer], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });
    saveAs(data, "users.xlsx");
  };

  const columns = [
    { field: 'projectId', headerName: 'Project ID', width: 150 },
    { field: 'projectName', headerName: 'Project Name', width: 200 },
    { field: 'staffId', headerName: 'Staff ID', width: 150 },
    { field: 'fullname', headerName: 'Staff Name', width: 200 },
    { field: 'designation', headerName: 'Staff Designation', width: 200 },
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

export default ProjectStaffReport;
