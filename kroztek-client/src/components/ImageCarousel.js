
import React, { useState ,useEffect,useCallback} from "react";
import { useNavigate } from "react-router-dom";
import "../css/ImageCarousel.css"; // Import your Tailwind CSS styles
import hero from "../img/Slider.png";
import hero2 from "../img/hero2.jpg";
import hero3 from "../img/hero3.jpg";


const ImageCarousel = () => {
  const images = [ hero3, hero2,hero]; // Replace with your image paths
  const [currentImage, setCurrentImage] = useState(0);
  const navigate = useNavigate();

  const navigateToDetails = () => navigate(`/products`);

  const nextImage = useCallback(() => {
    setCurrentImage((currentImage + 1) % images.length);
  },[currentImage, images.length]);

  const prevImage = () => {
    setCurrentImage((currentImage - 1 + images.length) % images.length);
  };

  useEffect(() => {
    // Automatically advance to the next image every 3 seconds
    const intervalId = setInterval(() => nextImage(), 3000);

    // Clean up the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, [currentImage,nextImage]);
  return (
    <div className="relative img-carousel">
      <img
        src={images[currentImage]}
        alt={`abc${currentImage + 1}`}
        className="w-full h-full object-cover"
      />

      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
        <h2 className="text-white text-2xl font-semibold mb-2">
        Innovative Electrical Solutions!
        </h2>
        <button button
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700"
          onClick={() => navigateToDetails()}
        >
           Explore
        </button>
      </div>

      <button className="prev-button" onClick={prevImage}>
        &#9664; {/* Unicode entity for left arrow */}
      </button>
      <button className="next-button" onClick={nextImage}>
        &#9654; {/* Unicode entity for right arrow */}
      </button>
    </div>
  );
};

export default ImageCarousel;


