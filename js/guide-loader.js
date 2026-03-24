import { guideData } from './guide-data.js';

let currentPage = 1;
const itemsPerPage = 4;

function renderGuides(page) {
    const tbody = document.querySelector('.guide-table tbody');
    if (!tbody) return;

    // Calculate start and end indices
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedItems = guideData.slice(startIndex, endIndex);

    // Clear current content
    tbody.innerHTML = '';

    // Render items
    paginatedItems.forEach(guide => {
        const tr = document.createElement('tr');
        tr.className = 'guide-row';
        tr.style.cursor = 'pointer';
        tr.onclick = () => {
            window.location.href = `guide-thread.html?id=${guide.id}`;
        };

        const popularBadge = guide.popular ? '<span class="badge badge-popular">Popular</span>' : '';

        tr.innerHTML = `
            <td class="guide-info">
                <img src="${guide.avatar_url}" class="guide-thumb" alt="Game thumb">
                <div class="guide-meta">
                    <span class="guide-game">${guide.game}</span>
                    <a href="guide-thread.html?id=${guide.id}" class="guide-link" onclick="event.stopPropagation()">${guide.title}</a>
                    ${popularBadge}
                </div>
            </td>
            <td class="guide-author">
                <i class='bx bxs-user-circle'></i> ${guide.author}
            </td>
            <td class="guide-date hide-mobile">${guide.date}</td>
        `;
        tbody.appendChild(tr);
    });

    updatePagination(page);
}

function updatePagination(page) {
    const totalPages = Math.ceil(guideData.length / itemsPerPage);
    const pageNumSpan = document.querySelector('.page-num');
    const prevBtn = document.querySelector('.pagination button:first-child');
    const nextBtn = document.querySelector('.pagination button:last-child');

    if (pageNumSpan) {
        pageNumSpan.textContent = `Page ${page} of ${totalPages}`;
    }

    if (prevBtn) {
        prevBtn.disabled = page === 1;
        prevBtn.style.opacity = page === 1 ? '0.5' : '1';
        prevBtn.style.cursor = page === 1 ? 'not-allowed' : 'pointer';
    }

    if (nextBtn) {
        nextBtn.disabled = page === totalPages;
        nextBtn.style.opacity = page === totalPages ? '0.5' : '1';
        nextBtn.style.cursor = page === totalPages ? 'not-allowed' : 'pointer';
    }
}

document.addEventListener('DOMContentLoaded', () => {
    // Initial render
    renderGuides(currentPage);

    // Attach event listeners
    const prevBtn = document.querySelector('.pagination button:first-child');
    const nextBtn = document.querySelector('.pagination button:last-child');

    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            if (currentPage > 1) {
                currentPage--;
                renderGuides(currentPage);
            }
        });
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            const totalPages = Math.ceil(guideData.length / itemsPerPage);
            if (currentPage < totalPages) {
                currentPage++;
                renderGuides(currentPage);
            }
        });
    }
});
