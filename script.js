let timer;
const display = document.getElementById('display');
const atsLamp = document.getElementById('atsLamp');
const atsSound = document.getElementById('atsSound');

document.getElementById('startBtn').addEventListener('click', () => {
    const mins = parseInt(document.getElementById('minutes').value) || 0;
    const secs = parseInt(document.getElementById('seconds').value) || 0;
    let timeLeft = (mins * 60) + secs;
    
    if (timeLeft <= 0) return;

    // リセット処理
    clearInterval(timer);
    stopATS();

    timer = setInterval(() => {
        timeLeft--;
        updateDisplay(timeLeft);

        if (timeLeft <= 0) {
            clearInterval(timer);
            startATS();
        }
    }, 1000);
});

// ATS確認ボタン
document.getElementById('confirmBtn').addEventListener('click', () => {
    stopATS();
    clearInterval(timer);
});

function startATS() {
    atsSound.play();
    atsLamp.classList.add('active'); // ランプ点灯
}

function stopATS() {
    atsSound.pause();
    atsSound.currentTime = 0;
    atsLamp.classList.remove('active'); // ランプ消灯
}

function updateDisplay(seconds) {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    display.innerText = `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
}
