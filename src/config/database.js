const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('bdEcoMolk', 'root', 'admin', {
    host: 'localhost',
    dialect: 'mysql'
})

module.exports = sequelize;