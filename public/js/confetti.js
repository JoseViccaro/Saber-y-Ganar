
const confettiContainer = document.createElement('canvas');
confettiContainer.id = 'confetti-canvas';
document.body.appendChild(confettiContainer);

const confettiCtx = confettiContainer.getContext('2d');
let particles = [];

const colors = ["#ffc700", "#ff0000", "#2e2bff", "#8a2be2"];

function resizeCanvas() {
    confettiContainer.width = window.innerWidth;
    confettiContainer.height = window.innerHeight;
}

function createConfetti() {
    const count = 200;
    const duration = 3000; // 3 seconds

    for (let i = 0; i < count; i++) {
        particles.push({
            x: Math.random() * window.innerWidth,
            y: -20,
            w: Math.random() * 10 + 5,
            h: Math.random() * 10 + 5,
            color: colors[Math.floor(Math.random() * colors.length)],
            vx: (Math.random() - 0.5) * 10,
            vy: Math.random() * 5 + 2,
            angle: Math.random() * Math.PI * 2,
            angularVelocity: (Math.random() - 0.5) * 0.1
        });
    }

    animateConfetti(duration);
}

function animateConfetti(duration) {
    const startTime = Date.now();

    function loop() {
        const elapsedTime = Date.now() - startTime;
        if (elapsedTime > duration) {
            particles = [];
            confettiCtx.clearRect(0, 0, window.innerWidth, window.innerHeight);
            return;
        }

        requestAnimationFrame(loop);
        confettiCtx.clearRect(0, 0, window.innerWidth, window.innerHeight);

        for (let i = 0; i < particles.length; i++) {
            const p = particles[i];
            p.x += p.vx;
            p.y += p.vy;
            p.angle += p.angularVelocity;

            confettiCtx.save();
            confettiCtx.translate(p.x, p.y);
            confettiCtx.rotate(p.angle);
            confettiCtx.fillStyle = p.color;
            confettiCtx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
            confettiCtx.restore();

            if (p.y > window.innerHeight + 20) {
                particles.splice(i, 1);
                i--;
            }
        }
    }

    loop();
}

window.addEventListener('resize', resizeCanvas);
resizeCanvas();

// Export the function to be used in other scripts
window.triggerConfetti = createConfetti;
