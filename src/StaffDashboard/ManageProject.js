import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import axios from "axios";
import { saveAs } from "file-saver";
import * as XLSX from "xlsx";
import "/Users/lavanya/Desktop/eegai copy/src/Admin/ManageUsers.css"; // Import custom CSS file
import StaffSideBar from "./StaffSideBar";
import "/Users/lavanya/Desktop/eegai copy/src/css/bootstrap.min.css";
import "/Users/lavanya/Desktop/eegai copy/src/css/bootstrap-icons.css";
import "/Users/lavanya/Desktop/eegai copy/src/css/templatemo-kind-heart-charity.css";

function ManageProject() {
  const [userData, setUserData] = useState([]);
  const [filterValue, setFilterValue] = useState("All"); // Filter value state
  const [userId, setUserId] = useState("");
  const [staffId, setStaffId] = useState("");
  const [staffName, setStaffName] = useState('');
  const [projectDetails, setProjectDetails] = useState([]);

  useEffect(() => {
    // Check if user is already logged in
    const userId = sessionStorage.getItem("userID");
    setUserId(userId);

    // Fetch donorId using userId from the backend API
    if (userId) {
      axios
        .get(`/api/getStaffIdByUserId/${userId}`)
        .then((response) => {
          setStaffId(response.data.staffId);
        })
        .catch((error) => {
          console.error(error);
          // Handle error if donorId retrieval fails
        });
    }
  }, []);

  useEffect(() => {
    // Fetch the donation details based on the donorId from the backend API

    if (staffId) {
      axios
        .get(`/api/getProjectDetailsByStaffId/${staffId}`)
        .then((response) => {
          // Add a unique id field to each project
          const projectsWithId = response.data.map((project, index) => ({
            ...project,
            id: index + 1,
          }));
          setProjectDetails(projectsWithId);
        })
        .catch((error) => {
          console.error(error);
          // Handle error if donation details retrieval fails
        });
    }
  }, [staffId]);

  useEffect(() => {

    // Fetch donorId using userId from the backend API
    if (staffId) {
      axios.get(`/api/getStaffNameBystaffId/${staffId}`)
        .then((response) => {
          // alert("Staff Name",staffName);
          setStaffName(response.data.staffName);
        })
        .catch((error) => {
          console.error(error);
          // Handle error if donorId retrieval fails
        });
    }
  }, [staffId]);

  return (
    <>
      <StaffSideBar />
      <div className="main-container">
        <div className="content-container">
          <h2>Project Details Assigned for Staff: {staffName}</h2>
          <div style={{ height: 400, width: "100%" }}>
            <DataGrid
              rows={projectDetails}
              columns={[
                { field: "projectId", headerName: "Project ID" },
                { field: "projectName", headerName: "Project Name", flex: 1 },
                {
                  field: "projectDescription",
                  headerName: "Project Description",
                  flex: 1,
                },
                { field: "location", headerName: "Project Location", flex: 1 },
                // Add more columns as needed
              ]}
            />

        <section class="section-padding" id="section_3">
          <div class="container">
            <div class="row">
              <div class="col-lg-12 col-12 text-center mb-4">
                <h2>Projects Assigned</h2>
              </div>

              {projectDetails.map((project) => (
                <div
                  className="col-lg-4 col-md-6 col-12 mb-4 mb-lg-0"
                  key={project.id}
                >
                  <div className="custom-block-wrap" style={{marginBottom:"50px"}}>
                    <img
                      style={{ height: "200px" }}
                      src={project.coverPhotoReference}
                      className="custom-block-image img-fluid"
                      alt=""
                    />

                    <div className="custom-block">
                      <div className="custom-block-body"  style={{height:"250px"}}>
                        <h5 className="mb-3">{project.projectName}</h5>
                        <p>{project.projectDescription}</p>

                        <div className="progress mt-4">
                          <div
                            className="progress-bar"
                            role="progressbar"
                            style={{
                              width: `${(project.raisedAmount /
                                project.goalAmount) *
                                100}%`,
                            }}
                            aria-valuenow={
                              (project.raisedAmount / project.goalAmount) * 100
                            }
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

                      <a href="donate.html" className="custom-btn btn">
                        Read More
                      </a>
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

export default ManageProject;
