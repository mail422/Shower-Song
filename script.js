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
  für Duschwasser pro Sekunde. Diese Demo nutzt 8,5 L/min als realistischen
  Standardwert für eine konventionelle Dusche.
*/
const SHOWER_FLOW_LITERS_PER_MINUTE = 8.5;
const SHOWER_FLOW_LITERS_PER_SECOND = SHOWER_FLOW_LITERS_PER_MINUTE / 60;

/*
  ==========================================================
  ÜBERSETZUNGEN
  ==========================================================
*/
const translations = {
  de: {
    eyebrow: '',
    heroTitle: '🚿 Shower Song of the Day',
    heroSubtitle: 'Spiele den hinterlegten Song ab und verfolge live deinen Wasserverbrauch und wie viel Wasser du gespart hast.',
    songPreviewTitle: 'Song-Vorschau',
    openYoutube: 'YouTube öffnen',
    openSpotify: 'Spotify öffnen',
    smallNote: 'Der Timer folgt automatisch dem YouTube-Video. Für externes Abspielen, z. B. über Spotify, kannst du die manuellen Buttons darunter verwenden.',
    showerTimerTitle: 'Shower Timer',
    statusReady: 'Bereit',
    statusVideoPlaying: 'Video läuft',
    statusVideoPaused: 'Video pausiert',
    statusManualRunning: 'Manuell läuft',
    statusManualPaused: 'Manuell pausiert',
    statusEnded: 'Beendet',
    statusLoading: 'Lädt',
    videoDurationLabel: 'Videodauer:',
    loadingDuration: 'wird geladen …',
    unknownDuration: 'unbekannt',
    waterUsedLabel: 'Verbraucht',
    waterSaveableLabel: 'Noch einsparbar',
    averageLabel: 'Durchschnitt',
    songProgressLabel: 'Song-Fortschritt',
    startBtn: 'Start',
    pauseBtn: 'Pause',
    resetBtn: 'Reset',
    litersPerMinute: '{value} L/min',
    progressPercent: '{value}%',
  },
  en: {
    eyebrow: '',
    heroTitle: '🚿 Shower Song of the Day',
    heroSubtitle: 'Play the selected song and track your water usage live, including how much water you have saved.',
    songPreviewTitle: 'Song Preview',
    openYoutube: 'Open YouTube',
    openSpotify: 'Open Spotify',
    smallNote: 'The timer follows the YouTube video automatically. For external playback, for example via Spotify, you can use the manual buttons below.',
    showerTimerTitle: 'Shower Timer',
    statusReady: 'Ready',
    statusVideoPlaying: 'Video playing',
    statusVideoPaused: 'Video paused',
    statusManualRunning: 'Manual mode running',
    statusManualPaused: 'Manual mode paused',
    statusEnded: 'Finished',
    statusLoading: 'Loading',
    videoDurationLabel: 'Video duration:',
    loadingDuration: 'loading …',
    unknownDuration: 'unknown',
    waterUsedLabel: 'Used',
    waterSaveableLabel: 'Still saveable',
    averageLabel: 'Average',
    songProgressLabel: 'Song Progress',
    startBtn: 'Start',
    pauseBtn: 'Pause',
    resetBtn: 'Reset',
    litersPerMinute: '{value} L/min',
    progressPercent: '{value}%',
  },
  fr: {
    eyebrow: '',
    heroTitle: '🚿 Chanson de douche du jour',
    heroSubtitle: 'Lancez la chanson sélectionnée et suivez en direct votre consommation d’eau ainsi que la quantité économisée.',
    songPreviewTitle: 'Aperçu de la chanson',
    openYoutube: 'Ouvrir YouTube',
    openSpotify: 'Ouvrir Spotify',
    smallNote: 'Le minuteur suit automatiquement la vidéo YouTube. Pour une lecture externe, par exemple via Spotify, vous pouvez utiliser les boutons manuels ci-dessous.',
    showerTimerTitle: 'Minuteur de douche',
    statusReady: 'Prêt',
    statusVideoPlaying: 'Vidéo en lecture',
    statusVideoPaused: 'Vidéo en pause',
    statusManualRunning: 'Mode manuel en cours',
    statusManualPaused: 'Mode manuel en pause',
    statusEnded: 'Terminé',
    statusLoading: 'Chargement',
    videoDurationLabel: 'Durée de la vidéo :',
    loadingDuration: 'chargement …',
    unknownDuration: 'inconnue',
    waterUsedLabel: 'Consommé',
    waterSaveableLabel: 'Encore économisable',
    averageLabel: 'Moyenne',
    songProgressLabel: 'Progression de la chanson',
    startBtn: 'Démarrer',
    pauseBtn: 'Pause',
    resetBtn: 'Réinitialiser',
    litersPerMinute: '{value} L/min',
    progressPercent: '{value}%',
  }
};

/*
  ==========================================================
  SPRACHE
  ==========================================================
*/
const savedLanguage = localStorage.getItem('showerSongLanguage');

let currentLanguage = 'de';

if (savedLanguage) {
  currentLanguage = savedLanguage;
} else {
  const browserLang = navigator.language.toLowerCase();

  if (browserLang.startsWith('fr')) {
    currentLanguage = 'fr';
  } else if (browserLang.startsWith('en')) {
    currentLanguage = 'en';
  } else {
    currentLanguage = 'de';
  }
}

function t(key, vars = {}) {
  let text = translations[currentLanguage]?.[key] ?? translations.de[key] ?? key;

  Object.keys(vars).forEach((varKey) => {
    text = text.replace(`{${varKey}}`, vars[varKey]);
  });

  return text;
}

function setLanguage(lang) {
  currentLanguage = lang;
  localStorage.setItem('showerSongLanguage', lang);
  applyTranslations();
}

function updateLanguageButtons() {
  document.querySelectorAll('.lang-btn').forEach((btn) => {
    btn.classList.toggle('active', btn.dataset.lang === currentLanguage);
  });
}

function applyTranslations() {
  document.documentElement.lang = currentLanguage;

  document.querySelectorAll('[data-i18n]').forEach((element) => {
    const key = element.dataset.i18n;
    element.textContent = t(key);
  });

  updateDynamicLabels();
  updateLanguageButtons();
}

/*
  ==========================================================
  DOM ELEMENTE
  ==========================================================
*/
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

/*
  ==========================================================
  INITIAL SETUP
  ==========================================================
*/
youtubeButton.href = SONG_CONFIG.youtubeUrl;
spotifyButton.href = SONG_CONFIG.spotifyUrl;

document.querySelectorAll('.lang-btn').forEach((btn) => {
  btn.addEventListener('click', () => {
    setLanguage(btn.dataset.lang);
  });
});

/*
  ==========================================================
  HELFER
  ==========================================================
*/
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
  return value.toLocaleString(currentLanguage === 'fr' ? 'fr-FR' : currentLanguage === 'en' ? 'en-US' : 'de-DE', {
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  });
}

function setStateLabel(key) {
  playbackState.textContent = t(key);
}

function updateDynamicLabels() {
  flowRateLabel.textContent = t('litersPerMinute', {
    value: formatNumber(SHOWER_FLOW_LITERS_PER_MINUTE),
  });

  const progressPercent = totalSeconds > 0 ? Math.round((currentSeconds / totalSeconds) * 100) : 0;
  progressLabel.textContent = t('progressPercent', {
    value: progressPercent,
  });

  if (totalSeconds > 0) {
    totalDurationLabel.textContent = formatTime(totalSeconds);
  } else {
    totalDurationLabel.textContent = t('loadingDuration');
  }
}

/*
  ==========================================================
  YOUTUBE SYNC + UI
  ==========================================================
*/
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
  progressFill.style.width = `${progressPercent}%`;
  waterFill.style.height = `${progressPercent}%`;

  const usedLiters = playedSeconds * SHOWER_FLOW_LITERS_PER_SECOND;
  const saveableLiters = remainingSeconds * SHOWER_FLOW_LITERS_PER_SECOND;

  litersUsed.textContent = `${formatNumber(usedLiters)} L`;
  litersSaved.textContent = `${formatNumber(saveableLiters)} L`;

  updateDynamicLabels();
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

/*
  ==========================================================
  MANUELLER TIMER
  ==========================================================
*/
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
    setStateLabel('statusEnded');
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
    totalDurationLabel.textContent = totalSeconds > 0 ? formatTime(totalSeconds) : t('unknownDuration');
  }

  setStateLabel('statusManualRunning');
  manualAnimationFrame = requestAnimationFrame(runManualLoop);
}

function pauseManualMode() {
  isManualMode = true;
  stopManualLoop();
  setStateLabel('statusManualPaused');
}

function resetAll() {
  stopManualLoop();
  stopUiPolling();
  isManualMode = false;
  currentSeconds = 0;
  updateUI();
  setStateLabel('statusReady');

  if (player && typeof player.pauseVideo === 'function') {
    player.pauseVideo();
    player.seekTo(0, true);
    syncFromYouTube();
  }
}

/*
  ==========================================================
  YOUTUBE PLAYER
  ==========================================================
*/
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
  setStateLabel('statusReady');
}

function handlePlayerStateChange(event) {
  const state = event.data;

  if (state === YT.PlayerState.PLAYING) {
    isManualMode = false;
    stopManualLoop();
    startUiPolling();
    setStateLabel('statusVideoPlaying');
    syncFromYouTube();
    return;
  }

  if (state === YT.PlayerState.PAUSED) {
    stopUiPolling();
    syncFromYouTube();
    setStateLabel('statusVideoPaused');
    return;
  }

  if (state === YT.PlayerState.ENDED) {
    stopUiPolling();
    syncFromYouTube();
    currentSeconds = totalSeconds;
    updateUI();
    setStateLabel('statusEnded');
    return;
  }

  if (state === YT.PlayerState.BUFFERING) {
    setStateLabel('statusLoading');
  }
}

/*
  ==========================================================
  BUTTON EVENTS
  ==========================================================
*/
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

/*
  ==========================================================
  START
  ==========================================================
*/
applyTranslations();
updateUI();
setStateLabel('statusReady');
