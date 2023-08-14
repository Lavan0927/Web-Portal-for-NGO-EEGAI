import React, {  useState } from "react";
import axios from 'axios';
import 'react-phone-number-input/style.css';
// import PhoneInput from 'react-phone-number-input';
// import { isValidPhoneNumber } from 'react-phone-number-input';
import AdminSidebar from "./AdminSidebar";
// import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import 'react-clock/dist/Clock.css';
// import CurrencyInput from 'react-currency-input';

function ProjectForm() {
  const [projectPhoto, setProjectPhoto] = useState(null);

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      // Create a FormData object
      const formData = new FormData();
      formData.append('file', projectPhoto);

      // Send the formData to the server
      await axios.post('/upload', formData);
      alert('Hello World');

      // Handle the response from the server if needed
    } catch (error) {
      // Handle any errors
      console.error(error);
    }
  };


  const handleProjectPhotoUpload = (event) => {
    setProjectPhoto(event.target.files[0]);
  };

  return (
    <>
    <div className="main-container">
      <AdminSidebar />
      <div className="content-container">
        <div className="volunteer-form">
          <h2>Request Visiting Appointment</h2>
          <form onSubmit={handleFormSubmit}>

            <label htmlFor="projectPhoto">Upload Project Cover Photo</label>
            <input
              type="file"
              id="projectPhoto"
              onChange={handleProjectPhotoUpload}
            />

            <br />
            <button type="submit">Submit</button>
          </form>
        </div>
      </div>
    </div>
  </>
  );
}

export default ProjectForm;
