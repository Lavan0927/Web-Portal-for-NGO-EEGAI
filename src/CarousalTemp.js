import React from 'react';
import "/Users/lavanya/Desktop/eegai copy/src/css/bootstrap.min.css";
import "/Users/lavanya/Desktop/eegai copy/src/css/bootstrap-icons.css";
import "/Users/lavanya/Desktop/eegai copy/src/css/templatemo-kind-heart-charity.css";
import slide1 from '/Users/lavanya/Desktop/eegai copy/src/images/slide/medium-shot-people-collecting-donations.jpg';
import slide2 from '/Users/lavanya/Desktop/eegai copy/src/images/slide/volunteer-helping-with-donation-box.jpg';
import slide3 from '/Users/lavanya/Desktop/eegai copy/src/images/different-people-doing-volunteer-work.jpg';

const CarousalTemp = () => {
  return (
    <div>
        <section class="hero-section hero-section-full-height">
                <div class="container-fluid">
                    <div class="row">

                        <div class="col-lg-12 col-12 p-0">
                            <div id="hero-slide" class="carousel carousel-fade slide" data-bs-ride="carousel">
                                <div class="carousel-inner">
                                    <div class="carousel-item active">
                                        <img src={slide1} class="carousel-image img-fluid" alt="..."/>
                                        
                                        <div class="carousel-caption d-flex flex-column justify-content-end">
                                            <h1>be a Kind Heart</h1>
                                            
                                            <p>Professional charity theme based on Bootstrap 5.2.2</p>
                                        </div>
                                    </div>

                                    <div class="carousel-item">
                                        <img src={slide2} class="carousel-image img-fluid" alt="..."/>
                                        
                                        <div class="carousel-caption d-flex flex-column justify-content-end">
                                            <h1>Non-profit</h1>
                                            
                                            <p>You can support us to grow more</p>
                                        </div>
                                    </div>

                                    <div class="carousel-item">
                                        <img src={slide3} class="carousel-image img-fluid" alt="..."/>
                                        
                                        <div class="carousel-caption d-flex flex-column justify-content-end">
                                            <h1>Humanity</h1>
                                            
                                            <p>Please tell your friends about our website</p>
                                        </div>
                                    </div>
                                </div>

                                <button class="carousel-control-prev" type="button" data-bs-target="#hero-slide" data-bs-slide="prev">
                                    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                                    <span class="visually-hidden">Previous</span>
                                </button>

                                <button class="carousel-control-next" type="button" data-bs-target="#hero-slide" data-bs-slide="next">
                                    <span class="carousel-control-next-icon" aria-hidden="true"></span>
                                    <span class="visually-hidden">Next</span>
                                </button>
                            </div>
                        </div>

                    </div>
                </div>
            </section>
  </div>
  );
};

export default CarousalTemp;
