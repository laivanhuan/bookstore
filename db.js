const sequelize = require('sequelize');
//config db
const db = new sequelize({
    database: 'bookStore',
    username: 'postgres',
    password: '123456',
    host: 'localhost',
    port: 5432,
    dialect: 'postgres',
    operatorsAliases: false,
    dialectOptions: {
        ssl: false
    },
    define: {
        freezeTableName: true
    }
})
const Op = sequelize.Op;
// //test connection
// db.authenticate()
// .then(() => console.log('Connected'))
// .catch(err => console.log(err.message))

module.exports = {db, Op};