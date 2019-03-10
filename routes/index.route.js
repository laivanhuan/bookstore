const express = require('express');

const controller = require('../controller/index.controller');

const router = express.Router();

/* GET home page. */
router.get('/', controller.getIndex);

module.exports = router;
