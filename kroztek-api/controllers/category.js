const Category = require("../models/category");
const SubCategory = require("../models/subCategory");
const Product = require('../models/product');
const { ObjectId } = require("mongodb");

module.exports = {
  //category
  getAllCategory: async (_, res) => {
    try {
      const category = await Category.find({}).sort({ rank: 1 }).exec();
      return res.status(200).json({
        success: true,
        message: `${category.length} Category found`,
        response: category,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Internal Server Error",
        error: error.message,
      });
    }
  },
  createCategory: async (req, res) => {
    try {
      const { category,rank } = req.body;
      const isExist = await Category.findOne({ categoryName: category });
      if (isExist) {
        return res.status(403).json({
          success: false,
          message: "Category already exist",
          response: {},
        });
      }
      const newCategory = await new Category({
        categoryName: category,
        rank
      });
      await newCategory.save();
      return res.status(200).json({
        success: false,
        message: "Created successfully",
        response: newCategory,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Internal Server Error",
        error: error.message,
      });
    }
  },
  deleteCategory: async (req, res) => {
    try {
      const { categoryId } = req.query;
      const category = await Category.findByIdAndDelete({_id: ObjectId(categoryId)});
      if (!category) {
        return res
          .status(404)
          .json({ success: false, message: "Invalid id", response: {} });
      }
      await SubCategory.deleteMany({categoryId:  ObjectId(categoryId)})
      await Product.deleteMany({category:  ObjectId(categoryId)})
      return res.status(200).json({
        success: true,
        message: "Category deleted successfully",
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Internal Server Error",
        error: error.message,
      });
    }
  },

  updateCategory: async (req, res) => {
    console.log("body", req.body);
    try {
      const { categoryId, categoryName ,rank} = req.body;
    
      const category = await Category.findById({_id:ObjectId(categoryId)});
      if (!category) {
        return res.status(404).json({
          success: false,
          message: "Invalid id, category not found",
          response: {},
        });
      }
      if (categoryName) {
        category.categoryName = categoryName;
      }
      if(rank){
        category.rank = rank
      }
      await category.save();
      return res.status(200).json({
        success: true,
        message: "Category updated successfully",
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Internal Server Error",
        error: error.message,
      });
    }
  },
 editCategoryStatus: async (req,res) =>{
    try {
      const { categoryId, status} = req.body;
    
      const category = await Category.findById({_id:ObjectId(categoryId)});
      if (!category) {
        return res.status(404).json({
          success: false,
          message: "Invalid id, category not found",
          response: {},
        });
      }
    
        // Update the category status  
        category.isActive = status
        // Save the updated category
        await category.save();
        await Product.updateMany(
          { category: ObjectId(categoryId) }, // Match products with the specified category
          { $set: { isActive: false } } // Update isActive to false
        );
        res.json(category);
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
      }
  },
  //subactegory

  getAllSubCategory: async (_, res) => {
    try {
      const categories = await SubCategory.aggregate([
        {
          $group: {
            _id: '$categoryId',
          },
        },
        { $sort: { rank: 1 } },
      ]);
  
      const subcategories = await SubCategory.find().sort({ rank: 1 });
  
      const result = categories.map((category) => {
        const categoryName = subcategories.find(
          (sub) => sub._id.toString() === category._id.toString()
        ).categoryName;
  
        const subcategoryData = subcategories
          .filter((sub) => sub.categoryId.toString() === category._id.toString())
          .map((sub) => ({
            subcategoryId: sub._id,
            subcategoryName: sub.subcategoryName,
          }));
  
        return {
          name: categoryName,
          subcategories: subcategoryData,
        };
      });
  
      res.json(result);
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Internal Server Error",
        error: error.message,
      });
    }
  },
  createSubCategory: async (req, res) => {
    try {
      const { subcategory, categoryId,rank } = req.body;
      const isExist = await SubCategory.findOne({
        subcategoryName: subcategory,
      });
      if (isExist) {
        return res.status(403).json({
          success: false,
          message: "Category already exist",
          response: {},
        });
      }
      const newSubCategory = await new SubCategory({
        subcategoryName: subcategory,
        categoryId,
        rank
      });
      await newSubCategory.save();
      return res.status(200).json({
        success: true,
        message: "Created successfully",
        response: newSubCategory,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Internal Server Error",
        error: error.message,
      });
    }
  },
  deleteSubCategory: async (req, res) => {
    try {
      const { subId } = req.query;
      const subcategory = await SubCategory.findByIdAndDelete({_id: ObjectId(subId)});
      if (!subcategory) {
        return res
          .status(404)
          .json({ success: false, message: "Invalid id", response: {} });
      }
      await Product.deleteMany({subcategory:  ObjectId(subId)})
      return res.status(200).json({
        success: true,
        message: "SubCategory deleted successfully",
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Internal Server Error",
        error: error.message,
      });
    }
  },
  getSubCategoryForCategory: async (req, res) => {
    try {
      const { categoryId } = req.query;
      const subcategory = await SubCategory.find({ categoryId });
      return res.status(200).json({
        success: true,
        message: `${subcategory.length} Sub Category found`,
        response: subcategory,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Internal Server Error",
        error: error.message,
      });
    }
  },
  updateSubCategory: async (req, res) => {
    try {
      const { categoryId, subcategoryName, subId ,rank} = req.body;
      const subcategory = await SubCategory.findById({ _id: ObjectId(subId) });
      if (!subcategory) {
        return res.status(404).json({
          success: false,
          message: "Invalid id, subcategory not found",
          response: {},
        });
      }
      if (subcategoryName) {
        subcategory.subcategoryName = subcategoryName;
      }
      if (categoryId) {
        subcategory.categoryId = categoryId;
      }
      if(rank){
        subcategory.rank = rank
      }
   
      await subcategory.save();
      return res.status(200).json({
        success: true,
        message: "SubCategory updated successfully",
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Internal Server Error",
        error: error.message,
      });
    }
  },
  editSubCategoryStatus: async (req,res) =>{
    try {
      const {  subId ,status} = req.body;
      const subcategory = await SubCategory.findById({ _id: ObjectId(subId) });
      if (!subcategory) {
        return res.status(404).json({
          success: false,
          message: "Invalid id, subcategory not found",
          response: {},
        });
      }
    
        // Update the category status  
        subcategory.isActive = status
        // Save the updated category
        await subcategory.save();
        await Product.updateMany(
          { subcategory: ObjectId(subId) }, // Match products with the specified category
          { $set: { isActive: false } } // Update isActive to false
        );
        res.json(subcategory);
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
      }
  },
};
