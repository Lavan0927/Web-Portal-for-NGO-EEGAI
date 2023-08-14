import React from 'react';
import { FaHandsHelping, FaHandHoldingUsd ,FaCalendarCheck } from 'react-icons/fa';
import '/Users/lavanya/Desktop/eegai copy/src/css/bootstrap.min.css';
import '/Users/lavanya/Desktop/eegai copy/src/css/bootstrap-icons.css';
import '/Users/lavanya/Desktop/eegai copy/src/css/templatemo-kind-heart-charity.css';
import { useNavigate } from 'react-router-dom';

const HeaderTemp = () => {

  const navigate = useNavigate();

  const handleClick = () => {
    // window.location.href = '/DonatePage';
    navigate('/DonateOnUSD');
  };

  const handleVolunteerClick = () => {
    // window.location.href = '/VolunteerRegistrationForm';
    navigate('/VolunteerRegistrationForm');
  };

  const handleAppoinmentClick = () => {
    // window.location.href = '/VolunteerRegistrationForm';
    navigate('/RequestVisitingAppointment');
  };

  return (
    <div>
      <header className="site-header"  style={{ backgroundColor: '#597081'}}>
        <div className="container">
          <div className="row">
            <div className="col-lg-8 col-12 d-flex flex-wrap">
              <p className="d-flex me-4 mb-0">
                <i className="bi-geo-alt me-2"></i>
                36, Farm Road, Uppuveli, Trincomalee, Sri Lanka
              </p>

              <p className="d-flex mb-0">
                <i className="bi-envelope me-2"></i>
                <a href="mailto:info@company.com">info@eegaisrilanka.org</a>
              </p>
            </div>

            {/* <div className="col-lg-3 col-12 ms-auto d-lg-block d-none">
              <ul className="social-icon">
                <li className="social-icon-item">
                  <a href="#" className="social-icon-link bi-twitter"></a>
                </li>

                <li className="social-icon-item">
                  <a href="#" className="social-icon-link bi-facebook"></a>
                </li>

                <li className="social-icon-item">
                  <a href="#" className="social-icon-link bi-instagram"></a>
                </li>

                <li className="social-icon-item">
                  <a href="#" className="social-icon-link bi-youtube"></a>
                </li>

                <li className="social-icon-item">
                  <a href="#" className="social-icon-link bi-whatsapp"></a>
                </li>        
              </ul>
            </div> */}

            <div className="col-lg-3 col-12 ms-auto d-lg-block d-none">
              <ul className="social-icon">

              <span onClick={handleClick} style={{ cursor: 'pointer' ,color: 'white'}}> <FaHandHoldingUsd style={{ color: 'white', fontSize: '30px', marginRight: '10px' }} />Donate</span>
              <span style={{ marginRight: '20px' }}></span>
              <span onClick={handleVolunteerClick} style={{ cursor: 'pointer' ,color: 'white'}}> <FaHandsHelping style={{ color: 'white', fontSize: '30px' }} /> Become a Volunteer</span>
              {/* <span style={{ marginRight: '20px' }}></span>
              <span onClick={handleAppoinmentClick} style={{ cursor: 'pointer' ,color: 'white'}}> <FaCalendarCheck style={{ color: 'white', fontSize: '30px'}} /> Get Appointment</span> */}

              </ul>
            </div>


          </div>
        </div>
      </header>
    </div>
  );
};

export default HeaderTemp;
