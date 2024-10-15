const express = require('express');
const sequelize = require('./config/database')

const app = express();

async function conn() {

    try {
        await sequelize.authenticate();
        console.log('Conexão estabelecida com sucesso.')
    }

    catch (error) {
        console.error('Erro na conexão: ', error)
    }

}
conn();

app.listen(3000, () =>{
    console.log('Servidor Funcionando');
})
