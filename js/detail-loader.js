import { gamesData } from './data.js';

document.addEventListener('DOMContentLoaded', () => {
    initDynamicDetails();
});

function initDynamicDetails() {
    // 1. Get ID from URL
    const params = new URLSearchParams(window.location.search);
    const id = params.get('id');

    // Default to tears-of-steel if empty or unrecognized
    const game = gamesData[id] || gamesData['tears-of-steel'];

    // 2. Hydrate DOM
    const videoElem = document.getElementById('dyn-video');
    const carouselElem = document.getElementById('dyn-carousel');
    const titleElem = document.getElementById('dyn-title');
    const priceElem = document.getElementById('dyn-price');
    const descElem = document.getElementById('dyn-desc');
    const featuresElem = document.getElementById('dyn-features');

    // Handle Media (Video vs Images)
    if (game.mediaType === 'images' && game.images) {
        if (videoElem) videoElem.style.display = 'none';
        if (carouselElem) {
            carouselElem.style.display = 'block';
            carouselElem.innerHTML = ''; // Clear existing
            
            // Generate Image Slides
            game.images.forEach((imgSrc, index) => {
                const img = document.createElement('img');
                img.src = imgSrc;
                img.className = index === 0 ? 'carousel-slide active' : 'carousel-slide';
                carouselElem.appendChild(img);
            });

            // Start Carousel Interval
            let currentIndex = 0;
            const slides = carouselElem.querySelectorAll('.carousel-slide');
            if (slides.length > 1) {
                // Attach interval to window to prevent duplication if called again
                if (window.carouselInterval) clearInterval(window.carouselInterval);
                window.carouselInterval = setInterval(() => {
                    slides[currentIndex].classList.remove('active');
                    currentIndex = (currentIndex + 1) % slides.length;
                    slides[currentIndex].classList.add('active');
                }, 4000);
            }
        }
    } else {
        // Fallback to Video
        if (carouselElem) carouselElem.style.display = 'none';
        if (videoElem) {
            videoElem.style.display = 'block';
            videoElem.src = game.videoSrc;
        }
    }

    if (titleElem) titleElem.textContent = game.title;
    if (priceElem) priceElem.textContent = game.price;
    if (descElem) descElem.textContent = game.description;

    if (featuresElem && game.features) {
        // Clear old list
        featuresElem.innerHTML = '';
        
        // Populate new list
        game.features.forEach(feature => {
            const li = document.createElement('li');
            li.innerHTML = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--primary)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg> ${feature}`;
            featuresElem.appendChild(li);
        });
    }

    // System Requirements
    const sysReqElem = document.getElementById('dyn-sys-req');
    const sysReqTitle = sysReqElem ? sysReqElem.previousElementSibling : null;

    if (sysReqElem && game.systemRequirements) {
        if (sysReqTitle) sysReqTitle.style.display = 'block';
        sysReqElem.style.display = 'block';
        sysReqElem.innerHTML = '';
        for (const [key, value] of Object.entries(game.systemRequirements)) {
            const li = document.createElement('li');
            li.innerHTML = `<strong>${key.toUpperCase()}:</strong> ${value}`;
            sysReqElem.appendChild(li);
        }
    } else if (sysReqElem) {
        if (sysReqTitle) sysReqTitle.style.display = 'none';
        sysReqElem.style.display = 'none';
    }

    // Update Headings and Metadata
    document.title = game.title + " - GameVerse";
    
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) metaDesc.setAttribute("content", `${game.title} - ${game.description}`);
    
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) ogTitle.setAttribute("content", game.title);
    
    const ogDesc = document.querySelector('meta[property="og:description"]');
    if (ogDesc) ogDesc.setAttribute("content", `${game.title} - ${game.description}`);
    
    const ogImage = document.querySelector('meta[property="og:image"]');
    if (ogImage) ogImage.setAttribute("content", game.videoSrc);

    // Cart Logic
    const addToCartBtn = document.getElementById('add-to-cart-btn');
    if (addToCartBtn) {
        addToCartBtn.addEventListener('click', () => {
            const user = localStorage.getItem('gameverse_user');
            if (!user) {
                if (window.showToast) window.showToast('Please login first!', 'error');
                const modal = document.getElementById('auth-modal');
                if (modal) modal.classList.remove('hidden');
                return;
            }

            let cart = JSON.parse(localStorage.getItem('gameverse_cart') || '[]');
            // Use 'id' from URL, but if null use the fallback id
            const itemId = id || 'tears-of-steel';
            if (!cart.includes(itemId)) {
                cart.push(itemId);
                localStorage.setItem('gameverse_cart', JSON.stringify(cart));
                if (window.showToast) {
                    window.showToast('Added to cart!', 'success');
                }
            } else {
                if (window.showToast) {
                    window.showToast('Item already in cart!', 'error');
                }
            }
        });
    }

    const buyNowBtn = document.getElementById('buy-now-btn');
    if (buyNowBtn) {
        buyNowBtn.addEventListener('click', () => {
            const user = localStorage.getItem('gameverse_user');
            if (!user) {
                if (window.showToast) window.showToast('Please login first to checkout!', 'error');
                const modal = document.getElementById('auth-modal');
                if (modal) modal.classList.remove('hidden');
                return;
            }

            let cart = JSON.parse(localStorage.getItem('gameverse_cart') || '[]');
            const itemId = id || 'tears-of-steel';
            if (!cart.includes(itemId)) {
                cart.push(itemId);
                localStorage.setItem('gameverse_cart', JSON.stringify(cart));
            }
            window.location.href = 'user.html';
        });
    }
}
