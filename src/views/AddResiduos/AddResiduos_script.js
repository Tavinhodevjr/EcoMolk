document.getElementById('form-adicionar').addEventListener('submit', async (event) => {
    event.preventDefault(); // Evita o recarregamento da página

    // Captura os valores dos campos
    const tipo = document.getElementById('tipo-residuo').value;
    const quantidade = document.getElementById('quantidade').value;
    const forma_descarte = document.getElementById('forma-descarte').value;
    const tipo_entrega = document.getElementById('tipo-entrega').value;
    const descricao = document.getElementById('descricao').value;

    try {
        // Envia os dados para o backend
        const response = await fetch('http://localhost:3000/residuos', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ tipo, quantidade, forma_descarte, tipo_entrega, descricao })
        });

        // Processa a resposta do backend
        const data = await response.json();
        if (response.ok) {
            alert('Resíduo adicionado com sucesso!');
            document.getElementById('form-adicionar').reset(); // Limpa o formulário
            window.location.href = 'http://localhost:3000/SeusResiduos/SeusResiduos_index.html';
        } else {
            alert(data.message || 'Erro ao adicionar o resíduo.');
        }
    } catch (error) {
        console.error('Erro na requisição:', error);
        alert('Erro ao adicionar o resíduo.');
    }
});
