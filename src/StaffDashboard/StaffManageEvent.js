import React, { useEffect, useState } from "react";
import axios from "axios";
import { saveAs } from "file-saver";
import * as XLSX from 'xlsx';
import StaffSideBar from "./StaffSideBar";
import { DataGrid } from '@mui/x-data-grid';
import "/Users/lavanya/Desktop/eegai copy/src/css/bootstrap.min.css";
import "/Users/lavanya/Desktop/eegai copy/src/css/bootstrap-icons.css";
import "/Users/lavanya/Desktop/eegai copy/src/css/templatemo-kind-heart-charity.css";
import { Button } from "@chakra-ui/react";

function StaffManageEvent() {
  const [eventDetails, setEventDetails] = useState([]);
  const [userId, setUserId] = useState('');
  const [staffId, setStaffId] = useState('');
  const [staffName, setStaffName] = useState('');

  useEffect(() => {
    // Check if user is already logged in
    const userId = sessionStorage.getItem('userID');
    setUserId(userId);

    // Fetch staffId using userId from the backend API
    if (userId) {
      axios.get(`/api/getStaffIdByUserId/${userId}`)
        .then((response) => {
            setStaffId(response.data.staffId);
        })
        .catch((error) => {
          console.error(error);
          // Handle error if staffId retrieval fails
        });
    }
  }, []);

  useEffect(() => {
    // Fetch the event details based on the staffId from the backend API
    if (staffId) {
      axios.get(`/api/getEventDetailsByStaffId/${staffId}`)
        .then((response) => {
          // Add unique 'id' property to each row in eventDetails
          const eventDetailsWithId = response.data.map((event) => ({ ...event, id: event.eventId }));
          setEventDetails(eventDetailsWithId);
        })
        .catch((error) => {
          console.error(error);
          // Handle error if event details retrieval fails
        });
    }
  }, [staffId]);

  useEffect(() => {

    // Fetch donorId using userId from the backend API
    if (staffId) {
      axios.get(`/api/getStaffNameBystaffId/${staffId}`)
        .then((response) => {
          setStaffName(response.data.staffName);
        })
        .catch((error) => {
          console.error(error);
          // Handle error if donorId retrieval fails
        });
    }
  }, [staffId]);

  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(eventDetails);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Event Details");
    const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
    const data = new Blob([excelBuffer], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });
    saveAs(data, "Event_Details.xlsx");
  };

  const columns = [
    { field: 'eventId', headerName: 'Event ID', width: 150 },
    { field: 'eventName', headerName: 'Event Name', width: 200 },
    { field: 'eventDescription', headerName: 'Event Description', width: 300 },
    { field: 'location', headerName: 'Event Location', width: 200 },
    // Add more columns as needed
  ];

  return (
    <>
    <StaffSideBar />
    <div className="main-container">
        <div className="content-container">
      <h2>Event Details Assigned for Staff: {staffName}</h2>
      <Button onClick={exportToExcel}>
        Export to Excel
      </Button>
      <br /><br />
      <div style={{ height: 400, width: '100%' }}>
        <DataGrid
          rows={eventDetails}
          columns={columns}
          autoHeight
          disableSelectionOnClick
        />

<section class="section-padding" id="section_3">
      <div class="container">
          <div class="row">

              <div class="col-lg-12 col-12 text-center mb-4">
                  <h2>Events Assigned</h2>
              </div>

                        {eventDetails.map(event => (
        <div className="col-lg-4 col-md-6 col-12 mb-4 mb-lg-0" key={event.eventId}>
          <div className="custom-block-wrap" style={{marginBottom:"50px"}}>
            <img style={{height:"200px"}} src={event.coverPhotoReference} className="custom-block-image img-fluid" alt="" />

            <div className="custom-block">
              <div className="custom-block-body" style={{height:"200px"}}>
                <h5 className="mb-3">{event.eventName}</h5>


                <p>{event.eventDescription}</p>

                {/* <div className="progress mt-4">
                  <div
                    className="progress-bar"
                    role="progressbar"
                    style={{ width: `${(event.raisedAmount / event.goalAmount) * 100}%` }}
                    aria-valuenow={(event.raisedAmount / event.goalAmount) * 100}
                    aria-valuemin="0"
                    aria-valuemax="100"
                  ></div>
                </div> */}

                {/* <div className="d-flex align-items-center my-2">
                  <p className="mb-0">
                    <strong>Raised:</strong>
                    {event.raisedAmount}
                  </p>

                  <p className="ms-auto mb-0">
                    <strong>Goal:</strong>
                    {event.goalAmount}
                  </p>
                </div> */}

              </div>

              <a href="donate.html" className="custom-btn btn">Read More</a>
            </div>
          </div>
        </div>
      ))}
                   </div>
                </div>
            </section>
      </div>
      </div>
    </div>
    </>
  );
}

export default StaffManageEvent;
