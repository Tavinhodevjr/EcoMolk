
# ECOMOLK - Sistema Gerenciador de Resíduos e Serviços para Economia Circular

## Descrição

O ECOMOLK é uma plataforma desenvolvida para a gestão de resíduos e serviços voltados para a economia circular, com foco em indústrias e comércios. O principal objetivo do projeto é otimizar o gerenciamento de resíduos, promovendo práticas sustentáveis e facilitando a troca e reaproveitamento de materiais.

## Linguagens e Ferramentas

![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)  ![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white) ![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white)![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white) ![MySQL](https://img.shields.io/badge/mysql-%2300f.svg?style=for-the-badge&logo=mysql&logoColor=white) ![Bootstrap](https://img.shields.io/badge/bootstrap-%238511FA.svg?style=for-the-badge&logo=bootstrap&logoColor=white) ![Visual Studio Code](https://img.shields.io/badge/Visual%20Studio%20Code-0078d7.svg?style=for-the-badge&logo=visual-studio-code&logoColor=white) ![GitHub](https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white) ![Trello](https://img.shields.io/badge/Trello-%23026AA7.svg?style=for-the-badge&logo=Trello&logoColor=white)  

## Estrutura do Projeto

# Estrutura do Projeto

- **`EcoMolk/`**:
  - **`node_modules/`**:  
    Diretório gerado automaticamente após a instalação das dependências com `npm install`. Contém as bibliotecas e módulos necessários para o funcionamento do projeto.

  - **`public/`**:  
    Contém arquivos estáticos acessíveis diretamente pelo navegador, como estilos, imagens e scripts JavaScript.  
    - **`css/`**: Folhas de estilo para customizar a aparência do site, incluindo os estilos criados para o projeto.  
    - **`images/`**: Imagens utilizadas no site, como logotipos, banners ou ícones.  
    - **`js/`**: Scripts JavaScript específicos para o frontend, adicionando interatividade e lógica personalizada.  

  - **`src/`**:  
    Contém a lógica do backend, organizada por responsabilidades.  
    - **`config/`**: Configurações gerais do projeto, como conexões ao banco de dados, variáveis de ambiente e parâmetros globais.  
    - **`controllers/`**: Controladores que implementam a lógica de negócios e processam as requisições recebidas pelas rotas.  
    - **`middlewares/`**: Funções intermediárias que executam tarefas como autenticação, validação de dados e manipulação de erros.  
    - **`models/`**: Modelos que representam as tabelas do banco de dados, implementados com Sequelize ou outra biblioteca ORM.  
    - **`routes/`**: Define as rotas/endpoints da API, conectando URLs às funções dos controladores.  
    - **`views/`**: Arquivos HTML ou EJS utilizados para renderizar páginas no lado do servidor.  

  - **`index.js`**:  
    Arquivo principal do servidor. É responsável por:  
    - Inicializar o servidor Express.js.  
    - Configurar middlewares globais.  
    - Carregar as rotas e conectá-las ao backend.  
    - Conectar-se ao banco de dados e iniciar o servidor na porta definida.

- **`README.md`**: Documentação do projeto (você está lendo essa parte!)
  
- **`Documentação`**: Pasta com a documentação de desenvolvimento do projeto.

## Como Usar

```
# Clonar o repositório
- git clone https://github.com/SeuUsuario/ECOMOLK.git

# Navegar para a pasta 'src' e instalar dependências
- cd .\ECOMOLK\src\
- npm install

# Rodar o back-end (Node.js)
- cd .\ECOMOLK\src\
- npm start

```

## Implantações
Este projeto faz parte de uma atividade acadêmica e não está disponível em produção pública.

## Versionamento
- 1.0.0 - Versão inicial

## Autor(es)

- Equipe MOLK (Kariny, Kalled, Laura, Leandro, Maria, Otávio)

## Contatos

- ecomolk@gmail.com
