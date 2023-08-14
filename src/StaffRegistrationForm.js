import React, { useState } from 'react';
import './VolunteerRegistrationForm.css';
import Select from 'react-select';
import axios from 'axios'; // If using axios
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'
import { isValidPhoneNumber } from 'react-phone-number-input';
import HeaderTemp from './HeaderTemp';
import NavBarTest from './NavBarTest';
import Footer from './Footer';

const designationOptions = [
  { value: 'designation1', label: 'Designation 1' },
  { value: 'designation2', label: 'Designation 2' },
  { value: 'designation3', label: 'Designation 3' },
  // Add more options for designation as needed
];

const StaffRegistrationForm = () => {
  const [username, setUsername] = useState('');
  const [fullname, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [contactNo, setContactNo] = useState('');
  const [designation, setDesignation] = useState(null);
  const [role, setUserType] = useState('');
  const [secretKey, setSecretKey] = useState('');
  const [errors, setErrors] = useState({});
  const [isUsernameTaken, setIsUsernameTaken] = useState(false);

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
  
      // Username validation
  if (username.trim() === '') {
    errors.username = 'Username is required';
  } else if (username.length < 3) {
    errors.username = 'Username should be at least 3 characters';
  } else if (!/^[A-Za-z][A-Za-z0-9_]{7,29}$/.test(username)) {
    errors.username = 'Invalid username format. Username should start with an alphabet and can contain alphabets, numbers, or an underscore. Length should be 8-30 characters.';
  }


  if (!isValidFullName(fullname)) {
    errors.fullname = 'Invalid Full Name format';
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
    
    if (role === "admin" && secretKey !== "Sapthe") {
      // alert("Invalid Admin");
    } else {
      // alert("valid Admin");
      if (validateForm()) {
        const data = {
          username,
          fullname,
          email,
          password,
          contactNo,
          designation: designation ? designation.value : null,
          role,
        };
        // alert("data");
        
        // Check if the email is already registered
        axios.post('/api/checkEmail', { email })
          .then((response) => {
            if (response.data.isRegistered) {
              setErrors({ email: 'This email is already registered' });
            } else {
              // Email is not registered, proceed with username availability check
              axios.post('/api/checkUsername', { username })
                .then((response) => {
                  if (response.data.isTaken) {
                    setErrors({ username: 'This username is already taken' });
                  } else {
                    // alert("form submission");
                    // Username is available, proceed with form submission
                    axios.post('/submit-staffform', data)
                      .then((response) => {
                        // Handle the response from the server
                        console.log(response.data);
                        // Reset the form fields if needed
                        setUsername('');
                        setFullName('');
                        setEmail('');
                        setPassword('');
                        setContactNo('');
                        setDesignation(null);
                        setErrors({});
                        // alert("Registration Successful");
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
    }
  };
  

  // Validation helper functions
  const isValidFullName = (fullname) => {
    const fullNameRegex = /^[a-zA-Z]+ [a-zA-Z]+$/;
    return fullNameRegex.test(fullname);
  };


  // Validation helper functions
  const isValidEmail = (email) => {
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    return emailRegex.test(email);
  };
  
  const isValidContactNo = (contactNo) => {
    //const contactNoRegex = /^(?:0|94|\+94|0094)?(?:(11|21|23|24|25|26|27|31|32|33|34|35|36|37|38|41|45|47|51|52|54|55|57|63|65|66|67|81|91)(0|2|3|4|5|7|9)|7(0|1|2|4|5|6|7|8)\d)\d{6}$`/;
    //return contactNoRegex.test(contactNo);
    return isValidPhoneNumber(contactNo);
  };

  const handleDesignationChange = (selectedOption) => {
    setDesignation(selectedOption);
  };

  const handleContactNoChange = (value) => {
    setContactNo(value);
  };

  const handleClick = () => {
    window.location.href = '/Login';
  }; 

  return (
    <div>
    <HeaderTemp />
    <NavBarTest />
    <div className="volunteer-form">
      <h2>Staff Registration</h2>
      <center>
        <h6>Already Registered? <span onClick={handleClick} style={{ cursor: 'pointer' }}>Login</span></h6>
      </center>
      <form onSubmit={handleFormSubmit}>
        <div style={{ marginBottom: '10px' }}>
          Register As
          <input
            type="radio"
            name="UserType"
            value="staff"
            onChange={(e) => setUserType(e.target.value)}
            style={{ marginLeft: '10px', marginRight: '5px' }}
          />
          Staff
          <input
            type="radio"
            name="UserType"
            value="admin"
            onChange={(e) => setUserType(e.target.value)}
            style={{ marginLeft: '10px', marginRight: '5px' }}
          />
          Admin
        </div>
        {role === 'admin' ? (
          <div>
            <label htmlFor="secretkey">Secret Key</label>
            <input
              type="password"
              id="secretkey"
              className="form-control"
              placeholder="Secret Key"
              onChange={(e) => setSecretKey(e.target.value)}
            />
          </div>
        ) : null}

        <label htmlFor="username">Username</label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          onBlur={checkUsernameAvailability}
          required
        />
        {errors.username && <span className="error">{errors.username}</span>}
        {isUsernameTaken && <p className="error">This username is already taken</p>}

        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        {errors.email && <span className="error">{errors.email}</span>}

        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        {errors.password && <span className="error">{errors.password}</span>}
        
        {role === 'staff' ? (
          <div>
            <label htmlFor="fullname">Full Name</label>
            <br></br>
            <input type="text" id="fullname" value={fullname} onChange={(e) => setFullName(e.target.value)} required style={{width:'460px'}}/>
            {errors.fullname && <span className="error">{errors.fullname}</span>}

            <br></br>
            <label htmlFor="contactNo">Contact No</label>
            <br></br>
            <PhoneInput
              type="text"
              id="contactNo"
              defaultCountry="LK"
              value={contactNo}
              onChange={handleContactNoChange}
              required
            />
            {errors.contactNo && <span className="error">{errors.contactNo}</span>}

            {/* <br></br> */}
            <label htmlFor="designation">Designation</label>
            <Select
              id="designation"
              options={designationOptions}
              value={designation}
              onChange={handleDesignationChange}
              placeholder="Select Designation"
              required
            />
          </div>
        ) : null}
        <br></br>

        <button type="submit">Submit</button>
      </form>
    </div>
    <Footer />
    </div>
  );
};

export default StaffRegistrationForm;
