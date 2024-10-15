const { DataTypes, Model } = require('sequelize')
const sequelize = require('../config/database')

class Users extends Model {}

Users.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },

    nome: {
        type: DataTypes.STRING,
        allowNull: false
    },

    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },

    senha: {
        type: DataTypes.STRING,
        allowNull: false
    },

    data_cadastro: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },

    tipo_usuario: {
        type: DataTypes.STRING,
        defaultValue: 'usuario'
    }

}, {
    sequelize,
    modelName: 'Users',
    tableName: 'users'
})

module.exports = Users;