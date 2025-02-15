const Product = require('../../models/product');

module.exports = {
    createProduct: async (req, res, next) => {
        let { name, description, img, price, type } = req.body;
        console.log({ name, description, img, price, type })
        try {
            let newProduct = await Product.create({
                name,
                description,
                img,
                price: parseInt(price),
                type: parseInt(type)
            },{
                fields: ["name","description", "img", "price", "type"]
            })

            if(newProduct){
                res.json({
                    resuilt: 'ok',
                    data: newProduct
                })
            }else{
                res.json({
                    resuilt: 'failed',
                    data: {},
                    message: 'Create a new product failed'
                })
            }
        } catch (error) {
            res.json({
                resuilt: 'failed',
                data: {},
                message: `Create a new product failed. Error: ${error}`
            })
        }
    },

    getProduct: async (req, res, next) =>{
        let listProducts = await Product.findAll();
        res.json(listProducts);
    }
}