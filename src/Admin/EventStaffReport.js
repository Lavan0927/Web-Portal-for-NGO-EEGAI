import React, { useEffect, useState } from "react";
// import { Button } from "@chakra-ui/react";
import axios from "axios";
import { saveAs } from "file-saver";
import * as XLSX from 'xlsx';
import "./ManageUsers.css"; // Import custom CSS file
import SideBarTest from "./SideBarTest";
import { DataGrid } from '@mui/x-data-grid';
import Button from '@mui/material/Button';

function EventStaffReport() {
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('/api/event-staff');
      // Adding 'id' property based on 'eventId'
      const dataWithId = response.data.map((activity) => ({ ...activity, id: activity.eventId }));
      setUserData(dataWithId);
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
    saveAs(data, "Event-Staff_Details.xlsx");
  };
      
  const columns = [
    { field: 'eventId', headerName: 'Event ID', width: 150 },
    { field: 'eventName', headerName: 'Event Name', width: 200 },
    { field: 'staffId', headerName: 'Staff ID', width: 150 },
    { field: 'StaffName', headerName: 'Staff Name', width: 200 },
    { field: 'Designation', headerName: 'Staff Designation', width: 200 },
  ];

  return (
    <>
      <SideBarTest />
      <div className="main-container">
        <div className="content-container">
          <br />
          {/* <Button onClick={exportToExcel}>Export to Excel</Button> */}
          <Button variant="outlined" onClick={exportToExcel} > Export to Excel</Button>
          <br /><br />
          <div style={{ height: 400, width: '100%' }}>
            <DataGrid
              rows={userData}
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

export default EventStaffReport;
