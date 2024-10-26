document.getElementById('registerForm').addEventListener('submit', async function(e) {
    e.preventDefault(); 

    // Coleta dos dados do formulário
    const nome = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const senha = document.getElementById('senha').value;
    const nome_empresa = document.getElementById('empresa').value;
    const telefone = document.getElementById('telefone').value;
    const residuo = document.getElementById('residuo').value; // Ainda não está no db

    try {
        // Requisição ao back-end
        const response = await fetch('http://localhost:3000/cadastrar', { // Verificar sempre o caminho correto
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                nome,
                email,
                senha,
                telefone,
                nome_empresa,
                residuo  // Incluído no corpo da requisição - não está no db
            })
        });

        const result = await response.json();

        if (response.ok) {
            alert('Usuário cadastrado com sucesso!');

            window.location.href = 'http://localhost:3000/login'
        } else {
            alert('Erro: ' + result.message);
        }
    } catch (error) {
        console.error('Erro ao enviar dados:', error);
        alert('Erro ao tentar cadastrar o usuário.');
    }
});
