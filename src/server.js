// src/server.js

const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const path = require('path');
const { initializeSocket } = require('./socketHandler');

// --- CONFIGURACIÓN DEL SERVIDOR ---
const app = express();
const server = http.createServer(app);
const io = socketIo(server);
const PORT = process.env.PORT || 3000;
const HOST = '0.0.0.0'; // Escuchar en todas las interfaces de red

// --- MIDDLEWARE ---
app.use(express.static(path.join(__dirname, '..', 'public')));

// Ruta principal para servir la página del anfitrión
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public', 'host.html'));
});

// Ruta para servir la página del jugador
app.get('/player', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public', 'player.html'));
});

// --- INICIALIZACIÓN DE SOCKETS ---
initializeSocket(io);

// --- INICIO DEL SERVIDOR ---
server.listen(PORT, HOST, () => {
    console.log(`Servidor escuchando en http://${HOST}:${PORT}`);
    console.log("Para acceder desde este ordenador, usa: http://localhost:3000");
    console.log("Para acceder desde otro dispositivo (como tu móvil), busca la IP local de este ordenador y úsala.");
    console.log("Ejemplo en otro dispositivo: http://<IP_DEL_ORDENADOR>:3000");
});
