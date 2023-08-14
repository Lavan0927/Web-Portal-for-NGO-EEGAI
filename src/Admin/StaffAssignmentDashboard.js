import React, { useState, useEffect, useRef} from "react";
import SideBarTest from "./SideBarTest";
import Chart from "chart.js/auto";
import { CategoryScale } from "chart.js";
import PieChart from "./PieChart";
import axios from 'axios';
import html2canvas from 'html2canvas';
// import jsPDF from 'jspdf';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import "./styles.css";
import DonationPieChart from "./DonationPieChart";
import DonationOverview from "./DonationOverview";
import VolunteerAssignmentOverview from "./VolunteerAssignmentOverview";
import DonationLineChart from "./DonationLineChart";
// import DonationBarChart from "./DonationBarChart";
import MonthlyDonationBarChart from "./MonthlyDonationBarChart";
import MonthlyDonationLineChart from "./MonthlyDonationLineChart";
import MonthlyDonationForecast from "../MonthlyDonationForecast";
import AnnualBarChart from "./AnnualBarChart";
import TopDonorsTable from "./TopDonorsTable";
import TopUnRegisteredDonorsTable from "./TopUnRegisteredDonorsTable";
import DonationForPieChart from "./DonationForPieChart";
import TopAssignedVolunteersTable from "./TopAssignedVolunteers";
import TopAssignedStaffTable from "./TopAssignedStaffTable";
import DonationCategoryPieChart from "./DonationCategoryPieChart";
import VolunteerSkillsPieChart from "./VolunteerSkillsPieChart";
import VolunteerInterestsPieChart from "./VolunteerInterestsPieChart";
import VolunteerHometownBarChart from "./VolunteerHometownBarChart";
import VolunteerAssignmentsBarChart from "./VolunteerAssignmentsBarChart";
import VolunteerAssignmentComaprisonBarChart from "./VolunteerAssignmentComaprisonBarChart";
import VolunteersPerCategory from "./VolunteersPerCategory";
import StaffOverview from "./StaffOverview";
import StaffPerCategory from "./StaffPerCategory";
import StaffAssignmentsBarChart from "./StaffAssignmentsBarChart";
import '@fortawesome/fontawesome-free/css/all.min.css';
import Button from '@mui/material/Button';


Chart.register(CategoryScale);

function StaffAssignmentDashboard() {
  const donationSectionRef = useRef(null);
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: 'Users by Role',
        data: [],
        backgroundColor: [
          '#f94144',
          '#f3722c',
          '#f8961e',
          '#f9c74f',
        ],
        borderColor: '#1c1c1e',
        borderWidth: 2,
      },
    ],
  });

  useEffect(() => {
    axios.get('/api/userType') // Replace "/api/users" with the actual API endpoint URL
      .then(response => {
        const data = response.data;
        const roles = data.map(item => item.role);
        const counts = data.map(item => item.count);

        setChartData(prevData => ({
          ...prevData,
          labels: roles,
          datasets: [{
            ...prevData.datasets[0],
            data: counts,
          }],
        }));
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const [donationData, setDonationData] = useState({
    registeredDonorsCount: 0,
    unregisteredDonorsCount: 0,
  });

  useEffect(() => {
    axios.get('/api/donations') // Replace "/api/donations" with the actual API endpoint URL
      .then(response => {
        setDonationData(response.data);
      })
      .catch(error => {
        console.error('Error fetching donation data:', error);
      });
  }, []);

  // New state variables to store total counts
  const [totalDonations, setTotalDonations] = useState(0);
  const [totalVolunteers, setTotalVolunteers] = useState(0);
  const [totalDonorsCount, setTotalDonorsCount] = useState(0);
  const [totalStaffsCount, setTotalStaffsCount] = useState(0);

  useEffect(() => {
    axios.get('/api/totalDonations') // Replace "/api/totalDonations" with the actual API endpoint URL for total donations count
      .then(response => {
        setTotalDonations(response.data.totalDonations);
      })
      .catch(error => {
        console.error('Error fetching total donations:', error);
      });

    axios.get('/api/totalVolunteers') // Replace "/api/totalVolunteers" with the actual API endpoint URL for total volunteers count
      .then(response => {
        setTotalVolunteers(response.data.totalVolunteers);
      })
      .catch(error => {
        console.error('Error fetching total volunteers:', error);
      });

    axios.get('/api/totalDonorsCount') // Replace "/api/totalDonorsCount" with the actual API endpoint URL for total donors count
      .then(response => {
        setTotalDonorsCount(response.data.totalDonorsCount);
      })
      .catch(error => {
        console.error('Error fetching total donors count:', error);
      });

      axios.get('/api/totalStaffs') // Replace "/api/totalDonorsCount" with the actual API endpoint URL for total donors count
      .then(response => {
        setTotalStaffsCount(response.data.totalStaffsCount);
      })
      .catch(error => {
        console.error('Error fetching total staffs count:', error);
      });
  }, []);



  const generateReportPDF = () => {
    const staffSection = document.getElementById('staff-section');
    const title = `Staff Assignment Distribution Report - ${getCurrentDate()}`;
    const header = 'Your Header Text'; // Replace this with your desired header text
    const footer = 'Your Footer Text'; // Replace this with your desired footer text
  
    // Create a canvas from the HTML element
    html2canvas(staffSection).then(canvas => {
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;
  
      // Add title
      pdf.setFontSize(18);
      pdf.text(title, 10, 15); // Adjust the position as per your requirement
  
      // // Add header
      // pdf.setFontSize(12);
      // pdf.text(header, 10, 25); // Adjust the position as per your requirement
  
      // // Add footer
      // pdf.setFontSize(10);
      // const pageCount = pdf.internal.getNumberOfPages();
  
      // for (let i = 1; i <= pageCount; i++) {
      //   pdf.setPage(i);
      //   pdf.text(footer, 10, pdf.internal.pageSize.getHeight() - 10, { align: 'center' });
      // }
  
      // Add the captured image of the staff section
      pdf.addImage(imgData, 'PNG', 10, 35, pdfWidth - 20, pdfHeight - 35);
  
      pdf.save('Staff Assignment Distribution Report.pdf');
    });
  };
  
  // Helper function to get the current date in the format "YYYY-MM-DD"
  const getCurrentDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };
  


  
  
  
 // Add the lineChartData state here...
 const [lineChartData, setLineChartData] = useState({
  labels: [],
  datasets: [
    {
      label: 'Donation Amount',
      data: [],
      fill: false,
      borderColor: 'rgba(75, 192, 192, 1)',
      tension: 0.1,
    },
  ],
});

// Existing code...

useEffect(() => {
  axios.get('/api/donation-chart-data') // Replace "/api/donation-chart-data" with the actual API endpoint URL
    .then(response => {
      const donationData = response.data;

      // Process the data to group donation amounts by month
      const dataByMonth = {};
      donationData.forEach(donation => {
        const donationDate = new Date(donation.donationDate);
        const month = `${donationDate.getFullYear()}-${donationDate.getMonth() + 1}`;

        if (!dataByMonth[month]) {
          dataByMonth[month] = 0;
        }

        dataByMonth[month] += donation.donationAmount;
      });

      const labels = Object.keys(dataByMonth);
      const data = Object.values(dataByMonth);

      setLineChartData(prevData => ({
        ...prevData,
        labels,
        datasets: [{
          ...prevData.datasets[0],
          data,
        }],
      }));
    })
    .catch(error => {
      console.error('Error fetching donation data:', error);
    });
}, []); 

const donations = [
  // An array of donation objects, e.g.,
  { donationId: 1, donationFor: "Project A", donationAmount: 100, donationDate: "2023-07-01" },
  { donationId: 2, donationFor: "Project B", donationAmount: 50, donationDate: "2023-07-15" },
  // Add more donation objects as needed
];
const data = [
  // Sample data provided by you
  { monthYear: '1-2023', totalDonation: '60000.00' },
  { monthYear: '1-2023', totalDonation: '40000.00' },
  { monthYear: '1-2023', totalDonation: '40000.00' },
  // Add more data as needed
];


  return (
    <div>
      <SideBarTest />
      {/* Add some CSS styling for alignment */}
      <div style={{ marginLeft: '240px', padding: '20px' }}>

        {/* <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', marginTop: '20px' }}>
          <div style={{ backgroundColor: '#f9c74f', padding: '20px', borderRadius: '8px', minWidth: '200px', textAlign: 'center' }}>
            <h3 style={{ marginBottom: '10px', color: '#1c1c1e' }}>Total Donations</h3>
            <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#1c1c1e' }}>{totalDonations}</div>
          </div>
          <div style={{ backgroundColor: '#f3722c', padding: '20px', borderRadius: '8px', minWidth: '200px', textAlign: 'center' }}>
            <h3 style={{ marginBottom: '10px', color: '#1c1c1e' }}>Total Volunteers</h3>
            <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#1c1c1e' }}>{totalVolunteers}</div>
          </div>
          <div style={{ backgroundColor: '#f8961e', padding: '20px', borderRadius: '8px', minWidth: '200px', textAlign: 'center' ,width: '270px' }}>
            <h3 style={{ marginBottom: '10px', color: '#1c1c1e' }}>Total Donors</h3>
            <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#1c1c1e' }}>{totalDonorsCount}</div>
          </div>
          <div style={{ backgroundColor: '#f8961e', padding: '20px', borderRadius: '8px', minWidth: '200px', textAlign: 'center' ,width: '270px'}}>
            <h3 style={{ marginBottom: '10px', color: '#1c1c1e' }}>Total Staffs</h3>
            <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#1c1c1e' }}>{totalStaffsCount}</div>
          </div>
        </div> */}

         {/* Staff */}
         <section id="staff-section" >

         <StaffOverview />
         <br></br>
         <br></br>

        <h3 style={{display: 'flex',color: '#1c1c1e',marginBottom: '10px'}}>Top Staff List</h3>
        <br></br>
        <div  style={{ display: 'flex', gap: '20px'}}>
        <TopAssignedStaffTable />
        </div>

        <br></br>
        <br></br>

        <h3 style={{display: 'flex',color: '#1c1c1e',marginBottom: '10px'}}>Staff Assignment Distribution</h3>
        <br></br>
        <div  style={{ display: 'flex', gap: '20px'}}>
        {/* <StaffPerCategory /> */}
        <StaffAssignmentsBarChart />
        </div>

        </section>

        <br></br><br></br>

        {/* <button onClick={generateReportPDF}>Generate Staff Assignment Distribution Report PDF</button> */}
        <center><Button variant="outlined" onClick={generateReportPDF}>Generate Staff Assignment Distribution Report PDF</Button></center>
        

        </div>
      </div>
  );
}

export default StaffAssignmentDashboard;
