import 'package:flutter/material.dart';
import 'package:socket_io_client/socket_io_client.dart' as IO;

class HostApp extends StatefulWidget {
  const HostApp({super.key});

  @override
  State<HostApp> createState() => _HostAppState();
}

class _HostAppState extends State<HostApp> {
  late IO.Socket socket;
  String _gamePin = '';
  String _currentScreen = 'setup'; // 'setup', 'lobby', 'quiz', 'summary', 'leaderboard', 'final'
  Map<String, dynamic> _players = {};

  // Quiz Screen State
  String _questionText = '';
  List<dynamic> _answers = [];
  int _questionIndex = 0;
  int _totalQuestions = 0;
  String? _questionImage;
  String _questionType = 'multiple_choice';
  double _timeLeft = 0.0;
  double _totalTime = 0.0;
  List<int> _answerCounts = [0, 0, 0, 0];
  List<String> _playersResponded = [];

  // Summary Screen State
  String _summaryQuestionText = '';
  String _summaryCorrectAnswer = '';
  List<int> _summaryAnswerDistribution = [0, 0, 0, 0];

  // Leaderboard Screen State
  List<dynamic> _leaderboardPlayers = [];

  // Final Screen State
  List<dynamic> _finalLeaderboard = [];

  @override
  void initState() {
    super.initState();
    _connectSocket();
  }

  void _connectSocket() {
    socket = IO.io('https://saber-y-ganar.onrender.com', <String, dynamic>{
      'transports': ['websocket'],
      'autoConnect': false,
    });

    socket.connect();

    socket.onConnect((_) {
      print('Conectado al servidor Socket.IO como anfitrión');
    });

    socket.on('game-created', (pin) {
      setState(() {
        _gamePin = pin;
        _currentScreen = 'lobby';
        _players = {}; // Reset players list for new game
      });
      print('Juego creado con PIN: $pin');
    });

    socket.on('update-player-list', (players) {
      setState(() {
        _players = Map<String, dynamic>.from(players);
      });
      print('Lista de jugadores actualizada: $_players');
    });

    socket.on('new-question', (data) {
      setState(() {
        _questionText = data['question'];
        _answers = List<dynamic>.from(data['answers']);
        _questionIndex = data['questionIndex'];
        _totalQuestions = data['totalQuestions'];
        _questionImage = data['image'];
        _questionType = data['type'] ?? 'multiple_choice';
        _answerCounts = [0, 0, 0, 0]; // Reset counts for new question
        _playersResponded = []; // Clear responded players list
        _currentScreen = 'quiz';
      });
      print('Nueva pregunta recibida: $_questionText');
    });

    socket.on('update-timer', (data) {
      setState(() {
        _timeLeft = double.parse(data[0].toString());
        _totalTime = double.parse(data[1].toString());
      });
    });

    socket.on('player-responded', (data) {
      setState(() {
        _playersResponded.add(data['playerName']);
        _answerCounts[data['answerIndex']]++;
      });
    });

    socket.on('show-question-summary', (data) {
      setState(() {
        _summaryQuestionText = data['questionText'];
        _summaryCorrectAnswer = data['correctAnswer'];
        _summaryAnswerDistribution = List<int>.from(data['answerCounts']);
        _currentScreen = 'summary';
      });
    });

    socket.on('show-leaderboard', (players) {
      setState(() {
        _leaderboardPlayers = List<dynamic>.from(players.values);
        _leaderboardPlayers.sort((a, b) => b['score'].compareTo(a['score']));
        _currentScreen = 'leaderboard';
      });
    });

    socket.on('game-over', (finalLeaderboard) {
      setState(() {
        _finalLeaderboard = List<dynamic>.from(finalLeaderboard);
        _currentScreen = 'final';
      });
    });

    

    socket.on('game-cancelled', (_) {
      // Handle game cancelled, e.g., show alert and navigate to setup
      showDialog(
        context: context,
        builder: (BuildContext context) {
          return AlertDialog(
            title: const Text('Juego Cancelado'),
            content: const Text('El anfitrión ha cancelado el juego.'),
            actions: <Widget>[
              TextButton(
                child: const Text('OK'),
                onPressed: () {
                  Navigator.of(context).pop();
                  setState(() {
                    _currentScreen = 'setup'; // Go back to setup screen
                  });
                },
              ),
            ],
          );
        },
      );
    });

    socket.on('error-creating-game', (message) {
      showDialog(
        context: context,
        builder: (BuildContext context) {
          return AlertDialog(
            title: const Text('Error'),
            content: Text('Error al crear el juego: $message'),
            actions: <Widget>[
              TextButton(
                child: const Text('OK'),
                onPressed: () {
                  Navigator.of(context).pop();
                },
              ),
            ],
          );
        },
      );
    });

    socket.on('disconnect', (_) {
      print('Desconectado del servidor Socket.IO');
    });

    socket.on('connect_error', (err) {
      print('Error de conexión: $err');
    });
  }

  void _createGame() {
    socket.emit('host-create-game');
  }

  void _startGame() {
    if (_gamePin.isNotEmpty) {
      socket.emit('host-start-game', _gamePin);
    }
  }

  void _showLeaderboard() {
    if (_gamePin.isNotEmpty) {
      socket.emit('host-show-leaderboard', _gamePin);
    }
  }

  void _nextQuestion() {
    if (_gamePin.isNotEmpty) {
      socket.emit('host-next-question', _gamePin);
    }
  }

  Widget _buildSetupScreen() {
    return Column(
      mainAxisAlignment: MainAxisAlignment.center,
      children: [
        const Text(
          'Quiz Venezuela',
          style: TextStyle(fontSize: 36, fontWeight: FontWeight.bold),
        ),
        const SizedBox(height: 40),
        ElevatedButton(
          onPressed: _createGame,
          style: ElevatedButton.styleFrom(
            padding: const EdgeInsets.symmetric(horizontal: 50, vertical: 20),
            textStyle: const TextStyle(fontSize: 20),
          ),
          child: const Text('Crear Juego'),
        ),
      ],
    );
  }

  Widget _buildLobbyScreen() {
    return Column(
      mainAxisAlignment: MainAxisAlignment.center,
      children: [
        const Text(
          '¡Únete con este PIN!',
          style: TextStyle(fontSize: 24, fontWeight: FontWeight.bold),
        ),
        const SizedBox(height: 20),
        Text(
          _gamePin,
          style: const TextStyle(fontSize: 48, fontWeight: FontWeight.bold, color: Colors.blueAccent),
        ),
        const SizedBox(height: 30),
        const Text(
          'Jugadores conectados:',
          style: TextStyle(fontSize: 20, fontWeight: FontWeight.w600),
        ),
        const SizedBox(height: 10),
        Expanded(
          child: ListView.builder(
            itemCount: _players.length,
            itemBuilder: (context, index) {
              final player = _players.values.elementAt(index);
              return Padding(
                padding: const EdgeInsets.symmetric(vertical: 5.0, horizontal: 20.0),
                child: Chip(
                  label: Text(player['name']),
                  backgroundColor: Colors.deepPurple.shade200,
                  labelStyle: const TextStyle(color: Colors.white, fontSize: 18),
                ),
              );
            },
          ),
        ),
        const SizedBox(height: 20),
        ElevatedButton(
          onPressed: _players.isNotEmpty ? _startGame : null,
          style: ElevatedButton.styleFrom(
            padding: const EdgeInsets.symmetric(horizontal: 50, vertical: 20),
            textStyle: const TextStyle(fontSize: 20),
            backgroundColor: _players.isNotEmpty ? Colors.green : Colors.grey,
          ),
          child: const Text('Empezar Juego'),
        ),
      ],
    );
  }

  Widget _buildQuizScreen() {
    final List<Color> answerColors = [
      Colors.red,
      Colors.blue,
      Colors.yellow,
      Colors.green,
    ];

    return Column(
      children: [
        Text(
          'Pregunta ${_questionIndex + 1} / $_totalQuestions',
          style: const TextStyle(fontSize: 20, fontWeight: FontWeight.bold),
        ),
        const SizedBox(height: 20),
        Text(
          _questionText,
          style: const TextStyle(fontSize: 24, fontWeight: FontWeight.bold),
          textAlign: TextAlign.center,
        ),
        if (_questionImage != null)
          Padding(
            padding: const EdgeInsets.symmetric(vertical: 10.0),
            child: Image.network(
              _questionImage!,
              height: 150,
              fit: BoxFit.contain,
            ),
          ),
        const SizedBox(height: 20),
        Stack(
          alignment: Alignment.center,
          children: [
            SizedBox(
              width: 100,
              height: 100,
              child: CircularProgressIndicator(
                value: _timeLeft / _totalTime,
                backgroundColor: Colors.grey.shade700,
                valueColor: AlwaysStoppedAnimation<Color>(
                  _timeLeft > _totalTime * 0.5 ? Colors.green : (_timeLeft > _totalTime * 0.2 ? Colors.orange : Colors.red),
                ),
                strokeWidth: 8,
              ),
            ),
            Text(
              _timeLeft.toStringAsFixed(0),
              style: const TextStyle(fontSize: 36, fontWeight: FontWeight.bold),
            ),
          ],
        ),
        const SizedBox(height: 20),
        Expanded(
          child: GridView.builder(
            shrinkWrap: true,
            gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(
              crossAxisCount: 2,
              crossAxisSpacing: 10,
              mainAxisSpacing: 10,
              childAspectRatio: 3 / 1,
            ),
            itemCount: _questionType == 'true_false' ? 2 : _answers.length,
            itemBuilder: (context, index) {
              if (_questionType == 'true_false' && index >= 2) return const SizedBox.shrink();
              return Container(
                decoration: BoxDecoration(
                  color: answerColors[index],
                  borderRadius: BorderRadius.circular(10),
                ),
                padding: const EdgeInsets.all(10),
                child: Column(
                  mainAxisAlignment: MainAxisAlignment.center,
                  children: [
                    Text(
                      String.fromCharCode(65 + index), // A, B, C, D
                      style: const TextStyle(fontSize: 18, fontWeight: FontWeight.bold, color: Colors.white),
                    ),
                    Text(
                      _answers[index],
                      style: const TextStyle(fontSize: 16, color: Colors.white),
                      textAlign: TextAlign.center,
                    ),
                    Text(
                      'Respuestas: ${_answerCounts[index]}',
                      style: const TextStyle(fontSize: 14, color: Colors.white70),
                    ),
                  ],
                ),
              );
            },
          ),
        ),
        const SizedBox(height: 20),
        const Text(
          'Jugadores que han respondido:',
          style: TextStyle(fontSize: 18, fontWeight: FontWeight.w600),
        ),
        SizedBox(
          height: 80,
          child: ListView.builder(
            scrollDirection: Axis.horizontal,
            itemCount: _playersResponded.length,
            itemBuilder: (context, index) {
              return Padding(
                padding: const EdgeInsets.symmetric(horizontal: 5.0),
                child: Chip(
                  label: Text(_playersResponded[index]),
                  backgroundColor: Colors.blueGrey.shade700,
                  labelStyle: const TextStyle(color: Colors.white),
                ),
              );
            },
          ),
        ),
      ],
    );
  }

  Widget _buildQuestionSummaryScreen() {
    final List<Color> answerColors = [
      Colors.red,
      Colors.blue,
      Colors.yellow,
      Colors.green,
    ];
    final totalAnswers = _summaryAnswerDistribution.fold(0, (sum, item) => sum + item);

    return Column(
      mainAxisAlignment: MainAxisAlignment.center,
      children: [
        const Text(
          'Resumen de la Pregunta',
          style: TextStyle(fontSize: 28, fontWeight: FontWeight.bold),
        ),
        const SizedBox(height: 20),
        Text(
          _summaryQuestionText,
          style: const TextStyle(fontSize: 22, fontWeight: FontWeight.w600),
          textAlign: TextAlign.center,
        ),
        const SizedBox(height: 10),
        Text(
          'Respuesta Correcta: $_summaryCorrectAnswer',
          style: const TextStyle(fontSize: 18, color: Colors.greenAccent),
          textAlign: TextAlign.center,
        ),
        const SizedBox(height: 30),
        Column(
          children: List.generate(_summaryAnswerDistribution.length, (index) {
            final count = _summaryAnswerDistribution[index];
            final percentage = totalAnswers > 0 ? (count / totalAnswers) * 100 : 0.0;
            return Padding(
              padding: const EdgeInsets.symmetric(vertical: 5.0),
              child: Row(
                children: [
                  Container(
                    width: 20,
                    height: 20,
                    color: answerColors[index],
                  ),
                  const SizedBox(width: 10),
                  Expanded(
                    child: LinearProgressIndicator(
                      value: percentage / 100,
                      backgroundColor: Colors.grey.shade700,
                      valueColor: AlwaysStoppedAnimation<Color>(answerColors[index]),
                      minHeight: 20,
                    ),
                  ),
                  const SizedBox(width: 10),
                  Text(
                    '$count (${percentage.toStringAsFixed(1)}%)',
                    style: const TextStyle(fontSize: 16),
                  ),
                ],
              ),
            );
          }),
        ),
        const SizedBox(height: 30),
        ElevatedButton(
          onPressed: _showLeaderboard,
          style: ElevatedButton.styleFrom(
            padding: const EdgeInsets.symmetric(horizontal: 50, vertical: 20),
            textStyle: const TextStyle(fontSize: 20),
          ),
          child: const Text('Mostrar Clasificación'),
        ),
      ],
    );
  }

  Widget _buildLeaderboardScreen() {
    return Column(
      mainAxisAlignment: MainAxisAlignment.center,
      children: [
        const Text(
          'Clasificación',
          style: TextStyle(fontSize: 36, fontWeight: FontWeight.bold),
        ),
        const SizedBox(height: 20),
        Expanded(
          child: ListView.builder(
            itemCount: _leaderboardPlayers.length,
            itemBuilder: (context, index) {
              final player = _leaderboardPlayers[index];
              return Card(
                margin: const EdgeInsets.symmetric(vertical: 8.0, horizontal: 16.0),
                color: Colors.deepPurple.shade700,
                child: ListTile(
                  leading: CircleAvatar(
                    backgroundColor: index == 0 ? Colors.amber : (index == 1 ? Colors.grey.shade400 : (index == 2 ? Colors.brown : Colors.transparent)),
                    child: Text(
                      '#${index + 1}',
                      style: TextStyle(color: index < 3 ? Colors.black : Colors.white, fontWeight: FontWeight.bold),
                    ),
                  ),
                  title: Text(
                    player['name'],
                    style: const TextStyle(color: Colors.white, fontSize: 20, fontWeight: FontWeight.bold),
                  ),
                  trailing: Text(
                    '${player['score']} pts',
                    style: const TextStyle(color: Colors.white, fontSize: 18),
                  ),
                ),
              );
            },
          ),
        ),
        const SizedBox(height: 20),
        ElevatedButton(
          onPressed: _nextQuestion,
          style: ElevatedButton.styleFrom(
            padding: const EdgeInsets.symmetric(horizontal: 50, vertical: 20),
            textStyle: const TextStyle(fontSize: 20),
          ),
          child: const Text('Siguiente Pregunta'),
        ),
      ],
    );
  }

  Widget _buildFinalScreen() {
    return Column(
      mainAxisAlignment: MainAxisAlignment.center,
      children: [
        const Text(
          '¡Resultados Finales!',
          style: TextStyle(fontSize: 36, fontWeight: FontWeight.bold),
        ),
        const SizedBox(height: 20),
        Expanded(
          child: ListView.builder(
            itemCount: _finalLeaderboard.length,
            itemBuilder: (context, index) {
              final player = _finalLeaderboard[index];
              return Card(
                margin: const EdgeInsets.symmetric(vertical: 8.0, horizontal: 16.0),
                color: Colors.deepPurple.shade700,
                child: ListTile(
                  leading: CircleAvatar(
                    backgroundColor: index == 0 ? Colors.amber : (index == 1 ? Colors.grey.shade400 : (index == 2 ? Colors.brown : Colors.transparent)),
                    child: Text(
                      '#${index + 1}',
                      style: TextStyle(color: index < 3 ? Colors.black : Colors.white, fontWeight: FontWeight.bold),
                    ),
                  ),
                  title: Text(
                    player['name'],
                    style: const TextStyle(color: Colors.white, fontSize: 20, fontWeight: FontWeight.bold),
                  ),
                  trailing: Text(
                    '${player['score']} pts',
                    style: const TextStyle(color: Colors.white, fontSize: 18),
                  ),
                ),
              );
            },
          ),
        ),
        const SizedBox(height: 20),
        ElevatedButton(
          onPressed: _createGame, // Play again
          style: ElevatedButton.styleFrom(
            padding: const EdgeInsets.symmetric(horizontal: 50, vertical: 20),
            textStyle: const TextStyle(fontSize: 20),
          ),
          child: const Text('Jugar Nueva Partida'),
        ),
      ],
    );
  }

  

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Quiz Venezuela - Anfitrión'),
        centerTitle: true,
      ),
      body: Center(
        child: Padding(
          padding: const EdgeInsets.all(20.0),
          child: Builder(
            builder: (BuildContext context) {
              switch (_currentScreen) {
                case 'setup':
                  return _buildSetupScreen();
                case 'lobby':
                  return _buildLobbyScreen();
                case 'quiz':
                  return _buildQuizScreen();
                case 'summary':
                  return _buildQuestionSummaryScreen();
                case 'leaderboard':
                  return _buildLeaderboardScreen();
                case 'final':
                  return _buildFinalScreen();
                
                default:
                  return const Text('Pantalla no implementada aún');
              }
            },
          ),
        ),
      ),
    );
  }

  @override
  void dispose() {
    socket.disconnect();
    super.dispose();
  }
}