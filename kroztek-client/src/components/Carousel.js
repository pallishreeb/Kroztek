import React from "react";
import "../css/Carousel.css"; // Import your CSS file for styling
import hero from "../img/Slider.png";
function Carousel() {
  return (
    <div className="hero-container">
      <img src={hero} alt="Hero" className="hero-image" />
      <div className="hero-text">
        <h1>Industrial Business Solution</h1>
      </div>
    </div>
  );
}

export default Carousel;
