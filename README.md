# 🎯 CoolPlanning

Une app de planning personnel tout-en-un, construite en React + Vite.

---

## ✨ Fonctionnalités

### 📅 Journée
- Tâches avec catégories, priorités et coefficients de score
- Système de score journalier configurable (×1, ×2, ×3)
- Tâches bonus ⭐ (ne comptent pas dans le score principal)
- Planification horaire avec vue timeline
- Liaison aux objectifs de la semaine, projets et cours
- Sous-tâches, notes et récurrence
- Journal du jour + humeur
- Auto-report des tâches non faites au lendemain

### 🗓 Habitudes
- Habitudes **quotidiennes** et **hebdomadaires** personnalisables
- Streaks 🔥 et heatmap 12 semaines
- Drag & drop pour réordonner

### 📅 Mois
- 3 priorités mensuelles max
- Suivi de la progression hebdomadaire

### 📌 To-Do (Backlog)
- Liste d'idées à planifier plus tard
- Planification rapide vers n'importe quel jour
- Groupement par catégorie

### 📊 Historique & 📈 Analyse
- Calendrier mensuel avec indicateurs visuels
- Graphiques de complétion, score 90 jours, heatmap habitudes
- Streaks, meilleur jour de la semaine, répartition par catégorie

### 🎓 Cours
- Suivi de présence par semaine et créneau
- Échéances (examens, rendus, projets, oraux) avec checklist

### 📁 Projets & 🍽️ Recettes
- Projets avec deadline, liaison aux tâches, archivage
- Bibliothèque de recettes avec planification des repas

### ⏱ Pomodoro
- Timer 25/5 min avec log automatique du temps de focus

---

## ⌨️ Raccourcis clavier

| Touche | Action |
|--------|--------|
| `/` ou `Ctrl+K` | Recherche globale |
| `N` | Ajout rapide |
| `Ctrl+Z` | Annuler la dernière suppression |
| `1` – `9` | Naviguer entre les onglets |
| `Échap` | Fermer les modales |

---

## 🚀 Installation

```bash
npm install
npm run dev
```

L'app tourne sur `http://localhost:5173` par défaut.

---

## 📂 Structure

```
coolplanning/
├── public/
│   ├── favicon.svg
│   └── icons.svg
├── src/
│   ├── assets/
│   │   ├── hero.png
│   │   ├── react.svg
│   │   └── vite.svg
│   ├── App.css
│   ├── App.jsx        # Composants, logique, styles (tout-en-un)
│   ├── index.css
│   └── main.jsx
├── .gitignore
├── eslint.config.js
├── index.html
├── package.json
└── vite.config.js
```

---

## 💾 Données

- Sauvegarde automatique dans `localStorage`
- Sync optionnelle via `POST /api/save` et `GET /api/load`
- Export **JSON**, **CSV** et **PDF**
- Import JSON

---

## 🛠 Stack

- **React 18** + **Vite**
- CSS-in-JS vanilla (zéro dépendance UI)
- Web Audio API pour les sons
- Notifications navigateur natives