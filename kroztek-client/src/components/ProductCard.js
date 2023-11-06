import React from "react";
import { useNavigate } from "react-router-dom";
import imgPlaceholder from "../img/no-image.jpg";
import { IMG_URL } from "../config";

const ProductCard = ({ products }) => {
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
  const navigateToDetails = (id) => navigate(`/product/${id}`);
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {products?.map((product, index) => (
        <div
          key={index}
          className="border p-4 cursor-pointer relative"
          onClick={() => navigateToDetails(product?._id)}
        >
          <div className="mb-2">
            <img
              src={
                product?.images[0]
                  ? `${IMG_URL}/images/${product?.images[0]}`
                  : imgPlaceholder
              }
              alt={product.name}
              className="w-full h-auto"
            />
          </div>
          <div className="text-lg font-bold">
            {truncateText(product?.name.trim(), 30)}
          </div>
          <p className="text-gray-600">
            {truncateText(stripHtmlTags(product?.description), 180)}
          </p>
          <div className="mt-4">
            <button
              className="bg-blue-500 text-white w-full py-2 rounded hover:bg-blue-700"
              onClick={() => navigate(`/service/${product?._id}`)}
            >
              Know More
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductCard;
