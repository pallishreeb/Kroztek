import React from "react";
import "../css/Carousel.css"; // Import your CSS file for styling
import hero from "../img/Slider.png";
function Carousel() {
  return (
    <div className="hero-container">
      <img src={hero} alt="Hero" className="hero-image" />
      <div className="hero-text">
        <h1>Welcome to Kroztek Integrates Solution</h1>
        <p>Industrial Business</p>
      </div>
    </div>
  );
}

export default Carousel;
