import React, { useState, useEffect }  from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import slide1 from '/Users/lavanya/Desktop/eegai copy/src/images/slide/medium-shot-people-collecting-donations.jpg';
import slide2 from '/Users/lavanya/Desktop/eegai copy/src/images/slide/volunteer-helping-with-donation-box.jpg';
import slide3 from '/Users/lavanya/Desktop/eegai copy/src/images/different-people-doing-volunteer-work.jpg';
import "./css/Carousal.css";

const Carousal = () => {

  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % 3);
    }, 3000); // Adjust the slide interval as needed (in milliseconds)

    return () => clearInterval(interval);
  }, []);

  return (
    <Carousel selectedItem={currentSlide}>
    <div>
        <img src={slide1} alt="Slide 1"  />
        {/* <p className="legend">Legend 1</p> */}
        <div className="legend">
          <h1>Educate A Child</h1>
          <p>Some description about Slide 1</p>
          <button>Learn More</button>
        </div>
    </div>
    <div>
        <img src={slide2} alt="Slide 2"  />
        {/* <p className="legend">Legend 2</p> */}
        <div className="legend">
          <h1>Help the needy</h1>
          <p>Some description about Slide 1</p>
          <button>Learn More</button>
        </div>
    </div>
    <div>
        <img src={slide3}  alt="Slide 3" />
        {/* <p className="legend">Legend 3</p> */}
        <div className="legend">
          <h1>Good health and well-being</h1>
          <p>Some description about Slide 1</p>
          <button>Learn More</button>
        </div>
    </div>
    <div>
        <img src={slide3}  alt="Slide 3" />
        {/* <p className="legend">Legend 3</p> */}
        <div className="legend">
          <h1>Respect for senior citizens</h1>
          <p>Some description about Slide 1</p>
          <button>Button 1</button>
        </div>
    </div>
    <div>
        <img src={slide3}  alt="Slide 3" />
        {/* <p className="legend">Legend 3</p> */}
        <div className="legend">
          <h1>Peace and social cohesion</h1>
          <p>Some description about Slide 1</p>
          <button>Button 1</button>
        </div>
    </div>
    <div>
        <img src={slide3}  alt="Slide 3" />
        {/* <p className="legend">Legend 3</p> */}
        <div className="legend">
          <h1>creating awareness</h1>
          <p>Some description about Slide 1</p>
          <button>Button 1</button>
        </div>
    </div>
    <div>
        <img src={slide3}  alt="Slide 3" />
        {/* <p className="legend">Legend 3</p> */}
        <div className="legend">
          <h1>Habitat for humanity</h1>
          <p>Some description about Slide 1</p>
          <button>Button 1</button>
        </div>
    </div>
    <div>
        <img src={slide3}  alt="Slide 3" />
        {/* <p className="legend">Legend 3</p> */}
        {/* <div className="legend">
          <h1>Slide 1</h1>
          <p>Some description about Slide 1</p>
          <button>Button 1</button>
        </div> */}
    </div>
    <div>
        <img src={slide3}  alt="Slide 3" />
        {/* <p className="legend">Legend 3</p> */}
        {/* <div className="legend">
          <h1>Slide 1</h1>
          <p>Some description about Slide 1</p>
          <button>Button 1</button>
        </div> */}
    </div>
    <div>
        <img src={slide3}  alt="Slide 3" />
        {/* <p className="legend">Legend 3</p> */}
        {/* <div className="legend">
          <h1>Slide 1</h1>
          <p>Some description about Slide 1</p>
          <button>Button 1</button>
        </div> */}
    </div>
    <div>
        <img src={slide3}  alt="Slide 3" />
        {/* <p className="legend">Legend 3</p> */}
        {/* <div className="legend">
          <h1>Slide 1</h1>
          <p>Some description about Slide 1</p>
          <button>Button 1</button>
        </div> */}
    </div>
    <div>
        <img src={slide3}  alt="Slide 3" />
        {/* <p className="legend">Legend 3</p> */}
        {/* <div className="legend">
          <h1>Slide 1</h1>
          <p>Some description about Slide 1</p>
          <button>Button 1</button>
        </div> */}
    </div>
    <div>
        <img src={slide3}  alt="Slide 3" />
        {/* <p className="legend">Legend 3</p> */}
        {/* <div className="legend">
          <h1>Slide 1</h1>
          <p>Some description about Slide 1</p>
          <button>Button 1</button>
        </div> */}
    </div>
    <div>
        <img src={slide3}  alt="Slide 3" />
        {/* <p className="legend">Legend 3</p> */}
        {/* <div className="legend">
          <h1>Slide 1</h1>
          <p>Some description about Slide 1</p>
          <button>Button 1</button>
        </div> */}
    </div>
    <div>
        <img src={slide3}  alt="Slide 3" />
        {/* <p className="legend">Legend 3</p> */}
        {/* <div className="legend">
          <h1>Slide 1</h1>
          <p>Some description about Slide 1</p>
          <button>Button 1</button>
        </div> */}
    </div>
    <div>
        <img src={slide3}  alt="Slide 3" />
        {/* <p className="legend">Legend 3</p> */}
        {/* <div className="legend">
          <h1>Slide 1</h1>
          <p>Some description about Slide 1</p>
          <button>Button 1</button>
        </div> */}
    </div>


    </Carousel>

  );
};

export default Carousal;
