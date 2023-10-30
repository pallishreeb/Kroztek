/** @format */

import "../css/card.css";
import { useNavigate } from "react-router-dom";
import imgPlaceholder from "../img/no-image.jpg";

import {IMG_URL}  from "../config"

const BlogCard = ({ posts }) => {
  const navigate = useNavigate();

  const navigateToDetails = (id) => navigate(`/post/${id}`);

  function truncateText(text, maxLength) {
    if (text.length > maxLength) {
      return text.slice(0, maxLength - 3) + '...';
    }
    return text;
  }
  
  function stripHtmlTags(htmlString) {
    const tempElement = document.createElement("div");
    tempElement.innerHTML = htmlString;
    return tempElement.textContent || tempElement.innerText || "";
  }
  return (
    <div className="custom-card-grid">
      {posts?.length > 0 &&
        posts?.filter((item) => item.isActive).map((post, index) => (
       
            <div key={index} className="blog-card" onClick={() => navigateToDetails(post?._id)}>
              <div
                className="card-image"
              >

                <img
                  src={ post?.images[0] ? `${IMG_URL}/images/${post?.images[0]}` :imgPlaceholder}
                  alt="Blog Thumbnail"
                />
              </div>
              <div className="card-content">
                <h3>
                  {truncateText(post?.name.trim(), 30)}
                </h3>
                <p
                  className="blog-details"
                >
                 <div>{truncateText(stripHtmlTags(post?.description), 180)}</div>
                </p>
                {/* <div className="card-info">
                  <span className="blog-date">
                    {" "}
                    {new Date(post?.createdAt).toLocaleString("en-GB", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                      hour: "numeric",
                      minute: "numeric",
                    })}
                  </span>

                  {savedPosts?.length > 0 && isSaved(post?._id) === true ? (
                    <HeartFilled
                      onClick={() => removeSavedPostId(post?._id)}
                      className="save-icon"
                      style={{ fontSize: "24px", color: "#001529" }}
                    />
                  ) : (
                    <HeartOutlined
                      onClick={() => savePostForUser(post?._id)}
                      className="save-icon"
                      style={{ fontSize: "24px", color: "#001529" }}
                    />
                  )}
                </div> */}
              </div>
            </div>
          
        ))}
    </div>
  );
};

export default BlogCard;
