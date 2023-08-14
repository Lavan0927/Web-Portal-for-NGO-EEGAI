// import React from 'react';
import React, { useState, useEffect  } from 'react';

import Home from './Home';
import About from './About';
import Contact from './Contact';
import Projects from './Projects';
import Activities from './Activities';
import Events from './Events';
import Crowdfunding from './Crowdfunding';
import GetInvolved from './GetInvolved';
import VolunteerRegistrationForm from './VolunteerRegistrationForm';
// Import the withAuthorization HOC
//import withAuthorization from './WithAuthorization';
import Login from './Login';
import Signup from './Signup';
import DonorRegistrationForm from './DonorRegistrationForm';
import StaffRegistrationForm from './StaffRegistrationForm';
import DonateUs from './DonateUs';
import Payment from './Admin/AdminManageProduct';
import AdminManageProduct from './Admin/AdminManageProduct';
import AdminProduct from './Admin/AdminProduct';
import AdminLogin from './Admin/AdminLogin';
import AdminEdit from './Admin/AdminEdit';
import Admin from './Admin/Admin';
import ManageUsers from './Admin/ManageUsers';
import RequestVisitingAppointment from './RequestVisitingAppointment';
import ManageVistingAppointments from './Admin/ManageVistingAppointments';
import ManageProjects from './Admin/ManageProjects';
import CreateProject from './Admin/CreateProject';
import ContactPage from './ContactPage';
import ProjectForm from './Admin/ProjectForm';
import ProjectTest from './Admin/ProjectTest';
import DonatePage from './DonatePage';
import CreateEvent from './Admin/CreateEvent';
import ProjectStaffReport from './Admin/ProjectStaffReport';
import ProjectDonationReport from './Admin/ProjectDonationReport';
import CreateActivity from './Admin/CreateActivity';
import DonorDashboard from './DonorDashboard/DonorDashboard';
import VolunteerAssignment from './Admin/VolunteerAssignment';
import ManageActivity from './Admin/ManageActivity';
import ActivityStaffReport from './Admin/ActivityStaffReport';
import ActivityDonationReport from './Admin/ActivityDonationReport';
import ManageProject from './StaffDashboard/ManageProject';
import StaffManageActivity from './StaffDashboard/StaffManageActivity';
import StaffManageEvent from './StaffDashboard/StaffManageEvent';
import Assignment from './Admin/Assignment';
import DonatePageforDonor from './DonatePageforDonor';
import DonationNav from './DonationNav';
import ProjectVolunteerReport from './Admin/ProjectVolunteerReport';
import ActivityVolunteerReport from './Admin/ActivityVolunteerReport';
import ManageEvent from './Admin/ManageEvent';
import EventStaffReport from './Admin/EventStaffReport';
import EventVolunteerReport from './Admin/EventVolunteerReport';
import EditProjectPage from './Admin/EditProjectPage';
import Donate from './Donate';
import CheckoutTest from './CheckoutTest';
import DonateUsTest from './DonateUsTest';
import DonationDashboard from './Admin/DonationDashboard';
import VolunteerAssignmentDashboard from './Admin/VolunteerAssignmentDashboard';
import StaffAssignmentDashboard from './Admin/StaffAssignmentDashboard';
import DonateOnUSD from './DonateOnUSD';
import Tree from './Admin/Tree';
import ManageDonation from './Admin/ManageDonation';

// imports for Volunteer Dashboard 
import VolunteerDashboard from './VolunteerDashboard/VolunteerDashboard';
import StaffDashboard from './StaffDashboard/StaffDashboard';
import ManageDonationHistory from './DonorDashboard/ManageDonationHistory';
import VolunteerManageProjects from './VolunteerDashboard/VolunteerManageProjects';
import VolunteerManageActivity from './VolunteerDashboard/VolunteerManageActivity';
import VolunteerManageEvent from './VolunteerDashboard/VolunteerManageEvent';



// import Menu from './Admin/Menu';
// import CheckoutForm from './CheckoutForm';


// import Contacts from "./scenes/Contacts";

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';



 // Use the withAuthorization HOC to wrap the protected component
 //const AuthorizedDashboard = withAuthorization(['admin'])(Dashboard);

const MainRoutes = () => {
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    // Retrieve the value of 'loggedIn' from local storage
    const isLoggedIn = JSON.parse(localStorage.getItem('loggedIn'));
    if (isLoggedIn) {
      setLoggedIn(isLoggedIn);
    }
  }, []);

  return (
    <Router>
      <Routes> 
        <Route path="/" element={<Home/>} /> 
        <Route path="/about" element={<About/>} /> 
        <Route path="/contact" element={<Contact />} /> 
        <Route path="/Projects" element={<Projects />} /> 
        <Route path="/Activities" element={<Activities />} /> 
        <Route path="/Events" element={<Events />} /> 
        <Route path="/GetInvolved" element={<GetInvolved />} /> 
        <Route path="/Crowdfunding" element={<Crowdfunding />} /> 
        <Route path="/VolunteerRegistrationForm" element={<VolunteerRegistrationForm />} /> 
        <Route path="/DonateUs" element={<DonateUs />} /> 
        <Route path="/Login" element={<Login />} /> 
        <Route path="/Signup" element={<Signup />} /> 
        <Route path="/DonorRegistrationForm" element={<DonorRegistrationForm />} /> 
        <Route path="/StaffRegistrationForm" element={<StaffRegistrationForm />} />
        <Route path="/RequestVisitingAppointment" element={<RequestVisitingAppointment />} />
        <Route path="/ContactPage" element={<ContactPage />} />
        <Route path="/DonatePage" element={<DonatePage />} />
        <Route path="/VolunteerAssignment" element={<VolunteerAssignment />} />
        <Route path="/Assignment" element={<Assignment />} />
        <Route path="/DonatePageforDonor" element={<DonatePageforDonor/>} />
        <Route path="/DonationNav" element={<DonationNav/>} />
        <Route path="/Donate" element={<Donate/>} />
        <Route path="/CheckoutTest" element={<CheckoutTest/>} />
        <Route path="/DonateUsTest" element={<DonateUsTest/>} />
        <Route path="/DonateOnUSD" element={<DonateOnUSD/>} />
        {/* <Route path="/CheckoutForm" element={<CheckoutForm />} /> */}

        {/* Admin Page Routes */}
        <Route path="/payment" element={<Payment />} />
        <Route path="/products" element={<AdminProduct />}></Route>
        <Route path="/manageProduct" element={<AdminManageProduct />}></Route>
        <Route path="/editProduct/:id" element={<AdminEdit />}></Route>
        <Route path="/users" element={<ManageUsers />}></Route>
        <Route path="/adminLogin" element={<AdminLogin />}></Route>
        <Route path="/ManageVistingAppointments" element={<ManageVistingAppointments />}></Route>
        <Route path="/admin" element={<Admin />}></Route>
        <Route path="/ManageProjects" element={<ManageProjects />}></Route>
        <Route path="/CreateProject" element={<CreateProject />}></Route>
        <Route path="/CreateActivity" element={<CreateActivity />}></Route>
        <Route path="/CreateEvent" element={<CreateEvent />}></Route>
        <Route path="/ManageUsers" element={<ManageUsers />}></Route>
        <Route path="/ProjectStaffReport" element={<ProjectStaffReport />}></Route>
        <Route path="/ProjectDonationReport" element={<ProjectDonationReport />}></Route>
        <Route path="/ManageActivity" element={<ManageActivity />}></Route>
        <Route path="/ActivityStaffReport" element={<ActivityStaffReport />}></Route>
        <Route path="/ActivityDonationReport" element={<ActivityDonationReport />}></Route>
        <Route path="/ProjectVolunteerReport" element={<ProjectVolunteerReport />}></Route>
        <Route path="/ActivityVolunteerReport" element={<ActivityVolunteerReport />}></Route>
        <Route path="/ManageEvent" element={<ManageEvent />}></Route>
        <Route path="/EventStaffReport" element={<EventStaffReport />}></Route>
        <Route path="/EventVolunteerReport" element={<EventVolunteerReport />}></Route>
        <Route path="/EditProjectPage" element={<EditProjectPage />}></Route>
        <Route path="/DonationDashboard" element={<DonationDashboard/>} />
        <Route path="/VolunteerAssignmentDashboard" element={<VolunteerAssignmentDashboard/>} />
        <Route path="/StaffAssignmentDashboard" element={<StaffAssignmentDashboard/>} />
        <Route path="/Tree" element={<Tree/>} />
        <Route path="/ManageDonation" element={<ManageDonation/>} />

        <Route path="/ProjectForm" element={<ProjectForm />}></Route>
        <Route path="/ProjectTest" element={<ProjectTest />}></Route>
        {/* Admin Page Routes */}

        {/* Volunteer Dashboard */}

        <Route path="/VolunteerDashboard" element={<VolunteerDashboard />}></Route>
        <Route path="/VolunteerManageProjects" element={<VolunteerManageProjects />}></Route>
        <Route path="/VolunteerManageActivity" element={<VolunteerManageActivity />}></Route>
        <Route path="/VolunteerManageEvent" element={<VolunteerManageEvent />}></Route>

        {/* Volunteer Dashboard */}

        {/* Donor Dashboard */}

        <Route path="/DonorDashboard" element={<DonorDashboard />}></Route>
        <Route path="/ManageDonationHistory" element={<ManageDonationHistory />}></Route>

        {/* Donor Dashboard */}

         {/* Staff Dashboard */}

         <Route path="/StaffDashboard" element={<StaffDashboard />}></Route>
         <Route path="/ManageProject" element={<ManageProject/>}></Route>
         <Route path="/StaffManageActivity" element={<StaffManageActivity/>}></Route>
         <Route path="/StaffManageEvent" element={<StaffManageEvent/>}></Route>

        {/* Staff Dashboard */}

         {/* Use the AuthorizedDashboard in your route definition or component rendering 
         <Route path="/Dashboard" component={AuthorizedDashboard} />*/}
      </Routes> 
      {/* <Footer />  */}
      {/* Add the Footer component here */}
    </Router>
  
    
  );
};

export default MainRoutes;
