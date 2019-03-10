const sequelize = require('sequelize');

const db = require('../db').db;
const cart = require('./cart');

const session = db.define('session',{
    id: {
        type: sequelize.STRING,
        primaryKey: true,
      }
},{
  //don't add the timestamp attribute
  timestamps: false
})

session.hasMany(cart, { foreignKey: 'sessionId', sourceKey: 'id'});
cart.belongsTo(session, {foreignKey: 'sessionId', targetKey: 'id'});

module.exports = session