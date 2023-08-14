import React, { useState, useEffect } from 'react';
import axios from 'axios'; 
import Select from 'react-select';
import SideBarTest from "./SideBarTest";
import './VolunteerAssignment.css';

const donationOptions = [
    { value: 'Project', label: 'Project' },
    { value: 'Activity', label: 'Activity' },
    { value: 'Event', label: 'Event' },
  ];

function VolunteerAssignment() {
    const [volunteers, setVolunteers] = useState([]);
    const [projectOptions, setProject] = useState([]);
    const [selectedProjects, setSelectedProjects] = useState('');
    const [activityOptions, setActivity] = useState([]);
    const [selectedActivities, setSelectedActivities] = useState('');
    const [eventOptions, setEvent] = useState([]);
    const [selectedEvents, setSelectedEvents] = useState('');
    const [volunteerAssignmentFor, setVolunteerAssignmentFor] = useState('');

    useEffect(() => {
        fetchProjectOptions();
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
    
      useEffect(() => {
        fetchActivityOptions();
      }, []);
    
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

      useEffect(() => {
        fetchEventOptions();
      }, []);
    
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

      useEffect(() => {
        fetchVolunteerDetails();
      }, []);
    
      const fetchVolunteerDetails = () => {
    
        axios.get('/api/volunteerDetails')
        
          .then(response => {
            console.log(response.data);
            setVolunteers(response.data);
            // alert("Hello Volunteer Details");
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
    setSelectedActivities(selectedOption.value);
    };

    const handleEventChange = (selectedOption) => {
    setSelectedEvents(selectedOption.value);
    };

    const handleVolunteerAssignmentForChange = (selectedOption) => {
        setVolunteerAssignmentFor(selectedOption.value);
      };
    
      console.log(volunteers);

    // ... (existing code)

// Function to handle the "Assign" button click for a specific volunteer
const handleAssign = (volunteerId, volunteer) => {
  // Check if a volunteer is selected and a project/activity/event is selected
  if (volunteerId && volunteerAssignmentFor && (selectedProjects || selectedActivities || selectedEvents)) {
    // Prepare the data to be inserted into the appropriate table

    console.log(volunteerId);
    alert(volunteerId);
    alert(selectedProjects);
    const selectedProjectsObj = JSON.parse(selectedProjects);
    const  projectId = selectedProjectsObj.value;
    alert(projectId);

    if (volunteerAssignmentFor === 'Project') {
      alert('Project');
      // const formData = {
      //   volunteerId: volunteerId,
      //   selectedProjects: selectedProjects ? JSON.stringify(selectedProjects) : null,
      //   // Add other properties here if needed
      // };
      // alert(formData);
      // console.log("FormData for Project:", { volunteerId, projectId } );
      // Make an API call to insert data into Project_Volunteer table
      axios.post('/api/projectVolunteer', volunteerId, projectId )
        .then((response) => {
          // Handle the response or any other actions after successful insertion
          // alert(`Assigned ${volunteerAssignmentFor} to ${volunteer.username}`);
          alert("Volunteer Assigned Succefully");
        })
        .catch((error) => {
          // Handle errors during insertion
          console.error('Error assigning project:', error);
        });
    } else if (volunteerAssignmentFor === 'Activity') {
      alert('Activity');

      const formData = {
        volunteerId: volunteerId,
        selectedActivities: JSON.stringify(selectedActivities),
        // Add other properties here if needed
      };

      // Make an API call to insert data into Activity_Volunteer table
      axios.post('/api/activityVolunteer', JSON.stringify(formData))
        .then((response) => {
          // Handle the response or any other actions after successful insertion
          // alert(`Assigned ${volunteerAssignmentFor} to ${volunteer.username}`);
          alert("Volunteer Assigned Succefully");
        })
        .catch((error) => {
          // Handle errors during insertion
          console.error('Error assigning activity:', error);
        });
    } else if (volunteerAssignmentFor === 'Event') {
      alert('Event');

      const formData = {
        volunteerId: volunteerId,
        selectedEvents: JSON.stringify(selectedEvents),
        // Add other properties here if needed
      };

      // Make an API call to insert data into Event_Volunteer table
      axios.post('/api/eventVolunteer', JSON.stringify(formData))
        .then((response) => {
          // Handle the response or any other actions after successful insertion
          // alert(`Assigned ${volunteerAssignmentFor} to ${volunteer.username}`);
          alert("Volunteer Assigned Succefully");
        })
        .catch((error) => {
          // Handle errors during insertion
          console.error('Error assigning event:', error);
        });
    } else {
      // Handle any other cases if needed
      // This block will execute if volunteerAssignmentFor is not 'Project', 'Activity', or 'Event'
    }
  } else {
    // Show an error message if a volunteer or project/activity/event is not selected
    alert('Please select a volunteer and a project/activity/event before assigning.');
  }
};


// Assuming the original data is stored in a variable called `originalData`

// Create an empty object to store the transformed data
const transformedData = {};

// Iterate over the original data and group skills and interests for each volunteer
volunteers.forEach((volunteer) => {
  if (!transformedData[volunteer.volunteerId]) {
    transformedData[volunteer.volunteerId] = {
      volunteerId: volunteer.volunteerId,
      username: volunteer.username,
      skills: [],
      interests: [],
    };
  }
  
  transformedData[volunteer.volunteerId].skills.push(volunteer.skill);
  transformedData[volunteer.volunteerId].interests.push(volunteer.interest);
});

// Now `transformedData` contains the unique volunteers with their skills and interests

// Use `Object.values` to convert the transformedData object into an array of volunteers
const volunteersArray = Object.values(transformedData);


// ... (existing code)


  return (
    <div>
      <SideBarTest />
      <div className="volunteer-form" style={{width:'800px'}}>
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

          <table className="volunteer-table">
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
                                <td>{volunteer.skills.join(', ')}</td>
                                <td>{volunteer.interests.join(', ')}</td>
                                <td>
                                    <button onClick={() => handleAssign(volunteer.volunteerId, volunteer)}>Assign</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
      </form>
    </div>
    </div>
  );
}
export default VolunteerAssignment;