const express = require("express");
const router = express.Router();
const passport = require("passport");


const {
  createCategory, getAllCategory, getAllSubCategory, getSubCategoryForCategory, deleteCategory, deleteSubCategory,
  createSubCategory, updateCategory, updateSubCategory, editCategoryStatus, editSubCategoryStatus
} = require("../controllers/category");

//isAdmin
const isAdmin = require("../middleware/auth")

//CREATE POST
router.post(
  "/add",
  passport.authenticate("jwt", { session: false }),
  isAdmin,
  createCategory
);

router.post(
  "/add/subcategory",
  passport.authenticate("jwt", { session: false }),
  createSubCategory
);
//GET categories
router.get(
  "/",
  getAllCategory
);

//GET subcategories
router.get("/subs", getAllSubCategory);

//GET subcategories for category
router.get("/subs/category", getSubCategoryForCategory);


//UPDATE category
router.put(
  "/edit",
  passport.authenticate("jwt", { session: false }),
  updateCategory
);

//UPDATE subcategory
router.put(
  "/sub/edit",
  passport.authenticate("jwt", { session: false }),
  updateSubCategory
);
//UPDATE Product status
router.put(
  "/editstatus",
  passport.authenticate("jwt", { session: false }),
  isAdmin,
  editCategoryStatus
);
//UPDATE Product status
router.put(
  "/editsubstatus",
  passport.authenticate("jwt", { session: false }),
  isAdmin,
  editSubCategoryStatus
);

//DELETE category
router.delete(
  "/delete",
  passport.authenticate("jwt", { session: false }),
  deleteCategory
);

//DELETE subcategory
router.delete(
  "/sub/delete",
  passport.authenticate("jwt", { session: false }),
  deleteSubCategory
);


module.exports = router;