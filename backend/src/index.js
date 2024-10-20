const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const sequelize = require('./config/database');
const Users = require('./models/users');
const Residuos = require('./models/residuos');
const session = require('express-session')

const app = express();
app.use(express.json());
app.use(bodyParser.text());
app.use(bodyParser.json());
app.use(cors());
app.use(session({
    secret: 'chave-secreta',
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false } // FALSE para DESENVOLVIMENTO ------ TRUE para PRODUÇÃO
}))

//MÉTODO DE CONEXÃO COM O BANCO DE DADOS
async function conn() {

    try {
        await sequelize.authenticate(); //TENTA FAZER A CONEXÃO COM O BANCO
        console.log('Conexão estabelecida com sucesso.')

        await sequelize.sync({ force: false }) //{force: false} --> GARANTE QUE AS TABELAS JA EXISTENTES NÃO SEJAM SOBRESCRITAS
        console.log('Tabelas sincronizadas com sucesso.')
    }

    catch (error) {
        console.error('Erro na conexão: ', error)
    }

}
conn();

//MIDDLEWARE PARA VERIFICAR SE O USUÁRIO ESTÁ LOGADO
function verificaLogin(req, res, next) {
    
    //VERIFICA SE O ID DO USUÁRIO ESTA SALVO NA SESSÃO
    if(req.session.userId) {
        return next()
    }

    else{
        //RETORNA UMA MENSAGEM DE ERRO
        return res.status(401).json({ message: 'Acesso negado. Faça login para continuar.' })
    }
}

//ROTA PARA CADASTRO DE USUÁRIOS
app.post('/cadastrar', async (req, res) => { 

    try {
        //SOLICITA OS DADOS DO CORPO DA REQUISIÇÃO
        const { nome, email, senha, telefone, nome_empresa } = req.body

        //CRIANDO NOVO USUÁRIO COM SEQUELIZE
        const newUser = await Users.create({
            nome, 
            email, 
            senha,
            telefone,
            nome_empresa
        })

        //RETORNA UMA MENSAGEM DE SUCESSO EM JSON
        return res.status(201).json({ message: 'Usuário cadastrado com sucesso.', usuario: newUser })
    } 

    catch (error) {
        //RETORNA UMA MENSAGEM DE ERRO
        return res.status(500).json({ message: 'Erro ao cadastrar o usuário', error: error.message })
    }
})

//ROTA PARA A VERIFICAÇÃO DO LOGIN                        **IMPORTANTE: SEMPRE QUE FOR ENVIAR MAIS DE UMA RESPOSTA POR REQUISISÃO**
app.post('/login', async (req, res) => {              //     **ADICIONAR RETURN NAS RESPOSTAS PARA ENCERRAR O FLUXO DE EXECUÇÃO**

    try {
        //SOLICITA OS DADOS NO CORPO DA REQUISIÇÃO
        const { email, senha } = req.body

        //VERIFICA SE O EMAIL E SENHA ESTÃO NO BANCO DE DADOS
        const user = await Users.findOne({ where: { email, senha } })

        //VERIFICA AS CREDENCIAIS
        if(!user){
            return res.status(404).json({ message: 'Credenciais inválidas.' })
        }
        
        //ARMAZENA O ID DO USUÁRIO NA SESSÃO
        req.session.userId = user.id

        //MENSAGEM DE CONFIRMAÇÃO DO SISTEMA
        return res.status(200).json({ message: 'Login bem sucedido.', usuario: user })
    } 
    
    catch (error) {
        //RETORNA UMA MENSAGEM DE ERRO
        return res.status(500).json({ message: 'Erro ao tentar fazer login', error: error.message })
    }
})

//ROTA PARA CADASTRO DE RESIDUOS (COM USUÁRIO LOGADO)
app.post('/residuos', verificaLogin, async (req, res) =>{

    try {
        //SOLICITA OS DADOS NO CORPO DA REQUISIÇÃO
        const { tipo, descricao, quantidade, forma_descarte, tipo_entrega } = req.body

        //CADASTRANDO NOVO RESÍDUO COM ID DO USUÁRIO DA SESSÃO
        const newResiduo = await Residuos.create({
            id_usuario: req.session.userId,
            tipo, 
            descricao,
            quantidade,
            forma_descarte, 
            tipo_entrega
        })

        //RETORNA UMA MENSAGEM DE SUCESSO
        return res.status(200).json({ message: 'Resíduo cadastrado com sucesso:', residuo: newResiduo })
    } 
    
    catch (error) {
        //RETORNA UMA MENSAGEM DE ERRO
        return res.status(500).json({ message: 'Erro ao cadastrar novo resíduo:', error: error.message })
    }
})

//ROTA PARA EXIBIR OS RESÍDUOS (COM USUÁRIO LOGADO)
app.get('/seusResiduos', verificaLogin, async (req, res) => {

    try {
        //PORCURA PELO ID DO USUÁRIO NA TABELA RESIDUOS
        const residuos = await Residuos.findAll({
            where: {
                id_usuario: req.session.userId
            }
        })

        //VERIFICA SE O ID BATE NO BANCO DE DADOS
        if(residuos.length === 0) {
            return res.status(404).json({ message: 'Resíduos não encontrados.'})
        }

        //RETORNA OS RESÍDUOS DO USUÁRIO
        return res.status(200).json({ message: 'Resíduos encontrados com sucesso:', residuos: residuos })
    } 
    
    catch (error) {
        //RETORNA UMA MENSAGEM DE ERRO
        return res.status(500).json({ message: 'Erro ao exibir seus resíduos', error: error.message })
    }

})

app.listen(3000, () =>{
    console.log('Servidor Funcionando');
})
