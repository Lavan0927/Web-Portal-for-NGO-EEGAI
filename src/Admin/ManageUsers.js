import React, { useEffect, useState } from "react";
import { Select, IconButton } from "@chakra-ui/react";
import axios from "axios";
import { saveAs } from "file-saver";
import * as XLSX from 'xlsx';
import "./ManageUsers.css"; // Import custom CSS file
import SideBarTest from "./SideBarTest";
import { FaTrash } from 'react-icons/fa';
import { DataGrid } from '@mui/x-data-grid'; // Import DataGrid
import Button from '@mui/material/Button';

function ManageUsers() {
  const [userData, setUserData] = useState([]);
  const [filterValue, setFilterValue] = useState("All"); // Filter value state

  const handleFreezeAccount = (userId) => {
    // Send a PUT request to the server to update the user's account_status to "Suspended"
    axios
      .put(`/api/freezeUser/${userId}`)
      .then((response) => {
        console.log(`User with ID ${userId} suspended successfully`);
        // Update the userData state to reflect the changes in the UI
        setUserData((prevUserData) => {
          return prevUserData.map((user) =>
            user.userId === userId ? { ...user, account_status: "Suspended" } : user
          );
        });
      })
      .catch((error) => {
        console.error(`Error suspending user with ID ${userId}:`, error);
        // Handle any error conditions or display an error message
      });
  };
  

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('/api/users'); // Replace '/api/users' with the actual API endpoint to fetch user data
      setUserData(response.data);
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
    return rows.map((row) => ({ ...row, id: row.userId }));
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
    { field: 'userId', headerName: 'User ID', width: 150 },
    { field: 'username', headerName: 'Username', width: 200 },
    { field: 'email', headerName: 'Email', width: 200 },
    { field: 'contactNo', headerName: 'Contact No', width: 150 },
    { field: 'role', headerName: 'User Type', width: 150 },
    { field: 'account_status', headerName: 'Account Status', width: 150 },
    {
      field: 'actions',
      headerName: 'Action',
      width: 100,
      renderCell: (params) => (
        <Button variant="outlined" color="error" onClick={() => handleFreezeAccount(params.row.userId)}>
        Suspend
      </Button>
      ),
    },
  ];

  const filteredDataWithId = addIdToRows(filteredData); // Add id property to filteredData

  return (
    <>
      <SideBarTest />
      <div className="main-container">
        <div className="content-container">
          <br></br>
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
          </Select>
          <br></br><br></br>
          {/* <Button onClick={exportToExcel}>
            Export to Excel
          </Button> */}

          <Button variant="outlined" onClick={exportToExcel} > Export to Excel</Button>



          <br></br><br></br>
          <div style={{ height: 400, width: '100%' }}>
            <DataGrid
              rows={filteredDataWithId} // Use the filteredDataWithId which includes the 'id' property
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

export default ManageUsers;
