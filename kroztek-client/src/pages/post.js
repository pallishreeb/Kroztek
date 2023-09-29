/** @format */
import React, { useState, useEffect, useContext, useCallback } from "react";
import "../css/post.css";
import { Link, useParams, useLocation } from "react-router-dom";
import authContext from "../context";
import { singlePost, relatedPost } from "../networkCalls/post";
import { Carousel, Skeleton } from "antd";
import ListComments from "../components/ListComments";
import {
  CalendarOutlined,
  EyeOutlined,
  CommentOutlined,
} from "@ant-design/icons";
import BlogCard from "../components/BlogCard";
import Share from "../components/Share";
import { useCommentApi } from "../context/commentProvider";
import { IMG_URL } from "../config";
const contentStyle = {
  color: "#fff",
  lineHeight: "160px",
  height: "400px",
  textAlign: "center",
  background: "#000",
  position: "relative",
};
function Post() {
  const params = useParams();
  const { pathname } = useLocation();
  const { id } = params;
  const { token } = useContext(authContext);
  const [post, setpost] = useState({});
  const [relatedPosts, setRelatedPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const { state } = useCommentApi();
  const { comments } = state;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      singlePost(id).then((res) => {
        setpost(res?.data);
        setLoading(false);
      });
    };
    const relatedData = async () => {
      setLoading(true);
      relatedPost(id).then((res) => {
        let rPost = res?.data.filter((element) => element._id !== id);
        setRelatedPosts(rPost);
        setLoading(false);
      });
    };
    if (id) {
      getData();
      relatedData();
    }
  }, [id]);

  const scrollToComments = () => {
    const element = document.getElementById("comment-section");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };
  const renderDocumentLinks = () => {
    return post?.documents?.map((document, index) => (
      <div key={index}>
        <a href={document} target="_blank" rel="noopener noreferrer">
          View Document {index + 1}
        </a>
      </div>
    ));
  };
  return (
    <>
      <div className="container">
        {/* Blog details content */}
        <div className="blog-content">
          {/* top content like date share and title */}
          <Skeleton active loading={loading} paragraph={{ rows: 2 }}>
            <div className="mainheading">
              <Share post={post} />
              <div className="post-heading">
                <span className="post-date">
                  <CalendarOutlined />{" "}
                  {new Date(post?.createdAt).toLocaleString("en-GB", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                    hour: "numeric",
                    minute: "numeric",
                  })}
                </span>
                <span className="views">
                  <EyeOutlined /> {post?.views} views
                </span>
                <span className="comments" onClick={scrollToComments}>
                  <CommentOutlined /> {comments?.length} comments
                </span>
              </div>
            </div>
          </Skeleton>
          {/* blog carousel images */}
          <Skeleton active loading={loading} paragraph={{ rows: 3 }}>
            <Carousel autoplay effect="scrollx">
              {post?.images?.length > 0 &&
                post?.images?.map((item, i) => (
                  <div style={contentStyle} key={i}>
                    <img
                      style={{
                        maxHeight: "500px",
                      }}
                      src={`${IMG_URL}/images/${item}`}
                      alt="tn"
                      className="d-block w-100 img"
                    />
                  </div>
                ))}
            </Carousel>
          </Skeleton>
          <Skeleton active loading={loading} paragraph={{ rows: 1 }}>
            <div className="mainheading">
              <h1 className="posttitle">{post?.name}</h1>
            </div>
          </Skeleton>
          {/* products features */}
          <Skeleton active loading={loading} paragraph={{ rows: 4 }}>
            {/* Features table */}
            {post?.features?.length > 0 && (
              <div className="features-table">
                <h2>Features</h2>
                <table>
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Value</th>
                    </tr>
                  </thead>
                  <tbody>
                    {post?.features?.map((feature, index) => (
                      <tr key={index}>
                        <td>{feature.name}</td>
                        <td>{feature.value}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </Skeleton>

          {/* blog description */}
          <Skeleton active loading={loading} paragraph={{ rows: 4 }}>
            <p>{post?.description}</p>
          </Skeleton>
          {/* ags like category and subcategory */}
          <Skeleton active loading={loading} paragraph={{ rows: 1 }}>
            <div className="after-post-tags">
              <ul
                className="tags"
                style={{
                  display: "flex",
                  gap: "15px",
                  cursor: "pointer",
                  textDecoration: "none",
                }}
              >
                <Link
                  style={{ textDecoration: "none" }}
                  to={`/post/category/${post?.category?._id}`}
                >
                  <li>{post?.category?.categoryName}</li>
                </Link>
                {post?.subcategory && (
                  <Link
                    style={{ textDecoration: "none" }}
                    to={`/post/subcategory/${post?.subcategory?._id}`}
                  >
                    <li>{post?.subcategory?.subcategoryName}</li>
                  </Link>
                )}
              </ul>
            </div>
          </Skeleton>
   {/*  Documents preview */}
   {post?.documents?.length > 0 && (
              <div>
                <h3>Product Documents:</h3>
                <ul>
                  {post?.documents?.map((document, index) => (
                    <li key={index}>
                      <a
                        href={`${IMG_URL}/docs/${document}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ textDecoration: "none",color:'blueviolet' }}
                      >
                        {document}
                      </a>
                      {/* Download button */}

                    </li>
                  ))}
                </ul>
              </div>
            )}
          {/* List comments component */}

          <ListComments />
        </div>
        {/* Related contents */}
        <Skeleton active loading={loading} paragraph={{ rows: 3 }}>
          <div classNameName="related-content">
            <div className="container">
              <h3 className="text-center">Related Content</h3>

              {relatedPosts.length > 0 ? (
                <BlogCard posts={relatedPosts} token={token} />
              ) : (
                <p className="text-center">No Related Post Found</p>
              )}
            </div>
          </div>
        </Skeleton>
      </div>
    </>
  );
}

export default Post;
