document.addEventListener("DOMContentLoaded", async () => {
    const container = document.getElementById('residuosContainer');
    let residuosData = [];

    // Função para carregar os resíduos do servidor
    async function loadResiduos() {
        try {
            const response = await fetch('http://localhost:3000/residuos/outsiders', {
                method: 'GET',
                credentials: 'include'
            });

            if (!response.ok) {
                throw new Error('Erro ao carregar resíduos: ' + response.statusText);
            }

            const data = await response.json();
            residuosData = data.residuos; // Armazena os resíduos para pesquisa
            displayResiduos(residuosData); // Exibe os resíduos carregados
        } catch (error) {
            console.error(error);
            container.innerHTML = '<p>Ainda não há resíduos cadastrados!</p>';
        }
    }

    // Função para exibir resíduos no container
    function displayResiduos(residuos) {
        container.innerHTML = ''; // Limpa o container antes de exibir
        residuos.forEach(residuo => {
            const card = document.createElement('div');
            card.className = 'card mb-3 p-3 d-flex flex-column'; // Alinha o card em coluna

            // Verifica se a imagem existe, caso contrário define uma imagem padrão
            const imageUrl = residuo.imagem_residuo ? `data:image/jpeg;base64,${residuo.imagem_residuo}` : './sem_imagem_residuo.png';

            card.innerHTML = `
                <img src="${imageUrl}" class="card-img-top" alt="Imagem do resíduo" style="max-height: 200px; object-fit: cover;">
                <h2>${residuo.tipo}</h2>
                <p><strong>Empresa:</strong> ${residuo.usuario.nome_empresa}</p>
                <p><strong>Descrição:</strong> ${residuo.descricao}</p>
                <p><strong>Quantidade:</strong> ${residuo.quantidade}</p>
                <p><strong>Forma de Descarte:</strong> ${residuo.forma_descarte}</p>
                <p><strong>Tipo de Entrega:</strong> ${residuo.tipo_entrega}</p>
                <div class="card-footer"> <!-- Rodapé do card -->
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
            residuo.descricao.toLowerCase().includes(searchTerm
        ));
        displayResiduos(filteredResiduos); // Exibe os resíduos filtrados
    };

    // Função para conectar ao resíduo
    window.connect = function(residuoId) {
        alert(`Conectando ao resíduo com ID: ${residuoId}`);
    };

    // Carregar os resíduos inicialmente
    loadResiduos();
});
