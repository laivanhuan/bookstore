const Cart = require('../../models/cart');
const Product = require('../../models/product');
const Op = require('../../db').Op;

module.exports = {
    addToCart: async (req, res, next) =>{
        try {
            let sessionId = req.signedCookies.sessionId;
            let productId = req.params.productId;

            let product = await Cart.findAll({
                where: {
                    sessionId: sessionId,
                    productId: productId
                }
            });

            if (!product.length){
                await Cart.create({
                    sessionId,
                    productId,
                    countProduct: 1
                });
            }

            let cart = await Cart.findAll({
                where: {
                    sessionId: sessionId
                },
            });

            let productIds = cart.map(i => {return i.productId});

            let products = await Product.findAll({
                where: {
                    id: {
                        [Op.or]: productIds
                    }
                }
            });
            res.json(products);
        } catch (error) {
            res.json({
                message: 'Failed',
                error: error
            });
        }

    },

    getCart: async (req, res, next) =>{
        try {
            let sessionId = req.signedCookies.sessionId;
            let products = await Cart.findAll({
                where: {
                    sessionId: sessionId
                },
            });

            res.json(products);
        } catch (error) {
            res.json({
                message: 'Failed',
                error: error
            });
        }
    },

    deleteCart: async (req, res, next) =>{
        try {
            let sessionId = req.signedCookies.sessionId;
            let id = req.params.id;
            await Cart.destroy({
                where: {
                    sessionId: sessionId,
                    productId: id
                }
            });

            let cart = await Cart.findAll({
                where: {
                    sessionId: sessionId
                },
            });

            let productIds = cart.map(i => {return i.productId});

            let products =[];
		
            if (productIds.length) {
                products = await Product.findAll({
                    where: {
                        id: {
                            [Op.or]: productIds
                        }
                    }
                });
            }
            res.json(products);
        } catch (error) {
            res.json({
                message: 'Failed',
                error: error
            });
        }
    },

    updateCart: async (req, res, next) =>{
        try {
            let sessionId = req.signedCookies.sessionId;
            let id = req.params.id;
            let number = req.query.value;

            let cart = await Cart.findAll({
                where: {
                    sessionId: sessionId,
                    productId: id
                }
            });

            if(cart.length > 0) {
                cart.forEach(async (item) => {
                  await item.update({
                    countProduct: number ? number : item.countProduct,
                  });  
                });
                res.json({
                    result: 'ok',
                    data: cart,
                    message: "update successfully"
                });
            } else {
                res.json({
                    result: 'failed',
                    data: {},
                    message: "Cannot find to update"
                });
            }
        } catch (error) {
            res.json({
                message: 'Failed',
                error: error
            });
        }
    }
}