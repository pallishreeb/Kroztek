const Product = require("../models/service");
const User = require("../models/userModel")
const { ObjectId } = require("mongodb");
const Notification = require("../models/notification");
const path = require("path");
const fs = require("fs");

//add a product
exports.addProduct = async (req, res) => {
  try {
    // Validate required fields
    if (
      !req.body.name ||
      !req.body.description ||
      !req.body.category ||
      !req.body.subcategory ||
      !req.body.features
    ) {
      return res
        .status(400)
        .json({
          error:
            "All fields are required. - Name,description,category,subcategory",
        });
    }

    // Retrieve the user's _id from req.user (assuming you have user authentication)
    const userId = req.user._id;
    let user = User.findById(userId);
    // Create an array to store image filenames
    let imageFilenames = [];
    let docsFilenames = [];

    // Loop through req.files.images and store filenames
    if (req.files && req.files.images) {
      for (const image of req.files.images) {
        imageFilenames.push(image.filename);
      }
    }
    // Loop through req.files.documents and store filenames
    if (req.files && req.files.documents) {
      for (const document of req.files.documents) {
        docsFilenames.push(document.filename);
      }
    }

    // Create a new product object based on the request body
    const newProduct = new Product({
      name: req.body.name,
      description: req.body.description,
      category: req.body.category,
      subcategory: req.body.subcategory,
      userId: userId,
      features: JSON.parse(req.body.features),
      youtubeLink: req.body.youtubeLink || "",
      websiteLink: req.body.websiteLink || "",
      documents: docsFilenames, // Get the document filename from multer
      images: imageFilenames, // Store image filenames in the 'images' field
      rank: req.body?.rank,
    });

    // Check if the user is an admin
    if (user.isAdmin === true) {
      // If the user is an admin, set the status to 'public'
      newProduct.status = "public";
    } else {
      // If the user is not an admin, set the status to 'draft'
      newProduct.status = "draft";
    }
    // Save the product to the database
    await newProduct.save();

    res.status(201).json(newProduct);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};
//update a product
exports.editProduct = async (req, res) => {
  try {
    const productId = req.query.productId;
    const updatedFields = req.body; // Updated fields provided in the request body

    // Find the product by productId
    const existingProduct = await Product.findById(productId);

    if (!existingProduct) {
      return res.status(404).json({ error: "Product not found." });
    }

    // Update the product fields
    if (updatedFields.name) {
      existingProduct.name = updatedFields.name;
    }

    if (updatedFields.description) {
      existingProduct.description = updatedFields.description;
    }

    if (updatedFields.category) {
      existingProduct.category = updatedFields.category;
    }

    if (updatedFields.subcategory) {
      existingProduct.subcategory = updatedFields.subcategory;
    }

    if (updatedFields.features) {
      existingProduct.features = JSON.parse(updatedFields.features);
    }
    if (updatedFields.status) {
      existingProduct.isActive = updatedFields.status;
    }
    if (updatedFields.rank) {
      existingProduct.rank = updatedFields.rank;
    }
    // Handle document and image uploads if provided
    if (req.files && req.files.documents) {
      const docFilenames = [];
      for (const document of req.files.documents) {
        docFilenames.push(document.filename);
      }
      const newDocs = existingProduct?.documents.concat(docFilenames);
      existingProduct.documents = newDocs;
    }

    if (req.files && req.files.images) {
      const imageFilenames = [];
      for (const image of req.files.images) {
        imageFilenames.push(image.filename);
      }
      const newImageUrls = existingProduct?.images.concat(imageFilenames);
      existingProduct.images = newImageUrls;
    }

    // Save the updated product
    await existingProduct.save();

    res.json(existingProduct);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

//get all products with associated category and subcategory details
exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find({ isActive: true, status: "public"  })
      .sort({ rank: 1 })
      .populate("category")
      .populate("subcategory"); // Populate the 'subcategory' field with only the 'name' property

    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.getProductsForAdmin = async (req, res) => {
  try {
    const products = await Product.find({})
      .sort({ rank: 1 })
      .sort({ createdAt: -1 })
      .populate("category")
      .populate("subcategory"); // Populate the 'subcategory' field with only the 'name' property

    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};
//get details of  a single product with category,subcategory based on productId
exports.getProductDetails = async (req, res) => {
  try {
    const productId = req.query.productId;

    const product = await Product.findById(productId)
      .populate("category") // Populate the 'category' field with only the 'name' property
      .populate("subcategory"); // Populate the 'subcategory' field with only the 'name' property

    if (!product) {
      return res.status(404).json({ error: "Product not found." });
    }
    // Increment the view count
    product.views += 1;
    // Save the updated product with the incremented view count
    await product.save();
    res.json(product);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};
// get realted products of a product
exports.relatedProducts = async (req, res) => {
  try {
    const productId = req.query.productId;

    // Find the target product by its productId
    const targetProduct = await Product.findById(productId);

    if (!targetProduct) {
      return res.status(404).json({ error: "Product not found." });
    }

    // Define a query to find related products in the same category or subcategory
    const query = {
      $or: [
        { category: targetProduct.category }, // Products in the same category
        { subcategory: targetProduct.subcategory }, // Products in the same subcategory
      ],
      _id: { $ne: targetProduct._id }, // Exclude the target product itself
    };

    // Find related products based on the query
    const relatedProducts = await Product.find(query);

    res.json(relatedProducts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};
//get most viewed products upto 10 based a filed views in products schema
exports.mostViewedProducts = async (req, res) => {
  try {
    // Find products and sort them in descending order of views, limiting to 10
    const mostViewedProducts = await Product.find()
      .sort({ views: -1 }) // Sort in descending order of views
      .limit(10); // Limit to the top 10 most viewed products

    res.json(mostViewedProducts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};
//delete a product
exports.deleteProduct = async (req, res) => {
  try {
    const { productId } = req.query;

    const product = await Product.findByIdAndDelete({
      _id: ObjectId(productId),
    });
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Invalid id, productnot found",
        response: {},
      });
    }

    //delete all notification of that post
    await Notification.deleteMany({ postId: ObjectId(productId) });

    return res.status(200).json({
      success: true,
      messsage: "Product Removed successfully",
      response: product,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

//filter products by category
exports.filterByCategory = async (req, res) => {
  try {
    const { categoryId } = req.query;
    const posts = await Product.find({ category: ObjectId(categoryId) });
    return res.status(200).json({
      success: false,
      message: "Fetched successfully",
      response: posts,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

//delete image from db and server
exports.removeImg = async (req, res) => {
  const { productId, imageName } = req.body;

  try {
    // Find the product by ID
    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Find and remove the image from the product's images array
    const updatedImages = product.images.filter((image) => image !== imageName);

    // Delete the image file from the uploads/images folder
    const imagePath = path.join(__dirname, "..", "uploads/images", imageName);

    if (fs.existsSync(imagePath)) {
      fs.unlinkSync(imagePath);
    }

    // Update the product's images array
    product.images = updatedImages;

    // Save the updated product
    await product.save();

    res.status(200).json({ message: "Image deleted successfully" });
  } catch (error) {
    console.error("Error deleting image:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

//delete image from db and server
exports.removeDoc = async (req, res) => {
  const { productId, docName } = req.body;

  try {
    // Find the product by ID
    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Find and remove the image from the product's documents array
    const updatedDocs = product.documents.filter((doc) => doc !== docName);

    // Delete the image file from the uploads/images folder
    const docPath = path.join(__dirname, "..", "uploads/docs", docName);

    if (fs.existsSync(docPath)) {
      fs.unlinkSync(docPath);
    }

    // Update the product's images array
    product.documents = updatedDocs;

    // Save the updated product
    await product.save();

    res.status(200).json({ message: "Document deleted successfully" });
  } catch (error) {
    console.error("Error deleting image:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.editProductStatus = async (req, res) => {
  try {
    const productId = req.query.productId;
    const { status } = req.body;

    // Find the product by productId
    const existingProduct = await Product.findById(productId);

    if (!existingProduct) {
      return res.status(404).json({ error: "Product not found." });
    }

    // Update the product status
    existingProduct.isActive = status;
    // Save the updated product
    await existingProduct.save();

    res.json(existingProduct);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.filterBySubCategory = async (req, res) => {
  try {
    const { subcategoryId } = req.query;
    const posts = await Product.find({
      subcategory: ObjectId(subcategoryId),
    }).sort({ rank: 1 });
    return res.json(posts);
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

// Fetch products pending approval
exports.getPendingApprovalProducts = async (req, res) => {
  try {
    const userId = req.user._id;
    let user = User.findById(userId);
    let pendingProducts;
      // Check if the user is an admin
      if (user.isAdmin === true) {
        pendingProducts = await Product.find({ status: "draft" });
      } else {
        pendingProducts = await Product.find({
          status: "draft",
          userId: userId,
        });
      }
    pendingProducts = await Product.find({ status: "draft" });
    return res.status(200).json({ products: pendingProducts });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// Approve or reject a product
exports.approveProduct = async (req, res) => {
  try {
    const { productId, status } = req.body;
    // Update Product status
    await Product.findByIdAndUpdate(productId, { status });
    return res.status(200).json({ message: 'Product status updated successfully' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

