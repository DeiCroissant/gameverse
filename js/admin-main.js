import { mockGamesList, mockUsersList, mockTransactionsList } from './admin-data.js';

document.addEventListener('DOMContentLoaded', () => {
    const sidebarLinks = document.querySelectorAll('.sidebar-link');
    const adminViews = document.querySelectorAll('.admin-view');
    const pageTitle = document.querySelector('.page-title');
    
    // Maintain chart reference
    let revenueChart = null;

    // --- 1. Tab Switching Logic ---
    sidebarLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            
            sidebarLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');

            adminViews.forEach(view => view.classList.add('hidden'));
            
            const targetId = link.getAttribute('data-target');
            const targetView = document.getElementById(targetId);
            
            if (targetView) {
                targetView.classList.remove('hidden');
                
                // Update title & render logic
                if (targetId === 'view-dashboard') {
                    pageTitle.textContent = 'Dashboard Overview';
                    if (!revenueChart) {
                        initChart();
                    }
                } else if (targetId === 'view-games') {
                    pageTitle.textContent = 'Manage Games';
                    renderGamesTable();
                } else if (targetId === 'view-users') {
                    pageTitle.textContent = 'User Management';
                    renderUsersTable();
                } else if (targetId === 'view-transactions') {
                    pageTitle.textContent = 'Transactions';
                    renderTransactionsTable();
                } else if (targetId === 'view-settings') {
                    pageTitle.textContent = 'Settings';
                    renderSettingsForm();
                }
            }
        });
    });

    // Initialize Dashboard automatically
    if (!revenueChart && document.getElementById('view-dashboard').classList.contains('active')) {
        initChart();
    }

    // --- 2. Chart Initialization ---
    function initChart() {
        const chartElement = document.querySelector("#revenue-chart");
        if (!chartElement) return;

        var options = {
            series: [{
                name: 'Revenue ($)',
                data: [31000, 40000, 28000, 51000, 42000, 109000, 100000, 142394]
            }],
            chart: {
                height: 350,
                type: 'area', 
                foreColor: '#a1a1aa', 
                toolbar: { show: false }, 
                fontFamily: 'Fira Code, monospace',
                background: 'transparent'
            },
            colors: ['#3b82f6'], 
            fill: {
                type: 'gradient',
                gradient: { shadeIntensity: 1, opacityFrom: 0.7, opacityTo: 0.1, stops: [0, 90, 100] }
            },
            dataLabels: { enabled: false },
            stroke: { curve: 'smooth', width: 3 },
            xaxis: { categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'] },
            tooltip: {
                theme: 'dark', 
                y: { formatter: function (val) { return "$" + val.toLocaleString() } }
            },
            grid: { borderColor: 'rgba(255, 255, 255, 0.05)', strokeDashArray: 4 }
        };

        revenueChart = new ApexCharts(chartElement, options);
        revenueChart.render();
    }

    // --- 3. Data Rendering Logic ---
    function renderGamesTable() {
        const container = document.getElementById('view-games');
        container.innerHTML = `
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
                <h2 class="panel-title" style="color: var(--neon-green)">Manage Games</h2>
                <button class="admin-btn" onclick="GameVerseAdmin.simulateAction('Added new game')">+ Add New Game</button>
            </div>
            <div class="glass-panel table-container">
                <table class="admin-table">
                    <thead>
                        <tr>
                            <th>Thumbnail</th>
                            <th>Title</th>
                            <th>Price</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${mockGamesList.map(game => `
                            <tr>
                                <td><img src="${game.thumb}" alt="thumb" style="width:50px; border-radius:4px; border:1px solid rgba(255,255,255,0.1)"></td>
                                <td>${game.title}</td>
                                <td class="transaction-amount">$${game.price.toFixed(2)}</td>
                                <td><span class="status-badge ${game.status === 'Active' ? 'status-completed' : 'status-pending'}">${game.status}</span></td>
                                <td>
                                    <div class="action-cell">
                                        <button class="action-icon-btn view" onclick="GameVerseAdmin.simulateAction('Viewed game: ${game.title}')" title="View">
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0"/><circle cx="12" cy="12" r="3"/></svg>
                                        </button>
                                        <button class="action-icon-btn edit" onclick="GameVerseAdmin.simulateAction('Editing game: ${game.title}')" title="Edit">
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/><path d="m15 5 4 4"/></svg>
                                        </button>
                                        <button class="action-icon-btn delete" onclick="GameVerseAdmin.simulateAction('Deleted game: ${game.title}')" title="Delete">
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/><line x1="10" x2="10" y1="11" y2="17"/><line x1="14" x2="14" y1="11" y2="17"/></svg>
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            </div>
        `;
    }

    function renderUsersTable() {
        const container = document.getElementById('view-users');
        container.innerHTML = `
            <div style="margin-bottom: 20px;">
                <h2 class="panel-title" style="color: var(--neon-green)">User Management</h2>
            </div>
            <div class="glass-panel table-container">
                <table class="admin-table">
                    <thead>
                        <tr>
                            <th>Avatar</th>
                            <th>Username</th>
                            <th>Email</th>
                            <th>Role</th>
                            <th>Joined Date</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${mockUsersList.map(user => `
                            <tr>
                                <td><div class="user-avatar" style="display: flex; align-items: center; justify-content: center; font-family: 'Fira Code', monospace; font-size: 12px; color: #3B82F6;">${user.username.charAt(0).toUpperCase()}</div></td>
                                <td>${user.username}</td>
                                <td>${user.email}</td>
                                <td><span class="status-badge ${user.role === 'Super Admin' ? 'status-completed' : ''}">${user.role}</span></td>
                                <td>${user.joined}</td>
                                <td>
                                    <div class="action-cell">
                                        <button class="action-icon-btn view" onclick="GameVerseAdmin.simulateAction('Viewed user: ${user.username}')" title="View">
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0"/><circle cx="12" cy="12" r="3"/></svg>
                                        </button>
                                        <button class="action-icon-btn edit" onclick="GameVerseAdmin.simulateAction('Editing user: ${user.username}')" title="Edit">
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/><path d="m15 5 4 4"/></svg>
                                        </button>
                                        <button class="action-icon-btn delete" onclick="GameVerseAdmin.simulateAction('Blocked user: ${user.username}')" title="Block">
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/><line x1="10" x2="10" y1="11" y2="17"/><line x1="14" x2="14" y1="11" y2="17"/></svg>
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            </div>
        `;
    }

    function renderTransactionsTable() {
        const container = document.getElementById('view-transactions');
        container.innerHTML = `
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px;">
                <h2 class="panel-title" style="color: var(--neon-green)">Transactions</h2>
                <input type="date" class="admin-form-input" style="width: auto;" onchange="GameVerseAdmin.simulateAction('Filtered by date: ' + this.value)" title="Date Filter">
            </div>
            <div class="glass-panel table-container">
                <table class="admin-table">
                    <thead>
                        <tr>
                            <th>Tx ID</th>
                            <th>User</th>
                            <th>Game</th>
                            <th>Amount</th>
                            <th>Date</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${mockTransactionsList.map(tx => `
                            <tr>
                                <td style="font-family: 'Fira Code', monospace; color: #94A3B8;">${tx.id}</td>
                                <td>${tx.user}</td>
                                <td>${tx.game}</td>
                                <td class="transaction-amount">$${tx.amount.toFixed(2)}</td>
                                <td>${tx.date}</td>
                                <td><span class="status-badge ${tx.status === 'Completed' ? 'status-completed' : (tx.status === 'Failed' ? 'status-negative' : 'status-pending')}">${tx.status}</span></td>
                                <td>
                                    <div class="action-cell">
                                        <button class="action-icon-btn view" onclick="GameVerseAdmin.simulateAction('Viewed tx: ${tx.id}')" title="View">
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0"/><circle cx="12" cy="12" r="3"/></svg>
                                        </button>
                                        <button class="action-icon-btn edit" onclick="GameVerseAdmin.simulateAction('Editing tx: ${tx.id}')" title="Edit">
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/><path d="m15 5 4 4"/></svg>
                                        </button>
                                        <button class="action-icon-btn delete" onclick="GameVerseAdmin.simulateAction('Deleted tx: ${tx.id}')" title="Delete">
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/><line x1="10" x2="10" y1="11" y2="17"/><line x1="14" x2="14" y1="11" y2="17"/></svg>
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            </div>
        `;
    }

    function renderSettingsForm() {
        const container = document.getElementById('view-settings');
        container.innerHTML = `
            <div style="margin-bottom: 20px;">
                <h2 class="panel-title" style="color: var(--neon-green)">Global Settings</h2>
            </div>
            <div class="glass-panel" style="max-width: 600px;">
                <div class="admin-form-group">
                    <label>Site Name</label>
                    <input type="text" class="admin-form-input" value="GameVerse">
                </div>
                <div class="admin-form-group">
                    <label>Admin Email</label>
                    <input type="email" class="admin-form-input" value="admin@gameverse.com">
                </div>
                <div class="admin-form-group">
                    <label>Neon Accent Color</label>
                    <input type="color" class="admin-form-input" value="#39FF14" style="height: 50px; cursor: pointer;">
                </div>
                <button class="admin-btn" onclick="GameVerseAdmin.simulateAction('Settings saved successfully!')">Save Changes</button>
            </div>
        `;
    }

    // --- 4. Simulated Actions Exposer ---
    // Expose a global object for the inline onclick handlers
    window.GameVerseAdmin = {
        simulateAction: (message) => {
            alert("[SIMULATED ACTION] " + message);
        }
    };

    // --- 5. Logout Logic ---
    const logoutBtn = document.querySelector('.logout-btn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', () => {
            localStorage.removeItem('gameverse_user');
            window.location.href = 'index.html';
        });
    }
});
