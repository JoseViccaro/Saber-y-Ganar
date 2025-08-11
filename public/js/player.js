document.addEventListener('DOMContentLoaded', () => {
    const socket = io();
    let gamePin;
    let timerInterval;
    let currentScore = 0;
    let answerStreak = 0;
    let lastAnswerIndex; // Para guardar la última respuesta del jugador
    let rondaRelampagoAnunciada = false; // Flag to show announcement only once
    let selectedAvatar;

    // Constants
    const AVATAR_COUNT = 6;
    const RONDA_RELAMPAGO_QUESTION_INDEX = 18;
    const RONDA_RELAMPAGO_ANNOUNCEMENT_DURATION = 3000;
    const FEEDBACK_DISPLAY_DURATION = 2000;
    const READY_GO_DISPLAY_DURATION = 1000;
    const BONUS_TOAST_DISPLAY_DURATION = 3000;

    const screens = {
        join: document.getElementById('join-screen'),
        waiting: document.getElementById('waiting-screen'),
        readyGo: document.getElementById('ready-go-screen'),
        question: document.getElementById('question-screen'),
        end: document.getElementById('end-game-screen'),
        feedback: document.getElementById('feedback-screen'),
        rondaRelampago: document.getElementById('ronda-relampago-announcement'),
        winnerAnnouncement: document.getElementById('winner-announcement'),
    };
    const correctSound = document.getElementById('correct-sound');
    const incorrectSound = document.getElementById('incorrect-sound');
    const notificationSound = document.getElementById('notification-sound');
    
    const joinButton = document.getElementById('join-btn');
    const feedbackText = document.getElementById('feedback-text');
    const questionProgress = document.getElementById('question-progress');
    const playerTimer = document.getElementById('player-timer');
    const playerTimerBar = document.getElementById('player-timer-bar');
    const readyGoText = document.getElementById('ready-go-text');
    const avatarSelection = document.getElementById('avatar-selection');
    
    const playerScoreElement = document.getElementById('player-score');
    const answerStreakElement = document.getElementById('answer-streak');
    const pointsGainedElement = document.getElementById('points-gained');
    const powerupFiftyFiftyBtn = document.getElementById('powerup-fifty-fifty');
    const powerupDoublePointsBtn = document.getElementById('powerup-double-points');
    const powerupSkipQuestionBtn = document.getElementById('powerup-skip-question');
    const confettiCanvas = document.getElementById('confetti-canvas');
    const customConfetti = confetti.create(confettiCanvas, { resize: true });

    function populateAvatarSelection() {
        for (let i = 1; i <= AVATAR_COUNT; i++) {
            const avatarImg = document.createElement('img');
            avatarImg.src = `/avatars/avatar${i}.svg`;
            avatarImg.classList.add('avatar-option');
            avatarImg.dataset.avatarId = i;
            avatarImg.addEventListener('click', () => {
                document.querySelectorAll('.avatar-option').forEach(img => img.classList.remove('selected'));
                avatarImg.classList.add('selected');
                selectedAvatar = `/avatars/avatar${i}.svg`;
            });
            avatarSelection.appendChild(avatarImg);
        }
    }

    function triggerConfetti() {
        customConfetti({
            particleCount: 150,
            spread: 180,
            origin: { y: 0.6 },
            colors: ['#ff4500', '#ff6347', '#ffd700', '#32cd32', '#1e90ff']
        });
    }

    

    joinButton.addEventListener('click', () => {
        // --- SOLUCIÓN DE AUDIO MEJORADA ---
        // Se interactúa con los sonidos en la primera acción del usuario.
        correctSound.play().then(() => correctSound.pause()).catch(() => {});
        incorrectSound.play().then(() => incorrectSound.pause()).catch(() => {});
        notificationSound.play().then(() => notificationSound.pause()).catch(() => {});

        gamePin = document.getElementById('pin-input').value;
        const name = document.getElementById('name-input').value.trim();
        if (gamePin && name && selectedAvatar) {
            console.log(`Intentando unirse al juego con PIN: ${gamePin}, nombre: ${name} y avatar: ${selectedAvatar}`);
            socket.emit('player-join-game', { pin: gamePin, name: name, avatar: selectedAvatar });
        } else {
            document.getElementById('error-message').textContent = 'Debes introducir un PIN, un nombre y seleccionar un avatar.';
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

    powerupSkipQuestionBtn.addEventListener('click', () => {
        socket.emit('player-use-powerup', { pin: gamePin, powerupType: 'skipQuestion' });
        powerupSkipQuestionBtn.disabled = true;
    });

     

    socket.on('join-success', () => {
        console.log('¡Unión exitosa!');
        showScreen('waiting', screens);
    });
    socket.on('join-error', (message) => {
        console.error(`Error al unirse: ${message}`);
        document.getElementById('error-message').textContent = message;
    });

    socket.on('new-question', (data) => {
        clearInterval(timerInterval);
        playerTimer.textContent = '';
        playerTimerBar.style.transform = 'scaleY(1)';

        if (data.isLightningRound) {
            document.body.classList.add('ronda-relampago');
            questionProgress.textContent = `¡RONDA RELÁMPAGO! | Pregunta ${data.questionIndex + 1} de ${data.totalQuestions}`;
        } else {
            document.body.classList.remove('ronda-relampago');
            questionProgress.textContent = `Pregunta ${data.questionIndex + 1} de ${data.totalQuestions}`;
        }

        document.getElementById('player-question-text').textContent = data.question;

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
            powerupSkipQuestionBtn.disabled = !data.powerups.skipQuestion;
        }

        showScreen('question', screens);
    });

    socket.on('ronda-relampago-announce', () => {
        showEpicRondaRelampagoAnnouncement();
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
            triggerConfetti(); // ¡Lanzar confeti!
            feedbackText.textContent = '¡Correcto!';
            pointsGainedElement.textContent = `+${pointsGained}`;
            pointsGainedElement.classList.remove('hidden');
            screens.feedback.classList.add('correct');
        } else {
            incorrectSound.play().catch(e => console.log("El navegador bloqueó la reproducción de sonido."));
            if (selectedButton) selectedButton.classList.add('incorrect');
            window.triggerIncorrectAnimation(); // Lanza la animación de "X"
            feedbackText.textContent = '¡Incorrecto!';
            pointsGainedElement.textContent = `${pointsGained}`;
            pointsGainedElement.classList.remove('hidden');
            screens.feedback.classList.add('incorrect');
        }

        showScreen('feedback', screens);
        setTimeout(() => {
            screens.feedback.classList.add('hidden');
            screens.feedback.classList.remove('correct', 'incorrect');
            showScreen('waiting', screens); // Go back to waiting screen after feedback
        }, FEEDBACK_DISPLAY_DURATION);

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
                }, BONUS_TOAST_DISPLAY_DURATION);
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

    socket.on('powerup-skip-question-result', () => {
        powerupSkipQuestionBtn.disabled = true;
        document.querySelectorAll('.answer-btn').forEach(btn => btn.disabled = true); // Disable answer buttons
        feedbackText.textContent = '¡Pregunta Saltada!';
        pointsGainedElement.classList.add('hidden');
        screens.feedback.classList.remove('correct', 'incorrect'); // Ensure no color from previous feedback
        showScreen('feedback', screens);
        setTimeout(() => {
            screens.feedback.classList.add('hidden');
            showScreen('waiting', screens); // Go back to waiting screen after feedback
        }, FEEDBACK_DISPLAY_DURATION);
    });

     

    socket.on('show-leaderboard', () => {
        clearInterval(timerInterval);
        showScreen('waiting', screens);
    });

    socket.on('game-over', (winnerName) => {
        document.getElementById('winner-name').textContent = winnerName;
        showScreen('winnerAnnouncement', screens);
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
    });

    socket.on('ready-go', (message) => {
        readyGoText.textContent = message;
        showScreen('readyGo', screens);
        setTimeout(() => {
            screens.readyGo.classList.add('hidden');
        }, READY_GO_DISPLAY_DURATION);
    });

    

    // --- INICIALIZACIÓN ---
    populateAvatarSelection();
    showScreen('join', screens);

    // Chat logic
    const chatContainer = document.getElementById('chat-container');
    const messages = document.getElementById('messages');
    const chatForm = document.getElementById('chat-form');
    const messageInput = document.getElementById('message-input');
    const toggleChatBtn = document.getElementById('toggle-chat-btn');

    chatForm.addEventListener('submit', (e) => {
        e.preventDefault();
        if (messageInput.value) {
            socket.emit('sendMessage', messageInput.value);
            messageInput.value = '';
        }
    });

    socket.on('newMessage', (data) => {
        const item = document.createElement('li');
        item.textContent = `${data.name}: ${data.message}`;
        messages.appendChild(item);
        messages.scrollTop = messages.scrollHeight;
        notificationSound.play().catch(e => console.log("El navegador bloqueó la reproducción de sonido."));
    });

    toggleChatBtn.addEventListener('click', () => {
        chatContainer.classList.toggle('minimized');
        if (chatContainer.classList.contains('minimized')) {
            toggleChatBtn.textContent = '+';
        } else {
            toggleChatBtn.textContent = '-';
        }
    });
});