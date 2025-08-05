document.addEventListener('DOMContentLoaded', () => {
    const socket = io();
    let gamePin;
    let timerInterval;
    let currentScore = 0;
    let answerStreak = 0;
    let lastAnswerIndex; // Para guardar la última respuesta del jugador

    const screens = {
        join: document.getElementById('join-screen'),
        waiting: document.getElementById('waiting-screen'),
        readyGo: document.getElementById('ready-go-screen'),
        question: document.getElementById('question-screen'),
        end: document.getElementById('end-game-screen'),
        feedback: document.getElementById('feedback-screen'),
        rondaRelampago: document.getElementById('ronda-relampago-announcement'),
    };
    const correctSound = document.getElementById('correct-sound');
    const incorrectSound = document.getElementById('incorrect-sound');
    const timerTickSound = document.getElementById('timer-tick-sound');
    const joinButton = document.getElementById('join-btn');
    const feedbackText = document.getElementById('feedback-text');
    const questionProgress = document.getElementById('question-progress');
    const playerTimer = document.getElementById('player-timer');
    const playerTimerBar = document.getElementById('player-timer-bar');
    const readyGoText = document.getElementById('ready-go-text');
    
    const playerScoreElement = document.getElementById('player-score');
    const answerStreakElement = document.getElementById('answer-streak');
    const pointsGainedElement = document.getElementById('points-gained');
    const powerupFiftyFiftyBtn = document.getElementById('powerup-fifty-fifty');
    const powerupDoublePointsBtn = document.getElementById('powerup-double-points');
     

    function showScreen(screenName) {
        for (let key in screens) {
            screens[key].classList.add('hidden');
            if (key === 'feedback') {
                screens[key].classList.remove('show');
            }
        }
        if (screens[screenName]) {
            screens[screenName].classList.remove('hidden');
        }
    }

    

    joinButton.addEventListener('click', () => {
        // --- SOLUCIÓN DE AUDIO MEJORADA ---
        // Se interactúa con los sonidos en la primera acción del usuario.
        correctSound.play().then(() => correctSound.pause()).catch(() => {});
        incorrectSound.play().then(() => incorrectSound.pause()).catch(() => {});
        timerTickSound.play().then(() => timerTickSound.pause()).catch(() => {});

        gamePin = document.getElementById('pin-input').value;
        const name = document.getElementById('name-input').value.trim();
        if (gamePin && name) {
            socket.emit('player-join-game', { pin: gamePin, name: name });
        } else {
            document.getElementById('error-message').textContent = 'Debes introducir un PIN y un nombre.';
        }
    });

    powerupFiftyFiftyBtn.addEventListener('click', () => {
        socket.emit('player-use-powerup', { pin: gamePin, powerupType: 'fiftyFifty' });
        powerupFiftyFiftyBtn.disabled = true;
    });

    powerupDoublePointsBtn.addEventListener('click', () => {
        socket.emit('player-use-powerup', { pin: gamePin, powerupType: 'doublePoints' });
        powerupDoublePointsBtn.disabled = true;
    });

     

    socket.on('join-success', () => showScreen('waiting'));
    socket.on('join-error', (message) => document.getElementById('error-message').textContent = message);

    socket.on('new-question', (data) => {
        clearInterval(timerInterval);
        playerTimer.textContent = '';
        playerTimerBar.style.transform = 'scaleY(1)';

        document.getElementById('player-question-text').textContent = data.question;
        questionProgress.textContent = `Pregunta ${data.questionIndex + 1} de ${data.totalQuestions}`;

        answerStreakElement.classList.add('hidden');

        const answerGrid = document.getElementById('answer-grid');
        answerGrid.innerHTML = '';

        // Clear previous answer buttons and powerup states
        document.querySelectorAll('.answer-btn').forEach(btn => btn.remove());

        if (data.type === 'true_false') {
            // Create True/False buttons
            const trueButton = document.createElement('button');
            trueButton.className = 'btn answer-btn true-false-btn';
            trueButton.textContent = data.answers[0];
            trueButton.addEventListener('click', () => {
                lastAnswerIndex = 0;
                document.querySelectorAll('.answer-btn').forEach(btn => btn.disabled = true);
                socket.emit('player-answer', { pin: gamePin, answerIndex: 0 });
            });
            answerGrid.appendChild(trueButton);

            const falseButton = document.createElement('button');
            falseButton.className = 'btn answer-btn true-false-btn';
            falseButton.textContent = data.answers[1];
            falseButton.addEventListener('click', () => {
                lastAnswerIndex = 1;
                document.querySelectorAll('.answer-btn').forEach(btn => btn.disabled = true);
                socket.emit('player-answer', { pin: gamePin, answerIndex: 1 });
            });
            answerGrid.appendChild(falseButton);
        } else {
            // Create multiple choice buttons
            const colors = ['red', 'blue', 'yellow', 'green'];
            data.answers.forEach((answer, index) => {
                const button = document.createElement('button');
                button.className = `btn answer-btn ${colors[index]}`;
                button.textContent = answer;
                button.addEventListener('click', () => {
                    lastAnswerIndex = index; // Guardar la respuesta seleccionada
                    document.querySelectorAll('.answer-btn').forEach(btn => btn.disabled = true);
                    socket.emit('player-answer', { pin: gamePin, answerIndex: index });
                });
                answerGrid.appendChild(button);
            });
        }

        // Enable powerup buttons if available
        if (data.powerups) {
            powerupFiftyFiftyBtn.disabled = !data.powerups.fiftyFifty;
            powerupDoublePointsBtn.disabled = !data.powerups.doublePoints;
             
        }

        // Show Ronda Relampago announcement
        if (data.questionIndex + 1 >= 20 && data.questionIndex + 1 <= 24) {
            showScreen('rondaRelampago');
            setTimeout(() => {
                showScreen('question');
            }, 3000); // Show for 3 seconds
        } else {
            showScreen('question');
        }
    });

    socket.on('answer-result', (data) => {
        clearInterval(timerInterval);
        const { correct, score, streak, pointsGained, correctAnswerIndex } = data;
        currentScore = score;
        answerStreak = streak;

        const answerButtons = document.querySelectorAll('.answer-btn');
        const selectedButton = answerButtons[lastAnswerIndex];

        // Marcar la respuesta correcta siempre
        answerButtons[correctAnswerIndex].classList.add('correct');

        if (correct) {
            correctSound.play().catch(e => console.log("El navegador bloqueó la reproducción de sonido."));
            if (selectedButton) selectedButton.classList.add('correct');
            
        } else {
            incorrectSound.play().catch(e => console.log("El navegador bloqueó la reproducción de sonido."));
            if (selectedButton) selectedButton.classList.add('incorrect');
            window.triggerIncorrectAnimation(); // Lanza la animación de "X"
        }

        playerScoreElement.textContent = `Puntos: ${currentScore}`;
        if (streak > 1) {
            answerStreakElement.textContent = `¡Racha: ${streak}!`;
            answerStreakElement.classList.remove('hidden');
            if (streak > 0 && streak % 3 === 0) {
                const streakBonusEl = document.createElement('div');
                streakBonusEl.className = 'bonus-toast';
                streakBonusEl.textContent = '¡Bonificación por racha! +300 puntos';
                document.body.appendChild(streakBonusEl);
                setTimeout(() => {
                    streakBonusEl.remove();
                }, 3000);
            }
        } else {
            answerStreakElement.classList.add('hidden');
        }
    });

    socket.on('powerup-fifty-fifty-result', (answersToRemove) => {
        const answerButtons = document.querySelectorAll('.answer-btn');
        answersToRemove.forEach(index => {
            answerButtons[index].classList.add('hidden');
        });
        powerupFiftyFiftyBtn.disabled = true; // Disable 50/50 button after use
    });

    socket.on('powerup-double-points-result', () => {
        powerupDoublePointsBtn.disabled = true; // Disable 2x Points button after use
    });

     

    socket.on('show-leaderboard', () => {
        clearInterval(timerInterval);
        showScreen('waiting');
    });

    socket.on('game-over', (winnerName) => {
        showScreen('end');
    });

    socket.on('game-cancelled', () => { alert("El anfitrión ha cancelado el juego."); location.reload(); });

    socket.on('update-timer', (timeLeft, totalTime) => {
        playerTimer.textContent = timeLeft;
        const percentage = timeLeft / totalTime;
        playerTimerBar.style.transform = `scaleY(${percentage})`;

        if (percentage > 0.5) {
            playerTimerBar.style.backgroundColor = '#2ecc71'; // Verde
        } else if (percentage > 0.2) {
            playerTimerBar.style.backgroundColor = '#f1c40f'; // Amarillo
        } else {
            playerTimerBar.style.backgroundColor = '#e74c3c'; // Rojo
        }

        if (timeLeft <= 5 && timeLeft > 0) {
            timerTickSound.play();
        } else {
            timerTickSound.pause();
            timerTickSound.currentTime = 0;
        }
    });

    socket.on('ready-go', (message) => {
        readyGoText.textContent = message;
        showScreen('readyGo');
        setTimeout(() => {
            screens.readyGo.classList.add('hidden');
        }, 1000);
    });

    

    // --- INICIALIZACIÓN ---
    showScreen('join');
});