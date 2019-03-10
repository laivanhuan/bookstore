const sequelize = require('sequelize');

const db = require('../db').db;
const cart = require('./cart');

const product = db.define('product',{
    id: {
        type: sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
    name: sequelize.STRING,
    description: sequelize.TEXT,
    img: sequelize.STRING,
    price: sequelize.INTEGER
},{
  //don't add the timestamp attribute
  timestamps: false
})

product.hasMany(cart, { foreignKey: 'productId', sourceKey: 'id'});
cart.belongsTo(product, { foreignKey: 'productId', targetKey: 'id'});

module.exports = product