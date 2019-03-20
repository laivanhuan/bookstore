const express = require('express');

const controller = require('../controller/cart.controller');

const router = express.Router();

router.get('/:productId', controller.addToCart);
router.get('/', controller.getCart);
router.delete('/:id', controller.deleteCart);
router.put('/:id', controller.updateCart);
module.exports = router;