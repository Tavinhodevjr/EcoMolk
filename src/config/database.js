const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('bdecomolk', 'root', 'Ot2004**', {
    host: 'localhost',
    dialect: 'mysql'
})

module.exports = sequelize;