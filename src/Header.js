import React from 'react';
import { FaHome, FaEnvelope, FaPhone } from 'react-icons/fa';
import {
  FaFacebook,
  FaTwitter,
  FaLinkedin,
  FaInstagram,
  FaGoogle,
  FaWhatsapp,
  FaHandsHelping,
  FaHandHoldingUsd,
} from 'react-icons/fa';

const SiteHeader = () => {

  const handleClick = () => {
    window.location.href = '/donateus';
  }; 

  const handleVolunteerClick = () => {
    window.location.href = '/GetInvolved';
  }; 

  return (
    <div></div>
  );
};

export default SiteHeader;
