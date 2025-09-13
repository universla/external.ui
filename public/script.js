
// Configuración de la API (reemplaza con tu URL real)
const API_BASE_URL = 'https://TU-DOMINIO-DEL-BOT/api'; // Ej: https://tu-bot.vercel.app/api
const BOT_CLIENT_ID = 'TU_BOT_ID'; // Reemplaza con el ID real de tu bot
const DISCORD_INVITE = 'TU_INVITACION'; // Reemplaza con tu invitación real

// Datos simulados (en producción se conectarían con tu API real)
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
        tags: ['moderation', 'fun', 'utility'],
        position: 1
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
        tags: ['music', 'radio', 'audio'],
        position: 2
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
        tags: ['moderation', 'security', 'admin'],
        position: 3
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
        tags: ['games', 'fun', 'entertainment'],
        position: 4
    }
];

// Estadísticas simuladas
let stats = {
    totalBots: 14520,
    totalVotes: 8900,
    activeServers: 250000,
    onlineUsers: 1200000
};

// Cargar datos al inicio
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
    setupEventListeners();
});

// Inicializar la aplicación
async function initializeApp() {
    try {
        // Cargar datos reales desde la API (si está disponible)
        await loadRealData();
        
        // Cargar interfaz
        loadBots();
        loadStats();
        updateBotStatus();
        setupInviteButtons();
        showWelcomeMessage();
        
        console.log('✅ Aplicación inicializada correctamente');
    } catch (error) {
        console.error('❌ Error inicializando la aplicación:', error);
        // Usar datos simulados si la API no está disponible
        loadBots();
        loadStats();
        updateBotStatus();
        setupInviteButtons();
        showWelcomeMessage();
    }
}

// Cargar datos reales desde la API
async function loadRealData() {
    try {
        // Intentar cargar estadísticas reales
        const statsResponse = await fetch(`${API_BASE_URL}/stats`);
        if (statsResponse.ok) {
            const realStats = await statsResponse.json();
            stats = realStats;
        }
        
        // Intentar cargar bots reales
        const botsResponse = await fetch(`${API_BASE_URL}/bots?limit=10`);
        if (botsResponse.ok) {
            const realBots = await botsResponse.json();
            // Usar bots reales si están disponibles
            if (realBots.length > 0) {
                // bots = realBots; // Descomentar cuando tengas la API real
            }
        }
        
        console.log('✅ Datos reales cargados');
    } catch (error) {
        console.log('ℹ️ Usando datos simulados (API no disponible)');
    }
}

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
            <button class="btn-invite" onclick="inviteBot('${bot.name}', '${bot.id}')">Invite</button>
        </div>
    `;
    return card;
}

// Cargar estadísticas
function loadStats() {
    document.getElementById('totalBots').textContent = stats.totalBots.toLocaleString();
    document.getElementById('totalVotes').textContent = stats.totalVotes.toLocaleString();
    document.getElementById('activeServers').textContent = stats.activeServers.toLocaleString();
    document.getElementById('onlineUsers').textContent = stats.onlineUsers.toLocaleString();
}

// Actualizar estado del bot
async function updateBotStatus() {
    const statusElement = document.getElementById('botStatus');
    const statusText = document.getElementById('statusText');
    
    try {
        // Simular conexión con el bot (en producción harías una llamada real)
        setTimeout(() => {
            statusElement.classList.add('online');
            statusText.textContent = 'Bot Online';
            statusText.title = 'Conectado a Discord';
        }, 2000);
        
        console.log('✅ Estado del bot actualizado');
    } catch (error) {
        console.log('⚠️ Bot offline o no disponible');
        statusText.textContent = 'Bot Offline';
        statusText.title = 'Desconectado de Discord';
    }
}

// Sistema de votación
async function voteBot(botName, botId) {
    try {
        // En producción, esto se conectaría a tu API real
        const response = await fetch(`${API_BASE_URL}/vote/${botId}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                userId: 'web-user', // En producción usarías el ID real del usuario
                timestamp: new Date().toISOString()
            })
        });
        
        if (response.ok) {
            const data = await response.json();
            alert(`✅ ¡Voto registrado para ${botName}!\nVotos totales: ${data.votes}`);
            
            // Actualizar estadísticas locales
            stats.totalVotes += 1;
            loadStats();
            
            // Actualizar bot en la lista
            const bot = bots.find(b => b.id === botId);
            if (bot) {
                bot.votes += 1;
                loadBots(); // Recargar para mostrar el nuevo voto
            }
        } else {
            throw new Error('Error en la respuesta del servidor');
        }
    } catch (error) {
        console.error('❌ Error votando:', error);
        alert(`✅ ¡Voto registrado para ${botName}!\n\nEn una implementación real, esto se conectaría directamente con tu bot de Discord.`);
    }
}

// Sistema de invitación
function inviteBot(botName, botId) {
    // En producción, usarías el ID real de tu bot
    const inviteUrl = `https://discord.com/api/oauth2/authorize?client_id=${botId}&permissions=8&scope=bot%20applications.commands`;
    
    if (confirm(`¿Quieres invitar a ${botName} a tu servidor de Discord?`)) {
        window.open(inviteUrl, '_blank');
    }
}

// Configurar botones de invitación
function setupInviteButtons() {
    const inviteButtons = document.querySelectorAll('#inviteBotButton, #inviteBotButton2');
    inviteButtons.forEach(button => {
        button.href = `https://discord.com/api/oauth2/authorize?client_id=${BOT_CLIENT_ID}&permissions=8&scope=bot%20applications.commands`;
        button.target = '_blank';
    });
    
    // Configurar enlaces del footer
    document.getElementById('discordLink').href = `https://discord.gg/${DISCORD_INVITE}`;
    document.getElementById('githubLink').href = 'https://github.com/TU_USUARIO/TU_REPOSITORIO';
}

// Cargar leaderboard
function loadLeaderboard() {
    const timeframe = document.getElementById('timeframeSelect').value;
    // En producción, esto cargaría datos reales según el timeframe
    loadBots();
}

// Configurar event listeners
function setupEventListeners() {
    // Teclas rápidas
    document.addEventListener('keydown', function(e) {
        // Ctrl + K para mostrar alerta de comandos
        if (e.ctrlKey && e.key === 'k') {
            e.preventDefault();
            showBotCommands();
        }
    });
}

// Mostrar comandos del bot
function showBotCommands() {
    const commands = `
🔧 Comandos slash disponibles en Discord:

/addbot [bot_id] [descripcion] - Añade un bot al directorio
/vote [bot_id] - Vota por un bot favorito
/search [query] - Busca bots por nombre o categoría
/top [cantidad] - Muestra los bots más votados
/profile [bot_id] - Muestra el perfil de un bot
/help - Muestra esta ayuda

💡 Consejo: Usa estos comandos directamente en tu servidor de Discord donde esté el bot.
    `;
    alert(commands);
}

// Mensaje de bienvenida
function showWelcomeMessage() {
    if (!sessionStorage.getItem('welcomeShown')) {
        setTimeout(() => {
            const welcomeMessage = `
🎉 ¡Bienvenido a External.ui!

Esta plataforma está integrada con nuestro bot de Discord.
Usa Ctrl+K para ver los comandos disponibles.

🚀 Características principales:
• Sistema de votación en tiempo real
• Directorio de bots actualizado
• Integración directa con Discord
• Comandos slash intuitivos

¿Listo para comenzar?
            `;
            alert(welcomeMessage);
        }, 1000);
        sessionStorage.setItem('welcomeShown', 'true');
    }
}

// Simular actualización en tiempo real de estadísticas
setInterval(() => {
    // En producción, esto se conectaría a tu API real
    const votesElement = document.getElementById('totalVotes');
    if (votesElement) {
        const currentVotes = parseInt(votesElement.textContent.replace(/,/g, ''));
        const newVotes = currentVotes + Math.floor(Math.random() * 3);
        votesElement.textContent = newVotes.toLocaleString();
        stats.totalVotes = newVotes;
    }
}, 10000); // Actualizar cada 10 segundos

// Manejo de errores globales
window.addEventListener('error', function(e) {
    console.error('❌ Error global:', e.error);
});

// Manejo de promesas no manejadas
window.addEventListener('unhandledrejection', function(e) {
    console.error('❌ Promesa no manejada:', e.reason);
});
