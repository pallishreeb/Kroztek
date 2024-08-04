import React, { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import { singlePost, relatedPost } from "../networkCalls/products";
import { IMG_URL } from "../config";
import ProductCard from "../components/ProductCard";
import imgPlaceholder from "../img/no-image.jpg";
import { useAuthApi } from "../context/authState";

function ProductDetails() {
  const params = useParams();
  const { pathname } = useLocation();
  const { id } = params;
  const [post, setPost] = useState({});
  const { addToCart } = useAuthApi();
  const [relatedPosts, setRelatedPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [previewImage, setPreviewImage] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      const res = await singlePost(id);
      setPost(res?.data);
      setLoading(false);
    };

    const relatedData = async () => {
      setLoading(true);
      const res = await relatedPost(id);
      const rPost = res?.data.filter((element) => element._id !== id);
      setRelatedPosts(rPost);
      setLoading(false);
    };

    if (id) {
      getData();
      relatedData();
    }
  }, [id]);

  const handleThumbnailClick = (index) => {
    setCurrentImageIndex(index);
    setPreviewImage(null);
  };

  const handleLargeImageClick = () => {
    setPreviewImage(post?.images[currentImageIndex]);
  };

  const closeImagePreview = () => {
    setPreviewImage(null);
  };

  const currentImage =
    post?.images?.length > 0
      ? `${IMG_URL}/images/${post.images[currentImageIndex]}`
      : imgPlaceholder;

  const handleAddToCart = (product) => {
    addToCart(product);
  };

  return (
    <div className="container mx-auto p-8 md:w-2/3">
      <div className="flex flex-col md:flex-row">
        {/* Image Section */}
        <div className="p-2 w-full md:w-1/2">
          <div className="mb-4">
            <img
              src={currentImage}
              alt="Product"
              className="object-fit border border-gray-300 cursor-pointer"
              style={{ width: "370px", height: "333px" }}
              onClick={handleLargeImageClick}
            />
          </div>
          {post?.images?.length > 0 && (
            <div className="flex overflow-x-auto mt-2">
              {post?.images?.map((item, index) => (
                <img
                  key={index}
                  src={`${IMG_URL}/images/${item}`}
                  alt="Thumbnail"
                  className={`w-24 h-24 object-cover border border-gray-300 m-1 cursor-pointer ${
                    currentImageIndex === index ? "border-blue-500" : ""
                  }`}
                  onClick={() => handleThumbnailClick(index)}
                />
              ))}
            </div>
          )}
        </div>

        {/* Features and Add to Cart Section */}
        <div className="p-2 w-full md:w-1/2">
          <div className="mb-4">
            {post?.features?.length > 0 && (
              <div>
                <h2 className="text-md font-bold mb-2">{post?.name}</h2>
                <h3 className="text-xl mb-2">Features</h3>
                <ul className="list-disc pl-4">
                  {post?.features?.map((feature, index) => (
                    <li key={index}>
                      <span>{feature.name}:</span> {feature.value}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            <div className="mt-4">
              <button
                className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700"
                onClick={() => handleAddToCart(post)}
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Product Details Section */}
      <div className="md:w-3/4 flex flex-row justify-center">
        <div className="mb-4 product-details">
          <h6>Description</h6>
          <hr/>
          <h5 className="font-bold">{post?.name}</h5>
          <div className="mb-4">
            <ul className="list-disc pl-4">
              {post?.features?.map((feature, index) => (
                <li key={index}>
                  <span>{feature.name}:</span> {feature.value}
                </li>
              ))}
            </ul>
            <div
              dangerouslySetInnerHTML={{ __html: post?.description }}
              className="mt-2"
            ></div>
          </div>

          {post?.documents?.length > 0 && (
            <div className="mb-4">
              <h3 className="text-xl font-semibold">Product Documents:</h3>
              <ul className="list-disc pl-4">
                {post?.documents?.map((document, index) => (
                  <li key={index}>
                    <a
                      href={`${IMG_URL}/docs/${document}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-500 hover:underline"
                    >
                      {document}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
      {relatedPosts?.length > 0 && (
        <div className="mb-4">
          <h3 className="text-xl font-semibold text-center">
            Related Products
          </h3>
          <ProductCard products={relatedPosts} />
        </div>
      )}

      {/* Image Preview Modal */}
      {previewImage && (
        <div
          className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-80 z-50"
          onClick={closeImagePreview}
        >
          <img
            src={`${IMG_URL}/images/${previewImage}`}
            alt="Preview"
            className="max-h-full max-w-full"
          />
        </div>
      )}
    </div>
  );
}

export default ProductDetails;
