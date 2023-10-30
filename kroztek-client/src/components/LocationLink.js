import React from "react";
import { EnvironmentOutlined  } from "@ant-design/icons";
function LocationLink({size}) {
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
      {size === "big" ? 
     <p>
     <a href="#" onClick={handleOpenLocation}>
     <span className="contact-info">
       <p><b className="heading">LOCATION <EnvironmentOutlined/></b>  <br/>
       113, Gayatrinagar,Nuasasan
       <br/>
        759001, Dhenkanal, Odisha</p>
     </span>
     </a>
   </p>
   :
   <p>
   <a href="#" onClick={handleOpenLocation}>
   <span className="contact-info">
     <p><b className="heading">LOCATION <EnvironmentOutlined/> </b> </p>
   </span>
   </a>
 </p>  
    }
     
    </div>
  );
}

export default LocationLink;
