import React from "react";
import { useNavigate } from "react-router-dom";
import imgPlaceholder from "../img/no-image.jpg";
import { IMG_URL } from "../config";

const ServiceCard = ({ posts }) => {
  const navigate = useNavigate();

  function truncateText(text, maxLength) {
    if (text.length > maxLength) {
      return text.slice(0, maxLength - 3) + "...";
    }
    return text;
  }

  function stripHtmlTags(htmlString) {
    const tempElement = document.createElement("div");
    tempElement.innerHTML = htmlString;
    return tempElement.textContent || tempElement.innerText || "";
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {posts?.length > 0 &&
        posts?.filter((item) => item.isActive).map((post, index) => (
          <div
            key={index}
            className="bg-white shadow-md p-4 cursor-pointer transition-transform transform hover:scale-105"
            onClick={() => navigate(`/service/${post?._id}`)}
          >
            <div className="w-full h-48 md:h-64 overflow-hidden">
              <img
                src={
                  post?.images[0]
                    ? `${IMG_URL}/images/${post?.images[0]}`
                    : imgPlaceholder
                }
                alt="Product Thumbnail"
                className=" w-full h-full"
              />
            </div>
            <div className="mt-4">
              <h3 className="text-xl font-semibold">
                {truncateText(post?.name.trim(), 30)}
              </h3>
              <p className="text-gray-600">
                {truncateText(stripHtmlTags(post?.description), 180)}
              </p>
            </div>
            <div className="mt-4">
              <button
                className="bg-blue-500 text-white w-full py-2 rounded hover:bg-blue-700"
                onClick={() => navigate(`/service/${post?._id}`)}
              >
                Know More
              </button>
            </div>
          </div>
        ))}
    </div>
  );
};

export default ServiceCard;
