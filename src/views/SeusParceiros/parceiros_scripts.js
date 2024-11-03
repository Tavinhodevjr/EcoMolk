// Variável para armazenar dados dos parceiros
let usuariosData = [];

// Função para buscar o número de resíduos em status "negociando"
async function fetchResiduosNegociando() {
    try {
        const response = await fetch('/negociando/count');
        const data = await response.json();

        if (response.ok) {
            document.getElementById('residuosNegociando').innerText = data.quantidade; // Supondo que você tenha um elemento com esse ID
        } else {
            console.error(data.message);
        }
    } catch (error) {
        console.error('Erro ao buscar resíduos em negociação:', error);
    }
}

// Função para buscar o número de resíduos em status "concluido"
async function fetchResiduosConcluidos() {
    try {
        const response = await fetch('/concluido/count');
        const data = await response.json();

        if (response.ok) {
            document.getElementById('residuosConcluidos').innerText = data.quantidade; // Supondo que você tenha um elemento com esse ID
        } else {
            console.error(data.message);
        }
    } catch (error) {
        console.error('Erro ao buscar resíduos concluídos:', error);
    }
}

// Função para buscar o número de resíduos em status "cancelado"
async function fetchResiduosCancelados() {
    try {
        const response = await fetch('/cancelado/count');
        const data = await response.json();

        if (response.ok) {
            document.getElementById('residuosCancelados').innerText = data.quantidade; // Supondo que você tenha um elemento com esse ID
        } else {
            console.error(data.message);
        }
    } catch (error) {
        console.error('Erro ao buscar resíduos cancelados:', error);
    }
}

// Função para buscar o número de resíduos disponíveis
async function fetchResiduosDisponiveis() {
    try {
        const response = await fetch('/disponiveis/count'); // Chama a rota que você criou
        const data = await response.json();

        if (response.ok) {
            // Atualiza o elemento que exibe a quantidade de resíduos disponíveis
            document.getElementById('residuosDisponiveis').innerText = data.quantidade; // Supondo que você tenha um elemento com esse ID
        } else {
            console.error(data.message);
        }
    } catch (error) {
        console.error('Erro ao buscar resíduos disponíveis:', error);
    }
}

// Função para buscar usuários de outros usuários e o total de parceiros
async function fetchUsuarios() {
    try {
        const response = await fetch('/usuarios/outsiders'); // Chama a rota que você criou
        const data = await response.json();

        if (response.ok) {
            usuariosData = data.usuarios; // Armazena os usuários para pesquisa
            generateUserCards(usuariosData); // Exibe todos os usuários inicialmente

            // Obter o total de parceiros cadastrados
            const totalResponse = await fetch('/parceiros/total'); // Chama a rota para obter o total
            const totalData = await totalResponse.json();

            if (totalResponse.ok) {
                // Atualiza o card "Parceiros Cadastrados" com o total
                document.getElementById('parceirosTotal').innerText = totalData.total;
            } else {
                console.error(totalData.message);
            }
        } else {
            console.error(data.message);
            document.getElementById('usersContainer').innerHTML = '<p>' + data.message + '</p>';
        }
    } catch (error) {
        console.error('Erro ao buscar usuários:', error);
    }
}

// Função para pesquisar parceiros com base no termo inserido
window.searchParceiros = function () {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    const filteredUsers = usuariosData.filter(user =>
        user.nome_empresa.toLowerCase().includes(searchTerm) || // Filtra pelo nome da empresa
        user.nome.toLowerCase().includes(searchTerm) // Filtra pelo nome do responsável
    );
    generateUserCards(filteredUsers); // Exibe os usuários filtrados
};

// Função para gerar os cards dos usuários
function generateUserCards(users) {
    const container = document.getElementById('usersContainer');
    container.innerHTML = ''; // Limpa o conteúdo existente

    const numCardsPerSlide = 3; // Número de cards por slide
    let slideIndex = 0; // Índice do slide atual

    // Gerar os slides do carrossel
    while (slideIndex * numCardsPerSlide < users.length) {
        const slide = document.createElement('div');
        slide.className = `carousel-item ${slideIndex === 0 ? 'active' : ''}`; // Marca o primeiro slide como ativo
        const cardGroup = document.createElement('div');
        cardGroup.className = 'row'; // Cria uma linha para os cards

        // Adicionar cards ao slide
        for (let i = 0; i < numCardsPerSlide; i++) {
            const userIndex = slideIndex * numCardsPerSlide + i;
            if (userIndex < users.length) {
                const user = users[userIndex];
                const card = `
                    <div class="col">
                        <div class="card">
                            <div class="card-body">
                                <h5 class="card-title">${user.nome_empresa}</h5>
                                <p class="card-text"><strong>Nome do responsável:</strong> ${user.nome}</p>
                                <p class="card-text"><strong>Email de contato:</strong> ${user.email}</p>
                                <p class="card-text"><strong>Telefone de contato:</strong> ${user.telefone}</p>
                            </div>
                        </div>
                    </div>
                `;
                cardGroup.innerHTML += card; // Adiciona o card ao grupo de cards
            }
        }

        slide.appendChild(cardGroup); // Adiciona o grupo de cards ao slide
        container.appendChild(slide); // Adiciona o slide ao carrossel
        slideIndex++;
    }
}

// Chama as funções quando a página carregar
window.onload = function() {
    fetchUsuarios();             // Busca os usuários
    fetchResiduosDisponiveis(); // Busca os resíduos disponíveis
    fetchResiduosNegociando();  // Busca os resíduos em negociação
    fetchResiduosConcluidos();  // Busca os resíduos concluídos
    fetchResiduosCancelados();  // Busca os resíduos cancelados
};
