/** @format */

import { createContext, useState } from "react";
import { toast } from "react-toastify"
import {
  createPost,
  editPost,
  getPost,
  getPosts,
  deletePost,
} from "../apis/post";
import axios from "axios";
export const PostContext = createContext();

const PostProvider = (props) => {
  // const [post, setPost] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editForm, setEditForm] = useState({
    _id: "",
    title: "",
    text: "",
    brand: "",
    model: "",
    websitesLink: "",
    youtubeLink: "",
    category: {},
    subcategory: {},
  });
  const [form, setForm] = useState({});
  const [imgs, setImgs] = useState([]);
  const [selectedImages, setSelectedImages] = useState([]);


  // // Load to be edit post
  const getSinglePost = (id, token) => {
    setLoading(true)
    getPost(id, token)
      .then((res) => {
        console.log("get single post ", res.data.response);
        // setPost(res.data.response);
        setEditForm({
          _id: res.data.response?._id,
          title: res.data.response?.title,
          text: res.data.response?.text,
          brand: res.data.response?.brand || "",
          model: res.data.response?.model || "",
          websitesLink: res.data.response?.websitesLink || "",
          youtubeLink: res.data.response?.youtubeLink || "",
          categoryId: res.data.response?.category._id,
          subcategoryId: res.data.response?.subcategory._id,
          category: res.data.response?.category,
          subcategory: res.data.response?.subcategory,
        });
        setLoading(false)
      })
      .catch((err) => {
        console.log(err);
        toast.error("Error in Fetching Posts");
        setLoading(false)
      });
  };
  // Load Posts
  const getAllPosts = async (token) => {
    setLoading(true)
    try {
      const res = await getPosts(token);
      setPosts(res?.data?.response);
      setLoading(false)
    } catch (error) {
      toast.error("Error in Fetching Posts");
      setLoading(false)
      console.log(error);
    }
  };
  //save post
  const submitPost = (form, imgs, token, navigate) => {
    setLoading(true);
    try {
      let arr = [];
      let {
        title,
        text,
        websitesLink,
        youtubeLink,
        brand,
        model,
        categoryId,
        subcategoryId,
      } = form;

      if (imgs.length > 0) {
        imgs.forEach((image) => {
          const formData = new FormData();
          formData.append("file", image);
          formData.append("upload_preset", "socila_media");
          axios
            .post(
              `https://api.cloudinary.com/v1_1/da01buahx/image/upload`,
              formData
            )
            .then((response) => {
              arr.push(response.data.secure_url);
              if (arr.length === imgs.length) {
                createPost(token, {
                  title,
                  text,
                  websitesLink,
                  youtubeLink,
                  brand,
                  model,
                  categoryId,
                  subcategoryId,
                  images: arr,
                }).then((res) => {
                  setImgs([])
                  setForm({})
                  setSelectedImages([])
                  setLoading(false);
                  navigate("/posts")
                  toast.success("Post Added Successfully");

                });
              }
            });
        });
      } else {
        toast.warning("Atleast One Image Is Required");
      }
    } catch (error) {
      console.log(error);
      toast.error("Error in Submitting the Post")
      setLoading(false);
    }
  };

  //save edit data 
  const updatePost = (form, imgs, token, navigate) => {
    setLoading(true);
    try {
      let arr = [];
      let {
        title,
        text,
        websitesLink,
        youtubeLink,
        brand,
        model,
        categoryId,
        subcategoryId,
        _id,
      } = form;

      if (imgs.length > 0) {
        imgs.forEach((image) => {
          const formData = new FormData();
          formData.append("file", image);
          formData.append("upload_preset", "socila_media");
          axios
            .post(
              `https://api.cloudinary.com/v1_1/da01buahx/image/upload`,
              formData
            )
            .then((response) => {
              arr.push(response.data.secure_url);
              if (arr.length === imgs.length) {
                editPost(_id, token, {
                  title,
                  text,
                  websitesLink,
                  youtubeLink,
                  brand,
                  model,
                  categoryId,
                  subcategoryId,
                  images: arr,
                }).then((res) => {
                  setImgs([])
                  setEditForm({})
                  setSelectedImages([])
                  setLoading(false);
                  navigate("/posts")
                  toast.success("Post Updated Successfully");
                  // console.log(res);
                });
              }
            });
        });
      } else {
        editPost(_id, token, {
          title,
          text,
          websitesLink,
          youtubeLink,
          brand,
          model,
          categoryId,
          subcategoryId,
          images: imgs,
        }).then((res) => {
          setImgs([])
          setEditForm({})
          setSelectedImages([])
          setLoading(false);
          navigate("/posts")
          toast.success("Post Updated Successfully");

        });
      }
    } catch (error) {
      console.log(error);
      toast.error("Error in updating the Post")
      setLoading(false);
    }
  };

  //delete post
  const deleteSinglePost = (token, id) => {
    setLoading(true)
    deletePost(token, id)
      .then((res) => {
        setPosts(posts.filter((item) => item._id !== id));
        setLoading(false)
        toast.success("Post Deleting Successfully");
      })
      .catch((err) => {
        console.log(err);
        setLoading(false)
        toast.error("Error in Deleting the Post")
      });
  };

  return (
    <PostContext.Provider
      value={{
        loading,
        posts,
        submitPost,
        getAllPosts,
        deleteSinglePost,
        getSinglePost,
        // post,
        setPosts,
        updatePost,
        form,
        setForm,
        imgs,
        setImgs,
        selectedImages,
        setSelectedImages,
        editForm,
        setEditForm
      }}
    >
      {props.children}
    </PostContext.Provider>
  );
};

export default PostProvider;
