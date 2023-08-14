import React from 'react';
import { FaFacebook, FaTwitter, FaLinkedin, FaInstagram, FaGoogle, FaWhatsapp, FaHandsHelping, FaHandHoldingUsd } from 'react-icons/fa';
import { FaHome, FaEnvelope, FaPhone} from 'react-icons/fa';
import logo from './Logo.png';
import './Footer.css';
import { MDBFooter, MDBContainer, MDBRow, MDBCol } from 'mdb-react-ui-kit';

const Footer = () => {
  const handleClick = () => {
    window.location.href = '/donateus';
  };

  const handleVolunteerClick = () => {
    window.location.href = '/GetInvolved';
  };

  return (
    <MDBFooter style={{ backgroundColor: 'rgb(1, 99, 172)', color: 'white' }} className='text-center text-lg-start'>
      <section className='d-flex justify-content-center justify-content-lg-between p-4 border-bottom'>
        <div className='me-5 d-none d-lg-block'>
          <span style={{ color: 'white' }}>Get connected with us on social networks:</span>
        </div>

        <div>
          <a href='https://www.facebook.com/eegaisrilanka' className='me-4 text-reset'>
            <FaFacebook style={{ color: 'white', fontSize: '24px' }} />
          </a>
          <a href='https://twitter.com/eegaisrilanka?lang=en' className='me-4 text-reset'>
            <FaTwitter style={{ color: 'white', fontSize: '24px' }} />
          </a>
          <a href='https://g.co/kgs/nsSLRN' className='me-4 text-reset'>
            <FaGoogle style={{ color: 'white', fontSize: '24px' }} />
          </a>
          <a href='https://instagram.com/eegaisrilanka' className='me-4 text-reset'>
            <FaInstagram style={{ color: 'white', fontSize: '24px' }} />
          </a>
          <a href='https://lk.linkedin.com/company/eegai-srilanka' className='me-4 text-reset'>
            <FaLinkedin style={{ color: 'white', fontSize: '24px' }} />
          </a>
          <a href='https://api.whatsapp.com/send?phone=0094763270273&text=Hello%20there,%20I%20have%20a%20question' className='me-4 text-reset'>
            <FaWhatsapp style={{ color: 'white', fontSize: '24px' }} />
          </a>
        </div>
      </section>

      <section>
        <MDBContainer className='text-center text-md-start mt-5'>
          <MDBRow className='mt-3'>
            <MDBCol md='3' lg='4' xl='3' className='mx-auto mb-4'>
              <div className="logo" style={{ textAlign: 'left' }}>
                <img src={logo} alt="Logo" style={{ width: '150px', height: 'auto' }} />
              </div>
              <br /><br />
              <p style={{ color: 'white' }}>
                "Giving is not just about making a donation, it's about making a difference."
              </p>
              <br />
              <p>
                <span style={{ marginRight: '20px' }}></span>
                <span onClick={handleClick} style={{ cursor: 'pointer' }}> <FaHandHoldingUsd style={{ color: 'white', fontSize: '30px', marginRight: '10px' }} /></span>
                <span onClick={handleVolunteerClick} style={{ cursor: 'pointer' }}> <FaHandsHelping style={{ color: 'white', fontSize: '30px' }} /></span>
              </p>
            </MDBCol>

            <MDBCol md='2' lg='2' xl='2' className='mx-auto mb-4'>
              <h6 className='text-uppercase fw-bold mb-4' style={{ color: 'white' }}>Useful links</h6>
              <p style={{ color: 'white' }}>
                <a href='/' className='text-reset' style={{ color: 'white' }}>
                  Home
                </a>
              </p>
              <p style={{ color: 'white' }}>
                <a href='/about' className='text-reset' style={{ color: 'white' }}>
                  About Us
                </a>
              </p>
              <p style={{ color: 'white' }}>
                <a href='/contact' className='text-reset' style={{ color: 'white' }}>
                  Contact Us
                </a>
              </p>
              <p style={{ color: 'white' }}>
                <a href='/projects' className='text-reset' style={{ color: 'white' }}>
                  Projects
                </a>
              </p>
            </MDBCol>

            <MDBCol md='3' lg='2' xl='2' className='mx-auto mb-4'>
              <h6 className='text-uppercase fw-bold mb-4' style={{ color: 'white' }}>Useful links</h6>
              <p style={{ color: 'white' }}>
                <a href='/events' className='text-reset' style={{ color: 'white' }}>
                  Events
                </a>
              </p>
              <p style={{ color: 'white' }}>
                <a href='/crowdfunding' className='text-reset' style={{ color: 'white' }}>
                  Crowdfunding
                </a>
              </p>
              <p style={{ color: 'white' }}>
                <a href='/GetInvolved' className='text-reset' style={{ color: 'white' }}>
                  Get Involved
                </a>
              </p>
              <p style={{ color: 'white' }}>
                <a href='/projects' className='text-reset' style={{ color: 'white' }}>
                  Donate Us
                </a>
              </p>
            </MDBCol>

            <MDBCol md='4' lg='3' xl='3' className='mx-auto mb-md-0 mb-4'>
              <h6 className='text-uppercase fw-bold mb-4' style={{ color: 'white' }}>Contact</h6>
              <p style={{ color: 'white' }}>
                <FaHome color='white' className='me-2' />
                36, Farm Road, Uppuveli, Trincomalee, Sri Lanka
              </p>
              <p style={{ color: 'white' }}>
                <FaEnvelope color='white' className='me-3' />
                info@eegaisrilanka.org
              </p>
              <p style={{ color: 'white' }}>
                <FaPhone color='white' className='me-3' /> +94 772927516
              </p>
              <p style={{ color: 'white' }}>
                <FaPhone color='white' className='me-3' /> +94 763270273
              </p>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </section>

      <div className='text-center p-4' style={{ backgroundColor: 'rgb(0, 71, 122)' }}>
        <p style={{ color: 'white' }}>
          © 2023 eegai.org. All rights reserved.
        </p>
      </div>
    </MDBFooter>
  );
};

export default Footer;
