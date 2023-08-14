import React, { useState } from 'react';
import './VolunteerRegistrationForm.css';
import axios from 'axios';
import 'react-phone-number-input/style.css';
import PhoneInput from 'react-phone-number-input';
import { isValidPhoneNumber } from 'react-phone-number-input';
import HeaderTemp from './HeaderTemp';
import NavBarTest from './NavBarTest';
import Footer from './Footer';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import 'react-clock/dist/Clock.css';
import { TimePicker } from 'react-ios-time-picker';

// import Login from './Login';

const RequestVisitingAppointment = () => {
    const [fullname, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [contactNo, setContactNo] = useState('');
    const [doa, setDate] = useState(null);  
    const [toa, setTime] = useState(null);  
    const [purpose, setPurpose] = useState('');
    const [errors, setErrors] = useState({});
    const [notification, setNotification] = useState('');
    // const navigate = useNavigate();

  const validateForm = () => {
    const errors = {};

    if (!isValidFullName(fullname)) {
        errors.fullname = 'Invalid Full Name format';
    }

    if (!isValidEmail(email)) {
      errors.email = 'Invalid email format';
    }

    if (!isValidContactNo(contactNo)) {
      errors.contactNo = 'Invalid contact number format';
    }

    setErrors(errors);

    return Object.keys(errors).length === 0;
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {
      // Form validation successful, proceed with submission
      const data = {
        fullname,
        email,
        contactNo,
        doa,
        toa,
        purpose,
      };

        axios
        .post('/submit-visitingAppointment', data) // Submit the form data
        .then((response) => {
        // Handle the response from the server
        console.log(response.data);
        
        // Reset the form fields if needed
        setFullName('');
        setEmail('');
        setContactNo('');
        setDate(null);
        setTime(null);
        setPurpose('');
        setErrors({});
        setNotification('Thank You for Contacting Us!');
        // alert("Appointment Successful");       
        })
    
        .catch((error) => {
          // Handle error checking email
          console.error(error);
        });
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
    return isValidPhoneNumber(contactNo);
  };

  const handleContactNoChange = (value) => {
    setContactNo(value);
  };

  // Function to handle selecting a date and disable previous dates
  const handleDateChange = (date) => {
    // Check if the selected date is not in the past (i.e., today or future date)
    if (date >= new Date()) {
      setDate(date);
    }
  };
  
  return (
    <div>
      <HeaderTemp />
      <NavBarTest />
      <div className="volunteer-form">
        <h2>Request Visiting Appointment</h2>
        <center> {notification && <p>{notification}</p>} </center>

        <form onSubmit={handleFormSubmit}>

          <label htmlFor="fullname">Fullname</label>
          <input
            type="text"
            id="fullname"
            value={fullname}
            onChange={(e) => setFullName(e.target.value)}
            required
          />
          {errors.fullname&& <p className="error">{errors.fullname}</p>}

          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          {errors.email && <p className="error">{errors.email}</p>}

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


          <label htmlFor="dob">Date of Appointment</label>
          <DatePicker
            id="doa"
            selected={doa}
            onChange={handleDateChange}
            dateFormat="dd/MM/yyyy"
            minDate={new Date()} // Disable previous dates
          />
        
        <label htmlFor="toa">Time of Appointment</label>
          <TimePicker
            id="toa"
            selected={toa}
            onChange={(time) => setTime(time)}
          />
     

        <label> Purpose</label>
        <textarea
        name="purpose"
        value={purpose}
        onChange={(e) => setPurpose(e.target.value)}
        placeholder="Type your Purpose of Visiting Here!"
        rows={4}
        cols={40}
        required
        />

        <br></br>
          <button type="submit">Submit</button>
        </form>
      </div>
      <Footer />
    </div>
  );
};

export default RequestVisitingAppointment;

