import axios from "axios";
import { toast } from "react-toastify"
import { API_URL as url } from "../config"

export const allCategories= async () => {
    try {
        const res = await axios.get(
            `${url}/category`,

        );
        return res.data.response;
    } catch (error) {
        console.log(error)
        toast.error("Error in Fetching categories")
        return;
    }
}

export const allSubCategories= async (brand,type) => {
    try {
        const res = await axios.get(
            `${url}/category/subs?brand=${brand}&type=${type}`,

        );
        return res.data;
    } catch (error) {
        console.log(error)
        toast.error("Error in Fetching subcategories")
        return;
    }
}

export const allServiceCategories = async (type) => {
    try {
        const res = await axios.get(
            `${url}/category/subs?type=${type}`,

        );
        return res.data;
    } catch (error) {
        console.log(error)
        toast.error("Error in Fetching subcategories")
        return;
    }
}