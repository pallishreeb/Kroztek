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
    toast.error("Error in Fetching Products")
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
    toast.error("Error in Fetching Products")
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
    toast.error("Error in Fetching Most Viwed Products")
  }
}

export const relatedPost = async (id) => {
  try {
    return await axios.get(
      `${url}/product/related-post?productId=${id}`,
    );
  } catch (error) {
    console.log(error)
    toast.error("Error in Fetching Related Products")
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
    toast.error("Error in Filter Product By Category")
    return;
  }
}
export const filterBySubCategory = async (id) => {
  try {
    const res = await axios.get(
      `${url}/product/filterBySubCategory?subcategoryId=${id}`,
       );
    return res.data;
  } catch (error) {
    console.log(error)
    toast.error("Error in Fetching Products")
    return;
  }
}

export const AllServices = async () => {
  try {
    const res = await axios.get(
      `${url}/service/allPost`,
       );
    // console.table(res.data.response);
    return res.data;
  } catch (error) {
    console.log(error)
    toast.error("Error in Fetching Services")
    return;
  }
}

export const singleService = async (id) => {
  try {
    return await axios.get(
      `${url}/service/singlepost?productId=${id}`,
    );
  } catch (error) {
    console.log(error)
    toast.error("Error in Fetching Service")
    return;
  }
}

export const relatedServices = async (id) => {
  try {
    return await axios.get(
      `${url}/service/related-post?productId=${id}`,
    );
  } catch (error) {
    console.log(error)
    toast.error("Error in Fetching Related Services")
    return;
  }
}

export const filterServiceBySubCategory = async (id) => {
  try {
    const res = await axios.get(
      `${url}/service/filterBySubCategory?subcategoryId=${id}`,
       );
    return res.data;
  } catch (error) {
    console.log(error)
    toast.error("Error in Fetching Products")
    return;
  }
}