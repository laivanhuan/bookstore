const Cart = require('../../models/cart');
const Product = require('../../models/product');
const Op = require('../../db').Op;

module.exports = {
    addToCart: async (req, res, next) =>{
        try {
            let sessionId = req.signedCookies.sessionId;
            let productId = req.params.productId;

            console.log({sessionId, productId});

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
            }else{
                // await Cart.update({
                //     countProduct: product.countProduct + 1
                // },
                // {
                //     where: {
                //         sessionId: sessionId,
                //         productId: productId
                //     }
                // })
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
    }
}