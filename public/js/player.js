'use strict';

document.addEventListener('DOMContentLoaded', function () {
    var socket = io();
    var gamePin;
    var timerInterval;
    var currentScore = 0;
    var lastAnswerIndex; // Para guardar la última respuesta del jugador
    var selectedAvatar;

    // Constants
    var AVATAR_COUNT = 6;
    
    var FEEDBACK_DISPLAY_DURATION = 2000;
    var READY_GO_DISPLAY_DURATION = 1000;
    var BONUS_TOAST_DISPLAY_DURATION = 3000;

    var screens = {
        join: document.getElementById('join-screen'),
        waiting: document.getElementById('waiting-screen'),
        readyGo: document.getElementById('ready-go-screen'),
        question: document.getElementById('question-screen'),
        end: document.getElementById('end-game-screen'),
        feedback: document.getElementById('feedback-screen'),
        rondaRelampago: document.getElementById('ronda-relampago-announcement'),
        winnerAnnouncement: document.getElementById('winner-announcement'),
    };
    var correctSound = document.getElementById('correct-sound');
    var incorrectSound = document.getElementById('incorrect-sound');
    var notificationSound = document.getElementById('notification-sound');
    
    var joinButton = document.getElementById('join-btn');
    var feedbackText = document.getElementById('feedback-text');
    var questionProgress = document.getElementById('question-progress');
    var playerTimer = document.getElementById('player-timer');
    var playerTimerBar = document.getElementById('player-timer-bar');
    var readyGoText = document.getElementById('ready-go-text');
    var avatarSelection = document.getElementById('avatar-selection');
    
    var playerScoreElement = document.getElementById('player-score');
    var answerStreakElement = document.getElementById('answer-streak');
    var pointsGainedElement = document.getElementById('points-gained');
    var powerupFiftyFiftyBtn = document.getElementById('powerup-fifty-fifty');
    var powerupDoublePointsBtn = document.getElementById('powerup-double-points');
    var powerupSkipQuestionBtn = document.getElementById('powerup-skip-question');
    var confettiCanvas = document.getElementById('confetti-canvas');
    var customConfetti = confetti.create(confettiCanvas, { resize: true });

    function populateAvatarSelection() {
        for (var i = 1; i <= AVATAR_COUNT; i++) {
            (function(i) {
                var avatarImg = document.createElement('img');
                avatarImg.src = '/avatars/avatar' + i + '.svg';
                avatarImg.classList.add('avatar-option');
                avatarImg.dataset.avatarId = i;
                avatarImg.addEventListener('click', function () {
                    document.querySelectorAll('.avatar-option').forEach(function(img) { img.classList.remove('selected'); });
                    avatarImg.classList.add('selected');
                    selectedAvatar = '/avatars/avatar' + i + '.svg';
                });
                avatarSelection.appendChild(avatarImg);
            })(i);
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

    function safePlayAudio(audio) {
        var promise = audio.play();
        if (promise !== undefined) {
            promise.catch(function(error) {
                console.log("El navegador bloqueó la reproducción de sonido.");
            });
        }
    }

    function safeUnlockAudio(audio) {
        var promise = audio.play();
        if (promise !== undefined) {
            promise.then(function() { audio.pause(); }).catch(function() {});
        }
    }

    joinButton.addEventListener('click', function () {
        safeUnlockAudio(correctSound);
        safeUnlockAudio(incorrectSound);
        safeUnlockAudio(notificationSound);

        gamePin = document.getElementById('pin-input').value;
        var name = document.getElementById('name-input').value.trim();
        if (gamePin && name && selectedAvatar) {
            var playerId = sessionStorage.getItem('playerId');
            console.log('Intentando unirse al juego con PIN: ' + gamePin + ', nombre: ' + name + ', avatar: ' + selectedAvatar + ', y playerId: ' + playerId);
            socket.emit('player-join-game', { pin: gamePin, name: name, avatar: selectedAvatar, playerId: playerId });
        } else {
            document.getElementById('error-message').textContent = 'Debes introducir un PIN, un nombre y seleccionar un avatar.';
        }
    });

    powerupFiftyFiftyBtn.addEventListener('click', function () {
        socket.emit('player-use-powerup', { pin: gamePin, powerupType: 'fiftyFifty' });
        powerupFiftyFiftyBtn.disabled = true;
    });

    powerupDoublePointsBtn.addEventListener('click', function () {
        socket.emit('player-use-powerup', { pin: gamePin, powerupType: 'doublePoints' });
        powerupDoublePointsBtn.disabled = true;
    });

    powerupSkipQuestionBtn.addEventListener('click', function () {
        socket.emit('player-use-powerup', { pin: gamePin, powerupType: 'skipQuestion' });
        powerupSkipQuestionBtn.disabled = true;
    });

    socket.on('join-success', function () {
        console.log('¡Unión exitosa!');
        showScreen('waiting', screens);
    });
    socket.on('join-error', function (message) {
        console.error('Error al unirse: ' + message);
        document.getElementById('error-message').textContent = message;
    });

    socket.on('new-question', function (data) {
        clearInterval(timerInterval);
        playerTimer.textContent = '';
        playerTimerBar.style.transform = 'scaleY(1)';

        if (data.isLightningRound) {
            document.body.classList.add('ronda-relampago');
            questionProgress.textContent = '¡RONDA RELÁMPAGO! | Pregunta ' + (data.questionIndex + 1) + ' de ' + data.totalQuestions;
        } else {
            document.body.classList.remove('ronda-relampago');
            questionProgress.textContent = 'Pregunta ' + (data.questionIndex + 1) + ' de ' + data.totalQuestions;
        }

        document.getElementById('player-question-text').textContent = data.question;

        answerStreakElement.classList.add('hidden');

        var answerGrid = document.getElementById('answer-grid');
        answerGrid.innerHTML = '';

        document.querySelectorAll('.answer-btn').forEach(function(btn) { btn.remove(); });

        if (data.type === 'true_false') {
            var trueButton = document.createElement('button');
            trueButton.className = 'btn answer-btn true-false-btn';
            trueButton.textContent = data.answers[0];
            trueButton.addEventListener('click', function () {
                lastAnswerIndex = 0;
                document.querySelectorAll('.answer-btn').forEach(function(btn) { btn.disabled = true; });
                socket.emit('player-answer', { pin: gamePin, answerIndex: 0 });
            });
            answerGrid.appendChild(trueButton);

            var falseButton = document.createElement('button');
            falseButton.className = 'btn answer-btn true-false-btn';
            falseButton.textContent = data.answers[1];
            falseButton.addEventListener('click', function () {
                lastAnswerIndex = 1;
                document.querySelectorAll('.answer-btn').forEach(function(btn) { btn.disabled = true; });
                socket.emit('player-answer', { pin: gamePin, answerIndex: 1 });
            });
            answerGrid.appendChild(falseButton);
        } else {
            var colors = ['red', 'blue', 'yellow', 'green'];
            data.answers.forEach(function (answer, index) {
                var button = document.createElement('button');
                button.className = 'btn answer-btn ' + colors[index];
                button.textContent = answer;
                button.addEventListener('click', function () {
                    lastAnswerIndex = index;
                    document.querySelectorAll('.answer-btn').forEach(function(btn) { btn.disabled = true; });
                    socket.emit('player-answer', { pin: gamePin, answerIndex: index });
                });
                answerGrid.appendChild(button);
            });
        }

        if (data.powerups) {
            powerupFiftyFiftyBtn.disabled = !data.powerups.fiftyFifty;
            powerupDoublePointsBtn.disabled = !data.powerups.doublePoints;
            powerupSkipQuestionBtn.disabled = !data.powerups.skipQuestion;
        }

        showScreen('question', screens);
    });

    socket.on('ronda-relampago-announce', function () {
        showEpicRondaRelampagoAnnouncement();
    });

    socket.on('answer-result', function (data) {
        clearInterval(timerInterval);
        var correct = data.correct, score = data.score, streak = data.streak, pointsGained = data.pointsGained, correctAnswerIndex = data.correctAnswerIndex;
        currentScore = score;
        var answerStreak = streak;

        var answerButtons = document.querySelectorAll('.answer-btn');
        var selectedButton = answerButtons[lastAnswerIndex];

        answerButtons[correctAnswerIndex].classList.add('correct');

        if (correct) {
            safePlayAudio(correctSound);
            if (selectedButton) selectedButton.classList.add('correct');
            triggerConfetti();
            feedbackText.textContent = '¡Correcto!';
            pointsGainedElement.textContent = '+' + pointsGained;
            pointsGainedElement.classList.remove('hidden');
            screens.feedback.classList.add('correct');
        } else {
            safePlayAudio(incorrectSound);
            if (selectedButton) selectedButton.classList.add('incorrect');
            window.triggerIncorrectAnimation();
            feedbackText.textContent = '¡Incorrecto!';
            pointsGainedElement.textContent = pointsGained;
            pointsGainedElement.classList.remove('hidden');
            screens.feedback.classList.add('incorrect');
        }

        showScreen('feedback', screens);
        setTimeout(function () {
            screens.feedback.classList.add('hidden');
            screens.feedback.classList.remove('correct', 'incorrect');
            showScreen('waiting', screens);
        }, FEEDBACK_DISPLAY_DURATION);

        playerScoreElement.textContent = 'Puntos: ' + currentScore;
        if (streak > 1) {
            answerStreakElement.textContent = '¡Racha: ' + streak + '!';
            answerStreakElement.classList.remove('hidden');
            if (streak > 0 && streak % 3 === 0) {
                var streakBonusEl = document.createElement('div');
                streakBonusEl.className = 'bonus-toast';
                streakBonusEl.textContent = '¡Bonificación por racha! +300 puntos';
                document.body.appendChild(streakBonusEl);
                setTimeout(function () {
                    streakBonusEl.remove();
                }, BONUS_TOAST_DISPLAY_DURATION);
            }
        } else {
            answerStreakElement.classList.add('hidden');
        }
    });

    socket.on('powerup-fifty-fifty-result', function (answersToRemove) {
        var answerButtons = document.querySelectorAll('.answer-btn');
        answersToRemove.forEach(function (index) {
            answerButtons[index].classList.add('hidden');
        });
        powerupFiftyFiftyBtn.disabled = true;
    });

    socket.on('powerup-double-points-result', function () {
        powerupDoublePointsBtn.disabled = true;
    });

    socket.on('powerup-skip-question-result', function () {
        powerupSkipQuestionBtn.disabled = true;
        document.querySelectorAll('.answer-btn').forEach(function(btn) { btn.disabled = true; });
        feedbackText.textContent = '¡Pregunta Saltada!';
        pointsGainedElement.classList.add('hidden');
        screens.feedback.classList.remove('correct', 'incorrect');
        showScreen('feedback', screens);
        setTimeout(function () {
            screens.feedback.classList.add('hidden');
            showScreen('waiting', screens);
        }, FEEDBACK_DISPLAY_DURATION);
    });

    socket.on('show-leaderboard', function () {
        clearInterval(timerInterval);
        showScreen('waiting', screens);
    });

    socket.on('game-over', function (winnerName) {
        document.getElementById('winner-name').textContent = winnerName;
        showScreen('winnerAnnouncement', screens);
    });

    socket.on('game-cancelled', function () { alert("El anfitrión ha cancelado el juego."); location.reload(); });

    socket.on('update-timer', function (timeLeft, totalTime) {
        playerTimer.textContent = timeLeft;
        var percentage = timeLeft / totalTime;
        playerTimerBar.style.transform = 'scaleY(' + percentage + ')';

        if (percentage > 0.5) {
            playerTimerBar.style.backgroundColor = '#2ecc71';
        } else if (percentage > 0.2) {
            playerTimerBar.style.backgroundColor = '#f1c40f';
        } else {
            playerTimerBar.style.backgroundColor = '#e74c3c';
        }
    });

    socket.on('ready-go', function (message) {
        readyGoText.textContent = message;
        showScreen('readyGo', screens);
        setTimeout(function () {
            screens.readyGo.classList.add('hidden');
        }, READY_GO_DISPLAY_DURATION);
    });

    populateAvatarSelection();
    showScreen('join', screens);

    var chatContainer = document.getElementById('chat-container');
    var messages = document.getElementById('messages');
    var chatForm = document.getElementById('chat-form');
    var messageInput = document.getElementById('message-input');
    var toggleChatBtn = document.getElementById('toggle-chat-btn');

    chatForm.addEventListener('submit', function (e) {
        e.preventDefault();
        if (messageInput.value) {
            socket.emit('sendMessage', messageInput.value);
            messageInput.value = '';
        }
    });

    socket.on('newMessage', function (data) {
        var item = document.createElement('li');
        item.textContent = data.name + ': ' + data.message;
        messages.appendChild(item);
        messages.scrollTop = messages.scrollHeight;
        safePlayAudio(notificationSound);
    });

    toggleChatBtn.addEventListener('click', function () {
        chatContainer.classList.toggle('minimized');
        if (chatContainer.classList.contains('minimized')) {
            toggleChatBtn.textContent = '+';
        } else {
            toggleChatBtn.textContent = '-';
        }
    });
});