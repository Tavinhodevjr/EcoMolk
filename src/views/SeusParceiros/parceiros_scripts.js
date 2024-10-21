function createDoughnutChart(ctx, data, label, colors) {
  new Chart(ctx, {
    type: 'doughnut',
    data: {
      datasets: [{
        data: [data, 100 - data],
        backgroundColor: colors, // Definir cores dinâmicas
        borderWidth: 0
      }]
    },
    options: {
      cutout: '70%', // Para criar um gráfico 
      responsive: false, 
      maintainAspectRatio: false, 
      plugins: {
        legend: {
          display: false 
        },
        tooltip: {
          callbacks: {
            label: function(tooltipItem) {
              return tooltipItem.label + ': ' + tooltipItem.raw + '%'; // Mostrar porcentagem
            }
          }
        }
      }
    }
  });
}

// Criar os gráficos com os dados de porcentagem e cores
window.onload = function() {
  const progressCtx = document.getElementById('progressChart').getContext('2d');
  createDoughnutChart(progressCtx, 50, 'Em Progresso', ['#007bff', '#e9ecef']); 

  const approvalCtx = document.getElementById('approvalChart').getContext('2d');
  createDoughnutChart(approvalCtx, 10, 'Aguardando Aprovação', ['#28a745', '#e9ecef']); 

  const deliveredCtx = document.getElementById('deliveredChart').getContext('2d');
  createDoughnutChart(deliveredCtx, 40, 'Entregues', ['#dc3545', '#e9ecef']); 
};


// Lista dos meses do ano
const months = [
  'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
  'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
];

// Meses do ano no carrosel
let currentMonthIndex = 8; 

// Atualizar o texto do mês
function updateMonthDisplay() {
  document.getElementById('currentMonth').innerText = months[currentMonthIndex];
}


updateMonthDisplay();


document.getElementById('prevMonth').addEventListener('click', function() {
  currentMonthIndex = (currentMonthIndex === 0) ? 11 : currentMonthIndex - 1;
  updateMonthDisplay();
});


document.getElementById('nextMonth').addEventListener('click', function() {
  currentMonthIndex = (currentMonthIndex === 11) ? 0 : currentMonthIndex + 1;
  updateMonthDisplay();
});
