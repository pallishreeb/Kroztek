import React from "react";
import Logo from "../img/logo-cg.png";
import "../css/Header.css"; // Import the CSS file

function Header() {
  return (
    <div className="header-container"> {/* Use the CSS class names */}
      <div className="logo-container">
        <img src={Logo} alt="Logo" className="logo-img" />
      </div>
      <div className="contact-container">
        <span className="contact-info">
          <p>CALL US<br />+918637214899</p>
        </span>
        <span className="contact-info">
          <p>EMAIL US<br />kroztekintegratedsolution@gmail.com</p>
        </span>
        <span className="contact-info">
          <p>LOCATION <br />Plot No. 1983/4085, Badasathiabatia, 
          <br/>
          Near SaiShree Eye Hospital, 759001, Dhenkanal, Odisha</p>
        </span>
      </div>
    </div>
  );
}

export default Header;
