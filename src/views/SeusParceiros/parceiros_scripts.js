// Função para buscar usuários de outros usuários
async function fetchUsuarios() {
  try {
      const response = await fetch('/usuarios/outsiders'); // Chama a rota que você criou
      const data = await response.json();

      if (response.ok) {
          // Chama a função para gerar os cards com os dados recebidos
          generateUserCards(data.usuarios);
      } else {
          // Se não encontrar usuários
          console.error(data.message);
          document.getElementById('usersContainer').innerHTML = '<p>' + data.message + '</p>';
      }
  } catch (error) {
      console.error('Erro ao buscar usuários:', error);
  }
}

// Função para gerar os cards dos usuários
function generateUserCards(users) {
  const container = document.getElementById('usersContainer');
  container.innerHTML = ''; // Limpa o conteúdo existente

  users.forEach(user => {
      const card = `
          <div class="col-md-4 mb-4">
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
      container.innerHTML += card; // Adiciona o card ao container
  });
}

// Chama a função quando a página carregar
window.onload = fetchUsuarios;
