/** @format */

import axios from "axios";
import {
    // CLOUDINARY_NAME,
    // CLOUDINARY_SECRET,
    // CLOUDINARY_KEY,
    API_URL,
} from "../config";

export const createPost = async (token, form) => {
    const headers = {
        authorization: token,
    };
    return await axios.post(`${API_URL}/post/add`, form, { headers });
};
export const editPost = async (id, token, form) => {
    console.log(form);
    const headers = {
        authorization: token,
    };
    return await axios.put(`${API_URL}/post/edit?postId=${id}`, form, {
        headers,
    });
};
export const getPost = async (id, token) => {
    const headers = {
        authorization: token,
    };
    return await axios.get(`${API_URL}/post/singlePost?postId=${id}`, {
        headers,
    });
};

export const getPosts = async (token) => {
    const headers = {
        authorization: token,
    };

    return await axios.get(`${API_URL}/post/allPost`, { headers });
};

export const deletePost = async (token, id) => {
    const headers = {
        authorization: token,
    };
    return await axios.delete(`${API_URL}/post/delete?postId=${id}`, { headers });
};

export const getStatisticsData = async (token) => {
    const headers = {
        authorization: token,
    };

    return await axios.get(`${API_URL}/post/statistics`, { headers });
};
