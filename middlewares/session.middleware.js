const shortid = require('shortid');

const Session = require('../models/session');
const Cart = require('../models/cart');
const Product = require('../models/product');
const Op = require('../db').Op;

module.exports = async (req, res, next) => {
	let sessionId = req.signedCookies.sessionId
	if (!sessionId){
		sessionId = shortid.generate();
		res.cookie('sessionId', sessionId, {signed: true});

		Session.create({
            id: sessionId
				});
	}else{
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
		res.locals.cartProducts = products;
	}
	next();
}