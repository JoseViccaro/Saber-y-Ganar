import 'package:flutter/material.dart';
import 'package:socket_io_client/socket_io_client.dart' as IO;
import 'package:saber_y_ganar/config.dart';

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
  final String _currentScreen = 'join'; // 'join', 'waiting', 'readyGo', 'question', 'feedback', 'end'

  // Question Screen State
  final String _questionText = '';
  final List<dynamic> _answers = [];
  final int _questionIndex = 0;
  final int _totalQuestions = 0;
  final double _timeLeft = 0.0;
  final double _totalTime = 0.0;
  final int _currentScore = 0;
  final int _answerStreak = 0;
  final String _questionType = 'multiple_choice';
  final bool _fiftyFiftyAvailable = false;
  final bool _doublePointsAvailable = false;
  bool _answered = false;

  // Feedback Screen State
  final bool _isCorrect = false;
  final int _pointsGained = 0;

  // Ready Go Screen State
  final String _readyGoText = '';

  @override
  void initState() {
    super.initState();
    _connectSocket();
  }

  void _connectSocket() {
    socket = IO.io(AppConfig.serverUrl, <String, dynamic>{
      'transports': ['websocket'],
      'autoConnect': false,
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
