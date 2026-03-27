import { guideData } from './guide-data.js';

document.addEventListener('DOMContentLoaded', () => {
    const params = new URLSearchParams(window.location.search);
    const threadId = params.get('id');

    const communityThreads = [
        {
            id: 'forum-maintenance',
            title: 'GameVerse Announcements',
            game: 'Community',
            author: 'ServerAdmin',
            avatar_url: 'https://images.unsplash.com/photo-1519058082700-08a0b56da9b4?q=80&w=100',
            date: 'Today',
            comments: [
                {
                    user: 'ServerAdmin',
                    avatar: 'https://images.unsplash.com/photo-1519058082700-08a0b56da9b4?q=80&w=100',
                    time: 'Today, 10:00 AM',
                    number: '#1',
                    content: 'Attention all players, we will be performing scheduled maintenance for Q2 updates on our servers. Expect roughly 2 hours of downtime starting at midnight PST.',
                    signature: 'System Administrator'
                },
                {
                    user: 'GamerGuy12',
                    avatar: 'https://images.unsplash.com/photo-1552820728-8b83bb6b773f?q=80&w=100',
                    time: 'Today, 10:15 AM',
                    number: '#2',
                    content: 'Thanks for the heads up! Will this fix the matchmaking issue in the Store section?',
                    signature: ''
                }
            ]
        },
        {
            id: 'build-netrunner',
            title: 'Ultimate Netrunner Build',
            game: 'Cyberpunk 2077',
            author: 'CyberPro',
            avatar_url: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=100',
            date: 'Yesterday',
            comments: [
                {
                    user: 'CyberPro',
                    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=100',
                    time: 'Yesterday, 14:32',
                    number: '#1',
                    content: 'Here is my updated Netrunner build for Patch 2.1.<br><br>Focus purely on Intelligence and Tech. Use the Tetratronic Rippler MK.5 cyberdeck. Short Circuit and Contagion will carry you through 90% of encounters without firing a single bullet.',
                    signature: 'Chrome up, Choom.'
                },
                {
                    user: 'V_Fanboy',
                    avatar: 'https://images.unsplash.com/photo-1599566150163-29194dcaad36?q=80&w=100',
                    time: 'Yesterday, 16:05',
                    number: '#2',
                    content: 'Overclock makes this build absolutely broken! I cleared an entire Arasaka facility in 30 seconds.',
                    signature: 'Night City Legend'
                }
            ]
        },
        // Generic template for others
        {
            id: 'rtx-5090',
            title: 'RTX 5090 Performance Limits',
            game: 'PC Gaming',
            author: 'TechGuru99',
            avatar_url: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?q=80&w=100',
            date: 'A moment ago',
            comments: [
                {
                    user: 'TechGuru99',
                    avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?q=80&w=100',
                    time: 'A moment ago',
                    number: '#1',
                    content: 'Has anyone else noticed that the 5090 gets severely bottlenecked at 4K if you don’t have at least an I9-14900k?',
                    signature: 'Frames win games.'
                }
            ]
        },
        {
            id: 'ps5-rumors',
            title: 'Spider-Man 3 Rumors',
            game: 'PlayStation',
            author: 'WebHead',
            avatar_url: 'https://images.unsplash.com/photo-1607990281513-2c110a25bd8c?q=80&w=100',
            date: '11 minutes ago',
            comments: [
                {
                    user: 'WebHead',
                    avatar: 'https://images.unsplash.com/photo-1607990281513-2c110a25bd8c?q=80&w=100',
                    time: '11 minutes ago',
                    number: '#1',
                    content: 'The new leaks say Green Goblin is the main villain. What do you guys think?',
                    signature: 'Friendly Neighborhood Poster'
                }
            ]
        },
        {
            id: 'lfg-raid',
            title: 'Need 2 for Raid Tonight',
            game: 'LFG',
            author: 'KaizerStar',
            avatar_url: 'https://images.unsplash.com/photo-1527980965255-d3b416303d12?q=80&w=100',
            date: 'Today at 3:53 AM',
            comments: [
                {
                    user: 'KaizerStar',
                    avatar: 'https://images.unsplash.com/photo-1527980965255-d3b416303d12?q=80&w=100',
                    time: 'Today at 3:53 AM',
                    number: '#1',
                    content: 'Looking for 2 experienced players for a fast raid clear tonight at 8 PM EST. Whisper/DM me your class.',
                    signature: 'Loot > Rest'
                }
            ]
        },
        {
            id: 'elden-ring-boss',
            title: 'Elden Ring Boss Guide',
            game: 'Elden Ring',
            author: 'Tarnished',
            avatar_url: 'https://images.unsplash.com/photo-1534030347209-467a5b0ad3e6?q=80&w=100',
            date: '2 days ago',
            comments: [
                {
                    user: 'Tarnished',
                    avatar: 'https://images.unsplash.com/photo-1534030347209-467a5b0ad3e6?q=80&w=100',
                    time: '2 days ago',
                    number: '#1',
                    content: 'Malenia phase 2 dodge pattern is tricky. Always dodge to the right when she does the clone attack, then roll backward twice.',
                    signature: 'Maidenless but victorious'
                }
            ]
        },
        {
            id: 'news-1',
            title: 'GameVerse 2.0 Update Preview: What to Expect',
            game: 'Announcements',
            author: 'Admin Team',
            avatar_url: 'https://images.unsplash.com/photo-1519058082700-08a0b56da9b4?q=80&w=100',
            date: '3 hours ago',
            comments: [
                {
                    user: 'Admin Team',
                    avatar: 'https://images.unsplash.com/photo-1519058082700-08a0b56da9b4?q=80&w=100',
                    time: '3 hours ago',
                    number: '#1',
                    content: 'We are thrilled to announce GameVerse 2.0! This update brings massive performance enhancements, real-time 3D rendering updates, and the highly anticipated Admin Dashboard module for our moderators. Stay tuned!',
                    signature: 'GameVerse Official'
                }
            ]
        }
    ];

    // Find guide in data or community threads
    const isGuide = guideData.some(g => g.id === threadId);
    const guide = guideData.find(g => g.id === threadId) || communityThreads.find(g => g.id === threadId);
    
    if (guide) {
        let breadcrumbHtml = '';
        if (isGuide) {
            breadcrumbHtml = `<a href="guide.html" style="color:var(--text-muted); text-decoration:none; transition: color 0.3s;" onmouseover="this.style.color='var(--primary)'" onmouseout="this.style.color='var(--text-muted)'">Guides</a> <span style="margin: 0 8px;">&gt;</span> <a href="guide.html" style="color:var(--text-muted); text-decoration:none; transition: color 0.3s;" onmouseover="this.style.color='var(--primary)'" onmouseout="this.style.color='var(--text-muted)'">${guide.game}</a> <span style="margin: 0 8px;">&gt;</span> <span class="text-glow">${guide.title}</span>`;
        } else {
            breadcrumbHtml = `<a href="community.html" style="color:var(--text-muted); text-decoration:none; transition: color 0.3s;" onmouseover="this.style.color='var(--primary)'" onmouseout="this.style.color='var(--text-muted)'">Community</a> <span style="margin: 0 8px;">&gt;</span> <a href="community.html" style="color:var(--text-muted); text-decoration:none; transition: color 0.3s;" onmouseover="this.style.color='var(--primary)'" onmouseout="this.style.color='var(--text-muted)'">${guide.game}</a> <span style="margin: 0 8px;">&gt;</span> <span class="text-glow">${guide.title}</span>`;
        }
        document.getElementById('thread-breadcrumb').innerHTML = breadcrumbHtml;
        document.getElementById('thread-title').textContent = guide.title;
        document.title = `${guide.title} - GameVerse`;
    } else {
        document.getElementById('thread-title').textContent = "Thread Not Found";
        return;
    }

    let mockComments = guide.comments || [
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
