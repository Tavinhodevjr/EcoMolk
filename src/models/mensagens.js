// const { DataTypes, Model } = require('sequelize')
// const sequelize = require('../config/database')
// const Users = require('./users')
// const Residuos = require('./residuos')

// class Mensagens extends Model {}

// Mensagens.init({
//     id: {
//         type: DataTypes.INTEGER,
//         allowNull: false,
//         primaryKey: true
//     },

//     id_negociacao: {
//         type: DataTypes.INTEGER,
//         allowNull: false,
//         references: {
//             model: Residuos,
//             key: id
//         }
//     },

//     id_remetente: {
//         type: DataTypes.INTEGER,
//         allowNull: false,
//         references: {
//             model: Users,
//             key: id
//         }
//     },

//     id_destinatario: {
//         type: DataTypes.INTEGER,
//         allowNull: false,
//         references: {
//             model: Users,
//             key: id
//         }
//     },

//     mensagem: {
//         type: DataTypes.TEXT,
//         allowNull: false
//     },

//     data_envio: {
//         type: DataTypes.DATE,
//         defaultValue: DataTypes.NOW
//     }
// }, {
//     sequelize,
//     modelName: 'Mensagens',
//     tableName: 'mensagens'
// })

// module.exports = Mensagens;