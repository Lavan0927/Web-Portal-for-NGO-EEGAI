import React from 'react';
import "/Users/lavanya/Desktop/eegai copy/src/css/bootstrap.min.css";
import "/Users/lavanya/Desktop/eegai copy/src/css/bootstrap-icons.css";
import "/Users/lavanya/Desktop/eegai copy/src/css/templatemo-kind-heart-charity.css";
import './TeamMembers.css';

const PageNotFound = () => {

  return (
    <div>
        <section className="section-padding section-bg" id="section_2">
                <div class="container-xxl py-5 wow fadeInUp" data-wow-delay="0.1s">
                <div class="container text-center">
                    <div class="row justify-content-center">
                        <div class="col-lg-6">
                            <i class="bi bi-exclamation-triangle display-1 text-primary"></i>
                            <h1 class="display-1">404</h1>
                            <h1 class="mb-4">Page Not Found</h1>
                            <p class="mb-4">We’re sorry, the page you have looked for does not exist in our website! Maybe go to our home page or try to use a search?</p>
                            <a class="btn btn-outline-primary py-2 px-3" href="">
                                Go Back To Home
                                <div class="d-inline-flex btn-sm-square bg-primary text-white rounded-circle ms-2">
                                    <i class="fa fa-arrow-right"></i>
                                </div>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>
  );
};

export default PageNotFound;
