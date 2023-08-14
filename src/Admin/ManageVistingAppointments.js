import React, { useEffect, useState } from "react";
// import { Button } from "@chakra-ui/react";
import axios from "axios";
import { saveAs } from "file-saver";
import * as XLSX from 'xlsx';
import "./ManageUsers.css"; // Import custom CSS file
import SideBarTest from "./SideBarTest";
import emailjs from 'emailjs-com';
import { DataGrid } from '@mui/x-data-grid';
import Button from '@mui/material/Button';

function ManageVistingAppointments() {
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('/api/visiting-appointments');
      // Adding 'id' property based on 'appointmentId'
      const dataWithId = response.data.map((visitor) => ({ ...visitor, id: visitor.appointmentId }));
      setUserData(dataWithId);
    } catch (error) {
      console.error(error);
    }
  };
  
  const handleAccept = async (appointmentId, email, visitor) => {
    try {
      // Update the appointment status in the database
      const response = await axios.put(`/api/visiting-appointments/${appointmentId}/accept`);

      if (response.status === 200) {
        // Send email notification to the user
        const params = {
          to_email: email, // Replace with the email field from the visitor data
          to_name: visitor.fullname, // Replace with the fullname field from the visitor data
          date: visitor.dateofAppointment,
          time: visitor.timeofAppointment,
          // Add more parameters if needed for your email template
        };

        emailjs.send('service_sgga8tj', 'template_1966mi7', params, 'nGaQaEmTz4KIhXJig')
          .then((result) => {
            console.log(result.text);
            // Proceed with updating the user data only if the email sending is successful
            const updatedUserData = userData.map((user) =>
              user.appointmentId === appointmentId
                ? { ...user, appointmentStatus: "accepted" }
                : user
            );
            setUserData(updatedUserData);
          }, (error) => {
            console.log(error.text);
          });
      }
    } catch (error) {
      console.error(error);
    }
  };


  const handleDecline = async (appointmentId, email, visitor) => {
    try {
      const response = await axios.put(`/api/visiting-appointments/${appointmentId}/decline`);
      if (response.status === 200) {
        const updatedUserData = userData.map((user) =>
          user.appointmentId === appointmentId
            ? { ...user, appointmentStatus: "declined" }
            : user
        );
        setUserData(updatedUserData);
        // Send email notification to the user
        const params = {
          to_email: email, // Replace with the email field from the visitor data
          to_name: visitor.fullname, // Replace with the fullname field from the visitor data
          date: visitor.dateofAppointment,
          time: visitor.timeofAppointment,
          // Add more parameters if needed for your email template
        };

        emailjs.send('service_u7koxwf', 'template_o7pj9yp', params, 'BRRx_fXPneuskBonH')
          .then((result) => {
            console.log(result.text);
            // Proceed with updating the user data only if the email sending is successful
            const updatedUserData = userData.map((user) =>
              user.appointmentId === appointmentId
                ? { ...user, appointmentStatus: "accepted" }
                : user
            );
            setUserData(updatedUserData);
          }, (error) => {
            console.log(error.text);
          });
      }
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
    saveAs(data, "Visiting Appointment Details.xlsx");
  };

  const columns = [
    { field: 'appointmentId', headerName: 'Appointment ID', width: 150 },
    { field: 'fullname', headerName: 'Fullname', width: 200 },
    { field: 'email', headerName: 'Email', width: 200 },
    { field: 'contactNo', headerName: 'Contact No', width: 150 },
    { field: 'dateofAppointment', headerName: 'Date of Appointment', width: 200 },
    { field: 'timeofAppointment', headerName: 'Time of Appointment', width: 200 },
    { field: 'purpose', headerName: 'Purpose', width: 200 },
    { field: 'appointmentStatus', headerName: 'Status', width: 150 },
    {
      field: 'actions',
      headerName: 'Accept/Decline',
      width: 200,
      renderCell: (params) => (
        <div>
          <Button
            onClick={() => handleAccept(params.row.appointmentId, params.row.email, params.row)}
            variant="outline"
            colorScheme="green"
            size="small"
            style={{ backgroundColor: 'green' }}
          >
            Accept
          </Button>
          <span style={{ marginRight: '20px' }}></span>
          <Button
            onClick={() => handleDecline(params.row.appointmentId, params.row.email, params.row)}
            variant="outline"
            colorScheme="red"
            size="small"
            style={{ backgroundColor: 'red' }}
          >
            Decline
          </Button>
        </div>
      ),
    },
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

export default ManageVistingAppointments;
