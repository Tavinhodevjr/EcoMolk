document.querySelector('.submit').addEventListener('click', async (event) => {
    event.preventDefault(); // Previne o reload da página
    
    // Captura os valores de email e senha dos inputs
    const email = document.getElementById('email').value;
    const senha = document.getElementById('pass').value;

    // Verifica se ambos os campos estão preenchidos
    if (!email || !senha) {
        alert('Por favor, preencha todos os campos.');
        return;
    }

    try {
        // Faz a requisição POST para o backend
        const response = await fetch('http://localhost:3000/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, senha })
        });

        // Verifica a resposta do servidor
        const data = await response.json();
        if (response.ok) {
            alert(data.message); // Exibe a mensagem de sucesso
            
            // Redireciona o usuário para a página desejada
            window.location.href = 'http://localhost:3000/home'; // Exemplo de redirecionamento para a página 'home'
        } else {
            alert(data.message); // Exibe a mensagem de erro
        }

    } catch (error) {
        console.error('Erro na requisição:', error);
        alert('Erro ao tentar fazer login.');
    }
});
