const { DataTypes, Model } = require('sequelize')
const sequelize = require('../config/database')
const Users = require('./users')

class Residuos extends Model {}

Residuos.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },

    id_usuario: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Users,
            key: Users.id
        }
    },

    tipo: {
        type: DataTypes.STRING,
        allowNull: false
    },

    descricao: {
        type: DataTypes.TEXT,
        allowNull: true
    },

    quantidade: {
        type: DataTypes.INTEGER,
        defaultValue: null
    },

    forma_descarte: {
        type: DataTypes.STRING,
        allowNull: false
    },

    tipo_entrega: {
        type: DataTypes.STRING,
        allowNull: false
    }

}, {
    sequelize,
    modelName: 'Residuos',
    tableName: 'residuos'
})

module.exports = Residuos;