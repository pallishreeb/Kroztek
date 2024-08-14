import React from "react";
import {Link} from "react-router-dom"
import "../css/footer.css";

function AppFooter() {
  const latitude = 20.66249607748869;
  const longitude = 85.59409979447742;

  const handleOpenLocation = () => {
    // Construct the Google Maps URL with the coordinates
    const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`;

    // Open the URL in a new window or tab
    window.open(googleMapsUrl, "_blank");
  };

  return (
<footer className="bg-blue-900 text-gray-300">
  <div className="container md:w-1/2 mx-auto p-4">
    <div className="grid grid-cols-1 md:grid-cols-3 md:gap-2 lg:gap-1 justify-center text-left md:text-left ">
      {/* Term and Condition */}
      <div className="mb-4">
        <ul>
        <li>
        <Link
              to={`/faq`}
            >
          ❓ FAQs
          </Link>
          </li> 
          <li>
            <Link
              to={`/terms-and-condition`}
            >
               📄  Term and Condition
            </Link>
          </li>
          <li>
            <Link
              to={`/privacy-policy`}
            >
              🔒 Privacy Policy
            </Link>
          </li>
         
        </ul>
      </div>

      {/* Contact Us */}
      <div className="mb-4">
        <ul>
          <li>
            <a
              href={`https://wa.me/+918637214899/?text=Hello%2C%20I%20want%20to%20chat`}
            >
              <i className="fa fa-whatsapp"></i> Chat via WhatsApp
            </a>
          </li>
          <li>
            <a
              href={`mailto:kroztekintegratedsolution@gmail.com?subject=Email%20Subject&body=Hello%2C%20I%20want%20to%20email`}
            >
              <i className="fa fa-envelope"></i> Contact Via Email
            </a>
          </li>
          <li>
            
            <a href="tel:+918637214899">
              <i className="fa fa-phone"></i> Ring at +918637214899
            </a>
          </li>
        </ul>
      </div>

      {/* Location */}
      <div className="mb-4">
        <ul>
          <li>
            <strong>Office Location:</strong> 
            <span onClick={handleOpenLocation} className="cursor-pointer">
            &#128205;{" "} 113, Gayatrinagar, Nuasasan
              <br />
              Near Saishree Eye Hospital, 759001, Dhenkanal, Odisha
            </span>
          </li>
        </ul>
      </div>
    </div>

    <div className="text-center mt-4">
      <p className="text-sm text-gray-100">
        &copy; {new Date().getFullYear()} Kroztek Integrated Solution. All
        rights reserved.
      </p>
    </div>
  </div>
</footer>


  );
}

export default AppFooter;
