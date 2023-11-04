import React, { useEffect, useState } from "react";
import "../css/ScrollButton.css";

function ScrollButton() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Function to toggle the button's visibility
    const toggleButtonVisibility = () => {
      if (window.scrollY > 200) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    // Add an event listener to monitor the scroll position
    window.addEventListener("scroll", toggleButtonVisibility);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener("scroll", toggleButtonVisibility);
    };
  }, []);

  const scrollToSection = () => {
    // Function to scroll to the target section
    const targetSection = document.getElementById("target-section");
    if (targetSection) {
      targetSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <button
      id="scroll-button"
      className={isVisible ? "visible" : ""}
      onClick={scrollToSection}
    >
         <i className="fa fa-arrow-up" style={{ fontSize: "30px", color: "#1890ff" }} />
    </button>
  );
}

export default ScrollButton;
