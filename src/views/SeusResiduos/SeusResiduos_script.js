let residuos = []; // Armazena os dados para acesso nas funções


async function carregarResiduos() {
    try {
        const response = await fetch('http://localhost:3000/seusResiduos');
        const data = await response.json();

        if (response.ok) {

            // Processa os resíduos para converter a imagem em base64
            residuos = data.residuos.map(residuo => {
                if (residuo.imagem_residuo) {
                    residuo.imagem_residuo = btoa(String.fromCharCode(...new Uint8Array(residuo.imagem_residuo.data)));
                }
                return residuo;
            });

            residuos = data.residuos; // Armazena os resíduos recebidos
            displayCarousel(residuos); // Mostra os resíduos no carrossel
        } else {
            alert(data.message);
        }
    } catch (error) {
        console.error('Erro ao buscar resíduos:', error);
    }
}

function displayCarousel(data) {
    const container = document.getElementById('residuos-container');
    container.innerHTML = '';

    const itemsPerPage = 3;
    const totalPages = Math.ceil(data.length / itemsPerPage);

    for (let i = 0; i < totalPages; i++) {
        const carouselItem = document.createElement('div');
        carouselItem.classList.add('carousel-item');
        if (i === 0) carouselItem.classList.add('active');

        const row = document.createElement('div');
        row.classList.add('row');

        const start = i * itemsPerPage;
        const end = start + itemsPerPage;
        const cardsToShow = data.slice(start, end);

        cardsToShow.forEach(residuo => {
            row.innerHTML += criarCard(residuo);
        });

        carouselItem.appendChild(row);
        container.appendChild(carouselItem);
    }
}

// Função para pesquisar resíduos com base no termo inserido
window.searchResiduos = function () {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    const filteredResiduos = residuos.filter(residuo =>
        residuo.tipo.toLowerCase().includes(searchTerm) ||        // Filtra pelo tipo de resíduo
        residuo.descricao.toLowerCase().includes(searchTerm) ||   // Filtra pela descrição do resíduo
        residuo.status_residuo.toLowerCase().includes(searchTerm) // Filtra pelo status do resíduo
    );
    displayCarousel(filteredResiduos); // Reutiliza o carrossel para exibir os resíduos filtrados
};

function criarCard(residuo) {
    const imageUrl = residuo.imagem_residuo ? `data:image/jpeg;base64,${residuo.imagem_residuo}` : './sem_imagem_residuo.png';
    const opcoesStatus = gerarOpcoesStatus(residuo.status_residuo); // Chama a função para gerar as opções de status
    // Formata a data para o formato dd/mm/aaaa
    const dataFormatada = new Date(residuo.createdAt).toLocaleDateString('pt-BR');
    const empresaInteressada = residuo.nome_empresa_interessada || "Sem registro"; // Verifica se há empresa interessada
    return `
        <div class="col-md-4 mb-4">
            <div class="card">
                <img src="${imageUrl}" class="card-img-top" alt="Imagem do resíduo" style="width: 100%; height: auto; object-fit: cover;">
                <div class="card-body">
                    <h5 class="card-title">${residuo.tipo}</h5>
                    <p class="card-text"><b>Descrição:</b> ${residuo.descricao || 'Não informada'}</p>
                    <p class="card-text"><b>Quantidade:</b> ${residuo.quantidade || 'Não informada'}</p>
                    <p class="card-text"><b>Cadastrado em:</b> ${dataFormatada}</p>
                    <p class="card-text"><b>Entrega:</b> ${residuo.tipo_entrega || 'Não informada'}</p>
                    <p class="card-text"><b>Empresa Interessada:</b> ${empresaInteressada}</p> <!-- Novo campo -->

                    <!-- Ajuste na estrutura de Status -->
                    <div class="d-flex align-items-center">
                        <label for="status-${residuo.id}" class="me-2"><b>Status:</b></label>
                        <select id="status-${residuo.id}" class="form-select form-select-sm" style="width: 220px;" onchange="toggleUpdateButton(${residuo.id})">
                            ${opcoesStatus}
                        </select>
                    </div>

                    <button id="update-btn-${residuo.id}" class="btn btn-success mt-2" onclick="atualizarStatus(${residuo.id})" disabled>Atualizar</button>
                </div>
            </div>
        </div>
    `;
}


// Gera as opções de status dinamicamente
function gerarOpcoesStatus(statusAtual) {
    const opcoes = ['disponivel', 'negociando', 'concluido', 'cancelado'];
    return opcoes.map(status => 
        `<option value="${status}" ${status === statusAtual ? 'selected' : ''}>${status}</option>`
    ).join(''); // Junta as opções em uma string
}

function toggleUpdateButton(residuoId) {
    const select = document.getElementById(`status-${residuoId}`);
    const updateButton = document.getElementById(`update-btn-${residuoId}`);
    
    // Obtém o status atual do resíduo, que foi armazenado em `residuos`
    const residuo = residuos.find(r => r.id === residuoId);
    const statusAtual = residuo.status_residuo;

    // Habilita o botão se o status selecionado for diferente do status atual
    updateButton.disabled = (select.value === statusAtual);
}


// Função para atualizar o status do resíduo
async function atualizarStatus(residuoId) {
    const select = document.getElementById(`status-${residuoId}`);
    const novoStatus = select.value;
    
    try {
        const response = await fetch(`http://localhost:3000/atualizarStatus/${residuoId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ novoStatus })
        });
        
        // Verifique se a resposta não é ok
        if (!response.ok) {
            const errorMessage = await response.text(); // Captura a resposta como texto
            throw new Error(`Erro ${response.status}: ${errorMessage}`); // Lança um erro com a resposta
        }

        const data = await response.json(); // Tenta parsear como JSON
        alert(data.message); // Mensagem de sucesso ou erro
        carregarResiduos(); // Recarrega os resíduos para atualizar a lista
    } catch (error) {
        console.error('Erro ao atualizar status:', error);
        alert('Erro ao atualizar status: ' + error.message);
    }
}


// Chama a função para carregar os interesses ao carregar a página

carregarResiduos();

let interesses = []; // Armazena os dados dos resíduos de interesse

// Função para criar o card de resíduo de interesse
function criarCardInteresse(residuo) {
    const imageUrl = residuo.imagem_residuo ? `data:image/jpeg;base64,${residuo.imagem_residuo}` : './sem_imagem_residuo.png';
    const dataFormatada = new Date(residuo.createdAt).toLocaleDateString('pt-BR');
     // Adiciona o nome da empresa (de quem cadastrou o resíduo) ao card
     const nomeEmpresaDona = residuo.nome_empresa_dona || 'Empresa não identificada';
    
    return `
        <div class="col-md-4 mb-4">
            <div class="card">
                <img src="${imageUrl}" class="card-img-top" alt="Imagem do resíduo" style="width: 100%; height: auto; object-fit: cover;">
                <div class="card-body">
                    <h5 class="card-title">${residuo.tipo}</h5>
                    <p class="card-text"><b>Descrição:</b> ${residuo.descricao || 'Não informada'}</p>
                    <p class="card-text"><b>Quantidade:</b> ${residuo.quantidade || 'Não informada'}</p>
                    <p class="card-text"><b>Negociando com:</b> ${nomeEmpresaDona}</p> <!-- Novo campo "Negociando com" -->
                    <p class="card-text"><b>Cadastrado em:</b> ${dataFormatada}</p>
                    <p class="card-text"><b>Entrega:</b> ${residuo.tipo_entrega || 'Não informada'}</p>
                    <p class="card-text"><b>Status:</b> ${residuo.status_residuo || 'Não informada'}</p>
                </div>
            </div>
        </div>
    `;
}

// Função para exibir os resíduos de interesse no carrossel
function displayInteressesCarousel(data) {
    const container = document.getElementById('interesses-container');
    container.innerHTML = '';

    const itemsPerPage = 3;
    const totalPages = Math.ceil(data.length / itemsPerPage);

    for (let i = 0; i < totalPages; i++) {
        const carouselItem = document.createElement('div');
        carouselItem.classList.add('carousel-item');
        if (i === 0) carouselItem.classList.add('active');

        const row = document.createElement('div');
        row.classList.add('row');

        const start = i * itemsPerPage;
        const end = start + itemsPerPage;
        const cardsToShow = data.slice(start, end);

        cardsToShow.forEach(residuo => {
            row.innerHTML += criarCardInteresse(residuo); // Cria os cards de resíduos de interesse
        });

        carouselItem.appendChild(row);
        container.appendChild(carouselItem);
    }
}


// Função para carregar os resíduos de interesse
async function carregarInteressesResiduos() {
    try {
        const response = await fetch('http://localhost:3000/interessesResiduos');
        const data = await response.json();

        if (response.ok) {
            interesses = data.residuos.map(residuo => {
                if (residuo.imagem_residuo) {
                    residuo.imagem_residuo = btoa(String.fromCharCode(...new Uint8Array(residuo.imagem_residuo.data)));
                }
                return residuo;
            });

            interesses = data.residuos; // Armazena os resíduos recebidos
            displayInteressesCarousel(interesses); // Mostra os resíduos de interesse no carrossel
        } else {
            alert(data.message);
        }
    } catch (error) {
        console.error('Erro ao buscar resíduos de interesse:', error);
    }
}

carregarInteressesResiduos();





