/** @format */

import React, { useEffect, useState } from "react";
import { AllServices } from "../networkCalls/products";
import { Pagination, Skeleton } from "antd";
import { usePostApi } from "../context/PostProvider";
import ServiceCard from "../components/ServiceCard";
import { toast } from "react-toastify";
import Carousel from "../components/Carousel";

function Service() {
  const { state, dispatch } = usePostApi();
  const { services } = state;
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 12;
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      AllServices()
        .then((res) => {
          dispatch({
            type: "FETCH_SERVICES",
            payload: res,
          });
          setLoading(false);
        })
        .catch((error) => {
          toast.error("We Some Issue In Fetching Posts");
          console.log(error, "error in fetching posts");
        });
    };

    getData();
  }, [dispatch]);



  const onPageChange = (page) => {
    setCurrentPage(page);
  };

  const totalPageCount = Math.ceil(services?.length / pageSize);
  // Calculate the current page's data
  const offset = (currentPage - 1) * pageSize;
  const postsToRender = services?.slice(offset, offset + pageSize);
  // Get the posts to render based on the current page and page size

  return (
    <>
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
              <h2 style={{ fontSize:"1rem", marginTop:"10px" }}>
                   All Services{" "}
              </h2>
            </div>

            {postsToRender.length > 0 ? (
              <>
                <ServiceCard
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
              <h2 style={{ textAlign: "center" }}>No Service found.</h2>
            )}
          </Skeleton>
        </section>
      </div>
    </>
  );
}

export default Service;
