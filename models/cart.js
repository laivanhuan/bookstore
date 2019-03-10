const sequelize = require('sequelize');

const db = require('../db').db;

const cart = db.define('cart',{
    id: {
        type: sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
    sessionId: sequelize.STRING,
    productId: sequelize.INTEGER,
    countProduct: sequelize.INTEGER
},{
  //don't add the timestamp attribute
  timestamps: false
})

module.exports = cart