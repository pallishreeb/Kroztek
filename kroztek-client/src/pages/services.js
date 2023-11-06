import React, { useEffect, useState } from "react";
import { AllServices } from "../networkCalls/products";
import { toast } from "react-toastify";
import ServiceCard from "../components/ServiceCard";
import Carousel from "../components/Carousel";

function Service() {
  const [services, setServices] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 12;
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      AllServices()
        .then((res) => {
          setServices(res);
          setLoading(false);
        })
        .catch((error) => {
          toast.error("We Some Issue In Fetching Posts");
          console.log(error, "error in fetching posts");
        });
    };

    getData();
  }, []);

  const onPageChange = (page) => {
    setCurrentPage(page);
  };

  const totalPageCount = Math.ceil(services?.length / pageSize);
  const offset = (currentPage - 1) * pageSize;
  const postsToRender = services?.slice(offset, offset + pageSize);

  return (
    <>
      <div className="home-container mx-auto">
        <section>
          <Carousel />
        </section>

        <section className="recent-posts">
          <div
            className="section-title"
            style={{
              margin: "auto 16px",
            }}
          >
            <h2 className="mt-2 text-2xl font-semibold mb-2 text-center">All Services</h2>
          </div>

          {postsToRender.length > 0 ? (
            <div className=" container mx-auto p-4">
              <ServiceCard posts={postsToRender} postLoading={loading} />
              <div className="pagination">
                {currentPage > 1 && (
                  <button
                    className="pagination-btn"
                    onClick={() => onPageChange(currentPage - 1)}
                  >
                    &lt; Previous
                  </button>
                )}
                {currentPage < totalPageCount && (
                  <button
                    className="pagination-btn"
                    onClick={() => onPageChange(currentPage + 1)}
                  >
                    Next &gt;
                  </button>
                )}
              </div>
            </div>
          ) : (
            <h2 style={{ textAlign: "center" }}>No Service found.</h2>
          )}
        </section>
      </div>
    </>
  );
}

export default Service;
