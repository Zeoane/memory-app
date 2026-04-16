# Memory App

## Deutsch

### Voraussetzungen

- Node.js (empfohlen: aktuelle LTS-Version)
- npm

### Installation

```bash
npm install
```

### Projekt starten (Entwicklung)

```bash
npm run dev
```

Danach die angezeigte lokale URL im Browser öffnen (z. B. `http://localhost:5173/`).

### Build (Produktion)

```bash
npm run build
```

Das Ergebnis liegt anschließend im Ordner `dist/`.

### Build lokal testen (Preview)

```bash
npm run preview
```

### Spiel starten (im UI)

- **Starten**: Auf der Startseite „Play“ klicken → Einstellungen wählen → „Start“.
- **Neue Runde**: Im Game-Over-Dialog „Neue Runde“.
- **Einstellungen**: Im Game-Over-Dialog „Einstellungen“ bzw. „Back to start“ (je nach Theme).

### Projektstruktur (Kurzüberblick)

- `index.html`, `main.ts`, `style.scss`: Einstieg und globale Styles (Root-Ebene)
- `src/app/`: App-Bootstrap und Rendering
- `src/features/`: Feature-Module (z. B. `home`, `settings`, `game`)
- `src/shared/`: geteilte Utilities (Templates, Escaping)
- `public/templates/`: HTML-Templates (zur Laufzeit geladen)

---

## English

### Prerequisites

- Node.js (recommended: latest LTS)
- npm

### Install

```bash
npm install
```

### Start (development)

```bash
npm run dev
```

Open the printed local URL in your browser (e.g. `http://localhost:5173/`).

### Build (production)

```bash
npm run build
```

The output will be in `dist/`.

### Preview the build locally

```bash
npm run preview
```

### Start the game (in the UI)

- **Start**: On the home screen click “Play” → choose settings → “Start”.
- **New round**: In the game-over dialog click “Neue Runde”.
- **Settings**: In the game-over dialog click “Einstellungen” / “Back to start” (theme-dependent).

### Project structure (quick overview)

- `index.html`, `main.ts`, `style.scss`: entry files and global styles (project root)
- `src/app/`: app bootstrap + render loop
- `src/features/`: feature modules (e.g. `home`, `settings`, `game`)
- `src/shared/`: shared utilities (templates, escaping)
- `public/templates/`: HTML templates (loaded at runtime)

