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
  }
}