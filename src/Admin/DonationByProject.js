import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";

function DonationsByProject() {
  const [projectData, setProjectData] = useState([]);

  useEffect(() => {
    fetchDonationsByProject();
  }, []);

  const fetchDonationsByProject = async () => {
    try {
      const response = await axios.get("/api/donationsByProject");
      // Add a unique 'id' property to each project object
      const projectsWithId = response.data.map((project, index) => ({
        ...project,
        id: index + 1, // You can use any unique identifier here
      }));
      setProjectData(projectsWithId);
    } catch (error) {
      console.error(error);
    }
  };


  const columns = [
    { field: "projectId", headerName: "Project ID", width: 150 },
    { field: "projectName", headerName: "Project Name", width: 200 },
    {
      field: "donationCount",
      headerName: "Donation Count",
      width: 180,
      type: "number",
    },
    {
      field: "totalDonationAmount",
      headerName: "Total Donation Amount",
      width: 220,
      valueFormatter: (params) => new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "LKR",
      }).format(params.value),
    },
    {
      field: "goalAmount",
      headerName: "Goal Amount",
      width: 180,
      valueFormatter: (params) => new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "LKR",
      }).format(params.value),
    },
  ];

  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={projectData}
        columns={columns}
        pageSize={5}
        autoHeight
        disableSelectionOnClick
      />
    </div>
  );
}

export default DonationsByProject;
