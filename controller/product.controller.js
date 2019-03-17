const Product = require('../models/product');

module.exports = {
  getProduct: async (req, res, next) =>{
    try{
      let listProducts = await Product.findAll({limit:12});
      res.render('product',{
        listProducts: listProducts
      })
    }catch(error){
      console.log(error.message);
    }
  },

  getProductByType: async (req, res, next) =>{
    try {
      let type = req.query.type;
      let listProducts = await Product.findAll(
        {
          where: {
            type: parseInt(type)
          }
        });
      res.render('product',{
        listProducts: listProducts,
        products: res.locals.cartProducts
      })
    } catch (error) {
      console.log(error);
    }
  },

  viewProduct: async (req, res, next) => {
    try {
      let productId = req.params.id;
      let product = await Product.findAll({
        where: {
          id: productId
        }
      });
      console.log(product);
      res.render('view',{
        product: product[0],
        products: res.locals.cartProducts
      })
    } catch (error) {
      console.log(error);
    }
  }
}