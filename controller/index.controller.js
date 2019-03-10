const Product = require('../models/product');

module.exports = {
    getIndex: async (req, res, next) => {
        let listProducts = await Product.findAll();
        res.render('index', { listProducts: listProducts.slice(0,4) });
    }
}