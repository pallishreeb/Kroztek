import React,{useState} from "react";
import { useNavigate } from "react-router-dom";
import imgPlaceholder from "../img/no-image.jpg";
import { IMG_URL } from "../config";
import { useAuthApi } from "../context/authState";
import Modal from "./Modal";
const ProductCard = ({ products }) => {
  const navigate = useNavigate();
  const { addToCart } = useAuthApi();

  const [modalOpen, setModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");



  function truncateText(text, maxLength) {
    if (text.length > maxLength) {
      return text.slice(0, maxLength - 3) + "...";
    }
    return text;
  }

  // function stripHtmlTags(htmlString) {
  //   const tempElement = document.createElement("div");
  //   tempElement.innerHTML = htmlString;
  //   return tempElement.textContent || tempElement.innerText || "";
  // }

  const navigateToDetails = (id) => navigate(`/product/${id}`);

  // const addToCart = (product) => {
  //   // Fetch the existing cart from localStorage
  //   let cart = JSON.parse(localStorage.getItem("cart")) || [];

  //   // Check if the product is already in the cart
  //   const existingProduct = cart.find(item => item._id === product._id);

  //   if (existingProduct) {
  //     // Increase the quantity if the product is already in the cart
  //     existingProduct.quantity += 1;
  //   } else {
  //     // Add the new product to the cart
  //     cart.push({ ...product, quantity: 1 });
  //   }

  //   // Save the updated cart back to localStorage
  //   localStorage.setItem("cart", JSON.stringify(cart));

  //   console.log(`Product added to cart: ${product.name}`);
  // };
  const handleAddToCart = (product) => {
    addToCart(product);
    setModalMessage(`${product.name} added to cart!`);
    setModalOpen(true);
  };
  const getPrice = (features) => {
    const priceFeature = features.find(feature => feature.name.toLowerCase() === "price");
    return priceFeature ? priceFeature.value : "00";
  };

  return (
    <>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-4">
      {products?.map((product, index) => (
        <div
          key={index}
          className="border p-4 cursor-pointer relative bg-white rounded-lg shadow-sm"
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
              className="w-full h-40 object-cover rounded"
            />
          </div>
          <div className="text-sm  mb-1 textColor">
            {truncateText(product?.name.trim(), 30)}
          </div>
          <p className="text-gray-900 font-bold mb-2">
            {`₹${getPrice(product.features)}`}
          </p>
          <div className="mt-2 flex justify-between">
            <button
              className="borde py-1 px-2 rounded  productAddToCart "
              onClick={(e) => {
                e.stopPropagation();
                handleAddToCart(product)
              }}
            >
              Add to Cart
            </button>
          </div>
        </div>
      ))}
    </div>
    <Modal isOpen={modalOpen} onClose={() => setModalOpen(false)} message={modalMessage} />
    </>

  );
};

export default ProductCard;
