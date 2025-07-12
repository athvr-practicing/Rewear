const express = require("express");
const router = express.Router();

const signIn = require("../controllers/signin.controller");
const Register = require("../controllers/register.controller");

router.post("/register", Register)
router.post("/register", signIn)
router.post('/item', isLoggedIn, createItem);

module.exports = router;