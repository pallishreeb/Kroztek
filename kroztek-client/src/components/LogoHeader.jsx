import React from "react";
import Logo from "../img/logo-cg.png";
import Logo2 from "../img/abc.png";
import Logo3 from "../img/bcd.jpeg"
import "../css/logoHeader.css"; // Import the CSS file
function Header() {
  return (
    <div className="header-container">
      {" "}
      {/* Use the CSS class names */}
      <div className="logo-container">
        <img src={Logo} alt="Logo" className="logo-img" />
      </div>
      <div className="logo-container">
        <img src={Logo2} alt="Logo" className="logo-img" style={{width:'200px', height:'150px'}} />
      </div>
      <div className="logo-container">
        <img src={Logo3} alt="Logo" className="logo-img" style={{width:'100px', height:'180px'}} />
      </div>
      </div>
  );
}

export default Header;
