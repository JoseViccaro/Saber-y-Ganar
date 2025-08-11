document.addEventListener('DOMContentLoaded', () => {
    const socket = io();
    let gamePin;
    let timerInterval;
    const screens = { 
        setup: document.getElementById('setup-screen'), 
        lobby: document.getElementById('lobby-screen'), 
        quiz: document.getElementById('quiz-screen'), 
        questionSummary: document.getElementById('question-summary-screen'),
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
    const notificationSound = document.getElementById('notification-sound');

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

    document.getElementById('create-game-btn').addEventListener('click', () => {
        unlockAudio(hostCorrectSound, hostIncorrectSound, lobbyMusic, timerTickSound, backgroundMusic);
        socket.emit('host-create-game', { hostName: 'Anfitrión' });
    });

    document.getElementById('start-game-btn').addEventListener('click', () => {
        socket.emit('host-start-game', gamePin);
    });

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
        showScreen('lobby', screens);
        backgroundMusic.play();
    });

    socket.on('update-player-list', (players) => {
        const list = document.getElementById('players-list');
        list.innerHTML = '';
        Object.values(players).forEach(p => {
            const playerTag = document.createElement('li');
            playerTag.className = 'player-tag';
            const avatarImg = document.createElement('img');
            avatarImg.src = p.avatar;
            avatarImg.classList.add('player-avatar');
            playerTag.appendChild(avatarImg);
            const playerName = document.createElement('span');
            playerName.textContent = p.name;
            playerTag.appendChild(playerName);
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

        if (data.isLightningRound) {
            document.body.classList.add('ronda-relampago');
            document.getElementById('question-counter').textContent = `¡RONDA RELÁMPAGO! | Pregunta ${data.questionIndex + 1} / ${data.totalQuestions}`;
        } else {
            document.body.classList.remove('ronda-relampago');
            document.getElementById('question-counter').textContent = `Pregunta ${data.questionIndex + 1} / ${data.totalQuestions}`;
        }

        document.getElementById('question').textContent = data.question;
        const questionImageContainer = document.getElementById('question-image-container');
        if (data.image) {
            questionImageContainer.innerHTML = `<img src="${data.image}" alt="Question Image">`;
            questionImageContainer.classList.remove('hidden');
        } else {
            questionImageContainer.classList.add('hidden');
        }
        playersRespondedList.innerHTML = '';
        correctPlayersList.innerHTML = '';

        answerCountElements.forEach(el => el.textContent = '0');

        const hostAnswerGrid = document.getElementById('host-answer-grid');
        hostAnswerGrid.innerHTML = '';
        data.answers.forEach((answer, index) => {
            const answerDiv = document.createElement('div');
            answerDiv.className = 'host-answer-option';
            answerDiv.innerHTML = `<span class="answer-label">${String.fromCharCode(65 + index)}</span><span class="answer-text">${answer}</span>`;
            hostAnswerGrid.appendChild(answerDiv);
        });

        if (data.type === 'true_false') {
            document.getElementById('answer-counts-container').children[2].classList.add('hidden');
            document.getElementById('answer-counts-container').children[3].classList.add('hidden');
        } else {
            document.getElementById('answer-counts-container').children[2].classList.remove('hidden');
            document.getElementById('answer-counts-container').children[3].classList.remove('hidden');
        }

        showScreen('quiz', screens);
    });

    socket.on('ronda-relampago-announce', () => {
        showEpicRondaRelampagoAnnouncement();
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
        showScreen('questionSummary', screens);
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
        showScreen('leaderboard', screens);
        showLeaderboardBtn.classList.add('hidden');
        nextQuestionBtn.classList.remove('hidden');
    });

    socket.on('game-cancelled', () => { alert("El anfitrión ha cancelado el juego."); location.reload(); });

    socket.on('error-creating-game', (message) => {
        alert(`Error al crear el juego: ${message}`);
    });

    showScreen('setup', screens);

    // Chat logic
    const hostMessages = document.getElementById('host-messages');

    socket.on('newMessage', (data) => {
        const item = document.createElement('li');
        item.textContent = `${data.name}: ${data.message}`;
        hostMessages.appendChild(item);
        hostMessages.scrollTop = hostMessages.scrollHeight;
        notificationSound.play().catch(e => console.log("El navegador bloqueó la reproducción de sonido."));
    });

    const chatContainer = document.getElementById('chat-container');
    const toggleChatBtn = document.getElementById('toggle-chat-btn');

    toggleChatBtn.addEventListener('click', () => {
        chatContainer.classList.toggle('minimized');
        if (chatContainer.classList.contains('minimized')) {
            toggleChatBtn.textContent = '+';
        } else {
            toggleChatBtn.textContent = '-';
        }
    });
});