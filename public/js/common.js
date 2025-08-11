/* eslint-disable no-unused-vars */
function showScreen(screenName, screens) {
    for (let key in screens) {
        screens[key].classList.add('hidden');
    }
    if (screens[screenName]) {
        screens[screenName].classList.remove('hidden');
    }
}

function showEpicRondaRelampagoAnnouncement() {
    // Create overlay
    const overlay = document.createElement('div');
    overlay.style.position = 'fixed';
    overlay.style.top = '0';
    overlay.style.left = '0';
    overlay.style.width = '100vw';
    overlay.style.height = '100vh';
    overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
    overlay.style.display = 'flex';
    overlay.style.justifyContent = 'center';
    overlay.style.alignItems = 'center';
    overlay.style.zIndex = '10000';
    overlay.style.opacity = '0';
    overlay.style.transition = 'opacity 0.5s ease-in-out';

    // Create text element
    const text = document.createElement('h1');
    text.textContent = '¡RONDA RELÁMPAGO!';
    text.style.color = '#FFD700'; // Gold color
    text.style.fontSize = 'clamp(2rem, 12vw, 8rem)'; // Responsive font size
    text.style.fontFamily = "'Arial Black', Gadget, sans-serif";
    text.style.textShadow = '0 0 10px #fff, 0 0 20px #ff0, 0 0 30px #ff0';
    text.style.transform = 'scale(0)';
    text.style.transition = 'transform 0.8s cubic-bezier(0.68, -0.55, 0.27, 1.55)';

    // Append to overlay
    overlay.appendChild(text);

    // Append overlay to body
    document.body.appendChild(overlay);

    // Animate in
    setTimeout(() => {
        overlay.style.opacity = '1';
        text.style.transform = 'scale(1)';
    }, 100);

    // Animate out and remove
    setTimeout(() => {
        overlay.style.opacity = '0';
        text.style.transform = 'scale(0)';
        setTimeout(() => {
            document.body.removeChild(overlay);
        }, 500); // Wait for fade out transition
    }, 2500); // Show for 2.5 seconds
}


function unlockAudio(...audioElements) {
    audioElements.forEach(audio => {
        audio.play().then(() => audio.pause()).catch(() => {});
    });
}