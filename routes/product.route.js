const express = require('express');

const controller = require('../controller/product.controller');

const router = express.Router();

router.get('/', controller.getProduct);
router.get('/find', controller.getProductByType);

module.exports = router;