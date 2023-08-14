import React, { useEffect, useState } from "react";
import { Table, Thead, Tr, Th, Td, IconButton } from "@chakra-ui/react";
import { ChevronDownIcon, ChevronUpIcon } from "@chakra-ui/icons";
import axios from "axios";
import { saveAs } from "file-saver";
import * as XLSX from "xlsx";
import SideBarTest from "./SideBarTest";
import { FaEdit, FaTrash } from 'react-icons/fa';
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import { DataGrid } from '@mui/x-data-grid';
import Button from '@mui/material/Button';

function ManageProjects() {
  const [projectData, setProjectData] = useState([]);
  const [expandedDescription, setExpandedDescription] = useState({});
  const navigate = useNavigate();

  const handleDeleteProject = (projectId) => {
    // Send a DELETE request to the server to delete the project
    axios
      .delete(`/api/projects/${projectId}`)
      .then((response) => {
        console.log(`Project with ID ${projectId} deleted successfully`);
        // Perform any additional actions, such as updating the UI or refetching project data
      })
      .catch((error) => {
        console.error(`Error deleting project with ID ${projectId}:`, error);
        // Handle any error conditions or display an error message
      });
  };
  
  const handleEditProject = (projectId) => {
    // setSelectedProjectId(projectId);
    // window.location.href = `/EditProjectPage?projectId=${projectId}`;
     // Store the projectId in localStorage before redirecting
     localStorage.setItem("projectId", projectId);
     // Redirect to the EditProject page
     navigate('/EditProjectPage');
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const response = await axios.get("/api/manageprojects");
      const projectsWithId = response.data.map((project) => ({
        ...project,
        id: project.projectId, // Add the id property using the projectId
      }));
      setProjectData(projectsWithId);
    } catch (error) {
      console.error(error);
    }
  };

  const handleToggleDescription = (projectId) => {
    setExpandedDescription((prevState) => ({
      ...prevState,
      [projectId]: !prevState[projectId],
    }));
  };

  const exportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(projectData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Projects");
    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });
    const data = new Blob([excelBuffer], {
      type:
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });
    saveAs(data, "projects.xlsx");
  };

  // Define columns for the DataGrid
  const columns = [
    { field: 'projectId', headerName: 'Project ID', flex: 1, width: 150 },
    { field: 'projectName', headerName: 'Project Name', flex: 1, width: 200 },
    { 
      field: 'projectDescription', 
      headerName: 'Project Description', 
      flex: 1,
      width: 250 ,
      renderCell: (params) => (
        <div>
          {expandedDescription[params.row.projectId] ? (
            <>
              {params.row.projectDescription}
              <IconButton
                icon={<ChevronUpIcon />}
                variant="ghost"
                size="sm"
                onClick={() => handleToggleDescription(params.row.projectId)}
              />
            </>
          ) : (
            <>
              {params.row.projectDescription.slice(0, 100)}...
              <IconButton
                icon={<ChevronDownIcon />}
                variant="ghost"
                size="sm"
                onClick={() => handleToggleDescription(params.row.projectId)}
              />
            </>
          )}
        </div>
      ),
    },
    { field: 'SDG', headerName: 'SDG', flex: 1 , width: 150 },
    { field: 'location', headerName: 'Location', flex: 1 , width: 150 },
    { field: 'startDate', headerName: 'Start Date', flex: 1 , width: 150 },
    { field: 'endDate', headerName: 'End Date', flex: 1, width: 150  },
    { field: 'contactNo', headerName: 'Contact No', flex: 1 , width: 150 },
    { field: 'goalAmount', headerName: 'Goal Amount', flex: 1 , width: 200 },
    { field: 'raisedAmount', headerName: 'Raised Amount', flex: 1 , width: 200 },
    {
      field: 'actions',
      headerName: 'Actions',
      flex: 1,
      renderCell: (params) => (
        <div>
          <IconButton
            icon={<FaEdit />}
            variant="ghost"
            size="sm"
            onClick={() => handleEditProject(params.row.projectId)}
          />
          <IconButton
            icon={<FaTrash />}
            variant="ghost"
            size="sm"
            onClick={() => handleDeleteProject(params.row.projectId)}
          />
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
          <br />
          <br />
          <div style={{ height: 500, width: '100%' }}>
            <DataGrid rows={projectData} columns={columns} />
          </div>
        </div>
      </div>
    </>
  );
}

export default ManageProjects;
