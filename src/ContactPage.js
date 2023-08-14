import React, { useState } from 'react';
import HeaderTemp from './HeaderTemp';
import NavBarTest from './NavBarTest';
import Footer from './Footer';
import "/Users/lavanya/Desktop/eegai copy/src/css/bootstrap.min.css";
import "/Users/lavanya/Desktop/eegai copy/src/css/bootstrap-icons.css";
import "/Users/lavanya/Desktop/eegai copy/src/css/templatemo-kind-heart-charity.css";
import avatar1 from '/Users/lavanya/Desktop/eegai copy/src/images/avatar/pretty-blonde-woman-wearing-white-t-shirt.jpg';
import emailjs from 'emailjs-com';
import axios from 'axios'; 

const ContactPage = () => {
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [email, setEmail] = useState('');
    const [purpose, setPurpose] = useState('');
    const [errors, setErrors] = useState({});
    const [notification, setNotification] = useState('');

    const validateForm = () => {
        const errors = {};
    
        if (!isValidEmail(email)) {
          errors.email = 'Invalid email format';
        }
    
        setErrors(errors);
    
        return Object.keys(errors).length === 0;
      };

    const handleSubmit = (e) => {
        e.preventDefault();
    
        if (validateForm()) {
          const formData = {
            firstname,
            lastname,
            email,
            purpose,
          };
    
          // Save data to the database using an API call
          axios.post('/api/contact', formData)
            .then((response) => {
              // Handle the response if needed (e.g., show success message)
              console.log('Data successfully saved:', response.data);
    
              // Send email notification to the contact person
              const params = {
                to_email: formData.email,
                to_name: `${formData.firstname} ${formData.lastname}`,
                // Add more parameters if needed for your email template
              };
    
              // Replace 'YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', and 'YOUR_USER_ID' with actual values from your emailjs account
              emailjs.send('service_sgga8tj', 'template_x3x1mtm', params, 'nGaQaEmTz4KIhXJig')
                .then((result) => {
                  console.log(result.text);
                  setFirstname('');
                  setLastname('');
                  setEmail('');
                  setPurpose('');
                  setNotification('Thank You for Contacting Us!');
                })
                .catch((error) => {
                  console.log(error.text);
                  setNotification('An error occurred while sending the email.');
                });
            })
            .catch((error) => {
              // Handle errors if any
              setNotification('An error occurred while saving data.');
              console.error('Error saving data:', error);
            });
        }
      };


      // Validation helper functions
  const isValidEmail = (email) => {
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    return emailRegex.test(email);
  };
  

  return (
    <div>
      <HeaderTemp />
      <NavBarTest />
      <section class="contact-section section-padding" id="section_6">
                <div class="container">
                    <div class="row">

                        <div class="col-lg-4 col-12 ms-auto mb-5 mb-lg-0">
                            <div class="contact-info-wrap">
                                <h2>Get in touch</h2>

                                <div class="contact-image-wrap d-flex flex-wrap">
                                    <img src={avatar1} class="img-fluid avatar-image" alt=""/>

                                    <div class="d-flex flex-column justify-content-center ms-3">
                                        <p class="mb-0">Karmegam Nishanthan</p>
                                        <p class="mb-0"><strong>Co-Founder & CEO</strong></p>
                                    </div>
                                </div>

                                <div class="contact-info">
                                    <h5 class="mb-3">Contact Infomation</h5>

                                    <p class="d-flex mb-2">
                                        <i class="bi-geo-alt me-2"></i>
                                        36, Farm Road, Uppuveli, Trincomalee, Sri Lanka
                                    </p>

                                    <p class="d-flex mb-2">
                                        <i class="bi-telephone me-2"></i>

                                        <a href="tel: 0094 772927516">
                                            0094 772927516
                                        </a>
                                    </p>

                                    <p class="d-flex">
                                        <i class="bi-envelope me-2"></i>

                                        <a href="mailto:info@eegaisrilanka.org">
                                            info@eegaisrilanka.org
                                        </a>
                                    </p>

                                    <a href="#" class="custom-btn btn mt-3">Get Direction</a>
                                </div>
                            </div>
                        </div>

                        <div class="col-lg-5 col-12 mx-auto">
                            <center> {notification && <p>{notification}</p>} </center>
                           
                            <form class="custom-form contact-form" action="#" method="post" role="form" onSubmit={handleSubmit}>
                                <h2>Contact form</h2>

                                <p class="mb-4">Or, you can just send an email:
                                    <a href="#">info@eegaisrilanka.org</a>
                                </p>
                                <div class="row">
                                    <div class="col-lg-6 col-md-6 col-12">
                                        <input type="text" name="first-name" id="first-name" class="form-control" placeholder="Jack"  value={firstname}  onChange={(e) => setFirstname(e.target.value)} required/>
                                    </div>

                                    <div class="col-lg-6 col-md-6 col-12">
                                        <input type="text" name="last-name" id="last-name" class="form-control" placeholder="Doe" value={lastname}  onChange={(e) => setLastname(e.target.value)} required/>
                                    </div>
                                </div>

                                <input type="email" name="email" id="email" pattern="[^ @]*@[^ @]*" class="form-control" placeholder="Jackdoe@gmail.com" value={email} onChange={(e) => setEmail(e.target.value)}required/>

                                <textarea name="message" rows="5" class="form-control" id="message" placeholder="What can we help you?" value={purpose}  onChange={(e) => setPurpose(e.target.value)} ></textarea>

                                <button type="submit" class="form-control">Send Message</button>
                            </form>
                        </div>

                    </div>
                </div>
            </section>
      <Footer />
    </div>
  );
};

export default ContactPage;
