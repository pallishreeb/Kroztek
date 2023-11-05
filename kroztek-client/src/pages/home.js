/** @format */

import React from "react";
import ImageCarousel from "../components/ImageCarousel";
import LogoHeader from "../components/LogoHeader"

function Home() {
  return (
    <>
      <div className="home-container">
         <ImageCarousel/>
         <LogoHeader />
      </div>
    </>
  );
}

export default Home;
