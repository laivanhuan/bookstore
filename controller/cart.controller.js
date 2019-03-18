module.exports = {
  getCheckOut: async (req, res, next) =>{
    res.render('checkout', {
      products: res.locals.cartProducts
    });
  }
}