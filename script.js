const timeDisplay = document.getElementById('timeDisplay');
const progressFill = document.getElementById('progressFill');
const progressText = document.getElementById('progressText');
const waterFill = document.getElementById('waterFill');
const statusBadge = document.getElementById('statusBadge');

const minutesInput = document.getElementById('minutesInput');
const startButton = document.getElementById('startButton');
const pauseButton = document.getElementById('pauseButton');
const resetButton = document.getElementById('resetButton');

const youtubeInput = document.getElementById('youtubeInput');
const spotifyInput = document.getElementById('spotifyInput');
const youtubeAnchor = document.getElementById('youtubeAnchor');
const spotifyAnchor = document.getElementById('spotifyAnchor');
const saveLinksButton = document.getElementById('saveLinksButton');

let totalSeconds = 180;
let remainingSeconds = 180;
let timerId = null;
let isRunning = false;

function formatTime(value) {
  const minutes = Math.floor(value / 60);
  const seconds = value % 60;
  return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

function readDurationSeconds() {
  const minutes = Math.max(1, Math.min(30, Number(minutesInput.value) || 3));
  minutesInput.value = minutes;
  return minutes * 60;
}

function setStatus(text) {
  statusBadge.textContent = text;
}

function render() {
  timeDisplay.textContent = formatTime(remainingSeconds);

  const progress = totalSeconds <= 0
    ? 0
    : ((totalSeconds - remainingSeconds) / totalSeconds) * 100;

  const clampedProgress = Math.max(0, Math.min(100, progress));
  progressFill.style.width = `${clampedProgress}%`;
  waterFill.style.height = `${clampedProgress}%`;
  progressText.textContent = `${Math.round(clampedProgress)}% gefüllt`;
}

function resetState() {
  totalSeconds = readDurationSeconds();
  remainingSeconds = totalSeconds;
  render();
}

function stopTimer() {
  if (timerId) {
    clearInterval(timerId);
    timerId = null;
  }
  isRunning = false;
}

function startTimer() {
  if (isRunning) {
    return;
  }

  if (remainingSeconds <= 0) {
    resetState();
  }

  isRunning = true;
  setStatus('Läuft');

  timerId = setInterval(() => {
    remainingSeconds -= 1;
    render();

    if (remainingSeconds <= 0) {
      remainingSeconds = 0;
      render();
      stopTimer();
      setStatus('Fertig');
    }
  }, 1000);
}

function pauseTimer() {
  if (!isRunning) {
    return;
  }
  stopTimer();
  setStatus('Pausiert');
}

function resetTimer() {
  stopTimer();
  resetState();
  setStatus('Bereit');
}

function updateMusicLinks() {
  const youtubeUrl = youtubeInput.value.trim();
  const spotifyUrl = spotifyInput.value.trim();

  if (youtubeUrl) {
    youtubeAnchor.href = youtubeUrl;
  }

  if (spotifyUrl) {
    spotifyAnchor.href = spotifyUrl;
  }

  const previousStatus = statusBadge.textContent;
  setStatus('Links gespeichert');
  window.setTimeout(() => {
    if (!isRunning) {
      setStatus(previousStatus === 'Läuft' ? 'Bereit' : previousStatus);
    }
  }, 1400);
}

startButton.addEventListener('click', startTimer);
pauseButton.addEventListener('click', pauseTimer);
resetButton.addEventListener('click', resetTimer);
saveLinksButton.addEventListener('click', updateMusicLinks);

minutesInput.addEventListener('change', () => {
  if (!isRunning) {
    resetState();
    setStatus('Bereit');
  }
});

resetState();
setStatus('Bereit');
