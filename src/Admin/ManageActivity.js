import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { IconButton } from "@mui/material";
import { ChevronDown, ChevronUp, Edit, Delete } from "@mui/icons-material";
import axios from "axios";
import { saveAs } from "file-saver";
import * as XLSX from "xlsx";
import SideBarTest from "./SideBarTest";
import Button from '@mui/material/Button';

const handleDeleteProject = (activityId) => {
  // Send a DELETE request to the server to delete the project
  axios
    .delete(`/api/projects/${activityId}`)
    .then((response) => {
      console.log(`Project with ID ${activityId} deleted successfully`);
      // Perform any additional actions, such as updating the UI or refetching project data
    })
    .catch((error) => {
      console.error(`Error deleting project with ID ${activityId}:`, error);
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
  { field: "activityId", headerName: "Activity ID", width: 150 },
  { field: "activityName", headerName: "Activity Name", width: 200 },
  {
    field: "activityDescription",
    headerName: "Activity Description",
    width: 400,
    renderCell: (params) =>
      params.row.activityDescription.slice(0, 100) + "...",
  },
  { field: "SDG", headerName: "SDG", width: 150 },
  { field: "location", headerName: "Location", width: 150 },
  { field: "contactNo", headerName: "Contact No", width: 150 },
  {
    field: "goalAmount",
    headerName: "Goal Amount",
    width: 200,
    valueFormatter: (params) => formatCurrency(params.value),
  },
  {
    field: "raisedAmount",
    headerName: "Raised Amount",
    width: 200,
    valueFormatter: (params) => formatCurrency(params.value),
  },
  {
    field: "actions",
    headerName: "Actions",
    width: 120,
    renderCell: (params) => (
      <>
        <IconButton>
          <Edit />
        </IconButton>
        <IconButton onClick={() => handleDeleteProject(params.row.activityId)}>
          <Delete />
        </IconButton>
      </>
    ),
  },
];

function ManageActivity() {
  const [projectData, setProjectData] = useState([]);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await axios.get("/api/manageactivity");
      // Rename the 'activityId' property to 'id' to provide a unique identifier
      const formattedData = response.data.map((activity) => ({
        ...activity,
        id: activity.activityId,
      }));
      setProjectData(formattedData);
    } catch (error) {
      console.error(error);
    }
  };

  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(projectData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Activities");
    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });
    const data = new Blob([excelBuffer], {
      type:
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });
    saveAs(data, "activities.xlsx");
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
            rows={projectData}
            columns={columns}
            autoHeight
            disableSelectionOnClick
            pageSize={10}
          />
        </div>
      </div>
    </>
  );
}

export default ManageActivity;
