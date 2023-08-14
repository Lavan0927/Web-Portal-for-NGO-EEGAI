import React, { useState, useEffect } from 'react';
import axios from 'axios'; 
import Select from 'react-select';
import SideBarTest from "./SideBarTest";
import './VolunteerAssignment.css';
import { useNavigate } from "react-router-dom";
import { DataGrid } from '@mui/x-data-grid';

const donationOptions = [
    { value: 'Project', label: 'Project' },
    { value: 'Activity', label: 'Activity' },
    { value: 'Event', label: 'Event' },
  ];

function Assignment() {
    const [volunteers, setVolunteers] = useState([]);
    const [projectOptions, setProject] = useState([]);
    const [selectedProjects, setSelectedProjects] = useState('');
    const [activityOptions, setActivity] = useState([]);
    const [selectedActivities, setSelectedActivities] = useState('');
    const [eventOptions, setEvent] = useState([]);
    const [selectedEvents, setSelectedEvents] = useState('');
    const [volunteerAssignmentFor, setVolunteerAssignmentFor] = useState('');
    const navigate = useNavigate();


    useEffect(() => {
        fetchProjectOptions();
        fetchActivityOptions();
        fetchEventOptions();
        fetchVolunteerDetails();
      }, []);
    
      const fetchProjectOptions = () => {
    
        axios.get('/api/projects')
        
          .then(response => {
            setProject(response.data);
            console.log(response.data);
            // alert("Hello Project");
          })
          .catch(error => {
            console.error('Error retrieving staff options:', error);
            // Handle the error appropriately
          });
      };
    
      const fetchActivityOptions = () => {
    
        axios.get('/api/activities')
        
          .then(response => {
            setActivity(response.data);
            console.log(response.data);
            // alert("Hello Activity");
          })
          .catch(error => {
            console.error('Error retrieving staff options:', error);
            // Handle the error appropriately
          });
      };

    
      const fetchEventOptions = () => {
    
        axios.get('/api/events')
        
          .then(response => {
            setEvent(response.data);
            console.log(response.data);
            // alert("Hello Event");
          })
          .catch(error => {
            console.error('Error retrieving staff options:', error);
            // Handle the error appropriately
          });
      };

      const fetchVolunteerDetails = () => {
        axios
          .get('/api/volunteerDetails')
          .then(response => {
            // Assign a unique ID to each volunteer before setting the state
            const volunteersWithIds = response.data.map((volunteer, index) => ({
              ...volunteer,
              id: index + 1, // You can use any unique identifier here, for example, the volunteerId
            }));
      
            setVolunteers(volunteersWithIds);
          })
          .catch(error => {
            console.error('Error retrieving volunteer details:', error);
            // Handle the error appropriately
          });
      };
      

    const handleProjectChange = selectedOptions => {
    setSelectedProjects(selectedOptions);
    };

    const handleActivityChange = (selectedOption) => {
    setSelectedActivities(selectedOption);
    };

    const handleEventChange = (selectedOption) => {
    setSelectedEvents(selectedOption);
    };

    const handleVolunteerAssignmentForChange = (selectedOption) => {
        setVolunteerAssignmentFor(selectedOption.value);
      };

// Function to handle the "Assign" button click for a specific volunteer
const handleAssign = (volunteerId, volunteer) => {
    if (
      volunteerId &&
      volunteerAssignmentFor &&
      (selectedProjects || selectedActivities || selectedEvents)
    ) {
      // Check if a volunteer is selected and a project/activity/event is selected
  
      if (volunteerAssignmentFor === 'Project') {
        // Handle project assignment
        if (selectedProjects) {
          // Check if a project is selected
          const projectId = selectedProjects.value; // Access the 'value' property to get the projectId
  
          axios
            .post('/api/projectVolunteer', {
              volunteerId: volunteerId,
              projectId: projectId,
            })
            .then((response) => {
              setVolunteerAssignmentFor('');
              navigate('/');
              alert('Volunteer Assigned Successfully');
  
                // Reset the form fields if needed


              // Handle the response or any other actions after successful insertion
            })
            .catch((error) => {
              console.error('Error assigning project:', error);
              // Handle errors during insertion
            });
        } else {
          alert('Please select a project before assigning.');
        }
      } else if (volunteerAssignmentFor === 'Activity') {
        // Handle activity assignment
        if (selectedActivities) {
          // Check if an activity is selected
          const activityId = selectedActivities.value; // Access the 'value' property to get the activityId
  
          axios
            .post('/api/activityVolunteer', {
              volunteerId: volunteerId,
              activityId: activityId,
            })
            .then((response) => {
              setVolunteerAssignmentFor('');
              navigate('/');
              alert('Volunteer Assigned Successfully');
              // Handle the response or any other actions after successful insertion
            })
            .catch((error) => {
              console.error('Error assigning activity:', error);
              // Handle errors during insertion
            });
        } else {
          alert('Please select an activity before assigning.');
        }
      } else if (volunteerAssignmentFor === 'Event') {
        // Handle event assignment
        if (selectedEvents) {
          // Check if an event is selected
          const eventId = selectedEvents.value; // Access the 'value' property to get the eventId
  
          axios
            .post('/api/eventVolunteer', {
              volunteerId: volunteerId,
              eventId: eventId,
            })
            .then((response) => {
              setVolunteerAssignmentFor('');
              navigate('/');
              alert('Volunteer Assigned Successfully');
              
              // Handle the response or any other actions after successful insertion
            })
            .catch((error) => {
              console.error('Error assigning event:', error);
              // Handle errors during insertion
            });
        } else {
          alert('Please select an event before assigning.');
        }
      } else {
        // Handle any other cases if needed
        // This block will execute if volunteerAssignmentFor is not 'Project', 'Activity', or 'Event'
        alert('Please select a valid assignment type (Project, Activity, or Event).');
      }
    } else {
      // Show an error message if a volunteer or project/activity/event is not selected
      alert('Please select a volunteer and a project/activity/event before assigning.');
    }
  };

  const columns = [
    { field: 'volunteerId', headerName: 'Volunteer ID', flex: 1 },
    { field: 'username', headerName: 'Username', flex: 1 },
    { field: 'skill', headerName: 'Skills', flex: 1 },
    { field: 'interest', headerName: 'Interests', flex: 1 },
    {
      field: 'action',
      headerName: 'Action',
      flex: 1,
      renderCell: (params) => (
        <button onClick={() => handleAssign(params.row.volunteerId, params.row)}>Assign</button>
      ),
    },
  ];
  


  return (
    <div>
      <SideBarTest />
      <div className="volunteer-form" style={{width:'1400px'}}>
      <h2>Volunteer Assignment Unit</h2>
      <form>

        <label htmlFor="volunteerAssignmentFor">Volunteer Assingment For</label>
        <Select
          id="volunteerAssignmentFor"
          options={donationOptions}
          value={donationOptions.find((option) => option.value === volunteerAssignmentFor)}
          onChange={handleVolunteerAssignmentForChange}
          placeholder="Select Volunteer Assignment For"
          required
        />

        <br></br>

        {volunteerAssignmentFor === 'Project' && (
          <>

            <label htmlFor="project">Project</label>
              <Select
                id="project"
                options={projectOptions}
                value={selectedProjects}
                onChange={handleProjectChange}
                placeholder="Select Project"
              />

          </>
        )}

        {volunteerAssignmentFor === 'Activity' && (
          <>

            <label htmlFor="activity">Activity</label>
              <Select
                id="activity"
                options={activityOptions}
                value={selectedActivities}
                onChange={handleActivityChange}
                placeholder="Select Activity"
              />

          </>
        )}

        {volunteerAssignmentFor === 'Event' && (
          <>

            <label htmlFor="event">Event</label>
              <Select
                id="event"
                options={eventOptions}
                value={selectedEvents}
                onChange={handleEventChange}
                placeholder="Select Event"
              />

          </>
        )}
    <br></br>

    {/* <table className="volunteer-table">
        <thead>
            <tr>
                <th>Volunteer ID</th>
                <th>Username</th>
                <th>Skills</th>
                <th>Interests</th>
                <th>Action</th>
            </tr>
        </thead>
        <tbody>
            {volunteers.map((volunteer) => (
                <tr key={volunteer.volunteerId}>
                    <td>{volunteer.volunteerId}</td>
                    <td>{volunteer.username}</td>
                    <td>{volunteer.skill}</td>
                    <td>{volunteer.interest}</td>
                    <td>
                        <button onClick={() => handleAssign(volunteer.volunteerId, volunteer)}>Assign</button>
                    </td>
                </tr>
            ))}
        </tbody>
    </table> */}

    <div style={{ height: 500, width: '100%' }}>
      <DataGrid rows={volunteers} columns={columns} />
    </div>


      </form>
    </div>
    </div>
  );
}
export default Assignment;