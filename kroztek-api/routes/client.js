const express = require("express");
const router = express.Router();
const passport = require("passport");


const {
    getClients, createClient,editClient,getSingleClient
} = require("../controllers/client");

//isAdmin
const isAdmin = require("../middleware/auth")

//CREATE Metadata
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

//DELETE metadata



module.exports = router;