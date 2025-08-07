document.addEventListener('DOMContentLoaded', () => {
    const socket = io();
    let gamePin;
    let timerInterval;
    let rondaRelampagoAnunciada = false; // Flag to show announcement only once
    const RONDA_RELAMPAGO_QUESTION_INDEX = 18; // Define constant for Ronda Relampago question index
    const screens = { 
        setup: document.getElementById('setup-screen'), 
        lobby: document.getElementById('lobby-screen'), 
        quiz: document.getElementById('quiz-screen'), 
        questionSummary: document.getElementById('question-summary-screen'), // Nueva pantalla
        leaderboard: document.getElementById('leaderboard-screen'),
        rondaRelampago: document.getElementById('ronda-relampago-announcement'),
    };

    const hostTimerCountdown = document.getElementById('host-timer-countdown');
    const playersRespondedList = document.getElementById('players-responded-list');
    const correctPlayersList = document.getElementById('correct-players-list');

    const hostCorrectSound = document.getElementById('host-correct-sound');
    const hostIncorrectSound = document.getElementById('host-incorrect-sound');
    const lobbyMusic = document.getElementById('lobby-music');
    const timerTickSound = document.getElementById('timer-tick-sound');
    const backgroundMusic = document.getElementById('background-music');

    const answerCountElements = [
        document.getElementById('answer-count-0'),
        document.getElementById('answer-count-1'),
        document.getElementById('answer-count-2'),
        document.getElementById('answer-count-3')
    ];

    const summaryQuestionText = document.getElementById('summary-question-text');
    const summaryCorrectAnswer = document.getElementById('summary-correct-answer');
    const summaryAnswerDistributionElements = [
        document.getElementById('summary-count-0'),
        document.getElementById('summary-count-1'),
        document.getElementById('summary-count-2'),
        document.getElementById('summary-count-3')
    ];
    const showLeaderboardBtn = document.getElementById('show-leaderboard-btn');
    const nextQuestionBtn = document.getElementById('next-question-btn');

    function showScreen(screenName) {
        // Hide all screens first
        for (let key in screens) {
            screens[key].classList.add('hidden');
            // Specifically handle the epic announcement visibility
            if (screens[key].classList.contains('epic-announcement')) {
                screens[key].classList.remove('visible');
            }
        }

        // Show the target screen
        screens[screenName].classList.remove('hidden');
        if (screens[screenName].classList.contains('epic-announcement')) {
            screens[screenName].classList.add('visible');
        }


        // --- Music Control ---
        const playLobby = screenName === 'lobby';
        const playBackground = ['quiz', 'questionSummary', 'leaderboard', 'rondaRelampago'].includes(screenName);

        if (playLobby) {
            lobbyMusic.volume = 0.3;
            lobbyMusic.play().catch(e => console.log("Lobby music autoplay blocked."));
        } else {
            lobbyMusic.pause();
            lobbyMusic.currentTime = 0;
        }

        if (playBackground) {
            backgroundMusic.volume = 0.2;
            backgroundMusic.play().catch(e => console.log("Background music autoplay blocked."));
        } else {
            backgroundMusic.pause();
            backgroundMusic.currentTime = 0;
        }
    }

    function unlockAudio() {
        hostCorrectSound.play().then(() => hostCorrectSound.pause()).catch(() => {});
        hostIncorrectSound.play().then(() => hostIncorrectSound.pause()).catch(() => {});
        lobbyMusic.play().then(() => lobbyMusic.pause()).catch(() => {});
        timerTickSound.play().then(() => timerTickSound.pause()).catch(() => {});
        backgroundMusic.play().then(() => backgroundMusic.pause()).catch(() => {});
    }

    document.getElementById('create-game-btn').addEventListener('click', () => {
        unlockAudio();
        socket.emit('host-create-game', { hostName: 'Anfitrión' });
    });

    

    document.getElementById('start-game-btn').addEventListener('click', () => socket.emit('host-start-game', gamePin));

    showLeaderboardBtn.addEventListener('click', () => {
        socket.emit('host-show-leaderboard', gamePin);
    });

    nextQuestionBtn.addEventListener('click', () => {
        socket.emit('host-next-question', gamePin);
    });

    socket.on('game-created', (pin) => {
        gamePin = pin;
        document.getElementById('game-pin-display').textContent = pin;
        document.getElementById('players-list').innerHTML = '';
        showScreen('lobby');
    });

    socket.on('update-player-list', (players) => {
        console.log('update-player-list event received:', players);
        const list = document.getElementById('players-list');
        list.innerHTML = '';
        Object.values(players).forEach(p => {
            const playerTag = document.createElement('li');
            playerTag.className = 'player-tag';
            playerTag.textContent = p.name;
            list.appendChild(playerTag);
        });
        const startGameBtn = document.getElementById('start-game-btn');
        if (Object.keys(players).length > 0) {
            startGameBtn.disabled = false;
            startGameBtn.classList.add('btn-start');
        } else {
            startGameBtn.disabled = true;
            startGameBtn.classList.remove('btn-start');
        }
    });

    socket.on('new-question', (data) => {
        clearInterval(timerInterval);
        hostTimerCountdown.textContent = ''; 

        document.getElementById('question-counter').textContent = `Pregunta ${data.questionIndex + 1} / ${data.totalQuestions}`;
        document.getElementById('question').textContent = data.question;
        const questionImageContainer = document.getElementById('question-image-container');
        if (data.image) {
            questionImageContainer.innerHTML = `<img src="${data.image}" alt="Question Image">`;
            questionImageContainer.classList.remove('hidden');
        } else {
            questionImageContainer.classList.add('hidden');
        }
        playersRespondedList.innerHTML = ''; // Limpiar la lista de respondedores
        correctPlayersList.innerHTML = ''; // Limpiar la lista de respuestas correctas

        // Resetear contadores de respuestas
        answerCountElements.forEach(el => el.textContent = '0');

        // Actualizar la cuadrícula de respuestas para el anfitrión
        const hostAnswerGrid = document.getElementById('host-answer-grid');
        hostAnswerGrid.innerHTML = '';
        data.answers.forEach((answer, index) => {
            const answerDiv = document.createElement('div');
            answerDiv.className = 'host-answer-option';
            answerDiv.innerHTML = `<span class="answer-label">${String.fromCharCode(65 + index)}</span><span class="answer-text">${answer}</span>`;
            hostAnswerGrid.appendChild(answerDiv);
        });

        // Ocultar o mostrar contadores de respuestas según el tipo de pregunta
        if (data.type === 'true_false') {
            document.getElementById('answer-counts-container').children[2].classList.add('hidden');
            document.getElementById('answer-counts-container').children[3].classList.add('hidden');
        } else {
            document.getElementById('answer-counts-container').children[2].classList.remove('hidden');
            document.getElementById('answer-counts-container').children[3].classList.remove('hidden');
        }

        showScreen('quiz');
    });

    socket.on('ronda-relampago-announce', () => {
        showScreen('rondaRelampago');
    });

    socket.on('update-timer', (timeLeft, totalTime) => {
        hostTimerCountdown.textContent = timeLeft;

        if (timeLeft <= 5 && timeLeft > 0) {
            timerTickSound.play();
        } else {
            timerTickSound.pause();
            timerTickSound.currentTime = 0;
        }
    });

    socket.on('player-responded', (data) => {
        const { playerName, answerIndex } = data;
        const playerRespondedTag = document.createElement('li');
        playerRespondedTag.className = 'player-responded-tag';
        playerRespondedTag.textContent = playerName;
        playersRespondedList.appendChild(playerRespondedTag);

        // Incrementar el contador de la respuesta seleccionada
        const currentCount = parseInt(answerCountElements[answerIndex].textContent);
        answerCountElements[answerIndex].textContent = currentCount + 1;
    });

    socket.on('player-answer-feedback', (data) => {
        const { playerName, correct, pointsGained } = data;
        if (correct) {
            const correctPlayerTag = document.createElement('li');
            correctPlayerTag.className = 'correct-player-tag';
            correctPlayerTag.textContent = `${playerName} +${pointsGained}`;
            correctPlayersList.appendChild(correctPlayerTag);
        }

        if (pointsGained !== 0) {
            const pointsDisplay = document.createElement('div');
            pointsDisplay.className = `points-animation ${correct ? 'correct' : 'incorrect'}`;
            pointsDisplay.textContent = `${playerName} ${pointsGained > 0 ? '+' : ''}${pointsGained}`;
            document.body.appendChild(pointsDisplay);

            setTimeout(() => {
                pointsDisplay.remove();
            }, 2000);
        }

        if (!correct) {
            const incorrectAnimation = document.getElementById('incorrect-animation-overlay');
            if (incorrectAnimation) {
                incorrectAnimation.classList.add('flash');
                setTimeout(() => {
                    incorrectAnimation.classList.remove('flash');
                }, 700);
            }
        }
    });

    socket.on('show-question-summary', (data) => {
        summaryQuestionText.textContent = data.questionText;
        summaryCorrectAnswer.textContent = data.correctAnswer;
        const totalAnswers = data.answerCounts.reduce((a, b) => a + b, 0);
        data.answerCounts.forEach((count, index) => {
            if (summaryAnswerDistributionElements[index]) {
                const percentage = totalAnswers > 0 ? (count / totalAnswers) * 100 : 0;
                const bar = summaryAnswerDistributionElements[index].parentElement.querySelector('.answer-bar');
                const text = summaryAnswerDistributionElements[index];
                if (bar && text) {
                    bar.style.width = `${percentage}%`;
                    text.textContent = count;
                }
            }
        });
        if (data.answerCounts[data.correctAnswerIndex] > 0) {
            confetti({ particleCount: 150, spread: 180 });
            hostCorrectSound.play().catch(e => console.log("El navegador bloqueó la reproducción de sonido."));
        } else {
            hostIncorrectSound.play().catch(e => console.log("El navegador bloqueó la reproducción de sonido."));
        }
        showScreen('questionSummary');
        showLeaderboardBtn.classList.remove('hidden');
        nextQuestionBtn.classList.add('hidden');
    });

    socket.on('show-leaderboard', (players) => {
        clearInterval(timerInterval);
        const playerArray = Object.values(players).sort((a, b) => b.score - a.score);
        let leaderboardHTML = '<ol>';
        playerArray.slice(0, 5).forEach((p, i) => { leaderboardHTML += `<li><span>#${i + 1} ${p.name}</span> <span>${p.score} pts</span></li>`; });
        leaderboardHTML += '</ol>';
        document.getElementById('leaderboard').innerHTML = leaderboardHTML;
        showScreen('leaderboard');
        showLeaderboardBtn.classList.add('hidden');
        nextQuestionBtn.classList.remove('hidden');
    });

    

    socket.on('game-cancelled', () => { alert("El anfitrión ha cancelado el juego."); location.reload(); });

    

    socket.on('error-creating-game', (message) => {
        alert(`Error al crear el juego: ${message}`);
    });

    // --- INICIALIZACIÓN ---
    showScreen('setup');
});