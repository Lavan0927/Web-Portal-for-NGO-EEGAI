import React from 'react';
 import NavBar from './NavBar';
import Footer from './Footer';
// import SiteHeader from './SiteHeader';
import Carousal from './Carousal';
import Icons from './icons';
// import CarousalTemp from './CarousalTemp';
import Ourcauses from './OurCauses';
import Contact from './Contact';
// import NavBarTemp from './NavBarTemp';
import HeaderTemp from './HeaderTemp';
import OurStory from './OurStory';
import AboutTeam from './AboutTeam';
import MakeImpact from './MakeImpact';
import BecomeAVolunteer from './BecomeAVolunteer';
import Testimonials from  './Testimonials';
import NavBarTest from './NavBarTest';
// import CarouselTemp from './CarouselTemp';
import CarousalTemp from './CarousalTemp';
import Projects from './Projects';
import Events from './Activities';
import SiteHeaderTemp from './SiteHeaderTemp';
import WhatWeDo from './WhatWeDo';
import TeamMembers from './TeamMembers';
import PageNotFound from './PageNotFound';
import TestimonialTemp from './TestimonialTemp';
import Partners from './Partners';

const Home = () => {

  return (
    <div>
      {/* <SiteHeader /> */}
      <HeaderTemp />
      {/* <NavBar /> */}
      {/* <SiteHeaderTemp /> */}
      <NavBarTest/>
      {/* <NavBarTemp /> */}
       <Carousal /> 
      {/* <CarousalTemp />  */}
      {/* <CarouselTemp  /> */}
      <Icons />  
      <OurStory />  
      <Partners />
      <AboutTeam />
      <TeamMembers />
      <MakeImpact />
      <Ourcauses /> 
      <WhatWeDo />

      {/* <PageNotFound /> */}
      {/* <Projects />
      <Events /> */}
      {/* <BecomeAVolunteer /> */}
      {/* <Testimonials /> */}
      {/* <TestimonialTemp /> */}
      <Contact />   
      <Footer />
    </div>
  );
};

export default Home;
