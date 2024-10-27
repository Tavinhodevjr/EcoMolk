document.addEventListener("DOMContentLoaded", async () => {
    const container = document.getElementById('residuosContainer');

    try {
        const response = await fetch('http://localhost:3000/seusResiduos', {
            method: 'GET',
            credentials: 'include' // Para incluir cookies de sessão
        });

        if (!response.ok) {
            throw new Error('Erro ao carregar resíduos: ' + response.statusText);
        }

        const data = await response.json();

        data.residuos.forEach(residuo => {
            const card = document.createElement('div');
            card.className = 'card';
            card.innerHTML = `
                <h2>${residuo.tipo}</h2>
                <p><strong>Descrição:</strong> ${residuo.descricao}</p>
                <p><strong>Quantidade:</strong> ${residuo.quantidade}</p>
                <p><strong>Forma de Descarte:</strong> ${residuo.forma_descarte}</p>
                <p><strong>Tipo de Entrega:</strong> ${residuo.tipo_entrega}</p>
            `;
            container.appendChild(card);
        });

    } catch (error) {
        console.error(error);
        container.innerHTML = '<p>Ainda não há resíduos cadastrados!</p>';
    }
});
