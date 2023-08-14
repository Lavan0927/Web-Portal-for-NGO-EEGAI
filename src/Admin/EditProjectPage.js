import React, { useEffect, useState } from "react";
import axios from "axios";
import Select from "react-select";
import PhoneInput from "react-phone-number-input";
import { isValidPhoneNumber } from "react-phone-number-input";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import CurrencyInput from "react-currency-input";
import SideBarTest from "./SideBarTest";
import { useNavigate, useParams } from "react-router-dom";

const sdgOptions = [
  { value: 'No Poverty', label: 'No Poverty' },
  { value: 'Zero Hunger', label: 'Zero Hunger' },
  { value: 'Good Health and Well-Being', label: 'Good Health and Well-Being' },
  { value: 'Quality Education', label: 'Quality Education' },
  { value: 'Gender Equality', label: 'Gender Equality' },
  { value: 'Clean Water and Sanitation', label: 'Clean Water and Sanitation' },
  { value: 'Affordable and Clean Energy', label: 'Affordable and Clean Energy' },
  { value: 'Decent Work and Economic Growth', label: 'Decent Work and Economic Growth' },
  { value: 'INDUSTRY, INNOVATION AND INFRASTRUCTURE', label: 'INDUSTRY, INNOVATION AND INFRASTRUCTURE' },
  { value: 'Reduced Inequalities', label: 'Reduced Inequalities' },
  { value: 'Sustainable Cities and Communities', label: 'Sustainable Cities and Communities' },
  { value: 'Responsible Consumption and Production', label: 'Responsible Consumption and Production' },
  { value: 'Climate Action', label: 'Climate Action' },
  { value: 'Life Below Water', label: 'Life Below Water' },
  { value: 'Life On Land', label: 'Life On Land' },
  { value: 'Peace Justice and Strong Instituations', label: 'Peace Justice and Strong Instituations' },
  { value: 'Partnership for the Goals', label: 'Partnership for the Goals' },
  // Add more options for interests as needed
];

const locationOptions = [
  { value: 'Sri Lanka', label: 'Sri Lanka' },
  { value: 'Australia', label: 'Australia' },
  { value: 'UK', label: 'UK' },
  // Add more options for skills as needed
];

const options = [
  { value: 'skill1', label: 'Skill 1' },
  { value: 'skill2', label: 'Skill 2' },
  { value: 'skill3', label: 'Skill 3' },
  { value: 'custom', label: 'custom' },
  // Add more options for skills as needed
];

const interestOptions = [
  { value: 'interest1', label: 'Interest 1' },
  { value: 'interest2', label: 'Interest 2' },
  { value: 'interest3', label: 'Interest 3' },
  // Add more options for interests as needed
];

const EditProjectPage = () => {
  // const { projectId } = useParams();
  const projectId = localStorage.getItem("projectId");
  // alert(projectId);
  const [projectData, setProjectData] = useState({});
  const [staffOptions, setStaffOptions] = useState([]);
  const [selectedStaffs, setSelectedStaffs] = useState([]);
  const [skills, setSkills] = useState([]);
  const [interests, setInterests] = useState([]);
  const [projectPhoto, setProjectPhoto] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchProjectData();
    fetchStaffOptions();
  }, [projectId]);

  const fetchProjectData = () => {
    axios
      .get(`/api/fetchProjectDetails/${projectId}`)
      .then((response) => {
        setProjectData(response.data);
        setSelectedStaffs(response.data.selectedStaffs);
        setSkills(response.data.skills);
        setInterests(response.data.interests);
      })
      .catch((error) => {
        console.error(`Error fetching project with ID ${projectId}:`, error);
      });
  };

  const fetchStaffOptions = () => {
    axios
      .get("/api/staffs")
      .then((response) => {
        setStaffOptions(response.data);
      })
      .catch((error) => {
        console.error("Error retrieving staff options:", error);
      });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const updatedProjectData = {
      ...projectData,
      selectedStaffs,
      skills,
      interests,
    };

    axios
      .put(`/api/projects/${projectId}`, updatedProjectData)
      .then((response) => {
        console.log(`Project with ID ${projectId} updated successfully`);
        navigate(`/project/${projectId}`);
      })
      .catch((error) => {
        console.error(`Error updating project with ID ${projectId}:`, error);
      });
  };

  const isValidContactNo = (contactNo) => {
    return isValidPhoneNumber(contactNo);
  };

  const isProjectDataLoaded = () => {
    return Object.keys(projectData).length !== 0;
  };

  return (
    <>
      <SideBarTest />
      <div className="main-container">
        <div className="content-container">
          <div className="volunteer-form">
            <h2>Edit Project</h2>
            {/* <p>{projectData}</p> */}
          
            {/* <p>{projectData.projectId}</p> */}
            {isProjectDataLoaded() ? (
              <form onSubmit={handleFormSubmit}>
                <label htmlFor="projectId">Project ID</label>
                <p>{projectData.projectId}</p>
                <input type="text" id="projectId" value={projectData.projectId} disabled />

                <label htmlFor="projectName">Project Name</label>
                <p>{projectData.projectName}</p>
                <input
                  type="text"
                  id="projectName"
                  value={projectData.projectName}
                  onChange={(e) => setProjectData({ ...projectData, projectName: e.target.value })}
                  disabled />

                <label>Project Description</label>
                <textarea
                  name="projectDescription"
                  value={projectData.projectDescription}
                  onChange={(e) =>
                    setProjectData({ ...projectData, projectDescription: e.target.value })
                  }
                  placeholder="Type project Description Here!"
                  rows={10}
                  cols={40}
                  required
                />

                <label htmlFor="projectPhoto">Project Photo</label>
                {/* {projectData.overPhotoReference && ( */}
                  <img src={projectData.coverPhotoReference} alt="Project" />
                {/* )} */}
                <input
                  type="file"
                  id="projectPhoto"
                  onChange={(e) => setProjectPhoto(e.target.files[0])}
                />

                {/* <label>SDG Preferences</label>
                <Select
                  options={sdgOptions}
                  value={sdgOptions.filter((option) => projectData.sdg.includes(option.value))}
                  onChange={(selectedOptions) =>
                    setProjectData({
                      ...projectData,
                      sdg: selectedOptions.map((option) => option.value),
                    })
                  }
                  isMulti
                  placeholder="Select SDG Preferences"
                  required
                /> */}

                {/* <label>Location</label>
                <Select
                  options={locationOptions}
                  value={locationOptions.filter((option) =>
                    projectData.location.includes(option.value)
                  )}
                  onChange={(selectedOptions) =>
                    setProjectData({
                      ...projectData,
                      location: selectedOptions.map((option) => option.value),
                    })
                  }
                  isMulti
                  placeholder="Select Location"
                  required
                />

                <label htmlFor="contactNo">Contact No</label>
                <PhoneInput
                  type="text"
                  id="contactNo"
                  defaultCountry="LK"
                  value={projectData.contactNo}
                  onChange={(value) => setProjectData({ ...projectData, contactNo: value })}
                  required
                />

                <label htmlFor="startDate">Start Date</label>
                <DatePicker
                  id="startDate"
                  selected={projectData.startDate}
                  onChange={(date) => setProjectData({ ...projectData, startDate: date })}
                  dateFormat="dd/MM/yyyy"
                />

                <label htmlFor="endDate">End Date</label>
                <DatePicker
                  id="endDate"
                  selected={projectData.endDate}
                  onChange={(date) => setProjectData({ ...projectData, endDate: date })}
                  dateFormat="dd/MM/yyyy"
                />

                <label htmlFor="fundGoalAmount">Fund Goal Amount</label>
                <CurrencyInput
                  suffix="LKR"
                  id="fundGoalAmount"
                  value={projectData.fundgoalamount}
                  onChangeEvent={(e, maskedValue, floatValue) =>
                    setProjectData({ ...projectData, fundgoalamount: maskedValue })
                  }
                  required
                />

                <label htmlFor="assignStaff">Staff</label>
                <Select
                  id="assignStaff"
                  options={staffOptions}
                  value={selectedStaffs}
                  onChange={setSelectedStaffs}
                  isMulti
                  placeholder="Select Staff to Assign"
                />

                <label htmlFor="skills">Required Skills</label>
                <Select
                  id="skills"
                  options={options}
                  value={options.filter((option) => skills.includes(option.value))}
                  onChange={(selectedOptions) =>
                    setSkills(selectedOptions.map((option) => option.value))
                  }
                  isMulti
                  placeholder="Select Skills"
                />

                <label htmlFor="interests">Required Interests</label>
                <Select
                  id="interests"
                  options={interestOptions}
                  value={interestOptions.filter((option) => interests.includes(option.value))}
                  onChange={(selectedOptions) =>
                    setInterests(selectedOptions.map((option) => option.value))
                  }
                  isMulti
                  placeholder="Select Interests"
                /> */}

                <br />
                <button type="submit">Save Changes</button>
              </form>
           ) : (
              <p>Loading...</p>
            )} 
          </div>
        </div>
      </div>

      
    </>
  );
};

export default EditProjectPage;