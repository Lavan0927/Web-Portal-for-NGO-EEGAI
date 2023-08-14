import React, { useState, useEffect } from 'react';
import './VolunteerRegistrationForm.css';
import { isValidPhoneNumber } from 'react-phone-number-input';
import Select from 'react-select';
import HeaderTemp from './HeaderTemp';
import NavBarTest from './NavBarTest';
import Footer from './Footer';
import axios from 'axios';
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js';
import PhoneInput from 'react-phone-number-input';

// Replace 'YOUR-PAYPAL-CLIENT-ID' with your actual client ID
const PAYPAL_CLIENT_ID = "AZ_6pd9xXLqsXzcpDvucs1qCbr70O0ire9AMULye2U2d8dheJDtT0zTA-vOQyxEUE7cu6V-egmXJPp1X";

const PayPalConfig = {
  "client-id": PAYPAL_CLIENT_ID,
  currency: "USD",
};

// const PayPalOptions = {
//   "disable-funding": "card",
//   "disable-card": "visa,mastercard,amex,discover",
// };

// const PayPalButtonStyles = {
//   layout: "horizontal",
//   shape: "rect",
// };

const donationOptions = [
  { value: 'NGO', label: 'NGO' },
  { value: 'Project', label: 'Project' },
  { value: 'Event', label: 'Event' },
];

// const projectOptions = [
//   { value: 'project1', label: 'Project 1' },
//   { value: 'project2', label: 'Project 2' },
//   { value: 'project3', label: 'Project 3' },
// ];

const eventOptions = [
  { value: 'event1', label: 'Event 1' },
  { value: 'event2', label: 'Event 2' },
  { value: 'event3', label: 'Event 3' },
];

const DonateUs = ({ loggedIn }) => {
  const [fullname, setFullname] = useState('');
  const [nicNo, setNicNo] = useState('');
  const [donorAddress, setDonorAddress] = useState('');
  const [email, setEmail] = useState('');
  const [contactNo, setContactNo] = useState('');
  const [donationFor, setDonationFor] = useState('');
  const [projectOptions, setProject] = useState([]);
  const [selectedProjects, setSelectedProjects] = useState([]);
  const [event, setEvent] = useState('');
  const [donationAmount, setDonationAmount] = useState('');
  const [errors, setErrors] = useState({});

  useEffect(() => {
    fetchProjectOptions();
  }, []);

  const fetchProjectOptions = () => {

    axios.get('/api/projects')
    
      .then(response => {
        setProject(response.data);
        alert("Hello Project");
      })
      .catch(error => {
        console.error('Error retrieving staff options:', error);
        // Handle the error appropriately
      });
  };


  const handleFormSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    if (validateForm()) {
    const data = {
      fullname,
      nicNo,
      donorAddress,
      email,
      contactNo,
      donationFor,
      selectedProjects,
      event,
      donationAmount,
    };

    // Send a POST request to the server
    axios
      .post('/submit-donationform', data)
      .then((response) => {
        // Handle the response from the server
        console.log(response.data);
        // Reset the form fields if needed
        setFullname('');
        setNicNo('');
        setDonorAddress('');
        setEmail('');
        setContactNo('');
        setDonationFor('');
        setProject('');
        setEvent('');
        setDonationAmount('');
      })

      .catch((error) => {
        // Handle any errors that occur during the request
        console.error(error);
      });
    }
  };


  const validateForm = () => {
    const errors = {};
    let isValid = true;

    if (!isValidFullName(fullname)) {
      errors.fullname = 'Invalid Full Name format';
    }

    if (!isValidNIC(nicNo)) {
      errors.nicNo = 'Invalid NIC Number format';
    }


    if (!isValidEmail(email)) {
      errors.email = 'Invalid email format';
    }

    if (!isValidContactNo(contactNo)) {
      errors.contactNo = 'Invalid contact number format';
    }


    setErrors(errors);
    return isValid;
  };

  const handleDonationForChange = (selectedOption) => {
    setDonationFor(selectedOption.value);
  };

  // const handleProjectChange = (selectedOption) => {
  //   setProject(selectedOption.value);
  // };

  const handleEventChange = (selectedOption) => {
    setEvent(selectedOption.value);
  };

  const handleProjectChange = selectedOptions => {
    setSelectedProjects(selectedOptions);
  };


  // Validation helper functions
  const isValidFullName = (fullname) => {
    const fullNameRegex = /^[a-zA-Z]+ [a-zA-Z]+$/;
    return fullNameRegex.test(fullname);
  };

  // Validation helper functions
  const isValidNIC = (nicNo) => {
    const nicNoRegex = /^([0-9]{9}[x|X|v|V]|[0-9]{12})$/m;
    return nicNoRegex.test(nicNo);
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
  

  return (
    <div>
      <HeaderTemp />
      <NavBarTest loggedIn={loggedIn} />
    <div className="volunteer-form">
      <h2>Make Donation</h2>
      <form onSubmit={handleFormSubmit} action="https://www.paypal.com/donate" method="post" >
        <label htmlFor="fullname">Full Name</label>
        <input
          type="text"
          id="fullname"
          value={fullname}
          onChange={(e) => setFullname(e.target.value)}
          required
        />
        {errors.fullname && <span className="error">{errors.fullname}</span>}

        <label htmlFor="nicno">NIC No.</label>
        <input
          type="text"
          id="nicno"
          value={nicNo}
          onChange={(e) => setNicNo(e.target.value)}
          required
        />
        {errors.nicNo && <span className="error">{errors.nicNo}</span>}

        <label htmlFor="donorAddress">Address</label>
        <input
          type="text"
          id="donorAddress"
          value={donorAddress}
          onChange={(e) => setDonorAddress(e.target.value)}
          required
        />
        {errors.donorAddress && <span className="error">{errors.donorAddress}</span>}

        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        {errors.email && <span className="error">{errors.email}</span>}

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

        <label htmlFor="donationFor">Donation For</label>
        <Select
          id="donationFor"
          options={donationOptions}
          value={donationOptions.find((option) => option.value === donationFor)}
          onChange={handleDonationForChange}
          placeholder="Select Donation For"
          required
        />

        {donationFor === 'Project' && (
          <>
{/* 
            <label htmlFor="project">Project</label>
            <Select
              id="project"
              options={projectOptions}
              value={projectOptions.find((option) => option.value === project)}
              onChange={handleProjectChange}
              placeholder="Select Project"
              required
            /> */}

            <label htmlFor="project">Project</label>
              <Select
                id="project"
                options={projectOptions}
                value={selectedProjects}
                onChange={handleProjectChange}
                isMulti
                placeholder="Select Project"
              />


          </>
        )}

        {donationFor === 'Event' && (
          <>
            <label htmlFor="event">Event</label>
            <Select
              id="event"
              options={eventOptions}
              value={eventOptions.find((option) => option.value === event)}
              onChange={handleEventChange}
              placeholder="Select Event"
              required
            />
          </>
        )}

        <label htmlFor="donationAmount">Donation Amount</label>
        <input
          type="text"
          id="donationAmount"
          value={donationAmount}
          onChange={(e) => setDonationAmount(e.target.value)}
          required
        />
        {errors.donationAmount && <span className="error">{errors.donationAmount}</span>}

        <input type="hidden" name="hosted_button_id" value="B8DSQYT5MTYQE" />
        <input type="image" src="https://www.paypalobjects.com/en_US/i/btn/btn_donateCC_LG.gif" border="0" name="submit" title="PayPal - The safer, easier way to pay online!" alt="Donate with PayPal button" />
        <img alt="" border="0" src="https://www.paypal.com/en_LK/i/scr/pixel.gif" width="1" height="1" />
       
      </form>

    </div>
    <Footer />
    </div>
  );
};

export default DonateUs;
