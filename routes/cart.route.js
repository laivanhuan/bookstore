const express = require('express');

const controller = require('../controller/cart.controller');

const router = express.Router();

router.get('/checkout', controller.getCheckOut);
router.post('/checkout', controller.postCheckOut);

module.exports = router;