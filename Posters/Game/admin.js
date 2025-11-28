// Yellows Admin Dashboard JavaScript

let prizesConfig = [];
let usersData = [];
let scansData = [];
let eventsData = [];

// Initialize Dashboard
document.addEventListener('DOMContentLoaded', () => {
    initDashboard();
    setupEventListeners();
    loadData();
    startAutoRefresh();
});

function initDashboard() {
    console.log('Yellows Admin Dashboard initialized');
}

function setupEventListeners() {
    // Refresh button
    document.getElementById('refresh-btn').addEventListener('click', () => {
        loadData();
        showNotification('Data refreshed!', 'success');
    });

    // Export button
    document.getElementById('export-btn').addEventListener('click', exportData);

    // Add prize button
    document.getElementById('add-prize-btn').addEventListener('click', () => {
        openPrizeModal();
    });

    // Prize form
    document.getElementById('prize-form').addEventListener('submit', savePrize);
    document.getElementById('cancel-prize-btn').addEventListener('click', closePrizeModal);

    // Modal close
    document.querySelector('.modal-close').addEventListener('click', closePrizeModal);

    // Search users
    document.getElementById('search-users').addEventListener('input', filterUsers);

    // Filter redeemed
    document.getElementById('filter-redeemed').addEventListener('change', filterUsers);

    // Close modal on outside click
    document.getElementById('prize-modal').addEventListener('click', (e) => {
        if (e.target.id === 'prize-modal') {
            closePrizeModal();
        }
    });
}

function loadData() {
    // Load from localStorage (in production, this would be from backend API)
    loadPrizes();
    loadUsers();
    loadScans();
    loadEvents();

    updateStatistics();
    updateCharts();
    updateAnalytics();
}

function loadPrizes() {
    // Get prizes from main script or localStorage
    const defaultPrizes = [
        { name: "Free Topping", color: "#FFD700", emoji: "🧀", weight: 1 },
        { name: "£1 Off", color: "#FF6347", emoji: "💷", weight: 1 },
        { name: "Bonus Fries", color: "#FFA500", emoji: "🍟", weight: 1 },
        { name: "Secret Menu Item", color: "#FF4500", emoji: "🤫", weight: 1 },
        { name: "Free Topping", color: "#FFD700", emoji: "🧅", weight: 1 },
        { name: "£2 Off", color: "#FF6347", emoji: "💰", weight: 1 },
        { name: "Free Drink", color: "#FFA500", emoji: "🥤", weight: 1 },
        { name: "Free Hotdog", color: "#FF4500", emoji: "🌭", weight: 1 }
    ];

    prizesConfig = JSON.parse(localStorage.getItem('yellows_prizes_config') || JSON.stringify(defaultPrizes));
    renderPrizesList();
}

function renderPrizesList() {
    const container = document.getElementById('prizes-list');
    container.innerHTML = '';

    prizesConfig.forEach((prize, index) => {
        const prizeItem = document.createElement('div');
        prizeItem.className = 'prize-item';
        prizeItem.style.borderLeftColor = prize.color;

        prizeItem.innerHTML = `
            <div class="prize-info">
                <div class="prize-emoji">${prize.emoji}</div>
                <div class="prize-details">
                    <h4>${prize.name}</h4>
                    <p>Weight: ${prize.weight} | Color: ${prize.color}</p>
                </div>
            </div>
            <div class="prize-actions">
                <button class="btn-icon btn-edit" onclick="editPrize(${index})">✏️ Edit</button>
                <button class="btn-icon btn-delete" onclick="deletePrize(${index})">🗑️ Delete</button>
            </div>
        `;

        container.appendChild(prizeItem);
    });
}

function loadUsers() {
    usersData = JSON.parse(localStorage.getItem('yellows_prizes') || '[]');
    renderUsersTable();
}

function renderUsersTable(filteredData = null) {
    const data = filteredData || usersData;
    const tbody = document.getElementById('users-tbody');
    tbody.innerHTML = '';

    if (data.length === 0) {
        tbody.innerHTML = '<tr><td colspan="7" style="text-align: center; color: #999;">No data available</td></tr>';
        return;
    }

    data.forEach(user => {
        const row = document.createElement('tr');
        const status = user.redeemed ? 'redeemed' : 'pending';
        const statusText = user.redeemed ? 'Redeemed' : 'Pending';

        row.innerHTML = `
            <td>${user.name}</td>
            <td>${user.email}</td>
            <td>${user.prize}</td>
            <td><strong>${user.prizeCode}</strong></td>
            <td>${new Date(user.wonAt).toLocaleString()}</td>
            <td><span class="status-badge status-${status}">${statusText}</span></td>
            <td>${user.location || 'N/A'}</td>
        `;

        tbody.appendChild(row);
    });
}

function loadScans() {
    scansData = JSON.parse(localStorage.getItem('yellows_scans') || '[]');
}

function loadEvents() {
    eventsData = JSON.parse(localStorage.getItem('yellows_events') || '[]');
}

function updateStatistics() {
    // Total users
    document.getElementById('total-users').textContent = usersData.length;

    // Total prizes
    document.getElementById('total-prizes').textContent = usersData.length;

    // Redeemed prizes
    const redeemedCount = usersData.filter(u => u.redeemed).length;
    document.getElementById('redeemed-prizes').textContent = redeemedCount;

    // QR scans
    document.getElementById('qr-scans').textContent = scansData.length;

    // Instagram follows
    const instagramFollows = eventsData.filter(e => e.event === 'instagram_follow').length;
    document.getElementById('instagram-follows').textContent = instagramFollows;

    // Social shares
    const socialShares = eventsData.filter(e => e.event === 'social_share').length;
    document.getElementById('social-shares').textContent = socialShares;

    // Animate numbers
    animateNumbers();
}

function animateNumbers() {
    document.querySelectorAll('.stat-value').forEach(el => {
        el.style.animation = 'none';
        setTimeout(() => {
            el.style.animation = 'countUp 0.5s ease';
        }, 10);
    });
}

function updateCharts() {
    // Prize Distribution Chart
    const prizeChart = document.getElementById('prize-chart');
    const prizeCounts = {};

    usersData.forEach(user => {
        prizeCounts[user.prize] = (prizeCounts[user.prize] || 0) + 1;
    });

    let chartHTML = '<div style="padding: 20px;">';
    Object.entries(prizeCounts).forEach(([prize, count]) => {
        const percentage = (count / usersData.length * 100).toFixed(1);
        chartHTML += `
            <div style="margin-bottom: 15px;">
                <div style="display: flex; justify-content: space-between; margin-bottom: 5px;">
                    <span style="font-weight: 600;">${prize}</span>
                    <span>${count} (${percentage}%)</span>
                </div>
                <div style="background: #E0E0E0; height: 10px; border-radius: 5px; overflow: hidden;">
                    <div style="background: linear-gradient(90deg, #FFD700, #FFA500); width: ${percentage}%; height: 100%;"></div>
                </div>
            </div>
        `;
    });
    chartHTML += '</div>';
    prizeChart.innerHTML = chartHTML || '<p style="color: #999;">No data available</p>';

    // Scans Over Time Chart
    const scansChart = document.getElementById('scans-chart');
    const scansByHour = {};

    scansData.forEach(scan => {
        const hour = new Date(scan.timestamp).getHours();
        scansByHour[hour] = (scansByHour[hour] || 0) + 1;
    });

    let scansHTML = '<div style="padding: 20px;">';
    const maxScans = Math.max(...Object.values(scansByHour), 1);

    for (let hour = 0; hour < 24; hour++) {
        const count = scansByHour[hour] || 0;
        const height = (count / maxScans * 100);
        scansHTML += `
            <div style="display: inline-block; width: 3.5%; margin-right: 0.5%; vertical-align: bottom;">
                <div style="background: #FF6347; height: ${height * 2}px; min-height: 2px; border-radius: 3px 3px 0 0;"></div>
                <div style="font-size: 0.7rem; text-align: center; margin-top: 3px;">${hour}</div>
            </div>
        `;
    }
    scansHTML += '</div>';
    scansChart.innerHTML = scansHTML || '<p style="color: #999;">No data available</p>';
}

function updateAnalytics() {
    // Redemption Rate
    const redemptionRate = usersData.length > 0
        ? (usersData.filter(u => u.redeemed).length / usersData.length * 100).toFixed(1)
        : 0;

    document.getElementById('redemption-rate').textContent = redemptionRate + '%';
    document.getElementById('redemption-progress').style.width = redemptionRate + '%';

    // Top Locations
    const locationCounts = {};
    scansData.forEach(scan => {
        const loc = scan.location || 'Unknown';
        locationCounts[loc] = (locationCounts[loc] || 0) + 1;
    });

    const topLocations = Object.entries(locationCounts)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 5);

    const locList = document.getElementById('top-locations');
    locList.innerHTML = topLocations.length > 0
        ? topLocations.map(([loc, count]) => `<li><span>${loc}</span><span>${count}</span></li>`).join('')
        : '<li>No data available</li>';

    // Peak Hours
    const hourCounts = {};
    scansData.forEach(scan => {
        const hour = new Date(scan.timestamp).getHours();
        hourCounts[hour] = (hourCounts[hour] || 0) + 1;
    });

    const peakHours = Object.entries(hourCounts)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 5);

    const hourList = document.getElementById('peak-hours');
    hourList.innerHTML = peakHours.length > 0
        ? peakHours.map(([hour, count]) => `<li><span>${hour}:00</span><span>${count} scans</span></li>`).join('')
        : '<li>No data available</li>';

    // Device Breakdown
    const deviceCounts = {};
    scansData.forEach(scan => {
        const ua = scan.userAgent || '';
        let device = 'Unknown';

        if (ua.includes('iPhone')) device = 'iPhone';
        else if (ua.includes('Android')) device = 'Android';
        else if (ua.includes('iPad')) device = 'iPad';
        else if (ua.includes('Windows')) device = 'Windows';
        else if (ua.includes('Mac')) device = 'Mac';

        deviceCounts[device] = (deviceCounts[device] || 0) + 1;
    });

    const deviceList = document.getElementById('device-breakdown');
    const deviceEntries = Object.entries(deviceCounts).sort((a, b) => b[1] - a[1]);
    deviceList.innerHTML = deviceEntries.length > 0
        ? deviceEntries.map(([device, count]) => `<li><span>${device}</span><span>${count}</span></li>`).join('')
        : '<li>No data available</li>';
}

function filterUsers() {
    const searchTerm = document.getElementById('search-users').value.toLowerCase();
    const filterValue = document.getElementById('filter-redeemed').value;

    let filtered = usersData;

    // Apply search
    if (searchTerm) {
        filtered = filtered.filter(user =>
            user.name.toLowerCase().includes(searchTerm) ||
            user.email.toLowerCase().includes(searchTerm) ||
            user.prize.toLowerCase().includes(searchTerm) ||
            user.prizeCode.toLowerCase().includes(searchTerm)
        );
    }

    // Apply filter
    if (filterValue === 'redeemed') {
        filtered = filtered.filter(user => user.redeemed);
    } else if (filterValue === 'pending') {
        filtered = filtered.filter(user => !user.redeemed);
    }

    renderUsersTable(filtered);
}

// Prize Management
function openPrizeModal(prizeIndex = null) {
    const modal = document.getElementById('prize-modal');
    const form = document.getElementById('prize-form');

    if (prizeIndex !== null) {
        // Edit mode
        const prize = prizesConfig[prizeIndex];
        document.getElementById('modal-title').textContent = 'Edit Prize';
        document.getElementById('prize-name-input').value = prize.name;
        document.getElementById('prize-emoji-input').value = prize.emoji;
        document.getElementById('prize-color-input').value = prize.color;
        document.getElementById('prize-weight-input').value = prize.weight;
        form.dataset.editIndex = prizeIndex;
    } else {
        // Add mode
        document.getElementById('modal-title').textContent = 'Add New Prize';
        form.reset();
        delete form.dataset.editIndex;
    }

    modal.classList.add('active');
}

function closePrizeModal() {
    const modal = document.getElementById('prize-modal');
    modal.classList.remove('active');
}

function savePrize(e) {
    e.preventDefault();

    const form = e.target;
    const prize = {
        name: document.getElementById('prize-name-input').value,
        emoji: document.getElementById('prize-emoji-input').value,
        color: document.getElementById('prize-color-input').value,
        weight: parseInt(document.getElementById('prize-weight-input').value)
    };

    if (form.dataset.editIndex !== undefined) {
        // Update existing prize
        prizesConfig[form.dataset.editIndex] = prize;
        showNotification('Prize updated successfully!', 'success');
    } else {
        // Add new prize
        prizesConfig.push(prize);
        showNotification('Prize added successfully!', 'success');
    }

    // Save to localStorage
    localStorage.setItem('yellows_prizes_config', JSON.stringify(prizesConfig));

    renderPrizesList();
    closePrizeModal();
}

function editPrize(index) {
    openPrizeModal(index);
}

function deletePrize(index) {
    if (confirm('Are you sure you want to delete this prize?')) {
        prizesConfig.splice(index, 1);
        localStorage.setItem('yellows_prizes_config', JSON.stringify(prizesConfig));
        renderPrizesList();
        showNotification('Prize deleted successfully!', 'success');
    }
}

// Export Data
function exportData() {
    const data = {
        prizes: usersData,
        scans: scansData,
        events: eventsData,
        exportedAt: new Date().toISOString()
    };

    const dataStr = JSON.stringify(data, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = `yellows-data-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    showNotification('Data exported successfully!', 'success');
}

// Auto Refresh
function startAutoRefresh() {
    setInterval(() => {
        loadData();
    }, 30000); // Refresh every 30 seconds
}

// Notifications
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 80px;
        right: 20px;
        padding: 15px 25px;
        background: ${type === 'success' ? '#4CAF50' : '#2196F3'};
        color: white;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.2);
        z-index: 10000;
        font-weight: 600;
        animation: slideIn 0.3s ease;
    `;
    notification.textContent = message;

    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// CSS Animations (add to style)
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from { transform: translateX(400px); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    @keyframes slideOut {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(400px); opacity: 0; }
    }
    @keyframes countUp {
        from { transform: scale(0.8); opacity: 0; }
        to { transform: scale(1); opacity: 1; }
    }
`;
document.head.appendChild(style);
