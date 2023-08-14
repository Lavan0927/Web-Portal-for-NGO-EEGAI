import React, { useState, useEffect } from 'react';
import './VolunteerRegistrationForm.css';
import { isValidPhoneNumber } from 'react-phone-number-input';
import Select from 'react-select';
import HeaderTemp from './HeaderTemp';
import NavBarTest from './NavBarTest';
import Footer from './Footer';
import axios from 'axios'; // If using axios
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import PhoneInput from 'react-phone-number-input';
import emailjs from 'emailjs-com';
import { PDFDownloadLink, PDFViewer, Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

import {
  MDBCard,
  MDBCardHeader,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBCardFooter,
  MDBBtn
} from 'mdb-react-ui-kit';

const donationOptions = [
  { value: 'NGO', label: 'NGO' },
  { value: 'Project', label: 'Project' },
  { value: 'Activity', label: 'Activity' },
];


const DonateTest = () => {
  const [fullname, setFullname] = useState('');
  const [nicNo, setNicNo] = useState('');
  const [donorAddress, setDonorAddress] = useState('');
  const [email, setEmail] = useState('');
  const [contactNo, setContactNo] = useState('');
  const [donationFor, setDonationFor] = useState('');
  const [donationMethod, setPaymentOption] = useState('');
  const [projectOptions, setProject] = useState([]);
  const [selectedProjects, setSelectedProjects] = useState(null);
  const [activityOptions, setActivity] = useState([]);
  const [selectedActivities, setSelectedActivities] = useState(null);
  const [donationAmount, setDonationAmount] = useState('');
  const [errors, setErrors] = useState({});
  const [showCardMessage, setShowCardMessage] = useState(false);
  const [pdfContent, setPdfContent] = useState(null);

  useEffect(() => {
    fetchProjectOptions();
  }, []);

  const fetchProjectOptions = () => {

    axios.get('/api/projects')
    
      .then(response => {
        setProject(response.data);
        // alert("Hello Project");
      })
      .catch(error => {
        console.error('Error retrieving staff options:', error);
        // Handle the error appropriately
      });
  };

  useEffect(() => {
    fetchEventOptions();
  }, []);

  const fetchEventOptions = () => {

    axios.get('/api/activities')
    
      .then(response => {
        setActivity(response.data);
        // alert("Hello Event");
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
      donationMethod,
      selectedProjects,
      selectedActivities,
      donationAmount,
    };

    // Send a POST request to the server
    axios
      .post('/submit-donationform', data)
      .then((response) => {
        // Handle the response from the server
        console.log(response.data);

        // Send email notification to the donation provider
        const params = {
          to_email: email, // Set the donation provider's email address as the recipient
          to_name: fullname, // Set the donation provider's name
          // Add more parameters if needed for your email template
        };

        // Replace 'YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', and 'YOUR_USER_ID' with actual values from your emailjs account
        emailjs.send('service_u7koxwf', 'template_mybv35r', params, 'BRRx_fXPneuskBonH')
        .then((result) => {
          console.log(result.text);
          // Handle the email sending success if needed
        })

        .catch((error) => {
          console.log(error.text);
          // Handle the email sending error if needed
        });

        // Generate the PDF receipt content
        const receiptData = {
          fullname,
          nicNo,
          donorAddress,
          email,
          contactNo,
          donationFor,
          donationMethod,
          selectedProjects,
          selectedActivities,
          donationAmount,
        };

        const generatePDFContent = () => (
          <Document>
            <Page style={styles.page}>
              <View>
                <Text style={styles.heading}>Donation Receipt</Text>
                <Text>Name: {receiptData.fullname}</Text>
                <Text>NIC No: {receiptData.donorAddress}</Text>
                <Text>Donation For: {receiptData.donationFor}</Text>
                <Text>Donation Method: {receiptData.donationMethod}</Text>
                <Text>Donation Amount: {receiptData.donationAmount}</Text>

                {/* Add other receipt details here */}
              </View>
            </Page>
          </Document>
        );

        setPdfContent(generatePDFContent());
        setShowCardMessage(true);

        // Reset the form fields if needed
        setFullname('');
        setNicNo('');
        setDonorAddress('');
        setEmail('');
        setContactNo('');
        setDonationFor('');
        setPaymentOption('');
        setProject('');
        setActivity('');
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

  const handleProjectChange = selectedOptions => {
    setSelectedProjects(selectedOptions);
  };

  const handleActivityChange = (selectedOption) => {
    setSelectedActivities(selectedOption);
  };

  const handlePaymentOptionChange = (event) => {
    setPaymentOption(event.target.value);
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
      <NavBarTest />
    <div className="volunteer-form">
      <h2>Make Donation</h2>
      <form onSubmit={handleFormSubmit} >
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

            <label htmlFor="project">Project</label>
              <Select
                id="project"
                options={projectOptions}
                value={selectedProjects}
                onChange={handleProjectChange}
                placeholder="Select Project"
              />

          </>
        )}

        {donationFor === 'Activity' && (
          <>

            <label htmlFor="activity">Activity</label>
              <Select
                id="activity"
                options={activityOptions}
                value={selectedActivities}
                onChange={handleActivityChange}
                placeholder="Select Activity"
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

        <div class="col-lg-12 col-12">
          <h5 class="mt-4 pt-1">Choose Payment</h5>
        </div>

        <div className="col-lg-12 col-12 mt-2">
        <div className="form-check">
          <input
            className="form-check-input"
            type="radio"
            name="DonationPayment"
            id="flexRadioDefault9"
            value="debit-credit-card"
            onChange={handlePaymentOptionChange}
          />
          <label className="form-check-label" htmlFor="flexRadioDefault9">
            <i className="bi-credit-card custom-icon ms-1"></i>
            Debit or Credit card
          </label>
        </div>

        <div className="form-check">
          <input
            className="form-check-input"
            type="radio"
            name="DonationPayment"
            id="flexRadioDefault10"
            value="paypal"
            onChange={handlePaymentOptionChange}
          />
          <label className="form-check-label" htmlFor="flexRadioDefault10">
            <i className="bi-paypal custom-icon ms-1"></i>
            Paypal
          </label>
        </div>

        <button type="submit">Submit</button>

        {/* <input type="hidden" name="hosted_button_id" value="B8DSQYT5MTYQE" />
        <input type="image" src="https://www.paypalobjects.com/en_US/i/btn/btn_donateCC_LG.gif" border="0" name="submit" title="PayPal - The safer, easier way to pay online!" alt="Donate with PayPal button" />
        <img alt="" border="0" src="https://www.paypal.com/en_LK/i/scr/pixel.gif" width="1" height="1" /> */}

        </div>
      </form>
    </div>
      
      {showCardMessage && (
        <center>
          <MDBCard alignment='center' style={{ width: '500px', position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', zIndex: 9999 }}>
            {/* <MDBCardHeader>Thank you for the donation!</MDBCardHeader> */}
            <MDBCardBody>
              <MDBCardTitle>Thank you for the donation!</MDBCardTitle>
              <MDBCardText>With supporting text below as a natural lead-in to additional content.</MDBCardText>
              <div className="button-container">
                  {pdfContent && (
                    <PDFDownloadLink document={pdfContent} fileName="donation_receipt.pdf">
                      {({ blob, url, loading, error }) =>
                        loading ? 'Generating PDF...' : 'Download Receipt'
                      }
                    </PDFDownloadLink>
                  )} 
                </div>
            </MDBCardBody>
            <MDBCardFooter>  <MDBBtn onClick={() => setShowCardMessage(false)}>Close</MDBBtn>
            </MDBCardFooter>
          </MDBCard>
        </center>
      )}

      <br></br>
    

    <Footer />

    </div>
  );
};

const styles = {
  // Add CSS styles here for the floating effect
  // For example:
  cardMessageContainer: {
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    zIndex: 9999,
  },
  cardMessage: {
    background: 'white',
    padding: '20px',
    boxShadow: '0 2px 6px rgba(0, 0, 0, 0.2)',
    borderRadius: '4px',
  },
};


export default DonateTest;
