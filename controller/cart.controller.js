const Cart = require('../models/cart');
const Product = require('../models/product');
const Op = require('../db').Op;

module.exports = {
  getCheckOut: async (req, res, next) =>{
    res.render('checkout', {
      products: res.locals.cartProducts
    });
  },

  postCheckOut: async (req, res, next) =>{
    try {
      let {email, phone, name, address} = req.body;
      let sessionId = req.signedCookies.sessionId;

      let cart = await Cart.findAll({
          where: {
              sessionId: sessionId
          }
      });

      let productIds = cart.map(i => {return i.productId});

      let products = await Product.findAll({
          where: {
              id: {
                  [Op.or]: productIds
              }
          }
      });

      let results = products.map(i =>{
        let obj = {};
        let result = cart.find((item) =>{
          return item.productId === i.id;
        });
        obj.name = i.name;
        obj.value = result.countProduct;
        obj.price = i.price * result.countProduct;
        return obj;
      });

      let prices = results.reduce((a,b) =>{ return a + b.price}, 0);
      //delete session id
      res.clearCookie('sessionId');

      res.render('bill',{
        bill: results,
        prices: prices,
        products: res.locals.cartProducts
      })

    } catch (error) {
      console.log(error);
    }
  }
}