/** @format */

import React, { useEffect, useState, useContext } from "react";
import authContext from "../context";
import { AllPosts} from "../networkCalls/post";
import { getMetadata } from "../networkCalls/metadata";
import { Pagination, Skeleton } from "antd";
import { usePostApi } from "../context/PostProvider";
import BlogCard from "../components/BlogCard";
import { toast } from "react-toastify";
import Hero from "../components/Hero";

function Home() {
  const { token } = useContext(authContext);
  const { state, dispatch } = usePostApi();
  const { posts } = state;
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 12;

  // const [metadatas, setMetadatas] = useState({})
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const getMeta = () => {
      setLoading(true);
      getMetadata()
        .then((res) => {
          // console.log("fetched metadata", metadatas)
          dispatch({
            type: "FETCH_METADATA",
            payload: res.data.response[0],
          });
          setLoading(false);
        })
        .catch((error) => {
          console.log("Error  in fetching data", error);
        });
    };
    const getData = async () => {
      setLoading(true);
      AllPosts().then((res) => {
        dispatch({
          type: "FETCH_POSTS",
          payload: res,
        });
        setLoading(false);
      }).catch(error => {
        toast.error("We Some Issue In Fetching Posts")
        console.log(error, "error in fetching posts")
      })
    };

    getMeta();
    getData();
  }, [dispatch]);

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
      <div className="home-container">
         <Hero />
        <section class="recent-posts">
          <Skeleton active loading={loading}>
            <div
              class="section-title"
              style={{
                margin: "auto 16px",
              }}
            >
              <h2 id="all-stories">
                <span>All Products</span>
              </h2>
            </div>

            <BlogCard token={token} posts={postsToRender} postLoading={loading} />
            <Pagination
              current={currentPage}
              pageSize={pageSize}
              total={totalPageCount}
              onChange={onPageChange}
            />
          </Skeleton>


        </section>
      </div>
    </>
  );
}

export default Home;
