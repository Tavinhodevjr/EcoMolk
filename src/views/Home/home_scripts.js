// Função de logout
async function logout() {
    try {
        const response = await fetch('http://localhost:3000/logout', {
            method: 'POST',
            credentials: 'include' // Garante que os cookies de sessão sejam enviados
        });

        const result = await response.json();
        if (response.ok) {
            alert(result.message);
            window.location.href = '../Login/login_index.html'; // Redireciona para a página de login
        } else {
            alert('Erro: ' + result.message);
        }
    } 
    
    catch (error) {
        console.error('Erro ao tentar realizar logout:', error);
    }
}

document.addEventListener("DOMContentLoaded", async () => {
    const container = document.getElementById('residuosContainer');
    let residuosData = [];
    const nomeUsuarioElement = document.getElementById('nomeUsuario'); // Nome do usuário logado
    const nomeEmpresaElement = document.getElementById('nomeEmpresa'); // Nome da empresa do usuário logado

    // Função para carregar os resíduos do servidor
    async function loadResiduos() {
        try {
            const response = await fetch('http://localhost:3000/residuos/outsiders', {
                method: 'GET',
                credentials: 'include' // Inclui cookies de sessão
            });

            if (!response.ok) {
                throw new Error('Erro ao carregar resíduos: ' + response.statusText);
            }

            const data = await response.json();

            // Processa os resíduos para converter a imagem em base64
            const residuos = data.residuos.map(residuo => {
                if (residuo.imagem_residuo) {
                    residuo.imagem_residuo = btoa(String.fromCharCode(...new Uint8Array(residuo.imagem_residuo.data)));
                }
                return residuo;
            });

            residuosData = data.residuos; // Armazena os resíduos para pesquisa
            displayResiduos(residuosData); // Exibe os resíduos carregados
        } catch (error) {
            console.error(error);
            container.innerHTML = '<p>Ainda não há resíduos cadastrados!</p>';
        }
    }

    // Função para carregar dados do usuário logado
    async function loadUserData() {
        try {
            const response = await fetch('http://localhost:3000/usuarios/dados', {
                method: 'GET',
                credentials: 'include' // Inclui cookies de sessão
            });

            if (!response.ok) {
                throw new Error('Erro ao carregar dados do usuário: ' + response.statusText);
            }

            const data = await response.json();
            // Atualiza os elementos com os dados do usuário logado
            if (data && data.nome) {
                nomeUsuarioElement.textContent = data.nome; // Exibe o nome do usuário
            } else {
                nomeUsuarioElement.textContent = 'Usuário Desconhecido'; // Valor padrão em caso de erro
            }

            if (data && data.nome_empresa) {
                nomeEmpresaElement.textContent = data.nome_empresa; // Exibe o nome da empresa
            } else {
                nomeEmpresaElement.textContent = 'Empresa Desconhecida'; // Valor padrão em caso de erro
            }
        } catch (error) {
            console.error(error);
            nomeUsuarioElement.textContent = 'Usuário Desconhecido'; // Valor padrão em caso de erro
            nomeEmpresaElement.textContent = 'Empresa Desconhecida'; // Valor padrão em caso de erro
        }
    }

    function displayResiduos(residuos) {
        container.innerHTML = ''; // Limpa o container antes de exibir
        residuos.forEach(residuo => {
            const card = document.createElement('div');
            card.className = 'card mb-3 p-3 d-flex flex-column align-items-center'; // Alinha o card em coluna e centraliza

            // Verifica se a imagem existe, caso contrário define uma imagem padrão
            const imageUrl = residuo.imagem_residuo ? `data:image/png;base64,${residuo.imagem_residuo}` : './sem_imagem_residuo.png';


            card.innerHTML = `
                <img src="${imageUrl}" class="card-img-top img-fluid rounded-start" alt="Imagem do resíduo" style="width: 120px; height: 120px; object-fit: cover; margin-bottom: 10px;">
                <h2 class="text-center">${residuo.tipo}</h2> <!-- Centraliza o título -->
                <p class="text-center"><strong>Empresa:</strong> ${residuo.usuario.nome_empresa}</p>
                <p class="text-center"><strong>Descrição:</strong> ${residuo.descricao}</p>
                <p class="text-center"><strong>Quantidade:</strong> ${residuo.quantidade}</p>
                <p class="text-center"><strong>Forma de Descarte:</strong> ${residuo.forma_descarte}</p>
                <p class="text-center"><strong>Tipo de Entrega:</strong> ${residuo.tipo_entrega}</p>
                <div class="card-footer d-flex justify-content-center"> <!-- Rodapé do card -->
                    <button class="btn btn-conectar" onclick="connect('${residuo.id}')">Conectar</button>
                </div>
            `;
            container.appendChild(card);
        });
    }


    // Função para pesquisar resíduos com base no termo inserido
    window.searchResiduos = function () {
        const searchTerm = document.getElementById('searchInput').value.toLowerCase();
        const filteredResiduos = residuosData.filter(residuo =>
            residuo.tipo.toLowerCase().includes(searchTerm) ||
            residuo.descricao.toLowerCase().includes(searchTerm)
        );
        displayResiduos(filteredResiduos); // Exibe os resíduos filtrados
    };

    // Função para conectar ao resíduo
    window.connect = async function (residuoId) {
        try {
            const response = await fetch('http://localhost:3000/conectarResiduo', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include', // Inclui cookies de sessão
                body: JSON.stringify({ residuoId: residuoId }) // Envia o ID do resíduo
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || 'Erro ao conectar ao resíduo');
            }

            const data = await response.json();
            alert(data.message); // Mensagem de sucesso
            // Atualiza a lista de resíduos após a conexão
            await loadResiduos(); // Recarrega os resíduos
        } catch (error) {
            alert(error.message); // Mensagem de erro
        }
    };

    // Carregar os resíduos e dados do usuário inicialmente
    await Promise.all([loadResiduos(), loadUserData()]);

    // Adiciona o evento de clique no botão de logout
    const logoutButton = document.getElementById('logoutButton'); // Supondo que você tenha um botão com esse ID
    if (logoutButton) {
        logoutButton.addEventListener('click', logout);
    }
});