import React from "react";
import "../css/Header.css"; 
import LocationLink from "./LocationLink";
function Header() {
  return (
    <div className="header-container">
      <div className="small-screen-gst">
      <span className="contact-info">
          <p>
            <b className="heading">GSTIN :  21EOUPS1807D1ZX</b>

             </p>
        </span>
      </div>
      <div className="contact-container">
      <span className="contact-info">
          <p>
            <b className="heading">GSTIN :</b>
            <br />
            21EOUPS1807D1ZX
          </p>
        </span>
        <span className="contact-info">
          <p>
            <b className="heading">CALL US  <i className="fa fa-phone"></i></b>
            <br />
            <a href="tel:+918637214899"> +918637214899</a>
          </p>
        </span>
        <span className="contact-info">
          <p>
            <b className="heading">EMAIL US{" "}  <i className="fa fa-envelope"></i>   </b> <br />
            <a
              href={`mailto:${"kroztekintegratedsolution@gmail.com"}?subject=Email%20Subject&body=Hello%2C%20I%20want%20to%20email`}
            >
              kroztekintegratedsolution@gmail.com
            </a>
          </p>
        </span>

        <LocationLink size={"big"} />
      </div>
      <div className="small-screen">
        <span className="contact-info">
          <p>
            {" "}
            <b className="heading">
              {" "}
              CALL US{" "}
              <a href="tel:+918637214899">
              <i className="fa fa-phone"></i>
              </a>
            </b>{" "}
          </p>
        </span>
        <span className="contact-info">
          <p>
            {" "}
            <b className="heading">
              {" "}
              EMAIL US
              <a
                href={`mailto:${"kroztekintegratedsolution@gmail.com"}?subject=Email%20Subject&body=Hello%2C%20I%20want%20to%20email`}
              >{" "}
               <i className="fa fa-envelope"></i> 
              </a>
            </b>
          </p>
        </span>
        <LocationLink size={"small"} />
      </div>
    </div>
  );
}

export default Header;
