
// Datos de ejemplo más completos
const bots = [
    {
        id: '123456789012345678',
        name: 'PremiumBot',
        description: 'Advanced multi-purpose bot with premium features and 24/7 support. Perfect for any server size.',
        votes: 5420,
        servers: 12500,
        users: 250000,
        category: 'Utility',
        avatar: 'PB',
        verified: true,
        featured: true,
        tags: ['moderation', 'fun', 'utility']
    },
    {
        id: '234567890123456789',
        name: 'MusicMaster',
        description: 'High-quality music player with 24/7 radio and +1000 stations. The ultimate music experience.',
        votes: 4890,
        servers: 8900,
        users: 180000,
        category: 'Music',
        avatar: 'MM',
        verified: true,
        featured: true,
        tags: ['music', 'radio', 'audio']
    },
    {
        id: '345678901234567890',
        name: 'Guardian',
        description: 'Advanced moderation and security system with AI detection. Keep your server safe and clean.',
        votes: 4210,
        servers: 6500,
        users: 130000,
        category: 'Moderation',
        avatar: 'G',
        verified: true,
        featured: false,
        tags: ['moderation', 'security', 'admin']
    },
    {
        id: '456789012345678901',
        name: 'GameBot',
        description: 'Fun games and entertainment for your server. Mini-games, trivia, and more to keep members engaged.',
        votes: 3870,
        servers: 4200,
        users: 95000,
        category: 'Games',
        avatar: 'GB',
        verified: false,
        featured: false,
        tags: ['games', 'fun', 'entertainment']
    },
    {
        id: '567890123456789012',
        name: 'FunBot',
        description: 'Memes, jokes, and entertainment commands. Bring laughter and fun to your Discord server.',
        votes: 3240,
        servers: 3800,
        users: 80000,
        category: 'Fun',
        avatar: 'FB',
        verified: false,
        featured: false,
        tags: ['fun', 'memes', 'entertainment']
    },
    {
        id: '678901234567890123',
        name: 'EconomyPro',
        description: 'Advanced economy system with jobs, shops, and currency. Create a thriving virtual economy.',
        votes: 2980,
        servers: 3100,
        users: 65000,
        category: 'Economy',
        avatar: 'EP',
        verified: false,
        featured: false,
        tags: ['economy', 'currency', 'jobs']
    }
];

// Cargar bots al inicio
document.addEventListener('DOMContentLoaded', function() {
    loadBots();
    setupEventListeners();
});

// Cargar bots en la grilla
function loadBots(botsToShow = bots) {
    const grid = document.getElementById('botsGrid');
    grid.innerHTML = '';
    
    if (botsToShow.length === 0) {
        grid.innerHTML = `
            <div style="grid-column: 1 / -1; text-align: center; padding: 2rem;">
                <h3>😔 No bots found</h3>
                <p>Try different search terms or categories</p>
                <button class="btn-primary" onclick="loadBots()" style="margin-top: 1rem;">Show All Bots</button>
            </div>
        `;
        return;
    }
    
    botsToShow.forEach(bot => {
        const card = createBotCard(bot);
        grid.appendChild(card);
    });
}

// Crear tarjeta de bot
function createBotCard(bot) {
    const card = document.createElement('div');
    card.className = 'bot-card';
    card.innerHTML = `
        <div class="bot-header">
            <div class="bot-avatar">${bot.avatar}</div>
            <div class="bot-title">
                <h3>${bot.name} ${bot.verified ? '✅' : ''}</h3>
                <span class="category">${bot.category}</span>
            </div>
        </div>
        
        <p class="bot-description">${bot.description}</p>
        
        <div class="bot-stats">
            <span>📊 ${bot.votes.toLocaleString()} votes</span>
            <span>🌐 ${bot.servers.toLocaleString()} servers</span>
        </div>
        
        <div class="bot-actions">
            <button class="btn-vote" onclick="voteBot('${bot.name}', '${bot.id}')">Vote</button>
            <button class="btn-invite" onclick="inviteBot('${bot.name}')">Invite</button>
        </div>
    `;
    return card;
}

// Función de búsqueda
function searchBots() {
    const query = document.getElementById('searchInput').value.toLowerCase();
    const category = document.getElementById('categorySelect').value.toLowerCase();
    
    let filteredBots = bots;
    
    if (query) {
        filteredBots = filteredBots.filter(bot => 
            bot.name.toLowerCase().includes(query) ||
            bot.description.toLowerCase().includes(query) ||
            bot.tags.some(tag => tag.toLowerCase().includes(query))
        );
    }
    
    if (category) {
        filteredBots = filteredBots.filter(bot => 
            bot.category.toLowerCase() === category
        );
    }
    
    loadBots(filteredBots);
}

// Filtrar por categoría
function filterByCategory(category) {
    document.getElementById('categorySelect').value = category;
    searchBots();
}

// Filtrar por tag
function filterByTag(tag) {
    document.getElementById('searchInput').value = tag;
    searchBots();
}

// Ordenar bots
function sortBots() {
    const sortValue = document.getElementById('sortSelect').value;
    let sortedBots = [...bots];
    
    switch(sortValue) {
        case 'votes':
            sortedBots.sort((a, b) => b.votes - a.votes);
            break;
        case 'servers':
            sortedBots.sort((a, b) => b.servers - a.servers);
            break;
        case 'name':
            sortedBots.sort((a, b) => a.name.localeCompare(b.name));
            break;
    }
    
    loadBots(sortedBots);
}

// Funciones de acción
function voteBot(botName, botId) {
    // Simular voto (en producción usarías una API real)
    alert(`✅ Voted for ${botName}! Thank you for your vote!\nBot ID: ${botId}`);
    
    // Aquí podrías hacer una llamada a tu API para registrar el voto
    // fetch('/api/vote/' + botId, { method: 'POST' })
}

function inviteBot(botName) {
    // Simular invitación (en producción usarías un enlace real)
    alert(`🔗 Invite link for ${botName} would be generated here!\n(In a real implementation, this would open the bot invite URL)`);
    
    // Ejemplo de enlace real:
    // window.open(`https://discord.com/api/oauth2/authorize?client_id=${botId}&permissions=8&scope=bot`, '_blank');
}

// Configurar event listeners
function setupEventListeners() {
    // Buscar al presionar Enter
    document.getElementById('searchInput').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            searchBots();
        }
    });
    
    // Mini búsqueda
    document.getElementById('miniSearch').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            const query = this.value;
            if (query) {
                document.getElementById('searchInput').value = query;
                searchBots();
            }
        }
    });
    
    // Teclas rápidas
    document.addEventListener('keydown', function(e) {
        // Ctrl + K para buscar
        if (e.ctrlKey && e.key === 'k') {
            e.preventDefault();
            document.getElementById('searchInput').focus();
        }
        
        // Esc para limpiar búsqueda
        if (e.key === 'Escape') {
            document.getElementById('searchInput').value = '';
            document.getElementById('categorySelect').value = '';
            loadBots();
        }
    });
}

// Mensaje de bienvenida (solo una vez)
function showWelcomeMessage() {
    if (!localStorage.getItem('welcomeShown')) {
        setTimeout(() => {
            alert('🎉 Welcome to External.ui - Your Discord Bot Directory!');
        }, 1000);
        localStorage.setItem('welcomeShown', 'true');
    }
}

// Inicializar
showWelcomeMessage();
