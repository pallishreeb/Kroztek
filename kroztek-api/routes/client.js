const express = require("express");
const router = express.Router();
const passport = require("passport");


const {
    getClients, createClient,editClient,getSingleClient,sendRequirementForm
} = require("../controllers/client");

//isAdmin
const isAdmin = require("../middleware/auth")


//send  form requirement to mail
router.post(
    "/requirement",
   sendRequirementForm
);


//save Client record
router.post(
    "/add",
    passport.authenticate("jwt", { session: false }),
    isAdmin,
    createClient
);

//GET metadata
router.get("/", getClients);

//GET metadata
router.get("/one", passport.authenticate("jwt", { session: false }), getSingleClient);
//UPDATE metadata
router.put(
    "/edit",
    passport.authenticate("jwt", { session: false }),
    isAdmin,
    editClient
);





module.exports = router;