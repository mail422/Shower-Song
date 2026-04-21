# Green Guest – Shower Song Page

## Ordnerstruktur für GitHub

Für ein eigenes Repository:

```text
/
├── index.html
├── styles.css
├── script.js
└── assets/
    ├── brand-card.jpg
    └── logo-variants.jpg
```

Für ein bestehendes Repository empfohlen:

```text
docs/
└── shower-song/
    ├── index.html
    ├── styles.css
    ├── script.js
    └── assets/
        ├── brand-card.jpg
        └── logo-variants.jpg
```

## GitHub Pages aktivieren

1. Dateien hochladen
2. In GitHub auf **Settings > Pages**
3. **Deploy from a branch** wählen
4. Branch **main** auswählen
5. Ordner **/docs** oder **/(root)** auswählen

## Song ändern

Öffne `script.js` und ändere nur diesen Block ganz oben:

```js
const SONG_CONFIG = {
  youtubeUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
  spotifyUrl: 'https://open.spotify.com/track/4cOdK2wGLETKBW3PvgPWqT',
};
```

## Hinweis zu YouTube-Werbung

Normale YouTube-Einbettungen können Werbung nicht zuverlässig deaktivieren.
Der Timer ist deshalb an den tatsächlichen Wiedergabestatus des Players gekoppelt.
