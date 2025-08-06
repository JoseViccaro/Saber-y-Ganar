const MASTER_QUESTIONS = require('../questions.json');
let availableQuestions = [...MASTER_QUESTIONS];

let games = {};

let sendQuestionRef; // Will be set by socketHandler

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
        if (gameQuestions.length === 0) {
            console.error("No questions available to create a game.");
            socket.emit('error-creating-game', 'No hay preguntas disponibles para crear un juego. Por favor, verifica el archivo questions.js');
            return null;
        }
        let pin = Math.floor(100000 + Math.random() * 900000).toString();
        games[pin] = { pin, hostId: socket.id, players: {}, state: 'waiting', currentQuestion: -1, questions: gameQuestions, timer: null };
        console.log(`Nuevo juego creado con PIN: ${pin}. Preguntas restantes: ${availableQuestions.length}`);
        return games[pin];
    } catch (error) {
        console.error("Error al crear el juego:", error.message);
        socket.emit('error-creating-game', 'Error interno al crear el juego. Inténtalo de nuevo.');
        return null;
    }
}

function addPlayer(pin, socket, name) {
    const game = games[pin];
    if (game && game.state === 'waiting') {
        game.players[socket.id] = {
            name,
            score: 0,
            streak: 0,
            powerups: { fiftyFifty: true, doublePoints: true, skipQuestion: true },
            extraTimeActive: false,
            doublePointsActive: false
        };
        return { game };
    } else {
        return { error: 'PIN no válido o el juego ya empezó.' };
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
        } else {
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
        const timeBonus = Math.max(0, Math.round((game.timeLimit - game.timeElapsed) / game.timeLimit * 500));
        const streakBonus = player.streak * 50;
        pointsGained = 500 + timeBonus + streakBonus;
        if (player.doublePointsActive) {
            pointsGained *= 2;
            player.doublePointsActive = false; // Reset after use
        }
        player.score += pointsGained;
        player.streak++;
        if (player.streak > 0 && player.streak % 3 === 0) {
            player.score += 300;
        }
    } else {
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

function usePowerup(pin, socket, powerupType, io) {
    const game = games[pin];
    if (!game || !game.players[socket.id] || game.state !== 'question') return;

    const player = game.players[socket.id];
    if (powerupType === 'fiftyFifty' && player.powerups.fiftyFifty) {
        player.powerups.fiftyFifty = false;
        const question = game.questions[game.currentQuestion];
        if (question.type === 'true_false') {
            const incorrectAnswer = [0, 1].filter(i => i !== question.correct);
            socket.emit('powerup-fifty-fifty-result', incorrectAnswer);
        } else {
            const incorrectAnswers = [0, 1, 2, 3].filter(i => i !== question.correct);
            const shuffledIncorrect = shuffle(incorrectAnswers);
            const answersToRemove = shuffledIncorrect.slice(0, 2);
            socket.emit('powerup-fifty-fifty-result', answersToRemove);
        }
    } else if (powerupType === 'doublePoints' && player.powerups.doublePoints) {
        player.powerups.doublePoints = false;
        player.doublePointsActive = true;
        socket.emit('powerup-double-points-result');
    } else if (powerupType === 'skipQuestion' && player.powerups.skipQuestion) {
        player.powerups.skipQuestion = false;
        player.lastAnswerIndex = -1; // Mark as skipped
        socket.emit('powerup-skip-question-result');
    }
}

function removePlayer(socket) {
    for (const pin in games) {
        if (games[pin].players[socket.id]) {
            delete games[pin].players[socket.id];
            return games[pin];
        }
        if (games[pin].hostId === socket.id) {
            clearTimeout(games[pin].timer);
            const gameToDelete = games[pin];
            delete games[pin];
            return gameToDelete;
        }
    }
}

module.exports = {
    games,
    createGame,
    addPlayer,
    handleAnswer,
    removePlayer,
    usePowerup,
    setSendQuestionRef: (fn) => { sendQuestionRef = fn; } // Export a setter for sendQuestion
};