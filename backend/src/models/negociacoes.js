// const { DataTypes, Model } = require('sequelize')
// const sequelize = require('../config/database')
// const Users = require('./users')
// const Residuos = require('./residuos')

// class Negociacoes extends Model {}

// Negociacoes.init({
//     id: {
//         type: DataTypes.INTEGER,
//         allowNull: false,
//         primaryKey: true
//     },

//     id_residuos: {
//         type: DataTypes.INTEGER,
//         allowNull: false,
//         references: {
//             model: Residuos,
//             key: id
//         }
//     },

//     id_usuario_interessado: {
//         type: DataTypes.INTEGER,
//         allowNull: false,
//         references: {
//             model: Users,
//             key: id
//         }
//     },

//     data_negociacao: {
//         type: DataTypes.DATE,
//         defaultValue: DataTypes.NOW
//     },

//     status: {
//         type: DataTypes.ENUM('em_andamento', 'concluida', 'cancelada'),
//         defaultValue: 'em_andamento'
//     }

// }, {
//     sequelize,
//     modelName: 'Negociacoes',
//     tableName: 'negociacoes'
// })

// module.exports = Negociacoes;