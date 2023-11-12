const Product = require('../models/product');
const User = require("../models/userModel");
const Category = require("../models/category");
const SubCategory = require("../models/subCategory");
const Services = require("../models/service");

exports.getStatitics = async(req,res) =>{
    try {
        const userCount = await User.countDocuments();
        const postCount = await Product.countDocuments();
        const categoryCount = await Category.countDocuments();
        const subcategoryCount = await SubCategory.countDocuments();
        const services = await Services.countDocuments();
        const pendingProducts = await Product.countDocuments({status: "draft"});
        const pendingServices = await Services.countDocuments({status: "draft"});
        const statistics = {
          users: userCount,
          Products: postCount,
          categories: categoryCount,
          subcategories: subcategoryCount,
          services:services,
          pendingProducts:pendingProducts,
          pendingServices:pendingServices
        };
       
        res.json(statistics);
      } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
      }
}