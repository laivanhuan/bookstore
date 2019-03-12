const express = require('express');

const controller = require('../controller/product.controller');

const router = express.Router();

router.get('/', controller.getProduct);

module.exports = router;