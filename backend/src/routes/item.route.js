const express = require("express");
const router = express.Router();

const isLoggedIn = require("../middleware/auth.middleware");
const { createItem } = require("../controllers/item.controller");

router.post('/upload/item', isLoggedIn, createItem);

module.exports = router;