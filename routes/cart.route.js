const express = require('express');

const controller = require('../controller/cart.controller');

const router = express.Router();

/* GET home page. */
router.get('/checkout', controller.getCheckOut);

module.exports = router;