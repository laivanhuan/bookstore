const Cart = require('../models/cart');
const Product = require('../models/product');
const Op = require('../db').Op;

const sgMail = require('@sendgrid/mail');

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
      sgMail.setApiKey(process.env.SENDGRID_API_KEY);

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

      const bills = results.reduce((a,b) =>{
        return a + 'Tên sách: '+b.name+', số lượng:'+b.value+', thành tiền: '+b.price+'.\n\n';
      },'')

      const msgString = 'Họ và tên: '+name+'.\n\n Địa chỉ: '+address+'.\n\n Điện thoại: '+phone+'.\n\nĐơn hàng: \n\n'+bills;

      const msg = {
        to: email,
        from: 'TheBookstore@example.com',
        subject: 'Xác nhận đơn hàng',
        text: msgString+'Tổng tiền: '+prices,
      };
      sgMail.send(msg);

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