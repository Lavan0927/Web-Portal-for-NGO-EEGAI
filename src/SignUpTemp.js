import React from 'react';
import { Link } from 'react-router-dom';
import "/Users/lavanya/Desktop/eegai copy/src/css/bootstrap.min.css";
import "/Users/lavanya/Desktop/eegai copy/src/css/bootstrap-icons.css";
import "/Users/lavanya/Desktop/eegai copy/src/css/templatemo-kind-heart-charity.css";

const SignUpTemp = () => {
  return (
    <div>
        <section class="donate-section">
                <div class="section-overlay"></div>
                <div class="container">
                    <div class="row">

                        <div class="col-lg-6 col-12 mx-auto">
                            <form class="custom-form donate-form" action="#" method="get" role="form">
                                <center>
                                <h3 class="mb-4">Join EEGAI today and start your journey with us</h3>

                                <div class="row">

                                    <Link to="/VolunteerRegistrationForm">
                                        <button type="submit" class="form-control mt-4" style={{ width: '200px' }}>Register As Volunteer</button>
                                    </Link >

                                    <Link to="/DonorRegistrationForm">
                                        <button type="submit" class="form-control mt-4" style={{ width: '200px' }}>Register As Donor</button>
                                    </Link >

                                    <Link to="/StaffRegistrationForm">
                                        <button type="submit" class="form-control mt-4" style={{ width: '200px' }}>Register As Staff</button>
                                    </Link >

                                    <Link to="/RequestVisitingAppointment">
                                        <button type="submit" class="form-control mt-4" style={{ width: '200px' }}>Get Appointment</button>
                                    </Link >

                                </div>
                                </center>
                            </form>
                        </div>

                    </div>
                </div>
            </section>

  </div>
  );
};

export default SignUpTemp;
