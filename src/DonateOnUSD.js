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
import { useNavigate } from 'react-router-dom';
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

const currencyOptions = [
    { value: 'USD', label: 'USD' },
    { value: 'LKR', label: 'LKR' },
  ];

  // Function to extract rates from the API response
// const extractRatesFromApiResponse = (apiResponse) => {
//     try {
//       const usdToLkrRateRegex = /1 USD = ([\d.]+) LKR/;
//       const usdToLkrMatch = apiResponse.result.match(usdToLkrRateRegex);
//       const usdToLkrRate = parseFloat(usdToLkrMatch[1]);
  
//       const lkrToUsdRateRegex = /1 LKR = ([\d.]+) USD/;
//       const lkrToUsdMatch = apiResponse.result.match(lkrToUsdRateRegex);
//       const lkrToUsdRate = parseFloat(lkrToUsdMatch[1]);
  
//       return {
//         usdToLkrRate,
//         lkrToUsdRate,
//       };
//     } catch (error) {
//       console.error('Error extracting currency conversion rates:', error);
//       return null;
//     }
//   };

  

  
  

const DonateOnUSD = () => {
  const [fullname, setFullname] = useState('');
  const [nicNo, setNicNo] = useState('');
  const [donorAddress, setDonorAddress] = useState('');
  const [email, setEmail] = useState('');
  const [contactNo, setContactNo] = useState('');
  const [donationFor, setDonationFor] = useState('');
  const [currencyType, setCurrencyType] = useState('');
  const [donationMethod, setPaymentOption] = useState('');
  const [projectOptions, setProject] = useState([]);
  const [selectedProjects, setSelectedProjects] = useState(null);
  const [activityOptions, setActivity] = useState([]);
  const [selectedActivities, setSelectedActivities] = useState(null);
  const [donationAmount, setDonationAmount] = useState('');
  const [donationAmountOnUSD, setDonationAmountOnUSD] = useState('');
  const [errors, setErrors] = useState({});
  const [showCardMessage, setShowCardMessage] = useState(false);
  const [pdfContent, setPdfContent] = useState(null);
  const [usdToLkrRate, setUsdToLkrRate] = useState(1);
  const [lkrToUsdRate, setLkrToUsdRate] = useState(1);
  const navigate = useNavigate();

  const extractRatesFromApiResponse = (apiResponse) => {
    try {
      // Create a temporary div element to parse the HTML response
      const tempDiv = document.createElement('div');
      tempDiv.innerHTML = apiResponse;
  
      // Extract the rate for USD to LKR
      const usdToLkrRateRegex = /1 USD = ([\d.]+) LKR/;
      const usdToLkrMatch = tempDiv.textContent.match(usdToLkrRateRegex);
      const usdToLkrRate = parseFloat(usdToLkrMatch[1]);
  
      // Extract the rate for LKR to USD
      const lkrToUsdRateRegex = /1 LKR = ([\d.]+) USD/;
      const lkrToUsdMatch = tempDiv.textContent.match(lkrToUsdRateRegex);
      const lkrToUsdRate = parseFloat(lkrToUsdMatch[1]);
  
      // Return the rates as an object
      return {
        usdToLkrRate,
        lkrToUsdRate,
      };
    } catch (error) {
      console.error('Error extracting currency conversion rates:', error);
      return null;
    }
  };
  
  
//   // Example usage with the provided API response
//   const apiResponse = {
//     result: '<p>1 USD = 318.16291 LKR<br>1 LKR = 0.003143 USD</p></L><p>Your transaction amount of<b>1.00 LKR = 0.01 USD</b> as of 31-Jul-2023, 11:15:19 AM</p>',
//     // Other properties...
//   };
  
//   const currencyRates = extractRatesFromApiResponse(apiResponse);
//   if (currencyRates) {
//     console.log(currencyRates.usdToLkrRate); // Output: 318.16291
//     console.log(currencyRates.lkrToUsdRate); // Output: 0.003143
//   }
  

useEffect(() => {
    // Fetch the exchange rates when the component mounts
    fetchCurrencyConversionRate();
  }, []);

  const fetchCurrencyConversionRate = async () => {
    try {
      const response = await axios.get('/api/currency-conversion');
    //   alert("Hi");
      console.log(response);
  
      if (response.data) {
        // alert("He");
        // Check if the required patterns exist in the response data
        const usdToLkrRateRegex = /1 USD = ([\d.]+) LKR/;
        const lkrToUsdRateRegex = /1 LKR = ([\d.]+) USD/;
        if (usdToLkrRateRegex.test(response.data) && lkrToUsdRateRegex.test(response.data)) {
        //   alert("Hello");
          // Extract rates from the API response
          console.log(response.data);
          const currencyRates = extractRatesFromApiResponse(response.data);
          console.log(currencyRates);
          if (currencyRates) {
            // Update the state with the rates
            setUsdToLkrRate(currencyRates.usdToLkrRate);
            console.log(currencyRates.usdToLkrRate);
            setLkrToUsdRate(currencyRates.lkrToUsdRate);
          } else {
            console.error('Error extracting currency conversion rates from API response');
          }
        } else {
          console.error('Invalid API response: Required patterns not found');
        }
      } else {
        console.error('Error fetching currency conversion rate: Invalid API response');
      }
    } catch (error) {
      console.error('Error fetching currency conversion rate:', error.message);
    }
  };

  
//   useEffect(() => {
//     // Fetch the exchange rate when the component mounts
//     getCurrencyConversionRate().then((rate) => {
//       if (rate !== null) {
//         setUsdToLkrRate(rate);
//         alert(rate);
//       } else {
//         // Handle the case where the exchange rate is not available or the API request failed
//         console.error("Failed to fetch USD to LKR conversion rate.");
//       }
//     });
//   }, []);
  

// Calculate equivalent donation amount in LKR
const calculateDonationAmountLKR = () => {
    if (currencyType === 'LKR') {
        return donationAmount;
    } else if (usdToLkrRate !== null) {
        const amountInLKR = parseFloat(donationAmountOnUSD) * parseFloat(usdToLkrRate);
        // setDonationAmount(amountInLKR.toFixed(2));
        return amountInLKR.toFixed(2);
    }
    return '';
    };


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

    // const calculateDonationAmountLKR = () => {
    //     if (currencyType === 'LKR') {
    //         return donationAmount;
    //     } else if (usdToLkrRate !== null) {
    //         console.log('donationAmountOnUSD:', donationAmountOnUSD);
    //         console.log('usdToLkrRate:', usdToLkrRate);
        
    //         const amountInLKR = parseFloat(donationAmountOnUSD) * parseFloat(usdToLkrRate);
    //         console.log('amountInLKR:', amountInLKR);
        
    //         return amountInLKR.toFixed(2);
    //     }
    //     return '';
    //     };
          

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
      donationAmount: calculateDonationAmountLKR(),
    };

    localStorage.setItem("fullname", fullname);
    localStorage.setItem("nicNo,", nicNo,);
    localStorage.setItem("donorAddress", donorAddress);
    localStorage.setItem("email", email);
    localStorage.setItem("contactNo", contactNo);
    localStorage.setItem("donationFor", donationFor);
    localStorage.setItem("donationMethod", donationMethod);
    // localStorage.setItem(" selectedProjects",  selectedProjects);
    // localStorage.setItem("  selectedActivities",   selectedActivities);
    localStorage.setItem("donationAmount", donationAmount);


    // Send a POST request to the server
    axios
      .post('/submit-donationform', data)
      .then((response) => {
        // Handle the response from the server
        console.log(response.data);


        // // Send email notification to the donation provider
        // const params = {
        //   to_email: email, // Set the donation provider's email address as the recipient
        //   to_name: fullname, // Set the donation provider's name
        //   // Add more parameters if needed for your email template
        // };

        // // Replace 'YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', and 'YOUR_USER_ID' with actual values from your emailjs account
        // emailjs.send('service_u7koxwf', 'template_mybv35r', params, 'BRRx_fXPneuskBonH')
        // .then((result) => {
        //   console.log(result.text);
        //   // Handle the email sending success if needed
        // })

        // .catch((error) => {
        //   console.log(error.text);
        //   // Handle the email sending error if needed
        // });

        // Generate the PDF receipt content
        // const receiptData = {
        //   fullname,
        //   nicNo,
        //   donorAddress,
        //   email,
        //   contactNo,
        //   donationFor,
        //   donationMethod,
        //   selectedProjects,
        //   selectedActivities,
        //   donationAmount,
        // };

        // const generatePDFContent = () => (
        //   <Document>
        //     <Page style={styles.page}>
        //       <View>
        //         <Text style={styles.heading}>Donation Receipt</Text>
        //         <Text>Name: {receiptData.fullname}</Text>
        //         <Text>NIC No: {receiptData.donorAddress}</Text>
        //         <Text>Donation For: {receiptData.donationFor}</Text>
        //         <Text>Donation Method: {receiptData.donationMethod}</Text>
        //         <Text>Donation Amount: {receiptData.donationAmount}</Text>

        //         {/* Add other receipt details here */}
        //       </View>
        //     </Page>
        //   </Document>
        // );

        // setPdfContent(generatePDFContent());
        // setShowCardMessage(true);

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
        navigate('/CheckoutTest');
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

  const handleCurrencyTypeChange = (selectedOption) => {
    setCurrencyType(selectedOption.value);
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
        <br></br>

        <label htmlFor="donationFor">Payment Currency Type</label>
        <Select
          id="donationFor"
          options={currencyOptions}
          value={currencyOptions.find((option) => option.value === currencyType)}
          onChange={handleCurrencyTypeChange}
          placeholder="Select Your Payment Currency"
          required
        />
        <br></br>

        {currencyType === 'USD' && (
          <>

            <label htmlFor="donationAmountUSD">Donation Amount in USD</label>
            <input
            type="text"
            id="donationAmountUSD"
            value={donationAmountOnUSD}
            onChange={(e) => setDonationAmountOnUSD(e.target.value)}
            required
            />
            {errors.donationAmountOnUSD && <span className="error">{errors.donationAmountOnUSD}</span>}

            <label htmlFor="donationAmount">Equivalent Amount in LKR</label>
            <input
            type="text"
            id="donationAmount"
            value={calculateDonationAmountLKR()}
            // value={donationAmount}
            readOnly
            />


          </>
        )}

        {currencyType === 'LKR' && (
          <>

            <label htmlFor="donationAmount">Donation Amount</label>
            <input
            type="text"
            id="donationAmount"
            value={donationAmount}
            onChange={(e) => setDonationAmount(e.target.value)}
            required
            />
            {errors.donationAmount && <span className="error">{errors.donationAmount}</span>}

          </>
        )}

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

        </div>
      </form>
    </div>
    
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


export default DonateOnUSD;
