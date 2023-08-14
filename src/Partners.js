import React from 'react';
import "/Users/lavanya/Desktop/eegai copy/src/css/bootstrap.min.css";
import "/Users/lavanya/Desktop/eegai copy/src/css/bootstrap-icons.css";
import "/Users/lavanya/Desktop/eegai copy/src/css/templatemo-kind-heart-charity.css";
import partner1 from '/Users/lavanya/Desktop/eegai copy/src/images/partners/partner1.jpg';
import partner2 from '/Users/lavanya/Desktop/eegai copy/src/images/partners/partner2.jpg';
import partner3 from '/Users/lavanya/Desktop/eegai copy/src/images/partners/partner3.jpg';
import partner4 from '/Users/lavanya/Desktop/eegai copy/src/images/partners/partner4.jpg';
import partner5 from '/Users/lavanya/Desktop/eegai copy/src/images/partners/partner5.jpg';
import partner6 from '/Users/lavanya/Desktop/eegai copy/src/images/partners/partner6.png';
import partner7 from '/Users/lavanya/Desktop/eegai copy/src/images/partners/partner7.jpg';
import partner8 from '/Users/lavanya/Desktop/eegai copy/src/images/partners/partner8.png';
import partner9 from '/Users/lavanya/Desktop/eegai copy/src/images/partners/partner9.jpg';

const Partners = () => {
  return (
    <div>
        <section class="section-padding">
                <div class="container">
                    <div class="row">

                        <div class="col-lg-10 col-12 text-center mx-auto">
                            <h2 class="mb-5">Our Partners</h2>
                        </div>

                        <div class="col-lg-3 col-md-6 col-12 mb-4 mb-lg-0" >
                            <div class="featured-block d-flex justify-content-center align-items-center">
                                <a href="https://www.ecpat.lk/" class="d-block">
                                    <img src={partner1} class="featured-block-image img-fluid" alt="" style={{ height: '200px', width : '200px'}}/>

                                    {/* <p class="featured-block-text">Become a <strong>volunteer</strong></p> */}
                                </a>
                            </div>
                        </div>

                        <div class="col-lg-3 col-md-6 col-12 mb-4 mb-lg-0 mb-md-4">
                            <div class="featured-block d-flex justify-content-center align-items-center">
                                <a href="https://dreamspace.academy/pages/1-0-index.php" class="d-block">
                                    <img src={partner2} class="featured-block-image img-fluid" alt="" style={{ height: '200px', width : '200px'}}/>

                                    {/* <p class="featured-block-text">Make a <strong>Donation</strong></p> */}
                                </a>
                            </div>
                        </div>

                        <div class="col-lg-3 col-md-6 col-12 mb-4 mb-lg-0 mb-md-4" >
                            <div class="featured-block d-flex justify-content-center align-items-center">
                                <a href="https://www.sarvodaya.org/" class="d-block">
                                    <img src={partner3} class="featured-block-image img-fluid" alt="" style={{ height: '200px', width : '200px'}}/>

                                    {/* <p class="featured-block-text"><strong>Connect</strong> With Us</p> */}
                                </a>
                            </div>
                        </div>


                        <div class="col-lg-3 col-md-6 col-12 mb-4 mb-lg-0">
                            <div class="featured-block d-flex justify-content-center align-items-center">
                                <a href="https://www.uri.org/" class="d-block">
                                    <img src={partner4} class="featured-block-image img-fluid" alt="" style={{ height: '200px', width : '200px'}}/>

                                    {/* <p class="featured-block-text"><strong>Crowdfunding</strong> Program</p> */}
                                </a>
                            </div>
                        </div>

                        <div class="col-lg-3 col-md-6 col-12 mb-4 mb-lg-0">
                            <div class="featured-block d-flex justify-content-center align-items-center">
                                <a href="https://www.kirkonulkomaanapu.fi/en/" class="d-block">
                                    <img src={partner5} class="featured-block-image img-fluid" alt="" style={{ height: '200px', width : '200px'}}/>

                                    {/* <p class="featured-block-text"><strong>Crowdfunding</strong> Program</p> */}
                                </a>
                            </div>
                        </div>
                        <div class="col-lg-3 col-md-6 col-12 mb-4 mb-lg-0">
                            <div class="featured-block d-flex justify-content-center align-items-center">
                                <a href="https://www.sarvodaya.org/shanthi-sena" class="d-block">
                                    <img src={partner6} class="featured-block-image img-fluid" alt="" style={{ height: '200px', width : '200px'}}/>

                                    {/* <p class="featured-block-text"><strong>Crowdfunding</strong> Program</p> */}
                                </a>
                            </div>
                        </div>
                        <div class="col-lg-3 col-md-6 col-12 mb-4 mb-lg-0">
                            <div class="featured-block d-flex justify-content-center align-items-center">
                                <a href="https://www.peacemakersnetwork.org/" class="d-block">
                                    <img src={partner7} class="featured-block-image img-fluid" alt="" style={{ height: '200px', width : '340px'}}/>

                                    {/* <p class="featured-block-text"><strong>Crowdfunding</strong> Program</p> */}
                                </a>
                            </div>
                        </div>
                        <div class="col-lg-3 col-md-6 col-12 mb-4 mb-lg-0">
                            <div class="featured-block d-flex justify-content-center align-items-center">
                                <a href="https://www.koddi.or.kr/eng/greeting.jhtml" class="d-block">
                                    <img src={partner8} class="featured-block-image img-fluid" alt="" style={{ height: '200px', width : '200px'}}/>

                                    {/* <p class="featured-block-text"><strong>Crowdfunding</strong> Program</p> */}
                                </a>
                            </div>
                        </div>

                        <div class="col-lg-3 col-md-6 col-12 mb-4 mb-lg-0">
                            <div class="featured-block d-flex justify-content-center align-items-center">
                                <a href="https://eegaisrilanka.org/" class="d-block">
                                    <img src={partner9} class="featured-block-image img-fluid" alt="" style={{ height: '200px', width : '280px'}}/>

                                    {/* <p class="featured-block-text"><strong>Crowdfunding</strong> Program</p> */}
                                </a>
                            </div>
                        </div>

                    </div>
                </div>
            </section>

  </div>
  );
};

export default Partners;
