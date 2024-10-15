const { DataTypes, Model } = require('sequelize')
const sequelize = require('../config/database')
const Users = require('./users')

class Produtos_servicos extends Model {}

Produtos_servicos.init({
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
            key: id
        }
    },

    nome: {
        type: DataTypes.STRING,
        allowNull: false
    },

    tipo: {
        type: DataTypes.ENUM('produto', 'servico'),
        allowNull: false
    },

    descricao: {
        type: DataTypes.TEXT
    },

    quantidade: {
        type: DataTypes.INTEGER,
        defaultValue: null
    },

    preco: {
        type: DataTypes.DOUBLE
    },

    data_postagem: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },

    status: {
        type: DataTypes.ENUM('ativo', 'inativo', 'em_negociacao'),
        defaultValue: 'ativo'
    }

}, {
    sequelize,
    modelName: 'Produtos_servicos',
    tableName: 'produtos_servicos'
})

module.exports = Produtos_servicos;