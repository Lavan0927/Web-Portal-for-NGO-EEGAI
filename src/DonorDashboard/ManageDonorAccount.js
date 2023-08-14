import React, { useState } from 'react';
import './VolunteerRegistrationForm.css';
import Select from 'react-select';
import axios from 'axios';
import 'react-phone-number-input/style.css';
import PhoneInput from 'react-phone-number-input';
import { isValidPhoneNumber } from 'react-phone-number-input';
import HeaderTemp from './HeaderTemp';
import NavBarTest from './NavBarTest';
import Footer from './Footer';

const sdgOptions = [
  { value: 'No Poverty', label: 'No Poverty' },
  { value: 'Zero Hunger', label: 'Zero Hunger' },
  { value: 'Good Health and Well-Being', label: 'Good Health and Well-Being' },
  { value: 'Quality Education', label: 'Quality Education' },
  { value: 'Gender Equality', label: 'Gender Equality' },
  { value: 'Clean Water and Sanitation', label: 'Clean Water and Sanitation' },
  { value: 'Affordable and Clean Energy', label: 'Affordable and Clean Energy' },
  { value: 'Decent Work and Economic Growth', label: 'Decent Work and Economic Growth' },
  { value: 'INDUSTRY, INNOVATION AND INFRASTRUCTURE', label: 'INDUSTRY, INNOVATION AND INFRASTRUCTURE' },
  { value: 'Reduced Inequalities', label: 'Reduced Inequalities' },
  { value: 'Sustainable Cities and Communities', label: 'Sustainable Cities and Communities' },
  { value: 'Responsible Consumption and Production', label: 'Responsible Consumption and Production' },
  { value: 'Climate Action', label: 'Climate Action' },
  { value: 'Life Below Water', label: 'Life Below Water' },
  { value: 'Life On Land', label: 'Life On Land' },
  { value: 'Peace Justice and Strong Instituations', label: 'Peace Justice and Strong Instituations' },
  { value: 'Partnership for the Goals', label: 'Partnership for the Goals' },
  // Add more options for interests as needed
];

const organizationOptions = [
  { value: 'Nonprofit Organization', label: 'Nonprofit Organization' },
  { value: 'Business Organization', label: 'Business Organization' },
  { value: 'Corporation', label: 'Corporation' },
  { value: 'Partnership', label: 'Partnership' },
  { value: 'Sole Proprietorship', label: 'Sole Proprietorship' },
  { value: 'Cooperative', label: 'Cooperative' },
  { value: 'Government Organization', label: 'Government Organization' },
  { value: 'Social Enterprise', label: 'Social Enterprise' },
  { value: 'Professional Associations', label: 'Professional Associations' },

  // Add more options for interests as needed
];


const ManageDonorAccount = () => {
  const [fullname, setFullName] = useState('');
  const [nicNo, setNicNo] = useState('');
  const [address, setAddress] = useState('');
  const [contactNo, setContactNo] = useState('');
  const [donationPreferance, setDonationPreferance] = useState([]);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [organizationname, setOrganizationName] = useState('');
  const [registrationno, setRegistrationNo] = useState('');
  const [typeoforganization, setTypeofOrganization] = useState('');
  const [file, setFile] = useState();
  const [fileName, setFileName] = useState("");
  const [errors, setErrors] = useState({});
  const [isUsernameTaken, setIsUsernameTaken] = useState(false);
  const [isEmailTaken, setIsEmailTaken] = useState(false);
  const [role, setUserType] = useState('');
  const [userId, setUserId] = useState('');
  const [userName, setUserName] = useState('');
  const [userRole, setUserRole] = useState('');
  const [token, setToken] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    // Check if user is already logged in
    const userId = sessionStorage.getItem('userID');
    const userName = sessionStorage.getItem('userName');
    const userRole = sessionStorage.getItem('userRole');
    const token = sessionStorage.getItem('token');

    setUserId(userId);
    setUserName(userName);
    setUserRole(userRole);
    setToken(token);

    if (token && userRole && userId) {
      setLoggedIn(true);
    }
  
  }, []);

  useEffect(() => {
    // Fetch donor account details from the server here
    // For example, you can use an API endpoint to get the account details
    axios
      .get('/api/getDonorAccountDetails')
      .then((response) => {
        const { fullname, nicNo, address, contactNo, donationPreferance } = response.data;
        setFullName(fullname);
        setNicNo(nicNo);
        setAddress(address);
        setContactNo(contactNo);
        setDonationPreferance(donationPreferance);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const saveFile = (e) => {
    setFile(e.target.files[0]);
    setFileName(e.target.files[0].name);
  };

  const checkUsernameAvailability = () => {
    if (username.trim() === '') {
      return;
    }

    axios
      .post('/api/checkUsername', { username })
      .then((response) => {
        setIsUsernameTaken(response.data.isTaken);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const checkEmailAvailability = () => {
    if (email.trim() === '') {
      return;
    }

    axios
      .post('/api/checkEmail', { email })
      .then((response) => {
        setIsEmailTaken(response.data.isTaken);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("file", file);
    formData.append("fileName", fileName);

    if (validateForm()) {

      formData.append("fullname", fullname);
      formData.append("nicNo", nicNo);
      formData.append("address", address);
      formData.append("contactNo", contactNo);
      formData.append("role", role);
      // formData.append("donationPreferance", donationPreferance);
      formData.append("donationPreferance", JSON.stringify(donationPreferance));
      formData.append("username", username);
      formData.append("email", email);
      formData.append("password", password);
      formData.append("organizationname", organizationname);
      formData.append("registrationno", registrationno);
      formData.append("typeoforganization", typeoforganization);

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

      // Username validation
    if (username.trim() === '') {
      errors.username = 'Username is required';
    } else if (username.length < 3) {
      errors.username = 'Username should be at least 3 characters';
    } else if (!/^[A-Za-z][A-Za-z0-9_]{7,29}$/.test(username)) {
      errors.username = 'Invalid username format. Username should start with an alphabet and can contain alphabets, numbers, or an underscore. Length should be 8-30 characters.';
    }

    if (!isValidEmail(email)) {
      errors.email = 'Invalid email format';
    }

    if (password.length < 6) {
      errors.password = 'Password should be at least 6 characters';
    }

      // Add additional password validation if needed
    if (!/\d/.test(password)) {
      errors.password = 'Password should contain at least one digit';
    }

    if (!/[a-zA-Z]/.test(password)) {
      errors.password = 'Password should contain at least one letter';
    }

    if (!/[!@#$%^&*]/.test(password)) {
      errors.password = 'Password should contain at least one special character (!@#$%^&*)';
    }

    if (!isValidContactNo(contactNo)) {
      errors.contactNo = 'Invalid contact number format';
    }

    setErrors(errors);
    return isValid;
  };

  const handleSDGChange = (selectedOptions) => {
    const selectedSDG = selectedOptions.map((option) => option.value);
    setDonationPreferance(selectedSDG);
  };


  const handleOrganizationChange = (selectedOption) => {
    setTypeofOrganization(selectedOption.value);
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
    //const contactNoRegex = /^(?:0|94|\+94|0094)?(?:(11|21|23|24|25|26|27|31|32|33|34|35|36|37|38|41|45|47|51|52|54|55|57|63|65|66|67|81|91)(0|2|3|4|5|7|9)|7(0|1|2|4|5|6|7|8)\d)\d{6}$`/;
    //return contactNoRegex.test(contactNo);
    return isValidPhoneNumber(contactNo);
  };

  const handleClick = () => {
    window.location.href = '/Login';
  }; 



  return (
    <div>
      <HeaderTemp />
    <NavBarTest />
    <div className="volunteer-form">

      <h2>Manage Donor Account Details</h2>

      <form onSubmit={handleFormSubmit} enctype="multipart/form-data" >
        {role === 'donor-organization' ? (
            <div>
              <label htmlFor="organizationname">Organization Name</label>
              <br></br>
              <input type="text" id="organizationname" value={organizationname} onChange={(e) => setOrganizationName(e.target.value)} required style={{width:'460px'}}/>
              {errors.organizationname && <span className="error">{errors.organizationname}</span>}
              <br></br>
              <label htmlFor="typeoforganization">Type of Organization</label>
              <br></br>
              {/* <input type="text" id="typeoforganization" value={typeoforganization} onChange={(e) => setTypeofOrganization(e.target.value)} required style={{width:'460px'}}/> */}
              <Select
              id="donationPreferance"
              options={organizationOptions}
              value={{ value: typeoforganization, label: typeoforganization }} 
              onChange={handleOrganizationChange}
              placeholder="Select Donation Preferences"
              required
            />

              {errors.typeoforganization && <span className="error">{errors.typeoforganization}</span>}
              <br></br>
              <label htmlFor="registrationno">Registration No</label>
              <br></br>
              <input type="text" id="registrationno" value={registrationno} onChange={(e) => setRegistrationNo(e.target.value)} required style={{width:'460px'}}/>
              {errors.registrationno && <span className="error">{errors.registrationno}</span>}
              <br></br>
              <label htmlFor="pointofcontact">Point of Contact ( Full Name )</label>
              <br></br>
              <input type="text" id="pointofcontact" value={fullname} onChange={(e) => setFullName(e.target.value)} required style={{width:'460px'}}/>
              {errors.fullname && <span className="error">{errors.fullname}</span>}

            </div>
          ) : null}

        {role === 'donor-individual' ? (
          <div>
            <label htmlFor="fullname">Full Name</label>
            <br></br>
            <input type="text" id="fullname" value={fullname} onChange={(e) => setFullName(e.target.value)} required style={{width:'460px'}}/>
            {errors.fullname && <span className="error">{errors.fullname}</span>}
            <br></br>
            <label htmlFor="nicno">NIC No.</label>
            <br></br>
            <input type="text" id="nicno" value={nicNo} onChange={(e) => setNicNo(e.target.value)} required style={{width:'460px'}}/>
            {errors.nicNo && <span className="error">{errors.nicNo}</span>}
            <br></br>

            
          </div>
          ) : null}

            <label htmlFor="address">Address</label>
            <input type="text" id="address" value={address} onChange={(e) => setAddress(e.target.value)} required style={{width:'460px'}}/>
            {errors.address && <span className="error">{errors.address}</span>}

            <label htmlFor="username">Username</label>
            <input type="text" id="username" value={username} onChange={(e) => setUsername(e.target.value)} onBlur={checkUsernameAvailability} required style={{width:'460px'}}/>
            {errors.username && <span className="error">{errors.username}</span>}
            {isUsernameTaken && <p className="error">This username is already taken</p>}

            <label htmlFor="email">Email</label>
            <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} onBlur={checkEmailAvailability}  required style={{width:'460px'}}/>
            {errors.email && <span className="error">{errors.email}</span>}
            {isEmailTaken && <p className="error">This email is already registered</p>}

            <label htmlFor="password">Password</label>
            <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required style={{width:'460px'}}/>
            {errors.password && <span className="error">{errors.password}</span>}


            <label htmlFor="profilePhoto">Upload Your Profile Pic</label>
            <input
              type="file"
              id="profilePhoto"
              name="file" 
              accept="image/*"
              onChange={saveFile}
            />
            <br></br>

            <label htmlFor="contactNo">Contact No</label>
            <PhoneInput
              type="text"
              id="contactNo"
              defaultCountry="LK"
              value={contactNo}
              onChange={setContactNo}
              required
            />
            {errors.contactNo && <span className="error">{errors.contactNo}</span>}
    
            <label htmlFor="donationPreferance">Donation Preferences</label>
            <Select
              id="donationPreferance"
              options={sdgOptions}
              value={sdgOptions.filter((option) => donationPreferance.includes(option.value))}
              onChange={handleSDGChange}
              isMulti
              placeholder="Select Donation Preferences"
              required
            />

            <br></br>

            <button type="submit">Update Account Details</button>
      </form>
    </div>
    <Footer />
    </div>
  );
};


export default ManageDonorAccount;
