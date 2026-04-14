let salesData = [  // Data embedded directly
  {"Date": "2025-01-01", "Region": "North", "Product": "Laptop", "TotalPrice": 1000},
  {"Date": "2025-01-02", "Region": "North", "Product": "Mouse", "TotalPrice": 20},
  {"Date": "2025-01-03", "Region": "West", "Product": "Keyboard", "TotalPrice": 50},
  {"Date": "2025-01-04", "Region": "West", "Product": "Laptop", "TotalPrice": 1200},
  {"Date": "2025-01-05", "Region": "South", "Product": "Monitor", "TotalPrice": 300}
];
let chart;

function updateDashboard() {
  const filtered = salesData;  // Simplified - add filters later
  const totalRevenue = filtered.reduce((sum, row) => sum + parseFloat(row.TotalPrice || 0), 0);
  document.getElementById('totalRevenue').textContent = '$' + totalRevenue.toLocaleString();
  document.getElementById('totalOrders').textContent = filtered.length;

  // Chart
  const ctx = document.getElementById('salesChart').getContext('2d');
  const regions = {};
  filtered.forEach(row => {
    regions[row.Region] = (regions[row.Region] || 0) + parseFloat(row.TotalPrice || 0);
  });
  if (chart) chart.destroy();
  chart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: Object.keys(regions),
      datasets: [{ label: 'Revenue by Region', data: Object.values(regions), backgroundColor: 'rgba(75,192,192,0.2)' }]
    }
  });

  // Table
  const tbody = document.querySelector('#salesTable tbody');
  tbody.innerHTML = filtered.map(row => `<tr><td>${row.Region}</td><td>${row.Product}</td><td>$${row.TotalPrice}</td></tr>`).join('');
}

// Menu toggle
document.getElementById('menuicn')?.addEventListener('click', () => {
  document.getElementById('nav')?.classList.toggle('navclose');
});

// Load
updateDashboard();