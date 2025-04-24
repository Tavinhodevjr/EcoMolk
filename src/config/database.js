const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('bdecomolk', 'root', 'admin', {
    host: 'localhost',
    dialect: 'mysql'
})

module.exports = sequelize;