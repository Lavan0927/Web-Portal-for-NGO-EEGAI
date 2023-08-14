import React, { useEffect, useState } from "react";
import { Table, Thead, Tbody, Tr, Th, Td, Select, Button, IconButton } from "@chakra-ui/react";
import axios from "axios";
// import AdminNavbar from "./AdminNavbar";
// import AdminSidebar from "./AdminSidebar";
import { saveAs } from "file-saver";
import * as XLSX from 'xlsx';
import "/Users/lavanya/Desktop/eegai copy/src/Admin/ManageUsers.css"; // Import custom CSS file
import VolunteerSideBar from "./VolunteerSideBar";
import "/Users/lavanya/Desktop/eegai copy/src/css/bootstrap.min.css";
import "/Users/lavanya/Desktop/eegai copy/src/css/bootstrap-icons.css";
import "/Users/lavanya/Desktop/eegai copy/src/css/templatemo-kind-heart-charity.css";

import {
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBCardImage,
  MDBBtn
} from 'mdb-react-ui-kit';

function VolunteerManageProjects() {
  const [userData, setUserData] = useState([]);
  const [filterValue, setFilterValue] = useState("All"); // Filter value state
  const [userId, setUserId] = useState('');
  const [volunteerId, setVolunteerId] = useState('');
  const [projectDetails, setProjectDetails] = useState([]); 
  const [assignedprojectDetails, setAssignedProjectDetails] = useState([]); 

  useEffect(() => {
    // Check if user is already logged in
    const userId = sessionStorage.getItem('userID');
    setUserId(userId);

    // Fetch donorId using userId from the backend API
    if (userId) {
      axios.get(`/api/getVolunteerIdByUserId/${userId}`)
        .then((response) => {
            setVolunteerId(response.data.volunteerId);
        })
        .catch((error) => {
          console.error(error);
          // Handle error if donorId retrieval fails
        });
    }
  }, []);

  useEffect(() => {

    // Fetch the donation details based on the donorId from the backend API
    if (volunteerId) {
      axios.get(`/api/getProjectDetailsByVolunteerId/${volunteerId}`)
        .then((response) => {
            setProjectDetails(response.data);
        })
        .catch((error) => {
          console.error(error);
          // Handle error if donation details retrieval fails
        });
    }
  }, [volunteerId]);

  useEffect(() => {

    // Fetch the donation details based on the donorId from the backend API
    if (volunteerId) {
      axios.get(`/api/getAssignedProjectDetailsByVolunteerId/${volunteerId}`)
        .then((response) => {
          setAssignedProjectDetails(response.data);
        })
        .catch((error) => {
          console.error(error);
          // Handle error if donation details retrieval fails
        });
    }
  }, [volunteerId]);

  const handleAccept = (projectId, volunteerId) => {
    // Update the Assignment_Status to "Assigned" in the backend
    axios.post('/api/assignProject', {
      projectId: projectId,
      volunteerId: volunteerId,
    })
      .then((response) => {
        // If the backend update is successful, update the frontend state
        const updatedProjectDetails = projectDetails.map(project => {
          if (project.projectId === projectId && project.volunteerId === volunteerId) {
            return { ...project, Assigment_Status: 'Assigned' };
          }
          return project;
        });
        setProjectDetails(updatedProjectDetails);
      })
      .catch((error) => {
        console.error('Failed to update the Assignment_Status.', error);
        // Handle the error if the backend update fails
      });
  };

  const handleCancel = (projectId, volunteerId) => {
    // Update the Assignment_Status to "Cancelled" in the backend
    axios.post('/api/cancelProject', {
      projectId: projectId,
      volunteerId: volunteerId,
    })
      .then((response) => {
        // If the backend update is successful, update the frontend state
        const updatedProjectDetails = projectDetails.map(project => {
          if (project.projectId === projectId && project.volunteerId === volunteerId) {
            return { ...project, Assigment_Status: 'Cancelled' };
          }
          return project;
        });
        setProjectDetails(updatedProjectDetails);
      })
      .catch((error) => {
        console.error('Failed to update the Assignment_Status.', error);
        // Handle the error if the backend update fails
      });
  };


  return (
    <>
    <VolunteerSideBar />
    <div className="main-container">
        <div className="content-container">
      {/* <h2>Project Details Assigned for Volunteer Name: {volunteerId}</h2> */}
      
      <div class="col-lg-12 col-12 text-center mb-4">
      <h2>Suggested Projects</h2>
    </div>

      {projectDetails.map(project => (

        <MDBCard style={{width:'300px'}}>
        <MDBCardImage src={project.coverPhotoReference}  position='top' alt='...' style={{ objectFit: 'cover', height: '200px' }} />
        <MDBCardBody>
          <MDBCardTitle>{project.projectName}</MDBCardTitle>
          <MDBCardText>
            {project.projectDescription}
          </MDBCardText>
          <center> 
            <MDBBtn onClick={() => handleAccept(project.projectId, volunteerId)}>Accept</MDBBtn> <span style={{ marginRight: '20px' }}></span> 
            <MDBBtn onClick={() => handleCancel(project.projectId, volunteerId)}>Cancel</MDBBtn>
          </center>
        
        </MDBCardBody>
        </MDBCard>
        
      ))}

    <br></br>
    <br></br>
    <br></br>   

      <section class="section-padding" id="section_3">
      <div class="container">
          <div class="row">

        <div class="col-lg-12 col-12 text-center mb-4">
            <h2>Assigned Projects</h2>
        </div>

        {assignedprojectDetails.map(project => (
        <div className="col-lg-4 col-md-6 col-12 mb-4 mb-lg-0" key={project.id}>
          <div className="custom-block-wrap" style={{marginBottom:"50px"}}>
            <img style={{height:"200px"}} src={project.coverPhotoReference} className="custom-block-image img-fluid" alt="" />

            <div className="custom-block">
              <div className="custom-block-body" style={{height:"250px"}}>
                <h5 className="mb-3">{project.projectName}</h5>


                <p>{project.projectDescription}</p>

                <div className="progress mt-4">
                  <div
                    className="progress-bar"
                    role="progressbar"
                    style={{ width: `${(project.raisedAmount / project.goalAmount) * 100}%` }}
                    aria-valuenow={(project.raisedAmount / project.goalAmount) * 100}
                    aria-valuemin="0"
                    aria-valuemax="100"
                  ></div>
                </div>

                <div className="d-flex align-items-center my-2">
                  <p className="mb-0">
                    <strong>Raised:</strong>
                    {project.raisedAmount}
                  </p>

                  <p className="ms-auto mb-0">
                    <strong>Goal:</strong>
                    {project.goalAmount}
                  </p>
                </div>
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
    </>
  );
}

export default VolunteerManageProjects;
