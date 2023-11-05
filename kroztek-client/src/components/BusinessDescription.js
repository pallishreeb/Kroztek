import React from 'react';
import hero from "../img/hero3.jpg";

const BusinessDescription = () => {
  return (
    <div className="py-6 px-4 md:px-8 text-center">
      <h2 className="text-2xl md:text-3xl font-semibold mb-4">Our Business</h2>
      <p className="text-gray-600 text-sm md:text-base mb-4">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam facilisis justo nec lectus
        fermentum, non scelerisque odio ultrices. Suspendisse potenti. Vivamus auctor urna ac
        vehicula. Sed in lectus at urna consectetur posuere in eget ipsum.
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
