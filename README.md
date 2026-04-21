# Green Guest – Shower Song of the Day

## Inhalt
- `index.html`
- `styles.css`
- `script.js`
- `assets/brand-card.jpg`
- `assets/logo-variants.jpg`

## Was angepasst wurde
- Timer läuft auf Basis der Länge des hinterlegten YouTube-Videos
- unteres Brand-Note-Fenster wurde entfernt
- kein Hinweis auf Luxury oder einzelne Markenschichten
- Green-Guest-CI mit Farben und Typografie umgesetzt

## Empfohlener GitHub-Pfad
### Variante A – eigenes Repository
Dateien direkt in das Root des Repositories legen:

```text
my-shower-song-page/
├── index.html
├── styles.css
├── script.js
└── assets/
    ├── brand-card.jpg
    └── logo-variants.jpg
```

### Variante B – bestehendes Repository
Dateien in diesen Pfad legen:

```text
docs/shower-song/
├── index.html
├── styles.css
├── script.js
└── assets/
    ├── brand-card.jpg
    └── logo-variants.jpg
```

## GitHub Pages aktivieren
1. Repository auf GitHub öffnen
2. `Settings` → `Pages`
3. Unter `Build and deployment` auswählen:
   - `Deploy from a branch`
4. Branch auswählen:
   - `main`
5. Ordner auswählen:
   - `/root`, wenn die Dateien direkt im Repo liegen
   - `/docs`, wenn die Dateien in `docs/shower-song/` liegen
6. Speichern

## Beispiel-URL
### Falls die Dateien direkt im Repo liegen
```text
https://DEIN-GITHUB-NAME.github.io/REPO-NAME/
```

### Falls die Dateien in `docs/shower-song/` liegen
```text
https://DEIN-GITHUB-NAME.github.io/REPO-NAME/shower-song/
```

## Wichtiger Hinweis zur Videodauer
Die automatische Dauer kommt aus dem eingebetteten YouTube-Player. Dafür muss die Seite online laufen oder lokal im Browser geöffnet werden und Zugriff auf YouTube haben.
