const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('bdecomolk', 'root', '@LavaMe3FibraDeCarbono#', {
    host: 'localhost',
    dialect: 'mysql'
})

module.exports = sequelize;