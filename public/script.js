// Datos de ejemplo
const bots = [
    {
        id: '123456789012345678',
        name: 'PremiumBot',
        description: 'Advanced multi-purpose bot with premium features',
        votes: 5420,
        servers: 12500,
        category: 'Utility',
        avatar: 'PB'
    },
    {
        id: '234567890123456789',
        name: 'MusicMaster',
        description: 'High-quality music player with 24/7 radio',
        votes: 4890,
        servers: 8900,
        category: 'Music',
        avatar: 'MM'
    },
    {
        id: '345678901234567890',
        name: 'Guardian',
        description: 'Advanced moderation and security system',
        votes: 4210,
        servers: 6500,
        category: 'Moderation',
        avatar: 'G'
    },
    {
        id: '456789012345678901',
        name: 'GameBot',
        description: 'Fun games and entertainment for your server',
        votes: 3870,
        servers: 4200,
        category: 'Games',
        avatar: 'GB'
    },
    {
        id: '567890123456789012',
        name: 'FunBot',
        description: 'Memes, jokes, and entertainment commands',
        votes: 3240,
        servers: 3800,
        category: 'Fun',
        avatar: 'FB'
    },
    {
        id: '678901234567890123',
        name: 'EconomyPro',
        description: 'Advanced economy system with jobs and shops',
        votes: 2980,
        servers: 3100,
        category: 'Economy',
        avatar: 'EP'
    }
];

// Cargar bots al inicio
document.addEventListener('DOMContentLoaded', function() {
    loadBots();
    showWelcomeMessage();
});

// Cargar bots en la grilla
function loadBots() {
    const grid = document.getElementById('botsGrid');
    grid.innerHTML = '';
    
    bots.forEach(bot => {
        const card = document.createElement('div');
        card.className = 'bot-card';
        card.innerHTML = `
            <div class="bot-header">
                <div class="bot-avatar">${bot.avatar}</div>
                <div class="bot-title">
                    <h3>${bot.name}</h3>
                    <span class="category">${bot.category}</span>
                </div>
            </div>
            
            <p class="bot-description">${bot.description}</p>
            
            <div class="bot-stats">
                <span>📊 ${bot.votes.toLocaleString()} votes</span>
                <span>🌐 ${bot.servers.toLocaleString()} servers</span>
            </div>
            
            <div class="bot-actions">
                <button class="btn-vote" onclick="voteBot('${bot.name}')">Vote</button>
                <button class="btn-invite" onclick="inviteBot('${bot.name}')">Invite</button>
            </div>
        `;
        grid.appendChild(card);
    });
}

// Función de búsqueda
function searchBots() {
    const query = document.getElementById('searchInput').value.toLowerCase();
    if (!query) {
        loadBots();
        return;
    }
    
    const filteredBots = bots.filter(bot => 
        bot.name.toLowerCase().includes(query) ||
        bot.description.toLowerCase().includes(query) ||
        bot.category.toLowerCase().includes(query)
    );
    
    const grid = document.getElementById('botsGrid');
    grid.innerHTML = '';
    
    if (filteredBots.length === 0) {
        grid.innerHTML = `
            <div style="grid-column: 1 / -1; text-align: center; padding: 2rem;">
                <h3>😔 No bots found</h3>
                <p>Try different search terms</p>
                <button class="btn-primary" onclick="loadBots()" style="margin-top: 1rem;">Show All Bots</button>
            </div>
        `;
        return;
    }
    
    filteredBots.forEach(bot => {
        const card = document.createElement('div');
        card.className = 'bot-card';
        card.innerHTML = `
            <div class="bot-header">
                <div class="bot-avatar">${bot.avatar}</div>
                <div class="bot-title">
                    <h3>${bot.name}</h3>
                    <span class="category">${bot.category}</span>
                </div>
            </div>
            
            <p class="bot-description">${bot.description}</p>
            
            <div class="bot-stats">
                <span>📊 ${bot.votes.toLocaleString()} votes</span>
                <span>🌐 ${bot.servers.toLocaleString()} servers</span>
            </div>
            
            <div class="bot-actions">
                <button class="btn-vote" onclick="voteBot('${bot.name}')">Vote</button>
                <button class="btn-invite" onclick="inviteBot('${bot.name}')">Invite</button>
            </div>
        `;
        grid.appendChild(card);
    });
}

// Funciones de acción
function voteBot(botName) {
    alert(`✅ Voted for ${botName}! Thank you for your vote!`);
}

function inviteBot(botName) {
    alert(`🔗 Invite link for ${botName} would be generated here!`);
}

// Mensaje de bienvenida
function showWelcomeMessage() {
    setTimeout(() => {
        alert('🎉 Welcome to External.ui - Your Discord Bot Directory!');
    }, 1000);
}

// Teclas rápidas
document.addEventListener('keydown', function(e) {
    if (e.ctrlKey && e.key === 'k') {
        e.preventDefault();
        document.getElementById('searchInput').focus();
    }
    
    if (e.key === 'Enter' && document.activeElement.id === 'searchInput') {
        searchBots();
    }
});
