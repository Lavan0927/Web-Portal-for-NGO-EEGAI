import React from 'react';
import './TeamMembers.css';
// import "/Users/lavanya/Desktop/eegai copy/src/css/bootstrap.min.css";
// import "/Users/lavanya/Desktop/eegai copy/src/css/bootstrap-icons.css";
// import "/Users/lavanya/Desktop/eegai copy/src/css/templatemo-kind-heart-charity.css";
import reading from '/Users/lavanya/Desktop/eegai copy/src/images/icons/reading.png';
import help from '/Users/lavanya/Desktop/eegai copy/src/images/icons/help.png';
import healthcare from '/Users/lavanya/Desktop/eegai copy/src/images/icons/healthcare.png';

const WhatWeDo = () => {

  return (
    <div>
    {/* Service Start  */}
    <section className="section-padding section-bg" id="section_2">
     
    <div class="container-xxl py-5">
        <div class="container">
            <div class="text-center mx-auto mb-5 wow fadeInUp" data-wow-delay="0.1s" >
            <h2>Learn More What We Do And Get Involved</h2>
                {/* <h1 class="display-6 mb-5">Learn More What We Do And Get Involved</h1> */}
            </div>
            <div class="row g-4 justify-content-center">
                <div class="col-lg-4 col-md-6 wow fadeInUp" data-wow-delay="0.1s">
                    <div class="service-item bg-white text-center h-100 p-4 p-xl-5">
                        <img class="img-fluid mb-4" src={reading} alt="" style={{ maxHeight: '200px', maxWidth : '200px'}}/>
                        <h4 class="mb-3"> Educate A Child</h4>
                        <p class="mb-4">Tempor ut dolore lorem kasd vero ipsum sit eirmod sit. Ipsum diam justo sed vero dolor duo.</p>
                        <a class="btn btn-outline-primary px-3" href="" >
                            Learn More
                            <div class="d-inline-flex btn-sm-square bg-primary text-white rounded-circle ms-2">
                                <i class="fa fa-arrow-right"></i>
                            </div>
                        </a>
                    </div>
                </div>
                <div class="col-lg-4 col-md-6 wow fadeInUp" data-wow-delay="0.3s">
                    <div class="service-item bg-white text-center h-100 p-4 p-xl-5">
                        <img class="img-fluid mb-4" src={help} alt="" style={{ maxHeight: '200px', maxWidth : '200px'}}/>
                        <h4 class="mb-3">Help the Needy</h4>
                        <p class="mb-4">Tempor ut dolore lorem kasd vero ipsum sit eirmod sit. Ipsum diam justo sed vero dolor duo.</p>
                        <a class="btn btn-outline-primary px-3" href="">
                            Learn More
                            <div class="d-inline-flex btn-sm-square bg-primary text-white rounded-circle ms-2">
                                <i class="fa fa-arrow-right"></i>
                            </div>
                        </a>
                    </div>
                </div>
                <div class="col-lg-4 col-md-6 wow fadeInUp" data-wow-delay="0.5s">
                    <div class="service-item bg-white text-center h-100 p-4 p-xl-5">
                        <img class="img-fluid mb-4" src={healthcare} alt="" style={{ maxHeight: '200px', maxWidth : '200px'}}/>
                        <h4 class="mb-3">Good health and well-being</h4>
                        <p class="mb-4">Tempor ut dolore lorem kasd vero ipsum sit eirmod sit. Ipsum diam justo sed vero dolor duo.</p>
                        <a class="btn btn-outline-primary px-3" href="">
                            Learn More
                            <div class="d-inline-flex btn-sm-square bg-primary text-white rounded-circle ms-2">
                                <i class="fa fa-arrow-right"></i>
                            </div>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </div>
     {/* Service End  */}
        </section>
    </div>
  );
};

export default WhatWeDo;
