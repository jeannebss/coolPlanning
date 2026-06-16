# 🎯 CoolPlanning

An all-in-one personal planning app, built with React + Vite.

---

## ✨ Features

### 📅 Daily view
- Tasks with categories, priorities and score coefficients
- Configurable daily score system (×1, ×2, ×3)
- Bonus tasks ⭐ (don't count toward the main score)
- Hourly scheduling with timeline view
- Link tasks to projects and courses
- Subtasks, notes and recurring tasks
- Daily journal + mood tracker
- Auto-carry of unfinished tasks to the next day

### 🗓 Habits
- Customisable **daily** and **weekly** habits
- Streaks 🔥 and 12-week heatmap
- Drag & drop to reorder

### 📅 Month
- Up to 3 monthly priorities

### 📌 To-Do (Backlog)
- Ideas to schedule for later
- Quick scheduling to any day
- Grouped by category

### 📊 History & 📈 Analytics
- Monthly calendar with visual indicators
- Completion charts, 90-day score, habit heatmap
- Streaks, best day of the week, breakdown by category

### 🎓 Courses
- Attendance tracking by week and time slot
- Deadlines (exams, assignments, projects, orals) with checklists

### 📁 Projects & 🍽️ Recipes
- Projects with deadlines, task linking and archiving
- Recipe library with meal planning

### 🎬 Movies & Series
- Watchlist with movies/series, reorder by drag & drop
- Check off when seen — moves to a collapsible "Seen" history

### 💰 Budget
- One-off expenses by category, recurring & fixed contributions
- Family member contributions, shared-expense reimbursements
- Currency conversion and budget alerts

### ⏱ Pomodoro
- 25/5 min timer with automatic focus time logging

---

## ⌨️ Keyboard shortcuts

| Key | Action |
|-----|--------|
| `/` or `Ctrl+K` | Global search |
| `N` | Quick add |
| `Ctrl+Z` | Undo last deletion |
| `1` – `9` | Navigate between tabs |
| `Esc` | Close modals |

---

## 🚀 Getting started

```bash
npm install
npm run dev
```

The app runs on `http://localhost:5173` by default.

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
│   ├── App.jsx        # Components, logic and styles (all-in-one)
│   ├── index.css
│   └── main.jsx
├── .gitignore
├── eslint.config.js
├── index.html
├── package.json
└── vite.config.js
```

---

## 💾 Data

- Auto-save to `localStorage`
- Optional sync via `POST /api/save` and `GET /api/load`
- Export as **JSON**, **CSV** or **PDF**
- JSON import

---

## 🛠 Stack

- **React 19** + **Vite**
- Vanilla CSS-in-JS (zero UI dependencies)
- Web Audio API for sounds
- Native browser notifications