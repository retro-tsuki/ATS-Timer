let timer;
let maxTime = 120; // 最大120秒 (120km/h) とする
const needle = document.getElementById('needle');
const displayNumber = document.getElementById('display-number');
const atsSound = document.getElementById('atsSound');
const confirmButton = document.getElementById('confirmButton');

// 針の回転角度を設定 (-135度(0km/h)から+135度(160km/h)など)
// 今回は0km/h〜120km/hの範囲とする
const startAngle = -135;
const endAngle = 90; // 120km/h

document.getElementById('startBtn').addEventListener('click', () => {
    const mins = parseInt(document.getElementById('setTimeMins').value) || 0;
    const secs = parseInt(document.getElementById('setTimeSecs').value) || 0;
    let timeLeft = (mins * 60) + secs;
    
    if (timeLeft <= 0 || timeLeft > maxTime) return;

    resetATS();
    clearInterval(timer);

    timer = setInterval(() => {
        timeLeft--;
        updateSpeedometer(timeLeft);

        if (timeLeft <= 0) {
            clearInterval(timer);
            startATSAlert();
        }
    }, 1000);
});

// 緊急停止ボタン
document.getElementById('emergencyBtn').addEventListener('click', () => {
    clearInterval(timer);
    resetATS(); // 音も止める
});

// ATS確認ボタン
confirmButton.addEventListener('click', () => {
    stopATSAlert();
});

function updateSpeedometer(seconds) {
    displayNumber.innerText = String(seconds).padStart(3, '0');
    
    // 針の回転角度を計算 (0-120秒の範囲を startAngle-endAngle にマッピング)
    const ratio = seconds / maxTime;
    const angle = startAngle + (endAngle - startAngle) * ratio;
    needle.style.transform = `rotate(${angle}deg)`;
}

function startATSAlert() {
    atsSound.play();
    confirmButton.classList.add('active'); // ボタンを点滅させる
}

function stopATSAlert() {
    atsSound.pause();
    atsSound.currentTime = 0;
    confirmButton.classList.remove('active');
}

function resetATS() {
    stopATSAlert();
}
