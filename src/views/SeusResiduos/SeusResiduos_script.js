

    // Função para criar um card de resíduo
    function criarCard(residuo) {
        return `
            <div class="col-md-4">
                <div class="card">
                    <div class="card-body">
                        <h5 class="card-title">Tipo: ${residuo.tipo}</h5>
                        <p class="card-text">Descrição: ${residuo.descricao || 'Não informada'}</p>
                        <p class="card-text">Quantidade: ${residuo.quantidade || 'Não informada'}</p>
                        <p class="card-text">Forma de Descarte: ${residuo.forma_descarte}</p>
                        <p class="card-text">Tipo de Entrega: ${residuo.tipo_entrega}</p>
                    </div>
                </div>
            </div>
        `;
    }

        // Fetch para buscar os dados dos resíduos
        async function carregarResiduos() {
            try {
                const response = await fetch('http://localhost:3000/seusResiduos');
                const data = await response.json();

                if (response.ok) {
                    const container = document.getElementById('residuos-container');
                    container.innerHTML = ''; // Limpa o container
                    data.residuos.forEach(residuo => {
                        container.innerHTML += criarCard(residuo);
                    });
                } else {
                    alert(data.message);
                }
            } catch (error) {
                console.error('Erro ao buscar resíduos:', error);
            }
        }

        // Carrega os resíduos ao carregar a página
        window.onload = carregarResiduos;