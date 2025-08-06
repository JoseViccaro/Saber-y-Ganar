const { games, createGame, addPlayer, handleAnswer, removePlayer, usePowerup, shuffle, setSendQuestionRef } = require('./gameLogic');

function sanitize(str) {
    return decodeURIComponent(String(str)).replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

function initializeSocket(io) {
    setSendQuestionRef(sendQuestion); // Pass sendQuestion to gameLogic
    io.on('connection', (socket) => {
        socket.on('host-create-game', async () => {
            const game = await createGame(socket);
            if (game) {
                socket.join(game.pin);
                socket.emit('game-created', game.pin);
            }
        });

        socket.on('host-start-game', (pin) => {
            if (games[pin] && games[pin].hostId === socket.id) {
                sendQuestion(io, pin);
            }
        });

        socket.on('host-next-question', (pin) => {
            if (games[pin] && games[pin].hostId === socket.id) {
                sendQuestion(io, pin);
            }
        });

        socket.on('player-join-game', (data) => {
            const { pin, name } = data;
            const sanitizedName = sanitize(name);
            const { game, error } = addPlayer(pin, socket, sanitizedName);
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

function sendQuestion(io, pin) {
    const game = games[pin];
    if (!game) return;

    clearTimeout(game.timer);
    clearInterval(game.timerInterval);

    for (const playerId in game.players) {
        const player = game.players[playerId];
        delete player.lastAnswerIndex;
        player.doublePointsActive = false; // Reset for the new question
    }

    game.currentQuestion++;
    game.answerCounts = [0, 0, 0, 0];
    game.timeElapsed = 0;

    sendActualQuestion(io, pin);
}

function sendActualQuestion(io, pin) {
    const game = games[pin];
    if (!game) return;

    if (game.currentQuestion < game.questions.length) {
        game.state = 'question';
        const question = game.questions[game.currentQuestion];
        const basePayload = {
            question: question.question,
            answers: question.answers,
            questionIndex: game.currentQuestion,
            totalQuestions: game.questions.length,
            image: question.image || null,
            type: question.type || 'multiple_choice'
        };
        game.timeLimit = (game.currentQuestion >= 19 && game.currentQuestion <= 24) ? 6 : 12;

        io.to(game.hostId).emit('new-question', basePayload);

        for (const playerId in game.players) {
            const player = game.players[playerId];
            const playerPayload = { ...basePayload, powerups: player.powerups };
            io.to(playerId).emit('new-question', playerPayload);
        }

        game.timerInterval = setInterval(() => {
            game.timeElapsed += 0.1;
            const timeLeft = Math.max(0, game.timeLimit - game.timeElapsed);
            io.to(pin).emit('update-timer', timeLeft.toFixed(1), game.timeLimit);
        }, 100);

        game.timer = setTimeout(() => {
            clearInterval(game.timerInterval);
            showQuestionSummary(io, pin);
        }, (game.timeLimit + 2) * 1000);

    } else {
        game.state = 'finished';
        const finalLeaderboard = Object.values(game.players).sort((a, b) => b.score - a.score);
        const winnerName = finalLeaderboard.length > 0 ? finalLeaderboard[0].name : 'Nadie';

        io.to(game.hostId).emit('game-over', finalLeaderboard);
        for (const playerId in game.players) {
            if (playerId !== game.hostId) {
                io.to(playerId).emit('game-over', winnerName);
            }
        }
    }
}

function showQuestionSummary(io, pin) {
    const game = games[pin];
    if (!game) return;

    game.state = 'summary';
    const currentQuestion = game.questions[game.currentQuestion];
    const summaryData = {
        questionText: currentQuestion.question,
        correctAnswer: currentQuestion.answers[currentQuestion.correct],
        correctAnswerIndex: currentQuestion.correct,
        answerCounts: game.answerCounts
    };
    io.to(game.hostId).emit('show-question-summary', summaryData);

    setTimeout(() => showLeaderboard(io, pin), 2000);
}

function showLeaderboard(io, pin) {
    const game = games[pin];
    if (game) {
        game.state = 'leaderboard';
        io.to(pin).emit('show-leaderboard', game.players);
        setTimeout(() => sendQuestion(io, pin), 2000);
    }
}

module.exports = { initializeSocket };