const { games, createGame, addPlayer, handleAnswer, removePlayer, usePowerup, sendQuestion } = require('./gameLogic');

function sanitize(str) {
    return decodeURIComponent(String(str)).replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function initializeSocket(io) {
    io.on('connection', (socket) => {
        socket.on('host-create-game', async () => {
            const { game, error } = await createGame(socket);
            if (error) {
                socket.emit('create-game-error', error);
                return;
            }
            if (game) {
                socket.join(game.pin);
                socket.emit('game-created', game.pin);
                io.to(game.hostId).emit('update-player-list', game.players);
            }
        });

        function handleRequestQuestion(pin) {
            if (games[pin] && games[pin].hostId === socket.id) {
                sendQuestion(io, pin);
            }
        }

        socket.on('host-start-game', handleRequestQuestion);
        socket.on('host-next-question', handleRequestQuestion);

        socket.on('player-join-game', (data) => {
            const { pin, name, avatar } = data;
            const sanitizedName = sanitize(name);
            const { game, error } = addPlayer(pin, socket, sanitizedName, avatar);
            if (error) {
                socket.emit('join-error', error);
                return;
            }
            socket.join(pin);
            socket.emit('join-success');
            io.to(game.hostId).emit('update-player-list', game.players);
        });

        socket.on('player-answer', (data) => {
            const { pin, answerIndex } = data;
            const game = games[pin];
            if (!game) return;

            const result = handleAnswer(pin, socket, answerIndex);

            if (result) {
                socket.emit('answer-result', result);
                io.to(game.hostId).emit('player-answer-feedback', {
                    playerName: game.players[socket.id].name,
                    correct: result.correct,
                    pointsGained: result.pointsGained
                });
                io.to(game.hostId).emit('player-responded', {
                    playerName: game.players[socket.id].name,
                    answerIndex: answerIndex
                });
            }
        });

        socket.on('player-use-powerup', (data) => {
            const { pin, powerupType } = data;
            usePowerup(pin, socket, powerupType, io);
        });

        socket.on('sendMessage', (message) => {
            const sanitizedMessage = sanitize(message);
            // Find the game the player is in
            const pin = Object.keys(games).find(pin => games[pin] && games[pin].players[socket.id]);
            if (pin) {
                const player = games[pin].players[socket.id];
                if (player) {
                    io.to(pin).emit('newMessage', {
                        name: player.name,
                        message: sanitizedMessage
                    });
                }
            }
        });

        socket.on('disconnect', () => {
            const game = removePlayer(socket);
            if (game) {
                if (game.hostId !== socket.id) {
                    io.to(game.hostId).emit('update-player-list', game.players);
                } else {
                    io.to(game.pin).emit('game-cancelled');
                }
            }
        });
    });
}

module.exports = { initializeSocket };