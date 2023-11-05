import React from "react";
import { Link } from "react-router-dom";
import Logo from "../img/cgg.png";
import Logo2 from "../img/logo-2.webp";
import Logo3 from "../img/bcd.jpeg"
import "../css/logoHeader.css"; // Import the CSS file
function Header() {
  return (
    <>
    <h1 className="text-2xl font-semibold  text-center mt-5">Our Business Partners</h1>
    <div className="header-container mb-3">
      
      {/* Use the CSS class names */}
      <div className="logo-container p-3">
      <Link to="/products/CG">
      <img src={Logo} alt="Logo" className="logo-img"  style={{height: "200px", width:"300px"}}/>
      </Link>

      </div>
      <div className="logo-container p-3">
      <Link to="/products/Sovereign">
      <img src={Logo2} alt="Logo" className="logo-img" style={{height: "150px", width:"150px"}} />
      </Link>
       
      </div>
      <div className="logo-container p-3">
      <Link to="/products/OLI">
      <img src={Logo3} alt="Logo" className="logo-img" style={{height: "250px", width:"180px"}}/>
      </Link>
       
      </div>
      </div>
    </>
 
  );
}

export default Header;
