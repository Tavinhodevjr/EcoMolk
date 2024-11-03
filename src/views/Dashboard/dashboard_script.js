// dashboard_script.js

// Função para atualizar o iframe automaticamente (por exemplo, a cada 5 minutos)
function refreshDashboard() {
    const iframe = document.querySelector('#dashboard-iframe');
    iframe.src = iframe.src;  // Recarrega o iframe
}

// Configura a atualização automática a cada 5 minutos (300.000 ms)
setInterval(refreshDashboard, 300000);

// Exemplo de adicionar interatividade com botões de filtro
document.addEventListener("DOMContentLoaded", () => {
    const categoryFilter = document.getElementById("categoryFilter");

    // Verifica se o filtro está disponível na página
    if (categoryFilter) {
        categoryFilter.addEventListener("change", (event) => {
            const selectedCategory = event.target.value;

            // Modifica o src do iframe com o filtro (se o Power BI permite passar parâmetros via URL)
            const iframe = document.querySelector('#dashboard-iframe');
            iframe.src = `https://app.powerbi.com/view?r=eyJrIjoiYzJkMGQzMTMtZWUyYy00ZTgxLWE1ZGEtNWRkYjFlZDA1ZDMzIiwidCI6IjU5ZDRmMjQ5LTA1MjAtNDZjZi1iNmIyLTg3M2Q1ZGE1NDNmZSJ9&pageName=a52c942c738a9c39e304=${selectedCategory}`;
        });
    }
});
