import React from 'react';
import "/Users/lavanya/Desktop/eegai copy/src/css/bootstrap.min.css";
import "/Users/lavanya/Desktop/eegai copy/src/css/bootstrap-icons.css";
import "/Users/lavanya/Desktop/eegai copy/src/css/templatemo-kind-heart-charity.css";
import slide2 from '/Users/lavanya/Desktop/eegai copy/src/images/causes/poor-child-landfill-looks-forward-with-hope.jpg';
import slide3 from '/Users/lavanya/Desktop/eegai copy/src/images/causes/african-woman-pouring-water-recipient-outdoors.jpg';

const Ourcauses = () => {
  return (
    <div>
        <section class="section-padding" id="section_3">
                <div class="container">
                    <div class="row">

                        <div class="col-lg-12 col-12 text-center mb-4">
                            <h2>Our Causes</h2>
                        </div>

                        <div class="col-lg-4 col-md-6 col-12 mb-4 mb-lg-0">
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

                                    <a href="/DonateUs" class="custom-btn btn">Donate now</a>
                                </div>
                            </div>
                        </div>



                        <div class="col-lg-4 col-md-6 col-12 mb-4 mb-lg-0">
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

                                    <a href="/DonateUs" class="custom-btn btn">Donate now</a>
                                </div>
                            </div>
                        </div>

                        <div class="col-lg-4 col-md-6 col-12">
                            <div class="custom-block-wrap">
                                <img src={slide3} class="custom-block-image img-fluid" alt=""/>

                                <div class="custom-block">
                                    <div class="custom-block-body">
                                        <h5 class="mb-3">Supply drinking water</h5>

                                        <p>Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus</p>

                                        <div class="progress mt-4">
                                            <div class="progress-bar w-100" role="progressbar" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100"></div>
                                        </div>

                                        <div class="d-flex align-items-center my-2">
                                            <p class="mb-0">
                                                <strong>Raised:</strong>
                                                $84,600
                                            </p>

                                            <p class="ms-auto mb-0">
                                                <strong>Goal:</strong>
                                                $100,000
                                            </p>
                                        </div>
                                    </div>

                                    <a href="/DonateUs" class="custom-btn btn">Donate now</a>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </section>

  </div>
  );
};

export default Ourcauses;
