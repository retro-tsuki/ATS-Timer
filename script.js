let timer = null;
let currentSeconds = 0;
let isATSAlarm = false;

const needle = document.getElementById('needle');
const digitalSpeed = document.getElementById('digitalSpeed');
const atsLamp = document.getElementById('atsLamp');
const confirmBtn = document.getElementById('confirmBtn');
const emergencyLamp = document.getElementById('emergencyLamp');

// 角度計算用（0km/h = -135度, 160km/h = 135度とする）
const getAngle = (speed) => -135 + (speed * (270 / 160));

function updateDisplay(speed) {
    digitalSpeed.innerText = String(Math.max(0, speed)).padStart(3, '0');
    needle.style.transform = `rotate(${getAngle(speed)}deg)`;
}

// 運転開始
document.getElementById('startBtn').addEventListener('click', () => {
    const m = parseInt(document.getElementById('inputMins').value) || 0;
    const s = parseInt(document.getElementById('inputSecs').value) || 0;
    currentSeconds = (m * 60) + s;

    if (currentSeconds <= 0) return;

    resetSystem();
    
    // 針を開始位置まで「スッ」と上げる演出
    updateDisplay(currentSeconds);

    timer = setInterval(() => {
        currentSeconds--;
        updateDisplay(currentSeconds);

        if (currentSeconds <= 0) {
            triggerATS();
        }
    }, 1000);
});

// ATS鳴動
function triggerATS() {
    clearInterval(timer);
    isATSAlarm = true;
    atsLamp.classList.add('active-red');
    confirmBtn.classList.add('blinking');
    // ここで atsSound.play() を呼ぶ
    console.log("ATS鳴動: キンコンキンコン...");
}

// ATS確認ボタン
confirmBtn.addEventListener('click', () => {
    if (isATSAlarm) {
        stopATS();
    }
});

// 緊急ボタン
document.getElementById('emergencyBtn').addEventListener('click', () => {
    clearInterval(timer);
    emergencyLamp.classList.add('active-red');
    stopATS();
    console.log("非常ブレーキ作動");
});

function stopATS() {
    isATSAlarm = false;
    atsLamp.classList.remove('active-red');
    confirmBtn.classList.remove('blinking');
    // ここで atsSound.pause() を呼ぶ
}

function resetSystem() {
    clearInterval(timer);
    stopATS();
    emergencyLamp.classList.remove('active-red');
}
