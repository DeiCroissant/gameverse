document.addEventListener('DOMContentLoaded', () => {
    const sidebarLinks = document.querySelectorAll('.sidebar-link');
    const adminViews = document.querySelectorAll('.admin-view');
    const pageTitle = document.querySelector('.page-title');

    sidebarLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Remove active from all links
            sidebarLinks.forEach(l => l.classList.remove('active'));
            // Add active to clicked link
            link.classList.add('active');

            // Hide all views
            adminViews.forEach(view => view.classList.add('hidden'));
            
            // Show target view
            const targetId = link.getAttribute('data-target');
            const targetView = document.getElementById(targetId);
            if (targetView) {
                targetView.classList.remove('hidden');
                
                // Update page title
                if (targetId === 'view-dashboard') {
                    pageTitle.textContent = 'Dashboard Overview';
                } else if (targetId === 'view-games') {
                    pageTitle.textContent = 'Manage Games';
                } else if (targetId === 'view-users') {
                    pageTitle.textContent = 'User Management';
                } else if (targetId === 'view-transactions') {
                    pageTitle.textContent = 'Transactions';
                } else if (targetId === 'view-settings') {
                    pageTitle.textContent = 'Settings';
                }
            }
        });
    });

    // ApexCharts Interactive Revenue Chart
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
            gradient: {
                shadeIntensity: 1,
                opacityFrom: 0.7,
                opacityTo: 0.1,
                stops: [0, 90, 100]
            }
        },
        dataLabels: { enabled: false },
        stroke: {
            curve: 'smooth',
            width: 3
        },
        xaxis: {
            categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'],
        },
        tooltip: {
            theme: 'dark', 
            y: {
                formatter: function (val) {
                    return "$" + val.toLocaleString()
                }
            }
        },
        grid: {
            borderColor: 'rgba(255, 255, 255, 0.05)',
            strokeDashArray: 4,
        }
    };

    var chart = new ApexCharts(document.querySelector("#revenue-chart"), options);
    chart.render();

    // Logout Logic
    const logoutBtn = document.querySelector('.logout-btn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', () => {
            // Xóa phiên đăng nhập giả lập
            localStorage.removeItem('gameverse_user');
            // Chuyển hướng về trang chủ
            window.location.href = 'index.html';
        });
    }
});
