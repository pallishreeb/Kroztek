import React from "react";
import hero from "../img/hero3.jpg";

const BusinessDescription = () => {
  return (
    <div className="py-6 px-4 md:px-8 text-center">
      <h2 className="text-2xl md:text-3xl font-semibold mb-4">Our Business</h2>
      <p className="text-gray-600 text-sm md:text-base mb-4">
        At Kroztek Integrated Solution, we excel in providing a seamless blend
        of cutting-edge industrial electrical products and expert services. With
        a relentless commitment to innovation and reliability, we serve as your
        trusted partner in powering industrial excellence.
      </p>
      <img
        src={hero}
        alt="Business info"
        className="mx-auto max-w-full h-auto rounded-md"
      />
    </div>
  );
};

export default BusinessDescription;
