const express = require("express");
const router = express.Router();
const passport = require("passport");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const {
  addProduct,
  editProduct,
  getAllSavesProducts,
  saveProduct,
  relatedProducts,
  removeSaveProduct,
  deleteProduct,
  getProductDetails,
  getProducts,
  filterByCategory,
  mostViewedProducts,
  removeImg,
  removeDoc,
  editProductStatus
} = require("../controllers/product");

const { getStatitics } = require("../controllers/dashboard");
//isAdmin middleware
const isAdmin = require("../middleware/auth");

// Multer storage configuration for images and documents
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (file.fieldname === "images") {
      cb(null, "./uploads/images"); // Images will be stored in 'uploads/images' directory
    } else if (file.fieldname === "documents") {
      cb(null, "./uploads/docs"); // Documents will be stored in 'uploads/docs' directory
    } else {
      cb(new Error("Invalid fieldname"));
    }
  },
  filename: (req, file, cb) => {
    // Generate a unique filename for each uploaded file
    const uniqueSuffix =
      Date.now() + "-";
    const fileExtension = path.extname(file.originalname);
    cb(null, file.fieldname + "-" + uniqueSuffix + fileExtension);
  },
});

const upload = multer({ storage });

//CREATE Products
router.post(
  "/add",
  passport.authenticate("jwt", { session: false }),
  isAdmin,
  upload.fields([
    { name: "images", maxCount: 5 },
    { name: "documents", maxCount: 5 },
  ]),
  addProduct
);

//GET Product details
router.get("/singlePost", getProductDetails);

//GET Products
router.get("/allPost", getProducts);
//mostviewdproducts
router.get("/most-viewed", mostViewedProducts);

//UPDATE Product
router.put(
  "/edit",
  passport.authenticate("jwt", { session: false }),
  isAdmin,
  upload.fields([
    { name: "images", maxCount: 5 },
    { name: "documents", maxCount: 5},
  ]),
  editProduct
);

//UPDATE Product status
router.put(
  "/editstatus",
  passport.authenticate("jwt", { session: false }),
  isAdmin,
  editProductStatus
);
//DELETE Product
router.delete(
  "/delete",
  passport.authenticate("jwt", { session: false }),
  isAdmin,
  deleteProduct
);

//related products
router.get("/related-post", relatedProducts);

//save products
router.get(
  "/save-post",
  passport.authenticate("jwt", { session: false }),
  saveProduct
);

//filter by catergory products
router.get("/filterByCategory", filterByCategory);

//get all the saved products for an user
router.get(
  "/savedpost",
  passport.authenticate("jwt", { session: false }),
  getAllSavesProducts
);

//remove saved product
router.delete(
  "/remove-saved-post",
  passport.authenticate("jwt", { session: false }),
  removeSaveProduct
);

//get statistics of application
router.get(
  "/statistics",
  passport.authenticate("jwt", { session: false }),
  isAdmin,
  getStatitics
);

//remove img
router.delete('/remove-img',removeImg)
module.exports = router;

//remove img
router.delete('/remove-doc',removeDoc)
module.exports = router;
