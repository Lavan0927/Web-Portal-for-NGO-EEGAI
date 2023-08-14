import React from 'react';
import "/Users/lavanya/Desktop/eegai copy/src/css/bootstrap.min.css";
import "/Users/lavanya/Desktop/eegai copy/src/css/bootstrap-icons.css";
import "/Users/lavanya/Desktop/eegai copy/src/css/templatemo-kind-heart-charity.css";
import reading from '/Users/lavanya/Desktop/eegai copy/src/images/icons/reading.png';
import help from '/Users/lavanya/Desktop/eegai copy/src/images/icons/help.png';
import healthcare from '/Users/lavanya/Desktop/eegai copy/src/images/icons/healthcare.png';
import './TeamMembers.css';

const TestimonialTemp = () => {

  return (
    <div>
    {/* Service Start  */}
    <section className="section-padding section-bg" id="section_2">
     
    <div class="container-xxl py-5">
        <div class="container">
            <div class="text-center mx-auto mb-5 wow fadeInUp" data-wow-delay="0.1s">
                <div class="d-inline-block rounded-pill bg-secondary text-primary py-1 px-3 mb-3">Testimonial</div>
                <h1 class="display-6 mb-5">Trusted By Thousands Of People And Nonprofits</h1>
            </div>
            <div class="owl-carousel testimonial-carousel wow fadeInUp" data-wow-delay="0.1s">
                <div class="testimonial-item text-center">
                    <img class="img-fluid bg-light rounded-circle p-2 mx-auto mb-4" src="img/testimonial-1.jpg" />
                    <div class="testimonial-text rounded text-center p-4">
                        <p>Clita clita tempor justo dolor ipsum amet kasd amet duo justo duo duo labore sed sed. Magna ut diam sit et amet stet eos sed clita erat magna elitr erat sit sit erat at rebum justo sea clita.</p>
                        <h5 class="mb-1">Doner Name</h5>
                        <span class="fst-italic">Profession</span>
                    </div>
                </div>
                <div class="testimonial-item text-center">
                    <img class="img-fluid bg-light rounded-circle p-2 mx-auto mb-4" src="img/testimonial-2.jpg" />
                    <div class="testimonial-text rounded text-center p-4">
                        <p>Clita clita tempor justo dolor ipsum amet kasd amet duo justo duo duo labore sed sed. Magna ut diam sit et amet stet eos sed clita erat magna elitr erat sit sit erat at rebum justo sea clita.</p>
                        <h5 class="mb-1">Doner Name</h5>
                        <span class="fst-italic">Profession</span>
                    </div>
                </div>
                <div class="testimonial-item text-center">
                    <img class="img-fluid bg-light rounded-circle p-2 mx-auto mb-4" src="img/testimonial-3.jpg" />
                    <div class="testimonial-text rounded text-center p-4">
                        <p>Clita clita tempor justo dolor ipsum amet kasd amet duo justo duo duo labore sed sed. Magna ut diam sit et amet stet eos sed clita erat magna elitr erat sit sit erat at rebum justo sea clita.</p>
                        <h5 class="mb-1">Doner Name</h5>
                        <span class="fst-italic">Profession</span>
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

export default TestimonialTemp;
