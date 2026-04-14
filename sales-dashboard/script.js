
let salesData = [];
let chart;

async function loadData() {
    // For JSON file
    const response = await fetch('sales.json');
    salesData = await response.json();
    updateDashboard();
}

function updateDashboard() {
    const filtered = applyFilters(salesData);
    const totalRevenue = filtered.reduce((sum, row) => sum + parseFloat(row.TotalPrice), 0);
    document.getElementById('totalRevenue').textContent = '$' + totalRevenue.toLocaleString();
    document.getElementById('totalOrders').textContent = filtered.length;

    // Update chart
    const ctx = document.getElementById('salesChart').getContext('2d');
    const regions = {};
    filtered.forEach(row => {
        regions[row.Region] = (regions[row.Region] || 0) + parseFloat(row.TotalPrice);
    });
    if (chart) chart.destroy();
    chart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: Object.keys(regions),
            datasets: [{ label: 'Revenue by Region', data: Object.values(regions), backgroundColor: 'rgba(75,192,192,0.2)' }]
        }
    });

    // Update table (top 10 rows)
    const tbody = document.querySelector('#salesTable tbody');
    tbody.innerHTML = filtered.slice(0,10).map(row => `<tr><td>${row.Region}</td><td>${row.Product}</td><td>$${row.TotalPrice}</td></tr>`).join('');
}

function applyFilters(data) {
    let filtered = data;
    const region = document.getElementById('regionFilter').value;
    if (region !== 'All Regions') filtered = data.filter(row => row.Region === region);
    return filtered;
}

// Sidebar toggle
document.getElementById('menuicn').addEventListener('click', () => {
    document.getElementById('nav').classList.toggle('navclose');
});

loadData();  // Init
