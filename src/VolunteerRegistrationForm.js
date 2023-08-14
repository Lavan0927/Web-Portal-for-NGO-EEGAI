import React, { useState } from 'react';
import './VolunteerRegistrationForm.css';
import Select from 'react-select';
import axios from 'axios';
import 'react-phone-number-input/style.css';
import PhoneInput from 'react-phone-number-input';
import { isValidPhoneNumber } from 'react-phone-number-input';
import HeaderTemp from './HeaderTemp';
import NavBarTest from './NavBarTest';
import Footer from './Footer';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from "react-router-dom";
// import Login from './Login';

const options = [
  { value: 'skill1', label: 'Skill 1' },
  { value: 'skill2', label: 'Skill 2' },
  { value: 'skill3', label: 'Skill 3' },
  // Add more options for skills as needed
];

const interestOptions = [
  { value: 'interest1', label: 'Interest 1' },
  { value: 'interest2', label: 'Interest 2' },
  { value: 'interest3', label: 'Interest 3' },
  // Add more options for interests as needed
];

const VolunteerRegistrationForm = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [dob, setDob] = useState(null);  
  const [contactNo, setContactNo] = useState('');
  const [location, setLocation] = useState('');
  const [skills, setSkills] = useState([]);
  const [interests, setInterests] = useState([]);
  const [cvFile, setCVFile] = useState(null);
  const [cvFilename, setCVFilename] = useState('');
  const [file, setFile] = useState();
  const [fileName, setFileName] = useState("");
  const [errors, setErrors] = useState({});
  const [isUsernameTaken, setIsUsernameTaken] = useState(false);
  const navigate = useNavigate();

  const saveFile = (e) => {
    setFile(e.target.files[0]);
    setFileName(e.target.files[0].name);
  };

  const checkUsernameAvailability = () => {
    if (username.trim() === '') {
      return;
    }

    axios
      .post('/api/checkUsername', { username })
      .then((response) => {
        setIsUsernameTaken(response.data.isTaken);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const validateForm = () => {
    const errors = {};

    if (username.trim() === '') {
      errors.username = 'Username is required';
    } else if (username.length < 3) {
      errors.username = 'Username should be at least 3 characters';
    } else if (!/^[A-Za-z][A-Za-z0-9_]{7,29}$/.test(username)) {
      errors.username = 'Invalid username format. Username should start with an alphabet and can contain alphabets, numbers, or an underscore. Length should be 8-30 characters.';
    }

    if (!isValidEmail(email)) {
      errors.email = 'Invalid email format';
    }

    if (password.length < 6) {
      errors.password = 'Password should be at least 6 characters';
    }

    // Add additional password validation if needed
    if (!/\d/.test(password)) {
      errors.password = 'Password should contain at least one digit';
    }

    if (!/[a-zA-Z]/.test(password)) {
      errors.password = 'Password should contain at least one letter';
    }

    if (!/[!@#$%^&*]/.test(password)) {
      errors.password = 'Password should contain at least one special character (!@#$%^&*)';
    }

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
    formData.append('cvFile', cvFile);
    formData.append("cvFilename", cvFilename);

    if (validateForm()) {
      // Form validation successful, proceed with submission
      formData.append("username", username);
      formData.append("email", email);
      formData.append("password", password);
      formData.append("dob", dob);
      formData.append("location", location);
      formData.append("contactNo", contactNo);  

      formData.append("skills", JSON.stringify(skills));
      formData.append("interests", JSON.stringify(interests));
      console.log(formData);
      // Send a POST request to the server
      axios
        .post('/api/checkEmail', { email }) // Check if email is already registered
        .then((response) => {
          if (response.data.isRegistered) {
            setErrors({ email: 'This email is already registered' });
          } else {
            // Check if the email is already registered
        axios
        .post('/api/checkEmail', { email })
        .then((response) => {
          if (response.data.isRegistered) {
            setErrors({ email: 'This email is already registered' });
          } else {
            // Email is not registered, proceed with username availability check
            // alert("Email Verified");
            axios
              .post('/api/checkUsername', { username })
              .then((response) => {
                if (response.data.isTaken) {
                  setErrors({ username: 'This username is already taken' });
                } else {
                  // alert("Username Verified");
                  // Username is available, proceed with form submission
                  // Send a POST request to the server
                  axios
                  .post('/api/submitForm', formData) // Submit the form data
                  .then((response) => {
                    // Handle the response from the server
                    console.log(response.data);
                    // alert("Response received");
                    // Reset the form fields if needed
                    setUsername('');
                    setEmail('');
                    setPassword('');
                    setDob(null);
                    setContactNo('');
                    setSkills([]);
                    setInterests([]);
                    setErrors({});
                    navigate('/Login');
                  })
    
                    .catch((error) => {
                      // Handle any errors that occur during the request
                      console.error(error);
                    });
                }
              })
              .catch((error) => {
                // Handle error checking username
                console.error(error);
              });
          }
        })
              .catch((error) => {
                // Handle any errors that occur during the request
                console.error(error);
              });
          }
        })
        .catch((error) => {
          // Handle error checking email
          console.error(error);
        });
    }
  };
  
  // Validation helper functions
  const isValidEmail = (email) => {
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    return emailRegex.test(email);
  };
  
  const isValidContactNo = (contactNo) => {
    return isValidPhoneNumber(contactNo);
  };

  const handleSkillsChange = (selectedOptions) => {
    const selectedSkills = selectedOptions.map((option) => option.value);
    setSkills(selectedSkills);
  };

  const handleInterestsChange = (selectedOptions) => {
    const selectedInterests = selectedOptions.map((option) => option.value);
    setInterests(selectedInterests);
  };

  const handleContactNoChange = (value) => {
    setContactNo(value);
  };
  
  const handleClick = () => {
    window.location.href = '/Login';
  }; 

  const handleCVFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setCVFile(file);
      setCVFilename(file.name);
    } else {
      // File not selected, handle the error or show an error message
      console.error('No file selected');
    }
  };
  

  return (
    <div>
      <HeaderTemp />
      <NavBarTest />
      <div className="volunteer-form">
        <h2>Volunteer Registration</h2>
        <center>
        <h6>Already Registered? <span onClick={handleClick} style={{ cursor: 'pointer' }}>Login</span></h6>
        </center>
        <form onSubmit={handleFormSubmit} encType="multipart/form-data">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            onBlur={checkUsernameAvailability}
            required
          />
          {errors.username && <p className="error">{errors.username}</p>}

          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          {errors.email && <p className="error">{errors.email}</p>}
          {isUsernameTaken && <p className="error">This username is already taken</p>}

          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {errors.password && <p className="error">{errors.password}</p>}

          <label htmlFor="dob">DOB</label>
          <DatePicker
            id="dob"
            selected={dob}
            onChange={(date) => setDob(date)}
            dateFormat="dd/MM/yyyy"
          />

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

          <br></br>

          <label htmlFor="profilePhoto">Upload Your Profile Pic</label>
            <input
              type="file"
              id="profilePhoto"
              name="file" 
              onChange={saveFile}
            />

          <br></br>

        <label htmlFor="cv">Upload CV:</label>
          <input type="file" id="cv" name="cvFile" accept=".pdf,.doc,.docx" onChange={handleCVFileChange} />

        <br></br>

          <label htmlFor="location">Home Town</label>
            <input
              type="text"
              id="location"
              value={location}
              isMulti
              onChange={(e) => setLocation(e.target.value)}
              required
            />

          <label htmlFor="skills">Skills</label>
          <Select
            id="skills"
            options={options}
            value={options.filter((option) => skills.includes(option.value))}
            onChange={handleSkillsChange}
            isMulti
            placeholder="Select skills"
          />

          <br></br>

          <label htmlFor="interests">Interests</label>
          <Select
            id="interests"
            options={interestOptions}
            value={interestOptions.filter((option) => interests.includes(option.value))}
            onChange={handleInterestsChange}
            isMulti
            placeholder="Select interests"
          />

          <br></br>

          <button type="submit">Submit</button>
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default VolunteerRegistrationForm;

