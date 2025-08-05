import 'package:flutter/material.dart';
import 'package:socket_io_client/socket_io_client.dart' as IO;

class PlayerApp extends StatefulWidget {
  const PlayerApp({super.key});

  @override
  State<PlayerApp> createState() => _PlayerAppState();
}

class _PlayerAppState extends State<PlayerApp> {
  late IO.Socket socket;
  final TextEditingController _pinController = TextEditingController();
  final TextEditingController _nameController = TextEditingController();
  String _errorMessage = '';
  String _currentScreen = 'join'; // 'join', 'waiting', 'readyGo', 'question', 'feedback', 'end'

  // Question Screen State
  String _questionText = '';
  List<dynamic> _answers = [];
  int _questionIndex = 0;
  int _totalQuestions = 0;
  double _timeLeft = 0.0;
  double _totalTime = 0.0;
  int _currentScore = 0;
  int _answerStreak = 0;
  String _questionType = 'multiple_choice';
  bool _fiftyFiftyAvailable = false;
  bool _doublePointsAvailable = false;
  bool _answered = false;

  // Feedback Screen State
  bool _isCorrect = false;
  int _pointsGained = 0;

  // Ready Go Screen State
  String _readyGoText = '';

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
      print('Conectado al servidor Socket.IO como jugador');
    });

    socket.on('join-success', (_) {
      setState(() {
        _currentScreen = 'waiting';
        _errorMessage = '';
      });
      print('Unido al juego exitosamente');
    });

    socket.on('join-error', (message) {
      setState(() {
        _errorMessage = message;
      });
      print('Error al unirse al juego: $message');
    });

    socket.on('new-question', (data) {
      setState(() {
        _questionText = data['question'];
        _answers = List<dynamic>.from(data['answers']);
        _questionIndex = data['questionIndex'];
        _totalQuestions = data['totalQuestions'];
        _questionType = data['type'] ?? 'multiple_choice';
        _fiftyFiftyAvailable = data['powerups']?['fiftyFifty'] ?? false;
        _doublePointsAvailable = data['powerups']?['doublePoints'] ?? false;
        _answered = false;
        _currentScreen = 'question';
      });
      print('Nueva pregunta recibida: $_questionText');
    });

    socket.on('update-timer', (data) {
      setState(() {
        _timeLeft = double.parse(data[0].toString());
        _totalTime = double.parse(data[1].toString());
      });
    });

    socket.on('answer-result', (data) {
      setState(() {
        _isCorrect = data['correct'];
        _currentScore = data['score'];
        _answerStreak = data['streak'];
        _pointsGained = data['pointsGained'];
        _currentScreen = 'feedback';
      });
      print('Resultado de la respuesta: ${data['correct'] ? 'Correcto' : 'Incorrecto'}');
    });

    socket.on('powerup-fifty-fifty-result', (answersToRemove) {
      setState(() {
        for (var indexToRemove in answersToRemove) {
          if (indexToRemove < _answers.length) {
            _answers[indexToRemove] = '';
          }
        }
        _fiftyFiftyAvailable = false;
      });
    });

    socket.on('powerup-double-points-result', (_) {
      setState(() {
        _doublePointsAvailable = false;
      });
    });

    socket.on('show-leaderboard', (_) {
      setState(() {
        _currentScreen = 'waiting'; // Go back to waiting screen during leaderboard display on host
      });
    });

    socket.on('game-over', (winnerName) {
      setState(() {
        _currentScreen = 'end';
      });
    });

    socket.on('ready-go', (message) {
      setState(() {
        _readyGoText = message;
        _currentScreen = 'readyGo';
      });
      Future.delayed(const Duration(seconds: 1), () {
        if (mounted) {
          setState(() {
            _currentScreen = 'question'; // Transition to question screen after 1 second
          });
        }
      });
    });

    

    socket.on('game-cancelled', (_) {
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
                    _currentScreen = 'join'; // Go back to join screen
                  });
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

  void _joinGame() {
    final pin = _pinController.text.trim();
    final name = _nameController.text.trim();

    if (pin.isNotEmpty && name.isNotEmpty) {
      socket.emit('player-join-game', {'pin': pin, 'name': name});
    } else {
      setState(() {
        _errorMessage = 'Debes introducir un PIN y un nombre.';
      });
    }
  }

  void _sendAnswer(int answerIndex) {
    if (!_answered) {
      socket.emit('player-answer', {'pin': _pinController.text, 'answerIndex': answerIndex});
      setState(() {
        _answered = true;
      });
    }
  }

  void _usePowerup(String powerupType) {
    socket.emit('player-use-powerup', {'pin': _pinController.text, 'powerupType': powerupType});
  }

  Widget _buildJoinScreen() {
    return Column(
      mainAxisAlignment: MainAxisAlignment.center,
      children: [
        const Text(
          'Saber y Ganar',
          style: TextStyle(fontSize: 36, fontWeight: FontWeight.bold),
        ),
        const SizedBox(height: 20),
        const Text(
          'Unirse al Juego',
          style: TextStyle(fontSize: 24, fontWeight: FontWeight.bold),
        ),
        const SizedBox(height: 20),
        TextField(
          controller: _pinController,
          keyboardType: TextInputType.number,
          decoration: const InputDecoration(
            labelText: 'PIN del Juego',
            border: OutlineInputBorder(),
          ),
        ),
        const SizedBox(height: 20),
        TextField(
          controller: _nameController,
          decoration: const InputDecoration(
            labelText: 'Tu Nombre',
            border: OutlineInputBorder(),
          ),
        ),
        const SizedBox(height: 20),
        ElevatedButton(
          onPressed: _joinGame,
          style: ElevatedButton.styleFrom(
            padding: const EdgeInsets.symmetric(horizontal: 50, vertical: 20),
            textStyle: const TextStyle(fontSize: 20),
          ),
          child: const Text('¡Unirse!'),
        ),
        if (_errorMessage.isNotEmpty)
          Padding(
            padding: const EdgeInsets.all(8.0),
            child: Text(
              _errorMessage,
              style: const TextStyle(color: Colors.red, fontWeight: FontWeight.bold),
            ),
          ),
      ],
    );
  }

  Widget _buildWaitingScreen() {
    return const Column(
      mainAxisAlignment: MainAxisAlignment.center,
      children: [
        Text(
          '¡Estás dentro!',
          style: TextStyle(fontSize: 24, fontWeight: FontWeight.bold),
        ),
        SizedBox(height: 20),
        CircularProgressIndicator(),
        SizedBox(height: 20),
        Text(
          'Espera a que el anfitrión comience el juego...',
          style: TextStyle(fontSize: 18),
        ),
      ],
    );
  }

  Widget _buildReadyGoScreen() {
    return Column(
      mainAxisAlignment: MainAxisAlignment.center,
      children: [
        Text(
          _readyGoText,
          style: const TextStyle(fontSize: 48, fontWeight: FontWeight.bold, color: Colors.greenAccent),
          textAlign: TextAlign.center,
        ),
      ],
    );
  }

  Widget _buildQuestionScreen() {
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
          style: const TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
        ),
        const SizedBox(height: 10),
        Text(
          'Puntos: $_currentScore',
          style: const TextStyle(fontSize: 18, fontWeight: FontWeight.bold),
        ),
        if (_answerStreak > 1)
          Text(
            'Racha: $_answerStreak',
            style: const TextStyle(fontSize: 16, color: Colors.green),
          ),
        const SizedBox(height: 20),
        Text(
          _questionText,
          style: const TextStyle(fontSize: 22, fontWeight: FontWeight.bold),
          textAlign: TextAlign.center,
        ),
        const SizedBox(height: 20),
        Stack(
          alignment: Alignment.center,
          children: [
            SizedBox(
              width: 80,
              height: 80,
              child: CircularProgressIndicator(
                value: _timeLeft / _totalTime,
                backgroundColor: Colors.grey.shade700,
                valueColor: AlwaysStoppedAnimation<Color>(
                  _timeLeft > _totalTime * 0.5 ? Colors.green : (_timeLeft > _totalTime * 0.2 ? Colors.orange : Colors.red),
                ),
                strokeWidth: 6,
              ),
            ),
            Text(
              _timeLeft.toStringAsFixed(0),
              style: const TextStyle(fontSize: 30, fontWeight: FontWeight.bold),
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
              childAspectRatio: 2 / 1,
            ),
            itemCount: _questionType == 'true_false' ? 2 : _answers.length,
            itemBuilder: (context, index) {
              if (_questionType == 'true_false' && index >= 2) return const SizedBox.shrink();
              if (_answers[index] == '') return const SizedBox.shrink(); // Hide if 50/50 removed it
              return ElevatedButton(
                onPressed: _answered ? null : () => _sendAnswer(index),
                style: ElevatedButton.styleFrom(
                  backgroundColor: answerColors[index],
                  padding: const EdgeInsets.all(10),
                  shape: RoundedRectangleBorder(
                    borderRadius: BorderRadius.circular(10),
                  ),
                ),
                child: Text(
                  _answers[index],
                  style: const TextStyle(fontSize: 16, color: Colors.white),
                  textAlign: TextAlign.center,
                ),
              );
            },
          ),
        ),
        const SizedBox(height: 20),
        Row(
          mainAxisAlignment: MainAxisAlignment.spaceEvenly,
          children: [
            ElevatedButton(
              onPressed: _fiftyFiftyAvailable ? () => _usePowerup('fiftyFifty') : null,
              style: ElevatedButton.styleFrom(
                backgroundColor: Colors.orange,
              ),
              child: const Text('50/50'),
            ),
            ElevatedButton(
              onPressed: _doublePointsAvailable ? () => _usePowerup('doublePoints') : null,
              style: ElevatedButton.styleFrom(
                backgroundColor: Colors.pink,
              ),
              child: const Text('2x Puntos'),
            ),
          ],
        ),
      ],
    );
  }

  Widget _buildFeedbackScreen() {
    return Column(
      mainAxisAlignment: MainAxisAlignment.center,
      children: [
        Text(
          _isCorrect ? '¡Correcto!' : '¡Incorrecto!',
          style: TextStyle(
            fontSize: 48,
            fontWeight: FontWeight.bold,
            color: _isCorrect ? Colors.green : Colors.red,
          ),
        ),
        if (_isCorrect)
          Text(
            '+$_pointsGained',
            style: const TextStyle(fontSize: 36, fontWeight: FontWeight.bold, color: Colors.greenAccent),
          ),
        const SizedBox(height: 20),
        Text(
          'Puntuación actual: $_currentScore',
          style: const TextStyle(fontSize: 24),
        ),
        if (_answerStreak > 1)
          Text(
            'Racha: $_answerStreak',
            style: const TextStyle(fontSize: 20, color: Colors.green),
          ),
      ],
    );
  }

  Widget _buildEndScreen() {
    return const Column(
      mainAxisAlignment: MainAxisAlignment.center,
      children: [
        Text(
          '¡Juego Terminado!',
          style: TextStyle(fontSize: 36, fontWeight: FontWeight.bold),
        ),
        SizedBox(height: 20),
        Text(
          'Mira la pantalla principal para ver los resultados.',
          style: TextStyle(fontSize: 18),
          textAlign: TextAlign.center,
        ),
      ],
    );
  }

  

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Saber y Ganar - Jugador'),
        centerTitle: true,
      ),
      body: Center(
        child: Padding(
          padding: const EdgeInsets.all(20.0),
          child: Builder(
            builder: (BuildContext context) {
              switch (_currentScreen) {
                case 'join':
                  return _buildJoinScreen();
                case 'waiting':
                  return _buildWaitingScreen();
                case 'readyGo':
                  return _buildReadyGoScreen();
                case 'question':
                  return _buildQuestionScreen();
                case 'feedback':
                  return _buildFeedbackScreen();
                case 'end':
                  return _buildEndScreen();
                
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
    _pinController.dispose();
    _nameController.dispose();
    socket.disconnect();
    super.dispose();
  }
}