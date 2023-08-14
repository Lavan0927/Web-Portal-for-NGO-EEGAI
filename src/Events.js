import React, { useState, useEffect } from 'react';
import axios from 'axios';
// import NavBar from './NavBar';
import HeaderTemp from './HeaderTemp';
import Footer from './Footer';
import NavBarTest from './NavBarTest';
import "/Users/lavanya/Desktop/eegai copy/src/css/bootstrap.min.css";
import "/Users/lavanya/Desktop/eegai copy/src/css/bootstrap-icons.css";
import "/Users/lavanya/Desktop/eegai copy/src/css/templatemo-kind-heart-charity.css";


const Events = () => {

    const [events, setEvents] = useState([]);
    useEffect(() => {
        // Fetch project data from the server
        axios.get('/events')
          .then(response => {
            console.log(response.deta)
            const { data } = response;
            setEvents(data);
            console.log(events)
          })
          .catch(error => {
            console.error('Error fetching event data:', error);
          });
      }, []);
    
  return (
    <div>
    <HeaderTemp />    
    <NavBarTest />
    {/* <h1>Projects Page</h1> */}
    <section class="section-padding" id="section_3">
      <div class="container">
          <div class="row">

              <div class="col-lg-12 col-12 text-center mb-4">
                  <h2>Our Events</h2>
              </div>

                        {events.map(event => (
        <div className="col-lg-4 col-md-6 col-12 mb-4 mb-lg-0" key={event.eventId}>
          <div className="custom-block-wrap" style={{marginBottom:"50px"}}>
            <img style={{height:"200px"}} src={event.coverPhotoReference} className="custom-block-image img-fluid" alt="" />

            <div className="custom-block">
              <div className="custom-block-body" style={{height:"200px"}}>
                <h5 className="mb-3">{event.eventName}</h5>


                <p>{event.eventDescription}</p>

                {/* <div className="progress mt-4">
                  <div
                    className="progress-bar"
                    role="progressbar"
                    style={{ width: `${(event.raisedAmount / event.goalAmount) * 100}%` }}
                    aria-valuenow={(event.raisedAmount / event.goalAmount) * 100}
                    aria-valuemin="0"
                    aria-valuemax="100"
                  ></div>
                </div> */}

                {/* <div className="d-flex align-items-center my-2">
                  <p className="mb-0">
                    <strong>Raised:</strong>
                    {event.raisedAmount}
                  </p>

                  <p className="ms-auto mb-0">
                    <strong>Goal:</strong>
                    {event.goalAmount}
                  </p>
                </div>
                 */}
              </div>

              <a href="donate.html" className="custom-btn btn">Donate now</a>
            </div>
          </div>
        </div>
      ))}
                   </div>
                </div>
            </section>

    <Footer />
  </div>
  );
};

export default Events;
