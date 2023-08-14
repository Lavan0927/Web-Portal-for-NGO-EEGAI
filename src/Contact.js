import React from 'react';
import "/Users/lavanya/Desktop/eegai copy/src/css/bootstrap.min.css";
import "/Users/lavanya/Desktop/eegai copy/src/css/bootstrap-icons.css";
import "/Users/lavanya/Desktop/eegai copy/src/css/templatemo-kind-heart-charity.css";
import avatar1 from '/Users/lavanya/Desktop/eegai copy/src/images/avatar/pretty-blonde-woman-wearing-white-t-shirt.jpg';

const Contact = () => {
  return (
    <div>

<section class="contact-section section-padding" id="section_6">
                <div class="container">
                    <div class="row">

                        <div class="col-lg-4 col-12 ms-auto mb-5 mb-lg-0">
                            <div class="contact-info-wrap">
                                <h2>Get in touch</h2>

                                <div class="contact-image-wrap d-flex flex-wrap">
                                    <img src={avatar1} class="img-fluid avatar-image" alt=""/>

                                    <div class="d-flex flex-column justify-content-center ms-3">
                                        <p class="mb-0">Karmegam Nishanthan</p>
                                        <p class="mb-0"><strong>Co-Founder & CEO</strong></p>
                                    </div>
                                </div>

                                <div class="contact-info">
                                    <h5 class="mb-3">Contact Infomation</h5>

                                    <p class="d-flex mb-2">
                                        <i class="bi-geo-alt me-2"></i>
                                        36, Farm Road, Uppuveli, Trincomalee, Sri Lanka
                                    </p>

                                    <p class="d-flex mb-2">
                                        <i class="bi-telephone me-2"></i>

                                        <a href="tel: 0094 772927516">
                                            0094 772927516
                                        </a>
                                    </p>

                                    <p class="d-flex">
                                        <i class="bi-envelope me-2"></i>

                                        <a href="mailto:info@eegaisrilanka.org">
                                            info@eegaisrilanka.org
                                        </a>
                                    </p>

                                    <a href="#" class="custom-btn btn mt-3">Get Direction</a>
                                </div>
                            </div>
                        </div>

                        <div class="col-lg-5 col-12 mx-auto">
                            <form class="custom-form contact-form" action="#" method="post" role="form">
                                <h2>Contact form</h2>

                                <p class="mb-4">Or, you can just send an email:
                                    <a href="#">info@eegaisrilanka.org</a>
                                </p>
                                <div class="row">
                                    <div class="col-lg-6 col-md-6 col-12">
                                        <input type="text" name="first-name" id="first-name" class="form-control" placeholder="Jack" required/>
                                    </div>

                                    <div class="col-lg-6 col-md-6 col-12">
                                        <input type="text" name="last-name" id="last-name" class="form-control" placeholder="Doe" required/>
                                    </div>
                                </div>

                                <input type="email" name="email" id="email" pattern="[^ @]*@[^ @]*" class="form-control" placeholder="Jackdoe@gmail.com" required/>

                                <textarea name="message" rows="5" class="form-control" id="message" placeholder="What can we help you?"></textarea>

                                <button type="submit" class="form-control">Send Message</button>
                            </form>
                        </div>

                    </div>
                </div>
            </section>


  </div>
  );
};

export default Contact;
