import React, { useEffect, useState } from "react";
// import { Button } from "@chakra-ui/react";
import axios from "axios";
import { saveAs } from "file-saver";
import * as XLSX from 'xlsx';
import { DataGrid } from '@mui/x-data-grid';
import Button from '@mui/material/Button';

import SideBarTest from "./SideBarTest";

function ActivityStaffReport() {
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('/api/activity-staff');
      // Adding 'id' property based on 'activityId'
      const dataWithId = response.data.map((activity) => ({ ...activity, id: activity.activityId }));
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
    saveAs(data, "Activity-Staff_Details.xlsx");
  };
      
  const columns = [
    { field: 'activityId', headerName: 'Activity ID', width: 150 },
    { field: 'activityName', headerName: 'Activity Name', width: 200 },
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

export default ActivityStaffReport;
