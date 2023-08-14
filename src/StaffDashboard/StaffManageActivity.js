import React, { useEffect, useState } from "react";
import axios from "axios";
import { DataGrid } from '@mui/x-data-grid'; // Add the import statement for DataGrid
import StaffSideBar from "./StaffSideBar";
import "/Users/lavanya/Desktop/eegai copy/src/css/bootstrap.min.css";
import "/Users/lavanya/Desktop/eegai copy/src/css/bootstrap-icons.css";
import "/Users/lavanya/Desktop/eegai copy/src/css/templatemo-kind-heart-charity.css";

function StaffManageActivity() {
  const [userData, setUserData] = useState([]);
  const [filterValue, setFilterValue] = useState("All"); // Filter value state
  const [userId, setUserId] = useState('');
  const [staffId, setStaffId] = useState('');
  const [staffName, setStaffName] = useState('');
  const [activityDetails, setActivityDetails] = useState([]); 

  useEffect(() => {
    // Check if user is already logged in
    const userId = sessionStorage.getItem('userID');
    setUserId(userId);

    // Fetch donorId using userId from the backend API
    if (userId) {
      axios.get(`/api/getStaffIdByUserId/${userId}`)
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

// ... Existing code ...

useEffect(() => {
  // Fetch the donation details based on the donorId from the backend API
  if (staffId) {
    axios.get(`/api/getActivityDetailsByStaffId/${staffId}`)
      .then((response) => {
        // Add a unique 'id' property to each activity row
        const activityDataWithId = response.data.map((activity, index) => ({
          id: index + 1, // You can use any unique identifier here, for example, index + 1
          ...activity,
        }));
        setActivityDetails(activityDataWithId);
      })
      .catch((error) => {
        console.error(error);
        // Handle error if donation details retrieval fails
      });
  }
}, [staffId]);

// ... Rest of the code ...


  // Define columns for DataGrid
  const columns = [
    { field: 'activityId', headerName: 'Activity ID', width: 150 },
    { field: 'activityName', headerName: 'Activity Name', width: 200 },
    { field: 'activityDescription', headerName: 'Activity Description', width: 300 },
    { field: 'location', headerName: 'Activity Location', width: 200 },
    // Add more columns as needed
  ];

  return (
    <>
      <StaffSideBar />
      <div className="main-container">
        <div className="content-container">
          <h2>Activity Details Assigned for Staff: {staffName}</h2>
          {/* Use the DataGrid component instead of the normal table */}
          <div style={{ height: 400, width: '100%' }}>
            <DataGrid
              rows={activityDetails}
              columns={columns}
              autoHeight
              disableSelectionOnClick
            />
          </div>

          <section class="section-padding" id="section_3">
      <div class="container">
          <div class="row">

              <div class="col-lg-12 col-12 text-center mb-4">
                  <h2>Activity Assigned</h2>
              </div>

                        {activityDetails.map(activity => (
        <div className="col-lg-4 col-md-6 col-12 mb-4 mb-lg-0" key={activity.activityId}>
          <div className="custom-block-wrap" style={{marginBottom:"50px"}}>
            <img style={{height:"200px"}} src={activity.coverPhotoReference} className="custom-block-image img-fluid" alt="" />

            <div className="custom-block">
              <div className="custom-block-body" style={{height:"250px"}}>
                <h5 className="mb-3">{activity.activityName}</h5>


                <p>{activity.activityDescription}</p>

                <div className="progress mt-4">
                  <div
                    className="progress-bar"
                    role="progressbar"
                    style={{ width: `${(activity.raisedAmount / activity.goalAmount) * 100}%` }}
                    aria-valuenow={(activity.raisedAmount / activity.goalAmount) * 100}
                    aria-valuemin="0"
                    aria-valuemax="100"
                  ></div>
                </div>

                <div className="d-flex align-items-center my-2">
                  <p className="mb-0">
                    <strong>Raised:</strong>
                    {activity.raisedAmount}
                  </p>

                  <p className="ms-auto mb-0">
                    <strong>Goal:</strong>
                    {activity.goalAmount}
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

export default StaffManageActivity;
