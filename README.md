# Green Guest – Shower Song of the Day

Diese Mini-Webseite ist fertig für GitHub Pages.

## Ordnerstruktur

```text
green-guest-shower-song/
├── index.html
├── styles.css
├── script.js
└── assets/
    ├── brand-card.jpg
    └── logo-variants.jpg
```

## So nutzt du die Seite mit GitHub

### Variante A – neues Repository nur für diese Seite

1. Neues GitHub-Repository erstellen, z. B. `green-guest-shower-song`
2. Alle Dateien aus diesem Ordner in das Root-Verzeichnis des Repositories hochladen
3. In GitHub auf **Settings > Pages** gehen
4. Unter **Build and deployment** auswählen:
   - **Source:** Deploy from a branch
   - **Branch:** `main`
   - **Folder:** `/ (root)`
5. Speichern

Deine Seite ist dann normalerweise unter dieser URL erreichbar:

```text
https://DEIN-GITHUB-NAME.github.io/green-guest-shower-song/
```

---

### Variante B – bestehendes Repository verwenden

Lege die Dateien in diesen Pfad:

```text
docs/shower-song/
```

Dann sieht die Struktur so aus:

```text
DEIN-REPO/
└── docs/
    └── shower-song/
        ├── index.html
        ├── styles.css
        ├── script.js
        └── assets/
            ├── brand-card.jpg
            └── logo-variants.jpg
```

In GitHub Pages:

- **Source:** Deploy from a branch
- **Branch:** `main`
- **Folder:** `/docs`

URL:

```text
https://DEIN-GITHUB-NAME.github.io/DEIN-REPO/shower-song/
```

## Lokal testen

Einfach `index.html` im Browser öffnen.

## Inhalte anpassen

### Musiklinks
In der Seite können YouTube- und Spotify-Links direkt im Formular geändert werden.

### Timerdauer
Die Minuten lassen sich im Zahlenfeld anpassen.

## CI-Hinweis

Die Gestaltung orientiert sich an den bereitgestellten Green-Guest-Informationen:
- Montserrat für Fließtext
- Unna für elegante Headlines
- warme Beige-Hintergründe
- dunkles Grün und Gold als Premium-Akzente
- ruhige Hospitality-/Sustainability-Anmutung
