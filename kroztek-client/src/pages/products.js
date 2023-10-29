/** @format */

import React, { useEffect, useState, useContext } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import authContext from "../context";
import { AllPosts } from "../networkCalls/post";
import { Pagination, Skeleton } from "antd";
import { usePostApi } from "../context/PostProvider";
import BlogCard from "../components/BlogCard";
import { toast } from "react-toastify";
import Carousel from "../components/Carousel";

function Products() {
  const { token } = useContext(authContext);
  const { categoryId, subcategoryId, name, subname } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const { state, dispatch } = usePostApi();
  const { posts } = state;
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 12;
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      AllPosts()
        .then((res) => {
          dispatch({
            type: "FETCH_POSTS",
            payload: res,
          });
          if (categoryId) {
            dispatch({
              type: "FILTER_POSTS_BY_CATEGORY",
              payload: categoryId,
            });
          } else if (subcategoryId) {
            dispatch({
              type: "FILTER_POSTS_BY_SUBCATEGORY",
              payload: subcategoryId,
            });
          }
          setLoading(false);
        })
        .catch((error) => {
          toast.error("We Some Issue In Fetching Posts");
          console.log(error, "error in fetching posts");
        });
    };

    getData();
  }, [categoryId, dispatch, subcategoryId]);

  const Clearfilters = () => {
    console.log("clear filter called");
    dispatch({
      type: "CLEAR_FILTERS",
    });
    navigate(-1);
  };

  const onPageChange = (page) => {
    setCurrentPage(page);
  };

  const totalPageCount = Math.ceil(posts?.length / pageSize);
  // Calculate the current page's data
  const offset = (currentPage - 1) * pageSize;
  const postsToRender = posts?.slice(offset, offset + pageSize);
  // Get the posts to render based on the current page and page size

  return (
    <>
      {location.pathname !== "/" && (
        <button className=" btn btn-link" onClick={() => Clearfilters()}>
          {" "}
          Go Back
        </button>
      )}
      <div className="home-container">
        <section>
          <Carousel />
        </section>

        <section class="recent-posts">
          <Skeleton active loading={loading}>
            <div
              class="section-title"
              style={{
                margin: "auto 16px",
              }}
            >
              <h2 id="all-stories">
                <span>
                  {" "}
                  {name ? name : subname ? subname : ""} All Products{" "}
                </span>
              </h2>
            </div>

            {postsToRender.length > 0 ? (
              <>
                <BlogCard
                  token={token}
                  posts={postsToRender}
                  postLoading={loading}
                />
                <Pagination
                  current={currentPage}
                  pageSize={pageSize}
                  total={totalPageCount}
                  onChange={onPageChange}
                />
              </>
            ) : (
              <h2 style={{ textAlign: "center" }}>No Data Available</h2>
            )}
          </Skeleton>
        </section>
      </div>
    </>
  );
}

export default Products;
