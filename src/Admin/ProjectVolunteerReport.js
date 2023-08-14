import React, { useEffect, useState } from "react";
import { Select} from "@chakra-ui/react";
import axios from "axios";
import { saveAs } from "file-saver";
import * as XLSX from 'xlsx';
import "./ManageUsers.css"; // Import custom CSS file
import SideBarTest from "./SideBarTest";
import { DataGrid } from '@mui/x-data-grid';
import Button from '@mui/material/Button';

function ProjectVolunteerReport() {
  const [userData, setUserData] = useState([]);
  const [filterValue, setFilterValue] = useState("All"); // Filter value state

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('/api/project-volunteer'); // Replace '/api/users' with the actual API endpoint to fetch user data
      setUserData(response.data);
      console.log()
    } catch (error) {
      console.error(error);
    }
  };

  const handleFilterChange = (event) => {
    setFilterValue(event.target.value);
  };

  const filteredData =
    filterValue === "All"
      ? userData
      : userData.filter((user) => user.role === filterValue);

  // Function to add unique 'id' property to each row in the array
  const addIdToRows = (rows) => {
    return rows.map((row, index) => ({ ...row, id: index + 1 }));
  };

  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(filteredData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Users");
    const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
    const data = new Blob([excelBuffer], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });
    saveAs(data, "users.xlsx");
  };

  const columns = [
    { field: 'projectId', headerName: 'Project ID', width: 150 },
    { field: 'projectName', headerName: 'Project Name', width: 200 },
    { field: 'volunteerId', headerName: 'Volunteer ID', width: 150 },
    { field: 'username', headerName: 'Volunteer Name', width: 200 },
  ];

  const filteredDataWithId = addIdToRows(filteredData);

  return (
    <>
      <SideBarTest />
      <div className="main-container">
        <div className="content-container">
          {/* <br></br>
          <Select
            value={filterValue}
            onChange={handleFilterChange}
            maxWidth="200px"
            marginBottom="10px"
          >
            <option value="All">All</option>
            <option value="admin">Admin</option>
            <option value="donor">Donor</option>
            <option value="volunteer">Volunteer</option>
            <option value="staff">Staff</option>
          </Select> */}
          {/* <br></br><br></br> */}
          {/* <Button onClick={exportToExcel}>
            Export to Excel
          </Button> */}
          <Button variant="outlined" onClick={exportToExcel} > Export to Excel</Button>
          <br></br><br></br>
          <div style={{ height: 400, width: '100%' }}>
            <DataGrid
              rows={filteredDataWithId}
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

export default ProjectVolunteerReport;
