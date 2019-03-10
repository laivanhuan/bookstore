const Cart = require('../models/cart');

module.exports = {
    addToCart: async (req, res, next) =>{
        let sessionId = req.signedCookies.sessionId;
        let productId = req.params.productId;

        let count = await Cart.findAll({
            where: {
                sessionId: sessionId,
                productId: productId
            }
        }).countProduct || 0;

        await Cart.create({
            sessionId,
            productId,
            countProduct: count + 1
        })

        let countPro = await Cart.findAll({
            where: {
                sessionId: sessionId
            },
        })

    }
}