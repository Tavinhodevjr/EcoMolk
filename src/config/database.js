const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('bdecoMolk', 'root', 'Le@n223380', {
    host: 'localhost',
    dialect: 'mysql'
})

module.exports = sequelize;