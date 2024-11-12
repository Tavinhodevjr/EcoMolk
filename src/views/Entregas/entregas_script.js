// AJUSTAR PARA PEGAR AS INFORMAÇÕES DA LABEL DO ENDEREÇO
async function init() {
    await customElements.whenDefined('gmp-map');
  
    const map = document.querySelector('gmp-map');
    const marker = document.querySelector('gmp-advanced-marker');
    const placePicker = document.querySelector('gmpx-place-picker');
    const infowindow = new google.maps.InfoWindow();
  
    map.innerMap.setOptions({
      mapTypeControl: false
    });
  
    placePicker.addEventListener('gmpx-placechange', () => {
      const place = placePicker.value;
  
      if (!place.location) {
        window.alert(
          "No details available for input: '" + place.name + "'"
        );
        infowindow.close();
        marker.position = null;
        return;
      }
  
      if (place.viewport) {
        map.innerMap.fitBounds(place.viewport);
      } else {
        map.center = place.location;
        map.zoom = 17;
      }
  
      marker.position = place.location;
      infowindow.setContent(
        `<strong>${place.displayName}</strong><br>
         <span>${place.formattedAddress}</span>
      `);
      infowindow.open(map.innerMap, marker);
    });
} 

document.addEventListener('DOMContentLoaded', init);

document.addEventListener('DOMContentLoaded', function() {
    // Carregar o nome da empresa após o carregamento do DOM
    async function carregarNomeEmpresa() {
        try {
            console.log('Iniciando requisição para carregar nome da empresa...'); // Verificando se a função está sendo chamada

            const response = await fetch('http://localhost:3000/empresa', {
                method: 'GET',
                credentials: 'include'  // Inclui cookies de sessão
            });

            if (!response.ok) {
                throw new Error('Erro ao carregar nome da empresa: ' + response.statusText);
            }

            const data = await response.json();
            console.log('Dados recebidos:', data); // Verificando o que está sendo retornado

            if (data.nome_empresa) {
                // Preenche o nome da empresa dentro da div
                document.getElementById('nome-empresa').innerText = data.nome_empresa;
                console.log('Nome da empresa:', data.nome_empresa); // Verificando se o nome está sendo inserido corretamente
            } else {
                console.log('Nome da empresa não encontrado');
            }
        } catch (error) {
            console.error('Erro ao carregar nome da empresa:', error);
        }
    }

// Função para carregar as entregas com status "negociando"
async function carregarEntregasNegociando() {
    try {
        console.log('Iniciando requisição para carregar entregas negociando...');

        const response = await fetch('http://localhost:3000/entregas/negociando', {
            method: 'GET',
            credentials: 'include'  // Inclui cookies de sessão
        });

        if (!response.ok) {
            throw new Error('Erro ao carregar entregas: ' + response.statusText);
        }

        const entregas = await response.json();
        console.log('Entregas recebidas:', entregas); // Verificação do conteúdo recebido

        const container = document.getElementById('entregasContainer');
        container.innerHTML = ''; // Limpa qualquer conteúdo anterior

        if (entregas.length > 0) {
            entregas.forEach(entrega => {
                // Verifica se os campos existem para evitar erros
                const tipo = entrega.tipo
                const tipoEntrega = entrega.tipo_entrega || 'Tipo não definido';
                const dataEntrega = entrega.data_entrega
                    ? new Date(entrega.data_entrega).toLocaleDateString()
                    : 'Data não disponível';

                // Cria o card para cada entrega
                const card = document.createElement('div');
                card.classList.add('card', 'mb-3'); // Adiciona as classes de Bootstrap

                card.innerHTML = `
                    <div class="card-body">
                        <h5>Tipo do Resíduo: ${tipo}</h5>
                        <h5 class="card-title">Tipo de Entrega: ${tipoEntrega}</h5>
                        <p class="card-text">Data da Entrega: ${dataEntrega}</p>
                        <div class="place-picker-container">
                            <gmpx-place-picker placeholder="Colocar Endereço"></gmpx-place-picker>
                        </div>
                    </div>
                `;

                // Adiciona o card ao container
                container.appendChild(card);
            });
        } else {
            container.innerHTML = '<p>Não há entregas em negociação.</p>';
            console.log('Não há entregas em negociação');
        }

    } catch (error) {
        console.error('Erro ao carregar entregas negociando:', error);
    }
}

    carregarEntregasNegociando(); // Chama a função para carregar as entregas

    // Inicializando o mapa e carregando o nome da empresa
    // initMap(); // Inicializa o mapa após o carregamento do DOM
    carregarNomeEmpresa(); // Carrega o nome da empresa após o carregamento do DOM
    console.log('DOM completamente carregado');
});
