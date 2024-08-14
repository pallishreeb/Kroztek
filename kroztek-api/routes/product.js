const express = require("express");
const router = express.Router();
const passport = require("passport");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const {
  addProduct,
  editProduct,
  relatedProducts,
  deleteProduct,
  getProductDetails,
  getProducts,
  filterByCategory,
  mostViewedProducts,
  removeImg,
  removeDoc,
  editProductStatus,
  getProductsForAdmin,
  filterBySubCategory,
  approveProduct,
  getPendingApprovalProducts
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

const upload = multer({ limits: { fileSize: 50 * 1024 * 1024 } , storage });

//CREATE Products
router.post(
  "/add",
  passport.authenticate("jwt", { session: false }),
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
router.get("/allproducts", getProductsForAdmin);
//mostviewdproducts
router.get("/most-viewed", mostViewedProducts);

//UPDATE Product
router.put(
  "/edit",
  passport.authenticate("jwt", { session: false }),
  upload.fields([
    { name: "images", maxCount: 5 },
    { name: "documents", maxCount: 5},
  ]),
  editProduct
);

//UPDATE Product active/inactive
router.put(
  "/editstatus",
  passport.authenticate("jwt", { session: false }),
  editProductStatus
);


//UPDATE Product status
router.put(
  "/approve-product",
  passport.authenticate("jwt", { session: false }),
  approveProduct
);
//DELETE Product
router.delete(
  "/delete",
  passport.authenticate("jwt", { session: false }),
  deleteProduct
);

//related products
router.get("/related-post", relatedProducts);

//get products for approve
router.get("/pending-products", passport.authenticate("jwt", { session: false }), getPendingApprovalProducts);


//filter by catergory products
router.get("/filterByCategory", filterByCategory);
router.get("/filterBySubCategory", filterBySubCategory);

//get statistics of application
router.get(
  "/statistics",
  passport.authenticate("jwt", { session: false }),
  getStatitics
);

//remove img
router.delete('/remove-img',removeImg)
module.exports = router;

//remove img
router.delete('/remove-doc',removeDoc)
module.exports = router;
