import React from 'react';
import "/Users/lavanya/Desktop/eegai copy/src/css/bootstrap.min.css";
import "/Users/lavanya/Desktop/eegai copy/src/css/bootstrap-icons.css";
import "/Users/lavanya/Desktop/eegai copy/src/css/templatemo-kind-heart-charity.css";
import director1 from '/Users/lavanya/Desktop/eegai copy/src/images/teammembers/Director 1.jpeg';
import director2 from '/Users/lavanya/Desktop/eegai copy/src/images/teammembers/Director 2.jpeg';
import director3 from '/Users/lavanya/Desktop/eegai copy/src/images/teammembers/Director 4.jpeg';
import director4 from '/Users/lavanya/Desktop/eegai copy/src/images/teammembers/Director 4 (1).jpeg';
import director5 from '/Users/lavanya/Desktop/eegai copy/src/images/teammembers/director 5.jpeg';
import './TeamMembers.css';

const TeamMembers = () => {

  return (
    <div>
    {/* <section className="section-padding section-bg" id="section_2"> */}
    <div class="container-xxl py-5">
        <div class="container">
            <div class="text-center mx-auto mb-5 wow fadeInUp" data-wow-delay="0.1s" >
            <h2>Meet Our Directors</h2>
            </div>
            
            <div class="row g-4" >

                <div class="col-lg-3 col-md-6 wow fadeInUp" data-wow-delay="0.1s">
                    <div class="team-item position-relative rounded overflow-hidden">
                        <div class="overflow-hidden">
                            <img class="img-fluid" src={director2} alt=""/>
                        </div>
                        <div class="team-text bg-light text-center p-4">
                            <h5>Karmegam Nishanthan</h5>
                            <p class="text-primary">Co-Founder & CEO</p>
                            <div class="team-social text-center">
                                <a class="btn btn-square" href=""><i class="fab fa-facebook-f"></i></a>
                                <a class="btn btn-square" href=""><i class="fab fa-twitter"></i></a>
                                <a class="btn btn-square" href=""><i class="fab fa-instagram"></i></a>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="col-lg-3 col-md-6 wow fadeInUp" data-wow-delay="0.3s" >
                    <div class="team-item position-relative rounded overflow-hidden">
                        <div class="overflow-hidden">
                            <img class="img-fluid" src={director1} alt="" />
                        </div>
                        <div class="team-text bg-light text-center p-4">
                            <h5>Jeevaraj Sapthiha Priyatharshini</h5>
                            <p class="text-primary">Co-Founder & Co-Director</p>
                            <div class="team-social text-center">
                                <a class="btn btn-square" href=""><i class="fab fa-facebook-f"></i></a>
                                <a class="btn btn-square" href=""><i class="fab fa-twitter"></i></a>
                                <a class="btn btn-square" href=""><i class="fab fa-instagram"></i></a>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="col-lg-3 col-md-6 wow fadeInUp" data-wow-delay="0.5s">
                    <div class="team-item position-relative rounded overflow-hidden">
                        <div class="overflow-hidden">
                            <img class="img-fluid" src={director3} alt=""/>
                        </div>
                        <div class="team-text bg-light text-center p-4">
                            <h5>Velmurugu Jeevaraj</h5>
                            <p class="text-primary">Co-Director</p>
                            <div class="team-social text-center">
                                <a class="btn btn-square" href=""><i class="fab fa-facebook-f"></i></a>
                                <a class="btn btn-square" href=""><i class="fab fa-twitter"></i></a>
                                <a class="btn btn-square" href=""><i class="fab fa-instagram"></i></a>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="col-lg-3 col-md-6 wow fadeInUp" data-wow-delay="0.7s">
                    <div class="team-item position-relative rounded overflow-hidden">
                        <div class="overflow-hidden">
                            <img class="img-fluid" src={director4} alt=""/>
                        </div>
                        <div class="team-text bg-light text-center p-4">
                            <h5>Ulaganathan Thusyanthan</h5>
                            <p class="text-primary">Co-Director</p>
                            <div class="team-social text-center">
                                <a class="btn btn-square" href=""><i class="fab fa-facebook-f"></i></a>
                                <a class="btn btn-square" href=""><i class="fab fa-twitter"></i></a>
                                <a class="btn btn-square" href=""><i class="fab fa-instagram"></i></a>
                            </div>
                        </div>
                    </div>
                </div>
                <center>
                <div class="col-lg-3 col-md-6 wow fadeInUp" data-wow-delay="0.7s">
                    <div class="team-item position-relative rounded overflow-hidden">
                        <div class="overflow-hidden">
                            <img class="img-fluid" src={director5} alt=""/>
                        </div>
                        <div class="team-text bg-light text-center p-4">
                            <h5>Najeemudeen Mohamed Sasly</h5>
                            <p class="text-primary">Director</p>
                            <div class="team-social text-center">
                                <a class="btn btn-square" href=""><i class="fab fa-facebook-f"></i></a>
                                <a class="btn btn-square" href=""><i class="fab fa-twitter"></i></a>
                                <a class="btn btn-square" href=""><i class="fab fa-instagram"></i></a>
                            </div>
                        </div>
                    </div>
                </div>
                </center>
            </div>
        </div>
    </div>
        {/* </section> */}
    </div>
  );
};

export default TeamMembers;
