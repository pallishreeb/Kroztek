import React, { useEffect, useState } from "react";
import {  useNavigate } from "react-router-dom";
import { allSubCategories } from "../networkCalls/categories";
import { filterBySubCategory } from "../networkCalls/post";
import "../css/category.css";
import imgPlaceholder from "../img/no-image.jpg";

import { IMG_URL } from "../config";

function Category() {
  const navigate = useNavigate();
  const [expandedCategory, setExpandedCategory] = useState(null);
  const [loading, setLoading] = useState(false);
  const [categoriesData, setCategoriesData] = useState([]);
  const [products, setProducts] = useState([]);
  const [subcategoryId, setSubcategoryId] = useState("");
  const scrollToAllStories = () => {
    const element = document.getElementById("all-products");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };
  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      allSubCategories()
        .then((res) => {
          setCategoriesData(res);
          setLoading(false);
        })
        .catch((err) => {
          console.log("Error in fetch category", err);
        });
    };
    getData();
  }, []);

  useEffect(() => {
    if (subcategoryId) {
      setLoading(true);
      filterBySubCategory(subcategoryId).then((res) => {
        setProducts(res);
        setLoading(false);
      });
    }
  }, [subcategoryId]);



  const navigateToDetails = (id) => navigate(`/post/${id}`);

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
    <div className="min-h-screen category-container">
      <div className="md:w-1/4 p-4 bg-gray-200 border-r">
        {categoriesData.map((category, index) => (
          <div
            key={index}
            className="bg-gray-300 rounded-md p-2 mb-2"
          >
            <div
              className="cursor-pointer flex items-center justify-between"
              onClick={() =>
                setExpandedCategory(
                  expandedCategory === index ? null : index
                )
              }
            >
              <span>{category.name}</span>
              <span>
                {expandedCategory === index ? "-" : "+"}
              </span>
            </div>
            {expandedCategory === index && (
              <ul className="pl-4">
                {category.subcategories.length > 0 ? (
                  category.subcategories.map((subcategory, subIndex) => (
                    <li className="cursor-pointer"  key={subIndex}   onClick={() =>{
                        setSubcategoryId(subcategory?.subcategoryId)
                        scrollToAllStories()
                    }
                      }>{subcategory.subcategoryName}</li>
                  ))
                ) : (
                  <li>No subcategories</li>
                )}
              </ul>
            )}
          </div>
        ))}
      </div>
      <div className="md:flex-1 p-4 md:pl-8" id="all-products">
        {loading ? (
          <h2 className="text-center">Loading products...</h2>
        ) : (
          <>
            {products?.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {products?.map((product, index) => (
                  <div
                    key={index}
                    className="border p-4 cursor-pointer"
                    onClick={() => navigateToDetails(product.id)}
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
                  </div>
                ))}
              </div>
            ) : (
              <h2 className="text-center">{subcategoryId.trim() === "" ? "Selecte Any Category" : "No products Found."  }</h2>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default Category;
