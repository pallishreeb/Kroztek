import React from "react";
function LocationLink({ size }) {
  const latitude = 20.66249607748869;
  const longitude = 85.59409979447742;

  const handleOpenLocation = () => {
    // Construct the Google Maps URL with the coordinates
    const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`;

    // Open the URL in a new window or tab
    window.open(googleMapsUrl, "_blank");
  };

  return (
    <div>
      {size === "big" ? (
        <p>
          <span className="contact-info" onClick={handleOpenLocation}>
            <p>
              <b className="heading">LOCATION &#128205;</b>
              <br />
              759001, Dhenkanal, Odisha
            </p>
          </span>
        </p>
      ) : (
        <p>
          <span className="contact-info" onClick={handleOpenLocation}>
            <p>
              <b className="heading">LOCATION &#128205; </b>{" "}
            </p>
          </span>
        </p>
      )}
    </div>
  );
}

export default LocationLink;
