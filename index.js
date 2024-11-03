const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const sequelize = require('./src/config/database.js');
const Users = require('./src/models/users');
const Residuos = require('./src/models/residuos');
const session = require('express-session');
const verificaLogin = require('./src/middleware/index.js');
const path = require('path');
const { where } = require('sequelize');
const multer = require('multer');

// Configuração do multer para armazenar o arquivo em memória
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const app = express();
app.use(express.static(__dirname + '/src/views'));
app.use('/src/views', express.static(path.join(__dirname, 'src', 'views')));
// app.use(express.static(__dirname + '/public'))
// app.use('/public/images/IMGS', express.static(path.join(__dirname, 'public', 'images', 'IMGS')))
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

        await sequelize.sync({ alter: true }) //{force: false} --> GARANTE QUE AS TABELAS JA EXISTENTES NÃO SEJAM SOBRESCRITAS
        console.log('Tabelas sincronizadas com sucesso.')
    }

    catch (error) {
        console.error('Erro na conexão: ', error)
    }

}
conn();

// Rota GET para exibir a página de login
app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'src', 'views', 'Login', 'login_index.html'));
});

// Rota para exibir a página de "Seus Resíduos"
app.get('/seusResiduosPage', (req, res) => {
    res.sendFile(path.join(__dirname, 'src', 'views', 'SeusResiduos', 'SeusResiduos_index.html'));
});

//ROTA PARA EXIBIR A PÁGINA ADD RESIDUOS
app.get('/addResiduos', (req, res) => {
    res.sendFile(path.join(__dirname, 'src', 'views', 'AddResiduos', 'AddResiduos_index.html'))
})

//ROTA PARA EXIBIR A PÁGINA HOME
app.get('/home', (req, res) => {
    res.sendFile(path.join(__dirname, 'src', 'views', 'Home', 'home_index.html'))
})

//ROTA PARA A LANDING PAGE
app.get('/landingPage', (req, res) => {
    res.sendFile(path.join(__dirname, 'src', 'views', 'LandingPage', 'LandingPage_index.html'))
})

//ROTA PARA O CADASTRO
app.get('/queroConectar', (req, res) => {
    res.sendFile(path.join(__dirname, 'src', 'views', 'QueroConectar', 'conectar_index.html'))
})

//ROTA PARA SEUS PARCEIROS
app.get('/seusParceiros', (req, res) => {
    res.sendFile(path.join(__dirname, 'src', 'views', 'SeusParceiros', 'parceiros_index.html'))
})

//ROTA PARA DASHBOARD
app.get('/dashboard', (req, res) => {
    res.sendFile(path.join(__dirname, 'src', 'views', 'Dashboard', 'dashboard_index.html'))
})

//ROTA PARA ENTREGAS
app.get('/entregas', (req, res) => {
    res.sendFile(path.join(__dirname, 'src', 'views', 'Entregas', 'entregas_index.html'))
})

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

//ROTA PARA CADASTRO DE RESIDUOS (COM USUÁRIO LOGADO E UPLOAD DE IMAGEM)
app.post('/residuos', verificaLogin, upload.single('imagem-residuo'), async (req, res) =>{

    try {
        //SOLICITA OS DADOS NO CORPO DA REQUISIÇÃO
        const { tipo, descricao, quantidade, forma_descarte, tipo_entrega } = req.body
        const imagemResiduo = req.file ? req.file.buffer : null; // Captura o buffer da imagem, se houver

        //CADASTRANDO NOVO RESÍDUO COM ID DO USUÁRIO DA SESSÃO E A IMAGEM
        const newResiduo = await Residuos.create({
            id_usuario: req.session.userId,
            tipo, 
            descricao,
            quantidade,
            forma_descarte, 
            tipo_entrega,
            imagem_residuo: imagemResiduo // Salva a imagem como BLOB
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

// ROTA PARA OBTER RESÍDUOS DE OUTROS USUÁRIOS COM NOME DA EMPRESA
app.get('/residuos/outsiders', verificaLogin, async (req, res) => {
    try {
        const usuarioId = req.session.userId;

        // Busca todos os resíduos "disponíveis" e inclui o nome da empresa do usuário associado
        const todosResiduos = await Residuos.findAll({
            where: {
                status_residuo: 'disponivel' // Adiciona a condição para status_residuo
            },
            include: [{ model: Users, as: 'usuario', attributes: ['nome_empresa'] }]
        });

        // Filtra para manter apenas resíduos de outros usuários
        const residuosOutrosUsuarios = todosResiduos.filter(residuo => residuo.id_usuario !== usuarioId);

        if (residuosOutrosUsuarios.length === 0) {
            return res.status(404).json({ message: 'Não há resíduos cadastrados de outros usuários.' });
        }

        return res.status(200).json({ message: 'Resíduos de outros usuários encontrados com sucesso:', residuos: residuosOutrosUsuarios });
    } catch (error) {
        console.error('Erro na rota /residuos/outsiders:', error);
        return res.status(500).json({ message: 'Erro ao exibir os resíduos de outros usuários', error: error.message });
    }
});


// ROTA PARA OBTER USUÁRIOS EXCLUINDO O USUÁRIO LOGADO
app.get('/usuarios/outsiders', verificaLogin, async (req, res) => {
    try {
        const usuarioId = req.session.userId;

        // Busca todos os usuários incluindo os campos desejados
        const todosUsuarios = await Users.findAll({
            attributes: ['id', 'nome_empresa', 'nome', 'email', 'telefone'] // Incluindo os novos campos
        });

        // Filtra para manter apenas usuários que não são o logado
        const usuariosOutros = todosUsuarios.filter(usuario => usuario.id !== usuarioId);

        if (usuariosOutros.length === 0) {
            return res.status(404).json({ message: 'Não há usuários cadastrados além do logado.' });
        }

        return res.status(200).json({ message: 'Usuários encontrados com sucesso:', usuarios: usuariosOutros });
    } catch (error) {
        console.error('Erro na rota /usuarios/outsiders:', error);
        return res.status(500).json({ message: 'Erro ao exibir os usuários', error: error.message });
    }
});

//ROTA PARA CONECTAR O USUARIO INTERESSADO EM UM RESIDUO DE OUTRO USUARIO
app.post('/conectarResiduo', verificaLogin, async (req, res) => {

    try {
        //PEGA O ID O USUARIO LOGADO E O ID DO RESIDUO
        const userId = req.session.userId
        const { residuoId } = req.body

        //ATUALIZA A TABELA RESIDUOS COM O ID DO USUARIO INTERESSADO
        const [conectarResiduo] = await Residuos.update(
            { 
                id_usuario_interessado: userId,
                status_residuo: 'negociando' 
            },
            { where: { id: residuoId } }
        ) 

        //VERIFICA SE O RESÍDUO EXISTE
        if(conectarResiduo === 0) {
            return res.status(404).json({ message: 'Resíduo não encontrado.' })
        }

        //MENSAGEM DE SUCESSO DO SISTEMA
        return res.status(200).json({ message: 'Conexão com o resíduo realizada com sucesso.' })
    } 
    
    catch (error) {
        //MENSAGEM DE ERRO DO SISTEMA
        return res.status(500).json({ message: 'Erro ao tentar se conectar ao resíduo', error: error.message })
    }
})

app.get('/usuarios/dados', verificaLogin, async (req, res) => {
    try {
        const usuarioLogado = await Users.findByPk(req.session.userId);
        if (usuarioLogado) {
            // Extrai apenas a primeira palavra do nome
            const primeiroNome = usuarioLogado.nome.split(' ')[0];
            return res.json({ nome: primeiroNome, nome_empresa: usuarioLogado.nome_empresa });
        } else {
            return res.status(404).json({ error: 'Usuário não encontrado' });
        }
    } catch (error) {
        return res.status(500).json({ message: 'Erro ao buscar dados do usuário', error: error.message });
    }
});

// ROTA PARA OBTER O TOTAL DE PARCEIROS CADASTRADOS, EXCLUINDO O USUÁRIO ATUAL
app.get('/parceiros/total', verificaLogin, async (req, res) => {
    try {
        const usuarioId = req.session.userId;

        // Conta o total de usuários cadastrados
        const totalParceiros = await Users.count();

        // Subtrai 1 se houver pelo menos um parceiro e o usuário atual não for o único cadastrado
        const totalExcluindoAtual = totalParceiros > 0 ? totalParceiros - 1 : 0;

        return res.status(200).json({ message: 'Total de parceiros cadastrados com sucesso:', total: totalExcluindoAtual });
    } catch (error) {
        console.error('Erro na rota /parceiros/total:', error);
        return res.status(500).json({ message: 'Erro ao exibir o total de parceiros cadastrados', error: error.message });
    }
});

// Rota para buscar o número de resíduos disponíveis, excluindo o usuário ativo
app.get('/disponiveis/count', verificaLogin, async (req, res) => {
    try {
        const userId = req.session.userId;

        // Contando resíduos com status "disponível" e excluindo os do usuário ativo
        const countDisponiveis = await Residuos.count({
            where: {
                status_residuo: 'disponivel',
                id_usuario: userId // Usaremos uma função de contar fora para subtrair depois
            }
        });

        // Contando todos os resíduos disponíveis
        const totalDisponiveis = await Residuos.count({
            where: {
                status_residuo: 'disponivel'
            }
        });

        // Calculando o total excluindo o usuário ativo
        const totalExcluindoAtual = totalDisponiveis - countDisponiveis;

        // Retornando apenas a contagem
        res.json({ quantidade: totalExcluindoAtual });
    } catch (error) {
        console.error("Erro ao contar resíduos disponíveis:", error);
        res.status(500).json({ message: 'Erro ao contar resíduos disponíveis' });
    }
});

// Rota para buscar o número de resíduos em status "negociando", excluindo o usuário ativo
app.get('/negociando/count', verificaLogin, async (req, res) => {
    try {
        const userId = req.session.userId;

        // Contando resíduos com status "negociando" e excluindo os do usuário ativo
        const countNegociando = await Residuos.count({
            where: {
                status_residuo: 'negociando',
                id_usuario: userId // Usaremos uma função de contar fora para subtrair depois
            }
        });

        // Contando todos os resíduos em status "negociando"
        const totalNegociando = await Residuos.count({
            where: {
                status_residuo: 'negociando'
            }
        });

        // Calculando o total excluindo o usuário ativo
        const totalExcluindoAtual = totalNegociando - countNegociando;

        // Retornando apenas a contagem
        res.json({ quantidade: totalExcluindoAtual });
    } catch (error) {
        console.error("Erro ao contar resíduos em negociação:", error);
        res.status(500).json({ message: 'Erro ao contar resíduos em negociação' });
    }
});

// Rota para buscar o número de resíduos em status "concluido", excluindo o usuário ativo
app.get('/concluido/count', verificaLogin, async (req, res) => {
    try {
        const userId = req.session.userId;

        // Contando resíduos com status "concluido" e excluindo os do usuário ativo
        const countConcluido = await Residuos.count({
            where: {
                status_residuo: 'concluido',
                id_usuario: userId // Usaremos uma função de contar fora para subtrair depois
            }
        });

        // Contando todos os resíduos em status "concluido"
        const totalConcluido = await Residuos.count({
            where: {
                status_residuo: 'concluido'
            }
        });

        // Calculando o total excluindo o usuário ativo
        const totalExcluindoAtual = totalConcluido - countConcluido;

        // Retornando apenas a contagem
        res.json({ quantidade: totalExcluindoAtual });
    } catch (error) {
        console.error("Erro ao contar resíduos concluídos:", error);
        res.status(500).json({ message: 'Erro ao contar resíduos concluídos' });
    }
});

// Rota para buscar o número de resíduos em status "cancelado", excluindo o usuário ativo
app.get('/cancelado/count', verificaLogin, async (req, res) => {
    try {
        const userId = req.session.userId;

        // Contando resíduos com status "cancelado" e excluindo os do usuário ativo
        const countCancelado = await Residuos.count({
            where: {
                status_residuo: 'cancelado',
                id_usuario: userId // Usaremos uma função de contar fora para subtrair depois
            }
        });

        // Contando todos os resíduos em status "cancelado"
        const totalCancelado = await Residuos.count({
            where: {
                status_residuo: 'cancelado'
            }
        });

        // Calculando o total excluindo o usuário ativo
        const totalExcluindoAtual = totalCancelado - countCancelado;

        // Retornando apenas a contagem
        res.json({ quantidade: totalExcluindoAtual });
    } catch (error) {
        console.error("Erro ao contar resíduos cancelados:", error);
        res.status(500).json({ message: 'Erro ao contar resíduos cancelados' });
    }
});

// ROTA PARA ATUALIZAR O STATUS DO RESÍDUO
app.put('/atualizarStatus/:id', verificaLogin, async (req, res) => {
    const { id } = req.params; // ID do resíduo
    const { novoStatus } = req.body; // O novo status enviado pelo cliente

    try {
        // Verifica se o resíduo existe antes de tentar atualizar
        const residuo = await Residuos.findByPk(id);
        if (!residuo) {
            return res.status(404).json({ message: 'Resíduo não encontrado.' });
        }

        // Atualiza o status do resíduo
        const resultado = await Residuos.update(
            { status_residuo: novoStatus }, // Certifique-se de usar o nome correto do campo
            { where: { id: id } }
        );

        // Verifica se a atualização foi bem-sucedida
        if (resultado[0] === 0) {
            return res.status(404).json({ message: 'Resíduo não encontrado ou status não atualizado.' });
        }

        return res.status(200).json({ message: 'Status atualizado com sucesso.' });
    } catch (error) {
        console.error('Erro ao atualizar status:', error); // Log de erro para depuração
        return res.status(500).json({ message: 'Erro ao atualizar status', error: error.message });
    }
});





app.listen(3000, () => {
    console.log('Servidor Funcionando');

    // Função para abrir a página automaticamente no navegador
    async function abrirPagina(url) {
        const open = await import('open'); // Importa o módulo 'open' dinamicamente
        open.default(url); // Abre o navegador na URL especificada
    }

    abrirPagina('http://localhost:3000/landingPage'); // Altere o caminho conforme necessário
});

