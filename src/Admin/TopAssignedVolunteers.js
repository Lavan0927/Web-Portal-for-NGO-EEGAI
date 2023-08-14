import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";

function TopAssignedVolunteersTable() {
  const [topAssignedVolunteers, setTopAssignedVolunteers] = useState([]);

  useEffect(() => {
    // Fetch the top assigned volunteers from the backend API
    axios.get("/api/topAssignedVolunteers").then((response) => {
      // Add a unique id to each row
      const dataWithIds = response.data.map((volunteer, index) => ({
        ...volunteer,
        id: index + 1, // You can use any unique identifier here
      }));
      setTopAssignedVolunteers(dataWithIds);
    });
  }, []);

  const columns = [
    { field: "volunteerId", headerName: "Volunteer ID", flex: 1 },
    { field: "username", headerName: "Username", flex: 1 },
    { field: "CountOFAssignment", headerName: "Number of Assignments", flex: 1 },
  ];

  return (
    <div style={{ height: 400, width: "100%" }}>
      <DataGrid rows={topAssignedVolunteers} columns={columns} />
    </div>
  );
}

export default TopAssignedVolunteersTable;
