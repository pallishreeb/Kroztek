/** @format */
import React, { useState, useEffect, useContext } from "react";
import "../css/post.css";
import {useParams, useLocation, useNavigate } from "react-router-dom";
import authContext from "../context";
import { singlePost, relatedPost } from "../networkCalls/products";
import { Carousel, Skeleton } from "antd";
// import { CalendarOutlined, EyeOutlined } from "@ant-design/icons";
import { Modal, Image } from "antd";
import ServiceCard from "../components/ServiceCard";
import { IMG_URL } from "../config";
const contentStyle = {
  color: "#fff",
  lineHeight: "160px",
  height: "400px",
  textAlign: "center",
  background: "#000",
  position: "relative",
};

function ProductDetails() {
  const params = useParams();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { id } = params;
  const { token } = useContext(authContext);
  const [post, setpost] = useState({});
  const [relatedPosts, setRelatedPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [currentImage, setCurrentImage] = useState(null);

  const openModal = (image) => {
    setCurrentImage(image);
    setModalVisible(true);
  };

  const closeModal = () => {
    setCurrentImage(null);
    setModalVisible(false);
  };
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

  const modifyDocumentName = (document, i) => {
    let index = i + 1;
    const filename = `${post?.name}-${document}-${index}`;
    const parts = filename.split("-");
    const lastIndex = parts.length - 2;
    return (
      parts.slice(0, lastIndex).join("-") +
      `-${index}` +
      parts[lastIndex].substring(parts[lastIndex].lastIndexOf("."))
    );
  };

  return (
    <>
      {pathname !== "/" && (
        <button className=" btn btn-link" onClick={() => navigate(-1)}>
          {" "}
          Go Back
        </button>
      )}
      <div className="container">
        {/* Blog details content */}
        <div className="blog-content" style={{ marginTop: "25px" }}>
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
                      className="d-block w-100 h-100 img"
                      onClick={() => openModal(item)}
                    />
                  </div>
                ))}
            </Carousel>
            <Modal
          visible={modalVisible}
          onCancel={closeModal}
          footer={null}
          centered
        >
          <Image src={`${IMG_URL}/images/${currentImage}`} alt="Maximized Image" />
        </Modal>
          </Skeleton>
          {/* top content like date share and title */}
          {/* <Skeleton active loading={loading} paragraph={{ rows: 2 }}>
            <div className="mainheading">
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
              </div>
            </div>
          </Skeleton> */}
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
                <h3>Features</h3>
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
            <b style={{ marginTop: "15px" }}>Product Description</b>
            {/* <p>{post?.description}</p> */}
            <div dangerouslySetInnerHTML={{ __html: post?.description }}></div>
          </Skeleton>
          {/* ags like category and subcategory */}
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
                      style={{ textDecoration: "none", color: "blueviolet" }}
                    >
                      {modifyDocumentName(document, index)}
                    </a>
                    {/* Download button */}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
        {/* Related contents */}
        <Skeleton active loading={loading} paragraph={{ rows: 3 }}>
          <div classNameName="related-content">
            <div className="container">

              {relatedPosts?.length > 0 && (
               <>
               <h3 className="text-center" style={{marginTop:"10px"}}>Related Products</h3>
                 <ServiceCard posts={relatedPosts} token={token} />
               </>
              )}
            </div>
          </div>
        </Skeleton>
      </div>
    </>
  );
}

export default ProductDetails;
