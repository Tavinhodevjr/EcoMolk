document.getElementById('form-adicionar').addEventListener('submit', async (event) => {
    event.preventDefault(); // Evita o recarregamento da página

    // Captura os valores dos campos
    const tipo = document.getElementById('tipo-residuo').value;
    const quantidade = document.getElementById('quantidade').value;
    const forma_descarte = document.getElementById('forma-descarte').value;
    const tipo_entrega = document.getElementById('tipo-entrega').value;
    const descricao = document.getElementById('descricao').value;
    const imagemResiduo = document.getElementById('imagem-residuo').files[0]; // Captura a imagem

    const formData = new FormData(); // Cria um novo objeto FormData
    formData.append('tipo', tipo);
    formData.append('quantidade', quantidade);
    formData.append('forma_descarte', forma_descarte);
    formData.append('tipo_entrega', tipo_entrega);
    formData.append('descricao', descricao);
    formData.append('imagem-residuo', imagemResiduo); // Adiciona a imagem ao FormData

    try {
        // Envia os dados para o backend
        const response = await fetch('http://localhost:3000/residuos', {
            method: 'POST',
            body: formData // Envia o FormData com a imagem
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
