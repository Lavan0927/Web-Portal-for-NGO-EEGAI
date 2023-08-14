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


Chart.register(CategoryScale);

function Admin() {
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


  // Function to generate PDF for the Donation section
  const generateDonationPDF = async () => {
    const section = document.getElementById("donation-section");
    await generateSectionPDF(section, "Donation Report");
  };

  // Function to generate PDF for the Volunteer section
  const generateVolunteerPDF = async () => {
    const section = document.getElementById("volunteer-section");
    await generateSectionPDF(section, "Volunteer Report");
  };

  // Function to generate PDF for the Staff section
  const generateStaffPDF = async () => {
    const section = document.getElementById("staff-section");
    await generateSectionPDF(section, "Staff Report");
  };

  // Helper function to generate a PDF for a section
  const generateSectionPDF = async (section, title, pdf) => {
    const header = title;

    // Create a canvas from the HTML element
    const canvas = await html2canvas(section);
    const imgData = canvas.toDataURL("image/png");
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

    pdf.setFontSize(18);
    pdf.text(header, 10, 15);

    pdf.addImage(imgData, "PNG", 10, 35, pdfWidth - 20, pdfHeight - 35);
  };

  // Function to generate the combined PDF report
  const generateReportPDF = async () => {
    const pdf = new jsPDF("p", "mm", "a4");

    // Define the content for each section
    const sections = [
      { section: "donation-section", title: "Donation Report" },
      { section: "volunteer-section", title: "Volunteer Report" },
      { section: "staff-section", title: "Staff Report" },
      // Add more sections as needed
    ];

    for (let i = 0; i < sections.length; i++) {
      const { section, title } = sections[i];
      const sectionElement = document.getElementById(section);

      if (i !== 0) {
        pdf.addPage(); // Add a page break for all sections except the first one
      }

      await generateSectionPDF(sectionElement, title, pdf);
    }

    // Save the combined PDF report
    pdf.save("multi_page_report.pdf");
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

const formatCurrency = (amount) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'LKR',
  }).format(amount);
};

  return (
    <div>
      <SideBarTest />
      {/* Add some CSS styling for alignment */}
      <div style={{ marginLeft: '240px', padding: '20px' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', marginTop: '20px' }}>
          <div style={{ backgroundColor: '#f9c74f', padding: '20px', borderRadius: '8px', minWidth: '200px', textAlign: 'center' }}>
            <h3 style={{ marginBottom: '10px', color: '#1c1c1e' }}>Total Donations</h3>
            <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#1c1c1e' }}>{formatCurrency(totalDonations)}</div>
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
        </div>
        <br></br><br></br>

       <section id="donation-section" ref={donationSectionRef}>
        <DonationOverview />

        <h2 style={{display: 'flex',color: '#1c1c1e',marginBottom: '10px'}}>Overall Donation Distribution</h2> 
        <div  style={{ display: 'flex', gap: '20px'}}>
        <DonationCategoryPieChart />
        <DonationPieChart donationData={donationData} />
        </div>
        <br></br><br></br>
        <h2 style={{display: 'flex',color: '#1c1c1e',marginBottom: '10px'}}>Top Registerd Donors List</h2>
        <div  style={{ display: 'flex', gap: '20px'}}>
        <TopDonorsTable />
        </div>
        <br></br><br></br>

        <h2 style={{display: 'flex',color: '#1c1c1e',marginBottom: '10px'}}>Top UnRegisterd Donors List</h2>
        <div  style={{ display: 'flex', gap: '20px'}}>
        <TopUnRegisteredDonorsTable />
        </div>
        <br></br><br></br>
        <div  style={{ display: 'flex', gap: '20px'}}>
        <AnnualBarChart />
        </div>
        <br></br><br></br>
{/* 
        <div  style={{ display: 'flex', gap: '20px'}}>
        <MonthlyDonationBarChart />
        <MonthlyDonationLineChart />
        </div>
        <br></br><br></br>

        <div  style={{ display: 'flex', gap: '20px'}}>
        <MonthlyDonationForecast />
        </div>
        <br></br>
        <br></br> */}

        </section>

        <button onClick={generateReportPDF}>Generate Donation PDF</button>

        <section id="volunteer-section" >

        <VolunteerAssignmentOverview />

        <h2 style={{display: 'flex',color: '#1c1c1e',marginBottom: '10px'}}>Volunteers Assignements Distribution</h2> 
        <div  style={{ display: 'flex', gap: '20px'}}>
        {/* <VolunteerAssignmentComaprisonBarChart/> */}
        <VolunteerAssignmentsBarChart />
        </div>
        <br></br><br></br>

        <h2 style={{display: 'flex',color: '#1c1c1e',marginBottom: '10px'}}>Top Volunteers List</h2>
        <div  style={{ display: 'flex', gap: '20px'}}>
        <TopAssignedVolunteersTable />
        </div>
        <br></br><br></br>

        <h2 style={{display: 'flex',color: '#1c1c1e',marginBottom: '10px'}}>Volunteers Skills & Insterest Overall Distribution</h2> 
        <div  style={{ display: 'flex', gap: '20px'}}>
        <VolunteerSkillsPieChart />
        <VolunteerInterestsPieChart />
        </div>
        <br></br><br></br>

        <div  style={{ display: 'flex', gap: '20px'}}>
        <VolunteerHometownBarChart />
        </div>
        <br></br><br></br>

        </section>


         {/* Staff */}
         <section id="staff-section" >

         <StaffOverview />

        <h2 style={{display: 'flex',color: '#1c1c1e',marginBottom: '10px'}}>Top Staff List</h2>
        <div  style={{ display: 'flex', gap: '20px'}}>
        <TopAssignedStaffTable />
        </div>

        <h2 style={{display: 'flex',color: '#1c1c1e',marginBottom: '10px'}}>Top Staff List</h2>
        <div  style={{ display: 'flex', gap: '20px'}}>
        {/* <StaffPerCategory /> */}
        <StaffAssignmentsBarChart />
        </div>

        </section>

        {/* <h1 style={{ marginTop: '20px' }}>User Roles Pie Chart</h1> */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', marginTop: '20px' }}>
         
        </div>
      </div>
    </div>
  );
}

export default Admin;
