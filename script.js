const youtubeInput = document.getElementById('youtubeInput');
const spotifyInput = document.getElementById('spotifyInput');
const youtubeAnchor = document.getElementById('youtubeAnchor');
const spotifyAnchor = document.getElementById('spotifyAnchor');
const applyLinksBtn = document.getElementById('applyLinksBtn');
const resetSongBtn = document.getElementById('resetSongBtn');

const startBtn = document.getElementById('startBtn');
const pauseBtn = document.getElementById('pauseBtn');
const resetBtn = document.getElementById('resetBtn');

const timeDisplay = document.getElementById('timeDisplay');
const timerStatus = document.getElementById('timerStatus');
const progressText = document.getElementById('progressText');
const waterFill = document.getElementById('waterFill');
const progressBarFill = document.getElementById('progressBarFill');
const videoStatus = document.getElementById('videoStatus');
const videoDurationText = document.getElementById('videoDurationText');

const DEFAULT_YOUTUBE_URL = 'https://www.youtube.com/watch?v=dQw4w9WgXcQ';
const DEFAULT_SPOTIFY_URL = 'https://open.spotify.com/track/4cOdK2wGLETKBW3PvgPWqT';
const DEFAULT_VIDEO_ID = 'dQw4w9WgXcQ';

let player = null;
let currentVideoId = DEFAULT_VIDEO_ID;
let totalSeconds = 0;
let remainingSeconds = 0;
let timerId = null;
let isRunning = false;
let durationReady = false;

function formatTime(seconds) {
  if (!Number.isFinite(seconds) || seconds < 0) return '--:--';
  const hrs = Math.floor(seconds / 3600);
  const mins = Math.floor((seconds % 3600) / 60);
  const secs = Math.floor(seconds % 60);

  if (hrs > 0) {
    return `${String(hrs).padStart(2, '0')}:${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  }

  return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
}

function updateVisualProgress() {
  const progress = totalSeconds > 0 ? ((totalSeconds - remainingSeconds) / totalSeconds) * 100 : 0;
  const safeProgress = Math.max(0, Math.min(100, progress));

  waterFill.style.height = `${safeProgress}%`;
  progressBarFill.style.width = `${safeProgress}%`;
  progressText.textContent = `${Math.round(safeProgress)}% gefüllt`;
  timeDisplay.textContent = formatTime(remainingSeconds);
}

function clearTimerInterval() {
  if (timerId) {
    window.clearInterval(timerId);
    timerId = null;
  }
}

function stopPlayback() {
  if (player && typeof player.pauseVideo === 'function') {
    player.pauseVideo();
  }
}

function syncDurationFromPlayer() {
  if (!player || typeof player.getDuration !== 'function') return;
  const duration = Math.floor(player.getDuration());

  if (!duration || duration <= 0) {
    durationReady = false;
    totalSeconds = 0;
    remainingSeconds = 0;
    videoDurationText.textContent = '--:--';
    videoStatus.textContent = 'Dauer konnte noch nicht gelesen werden';
    timerStatus.textContent = 'Videodauer wird geladen';
    updateVisualProgress();
    return;
  }

  durationReady = true;
  totalSeconds = duration;
  remainingSeconds = duration;
  videoDurationText.textContent = formatTime(duration);
  videoStatus.textContent = 'Videolänge erfolgreich erkannt';
  timerStatus.textContent = 'Bereit zum Start';
  updateVisualProgress();
}

function resetTimer({ keepStatus = false } = {}) {
  clearTimerInterval();
  isRunning = false;
  stopPlayback();

  if (durationReady) {
    remainingSeconds = totalSeconds;
    if (!keepStatus) timerStatus.textContent = 'Bereit zum Start';
  } else {
    remainingSeconds = 0;
    if (!keepStatus) timerStatus.textContent = 'Videodauer wird geladen';
  }

  updateVisualProgress();
}

function startTimer() {
  if (!durationReady) {
    timerStatus.textContent = 'Bitte kurz warten, bis die Videodauer geladen ist';
    return;
  }

  if (isRunning) return;

  if (remainingSeconds <= 0) {
    remainingSeconds = totalSeconds;
    updateVisualProgress();
  }

  isRunning = true;
  timerStatus.textContent = 'Timer läuft';

  if (player && typeof player.playVideo === 'function') {
    player.seekTo(totalSeconds - remainingSeconds, true);
    player.playVideo();
  }

  clearTimerInterval();
  timerId = window.setInterval(() => {
    if (remainingSeconds > 0) {
      remainingSeconds -= 1;
      updateVisualProgress();
    }

    if (remainingSeconds <= 0) {
      clearTimerInterval();
      isRunning = false;
      remainingSeconds = 0;
      updateVisualProgress();
      timerStatus.textContent = 'Song beendet';
      stopPlayback();
    }
  }, 1000);
}

function pauseTimer() {
  if (!isRunning) return;
  isRunning = false;
  clearTimerInterval();
  stopPlayback();
  timerStatus.textContent = 'Timer pausiert';
}

function extractYouTubeVideoId(url) {
  if (!url) return null;

  try {
    const parsed = new URL(url);

    if (parsed.hostname.includes('youtu.be')) {
      const idFromPath = parsed.pathname.replace(/^\//, '').split('/')[0];
      return idFromPath || null;
    }

    if (parsed.searchParams.get('v')) {
      return parsed.searchParams.get('v');
    }

    if (parsed.pathname.includes('/embed/')) {
      const parts = parsed.pathname.split('/embed/');
      return parts[1]?.split('/')[0] || null;
    }

    if (parsed.pathname.includes('/shorts/')) {
      const parts = parsed.pathname.split('/shorts/');
      return parts[1]?.split('/')[0] || null;
    }
  } catch (error) {
    return null;
  }

  return null;
}

function applyLinks() {
  const youtubeUrl = youtubeInput.value.trim() || DEFAULT_YOUTUBE_URL;
  const spotifyUrl = spotifyInput.value.trim() || DEFAULT_SPOTIFY_URL;
  const parsedId = extractYouTubeVideoId(youtubeUrl);

  youtubeAnchor.href = youtubeUrl;
  spotifyAnchor.href = spotifyUrl;

  if (!parsedId) {
    videoStatus.textContent = 'Ungültiger YouTube-Link';
    timerStatus.textContent = 'Bitte gültigen YouTube-Link eingeben';
    return;
  }

  currentVideoId = parsedId;
  durationReady = false;
  totalSeconds = 0;
  remainingSeconds = 0;
  updateVisualProgress();
  videoDurationText.textContent = '--:--';
  videoStatus.textContent = 'Neues Video wird geladen …';
  timerStatus.textContent = 'Videodauer wird geladen';
  resetTimer({ keepStatus: true });

  if (player && typeof player.loadVideoById === 'function') {
    player.loadVideoById({ videoId: currentVideoId, startSeconds: 0 });
    player.pauseVideo();
  }
}

function setDefaults() {
  youtubeInput.value = DEFAULT_YOUTUBE_URL;
  spotifyInput.value = DEFAULT_SPOTIFY_URL;
  applyLinks();
}

window.onYouTubeIframeAPIReady = function onYouTubeIframeAPIReady() {
  player = new YT.Player('youtubePlayer', {
    videoId: currentVideoId,
    playerVars: {
      rel: 0,
      modestbranding: 1,
      playsinline: 1
    },
    events: {
      onReady: () => {
        youtubeAnchor.href = DEFAULT_YOUTUBE_URL;
        spotifyAnchor.href = DEFAULT_SPOTIFY_URL;
        youtubeInput.value = DEFAULT_YOUTUBE_URL;
        spotifyInput.value = DEFAULT_SPOTIFY_URL;
        videoStatus.textContent = 'Video geladen';
        window.setTimeout(syncDurationFromPlayer, 600);
      },
      onStateChange: (event) => {
        if (event.data === YT.PlayerState.CUED || event.data === YT.PlayerState.PAUSED || event.data === YT.PlayerState.PLAYING) {
          window.setTimeout(syncDurationFromPlayer, 300);
        }
      },
      onError: () => {
        durationReady = false;
        totalSeconds = 0;
        remainingSeconds = 0;
        videoDurationText.textContent = '--:--';
        videoStatus.textContent = 'Video konnte nicht geladen werden';
        timerStatus.textContent = 'Bitte anderen YouTube-Link verwenden';
        updateVisualProgress();
      }
    }
  });
};

applyLinksBtn.addEventListener('click', applyLinks);
resetSongBtn.addEventListener('click', setDefaults);
startBtn.addEventListener('click', startTimer);
pauseBtn.addEventListener('click', pauseTimer);
resetBtn.addEventListener('click', () => resetTimer());

timeDisplay.textContent = '--:--';
progressText.textContent = '0% gefüllt';
