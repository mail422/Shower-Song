/*
  ==========================================================
  GREEN GUEST – SHOWER SONG CONFIG
  ÄNDERE NUR DIESE ZWEI LINKS, WENN DU EINEN NEUEN SONG WILLST.
  Besucher der Seite können diese Links nicht bearbeiten.
  ==========================================================
*/
const SONG_CONFIG = {
  youtubeUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
  spotifyUrl: 'https://open.spotify.com/track/4cOdK2wGLETKBW3PvgPWqT',
};

/*
  Es gibt keinen einzelnen weltweit einheitlichen offiziellen Durchschnittswert
  für Duschwasser pro Sekunde. Diese Demo nutzt 10,0 L/min als realistischen
  Standardwert für eine konventionelle Dusche.
*/
const SHOWER_FLOW_LITERS_PER_MINUTE = 8.5;
const SHOWER_FLOW_LITERS_PER_SECOND = SHOWER_FLOW_LITERS_PER_MINUTE / 60;

const youtubeButton = document.getElementById('youtubeButton');
const spotifyButton = document.getElementById('spotifyButton');
const playbackState = document.getElementById('playbackState');
const timeDisplay = document.getElementById('timeDisplay');
const totalDurationLabel = document.getElementById('totalDurationLabel');
const progressLabel = document.getElementById('progressLabel');
const progressFill = document.getElementById('progressFill');
const waterFill = document.getElementById('waterFill');
const litersUsed = document.getElementById('litersUsed');
const litersSaved = document.getElementById('litersSaved');
const flowRateLabel = document.getElementById('flowRateLabel');
const startBtn = document.getElementById('startBtn');
const pauseBtn = document.getElementById('pauseBtn');
const resetBtn = document.getElementById('resetBtn');

let player;
let uiTimer = null;
let totalSeconds = 0;
let currentSeconds = 0;
let isManualMode = false;
let manualAnimationFrame = null;
let manualLastTick = null;

flowRateLabel.textContent = `${formatNumber(SHOWER_FLOW_LITERS_PER_MINUTE)} L/min`;
youtubeButton.href = SONG_CONFIG.youtubeUrl;
spotifyButton.href = SONG_CONFIG.spotifyUrl;

function extractYouTubeVideoId(url) {
  try {
    const parsed = new URL(url);
    if (parsed.hostname.includes('youtu.be')) {
      return parsed.pathname.replace('/', '');
    }
    if (parsed.searchParams.get('v')) {
      return parsed.searchParams.get('v');
    }
    const pathParts = parsed.pathname.split('/').filter(Boolean);
    const embedIndex = pathParts.indexOf('embed');
    if (embedIndex !== -1 && pathParts[embedIndex + 1]) {
      return pathParts[embedIndex + 1];
    }
  } catch (error) {
    console.error('Ungültige YouTube-URL:', error);
  }
  return '';
}

function formatTime(total) {
  const safeTotal = Math.max(0, Math.floor(total));
  const minutes = Math.floor(safeTotal / 60);
  const seconds = safeTotal % 60;
  return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

function formatNumber(value) {
  return value.toLocaleString('de-DE', {
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  });
}

function setStateLabel(label) {
  playbackState.textContent = label;
}

function syncFromYouTube() {
  if (!player || typeof player.getDuration !== 'function') return;

  const duration = Number(player.getDuration()) || 0;
  const current = Number(player.getCurrentTime()) || 0;

  if (duration > 0) {
    totalSeconds = duration;
    totalDurationLabel.textContent = formatTime(duration);
  }

  currentSeconds = Math.min(current, totalSeconds || current);
  updateUI();
}

function updateUI() {
  const playedSeconds = Math.max(0, currentSeconds);
  const remainingSeconds = Math.max(0, totalSeconds - playedSeconds);
  const progressPercent = totalSeconds > 0 ? (playedSeconds / totalSeconds) * 100 : 0;

  timeDisplay.textContent = formatTime(playedSeconds);
  progressLabel.textContent = `${Math.round(progressPercent)}%`;
  progressFill.style.width = `${progressPercent}%`;
  waterFill.style.height = `${progressPercent}%`;

  const usedLiters = playedSeconds * SHOWER_FLOW_LITERS_PER_SECOND;
  const saveableLiters = remainingSeconds * SHOWER_FLOW_LITERS_PER_SECOND;

  litersUsed.textContent = `${formatNumber(usedLiters)} L`;
  litersSaved.textContent = `${formatNumber(saveableLiters)} L`;
}

function startUiPolling() {
  stopUiPolling();
  uiTimer = window.setInterval(syncFromYouTube, 200);
}

function stopUiPolling() {
  if (uiTimer) {
    clearInterval(uiTimer);
    uiTimer = null;
  }
}

function stopManualLoop() {
  if (manualAnimationFrame) {
    cancelAnimationFrame(manualAnimationFrame);
    manualAnimationFrame = null;
  }
  manualLastTick = null;
}

function runManualLoop(timestamp) {
  if (!manualLastTick) manualLastTick = timestamp;
  const deltaSeconds = (timestamp - manualLastTick) / 1000;
  manualLastTick = timestamp;

  currentSeconds = Math.min(currentSeconds + deltaSeconds, totalSeconds || currentSeconds + deltaSeconds);
  updateUI();

  if (currentSeconds >= totalSeconds && totalSeconds > 0) {
    setStateLabel('Beendet');
    stopManualLoop();
    return;
  }

  manualAnimationFrame = requestAnimationFrame(runManualLoop);
}

function startManualMode() {
  isManualMode = true;
  stopUiPolling();
  stopManualLoop();

  if (!totalSeconds && player && typeof player.getDuration === 'function') {
    totalSeconds = Number(player.getDuration()) || 0;
    totalDurationLabel.textContent = totalSeconds > 0 ? formatTime(totalSeconds) : 'unbekannt';
  }

  setStateLabel('Manuell läuft');
  manualAnimationFrame = requestAnimationFrame(runManualLoop);
}

function pauseManualMode() {
  isManualMode = true;
  stopManualLoop();
  setStateLabel('Manuell pausiert');
}

function resetAll() {
  stopManualLoop();
  stopUiPolling();
  isManualMode = false;
  currentSeconds = 0;
  updateUI();
  setStateLabel('Bereit');

  if (player && typeof player.pauseVideo === 'function') {
    player.pauseVideo();
    player.seekTo(0, true);
    syncFromYouTube();
  }
}

window.onYouTubeIframeAPIReady = function onYouTubeIframeAPIReady() {
  const videoId = extractYouTubeVideoId(SONG_CONFIG.youtubeUrl);

  player = new YT.Player('player', {
    videoId,
    playerVars: {
      autoplay: 0,
      controls: 1,
      rel: 0,
      modestbranding: 1,
      playsinline: 1,
    },
    events: {
      onReady: handlePlayerReady,
      onStateChange: handlePlayerStateChange,
    },
  });
};

function handlePlayerReady() {
  syncFromYouTube();
  setStateLabel('Bereit');
}

function handlePlayerStateChange(event) {
  const state = event.data;

  if (state === YT.PlayerState.PLAYING) {
    isManualMode = false;
    stopManualLoop();
    startUiPolling();
    setStateLabel('Video läuft');
    syncFromYouTube();
    return;
  }

  if (state === YT.PlayerState.PAUSED) {
    stopUiPolling();
    syncFromYouTube();
    setStateLabel('Video pausiert');
    return;
  }

  if (state === YT.PlayerState.ENDED) {
    stopUiPolling();
    syncFromYouTube();
    currentSeconds = totalSeconds;
    updateUI();
    setStateLabel('Beendet');
    return;
  }

  if (state === YT.PlayerState.BUFFERING) {
    setStateLabel('Lädt');
  }
}

startBtn.addEventListener('click', () => {
  if (player && typeof player.getPlayerState === 'function') {
    const currentState = player.getPlayerState();
    if (currentState === YT.PlayerState.PAUSED || currentState === YT.PlayerState.CUED) {
      player.playVideo();
      return;
    }
  }
  startManualMode();
});

pauseBtn.addEventListener('click', () => {
  if (!isManualMode && player && typeof player.pauseVideo === 'function') {
    player.pauseVideo();
    return;
  }
  pauseManualMode();
});

resetBtn.addEventListener('click', resetAll);
updateUI();
