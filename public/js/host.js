"use strict";

document.addEventListener('DOMContentLoaded', function () {
  var socket = io();
  var gamePin;
  var timerInterval;
  var screens = {
    setup: document.getElementById('setup-screen'),
    lobby: document.getElementById('lobby-screen'),
    quiz: document.getElementById('quiz-screen'),
    questionSummary: document.getElementById('question-summary-screen'),
    leaderboard: document.getElementById('leaderboard-screen'),
    rondaRelampago: document.getElementById('ronda-relampago-announcement')
  };
  var hostTimerCountdown = document.getElementById('host-timer-countdown');
  var playersRespondedList = document.getElementById('players-responded-list');
  var correctPlayersList = document.getElementById('correct-players-list');
  var hostCorrectSound = document.getElementById('host-correct-sound');
  var hostIncorrectSound = document.getElementById('host-incorrect-sound');
  var lobbyMusic = document.getElementById('lobby-music');
  var timerTickSound = document.getElementById('timer-tick-sound');
  var backgroundMusic = document.getElementById('background-music');
  var notificationSound = document.getElementById('notification-sound');
  var answerCountElements = [document.getElementById('answer-count-0'), document.getElementById('answer-count-1'), document.getElementById('answer-count-2'), document.getElementById('answer-count-3')];
  var summaryQuestionText = document.getElementById('summary-question-text');
  var summaryCorrectAnswer = document.getElementById('summary-correct-answer');
  var summaryAnswerDistributionElements = [document.getElementById('summary-count-0'), document.getElementById('summary-count-1'), document.getElementById('summary-count-2'), document.getElementById('summary-count-3')];
  var showLeaderboardBtn = document.getElementById('show-leaderboard-btn');
  var nextQuestionBtn = document.getElementById('next-question-btn');
  document.getElementById('create-game-btn').addEventListener('click', function () {
    unlockAudio(hostCorrectSound, hostIncorrectSound, lobbyMusic, timerTickSound, backgroundMusic);
    socket.emit('host-create-game', {
      hostName: 'Anfitrión'
    });
  });
  document.getElementById('start-game-btn').addEventListener('click', function () {
    socket.emit('host-start-game', gamePin);
  });
  showLeaderboardBtn.addEventListener('click', function () {
    socket.emit('host-show-leaderboard', gamePin);
  });
  nextQuestionBtn.addEventListener('click', function () {
    socket.emit('host-next-question', gamePin);
  });
  socket.on('game-created', function (pin) {
    gamePin = pin;
    document.getElementById('game-pin-display').textContent = pin;
    document.getElementById('players-list').innerHTML = '';
    showScreen('lobby', screens);
    backgroundMusic.play();
  });
  socket.on('update-player-list', function (players) {
    var list = document.getElementById('players-list');
    list.innerHTML = '';
    Object.values(players).forEach(function (p) {
      var playerTag = document.createElement('li');
      playerTag.className = 'player-tag';
      var avatarImg = document.createElement('img');
      avatarImg.src = p.avatar;
      avatarImg.classList.add('player-avatar');
      playerTag.appendChild(avatarImg);
      var playerName = document.createElement('span');
      playerName.textContent = p.name;
      playerTag.appendChild(playerName);
      list.appendChild(playerTag);
    });
    var startGameBtn = document.getElementById('start-game-btn');

    if (Object.keys(players).length > 0) {
      startGameBtn.disabled = false;
      startGameBtn.classList.add('btn-start');
    } else {
      startGameBtn.disabled = true;
      startGameBtn.classList.remove('btn-start');
    }
  });
  socket.on('new-question', function (data) {
    clearInterval(timerInterval);
    hostTimerCountdown.textContent = '';

    if (data.isLightningRound) {
      document.body.classList.add('ronda-relampago');
      document.getElementById('question-counter').textContent = "\xA1RONDA REL\xC1MPAGO! | Pregunta ".concat(data.questionIndex + 1, " / ").concat(data.totalQuestions);
    } else {
      document.body.classList.remove('ronda-relampago');
      document.getElementById('question-counter').textContent = "Pregunta ".concat(data.questionIndex + 1, " / ").concat(data.totalQuestions);
    }

    document.getElementById('question').textContent = data.question;
    var questionImageContainer = document.getElementById('question-image-container');

    if (data.image) {
      questionImageContainer.innerHTML = "<img src=\"".concat(data.image, "\" alt=\"Question Image\">");
      questionImageContainer.classList.remove('hidden');
    } else {
      questionImageContainer.classList.add('hidden');
    }

    playersRespondedList.innerHTML = '';
    correctPlayersList.innerHTML = '';
    answerCountElements.forEach(function (el) {
      return el.textContent = '0';
    });
    var hostAnswerGrid = document.getElementById('host-answer-grid');
    hostAnswerGrid.innerHTML = '';
    data.answers.forEach(function (answer, index) {
      var answerDiv = document.createElement('div');
      answerDiv.className = 'host-answer-option';
      answerDiv.innerHTML = "<span class=\"answer-label\">".concat(String.fromCharCode(65 + index), "</span><span class=\"answer-text\">").concat(answer, "</span>");
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
  socket.on('ronda-relampago-announce', function () {
    showEpicRondaRelampagoAnnouncement();
  });
  socket.on('update-timer', function (timeLeft) {
    hostTimerCountdown.textContent = timeLeft;

    if (timeLeft <= 5 && timeLeft > 0) {
      timerTickSound.play();
    } else {
      timerTickSound.pause();
      timerTickSound.currentTime = 0;
    }
  });
  socket.on('player-responded', function (data) {
    var playerName = data.playerName,
        answerIndex = data.answerIndex;
    var playerRespondedTag = document.createElement('li');
    playerRespondedTag.className = 'player-responded-tag';
    playerRespondedTag.textContent = playerName;
    playersRespondedList.appendChild(playerRespondedTag);
    var currentCount = parseInt(answerCountElements[answerIndex].textContent);
    answerCountElements[answerIndex].textContent = currentCount + 1;
  });
  socket.on('player-answer-feedback', function (data) {
    var playerName = data.playerName,
        correct = data.correct,
        pointsGained = data.pointsGained;

    if (correct) {
      var correctPlayerTag = document.createElement('li');
      correctPlayerTag.className = 'correct-player-tag';
      correctPlayerTag.textContent = "".concat(playerName, " +").concat(pointsGained);
      correctPlayersList.appendChild(correctPlayerTag);
    }

    if (pointsGained !== 0) {
      var pointsDisplay = document.createElement('div');
      pointsDisplay.className = "points-animation ".concat(correct ? 'correct' : 'incorrect');
      pointsDisplay.textContent = "".concat(playerName, " ").concat(pointsGained > 0 ? '+' : '-').concat(pointsGained);
      document.body.appendChild(pointsDisplay);
      setTimeout(function () {
        pointsDisplay.remove();
      }, 2000);
    }

    if (!correct) {
      var incorrectAnimation = document.getElementById('incorrect-animation-overlay');

      if (incorrectAnimation) {
        incorrectAnimation.classList.add('flash');
        setTimeout(function () {
          incorrectAnimation.classList.remove('flash');
        }, 700);
      }
    }
  });
  socket.on('show-question-summary', function (data) {
    summaryQuestionText.textContent = data.questionText;
    summaryCorrectAnswer.textContent = data.correctAnswer;
    var totalAnswers = data.answerCounts.reduce(function (a, b) {
      return a + b;
    }, 0);
    data.answerCounts.forEach(function (count, index) {
      if (summaryAnswerDistributionElements[index]) {
        var percentage = totalAnswers > 0 ? count / totalAnswers * 100 : 0;
        var bar = summaryAnswerDistributionElements[index].parentElement.querySelector('.answer-bar');
        var text = summaryAnswerDistributionElements[index];

        if (bar && text) {
          bar.style.width = "".concat(percentage, "%");
          text.textContent = count;
        }
      }
    });

    if (data.answerCounts[data.correctAnswerIndex] > 0) {
      confetti({
        particleCount: 150,
        spread: 180
      });
      hostCorrectSound.play()["catch"](function () {
        return console.log("El navegador bloqueó la reproducción de sonido.");
      });
    } else {
      hostIncorrectSound.play()["catch"](function () {
        return console.log("El navegador bloqueó la reproducción de sonido.");
      });
    }

    showScreen('questionSummary', screens);
    showLeaderboardBtn.classList.remove('hidden');
    nextQuestionBtn.classList.add('hidden');
  });
  socket.on('show-leaderboard', function (players) {
    clearInterval(timerInterval);
    var playerArray = Object.values(players).sort(function (a, b) {
      return b.score - a.score;
    });
    var leaderboardHTML = '<ol>';
    playerArray.slice(0, 5).forEach(function (p, i) {
      leaderboardHTML += "<li><span>#".concat(i + 1, " ").concat(p.name, "</span> <span>").concat(p.score, " pts</span></li>");
    });
    leaderboardHTML += '</ol>';
    document.getElementById('leaderboard').innerHTML = leaderboardHTML;
    showScreen('leaderboard', screens);
    showLeaderboardBtn.classList.add('hidden');
    nextQuestionBtn.classList.remove('hidden');
  });
  socket.on('game-cancelled', function () {
    alert("El anfitrión ha cancelado el juego.");
    location.reload();
  });
  socket.on('error-creating-game', function (message) {
    alert("Error al crear el juego: ".concat(message));
  });
  showScreen('setup', screens); // Chat logic

  var hostMessages = document.getElementById('host-messages');
  socket.on('newMessage', function (data) {
    var item = document.createElement('li');
    item.textContent = "".concat(data.name, ": ").concat(data.message);
    hostMessages.appendChild(item);
    hostMessages.scrollTop = hostMessages.scrollHeight;
    notificationSound.play()["catch"](function () {
      return console.log("El navegador bloqueó la reproducción de sonido.");
    });
  });
  var chatContainer = document.getElementById('chat-container');
  var toggleChatBtn = document.getElementById('toggle-chat-btn');
  toggleChatBtn.addEventListener('click', function () {
    chatContainer.classList.toggle('minimized');

    if (chatContainer.classList.contains('minimized')) {
      toggleChatBtn.textContent = '+';
    } else {
      toggleChatBtn.textContent = '-';
    }
  });
});