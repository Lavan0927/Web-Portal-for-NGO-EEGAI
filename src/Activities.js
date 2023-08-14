import React, { useState, useEffect }  from 'react';
import HeaderTemp from './HeaderTemp';
import axios from 'axios';
import Footer from './Footer';
import NavBarTest from './NavBarTest';
import "/Users/lavanya/Desktop/eegai copy/src/css/bootstrap.min.css";
import "/Users/lavanya/Desktop/eegai copy/src/css/bootstrap-icons.css";
import "/Users/lavanya/Desktop/eegai copy/src/css/templatemo-kind-heart-charity.css";
import slide2 from '/Users/lavanya/Desktop/eegai copy/src/images/causes/poor-child-landfill-looks-forward-with-hope.jpg';
import slide3 from '/Users/lavanya/Desktop/eegai copy/src/images/causes/african-woman-pouring-water-recipient-outdoors.jpg';

const Activities = () => {

    const [activities, setActivities] = useState([]);
    useEffect(() => {
        // Fetch project data from the server
        axios.get('/activities')
          .then(response => {
            console.log(response.deta)
            const { data } = response;
            setActivities(data);
            console.log(activities)
          })
          .catch(error => {
            console.error('Error fetching activity data:', error);
          });
      }, []);

  return (
    <div>
    <HeaderTemp />
    <NavBarTest />
    {/* <h1>Events Page</h1> */}
    <section class="section-padding" id="section_3">
                <div class="container">
                    <div class="row">

                        <div class="col-lg-12 col-12 text-center mb-4">
                            <h2>Our Activities</h2>
                        </div>

                        {/* <div class="col-lg-4 col-md-6 col-12 mb-4 mb-lg-0">
                            <div class="custom-block-wrap">
                                <img src={slide2} class="custom-block-image img-fluid" alt=""/>

                                <div class="custom-block">
                                    <div class="custom-block-body">
                                        <h5 class="mb-3">Poverty Development</h5>

                                        <p>Sed leo nisl, posuere at molestie ac, suscipit auctor mauris. Etiam quis metus tempor</p>

                                        <div class="progress mt-4">
                                            <div class="progress-bar w-50" role="progressbar" aria-valuenow="50" aria-valuemin="0" aria-valuemax="100"></div>
                                        </div>

                                        <div class="d-flex align-items-center my-2">
                                            <p class="mb-0">
                                                <strong>Raised:</strong>
                                                $27,600
                                            </p>

                                            <p class="ms-auto mb-0">
                                                <strong>Goal:</strong>
                                                $60,000
                                            </p>
                                        </div>
                                    </div>

                                    <a href="donate.html" class="custom-btn btn">Donate now</a>
                                </div>
                            </div>
                        </div> */}






                        {activities.map(activity => (
        <div className="col-lg-4 col-md-6 col-12 mb-4 mb-lg-0" key={activity.id}>
          <div className="custom-block-wrap" style={{marginBottom:"50px"}}>
            <img style={{height:"200px"}} src={activity.coverPhotoReference} className="custom-block-image img-fluid" alt="" />

            <div className="custom-block">
              <div className="custom-block-body" style={{height:"200px"}}>
                <h5 className="mb-3">{activity.activityName}</h5>


                <p>{activity.activityDescription}</p>

                <div className="progress mt-4">
                  <div
                    className="progress-bar"
                    role="progressbar"
                    style={{ width: `${(activity.raisedAmount / activity.goalAmount) * 100}%` }}
                    aria-valuenow={(activity.raisedAmount / activity.goalAmount) * 100}
                    aria-valuemin="0"
                    aria-valuemax="100"
                  ></div>
                </div>

                <div className="d-flex align-items-center my-2">
                  <p className="mb-0">
                    <strong>Raised:</strong>
                    {activity.raisedAmount}
                  </p>

                  <p className="ms-auto mb-0">
                    <strong>Goal:</strong>
                    {activity.goalAmount}
                  </p>
                </div>
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

export default Activities;
