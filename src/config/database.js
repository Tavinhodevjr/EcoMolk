const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('bdEcoMolk', 'root', '@LavaMe3FibraDeCarbono#', {
    host: 'localhost',
    dialect: 'mysql'
})

module.exports = sequelize;