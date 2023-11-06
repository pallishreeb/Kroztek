import React, { useState, useEffect, useContext } from "react";
import { useParams, useLocation } from "react-router-dom";
import authContext from "../context";
import { singleService, relatedServices } from "../networkCalls/products";
import ServiceCard from "../components/ServiceCard";
import { IMG_URL } from "../config";
import imgPlaceholder from "../img/no-image.jpg";

function ServiceDetails() {
  const params = useParams();
  // const navigate = useNavigate();
  const { pathname } = useLocation();
  const { id } = params;
  const { token } = useContext(authContext);
  const [post, setPost] = useState({});
  const [relatedPosts, setRelatedPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);

  const openImagePreview = (image) => {
    setPreviewImage(image);
  };

  const closeImagePreview = () => {
    setPreviewImage(null);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      singleService(id).then((res) => {
        setPost(res?.data);
        setLoading(false);
      });
    };

    const relatedData = async () => {
      setLoading(true);
      relatedServices(id).then((res) => {
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
    <div className="container mx-auto p-4">
      {/* {pathname !== "/" && (
        <button
          className="btn btn-link block mb-4"
          onClick={() => navigate(-1)}
        >
          Go Back
        </button>
      )} */}
      <div className="blog-content container mx-auto p-6">
        {loading ? (
          <p>Loading...</p>
        ) : (
          <>
            <div className="mb-3 border border-gray-300 bg-gray-100">
              {post?.images?.length > 0 && (
                <div className="flex flex-wrap justify-center">
                  <div
                    className={`${
                      post?.features?.length === 0
                        ? "text-center w-full md:w-2/3"
                        : "w-full sm:w-1/2 md:w-1/3 p-2"
                    }`}
                  >
                    {post?.images?.map((item, i) => (
                      <img
                        key={i}
                        src={post?.images[0] ? `${IMG_URL}/images/${item}` : imgPlaceholder}
                        alt="Thumbnail"
                        className="w-full h-auto object-cover border border-gray-300 cursor-pointer"
                        onClick={() => openImagePreview(item)}
                      />
                    ))}
                  </div>
                  <div className="w-full sm:w-1/2 md:w-2/3 p-2">
                    {post?.features?.length > 0 && (
                      <div>
                        <h3 className="text-xl font-semibold">Features</h3>
                        <table className="w-full border border-collapse">
                          <tbody>
                            {post?.features?.map((feature, index) => (
                              <tr
                                key={index}
                                className="border border-gray-300"
                              >
                                <td className="text-left p-2 border border-gray-300">
                                  {feature.name}
                                </td>
                                <td className="text-left p-2 border border-gray-300">
                                  {feature.value}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>

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

            <div className="mb-4">
              <h1 className="text-3xl font-bold">{post?.name}</h1>
            </div>

            <div className="mb-4">
              <b className="text-xl font-semibold">Product Description</b>
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
                        {modifyDocumentName(document, index)}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </>
        )}
      </div>

      <div className="related-content container mx-auto">
        {loading ? (
          <p>Loading...</p>
        ) : (
          <>
            {relatedPosts.length > 0 && (
              <>
                <h3 className="text-xl font-semibold text-center mt-10">
                  Related Products
                </h3>
                <ServiceCard posts={relatedPosts} token={token} />
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default ServiceDetails;
