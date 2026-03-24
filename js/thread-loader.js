import { guideData } from './guide-data.js';

document.addEventListener('DOMContentLoaded', () => {
    const params = new URLSearchParams(window.location.search);
    const threadId = params.get('id');

    // Find guide in data
    const guide = guideData.find(g => g.id === threadId);
    
    if (guide) {
        const breadcrumbHtml = `<a href="guide.html" style="color:var(--text-muted); text-decoration:none; transition: color 0.3s;" onmouseover="this.style.color='var(--primary)'" onmouseout="this.style.color='var(--text-muted)'">Guides</a> <span style="margin: 0 8px;">&gt;</span> <span style="color:var(--text-muted);">${guide.game}</span> <span style="margin: 0 8px;">&gt;</span> <span class="text-glow">${guide.title}</span>`;
        document.getElementById('thread-breadcrumb').innerHTML = breadcrumbHtml;
        document.getElementById('thread-title').textContent = guide.title;
        document.title = `${guide.title} - GameVerse`;
    } else {
        document.getElementById('thread-title').textContent = "Thread Not Found";
        return;
    }

    const mockComments = [
        {
            user: guide.author,
            avatar: guide.avatar_url,
            time: `${guide.date}, 14:32`,
            number: "#1",
            content: `Here is the complete guide for ${guide.title}.<br><br>First, you need to head to the starting location and make sure your gear is optimized. I highly recommend running this specific loadout because the stat scaling gives you a massive advantage.<br><br>Detailed breakdown:<br>- Phase 1: Stay defensive, watch for the sweeping attacks.<br>- Phase 2: Go aggressive when the shield drops.<br><br>Hope this helps everyone currently stuck on this!`,
            signature: "Never give up, never surrender."
        },
        {
            user: "NoobSlayer99",
            avatar: "https://images.unsplash.com/photo-1552820728-8b83bb6b773f?q=80&w=100",
            time: `${guide.date}, 15:05`,
            number: "#2",
            content: "Awesome guide! I was stuck on this for hours. Did you find the hidden chest behind the waterfall as well? It contains a very rare crafting material that pairs perfectly with this build.",
            signature: "PC Master Race | RTX 5090"
        },
        {
            user: guide.author,
            avatar: guide.avatar_url,
            time: `${guide.date}, 15:42`,
            number: "#3",
            content: "Yes! Good catch. I completely forgot to add that section to the main post. I'll edit it later today. Thanks for the quick reminder, mate!",
            signature: "Never give up, never surrender."
        }
    ];

    const container = document.getElementById('thread-container');
    container.innerHTML = '';

    mockComments.forEach((comment, index) => {
        const postBlock = document.createElement('div');
        postBlock.className = 'post-block module-glass';
        
        postBlock.innerHTML = `
            <div class="post-header">
                <div style="display:flex; align-items:center; gap: 15px;">
                    <img src="${comment.avatar}" alt="${comment.user}" style="width: 45px; height: 45px; border-radius: 50%; object-fit: cover; border: 2px solid var(--primary);">
                    <div>
                        <div style="font-weight: 700; color: var(--primary); font-family: 'Chakra Petch', sans-serif; font-size: 1.1em;">${comment.user}</div>
                        <div style="font-size: 0.85em; color: var(--text-muted); margin-top: 2px;">Posted: ${comment.time}</div>
                    </div>
                </div>
                <div style="font-weight: bold; color: var(--primary); font-family: 'Russo One', sans-serif; opacity: 0.7;">${comment.number}</div>
            </div>
            <div class="post-body">
                ${comment.content}
            </div>
            <div class="post-signature">
                ---<br>${comment.signature}
            </div>
        `;
        container.appendChild(postBlock);
    });
});
