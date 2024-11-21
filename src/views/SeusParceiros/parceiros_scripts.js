// Variável para armazenar dados dos parceiros
let usuariosData = [];

// Função para buscar o número de resíduos em status "negociando"
async function fetchResiduosNegociando() {
    try {
        const response = await fetch('/negociando/count');
        const data = await response.json();

        if (response.ok) {
            document.getElementById('residuosNegociando').innerText = data.quantidade;

            // Buscar total de resíduos para calcular a porcentagem
            const totalResiduosResponse = await fetch('/residuos/total');
            const totalResiduosData = await totalResiduosResponse.json();

            if (totalResiduosResponse.ok) {
                const totalResiduos = totalResiduosData.total;
                const percentage = (data.quantidade / totalResiduos) * 100;
                const ctx = document.getElementById('graficoNegociando').getContext('2d');

                // Criando o gradiente para a cor de fundo
                const gradient = ctx.createLinearGradient(0, 0, 0, 200); 
                gradient.addColorStop(0, '#FFEB3B'); // cor inicial (amarelo claro)
                gradient.addColorStop(1, '#FFF176'); // cor final (amarelo suave)

                // Definindo o gráfico de Resíduos em Negociação
                new Chart(ctx, {
                    type: 'doughnut',
                    data: {
                        labels: ['Negociando', 'Outros'],
                        datasets: [{
                            data: [data.quantidade, totalResiduos - data.quantidade],
                            backgroundColor: [gradient, '#F4F4F4'], // Cor mais suave para "Outros"
                            borderWidth: 0,
                            hoverOffset: 4,
                        }]
                    },
                    options: {
                        responsive: true,
                        cutoutPercentage: 90,
                        plugins: {
                            tooltip: {
                                callbacks: {
                                    label: function(tooltipItem) {
                                        return tooltipItem.raw + ' (' + percentage.toFixed(2) + '%)';
                                    }
                                }
                            },
                            legend: {
                                display: false
                            }
                        }
                    }
                });
            }
        } else {
            console.error(data.message);
        }
    } catch (error) {
        console.error('Erro ao buscar resíduos em negociação:', error);
    }
}

// Função para buscar o número de resíduos em status "concluídos"
async function fetchResiduosConcluidos() {
    try {
        const response = await fetch('/concluido/count');
        const data = await response.json();

        if (response.ok) {
            document.getElementById('residuosConcluidos').innerText = data.quantidade;

            // Buscar total de resíduos para calcular a porcentagem
            const totalResiduosResponse = await fetch('/residuos/total');
            const totalResiduosData = await totalResiduosResponse.json();

            if (totalResiduosResponse.ok) {
                const totalResiduos = totalResiduosData.total;
                const percentage = (data.quantidade / totalResiduos) * 100;
                const ctx = document.getElementById('graficoConcluidos').getContext('2d');

                // Criando o gradiente para a cor de fundo
                const gradient = ctx.createLinearGradient(0, 0, 0, 200); 
                gradient.addColorStop(0, '#9C27B0'); // cor inicial (roxo suave)
                gradient.addColorStop(1, '#D1C4E9'); // cor final (roxo claro)

                // Definindo o gráfico de Resíduos Concluídos
                new Chart(ctx, {
                    type: 'doughnut',
                    data: {
                        labels: ['Concluídos', 'Outros'],
                        datasets: [{
                            data: [data.quantidade, totalResiduos - data.quantidade],
                            backgroundColor: [gradient, '#F4F4F4'], // Cor mais suave para "Outros"
                            borderWidth: 0,
                            hoverOffset: 4,
                        }]
                    },
                    options: {
                        responsive: true,
                        cutoutPercentage: 90,
                        plugins: {
                            tooltip: {
                                callbacks: {
                                    label: function(tooltipItem) {
                                        return tooltipItem.raw + ' (' + percentage.toFixed(2) + '%)';
                                    }
                                }
                            },
                            legend: {
                                display: false
                            }
                        }
                    }
                });
            }
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
            document.getElementById('residuosCancelados').innerText = data.quantidade;

            // Buscar total de resíduos para calcular a porcentagem
            const totalResiduosResponse = await fetch('/residuos/total');
            const totalResiduosData = await totalResiduosResponse.json();

            if (totalResiduosResponse.ok) {
                const totalResiduos = totalResiduosData.total;
                const percentage = (data.quantidade / totalResiduos) * 100;
                const ctx = document.getElementById('graficoCancelados').getContext('2d');

                // Criando o gradiente para a cor de fundo
                const gradient = ctx.createLinearGradient(0, 0, 0, 200); 
                gradient.addColorStop(0, '#E57373'); // cor inicial (vermelho claro)
                gradient.addColorStop(1, '#FFCDD2'); // cor final (vermelho suave)

                // Definindo o gráfico de Resíduos Cancelados
                new Chart(ctx, {
                    type: 'doughnut',
                    data: {
                        labels: ['Cancelados', 'Outros'],
                        datasets: [{
                            data: [data.quantidade, totalResiduos - data.quantidade],
                            backgroundColor: [gradient, '#F4F4F4'], // Cor mais suave para "Outros"
                            borderWidth: 0,
                            hoverOffset: 4,
                        }]
                    },
                    options: {
                        responsive: true,
                        cutoutPercentage: 90,
                        plugins: {
                            tooltip: {
                                callbacks: {
                                    label: function(tooltipItem) {
                                        return tooltipItem.raw + ' (' + percentage.toFixed(2) + '%)';
                                    }
                                }
                            },
                            legend: {
                                display: false
                            }
                        }
                    }
                });
            }
        } else {
            console.error(data.message);
        }
    } catch (error) {
        console.error('Erro ao buscar resíduos cancelados:', error);
    }
}


// Função para buscar o número de resíduos em status "disponível"
async function fetchResiduosDisponiveis() {
    try {
        const response = await fetch('/disponiveis/count');
        const data = await response.json();

        if (response.ok) {
            // Atualiza o elemento que exibe a quantidade de resíduos disponíveis
            document.getElementById('residuosDisponiveis').innerText = data.quantidade;

            // Agora, vamos criar o gráfico
            const totalResiduosResponse = await fetch('/residuos/total');
            const totalResiduosData = await totalResiduosResponse.json();

            if (totalResiduosResponse.ok) {
                const totalResiduos = totalResiduosData.total;

                // Calculando a porcentagem
                const percentage = (data.quantidade / totalResiduos) * 100;

                // Pegando o contexto do gráfico
                const ctx = document.getElementById('graficoDisponiveis').getContext('2d');

                // Criando o gradiente para a cor de fundo
                const gradient = ctx.createLinearGradient(0, 0, 0, 200); 
                gradient.addColorStop(0, '#81C784'); // cor inicial (verde claro)
                gradient.addColorStop(1, '#A5D6A7'); // cor final (verde suave)

                // Criando o gráfico
                new Chart(ctx, {
                    type: 'doughnut',
                    data: {
                        labels: ['Disponíveis', 'Outros'],
                        datasets: [{
                            data: [data.quantidade, totalResiduos - data.quantidade],
                            backgroundColor: [gradient, '#F4F4F4'], // Cor mais suave para "Outros"
                            borderWidth: 0,
                            hoverOffset: 4,
                        }]
                    },
                    options: {
                        responsive: true,
                        cutoutPercentage: 90,
                        plugins: {
                            tooltip: {
                                callbacks: {
                                    label: function(tooltipItem) {
                                        return tooltipItem.raw + ' (' + percentage.toFixed(2) + '%)';
                                    }
                                }
                            },
                            legend: {
                                display: false
                            }
                        }
                    }
                });
            } else {
                console.error(totalResiduosData.message);
            }
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

async function fetchResiduosQuantidades() {
    try {
        const response = await fetch('/tipos/quantidade'); // Endpoint para obter os dados
        const data = await response.json();

        if (response.ok) {
            const tiposResiduos = data; // Array de objetos com tipo e quantidade
            const chartData = tiposResiduos.map(item => item.tipo); // Tipos de resíduos
            const chartCounts = tiposResiduos.map(item => item.quantidade); // Quantidade de cada tipo

            // Configurar o gradiente
            const ctx = document.getElementById('residuosChart').getContext('2d');
            const gradient = ctx.createLinearGradient(0, 0, 0, 400);
            gradient.addColorStop(0, 'rgba(0, 123, 255, 0.9)'); // Azul claro
            gradient.addColorStop(1, 'rgba(40, 167, 69, 0.3)'); // Verde claro

            // Criar o gráfico
            new Chart(ctx, {
                type: 'bar',
                data: {
                    labels: chartData,
                    datasets: [{
                        label: 'Quantidade de resíduos anunciados',
                        data: chartCounts,
                        backgroundColor: gradient,
                        borderColor: 'rgba(0, 123, 255, 1)', // Cor da borda em azul
                        borderWidth: 1
                    }]
                },
                options: {
                    responsive: true,
                    plugins: {
                        legend: {
                            labels: {
                                font: {
                                    size: 14,
                                    family: 'Poppins'
                                },
                                color: '#000' // Cor preta para os textos da legenda
                            }
                        },
                        tooltip: {
                            callbacks: {
                                label: function(context) {
                                    return `Tipo: ${context.label}\nQuantidade: ${context.raw}`;
                                }
                            },
                            backgroundColor: '#333',
                            titleColor: '#fff',
                            bodyColor: '#ddd',
                            borderWidth: 1,
                            borderColor: '#ccc'
                        }
                    },
                    scales: {
                        x: {
                            ticks: {
                                font: {
                                    size: 12,
                                    family: 'Poppins'
                                },
                                color: '#000' // Cor preta para os textos no eixo X
                            }
                        },
                        y: {
                            beginAtZero: true,
                            ticks: {
                                font: {
                                    size: 12,
                                    family: 'Poppins'
                                },
                                color: '#000', // Cor preta para os textos no eixo Y
                                stepSize: 1
                            }
                        }
                    },
                    animation: {
                        duration: 1500,
                        easing: 'easeInOutBounce'
                    }
                }
            });
        } else {
            console.error(data.message);
        }
    } catch (error) {
        console.error('Erro ao buscar tipos de resíduos:', error);
    }
}

// Função para buscar a empresa que mais cadastrou resíduos
async function fetchEmpresaMaisResiduos() {
    try {
        const response = await fetch('/empresa/mais-residuos');
        if (!response.ok) {
            throw new Error('Erro ao buscar a empresa com mais resíduos');
        }
        const data = await response.json();
        const empresa = data.empresa;

        // Atualiza o primeiro card com o nome da empresa
        const cardResiduos = document.getElementById('empresa-mais-anuncia-card');
        cardResiduos.querySelector('h3').textContent = 'Maior anunciante';
        cardResiduos.querySelector('p').textContent = empresa.nome_empresa;
    } catch (error) {
        console.error('Erro ao buscar dados da empresa com mais resíduos:', error);
        // Em caso de erro, pode mostrar uma mensagem padrão ou o erro
        const cardResiduos = document.getElementById('empresa-mais-anuncia-card');
        cardResiduos.querySelector('p').textContent = 'Erro ao carregar dados.';
    }
}

// Função para buscar a empresa com mais interesse
async function fetchEmpresaMaisInteresse() {
    try {
        const response = await fetch('/empresa/mais-interesse');
        if (!response.ok) {
            throw new Error('Erro ao buscar a empresa com mais interesse');
        }
        const data = await response.json();
        const empresa = data.empresa;

        // Atualiza o segundo card com o nome da empresa
        const cardInteresse = document.getElementById('empresa-mais-interessada-card');
        cardInteresse.querySelector('h3').textContent = 'Maior interessada';
        cardInteresse.querySelector('p').textContent = empresa.nome_empresa;
    } catch (error) {
        console.error('Erro ao buscar dados da empresa com mais interesse:', error);
        // Em caso de erro, pode mostrar uma mensagem padrão ou o erro
        const cardInteresse = document.getElementById('empresa-mais-interessada-card');
        cardInteresse.querySelector('p').textContent = 'Erro ao carregar dados.';
    }
}

// Função para buscar a porcentagem de resíduos concluídos
async function fetchPorcentagemResiduosConcluidos() {
    try {
        const response = await fetch('/residuos/concluidos-porcentagem');
        if (!response.ok) {
            throw new Error('Erro ao buscar a porcentagem de resíduos concluídos');
        }
        const data = await response.json();
        const porcentagemConcluidos = data.porcentagemConcluidos;

        // Atualiza o card "Negociações concluídas" com a porcentagem
        const cardPorcentagem = document.getElementById('indice-sucesso-card');
        cardPorcentagem.querySelector('h3').textContent = 'Índice de sucesso';
        cardPorcentagem.querySelector('p').textContent = `${porcentagemConcluidos}`; // Exibe a porcentagem com "%" no final
    } catch (error) {
        console.error('Erro ao buscar dados de porcentagem de resíduos concluídos:', error);
        // Em caso de erro, pode mostrar uma mensagem padrão ou o erro
        const cardPorcentagem = document.getElementById('indice-sucesso-card');
        cardPorcentagem.querySelector('p').textContent = 'Erro ao carregar dados.';
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
                                <!-- Botão "Conectar" abaixo das informações -->
                                <button class="btn btn-primary btn-sm w-100 mt-3" onclick="openOutlook('${user.email}', '${user.nome}')">Contato</button>
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

// Função para abrir o Outlook com e-mail, assunto e mensagem personalizada
function openOutlook(email, nomeResponsavel) {
    // Obter o primeiro nome do responsável
    const primeiroNome = nomeResponsavel.split(' ')[0];

    // Defina o assunto e personalize a mensagem
    const subject = 'Interesse em anúncio no Ecomolk';
    const body = `Olá ${primeiroNome},\n\nTenho interesse no resíduo que você anunciou no Ecomolk. Quando podemos conversar a respeito?`;

    // Codifique os parâmetros para evitar problemas com caracteres especiais
    const encodedSubject = encodeURIComponent(subject);
    const encodedBody = encodeURIComponent(body);

    // Construa o link mailto com o assunto e a mensagem personalizada
    const mailtoLink = `mailto:${email}?subject=${encodedSubject}&body=${encodedBody}`;

    // Abra o cliente de e-mail padrão
    window.location.href = mailtoLink;
}


// Chama as funções quando a página carregar
window.onload = function() {
    fetchUsuarios();             // Busca os usuários
    fetchResiduosDisponiveis(); // Busca os resíduos disponíveis
    fetchResiduosNegociando();  // Busca os resíduos em negociação
    fetchResiduosConcluidos();  // Busca os resíduos concluídos
    fetchResiduosCancelados();  // Busca os resíduos cancelados
    fetchResiduosQuantidades();
    fetchEmpresaMaisResiduos();
    fetchEmpresaMaisInteresse();
    fetchPorcentagemResiduosConcluidos();
};
