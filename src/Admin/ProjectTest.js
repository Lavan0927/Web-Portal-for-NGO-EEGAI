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

function ProjectTest() {
    const [file, setFile] = useState();
    const [fileName, setFileName] = useState("");

    const saveFile = (e) => {
        setFile(e.target.files[0]);
        setFileName(e.target.files[0].name);
      };

  const uploadFile = async (event) => {
    const formData = new FormData();
        formData.append("file", file);
        formData.append("fileName", fileName);
        try {
          const res = await axios.post(
            '/upload',
            formData
          );
          console.log(res);
          setFile(null);
        } catch (ex) {
          console.log(ex);
        }
  };


  return (
    <>
    <div className="main-container">
      <AdminSidebar />
      <div className="content-container">
        <div className="volunteer-form">
          <h2>Request Visiting Appointment</h2>
          <form onSubmit={uploadFile}>

            <label htmlFor="projectPhoto">Upload Project Cover Photo</label>
            <input
              type="file"
              id="projectPhoto"
              onChange={saveFile}
            />

            <br />
            <button type="submit" >Submit</button>
          </form>
        </div>
      </div>
    </div>
  </>
  );
}

export default ProjectTest;
