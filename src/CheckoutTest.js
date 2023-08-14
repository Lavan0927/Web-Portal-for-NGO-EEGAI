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
import logo from "/Users/lavanya/Desktop/eegai copy/src/Admin/Logo.png";
import signatureUrl from "/Users/lavanya/Desktop/eegai copy/src/Admin/sign.png";
import { useNavigate } from 'react-router-dom';
import { PDFDownloadLink, PDFViewer, Document, Page, Text, View,Table, TableCell, TableHeader ,Image, StyleSheet } from '@react-pdf/renderer';

import {
  MDBCard,
  MDBCardHeader,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBCardFooter,
  MDBBtn
} from 'mdb-react-ui-kit';
import { Center } from '@chakra-ui/react';

const donationOptions = [
  { value: 'NGO', label: 'NGO' },
  { value: 'Project', label: 'Project' },
  { value: 'Activity', label: 'Activity' },
];

const getCurrentDate = () => {
    const today = new Date();
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return today.toLocaleDateString(undefined, options);
  };


const CheckoutTest = () => {
    const fullname = localStorage.getItem("fullname");
    const nicNo = localStorage.getItem("nicNo");
    const donorAddress = localStorage.getItem("donorAddress");
    const email = localStorage.getItem("email");
    const contactNo = localStorage.getItem("contactNo");
    const donationFor = localStorage.getItem("donationFor");
    const donationMethod = localStorage.getItem("donationMethod");
    const donationAmount = localStorage.getItem("donationAmount");

  const [errors, setErrors] = useState({});
  const [showCardMessage, setShowCardMessage] = useState(false);
  const [pdfContent, setPdfContent] = useState(null);
  const [cardNumber, setCardNumber] = useState('');
  const [cardName, setCardName] = useState('');
  const [cardExpiry, setCardExpiry] = useState('');
  const [cardCVC, setCardCVC] = useState('');
  const navigate = useNavigate();


  const handleFormSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    if (validateForm()) {
      
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
        //   selectedProjects,
        //   selectedActivities,
          donationAmount,
        };

        const generatePDFContent = () => (
            <Document>
                <Page style={styles.page}>
      {/* Header */}
            <View style={styles.header}>
                <View style={styles.leftHeader}>
                    <Image style={styles.headerLogo} src={logo} />
                    {/* Address */}
                    <View style={styles.address}>
                        <Text>EEGAI</Text>
                        <Text>36, Farm Road, Uppuveli, Trincomalee, Sri Lanka</Text>
                        <Text>Contact No: +94 763270273</Text>
                        <Text>Email: info@eegaisrilanka.org</Text>
                    </View>
                </View>

                <View style={styles.rightHeader}>
                    <Text>Receipt No: {receiptData.receiptNo}</Text>
                    <Text style={styles.date}>Date: {getCurrentDate()}</Text> {/* Current Date */}
                </View>
                <View />
            </View>
            <View style={styles.headerLine} />
                <View>
                    <center><Text style={styles.heading}>Donation Receipt</Text></center>
                    



                    {/* Receipt Data Table */}
                    <View style={styles.table}>
                    <View style={styles.tableHeader}>
                        <View style={styles.tableCellHeader}>
                        <Text>Description</Text>
                        </View>
                        <View style={styles.tableCellHeader}>
                        <Text>Value</Text>
                        </View>
                    </View>
                    <View style={styles.tableRow}>
                        <Text style={styles.tableCellHeader}>Name</Text>
                        <Text style={styles.tableCell}>{receiptData.fullname}</Text>
                    </View>
                    <View style={styles.tableRow}>
                        <Text style={styles.tableCellHeader}>NIC No</Text>
                        <Text style={styles.tableCell}>{receiptData.donorAddress}</Text>
                    </View>
                    <View style={styles.tableRow}>
                        <Text style={styles.tableCellHeader}>Donation For</Text>
                        <Text style={styles.tableCell}>{receiptData.donationFor}</Text>
                    </View>
                    <View style={styles.tableRow}>
                        <Text style={styles.tableCellHeader}>Donation Method</Text>
                        <Text style={styles.tableCell}>{receiptData.donationMethod}</Text>
                    </View>
                    <View style={styles.tableRow}>
                        <Text style={styles.tableCellHeader}>Donation Amount</Text>
                        <Text style={styles.tableCell}>{receiptData.donationAmount}</Text>
                    </View>
                    </View>

                    {/* Signature */}
                    <View style={styles.signatureContainer}>
                        <Image style={styles.signatureImage} src={signatureUrl} />
                        <Text style={styles.signatureText}>Executive Director - EEGAI</Text>
                    </View>

                    {/* Add other receipt details here */}
                </View>
                <View style={styles.footerLine} />

                {/* Footer */}
                <View style={styles.footer}>
                    <Text style={styles.footerText}>Thank you for your generous donation!</Text>
                    <Text style={styles.footerText}>Address: 36, Farm Road, Uppuveli, Trincomalee, Sri Lanka</Text>
                </View>

                </Page>
            </Document>
        );

        setPdfContent(generatePDFContent());
        setShowCardMessage(true);

        // Reset the form fields if needed
        setCardNumber('');
        setCardName('');
        setCardExpiry('');
        setCardCVC('');
    }
  };

  const validateForm = () => {
    const errors = {};
    let isValid = true;

    if (!cardNumber || !/^\d{16}$/.test(cardNumber)) {
      errors.cardNumber = "Card number must be a 16-digit number";
      isValid = false;
    }

    
    if (!cardName.trim() || !/^[a-zA-Z ]+$/.test(cardName)) {
      errors.cardName = "Cardholder name must contain only alphabets";
      isValid = false;
    }

    if (!cardExpiry || !/^\d{2}\/\d{2}$/.test(cardExpiry)) {
      errors.cardExpiry = "Card expiry must be in the format MM/YY";
      isValid = false;
    }

    if (!cardCVC || !/^\d{3,4}$/.test(cardCVC)) {
      errors.cardCVC = "CVC must be a 3 or 4-digit number";
      isValid = false;
    } else if (!/^\d+$/.test(cardCVC)) {
      errors.cardCVC = "CVC must only contain digits (0-9)";
      isValid = false;
    }

    setErrors(errors);
    return isValid;
  };

  const handleCloseCardMessage = () => {
    setShowCardMessage(false);
    navigate('/DonateOnUSD'); // Use the `useNavigate` hook to navigate to '/DonateUsTest'
  };
  

  return (
    <div>
      <HeaderTemp />
      <NavBarTest />

    <div className="volunteer-form">
      <h2>Make Donation</h2>
      <form onSubmit={handleFormSubmit}>

      <input
          type="text"
          id="cardName"
          value={cardName}
          onChange={(e) => setCardName(e.target.value)}
          required
          style={{ width: '460px' }}
          placeholder="Cardholder Name"
        />
        {errors.cardName && <p className="error">{errors.cardName}</p>}
        
        <input
          type="text"
          id="cardNumber"
          value={cardNumber}
          onChange={(e) => setCardNumber(e.target.value)}
          required
          style={{ width: '460px' }}
          placeholder="Card Number"
        />
        {errors.cardNumber && <p className="error">{errors.cardNumber}</p>}


        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <input
            type="text"
            id="cardExpiry"
            value={cardExpiry}
            onChange={(e) => setCardExpiry(e.target.value)}
            required
            style={{ width: '215px' }}
            placeholder="Card Expiry (MM/YY)"
          />   

          <input
            type="text"
            id="cardCVC"
            value={cardCVC}
            onChange={(e) => setCardCVC(e.target.value)}
            required
            style={{ width: '215px' }}
            placeholder="CVV"
          />
          <br></br>
          {errors.cardExpiry && <p className="error">{errors.cardExpiry}</p>}
          {errors.cardCVC && <p className="error">{errors.cardCVC}</p>}
        </div>

        <button type="submit">Submit</button>
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
            <MDBCardFooter>  <MDBBtn onClick={handleCloseCardMessage}>Close</MDBBtn>
            </MDBCardFooter>
          </MDBCard>
        </center>
      )}

      <br></br>
    

    <Footer />

    </div>
  );
};

const styles = StyleSheet.create({
  // Add CSS styles here for the floating effect
  // For example:
  page: {
    fontFamily: 'Helvetica',
    fontSize: 12,
    padding: 40,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  leftHeader: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
  },
  centerHeader: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'flex-end', // Align items to the right
  },
  rightHeader: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'flex-end',
  },
  headerLogo: {
    width: 100,
    height: 50,
    marginBottom: 20,
  },
  headerLine: {
    width: '100%',
    height: 1,
    backgroundColor: '#000',
    marginBottom: 20,
  },
  footerLine: {
    width: '100%',
    height: 1,
    backgroundColor: '#000',
    marginTop: 100,
  },
  footer: {
    position: 'absolute',
    bottom: 60,
    left: 40,
    right: 40,
    textAlign: 'center',
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#555',
    textAlign: 'center',
  },
  table: {
    width: '100%',
    marginBottom: 20,
    border: '1px solid #555',
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: 'rgb(1, 99, 172)',
    color: 'white',
    fontWeight: 'bold',
    padding: 8,
    border: '1px solid #555',
  },
  tableRow: {
    flexDirection: 'row',
    padding: 8,
    borderBottom: '1px solid #555',
    backgroundColor: 'white',
  },
  tableCellHeader: {
    flex: 1,
    padding: 8,
    textAlign: 'center', // Center align the text in the header cells
  },
  tableCell: {
    flex: 1,
    padding: 8,
    border: '1px solid #555',
  },
  address: {
    marginBottom: 20,
  },
  footerText: {
    fontSize: 10,
    color: '#555',
  },
  signatureContainer: {
    marginTop: 20,
    alignItems: 'left',
  },
  signatureImage: {
    width: 100,
    height: 50,
  },
  signatureText: {
    marginTop: 5,
  },
  date: {
    fontSize: 10,
    marginBottom: 10,
  },
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
});


export default CheckoutTest;
