import React from 'react';
import "/Users/lavanya/Desktop/eegai copy/src/css/bootstrap.min.css";
import "/Users/lavanya/Desktop/eegai copy/src/css/bootstrap-icons.css";
import "/Users/lavanya/Desktop/eegai copy/src/css/templatemo-kind-heart-charity.css";
import hands from "/Users/lavanya/Desktop/eegai copy/src/images/icons/hands.png";
import heart from "/Users/lavanya/Desktop/eegai copy/src/images/icons/heart.png";
import receive from "/Users/lavanya/Desktop/eegai copy/src/images/icons/receive.png";
import schlorship from "/Users/lavanya/Desktop/eegai copy/src/images/icons/scholarship.png";
import connect from "/Users/lavanya/Desktop/eegai copy/src/images/icons/connect.png";

const Icons = () => {
  return (
    <div>
        <section class="section-padding">
                <div class="container">
                    <div class="row">
                        
                        <div class="col-lg-10 col-12 text-center mx-auto">
                            <h2 class="mb-5">Welcome to EEGAI's Official Page</h2>
                        </div>

            

                        <div class="col-lg-3 col-md-6 col-12 mb-4 mb-lg-0" >
                            <div class="featured-block d-flex justify-content-center align-items-center">
                                <a href="/VolunteerRegistrationForm" class="d-block">
                                    <img src={hands} class="featured-block-image img-fluid" alt=""/>

                                    <p class="featured-block-text">Become a <strong>volunteer</strong></p>
                                </a>
                            </div>
                        </div>

                        <div class="col-lg-3 col-md-6 col-12 mb-4 mb-lg-0 mb-md-4">
                            <div class="featured-block d-flex justify-content-center align-items-center">
                                <a href="/DonateUs" class="d-block">
                                    <img src={receive} class="featured-block-image img-fluid" alt=""/>

                                    <p class="featured-block-text">Make a <strong>Donation</strong></p>
                                </a>
                            </div>
                        </div>

                        <div class="col-lg-3 col-md-6 col-12 mb-4 mb-lg-0 mb-md-4" >
                            <div class="featured-block d-flex justify-content-center align-items-center">
                                <a href="donate.html" class="d-block">
                                    <img src={connect} class="featured-block-image img-fluid" alt="" style={{ maxHeight: '200px', maxWidth : '200px'}}/>

                                    <p class="featured-block-text"><strong>Connect</strong> With Us</p>
                                </a>
                            </div>
                        </div>


                        <div class="col-lg-3 col-md-6 col-12 mb-4 mb-lg-0">
                            <div class="featured-block d-flex justify-content-center align-items-center">
                                <a href="donate.html" class="d-block">
                                    <img src={heart} class="featured-block-image img-fluid" alt=""/>

                                    <p class="featured-block-text"><strong>Crowdfunding</strong> Program</p>
                                </a>
                            </div>
                        </div>
                      

                    </div>
                </div>
            </section>

  </div>
  );
};

export default Icons;
