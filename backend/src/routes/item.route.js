const express = require("express");
const router = express.Router();

const isLoggedIn = require("../middleware/auth.middleware");
const { createItem } = require("../controllers/item.controller");
const listItem = require("../controllers/list.controller");
const specificItem = require("../controllers/specificItem.controller")
const swapItem = require("../controllers/swap.controller");

router.post('/upload/item', isLoggedIn, createItem);
router.post('/items', listItem)
router.post('/items/:id', specificItem)
router.post('/items/:id', swapItem)

module.exports = router;