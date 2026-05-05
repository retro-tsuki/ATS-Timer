let timer;
const display = document.getElementById('display');
const atsSound = document.getElementById('atsSound');

document.getElementById('startBtn').addEventListener('click', () => {
    let timeLeft = parseInt(document.getElementById('minutes').value) * 60;
    
    if (isNaN(timeLeft) || timeLeft <= 0) return;

    clearInterval(timer);
    atsSound.pause();
    atsSound.currentTime = 0;

    timer = setInterval(() => {
        timeLeft--;
        updateDisplay(timeLeft);

        if (timeLeft <= 0) {
            clearInterval(timer);
            atsSound.play(); // 時間切れで「キンコン」開始
            alert("動作未確認！ブレーキをかけてください！");
        }
    }, 1000);
});

document.getElementById('stopBtn').addEventListener('click', () => {
    clearInterval(timer);
    atsSound.pause(); // 音を止める（ATS確認ボタンのイメージ）
});

function updateDisplay(seconds) {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    display.innerText = `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
}
