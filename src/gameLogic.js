const MASTER_QUESTIONS = require('../saber_y_ganar.json');
let availableQuestions = [...MASTER_QUESTIONS];

let games = {};
let disconnectedPlayers = {};

// Constants for AFK logic
const PLAYER_DISCONNECT_TIMEOUT = 30 * 1000; // 30 seconds

// Constants for game logic
const TIME_LIMIT_SHORT = 6; // Time limit for questions 19-24
const TIME_LIMIT_LONG = 12; // Time limit for other questions
const SPECIAL_QUESTION_START = 19;
const SPECIAL_QUESTION_END = 24;
const RONDA_RELAMPAGO_ANNOUNCEMENT_DURATION = 3000; // 3 seconds for announcement

// --- FUNCIÓN PARA BARAJAR ---
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function getGameQuestions() {
    if (availableQuestions.length < 30) {
        availableQuestions = [...MASTER_QUESTIONS];
        console.log("Se han agotado las preguntas. Reiniciando la lista.");
    }
    const shuffledQuestions = shuffle([...availableQuestions]);
    const gameQuestions = shuffledQuestions.slice(0, 30);
    availableQuestions = availableQuestions.filter(q => !gameQuestions.includes(q));

    // Shuffle answers for each question and update correct index
    gameQuestions.forEach(question => {
        const originalCorrectAnswerText = question.answers[question.correct];
        const shuffledAnswers = shuffle([...question.answers]);
        question.answers = shuffledAnswers;
        question.correct = shuffledAnswers.findIndex(answer => answer === originalCorrectAnswerText);
    });

    return gameQuestions;
}

function createGame(socket) {
    console.log("createGame function called.");
    try {
        const gameQuestions = getGameQuestions();
        if (!gameQuestions || gameQuestions.length === 0) {
            console.error("No questions available to create a game.");
            return { error: 'No hay preguntas disponibles para crear un juego. Por favor, verifica el archivo saber_y_ganar.json' };
        }
        let pin = Math.floor(100000 + Math.random() * 900000).toString();
        games[pin] = { pin, hostId: socket.id, players: {}, state: 'waiting', currentQuestion: -1, questions: gameQuestions, timer: null };
        console.log(`Nuevo juego creado con PIN: ${pin}. Preguntas restantes: ${availableQuestions.length}`);
        return { game: games[pin] };
    } catch (error) {
        console.error("Error al crear el juego:", error.message);
        return { error: 'Error interno al crear el juego. Inténtalo de nuevo.' };
    }
}

function addPlayer(pin, socket, name, avatar, playerId) {
    const game = games[pin];
    if (!game) {
        return { error: 'PIN no válido.' };
    }

    // Check if player is reconnecting
    let player = null;
    if (playerId) {
        for (const oldSocketId in disconnectedPlayers) {
            if (disconnectedPlayers[oldSocketId].playerId === playerId) {
                player = disconnectedPlayers[oldSocketId];
                clearTimeout(player.disconnectionTimeout); // Clear the pending removal
                delete disconnectedPlayers[oldSocketId]; // Remove from disconnected list
                break;
            }
        }
    }

    if (player) {
        // Reconnecting player
        player.socketId = socket.id; // Update with new socket ID
        player.disconnected = false;
        game.players[socket.id] = player; // Add back to active players with new socket.id
        console.log(`Player ${player.name} reconnected to game ${pin}.`);

        // Send current game state to reconnected player
        let currentQuestionData = null;
        let timeLeft = 0;
        if (game.state === 'question' && game.currentQuestion >= 0) {
            const question = game.questions[game.currentQuestion];
            const isLightningRound = game.currentQuestion >= (SPECIAL_QUESTION_START - 1) && game.currentQuestion <= (SPECIAL_QUESTION_END - 1);
            currentQuestionData = {
                question: question.question,
                answers: question.answers,
                questionIndex: game.currentQuestion,
                totalQuestions: game.questions.length,
                image: question.image || null,
                type: question.type || 'multiple_choice',
                isLightningRound: isLightningRound,
                powerups: player.powerups // Send player's powerups
            };
            timeLeft = Math.max(0, game.timeLimit - game.timeElapsed);
        }

        return { game, player, reconnected: true, currentQuestionData, timeLeft };
    } else if (game.state === 'waiting') {
        // New player joining
        const newPlayerId = playerId || `player_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`; // Generate if not provided
        game.players[socket.id] = {
            playerId: newPlayerId,
            name,
            avatar,
            score: 0,
            streak: 0,
            powerups: { fiftyFifty: true, doublePoints: true, skipQuestion: true },
            extraTimeActive: false,
            doublePointsActive: false,
            lastAnswerIndex: undefined,
            disconnected: false
        };
        console.log(`New player ${name} joined game ${pin}. Player ID: ${newPlayerId}`);
        return { game, player: game.players[socket.id] };
    } else {
        return { error: 'El juego ya empezó.' };
    }
}

function handleAnswer(pin, socket, answerIndex) {
    const game = games[pin];
    const player = game ? game.players[socket.id] : null;

    if (!game || !player || game.state !== 'question') return {};

    const timeIsUp = game.timeElapsed > game.timeLimit;
    if (timeIsUp) {
        if (player.extraTimeActive && (game.timeElapsed <= game.timeLimit + 5)) {
            player.extraTimeActive = false;
        }
        else {
            return {};
        }
    }

    if (player.lastAnswerIndex !== undefined) return {};

    const question = game.questions[game.currentQuestion];
    const isCorrect = answerIndex === question.correct;

    player.lastAnswerIndex = answerIndex;
    game.answerCounts[answerIndex]++;

    let pointsGained = 0;
    if (isCorrect) {
        // --- SCORING LOGIC ---
        // 500 base points for a correct answer
        // Time bonus: up to 500 points based on how quickly the answer is submitted
        const timeBonus = Math.max(0, Math.round((game.timeLimit - game.timeElapsed) / game.timeLimit * 500));
        // Streak bonus: 50 points for each consecutive correct answer
        const streakBonus = player.streak * 50;
        pointsGained = 500 + timeBonus + streakBonus;
        // Double points powerup
        if (player.doublePointsActive) {
            pointsGained *= 2;
            player.doublePointsActive = false; // Reset after use
        }
        player.score += pointsGained;
        player.streak++;
        // Streak milestone bonus: 300 points for every 3 consecutive correct answers
        if (player.streak > 0 && player.streak % 3 === 0) {
            player.score += 300;
        }
    }
    else {
        // Penalty for incorrect answer
        if (player.score > 0) {
            const pointsLost = - (250 + Math.round((game.timeElapsed / game.timeLimit) * 250));
            pointsGained = pointsLost;
            player.score += pointsGained;
        }
        player.streak = 0;
    }

    return {
        correct: isCorrect,
        score: player.score,
        streak: player.streak,
        pointsGained,
        correctAnswerIndex: question.correct
    };
}

function usePowerup(pin, socket, powerupType) {
    const game = games[pin];
    if (!game || !game.players[socket.id] || game.state !== 'question') return;

    const player = game.players[socket.id];
    if (powerupType === 'fiftyFifty' && player.powerups.fiftyFifty) {
        player.powerups.fiftyFifty = false;
        const question = game.questions[game.currentQuestion];
        if (question.type === 'true_false') {
            const incorrectAnswer = [0, 1].filter(i => i !== question.correct);
            socket.emit('powerup-fifty-fifty-result', incorrectAnswer);
        }
        else {
            const incorrectAnswers = [0, 1, 2, 3].filter(i => i !== question.correct);
            const shuffledIncorrect = shuffle(incorrectAnswers);
            const answersToRemove = shuffledIncorrect.slice(0, 2);
            socket.emit('powerup-fifty-fifty-result', answersToRemove);
        }
    }
    else if (powerupType === 'doublePoints' && player.powerups.doublePoints) {
        player.powerups.doublePoints = false;
        player.doublePointsActive = true;
        socket.emit('powerup-double-points-result');
    }
    else if (powerupType === 'skipQuestion' && player.powerups.skipQuestion) {
        player.powerups.skipQuestion = false;
        player.lastAnswerIndex = -1; // Mark as skipped
        socket.emit('powerup-skip-question-result');
    }
}

function removePlayer(socket) {
    for (const pin in games) {
        const game = games[pin];
        if (game.players[socket.id]) {
            const player = game.players[socket.id];
            player.disconnected = true;
            player.socketId = socket.id; // Store the last socket ID
            player.gamePin = pin; // Store the game PIN
            disconnectedPlayers[socket.id] = player; // Store in disconnected players
            delete game.players[socket.id]; // Remove from active players

            player.disconnectionTimeout = setTimeout(() => {
                // If player doesn't reconnect within timeout, remove them permanently
                if (disconnectedPlayers[socket.id] && disconnectedPlayers[socket.id].playerId === player.playerId) {
                    console.log(`Player ${player.name} (ID: ${player.playerId}) permanently removed due to timeout.`);
                    delete disconnectedPlayers[socket.id];
                    // Optionally, notify host that player has left permanently
                    // io.to(game.hostId).emit('player-permanently-removed', player.playerId);
                }
            }, PLAYER_DISCONNECT_TIMEOUT);

            console.log(`Player ${player.name} disconnected from game ${pin}. Timeout set.`);
            return game;
        }
        if (game.hostId === socket.id) {
            clearTimeout(game.timer);
            const gameToDelete = game;
            delete games[pin];
            // Also clear any disconnected players for this game
            for (const oldSocketId in disconnectedPlayers) {
                if (disconnectedPlayers[oldSocketId].gamePin === pin) {
                    clearTimeout(disconnectedPlayers[oldSocketId].disconnectionTimeout);
                    delete disconnectedPlayers[oldSocketId];
                }
            }
            console.log(`Host disconnected. Game ${pin} cancelled.`);
            return gameToDelete;
        }
    }
}

function sendQuestion(io, pin) {
    const game = games[pin];
    if (!game) return;

    clearTimeout(game.timer);
    clearInterval(game.timerInterval);

    for (const playerId in game.players) {
        const player = game.players[playerId];
        player.lastAnswerIndex = undefined; // Reset for the new question
        player.doublePointsActive = false; // Reset for the new question
    }

    game.currentQuestion++;
    game.answerCounts = [0, 0, 0, 0];
    game.timeElapsed = 0;

    // Check for Ronda Relampago announcement
    if (game.currentQuestion === SPECIAL_QUESTION_START -1) { // -1 because currentQuestion is already incremented
        io.to(pin).emit('ronda-relampago-announce');
        setTimeout(() => {
            sendActualQuestion(io, pin);
        }, RONDA_RELAMPAGO_ANNOUNCEMENT_DURATION);
    } else {
        sendActualQuestion(io, pin);
    }
}

function sendActualQuestion(io, pin) {
    const game = games[pin];
    if (!game) return;

    if (game.currentQuestion < game.questions.length) {
        game.state = 'question';
        const question = game.questions[game.currentQuestion];
        const isLightningRound = game.currentQuestion >= (SPECIAL_QUESTION_START - 1) && game.currentQuestion <= (SPECIAL_QUESTION_END - 1);
        const basePayload = {
            question: question.question,
            answers: question.answers,
            questionIndex: game.currentQuestion,
            totalQuestions: game.questions.length,
            image: question.image || null,
            type: question.type || 'multiple_choice',
            isLightningRound: isLightningRound
        };
        game.timeLimit = isLightningRound ? TIME_LIMIT_SHORT : TIME_LIMIT_LONG;

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

    }
    else {
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

module.exports = {
    games,
    createGame,
    addPlayer,
    handleAnswer,
    removePlayer,
    usePowerup,
    sendQuestion
};