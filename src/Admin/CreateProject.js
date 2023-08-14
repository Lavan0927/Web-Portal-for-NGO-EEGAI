import React, { useEffect, useState } from "react";
import axios from 'axios';
import Select from 'react-select';
import 'react-phone-number-input/style.css';
import PhoneInput from 'react-phone-number-input';
import { isValidPhoneNumber } from 'react-phone-number-input';
// import AdminSidebar from "./AdminSidebar";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import 'react-clock/dist/Clock.css';
import CurrencyInput from 'react-currency-input';
import SideBarTest from "./SideBarTest";
import "./VolunteerRegistrationForm.css";
import "./ManageUsers.css";
import { useNavigate } from "react-router-dom";


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

function CreateProject() {
  const [projectname, setProjectName] = useState('');
  const [projectdescription, setProjectDescription] = useState('');
  const [sdg, setSDG] = useState([]);
  const [location, setLocation] = useState([]);
  // const [projectPhoto, setProjectPhoto] = useState(null);
  const [file, setFile] = useState();
  const [fileName, setFileName] = useState("");
  const [contactNo, setContactNo] = useState('');
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [fundgoalamount, setFundGoalAmount] = useState('');
  const [errors, setErrors] = useState({});
  const [staffOptions, setStaffOptions] = useState([]);
  const [selectedStaffs, setSelectedStaffs] = useState([]);
  const [skills, setSkills] = useState([]);
  const [interests, setInterests] = useState([]);
  const navigate = useNavigate();

  const saveFile = (e) => {
    setFile(e.target.files[0]);
    setFileName(e.target.files[0].name);
  };

  useEffect(() => {
    fetchStaffOptions();
  }, []);

  const fetchStaffOptions = () => {
    axios.get('/api/staffs')
      .then(response => {
        setStaffOptions(response.data);
      })
      .catch(error => {
        console.error('Error retrieving staff options:', error);
        // Handle the error appropriately
      });
  };

  const validateForm = () => {
    const errors = {};

    if (!isValidContactNo(contactNo)) {
      errors.contactNo = 'Invalid contact number format';
    }

    setErrors(errors);

    return Object.keys(errors).length === 0;
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
  
    // Create a FormData object
    const formData = new FormData();
    formData.append("file", file);
    formData.append("fileName", fileName);
    console.log(formData);
    // alert(formData);
  
    if (validateForm()) {
      // Form validation successful, proceed with submission
      formData.append("projectname", projectname);
      formData.append("projectdescription", projectdescription);
      // formData.append("sdg", sdg);
      formData.append("sdg", JSON.stringify(sdg));
      // formData.append("location", location);
      formData.append("location", JSON.stringify(location));
      formData.append("contactNo", contactNo);
      formData.append("startDate", startDate);
      formData.append("endDate", endDate);
  
      // Remove commas and currency symbol from fundgoalamount
      const strippedGoalAmount = fundgoalamount.replace(/[^\d.]/g, '');
      const goalAmount = parseFloat(strippedGoalAmount);
      formData.append("fundgoalamount", goalAmount);
  
      formData.append("selectedStaffs", JSON.stringify(selectedStaffs));
      formData.append("skills", JSON.stringify(skills));
      formData.append("interests", JSON.stringify(interests));
  
      axios
        .post('/submit-createProject', formData, {
          headers: {
            'Content-Type': 'multipart/form-data' // Set the appropriate Content-Type header
          }
        }) // Submit the form data
        .then((response) => {
          // Handle the response from the server
          console.log(response.data);
          // Reset the form fields if needed
          setProjectName('');
          setProjectDescription('');
          setSDG([]);
          setLocation('');
          // setProjectPhoto(null);
          setFile(null);
          setContactNo('');
          setStartDate(null);
          setEndDate(null);
          setFundGoalAmount('');
          setSelectedStaffs([]);
          setSkills([]);
          setInterests([]);
          setErrors({});
          navigate('/ManageProjects');
          // alert("Appointment Successful");
        })
        .catch((error) => {
          // Handle error checking email
          console.error(error);
        });
    }
  };
  
  

  // ---------- Location ----------------

  // Callback function for Places Autocomplete
  const handlePlaceSelect = (place) => {
    setLocation(place.formatted_address);
  };

  // Initialize Places Autocomplete
  // useEffect(() => {
  //   const script = document.createElement('script');
  //   script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyA0Bt-wuO6YhzMV5lVuGSrsGg-RxDyEKII&libraries=places&callback=initAutocomplete`;
  //   script.async = true;
  //   script.defer = true;
  //   window.initAutocomplete = () => {
  //     const autocomplete = new window.google.maps.places.Autocomplete(
  //       document.getElementById('location')
  //     );
  //     autocomplete.addListener('place_changed', () => {
  //       handlePlaceSelect(autocomplete.getPlace());
  //     });
  //   };
  //   document.body.appendChild(script);

  //   return () => {
  //     document.body.removeChild(script);
  //   };
  // }, []);

   // ---------- Location ----------------


  const isValidContactNo = (contactNo) => {
    return isValidPhoneNumber(contactNo);
  };

  const handleContactNoChange = (value) => {
    setContactNo(value);
  };

  const handleSDGChange = (selectedOptions) => {
    const selectedSDG = selectedOptions.map((option) => option.value);
    setSDG(selectedSDG);
  };

  const handleLocationChange = (selectedOptions) => {
    const selectedLocation = selectedOptions.map((option) => option.value);
    setLocation(selectedLocation);
  };

  // const handleSkillsChange = (selectedOptions) => {
  //   const selectedSkills = selectedOptions.map((option) => option.value);
  //   setSkills(selectedSkills);
  // };

  const handleSkillsChange = (selectedOptions, actionMeta) => {
    const selectedSkills = selectedOptions.map((option) => option.value);
  
    // Check if the custom option is being created or removed
    const isCreatingCustomOption =
      actionMeta.action === 'create-option' && actionMeta.option.value;
    const isRemovingCustomOption =
      actionMeta.action === 'remove-value' &&
      actionMeta.removedValue &&
      actionMeta.removedValue.__isNew__;
  
    // If the custom option is being created, add it to the selected skills
    if (isCreatingCustomOption) {
      selectedSkills.push(actionMeta.option.value);
    }
  
    // If the custom option is being removed, exclude it from the selected skills
    if (isRemovingCustomOption) {
      const removedCustomOption = actionMeta.removedValue.value;
      const updatedSelectedSkills = selectedSkills.filter(
        (skill) => skill !== removedCustomOption
      );
      setSkills(updatedSelectedSkills);
    } else {
      setSkills(selectedSkills);
    }
  
    // Check if the custom option is being created or removed for multiple selection
    const isCreatingMultipleCustomOptions =
      actionMeta.action === 'create-option' && Array.isArray(actionMeta.option);
    const isRemovingMultipleCustomOptions =
      actionMeta.action === 'remove-value' &&
      Array.isArray(actionMeta.removedValue) &&
      actionMeta.removedValue.some((value) => value.__isNew__);
  
    // If multiple custom options are being created, add them to the selected skills
    if (isCreatingMultipleCustomOptions) {
      const newCustomOptions = actionMeta.option.map((option) => option.value);
      setSkills([...selectedSkills, ...newCustomOptions]);
    }
  
    // If multiple custom options are being removed, exclude them from the selected skills
    if (isRemovingMultipleCustomOptions) {
      const removedCustomOptions = actionMeta.removedValue
        .filter((value) => value.__isNew__)
        .map((value) => value.value);
      const updatedSelectedSkills = selectedSkills.filter(
        (skill) => !removedCustomOptions.includes(skill)
      );
      setSkills(updatedSelectedSkills);
    }
  };
  
  
  

  const handleCustomSkillInputChange = (inputValue) => {
    // Custom input value handling logic
    console.log('Custom Skill Input:', inputValue);
  };

  const customSkillOption = { value: 'custom', label: 'Custom Skill' };

  const formatCreateLabel = (inputValue) => `Add custom skill "${inputValue}"`;

  const handleSkillsCreateOption = (inputValue) => {
    const newOption = { value: inputValue.toLowerCase(), label: inputValue };
    setSkills((prevSkills) => [...prevSkills, newOption.value]);
  };

  const handleInterestsChange = (selectedOptions) => {
    const selectedInterests = selectedOptions.map((option) => option.value);
    setInterests(selectedInterests);
  };

  const handleStaffsChange = selectedOptions => {
    setSelectedStaffs(selectedOptions);
  };

  // const handleProjectPhotoUpload = (event) => {
  //   setProjectPhoto(event.target.files[0]);
  // };

  

  return (
    <>
      <SideBarTest />
      <div className="main-container">
        {/* <AdminSidebar /> */}
        <div className="content-container">
          <div className="volunteer-form">
            <h2>Create Project</h2>
            <form onSubmit={handleFormSubmit}>

              <label htmlFor="projectname">Project Name</label>
              <input
                type="text"
                id="projectname"
                value={projectname}
                onChange={(e) => setProjectName(e.target.value)}
                required
              />

              <label> Project Description</label>
              <textarea
                name="projectdescription"
                value={projectdescription}
                onChange={(e) => setProjectDescription(e.target.value)}
                placeholder="Type project Description Here!"
                rows={10}
                cols={40}
                required
              />

              <label htmlFor="sdgPreferance">Sustainable Development Goal</label>
              <Select
                id="sdgPreferance"
                options={sdgOptions}
                value={sdgOptions.filter((option) => sdg.includes(option.value))}
                onChange={handleSDGChange}
                isMulti
                placeholder="Select Donation Preferences"
                required
              />

              <br />

              <label htmlFor="location">Location</label>
              {/* <input
                type="text"
                id="location"
                value={location}
                isMulti
                onChange={(e) => setLocation(e.target.value)}
                required
              /> */}
              <Select
                id="location"
                options={locationOptions}
                value={locationOptions.filter((option) => location.includes(option.value))}
                onChange={handleLocationChange}
                isMulti
                placeholder="Select Donation Preferences"
                required
              />

              <label htmlFor="startDate">Start Date</label>
              <DatePicker
                id="startDate"
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                dateFormat="dd/MM/yyyy"
              />

              <label htmlFor="endDate">End Date</label>
              <DatePicker
                id="endDate"
                selected={endDate}
                onChange={(date) => setEndDate(date)}
                dateFormat="dd/MM/yyyy"
              />

            <label htmlFor="projectPhoto">Upload Project Cover Photo</label>
            <input
              type="file"
              id="projectPhoto"
              onChange={saveFile}
            />

              <br />

              <label htmlFor="contactNo">Contact No</label>
              <PhoneInput
                type="text"
                id="contactNo"
                defaultCountry="LK"
                value={contactNo}
                onChange={handleContactNoChange}
                required
              />
              {errors.contactNo && <p className="error">{errors.contactNo}</p>}

              <label htmlFor="fundgoalamount">Fund Goal Amount</label>
              <CurrencyInput
                suffix="LKR"
                id="fundgoalamount"
                value={fundgoalamount}
                onChangeEvent={(e, maskedValue, floatValue) => setFundGoalAmount(maskedValue)}
                required
              />

              <label htmlFor="assignstaff">Staff</label>
              <Select
                id="assignstaff"
                options={staffOptions}
                value={selectedStaffs}
                onChange={handleStaffsChange}
                isMulti
                placeholder="Select Staff to Assign"
              />

              <label htmlFor="skills">Required Skills</label>

              <Select
                id="skills"
                options={options}
                value={options.filter((option) => skills.includes(option.value))}
                onChange={handleSkillsChange}
                isMulti
                placeholder="Select skills"
                onCreateOption={handleSkillsCreateOption}
                formatCreateLabel={formatCreateLabel}
                isValidNewOption={(inputValue) => inputValue.trim().length > 0}
                allowCreateWhileLoading={false}
                isOptionSelected={(option) => skills.includes(option.value)}
                getOptionLabel={(option) => option.label}
                getOptionValue={(option) => option.value}
                getNewOptionData={(inputValue) => ({
                  value: inputValue.toLowerCase(),
                  label: inputValue.trim(),
                })}
                components={{
                  DropdownIndicator: null,
                  IndicatorSeparator: null,
                }}
                styles={{
                  menu: (provided) => ({ ...provided, zIndex: 9999 }),
                }}
                formatOptionLabel={({ value, label }) => (
                  <div>
                    {value === 'custom' ? (
                      <input
                        type="text"
                        onChange={(e) => handleCustomSkillInputChange(e.target.value)}
                        placeholder="Enter custom skill"
                      />
                    ) : (
                      <span>{label}</span>
                    )}
                  </div>
                )}
              />

              <label htmlFor="interests">Required Interests</label>
              <Select
                id="interests"
                options={interestOptions}
                value={interestOptions.filter((option) => interests.includes(option.value))}
                onChange={handleInterestsChange}
                isMulti
                placeholder="Select interests"
              />

              <br />
              <button type="submit">Submit</button>

              
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default CreateProject;
