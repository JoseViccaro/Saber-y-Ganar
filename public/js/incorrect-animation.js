'use strict';

var incorrectContainer = document.createElement('canvas');
incorrectContainer.id = 'incorrect-canvas';
document.body.appendChild(incorrectContainer);

var incorrectCtx = incorrectContainer.getContext('2d');
var incorrectParticles = [];

var INCORRECT_PARTICLE_COUNT = 100;
var INCORRECT_ANIMATION_DURATION = 2000; // 2 seconds

function resizeIncorrectCanvas() {
    incorrectContainer.width = window.innerWidth;
    incorrectContainer.height = window.innerHeight;
}

function createIncorrectAnimation() {
    var count = INCORRECT_PARTICLE_COUNT;
    var duration = INCORRECT_ANIMATION_DURATION;

    for (var i = 0; i < count; i++) {
        incorrectParticles.push({
            x: Math.random() * window.innerWidth,
            y: -20,
            size: Math.random() * 20 + 10,
            vx: (Math.random() - 0.5) * 5,
            vy: Math.random() * 5 + 2,
            angle: Math.random() * Math.PI * 2,
            angularVelocity: (Math.random() - 0.5) * 0.05
        });
    }

    animateIncorrectAnimation(duration);
}

function animateIncorrectAnimation(duration) {
    var startTime = Date.now();

    function loop() {
        var elapsedTime = Date.now() - startTime;
        if (elapsedTime > duration) {
            incorrectParticles = [];
            incorrectCtx.clearRect(0, 0, window.innerWidth, window.innerHeight);
            return;
        }

        requestAnimationFrame(loop);
        incorrectCtx.clearRect(0, 0, window.innerWidth, window.innerHeight);

        for (var i = 0; i < incorrectParticles.length; i++) {
            var p = incorrectParticles[i];
            p.x += p.vx;
            p.y += p.vy;
            p.angle += p.angularVelocity;

            incorrectCtx.save();
            incorrectCtx.translate(p.x, p.y);
            incorrectCtx.rotate(p.angle);
            incorrectCtx.font = p.size + 'px Arial';
            incorrectCtx.fillStyle = 'red';
            incorrectCtx.textAlign = 'center';
            incorrectCtx.textBaseline = 'middle';
            incorrectCtx.fillText('X', 0, 0);
            incorrectCtx.restore();

            if (p.y > window.innerHeight + 20) {
                incorrectParticles.splice(i, 1);
                i--;
            }
        }
    }

    loop();
}

window.addEventListener('resize', resizeIncorrectCanvas);
resizeIncorrectCanvas();

// Export the function to be used in other scripts
window.triggerIncorrectAnimation = createIncorrectAnimation;