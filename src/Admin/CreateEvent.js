import React, { useEffect, useState } from "react";
import axios from 'axios';
import Select from 'react-select';
import 'react-phone-number-input/style.css';
import PhoneInput from 'react-phone-number-input';
import { isValidPhoneNumber } from 'react-phone-number-input';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import 'react-clock/dist/Clock.css';
// import CurrencyInput from 'react-currency-input';
import SideBarTest from "./SideBarTest";
import { TimePicker } from 'react-ios-time-picker';
import "./VolunteerRegistrationForm.css";
import "./ManageUsers.css";
import { useNavigate } from "react-router-dom";

// const sdgOptions = [
//   { value: 'Educate a child', label: 'Educate a child' },
//   { value: 'Help the needy', label: 'Help the needy' },
//   { value: 'Good health and well-being', label: 'Good health and well-being' },
//   { value: 'Respect for senior citizens', label: 'Respect for senior citizens' },
//   { value: 'Peace and social cohesion', label: 'Peace and social cohesion' },
//   { value: 'creating awareness', label: 'creating awareness' },
//   { value: 'Habitat for humanity', label: 'Habitat for humanity' },
//   // Add more options for interests as needed
// ];

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

function CreateEvent() {
  const [eventname, setEventName] = useState('');
  const [eventdescription, setEventDescription] = useState('');
  // const [sdg, setSDG] = useState([]);
  const [location, setLocation] = useState('');
  const [file, setFile] = useState();
  const [fileName, setFileName] = useState("");
  const [contactNo, setContactNo] = useState('');
  const [eventDate, setEventDate] = useState(null);
  const [startTime, setStartTime] = useState(null);  
  const [endTime, setEndTime] = useState(null); 
  // const [fundgoalamount, setFundGoalAmount] = useState('');
  const [errors, setErrors] = useState({});
  const [staffOptions, setStaffOptions] = useState([]);
  const [selectedStaffs, setSelectedStaffs] = useState([]);
  const [skills, setSkills] = useState([]);
  const [activityOptions, setActivity] = useState([]);
  const [selectedActivities, setSelectedActivities] = useState(null);
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

  useEffect(() => {
    fetchActivityOptions();
  }, []);

  const fetchActivityOptions = () => {
    axios.get('/api/activities')
      .then(response => {
        setActivity(response.data);
      })
      .catch(error => {
        console.error('Error retrieving activity options:', error);
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
    alert(formData);
  
    if (validateForm()) {
      // Form validation successful, proceed with submission
      formData.append("eventname", eventname);
      formData.append("eventdescription", eventdescription);
      // formData.append("sdg", sdg);
      formData.append("location", location);
      formData.append("selectedActivities", JSON.stringify(selectedActivities));
      formData.append("contactNo", contactNo);
      formData.append("eventDate", eventDate);
      formData.append("startTime", startTime);
      formData.append("endTime", endTime);
  
      // // Remove commas and currency symbol from fundgoalamount
      // const strippedGoalAmount = fundgoalamount.replace(/[^\d.]/g, '');
      // const goalAmount = parseFloat(strippedGoalAmount);
      // formData.append("fundgoalamount", goalAmount);
  
      formData.append("selectedStaffs", JSON.stringify(selectedStaffs));
      formData.append("skills", JSON.stringify(skills));
      formData.append("interests", JSON.stringify(interests));
  
      axios
        .post('/submit-createEvent', formData, {
          headers: {
            'Content-Type': 'multipart/form-data' // Set the appropriate Content-Type header
          }
        }) // Submit the form data
        .then((response) => {
          // Handle the response from the server
          console.log(response.data);
          // Reset the form fields if needed
          setEventName('');
          setEventDescription('');
          // setSDG([]);
          setLocation('');
          // setProjectPhoto(null);
          setFile(null);
          setContactNo('');
          setEventDate(null);
          setStartTime(null);
          setEndTime(null);
          // setFundGoalAmount('');
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

  // // Callback function for Places Autocomplete
  // const handlePlaceSelect = (place) => {
  //   setLocation(place.formatted_address);
  // };

  // // Initialize Places Autocomplete
  // useEffect(() => {
  //   const script = document.createElement('script');
  //   script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyAw-fUKtOjHAbvuJ0ebXK1ygNEZjrw5ENs&libraries=places&callback=initAutocomplete`;
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

  // const handleSDGChange = (selectedOptions) => {
  //   const selectedSDG = selectedOptions.map((option) => option.value);
  //   setSDG(selectedSDG);
  // };

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

  const handleActivityChange = selectedOptions => {
    setSelectedActivities(selectedOptions);
  };

  

  return (
    <>
    <SideBarTest />
      <div className="main-container">
        
        <div className="content-container">
          <div className="volunteer-form">
            <h2>Create Event for Activities</h2>
            <form onSubmit={handleFormSubmit}>

            <label htmlFor="activity">Activity</label>
              <Select
                id="activity"
                options={activityOptions}
                value={selectedActivities}
                onChange={handleActivityChange}
                placeholder="Select Project"
              />


              <label htmlFor="eventname">Event Name</label>
              <input
                type="text"
                id="eventname"
                value={eventname}
                onChange={(e) => setEventName(e.target.value)}
                required
              />

              <label>Event Description</label>
              <textarea
                name="eventdescription"
                value={eventdescription}
                onChange={(e) => setEventDescription(e.target.value)}
                placeholder="Type event Description Here!"
                rows={10}
                cols={40}
                required
              />

              {/* <label htmlFor="sdgPreferance">Sustainable Development Goal</label>
              <Select
                id="sdgPreferance"
                options={sdgOptions}
                value={sdgOptions.filter((option) => sdg.includes(option.value))}
                onChange={handleSDGChange}
                isMulti
                placeholder="Select Donation Preferences"
                required
              /> */}

              <br />

              <label htmlFor="location">Location</label>
              <input
                type="text"
                id="location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                required
              />

              <label htmlFor="startDate">Event Date</label>
              <DatePicker
                id="eventDate"
                selected={eventDate}
                onChange={(date) => setEventDate(date)}
                dateFormat="dd/MM/yyyy"
              />

            <label htmlFor="toa">Start Time</label>
            <TimePicker
              id="startTime"
              selected={startTime}
              onChange={(time) => setStartTime(time)}
            />

            <label htmlFor="endTime">End Time</label>
            <TimePicker
              id="endTime"
              selected={endTime}
              onChange={(time) => setEndTime(time)}
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

              {/* <label htmlFor="fundgoalamount">Fund Goal Amount</label>
              <CurrencyInput
                suffix="LKR"
                id="fundgoalamount"
                value={fundgoalamount}
                onChangeEvent={(e, maskedValue, floatValue) => setFundGoalAmount(maskedValue)}
                required
              /> */}

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

export default CreateEvent;
