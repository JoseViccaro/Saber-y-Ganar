function showScreen(screenName, screens) {
    for (let key in screens) {
        screens[key].classList.add('hidden');
    }
    if (screens[screenName]) {
        screens[screenName].classList.remove('hidden');
    }
}

function handleRondaRelampago(screenElement, duration, callback) {
    screenElement.classList.remove('hidden');
    setTimeout(() => {
        screenElement.classList.add('hidden');
        if (callback) {
            callback();
        }
    }, duration);
}

function unlockAudio(...audioElements) {
    audioElements.forEach(audio => {
        audio.play().then(() => audio.pause()).catch(() => {});
    });
}
