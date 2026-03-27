const mockGamesList = [
    { id: 'g1', title: 'Cyberpunk 2077', thumb: 'https://tse1.mm.bing.net/th/id/OIP.NSlU9gXGETC-UJGhdMRJUwHaLH?rs=1&pid=ImgDetMain&o=7&rm=3', price: 29.99, status: 'Active' },
    { id: 'g2', title: 'Elden Ring', thumb: 'https://image.api.playstation.com/vulcan/ap/rnd/202110/2000/phvVT0qZfcRms5qDAk0SI3CM.png', price: 59.99, status: 'Active' },
    { id: 'g3', title: 'God of War Ragnarök', thumb: 'https://image.api.playstation.com/vulcan/ap/rnd/202207/1210/4xJ8XB3bi888QTLZYdl7Oi0s.png', price: 69.99, status: 'Active' },
    { id: 'g4', title: 'FIFA 23', thumb: 'https://howdysports.com/wp-content/uploads/2022/10/fifa-23-cover-star-kylian-mbappe-psg-1-1.jpg', price: 29.99, status: 'Archived' },
    { id: 'g5', title: 'Valorant', thumb: 'https://tse4.mm.bing.net/th/id/OIP.DsPgUC3WT2WCqfqun0cYfAHaLH?w=720&h=1080&rs=1&pid=ImgDetMain&o=7&rm=3', price: 0.00, status: 'Active' }
];

const mockUsersList = [
    { id: 'u1', username: 'johndoe', email: 'john@example.com', role: 'User', joined: '2026-01-15' },
    { id: 'u2', username: 'alisongm', email: 'alison@example.com', role: 'Moderator', joined: '2025-11-02' },
    { id: 'u3', username: 'gamer_x', email: 'gamer@example.com', role: 'User', joined: '2026-02-28' },
    { id: 'u4', username: 'pixelart99', email: 'pixel@example.com', role: 'User', joined: '2026-03-10' },
    { id: 'u5', username: 'admin_alex', email: 'alex@gameverse.com', role: 'Super Admin', joined: '2024-05-12' }
];

const mockTransactionsList = [
    { id: 'TX-1001', user: 'johndoe', game: 'Cyberpunk 2077', amount: 59.99, date: '2026-03-27', status: 'Completed' },
    { id: 'TX-1002', user: 'alisongm', game: 'Elden Ring', amount: 49.99, date: '2026-03-26', status: 'Pending' },
    { id: 'TX-1003', user: 'gamer_x', game: 'Stardew Valley', amount: 14.99, date: '2026-03-26', status: 'Completed' },
    { id: 'TX-1004', user: 'pixelart99', game: 'Hollow Knight', amount: 15.00, date: '2026-03-25', status: 'Completed' },
    { id: 'TX-1005', user: 'johndoe', game: 'God of War', amount: 69.99, date: '2026-03-24', status: 'Completed' },
    { id: 'TX-1006', user: 'random_guy', game: 'FIFA 23', amount: 29.99, date: '2026-03-23', status: 'Failed' },
    { id: 'TX-1007', user: 'progamer', game: 'Valorant Points', amount: 19.99, date: '2026-03-23', status: 'Completed' },
    { id: 'TX-1008', user: 'noobmaster', game: 'Minecraft', amount: 26.95, date: '2026-03-22', status: 'Completed' },
    { id: 'TX-1009', user: 'chilldude', game: 'Terraria', amount: 9.99, date: '2026-03-21', status: 'Completed' },
    { id: 'TX-1010', user: 'speedrunner', game: 'Celeste', amount: 19.99, date: '2026-03-20', status: 'Completed' }
];

export { mockGamesList, mockUsersList, mockTransactionsList };
