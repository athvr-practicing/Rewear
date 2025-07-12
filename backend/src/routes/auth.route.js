const express = require("express");
const router = express.Router();

const signIn = require("../controllers/signin.controller");
const Register = require("../controllers/register.controller");
const { getMe } = require("../controllers/auth.controller");
const isLoggedIn = require("../middleware/auth.middleware");

router.post("/register", Register)
router.post("/signin", signIn)
router.get("/me", isLoggedIn, getMe)

module.exports = router;