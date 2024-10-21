const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('bdEcoMolk', 'root', 'Ot2004**', {
    host: 'localhost',
    dialect: 'mysql'
})

module.exports = sequelize;