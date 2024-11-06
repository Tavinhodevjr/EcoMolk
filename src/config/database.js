const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('bdecoMolk', 'root', '@LavaMe3FibraDeCarbono#', {
    host: 'localhost',
    dialect: 'mysql'
})

module.exports = sequelize;