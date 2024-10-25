const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('bdEcoMolk', 'root', 'Le@n223380', {
    host: 'localhost',
    dialect: 'mysql'
})

module.exports = sequelize;