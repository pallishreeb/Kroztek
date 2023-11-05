import React from "react";
import {
  PhoneOutlined,
  MailOutlined
} from "@ant-design/icons";
import "../css/Header.css"; // Import the CSS file
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
            <b className="heading">CALL US   <PhoneOutlined /></b>
            <br />
            <a href="tel:+918637214899"> +918637214899</a>
          </p>
        </span>
        <span className="contact-info">
          <p>
            <b className="heading">EMAIL US{" "} <MailOutlined />  </b> <br />
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
                <PhoneOutlined />
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
                <MailOutlined />
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
