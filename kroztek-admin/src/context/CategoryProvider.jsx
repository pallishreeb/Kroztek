/** @format */

import { createContext, useState } from "react";
import { toast } from "react-toastify";
import {
  getCategories,
  getSubCategories,
  addSubCategory,
  addCategory,
  getAllSubCategories,
  editCategory,
  editSubCategory,
  deleteCategory,
  deleteSubCategory,
} from "../apis/category";

export const CategoryContext = createContext();

const CategoryProvider = (props) => {
  const [categories, setCategories] = useState([]);
  const [subcategory, setSubcategory] = useState(null);
  const [category, setCategory] = useState(null);
  const [subcategories, setSubcategories] = useState([]);
  const [loading, setLoading] = useState(false);

  // Load categories
  const getAllCategories = async (token) => {
    setLoading(true);
    try {
      const res = await getCategories(token);
      setCategories(res?.data?.response);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
      toast.error(
        error?.response?.data?.message || "Error in fetching categories"
      );
    }
  };

  // create Category
  const createCategory = (form, token) => {
    try {
      addCategory(token, form);
      setCategory({});
      getAllCategories(token);
    } catch (error) {
      console.log(error);
      toast.error(
        error?.response?.data?.message || "Error in creating category"
      );
    }
  };
  // update category
  const updateCategory = (form, token) => {
    try {
      const res = editCategory(token, form);
      console.log(res.data);
      setCategory({});
      getAllCategories(token);
    } catch (error) {
      console.log(error);
      toast.error(
        error?.response?.data?.message || "Error in updating category"
      );
    }
  };
  // get category by Id
  //    const getCategory = (id , token ) =>{
  //     try {

  //     } catch (error) {
  //         console.log(error);
  //     }
  //    }

  // delete category
  const removeCategory = (id, token) => {
    try {
      const res = deleteCategory(id, token);
      console.log(res.data);
    } catch (error) {
      console.log(error);
      toast.error(
        error?.response?.data?.message || "Error in deleting category"
      );
    }
  };

  // get subcategories
  const allSubcategores = (token) => {
    setLoading(true);
    getAllSubCategories(token)
      .then((res) => {
        setSubcategories(res.data.response);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
        toast.error(
          error?.response?.data?.message || "Error in fetching subcategories"
        );
      });
  };
  // create subcategories
  const createSubcategory = (form, token) => {
    try {
      const res = addSubCategory(form, token);
      console.log(res.data);
      setSubcategory({});
      allSubcategores(token);
    } catch (error) {
      console.log(error);
      toast.error(
        error?.response?.data?.message || "Error in creating subcategory"
      );
    }
  };
  // update subcategory
  const updateSubcategory = (form, token) => {
    try {
      const res = editSubCategory(form, token);
      console.log(res.data);
      setSubcategory({});
      allSubcategores(token);
    } catch (error) {
      console.log(error);
      toast.error(
        error?.response?.data?.message || "Error in updating subcategory"
      );
    }
  };
  // get subcategory by categoryId
  const getSubcategoryByCategoryId = (id, token) => {
    try {
      const res = getSubCategories(id, token);
      console.log(res.data);
    } catch (error) {
      console.log(error);
      toast.error(
        error?.response?.data?.message ||
          "Error in fetching subcategory for perticular category"
      );
    }
  };
  // delete subcategory
  const removeSubcategory = (id, token) => {
    try {
      const res = deleteSubCategory(id, token);
      console.log(res.data.log);
    } catch (error) {
      console.log(error);
      toast.error(
        error?.response?.data?.message || "Error in deleteing subcategory"
      );
    }
  };
  return (
    <CategoryContext.Provider
      value={{
        getAllCategories,
        createCategory,
        updateCategory,
        removeCategory,
        removeSubcategory,
        getSubcategoryByCategoryId,
        updateSubcategory,
        createSubcategory,
        allSubcategores,
        categories,
        subcategories,
        setCategory,
        category,
        setSubcategory,
        subcategory,
        setSubcategories,
        setCategories,
        loading,
      }}
    >
      {props.children}
    </CategoryContext.Provider>
  );
};

export default CategoryProvider;
