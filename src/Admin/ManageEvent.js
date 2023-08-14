import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { IconButton } from "@mui/material";
import { ChevronDown, ChevronUp, Edit, Delete } from "@mui/icons-material";
import axios from "axios";
import { saveAs } from "file-saver";
import * as XLSX from "xlsx";
import SideBarTest from "./SideBarTest";
import Button from '@mui/material/Button';

const handleDeleteEvent = (eventId) => {
  // Send a DELETE request to the server to delete the event
  axios
    .delete(`/api/events/${eventId}`)
    .then((response) => {
      console.log(`Event with ID ${eventId} deleted successfully`);
      // Perform any additional actions, such as updating the UI or refetching event data
    })
    .catch((error) => {
      console.error(`Error deleting event with ID ${eventId}:`, error);
      // Handle any error conditions or display an error message
    });
};

const formatCurrency = (amount) => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "LKR",
  }).format(amount);
};

const columns = [
  { field: "id", headerName: "ID", width: 100 },
  { field: "eventId", headerName: "Event ID", width: 150 },
  { field: "eventName", headerName: "Event Name", width: 400 },
  {
    field: "eventDescription",
    headerName: "Event Description",
    width: 600,
    renderCell: (params) =>
      params.row.eventDescription.slice(0, 100) + "...",
  },
  { field: "location", headerName: "Location", width: 200 },
  { field: "eventDate", headerName: "Event Date", width: 150 },
  { field: "startTime", headerName: "Start Time", width: 150 },
  { field: "endTime", headerName: "End Time", width: 150 },
  { field: "contactNo", headerName: "Contact No", width: 150 },
  {
    field: "actions",
    headerName: "Actions",
    width: 120,
    renderCell: (params) => (
      <>
        <IconButton>
          <Edit />
        </IconButton>
        <IconButton onClick={() => handleDeleteEvent(params.row.eventId)}>
          <Delete />
        </IconButton>
      </>
    ),
  },
];


function ManageEvent() {
  const [eventData, setEventData] = useState([]);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await axios.get("/api/manageevent");
      // Add unique 'id' property to each row
      const eventDataWithIds = response.data.map((event, index) => ({
        ...event,
        id: index + 1,
      }));
      setEventData(eventDataWithIds);
    } catch (error) {
      console.error(error);
    }
  };

  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(eventData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Events");
    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });
    const data = new Blob([excelBuffer], {
      type:
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });
    saveAs(data, "events.xlsx");
  };

  return (
    <>
      <SideBarTest />
      <div className="main-container">
        <div className="content-container">
          <br />
          <Button onClick={exportToExcel}>Export to Excel</Button>
          <br />
          <br />
          <DataGrid
            rows={eventData}
            columns={columns}
            autoHeight
            disableSelectionOnClick
            pageSize={10}
            components={{
              Toolbar: () => null, // Remove the default toolbar to hide the filters
            }}
          />
        </div>
      </div>
    </>
  );
}

export default ManageEvent;
