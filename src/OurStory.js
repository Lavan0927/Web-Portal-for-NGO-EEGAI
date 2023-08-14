import React from 'react';
import "/Users/lavanya/Desktop/eegai copy/src/css/bootstrap.min.css";
import "/Users/lavanya/Desktop/eegai copy/src/css/bootstrap-icons.css";
import "/Users/lavanya/Desktop/eegai copy/src/css/templatemo-kind-heart-charity.css";
import sdg from '/Users/lavanya/Desktop/eegai copy/src/images/SDG.png';

const OurStory = () => {

  return (
    <div>
        <section className="section-padding section-bg" id="section_2">
            <div className="container">
                <div className="row">

                    <div >

                        <div className="custom-text-box">
                            <center><h2 className="mb-2">About Us</h2></center>

                            <center><h5 className="mb-3">EEGAI, Non-Profit Organization</h5></center>

                            <center>
                            <p className="mb-0" style={{textAlign:'justify'}}>EEGAI, the youth-led non-profit organization, is dedicated to serving humanity and promoting an egalitarian mindset of equality. Since its founding in 2016 in a rural village in the Northern and Eastern provinces of Sri Lanka, EEGAI has embarked on a remarkable journey towards achieving the Sustainable Development Goals (SDGs).

Throughout its growth, EEGAI has become a renowned organization that strives to empower communities through various initiatives and projects. With a strong focus on sustainable development goals, EEGAI has made significant contributions in the fields of education, healthcare, and social cohesion. By addressing these critical areas, EEGAI aims to create a positive and lasting impact on individuals and communities.

Over the years, EEGAI's commitment to serving the community and promoting equality has garnered recognition and numerous accolades. Notably, the United Nations Development Program (UNDP) acknowledged the organization's outstanding efforts and awarded EEGAI a grant to launch its social enterprise. This prestigious grant serves as a testament to the dedication and hard work of EEGAI's team, as well as the effectiveness of their initiatives.

With the support of the UNDP grant, EEGAI has expanded its capacity to drive sustainable change and create a better future for all. By harnessing innovative approaches, collaborative partnerships, and community engagement, EEGAI continues to work tirelessly towards achieving the SDGs and building a more equitable society.

Through its journey, EEGAI remains steadfast in its mission to uplift livelihoods, promote equality, and contribute to sustainable development on a local and global scale. The organization's unwavering dedication and positive impact serve as an inspiration for others to join in the pursuit of a more inclusive and harmonious world.</p>
                            </center>

                        </div>

                        <div className="custom-text-box">
                            <center><h5 className="mb-3">Our Vision</h5></center>

                            <center>  
                                <p>To create a world where equality reigns and global advancement is achieved through innovative solutions, empowering individuals and communities to thrive, while uplifting livelihoods through education and skill development.</p>
                            </center>

                            <center><img src={sdg} alt="" class="custom-text-box-image img-fluid" /></center>
                        </div>

                        <div className="custom-text-box">
                            <center><h5 className="mb-3">Our Mission</h5></center>

                            <center>
                            <p>EEGAI's mission is to elevate equality and drive global advancement through innovative solutions. We empower individuals and communities by promoting equality in all aspects of life, breaking down barriers, advocating for social justice, and uplifting livelihoods through education and skill development. We strive to contribute to sustainable development and address pressing social, economic, and environmental challenges on a global scale. By fostering innovation, we inspire and support the development and implementation of transformative ideas, solutions, and technologies that improve lives and create a more equitable world for all.</p>
                            </center>
                        </div>

                    </div>

                </div>
            </div>
        </section>
    </div>
  );
};

export default OurStory;
