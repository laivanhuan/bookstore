const Product = require('../models/product');

module.exports = {
    getIndex: async (req, res, next) => {
        let listProducts = await Product.findAll({limit:4});
        res.render('index', 
        { listProducts: listProducts,
            products: res.locals.products
        });
    }
}