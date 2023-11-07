import React from "react";
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
    <footer className="bg-blue-900 text-white ">
      <div className="container mx-auto p-4">
        <div className="grid grid-cols-1 text-center">
          {/* Contact Us */}
          <div>
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
                <strong>Office Location:</strong> &#128205;{" "}
                <span onClick={handleOpenLocation} className="cursor-pointer">
                  113, Gayatrinagar, Nuasasan
                  <br />
                  Near Saishree Eye Hospital, 759001, Dhenkanal, Odisha
                </span>
              </li>
              <li>
                <strong>Call Us at:</strong>{" "}
                <a href="tel:+918637214899">
                  <i className="fa fa-phone"></i>+918637214899
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="text-center mt-4">
          <p className="text-sm">
            &copy; {new Date().getFullYear()} Kroztek Integrated Solution. All
            rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default AppFooter;
