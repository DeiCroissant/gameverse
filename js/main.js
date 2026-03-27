/**
 * GameVerse Main Logic
 * Handles 3D Tilt Effects for Game Cards
 */

document.addEventListener('DOMContentLoaded', () => {
    initTiltEffect();
    initScrollReveal();
    initAuthModal();
});

function initTiltEffect() {
    const cards = document.querySelectorAll('.tilt-card');

    cards.forEach(card => {
        card.addEventListener('mousemove', handleMouseMove);
        card.addEventListener('mouseleave', handleMouseLeave);
        card.addEventListener('mouseenter', handleMouseEnter);
    });
}

function handleMouseMove(e) {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    
    // Calculate mouse position relative to the card center
    // 0,0 is center
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    // Rotation Multipliers (Max degrees)
    const multiplier = 20; 
    
    // RotateX is based on Y axis (moving mouse up/down tilts card vertically)
    // RotateY is based on X axis (moving mouse left/right tilts card horizontally)
    const rotateX = (y / (rect.height / 2)) * -multiplier; // Invert to follow mouse naturally
    const rotateY = (x / (rect.width / 2)) * multiplier;

    // Update Styles
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`;
    
    // Dynamic Glow Effect (Optional)
    // card.style.boxShadow = `${-rotateY}px ${rotateX}px 20px rgba(163, 255, 18, 0.2)`;
}

function handleMouseLeave(e) {
    const card = e.currentTarget;
    
    // Reset transform
    card.style.transform = `perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)`;
    card.style.transition = 'transform 0.5s ease-out'; // Smooth return
}

function handleMouseEnter(e) {
    const card = e.currentTarget;
    // Remove transition during movement for instant response
    card.style.transition = 'none';
}

function initScrollReveal() {
    const reveals = document.querySelectorAll('.reveal');

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, observerOptions);

    reveals.forEach(reveal => {
        observer.observe(reveal);
    });
}

function initAuthModal() {
    const modal = document.getElementById('auth-modal');
    if (!modal) {
        updateNavUI(); // Just attempt to run UI updates on non-index pages
        return; 
    }

    const loginBtn = document.getElementById('nav-login-btn');
    const closeModalBtn = document.getElementById('close-modal');
    const authTabs = document.querySelectorAll('.auth-tab');
    const formLogin = document.getElementById('form-login');
    const formRegister = document.getElementById('form-register');

    if (loginBtn) {
        loginBtn.addEventListener('click', (e) => {
            e.preventDefault();
            modal.classList.remove('hidden');
        });
    }

    if (closeModalBtn) {
        closeModalBtn.addEventListener('click', () => {
            modal.classList.add('hidden');
        });
    }

    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.add('hidden');
        }
    });

    authTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            authTabs.forEach(t => t.classList.remove('active'));
            formLogin.classList.add('hidden');
            formRegister.classList.add('hidden');

            tab.classList.add('active');
            if (tab.getAttribute('data-target') === 'login') {
                formLogin.classList.remove('hidden');
            } else {
                formRegister.classList.remove('hidden');
            }
        });
    });

    const handleAuth = (e, usernameInputId) => {
        e.preventDefault();
        const username = document.getElementById(usernameInputId).value;
        if (username) {
            localStorage.setItem('gameverse_user', username);
            modal.classList.add('hidden');
            updateNavUI();
        }
    };

    formLogin.addEventListener('submit', (e) => handleAuth(e, 'login-username'));
    formRegister.addEventListener('submit', (e) => handleAuth(e, 'reg-username'));

    updateNavUI();
}

function updateNavUI() {
    const user = localStorage.getItem('gameverse_user');
    if (user) {
        const transformButton = (btn) => {
            if (btn.hasAttribute('data-transformed')) return;
            
            const container = document.createElement('div');
            container.style.display = 'flex';
            container.style.alignItems = 'center';
            container.style.gap = '15px';
            
            const userGreeting = document.createElement('span');
            userGreeting.textContent = `Hi, ${user}`;
            userGreeting.style.color = 'var(--text-primary)';
            userGreeting.style.fontWeight = 'bold';
            
            const adminLink = document.createElement('button');
            adminLink.className = 'btn-small glow-neon';
            adminLink.textContent = 'Admin Panel';
            adminLink.onclick = () => window.location.href = 'admin.html';
            
            const logOutBtn = document.createElement('button');
            logOutBtn.className = 'btn-small';
            logOutBtn.style.borderColor = '#EF4444';
            logOutBtn.style.color = '#EF4444';
            logOutBtn.textContent = 'Logout';
            logOutBtn.onclick = () => {
                localStorage.removeItem('gameverse_user');
                window.location.reload();
            };
            
            container.appendChild(userGreeting);
            container.appendChild(adminLink);
            container.appendChild(logOutBtn);
            
            btn.parentNode.replaceChild(container, btn);
            container.setAttribute('data-transformed', 'true');
        };

        // Find login button based on multiple pages variants
        const loginBtnIndex = document.getElementById('nav-login-btn');
        if (loginBtnIndex) {
            transformButton(loginBtnIndex);
        } else {
            // Check elements with text content "Login" or "Log In"
            const allBtns = document.querySelectorAll('nav button');
            allBtns.forEach(btn => {
                if (btn.textContent.includes('Login') || btn.textContent.includes('Log In')) {
                    transformButton(btn);
                }
            });
        }
    }
}
