//defines all the api calls here
import axios from "axios";
import { toast } from "react-toastify"
import { API_URL as url } from "../config"



export const singlePost = async (id) => {
  try {
    return await axios.get(
      `${url}/product/singlepost?productId=${id}`,
    );
  } catch (error) {
    console.log(error)
    toast.error("Error in Fetching Post")
    return;
  }
}
export const AllPosts = async () => {
  try {
    const res = await axios.get(
      `${url}/product/allPost`,
       );
    // console.table(res.data.response);
    return res.data;
  } catch (error) {
    console.log(error)
    toast.error("Error in Fetching Posts")
    return;
  }
}
export const mostViewedPost = async () => {
  try {
    return await axios.get(
      `${url}/product/most-viewed`,
    );
  } catch (error) {
    console.log(error)
    toast.error("Error in Fetching Most Viwed Post Posts")
  }
}

export const relatedPost = async (id) => {
  try {
    return await axios.get(
      `${url}/product/related-post?productId=${id}`,
    );
  } catch (error) {
    console.log(error)
    toast.error("Error in Fetching Related Post")
    return;
  }
}

export const filterByCategory = async (id, authtoken) => {
  try {
    return await axios.get(
      `${url}/product/filterByCategory?categoryId=${id}`,
      {
        headers: {
          Authorization: authtoken,
        },
      }
    );
  } catch (error) {
    console.log(error)
    toast.error("Error in Filter Post By Category")
    return;
  }
}

export const savePost = async (id, authtoken) => {
  try {
    const res = await axios.get(
      `${url}/product/save-post?postId=${id}`,
      {
        headers: {
          Authorization: authtoken,
        },
      }
    );
    toast.success("Product Saved..")
    return res;
  } catch (error) {
    console.log(error)
    toast.error(error.response.data.message)
    return;
  }
}

export const savedPost = async (authtoken) => {
  try {
    return await axios.get(
      `${url}/product/savedpost`,
      {
        headers: {
          Authorization: authtoken,
        },
      }
    );
  } catch (error) {
    console.log(error)
    toast.error(error.response.data.message)
    return;
  }
}

export const removeSavedPost = async (authtoken, savedPostId) => {
  try {
    const res = await axios.delete(
      `${url}/product/remove-saved-post?savedPostId=${savedPostId}`,
      {
        headers: {
          Authorization: authtoken,
        },
      }
    );
    toast.success("Product Removed From SavedPost")
    return res;
  } catch (error) {
    console.log(error)
    toast.error(error.response.data.message)
    return;
  }
}
