const express = require('express');

const controller = require('../controller/cart.controller');

const router = express.Router();

router.get('/:productId', controller.addToCart);
router.get('/', controller.getCart);

module.exports = router;