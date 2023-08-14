import React, { useEffect, useState } from "react";
// import Button from '@mui/material/Button';
import axios from "axios";
import { saveAs } from "file-saver";
import * as XLSX from 'xlsx';
import "./ManageUsers.css"; // Import custom CSS file
import SideBarTest from "./SideBarTest";
import { DataGrid } from '@mui/x-data-grid';
import Button from '@mui/material/Button';

function EventVolunteerReport() {
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('/api/event-volunteer');
      // Adding 'id' property based on 'activityId' and 'volunteerId'
      const dataWithId = response.data.map((row, index) => ({ ...row, id: `${row.activityId}-${row.volunteerId}` }));
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
    saveAs(data, "Event-VolunteerReport.xlsx");
  };

  const columns = [
    { field: 'eventId', headerName: 'Event ID', width: 150 },
    { field: 'eventName', headerName: 'Event Name', width: 200 },
    { field: 'volunteerId', headerName: 'Volunteer ID', width: 150 },
    { field: 'username', headerName: 'Volunteer Name', width: 200 },
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

export default EventVolunteerReport;
