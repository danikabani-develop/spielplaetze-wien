<<<<<<< HEAD
# spielplaetze-wien

This template should help get you started developing with Vue 3 in Vite.

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

## Customize configuration

See [Vite Configuration Reference](https://vite.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Compile and Minify for Production

```sh
npm run build
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```
=======
# 🎠 Spielplätze in Wien entdecken

Diese Webanwendung ermöglicht das einfache Auffinden von Spielplätzen in Wien auf Basis von Open Government-Daten.  
Nutzer:innen können einen Wiener Bezirk auswählen und erhalten eine gefilterte Übersicht aller dort vorhandenen Spielplätze – inklusive interaktiver Kartenansicht.

---

## 🔍 Überblick

Das Projekt lädt Spielplatzdaten aus einer offiziellen GeoJSON-Datei und filtert sie nach Bezirksauswahl.  
Die Daten werden übersichtlich dargestellt – sowohl in Kartenform (pro Spielplatz) als auch auf einer interaktiven Leaflet-Karte mit automatischem Zoom.  
Die Anwendung verwendet die visuelle Pattern Library der Stadt Wien für ein stimmiges Design.

---

## ✨ Features

- Auswahl eines Wiener Bezirks über Dropdown
- Filterung der Spielplätze aus einer GeoJSON-Datei
- Darstellung als kompakte Karten mit:
  - Anlagenname
  - Spielplatz-Details
- Anzahl der gefilterten Spielplätze wird angezeigt
- Leaflet-Karte mit:
  - Marker pro Spielplatz
  - Automatischer Zoom auf den gewählten Bezirk
- Einheitliches, responsives Layout mit flexibler Höhe
- Design nach Wien Pattern Library

---

## 📦 Verwendete Technologien

| Technologie         | Einsatzgebiet                                     |
|---------------------|---------------------------------------------------|
| Vue.js              | Struktur & Logik der Anwendung                    |
| Leaflet.js          | Interaktive Karte mit Marker                      |
| HTML & CSS          | Grundstruktur & responsives Layout                |
| Wien Pattern Library| Visuelles Design nach Vorgaben der Stadt Wien    |
| GeoJSON             | Spielplatzdaten aus dem Open Data Portal         |

---

## 📂 Projektstruktur

```
spielplaetze-wien/
├── public/
│   └── spielplaetze.json        # Spielplatzdaten im GeoJSON-Format
├── src/
│   ├── App.vue                  # Hauptkomponente
│   └── main.js                  # Einstiegspunkt für Vue
├── package.json                 # Projektkonfiguration
├── README.md                    # Diese Dokumentation
├── vite.config.js               # (falls Vite verwendet wird)
```

---

## 🗂️ Datenquelle

Spielplatzdaten stammen aus dem offiziellen Open Government Data Portal:  
📎 [https://www.data.gv.at/katalog/dataset/bd8b518b-d812-46f9-b367-4c1b660cfc99](https://www.data.gv.at/katalog/dataset/bd8b518b-d812-46f9-b367-4c1b660cfc99)

Die GeoJSON-Datei wurde lokal eingebunden als `public/spielplaetze.json`.

---

## 🚀 Lokale Ausführung

```bash
npm install
npm run dev
```

➡ Danach ist die Anwendung erreichbar unter `http://localhost:5173` (oder je nach Umgebung).

---

## 🌍 Deployment

Du kannst die Anwendung mit einem statischen Hosting-Service wie **Netlify**, **GitHub Pages** oder einem Webserver veröffentlichen.  
Die Anwendung besteht aus reinen Frontend-Dateien und kann direkt als statische Site gehostet werden.

---

## 🙋 Autor

**Daniel – Wien, 2025**  
Feedback und Anregungen gerne via GitHub Issues oder Pull Requests.
>>>>>>> 57010b294bfdcdf9bb36dad5a934e077ba1d940d
