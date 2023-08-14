import React, { useEffect, useState } from "react";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import axios from "axios";

function TopAssignedStaffTable() {
  const [topAssignedStaff, setTopAssignedStaff] = useState([]);

  useEffect(() => {
    // Fetch the top assigned staff details from the backend API
    axios.get("/api/topAssignedStaff").then((response) => {
      // Add a unique id property to each row using the index
      const dataWithIds = response.data.map((row, index) => ({ ...row, id: index }));
      setTopAssignedStaff(dataWithIds);
    });
  }, []);

  const columns = [
    { field: "id", headerName: "ID", hide: true }, // Hide the unique id column
    { field: "staffId", headerName: "Staff ID", flex: 1 },
    { field: "fullname", headerName: "Full Name", flex: 1 },
    {
      field: "CountOfAssignments",
      headerName: "Number of Assignments",
      flex: 1,
      filterable: true,
      type: "number",
      filterOperators: ["=", ">=", "<="],
    },
  ];

  return (
    <div style={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={topAssignedStaff}
        columns={columns}
        components={{
          Toolbar: GridToolbar,
        }}
      />
    </div>
  );
}

export default TopAssignedStaffTable;
