const { DataTypes, Model } = require('sequelize')
const sequelize = require('../config/database')
const Users = require('./users')
const Produtos_servicos = require('./produtos_servicos')

class Negociacoes extends Model {}

Negociacoes.init({
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true
    },

    id_produto_servico: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Produtos_servicos,
            key: id
        }
    },

    id_usuario_interessado: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Users,
            key: id
        }
    },

    data_negociacao: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW
    },

    status: {
        type: DataTypes.ENUM('em_andamento', 'concluida', 'cancelada'),
        defaultValue: 'em_andamento'
    }

}, {
    sequelize,
    modelName: 'Negociacoes',
    tableName: 'negociacoes'
})

module.exports = Negociacoes;