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
        listProducts: listProducts
      })
    } catch (error) {
      console.log(error.message);
    }
  }
}