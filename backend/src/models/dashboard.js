// const { DataTypes, Model } = require('sequelize')
// const sequelize = require('../config/database')
// const Users = require('./users')

// class Dashboard extends Model {}

// Dashboard.init({
//     id: {
//         type: DataTypes.INTEGER,
//         allowNull: false,
//         primaryKey: true
//     },

//     id_usuario: {
//         type: DataTypes.INTEGER,
//         allowNull: false,
//         references: {
//             model: Users,
//             key: id
//         }
//     },

//     num_produtos: {
//         type: DataTypes.INTEGER,
//         allowNull: false,
//         defaultValue: 0
//     },

//     num_servicos: {
//         type: DataTypes.INTEGER,
//         allowNull: false,
//         defaultValue: 0
//     },

//     num_negociacoes: {
//         type: DataTypes.INTEGER,
//         allowNull: false,
//         defaultValue: 0
//     },

//     data_ultima_atualizacao: {
//         type: DataTypes.DATE,
//         defaultValue: DataTypes.NOW
//     }
// }, {
//     sequelize,
//     modelName: 'Dashboard',
//     tableName: 'dashboard'
// })

// module.exports = Dashboard;