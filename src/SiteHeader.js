import React from 'react';
import { FaHome, FaEnvelope } from 'react-icons/fa';
import { FaHandsHelping, FaHandHoldingUsd } from 'react-icons/fa';

const SiteHeader = () => {
  const handleClick = () => {
    window.location.href = '/donateus';
  };

  const handleVolunteerClick = () => {
    window.location.href = '/GetInvolved';
  };

  return (
    <div className="text-center py-1" style={{ backgroundColor: 'rgb(255, 255, 255)', marginBottom: '10px' }}>
      <div className="container">
        <div className="row align-items-center">
          <div className="col-lg-6 col-12 mb-3 text-lg-start text-center">
            <FaHome color="secondary" className="me-2" />
            <span className="d-inline-block align-middle">
              36, Farm Road, Uppuveli, Trincomalee, Srilanka.
            </span>
            <FaEnvelope color="secondary" className="ms-3" />
            <span className="d-inline-block align-middle">
              info@eegaisrilanka.org
            </span>
          </div>

          <div className="col-lg-6 col-12 text-lg-end text-center">
            <div className="d-inline-block me-3">
              <span
                onClick={handleClick}
                style={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}
              >
                <FaHandHoldingUsd style={{ color: 'black', fontSize: '30px', marginRight: '5px' }} />
                <span className="d-lg-inline-block d-none">Donate</span>
              </span>
            </div>
            <div className="d-inline-block">
              <span
                onClick={handleVolunteerClick}
                style={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}
              >
                <FaHandsHelping style={{ color: 'black', fontSize: '30px', marginRight: '5px' }} />
                <span className="d-lg-inline-block d-none">Volunteer</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SiteHeader;
