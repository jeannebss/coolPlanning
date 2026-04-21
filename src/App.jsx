import { useState, useEffect, useRef } from "react";

// ── Constants ─────────────────────────────────────────────────────────────────

const CATEGORIES = [
  { id: "pro",    label: "Travail",        color: "#818cf8", lcolor: "#4338ca" },
  { id: "perso",  label: "Personnel",      color: "#fb923c", lcolor: "#c2410c" },
  { id: "sport",  label: "Sport",          color: "#34d399", lcolor: "#047857" },
  { id: "maison", label: "Maison",         color: "#f472b6", lcolor: "#9d174d" },
  { id: "admin",  label: "Administratif",  color: "#38bdf8", lcolor: "#0369a1" },
  { id: "autre",  label: "Autre",          color: "#c084fc", lcolor: "#6d28d9" },
];
const CAT_ICONS = { pro:"💼", perso:"📚", sport:"🏃", maison:"🏠", admin:"🗂️", autre:"✨" };
const PRIORITIES = [
  { id:"high", label:"Haute",   color:"#f87171", lcolor:"#b91c1c" },
  { id:"mid",  label:"Moyenne", color:"#f97316", lcolor:"#c2410c" },
  { id:"low",  label:"Basse",   color:"#34d399", lcolor:"#047857" },
];
const DAYS_FR   = ["Lundi","Mardi","Mercredi","Jeudi","Vendredi","Samedi","Dimanche"];
const MONTHS_FR = ["Janvier","Février","Mars","Avril","Mai","Juin","Juillet","Août","Septembre","Octobre","Novembre","Décembre"];

const WEEKLY_HABITS = [
  { id:"exemple", text:"Ajoute tes habitudes hebdomadaires ici", icon:"🏃" },
];
const DAILY_HABITS = [
  { id:"exemple",     text:"Ajoute tes habitudes journalières ici",    icon:"💧" },
];
const EXAM_TYPES = [
  { id:"exam",   label:"Examen",  color:"#f87171", emoji:"📋" },
  { id:"rendu",  label:"Rendu",   color:"#f97316", emoji:"📤" },
  { id:"projet", label:"Projet",  color:"#a78bfa", emoji:"💡" },
  { id:"oral",   label:"Oral",    color:"#38bdf8", emoji:"🎤" },
  { id:"quiz",   label:"Quiz",    color:"#34d399", emoji:"✏️" },
];
const COURSE_COLORS = ["#818cf8","#f472b6","#34d399","#f97316","#38bdf8","#a78bfa","#fb923c","#4ade80","#60a5fa","#c084fc","#fbbf24","#2dd4bf"];
const TIMETABLE_TYPES = ["Cours","Exercices","TP","Séminaire","Projet"];
const LEVEL_COLORS = { 1:"#34d399", 2:"#f97316", 3:"#f87171" };
const SCORE_TARGET = 8;
const SCORE_MIN_L3 = 2;
const SCORE_MIN_L2 = 0;
const SCORE_MIN_L1 = 0;

// ── Themes ────────────────────────────────────────────────────────────────────

const THEME = {
  dark: {
    isDark:true,
    bg:"#08080f", bgImg:"radial-gradient(ellipse 800px 600px at -10% -5%,rgba(139,92,246,0.1) 0%,transparent 60%),radial-gradient(ellipse 600px 500px at 110% 110%,rgba(56,189,248,0.06) 0%,transparent 60%)",
    glass:"rgba(8,8,20,0.87)", glassBdr:"rgba(255,255,255,0.07)", card:"rgba(255,255,255,0.03)", cardBdr:"rgba(255,255,255,0.08)",
    divider:"rgba(255,255,255,0.07)", text:"#e2e8f0", textSub:"#64748b", textDim:"#334155", textTiny:"#1e293b",
    inp:"rgba(255,255,255,0.05)", inpBdr:"rgba(255,255,255,0.1)", sel:"rgba(255,255,255,0.06)",
    statCard:"linear-gradient(145deg,rgba(255,255,255,0.05),rgba(255,255,255,0.02))", statBdr:"rgba(255,255,255,0.09)",
    habitBg:"rgba(255,255,255,0.04)", progressBg:"rgba(255,255,255,0.06)", filterActive:"rgba(139,92,246,0.15)",
    filterBdr:"rgba(255,255,255,0.08)", presetBg:"rgba(255,255,255,0.04)", weekCtxBg:"rgba(255,255,255,0.03)",
    tagDone:"rgba(52,211,153,0.1)", tagDoneBdr:"rgba(52,211,153,0.25)", tagBg:"rgba(255,255,255,0.04)", tagBdr:"rgba(255,255,255,0.06)",
    sideActiveBg:"rgba(139,92,246,0.14)", sideActiveTxt:"#c4b5fd", sideTxt:"#64748b",
    monthSlot:"rgba(255,255,255,0.04)", monthSlotBdr:"rgba(255,255,255,0.07)", monthEmpty:"rgba(255,255,255,0.02)", monthEmptyBdr:"rgba(255,255,255,0.04)",
    orb1:"rgba(139,92,246,0.06)", orb2:"rgba(56,189,248,0.04)", checkboxBdr:"rgba(255,255,255,0.18)", delColor:"#475569", themeIcon:"☀️",
  },
  light: {
    isDark:false,
    bg:"#f1f5f9", bgImg:"radial-gradient(ellipse 800px 600px at -10% -5%,rgba(139,92,246,0.06) 0%,transparent 60%),radial-gradient(ellipse 600px 500px at 110% 110%,rgba(56,189,248,0.04) 0%,transparent 60%)",
    glass:"rgba(255,255,255,0.9)", glassBdr:"rgba(0,0,0,0.08)", card:"rgba(255,255,255,0.8)", cardBdr:"rgba(0,0,0,0.07)",
    divider:"rgba(0,0,0,0.07)", text:"#0f172a", textSub:"#374151", textDim:"#4b5563", textTiny:"#9ca3af",
    inp:"rgba(0,0,0,0.04)", inpBdr:"rgba(0,0,0,0.1)", sel:"rgba(0,0,0,0.04)",
    statCard:"linear-gradient(145deg,rgba(255,255,255,0.95),rgba(255,255,255,0.75))", statBdr:"rgba(0,0,0,0.08)",
    habitBg:"rgba(0,0,0,0.02)", progressBg:"rgba(0,0,0,0.07)", filterActive:"rgba(139,92,246,0.1)",
    filterBdr:"rgba(0,0,0,0.08)", presetBg:"rgba(0,0,0,0.02)", weekCtxBg:"rgba(0,0,0,0.03)",
    tagDone:"rgba(52,211,153,0.12)", tagDoneBdr:"rgba(52,211,153,0.3)", tagBg:"rgba(0,0,0,0.03)", tagBdr:"rgba(0,0,0,0.07)",
    sideActiveBg:"rgba(139,92,246,0.1)", sideActiveTxt:"#7c3aed", sideTxt:"#64748b",
    monthSlot:"rgba(0,0,0,0.03)", monthSlotBdr:"rgba(0,0,0,0.07)", monthEmpty:"rgba(0,0,0,0.01)", monthEmptyBdr:"rgba(0,0,0,0.04)",
    orb1:"rgba(139,92,246,0.04)", orb2:"rgba(56,189,248,0.03)", checkboxBdr:"rgba(0,0,0,0.18)", delColor:"#94a3b8", themeIcon:"🌙",
  },
};

// ── CSS ───────────────────────────────────────────────────────────────────────

const makeCSS = () => `
  * { box-sizing:border-box; }
  body { margin:0; }

  @keyframes fadeUp  { from{opacity:0;transform:translateY(12px)} to{opacity:1;transform:translateY(0)} }
  @keyframes fadeIn  { from{opacity:0} to{opacity:1} }
  @keyframes checkIn { 0%{transform:scale(0) rotate(-15deg);opacity:0} 60%{transform:scale(1.3) rotate(5deg)} 100%{transform:scale(1) rotate(0);opacity:1} }
  @keyframes flamePulse { 0%,100%{transform:rotate(-4deg) scale(1);filter:brightness(1)} 50%{transform:rotate(4deg) scale(1.2);filter:brightness(1.3)} }
  @keyframes orbFloat { 0%,100%{transform:translate(0,0) scale(1)} 33%{transform:translate(30px,-20px) scale(1.05)} 66%{transform:translate(-20px,15px) scale(0.97)} }
  @keyframes themeFlip { 0%{transform:rotate(0) scale(1)} 50%{transform:rotate(180deg) scale(0.8)} 100%{transform:rotate(360deg) scale(1)} }
  @keyframes slideUp { from{transform:translateY(20px);opacity:0} to{transform:translateY(0);opacity:1} }
  @keyframes toastIn { from{transform:translateX(-50%) translateY(16px);opacity:0} to{transform:translateX(-50%) translateY(0);opacity:1} }
  @keyframes pomoPulse  { 0%,100%{box-shadow:0 0 0 0 rgba(139,92,246,0.4)} 50%{box-shadow:0 0 0 8px rgba(139,92,246,0)} }
  @keyframes breakPulse { 0%,100%{box-shadow:0 0 0 0 rgba(52,211,153,0.4)}  50%{box-shadow:0 0 0 8px rgba(52,211,153,0)} }
  @keyframes doingPulse { 0%,100%{box-shadow:0 0 0 0 rgba(249,115,22,0.55)} 50%{box-shadow:0 0 0 7px rgba(249,115,22,0)} }
  .doing-ring{animation:doingPulse 1.8s ease-in-out infinite}

  ::-webkit-scrollbar{width:3px} ::-webkit-scrollbar-track{background:transparent} ::-webkit-scrollbar-thumb{background:rgba(139,92,246,0.22);border-radius:4px} ::-webkit-scrollbar-thumb:hover{background:rgba(139,92,246,0.5)}
  input,select{outline:none}
  input:focus{border-color:rgba(139,92,246,0.7)!important;box-shadow:0 0 0 3px rgba(139,92,246,0.12)!important}
  select:focus{border-color:rgba(139,92,246,0.7)!important}
  textarea{outline:none;font-family:inherit}
  textarea:focus{border-color:rgba(139,92,246,0.7)!important;box-shadow:0 0 0 3px rgba(139,92,246,0.12)!important}

  :root{--hi:rgba(139,92,246,0.08);--hs:rgba(139,92,246,0.10);--hc:rgba(139,92,246,0.28);--hh:rgba(139,92,246,0.07)}
  [data-theme="light"]{--hi:rgba(139,92,246,0.06);--hs:rgba(139,92,246,0.08);--hc:rgba(139,92,246,0.2);--hh:rgba(139,92,246,0.05)}

  .fu{animation:fadeUp 0.24s ease both}
  .fi{animation:fadeIn 0.3s ease both}
  .sc{transition:transform 0.22s ease,box-shadow 0.22s ease}
  .sc:hover{transform:translateY(-4px) scale(1.01);box-shadow:0 16px 48px rgba(0,0,0,0.4)!important}
  .gc{transition:border-color 0.2s}
  .gc:hover{border-color:var(--hc)!important}
  .ir{transition:background 0.15s;border-radius:10px}
  .ir:hover{background:var(--hi)!important}
  .hr{transition:transform 0.15s ease,border-color 0.15s,background 0.15s;cursor:pointer}
  .hr:hover{transform:translateX(5px);border-color:rgba(139,92,246,0.45)!important;background:var(--hh)!important}
  .bg{transition:all 0.18s ease}
  .bg:hover{transform:translateY(-2px);box-shadow:0 10px 32px rgba(139,92,246,0.55)!important;filter:brightness(1.1)}
  .bg:active{transform:scale(0.96)}
  .bt{transition:all 0.15s ease}
  .bt:hover{background:rgba(139,92,246,0.14)!important;color:#c4b5fd!important;border-color:rgba(139,92,246,0.4)!important}
  .sb{transition:background 0.15s,color 0.15s,padding-left 0.15s}
  .sb:hover{background:var(--hs)!important;color:#a78bfa!important;padding-left:22px!important}
  .pb{transition:width 0.9s cubic-bezier(0.4,0,0.2,1)}
  .ck{transition:transform 0.2s ease}
  .ck:hover{transform:scale(1.12)}
  .db{transition:all 0.15s;opacity:0.3}
  .db:hover{opacity:1!important;color:#f87171!important;transform:scale(1.1)}
  .pi{transition:all 0.15s}
  .pi:hover{background:rgba(139,92,246,0.1)!important;border-color:rgba(139,92,246,0.35)!important;transform:translateX(2px)}
  .fp{transition:all 0.15s}
  .fp:hover{border-color:rgba(139,92,246,0.5)!important;color:#c4b5fd!important}
  .fl{animation:flamePulse 2.2s ease-in-out infinite;display:inline-block}
  .orb{animation:orbFloat 12s ease-in-out infinite;pointer-events:none}
  .orb2{animation:orbFloat 16s ease-in-out infinite reverse;pointer-events:none}
  .tspin{animation:themeFlip 0.4s ease}

  .drag-over{outline:2px dashed rgba(139,92,246,0.5)!important;background:rgba(139,92,246,0.05)!important}

  @media (max-width:768px){
    #app-root{flex-direction:column!important}
    #sidebar{width:100%!important;height:auto!important;flex-direction:row!important;flex-shrink:0;overflow-x:auto;overflow-y:hidden!important;border-right:none!important;border-bottom:1px solid rgba(255,255,255,0.07);padding:0}
    #sidebar .side-header{display:none!important}
    #sidebar .side-section-label{display:none!important}
    #sidebar .day-list{display:none!important}
    #sidebar .side-progress{display:none!important}
    #sidebar .tab-list{display:flex!important;flex-direction:row!important;padding:6px 8px;gap:4px;overflow-x:auto}
    #sidebar .tab-list button{flex-shrink:0;flex-direction:column!important;padding:6px 10px!important;font-size:11px!important;gap:2px!important;align-items:center!important;border-radius:10px!important}
    #main-content{padding:8px!important}
    #main-header{padding:10px 14px!important}
    .card-mobile{padding:10px!important}
    .sc{padding:10px!important}
    .goal-item-text{font-size:12px!important}
    input,select,textarea{font-size:12px!important}
    [data-statgrid]{grid-template-columns:repeat(2,1fr)!important}
  }
`;

// ── Utils ─────────────────────────────────────────────────────────────────────

function localDate(isoStr) { return new Date(isoStr + "T12:00:00"); }
function dateToKey(d) { return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,"0")}-${String(d.getDate()).padStart(2,"0")}`; }
function getWeekKey(d = new Date()) {
  const day = d.getDay() || 7;
  const mon = new Date(d); mon.setDate(d.getDate() - day + 1);
  return dateToKey(mon);
}
function getMonthKey(d = new Date()) { return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,"0")}`; }
function getTodayKey() { return dateToKey(new Date()); }
function prevDayKey(dk) { const d = localDate(dk); d.setDate(d.getDate() - 1); return dateToKey(d); }
// recale n'importe quelle date au lundi de sa semaine
function toMonday(d) { const r = new Date(d); r.setDate(r.getDate() - ((r.getDay()+6)%7)); return r; }
function getWeekDays(wk) {
  return Array.from({ length:7 }, (_, i) => {
    const d = localDate(wk); d.setDate(d.getDate() + i);
    return dateToKey(d);
  });
}
function getWeekLabel(key) {
  const s = localDate(key), e = localDate(key); e.setDate(e.getDate() + 6);
  const fmt = d => d.toLocaleDateString("fr-FR", { day:"2-digit", month:"short" });
  return `${fmt(s)} – ${fmt(e)}`;
}
function load() { try { return JSON.parse(localStorage.getItem("goalsAppV2") || "{}"); } catch { return {}; } }
function save(d) {
  try { localStorage.setItem("goalsAppV2", JSON.stringify(d)); } catch {}
  fetch("/api/save", { method:"POST", headers:{"Content-Type":"application/json"}, body:JSON.stringify(d) }).catch(()=>{});
}
async function loadFromFile() {
  try {
    const res = await fetch("/api/load");
    if (!res.ok) return null;
    const text = await res.text();
    if (!text || text === "{}") return null;
    return JSON.parse(text);
  } catch { return null; }
}
function uid() { return Date.now().toString(36) + Math.random().toString(36).slice(2); }
function catCol(id, t) { const c=CATEGORIES.find(x=>x.id===id); return c ? (t?.isDark===false ? c.lcolor : c.color) : "#888"; }
function priCol(id, t) { const p=PRIORITIES.find(x=>x.id===id); return p ? (t?.isDark===false ? p.lcolor : p.color) : "#888"; }
function pc(p, t) {
  if (t?.isDark===false) return p>=75 ? "#047857" : p>=50 ? "#c2410c" : "#b91c1c";
  return p>=75 ? "#34d399" : p>=50 ? "#f97316" : "#f87171";
}

function computeWeekStreak(habitId, hData, curWk) {
  let s = 0; let d = localDate(curWk);
  while ((hData?.weeks?.[dateToKey(d)]?.done||[]).includes(habitId)) { s++; d.setDate(d.getDate()-7); }
  return s;
}
function computeDayStreak(habitId, hData, from) {
  let s = 0; let d = localDate(from);
  while ((hData?.days?.[dateToKey(d)]?.done||[]).includes(habitId)) { s++; d.setDate(d.getDate()-1); }
  return s;
}
function playDone(soundOn) {
  if (!soundOn) return;
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    [[523,0],[659,0.1],[784,0.2]].forEach(([freq,when]) => {
      const o = ctx.createOscillator(), g = ctx.createGain();
      o.connect(g); g.connect(ctx.destination);
      o.frequency.value = freq; o.type = "sine";
      g.gain.setValueAtTime(0.15, ctx.currentTime + when);
      g.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + when + 0.3);
      o.start(ctx.currentTime + when); o.stop(ctx.currentTime + when + 0.3);
    });
  } catch {}
}
function playTimerEnd(soundOn) {
  if (!soundOn) return;
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    [[523,0],[659,0.12],[784,0.24],[1047,0.38]].forEach(([freq,when]) => {
      const o = ctx.createOscillator(), g = ctx.createGain();
      o.connect(g); g.connect(ctx.destination);
      o.frequency.value = freq; o.type = "sine";
      g.gain.setValueAtTime(0.2, ctx.currentTime + when);
      g.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + when + 0.55);
      o.start(ctx.currentTime + when); o.stop(ctx.currentTime + when + 0.6);
    });
  } catch {}
}
function generatePDFHtml(data) {
  const today = new Date().toLocaleDateString("fr-FR",{weekday:"long",day:"numeric",month:"long",year:"numeric"});
  const allDayGoals = Object.values(data.days||{}).flatMap(d=>d.goals||[]);
  const totalTasks = allDayGoals.length, doneTasks = allDayGoals.filter(g=>g.done).length;
  const journalEntries = Object.entries(data.journal||{}).filter(([,tx])=>tx.trim()).sort(([a],[b])=>b.localeCompare(a)).slice(0,30);
  const reviews = Object.entries(data.weekReviews||{}).filter(([,r])=>r.q1||r.q2||r.q3||r.q4).sort(([a],[b])=>b.localeCompare(a)).slice(0,10);
  const esc = s => String(s||"").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;");
  return `<!DOCTYPE html><html lang="fr"><head><meta charset="UTF-8"><title>CoolPlanning — Export</title>
<style>body{font-family:Georgia,serif;max-width:800px;margin:40px auto;padding:0 20px;color:#1a1a2e;font-size:14px;line-height:1.7}h1{color:#6d28d9;font-size:28px;margin-bottom:4px}.sub{color:#666;margin-bottom:32px;font-size:13px}h2{color:#5b21b6;font-size:18px;margin-top:36px;border-bottom:2px solid #ede9fe;padding-bottom:8px}h3{color:#7c3aed;font-size:15px;margin:20px 0 8px}.stats{display:flex;gap:20px;flex-wrap:wrap;margin:16px 0}.stat{background:#f5f3ff;border-radius:10px;padding:12px 18px;text-align:center}.sv{font-size:28px;font-weight:800;color:#6d28d9}.sl{font-size:11px;color:#666}.entry{margin:16px 0;padding:14px 18px;background:#fafaf9;border-radius:8px;border-left:3px solid #8b5cf6}.ed{font-size:11px;color:#888;font-weight:600;text-transform:uppercase;margin-bottom:6px}.et{white-space:pre-wrap;color:#333}.review{margin:16px 0;padding:14px 18px;background:#fff7ed;border-radius:8px;border-left:3px solid #f97316}.ql{font-size:11px;font-weight:700;color:#f97316;margin-bottom:4px;margin-top:10px}.qt{color:#333;font-size:13px;white-space:pre-wrap}@media print{body{margin:20px}}</style>
</head><body>
<h1>🎯 CoolPlanning</h1><div class="sub">Export du ${esc(today)}</div>
<h2>📊 Statistiques</h2><div class="stats"><div class="stat"><div class="sv">${totalTasks}</div><div class="sl">Tâches totales</div></div><div class="stat"><div class="sv">${doneTasks}</div><div class="sl">Accomplies</div></div><div class="stat"><div class="sv">${totalTasks>0?Math.round(doneTasks/totalTasks*100):0}%</div><div class="sl">Taux</div></div><div class="stat"><div class="sv">${journalEntries.length}</div><div class="sl">Entrées journal</div></div></div>
${journalEntries.length?`<h2>📝 Journal</h2>${journalEntries.map(([dk,tx])=>`<div class="entry"><div class="ed">${new Date(dk+"T12:00:00").toLocaleDateString("fr-FR",{weekday:"long",day:"numeric",month:"long",year:"numeric"})}</div><div class="et">${esc(tx)}</div></div>`).join("")}`:""}
${reviews.length?`<h2>📋 Résumés de semaine</h2>${reviews.map(([wk,r])=>`<div class="review"><h3>Semaine du ${new Date(wk+"T12:00:00").toLocaleDateString("fr-FR",{day:"2-digit",month:"long",year:"numeric"})}</h3>${r.q1?`<div class="ql">🏆 Accompli</div><div class="qt">${esc(r.q1)}</div>`:""}${r.q2?`<div class="ql">✅ Ce qui a marché</div><div class="qt">${esc(r.q2)}</div>`:""}${r.q3?`<div class="ql">🔄 À faire différemment</div><div class="qt">${esc(r.q3)}</div>`:""}${r.q4?`<div class="ql">🎯 Priorité suivante</div><div class="qt">${esc(r.q4)}</div>`:""}</div>`).join("")}`:""}
</body></html>`;
}

// ── Styles factory ────────────────────────────────────────────────────────────

function mkS(t) {
  return {
    input:    { background:t.inp, border:`1px solid ${t.inpBdr}`, borderRadius:10, padding:"9px 14px", color:t.text, fontSize:13, width:"100%", boxSizing:"border-box" },
    sel:      { background:t.sel, border:`1px solid ${t.inpBdr}`, borderRadius:10, padding:"9px 12px", color:t.text, fontSize:12, cursor:"pointer" },
    addBtn:   { background:"linear-gradient(135deg,#8b5cf6,#7c3aed)", border:"none", borderRadius:10, padding:"9px 18px", color:"#fff", fontWeight:700, fontSize:13, cursor:"pointer", whiteSpace:"nowrap", boxShadow:"0 4px 16px rgba(139,92,246,0.35)" },
    card:     { background:t.card, border:`1px solid ${t.cardBdr}`, borderRadius:16, backdropFilter:"blur(20px)", WebkitBackdropFilter:"blur(20px)" },
    cardHead: { padding:"14px 20px", borderBottom:`1px solid ${t.divider}`, display:"flex", alignItems:"center", justifyContent:"space-between" },
    cardTitle:{ fontSize:13, fontWeight:600, color:t.textSub, margin:0, letterSpacing:"0.3px" },
    badge:    c => ({ fontSize:10, padding:"2px 8px", borderRadius:20, background:c+"18", color:c, fontWeight:600, border:"1px solid "+c+"30" }),
    goalItem: done => ({ display:"flex", flexDirection:"column", borderRadius:10, marginBottom:3, background:done?"rgba(52,211,153,0.05)":"transparent", transition:"background 0.2s,border 0.2s" }),
    delBtn:   { background:"none", border:"none", color:t.delColor, cursor:"pointer", fontSize:13, padding:"2px 5px" },
    sideBtn:  a => ({ display:"flex", alignItems:"center", gap:9, width:"100%", padding:"9px 16px", borderRadius:8, border:"none", cursor:"pointer", background:a?t.sideActiveBg:"transparent", color:a?t.sideActiveTxt:t.sideTxt, fontSize:13, textAlign:"left", fontWeight:a?600:400, marginBottom:1 }),
    iconBtn:  { width:34, height:34, borderRadius:10, border:`1px solid`, borderColor:"transparent", background:"transparent", fontSize:15, cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", transition:"all 0.15s" },
  };
}

// ── GoalItem ──────────────────────────────────────────────────────────────────

function GoalItem({ goal, idx, onToggle, onRemove, onUpdate, onReorder, showPendingBadge, isWeekGoal, isDay, onAddSubtask, onToggleSubtask, onRemoveSubtask, weekGoals, onLink, projects, courses, t, s }) {
  const [editing,     setEditing]     = useState(false);
  const [editText,    setEditText]    = useState(goal.text);
  const [showNote,    setShowNote]    = useState(false);
  const [noteText,    setNoteText]    = useState(goal.note || "");
  const [dragOver,    setDragOver]    = useState(false);
  const [showSubs,    setShowSubs]    = useState(false);
  const [subText,     setSubText]     = useState("");
  const [addingSub,   setAddingSub]   = useState(false);
  const [showLinkDd,  setShowLinkDd]  = useState(false);
  const [showTime,    setShowTime]    = useState(false);
  const [editTime,    setEditTime]    = useState(goal.startTime || "");
  const [editDur,     setEditDur]     = useState(String(goal.duration || 30));
  const [showProj,    setShowProj]    = useState(false);
  const [showCourse,    setShowCourse]    = useState(false);
  const linkDdRef  = useRef(null);
  useEffect(() => {
    if (!showLinkDd) return;
    const h = e => { if (linkDdRef.current && !linkDdRef.current.contains(e.target)) setShowLinkDd(false); };
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, [showLinkDd]);


  const c = CATEGORIES.find(x => x.id === goal.cat);
  const p = PRIORITIES.find(x => x.id === goal.priority);
  const pendingDays = showPendingBadge && goal.createdAt && !goal.done && !goal.doing
    ? Math.round((new Date(getTodayKey()+"T12:00:00") - new Date(goal.createdAt+"T12:00:00")) / 86400000)
    : 0;
  const elapsedMin = goal.doing && !goal.done ? (goal.pomodoroMins || 0) : 0;

  const commitEdit = () => { if (editText.trim()) onUpdate({ text: editText.trim() }); setEditing(false); };

  return (
    <div
      draggable
      onDragStart={e => e.dataTransfer.setData("text/plain", String(idx))}
      onDragOver={e => { e.preventDefault(); setDragOver(true); }}
      onDragLeave={() => setDragOver(false)}
      onDrop={e => { e.preventDefault(); setDragOver(false); const from = +e.dataTransfer.getData("text/plain"); if (from !== idx) onReorder(from, idx); }}
      className="fu"
      style={{ ...s.goalItem(goal.done), background: goal.doing&&!goal.done?"rgba(249,115,22,0.05)":"", border: goal.doing&&!goal.done?"1px solid rgba(249,115,22,0.18)":"", borderRadius: goal.doing&&!goal.done?10:undefined, outline: dragOver ? "2px dashed rgba(139,92,246,0.5)" : "none", animationDelay:`${idx*0.03}s`, opacity: goal.isBonus&&!goal.done ? 0.78 : 1 }}
    >
      <div style={{ display:"flex", alignItems:"center", gap:8, padding:"7px 10px" }}>
        <span style={{ cursor:"grab", color:t.textTiny, fontSize:13, flexShrink:0, userSelect:"none" }}>⠿</span>
        <Checkbox done={goal.done} doing={goal.doing} color={catCol(goal.cat,t)} t={t} onToggle={onToggle} />
        {editing
          ? <input style={{ ...s.input, flex:1, padding:"4px 8px", fontSize:13, height:28 }}
              value={editText}
              onChange={e => setEditText(e.target.value)}
              onKeyDown={e => { if (e.key==="Enter"||e.key==="Escape") commitEdit(); }}
              onBlur={commitEdit}
              autoFocus />
          : <span
              onDoubleClick={() => { setEditing(true); setEditText(goal.text); }}
              title={goal.text}
              style={{ flex:1, minWidth:0, fontSize:13, color:goal.done?t.textDim:t.text, textDecoration:goal.done?"line-through":"none", cursor:"text", userSelect:"none", overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>
              {goal.text}
            </span>
        }
        <button
          onClick={() => onUpdate({ level: goal.level >= 3 ? null : (goal.level || 0) + 1 })}
          title={goal.level ? `Coefficient ×${goal.level} — cliquer pour changer` : "Définir le coefficient"}
          style={{ background: goal.level ? LEVEL_COLORS[goal.level]+"22" : "transparent", border:`1px solid ${goal.level ? LEVEL_COLORS[goal.level]+"55" : "transparent"}`, borderRadius:6, cursor:"pointer", fontSize:10, fontWeight:800, color: goal.level ? LEVEL_COLORS[goal.level] : t.textTiny, padding:"1px 5px", flexShrink:0, opacity: goal.level ? 1 : 0.3, transition:"all 0.15s", minWidth:22 }}
          onMouseEnter={e=>{ e.currentTarget.style.opacity="1"; if(!goal.level) e.currentTarget.style.border="1px solid rgba(255,255,255,0.15)"; }}
          onMouseLeave={e=>{ e.currentTarget.style.opacity=goal.level?"1":"0.3"; if(!goal.level) e.currentTarget.style.border="1px solid transparent"; }}>
          {goal.level ? `×${goal.level}` : "—"}
        </button>
        <button
          onClick={() => onUpdate({ isBonus: !goal.isBonus })}
          title={goal.isBonus ? "Bonus ⭐ — ne compte pas dans le score" : "Marquer comme bonus"}
          style={{ background:"none", border:"none", cursor:"pointer", fontSize:11, opacity:goal.isBonus ? 0.9 : 0.22, padding:"1px 3px", flexShrink:0, transition:"opacity 0.15s" }}
          onMouseEnter={e=>e.currentTarget.style.opacity="1"}
          onMouseLeave={e=>e.currentTarget.style.opacity=goal.isBonus?"0.9":"0.22"}>⭐</button>
        <button title={goal.recurring ? "Récurrent ✓" : "Récurrent (désactivé)"}
          onClick={() => onUpdate({ recurring: !goal.recurring })}
          style={{ background:"none", border:"none", cursor:"pointer", fontSize:12, opacity:goal.recurring?0.9:0.2, transition:"opacity 0.15s", padding:"1px 3px", color:"#a78bfa", flexShrink:0 }}>🔄</button>
        <button title="Note"
          onClick={() => setShowNote(v => !v)}
          style={{ background:"none", border:"none", cursor:"pointer", fontSize:12, opacity:(goal.note||showNote)?0.9:0.25, transition:"opacity 0.15s", padding:"1px 3px", color:showNote?"#f97316":t.textSub, flexShrink:0 }}>📝</button>
        {(isWeekGoal || isDay) && (
          <button title="Sous-tâches" onClick={() => setShowSubs(v=>!v)}
            style={{ background:"none", border:"none", cursor:"pointer", fontSize:14, opacity:showSubs||goal.subtasks?.length>0?0.9:0.25, color:showSubs?"#38bdf8":t.textSub, padding:"1px 3px", flexShrink:0 }}>⊕</button>
        )}
        {weekGoals && weekGoals.length > 0 && (
          <div ref={linkDdRef} style={{ position:"relative", flexShrink:0 }}>
            {goal.weekGoalId ? (
              <span title={weekGoals.find(wg=>wg.id===goal.weekGoalId)?.text||"Lié"}
                onClick={() => setShowLinkDd(v=>!v)}
                style={{ fontSize:10, padding:"2px 7px", borderRadius:12, background:"rgba(139,92,246,0.18)", color:"#c4b5fd", border:"1px solid rgba(139,92,246,0.4)", cursor:"pointer", userSelect:"none" }}>
                🔗 {(weekGoals.find(wg=>wg.id===goal.weekGoalId)?.text||"").slice(0,20)}
              </span>
            ) : (
              <button title="Lier à un objectif" onClick={() => setShowLinkDd(v=>!v)}
                style={{ background:"none", border:"none", cursor:"pointer", fontSize:13, opacity:0.25, color:t.textSub, padding:"1px 3px" }}>🔗</button>
            )}
            {showLinkDd && (
              <div style={{ position:"absolute", right:0, top:"calc(100% + 4px)", zIndex:200, background:t.glass, border:`1px solid ${t.glassBdr}`, borderRadius:10, backdropFilter:"blur(16px)", WebkitBackdropFilter:"blur(16px)", boxShadow:"0 8px 24px rgba(0,0,0,0.35)", minWidth:180, overflow:"hidden" }}>
                {goal.weekGoalId && (
                  <button onClick={() => { onLink(null); setShowLinkDd(false); }}
                    style={{ display:"block", width:"100%", padding:"8px 12px", background:"transparent", border:"none", cursor:"pointer", color:"#f87171", fontSize:11, textAlign:"left", borderBottom:`1px solid ${t.divider}` }}>
                    ✕ Délier
                  </button>
                )}
                {weekGoals.map(wg => (
                  <button key={wg.id} onClick={() => { onLink(wg.id); setShowLinkDd(false); }}
                    style={{ display:"block", width:"100%", padding:"8px 12px", background:wg.id===goal.weekGoalId?"rgba(139,92,246,0.1)":"transparent", border:"none", cursor:"pointer", color:t.text, fontSize:11, textAlign:"left", borderBottom:`1px solid ${t.divider}` }}
                    onMouseEnter={e=>e.currentTarget.style.background="rgba(139,92,246,0.08)"}
                    onMouseLeave={e=>e.currentTarget.style.background=wg.id===goal.weekGoalId?"rgba(139,92,246,0.1)":"transparent"}>
                    {wg.text.slice(0,35)}{wg.text.length>35?"…":""}
                  </button>
                ))}
              </div>
            )}
          </div>
        )}
        {/* ⏱ Time scheduling (day tasks only) */}
        {isDay && (
          <button onClick={() => { setEditTime(goal.startTime||""); setEditDur(String(goal.duration||30)); setShowTime(v=>!v); }} title="Planifier à une heure"
            style={{ background:"none", border:"none", cursor:"pointer", fontSize:12, opacity:showTime||goal.startTime?0.9:0.22, color:goal.startTime?"#38bdf8":t.textSub, padding:"1px 3px", transition:"opacity 0.15s", flexShrink:0 }}
            onMouseEnter={e=>e.currentTarget.style.opacity="1"} onMouseLeave={e=>e.currentTarget.style.opacity=showTime||goal.startTime?"0.9":"0.22"}>⏱</button>
        )}
        {/* 📁 Project link (day tasks only) */}
        {isDay && projects && projects.length > 0 && (
          <button onClick={()=>setShowProj(v=>!v)} title="Lier à un projet"
            style={{ background:"none", border:"none", cursor:"pointer", fontSize:13, opacity:showProj||goal.projectId?0.9:0.22, color:goal.projectId?(projects.find(p=>p.id===goal.projectId)?.color||t.textSub):t.textSub, padding:"1px 3px", transition:"opacity 0.15s", flexShrink:0 }}
            onMouseEnter={e=>e.currentTarget.style.opacity="1"} onMouseLeave={e=>e.currentTarget.style.opacity=showProj||goal.projectId?"0.9":"0.22"}>📁</button>
        )}
        {/* 🎓 Course link (day tasks only) */}
        {isDay && (() => {
          const linkedCrs = goal.courseId ? courses?.find(c=>c.id===goal.courseId) : null;
          return (
            <button onClick={()=>setShowCourse(v=>!v)} title="Lier à un cours"
              style={{ background:"none", border:"none", cursor:"pointer", fontSize:12, opacity:showCourse||goal.courseId?0.9:0.4, color:linkedCrs?linkedCrs.color:t.textSub, padding:"1px 3px", transition:"opacity 0.15s", flexShrink:0 }}
              onMouseEnter={e=>e.currentTarget.style.opacity="1"} onMouseLeave={e=>{ if(!showCourse&&!goal.courseId) e.currentTarget.style.opacity="0.4"; }}>🎓</button>
          );
        })()}
        {c && <span onClick={() => { const ids=CATEGORIES.map(x=>x.id); const next=ids[(ids.indexOf(goal.cat)+1)%ids.length]; onUpdate({cat:next}); }} title="Changer la catégorie" style={{ ...s.badge(catCol(c.id,t)), cursor:"pointer" }}>{CAT_ICONS[goal.cat]}</span>}
        {p && <span onClick={() => { const ids=PRIORITIES.map(x=>x.id); const next=ids[(ids.indexOf(goal.priority)+1)%ids.length]; onUpdate({priority:next}); }} title="Changer l'importance" style={{ ...s.badge(priCol(p.id,t)), cursor:"pointer" }}>{p.label}</span>}
        {goal.doing && !goal.done && (
          <span className="doing-ring" style={{ fontSize:10, padding:"2px 8px", borderRadius:20, background:"rgba(249,115,22,0.15)", color:"#f97316", border:"1px solid rgba(249,115,22,0.35)", fontWeight:700, whiteSpace:"nowrap", flexShrink:0 }}>
            ▶ {elapsedMin > 0 ? `${elapsedMin} min` : "en cours"}
          </span>
        )}
        {goal.done && goal.elapsedMins > 0 && (
          <span style={{ fontSize:10, padding:"2px 7px", borderRadius:20, background:"rgba(52,211,153,0.12)", color:"#34d399", border:"1px solid rgba(52,211,153,0.3)", fontWeight:600, whiteSpace:"nowrap", flexShrink:0 }}>
            ✓ {goal.elapsedMins} min
          </span>
        )}
        {pendingDays >= 2 && (
          <span title={`En attente depuis ${pendingDays} jour${pendingDays>1?"s":""}`} style={{ fontSize:9, padding:"2px 6px", borderRadius:20, background:"rgba(249,115,22,0.12)", color:"#f97316", border:"1px solid rgba(249,115,22,0.25)", fontWeight:600, whiteSpace:"nowrap", flexShrink:0 }}>
            {pendingDays}j
          </span>
        )}
        {goal.carriedFrom && (
          <span title="Reporté du jour précédent" style={{ fontSize:9, padding:"1px 6px", borderRadius:20, background:"rgba(56,189,248,0.12)", color:"#38bdf8", border:"1px solid rgba(56,189,248,0.25)", whiteSpace:"nowrap", flexShrink:0 }}>↩</span>
        )}
        <button className="db" style={s.delBtn} onClick={onRemove}>✕</button>
      </div>
      {showTime && (
        <div style={{ display:"flex", gap:8, alignItems:"center", padding:"7px 10px 8px", borderTop:`1px solid ${t.divider}`, flexWrap:"wrap" }}>
          <span style={{ fontSize:10, color:"#38bdf8", fontWeight:600, whiteSpace:"nowrap" }}>⏱ Heure :</span>
          <input type="time" value={editTime} onChange={e=>setEditTime(e.target.value)}
            style={{ ...s.input, padding:"3px 7px", fontSize:12, width:110 }} />
          <span style={{ fontSize:10, color:t.textDim, whiteSpace:"nowrap" }}>Durée (min) :</span>
          <input type="number" min="5" step="5" value={editDur} onChange={e=>setEditDur(e.target.value)}
            style={{ ...s.input, padding:"3px 6px", fontSize:12, width:60 }} />
          <button onClick={() => { if (editTime) onUpdate({ startTime:editTime, duration:+editDur }); setShowTime(false); }}
            style={{ padding:"3px 10px", borderRadius:7, border:"none", background:"rgba(56,189,248,0.2)", color:"#38bdf8", cursor:"pointer", fontSize:11, fontWeight:600 }}>✓</button>
          {goal.startTime && (
            <button onClick={() => { onUpdate({ startTime:null, duration:null }); setShowTime(false); }}
              style={{ padding:"3px 8px", borderRadius:7, border:"none", background:"rgba(248,113,113,0.12)", color:"#f87171", cursor:"pointer", fontSize:11 }}>Effacer</button>
          )}
        </div>
      )}
      {showProj && (
        <div style={{ display:"flex", gap:5, padding:"6px 10px 10px", flexWrap:"wrap", borderTop:`1px solid ${t.divider}`, alignItems:"center" }}>
          <span style={{ fontSize:10, color:t.textDim, fontWeight:600 }}>📁 Lier à :</span>
          {goal.projectId && (
            <button onClick={()=>{ onUpdate({projectId:null}); setShowProj(false); }}
              style={{ display:"flex", flexDirection:"column", alignItems:"center", padding:"5px 9px", borderRadius:8, border:"1px solid rgba(248,113,113,0.4)", background:"rgba(248,113,113,0.1)", cursor:"pointer", color:"#f87171", fontSize:11, gap:1 }}>
              <span style={{ fontWeight:700 }}>✕</span>
              <span style={{ fontSize:9, color:"#f87171" }}>Délier</span>
            </button>
          )}
          {projects?.map(proj => (
            <button key={proj.id} onClick={()=>{ onUpdate({projectId:proj.id}); setShowProj(false); }}
              style={{ display:"flex", flexDirection:"column", alignItems:"center", padding:"5px 9px", borderRadius:8, border:`1px solid ${proj.id===goal.projectId?proj.color+"80":t.cardBdr}`, background:proj.id===goal.projectId?proj.color+"20":t.inp, cursor:"pointer", color:proj.id===goal.projectId?proj.color:t.text, fontSize:11, gap:1 }}
              onMouseEnter={e=>{ e.currentTarget.style.background=proj.color+"18"; e.currentTarget.style.borderColor=proj.color+"60"; e.currentTarget.style.color=proj.color; }}
              onMouseLeave={e=>{ e.currentTarget.style.background=proj.id===goal.projectId?proj.color+"20":t.inp; e.currentTarget.style.borderColor=proj.id===goal.projectId?proj.color+"80":t.cardBdr; e.currentTarget.style.color=proj.id===goal.projectId?proj.color:t.text; }}>
              <span style={{ fontWeight:700 }}>{proj.emoji}</span>
              <span style={{ fontSize:9 }}>{proj.name.slice(0,12)}</span>
            </button>
          ))}
        </div>
      )}
      {/* Active link badges — inline list below task row */}
      {isDay && (goal.startTime || (goal.projectId && projects?.find(p=>p.id===goal.projectId)) || (goal.courseId && courses?.find(c=>c.id===goal.courseId))) && (
        <div style={{ display:"flex", gap:5, paddingLeft:34, paddingRight:10, paddingBottom:4, flexWrap:"wrap" }}>
          {goal.startTime && (
            <span onClick={()=>{ setEditTime(goal.startTime||""); setEditDur(String(goal.duration||30)); setShowTime(v=>!v); }}
              style={{ fontSize:10, padding:"2px 8px", borderRadius:8, background:"rgba(56,189,248,0.14)", color:"#38bdf8", border:"1px solid rgba(56,189,248,0.3)", fontWeight:600, cursor:"pointer", whiteSpace:"nowrap" }}>
              ⏱ {goal.startTime}{goal.duration?` · ${goal.duration}min`:""}
            </span>
          )}
          {goal.projectId && (() => { const proj = projects?.find(p=>p.id===goal.projectId); return proj ? (
            <span onClick={()=>setShowProj(v=>!v)}
              style={{ fontSize:10, padding:"2px 8px", borderRadius:8, background:proj.color+"20", color:proj.color, border:`1px solid ${proj.color}40`, cursor:"pointer", whiteSpace:"nowrap" }}>
              {proj.emoji} {proj.name.slice(0,14)}
            </span>
          ) : null; })()}
          {goal.courseId && (() => { const crs = courses?.find(c=>c.id===goal.courseId); return crs ? (
            <span onClick={()=>setShowCourse(v=>!v)}
              style={{ fontSize:10, padding:"2px 8px", borderRadius:8, background:crs.color+"20", color:crs.color, border:`1px solid ${crs.color}40`, cursor:"pointer", whiteSpace:"nowrap" }}>
              {crs.emoji} {crs.name.slice(0,14)}
            </span>
          ) : null; })()}
        </div>
      )}
      {isDay && showCourse && (
        <div style={{ display:"flex", gap:5, padding:"6px 10px 10px", flexWrap:"wrap", borderTop:`1px solid ${t.divider}`, alignItems:"center" }}>
          <span style={{ fontSize:10, color:t.textDim, fontWeight:600 }}>🎓 Lier à :</span>
          {goal.courseId && (
            <button onClick={()=>{ onUpdate({courseId:null}); setShowCourse(false); }}
              style={{ display:"flex", flexDirection:"column", alignItems:"center", padding:"5px 9px", borderRadius:8, border:"1px solid rgba(248,113,113,0.4)", background:"rgba(248,113,113,0.1)", cursor:"pointer", color:"#f87171", fontSize:11, gap:1 }}>
              <span style={{ fontWeight:700 }}>✕</span>
              <span style={{ fontSize:9, color:"#f87171" }}>Délier</span>
            </button>
          )}
          {courses?.length > 0 ? courses.map(crs => (
            <button key={crs.id} onClick={()=>{ onUpdate({courseId:crs.id}); setShowCourse(false); }}
              style={{ display:"flex", flexDirection:"column", alignItems:"center", padding:"5px 9px", borderRadius:8, border:`1px solid ${crs.id===goal.courseId?crs.color+"80":t.cardBdr}`, background:crs.id===goal.courseId?crs.color+"20":t.inp, cursor:"pointer", color:crs.id===goal.courseId?crs.color:t.text, fontSize:11, gap:1 }}
              onMouseEnter={e=>{ e.currentTarget.style.background=crs.color+"18"; e.currentTarget.style.borderColor=crs.color+"60"; e.currentTarget.style.color=crs.color; }}
              onMouseLeave={e=>{ e.currentTarget.style.background=crs.id===goal.courseId?crs.color+"20":t.inp; e.currentTarget.style.borderColor=crs.id===goal.courseId?crs.color+"80":t.cardBdr; e.currentTarget.style.color=crs.id===goal.courseId?crs.color:t.text; }}>
              <span style={{ fontWeight:700 }}>{crs.emoji}</span>
              <span style={{ fontSize:9 }}>{crs.name.slice(0,12)}</span>
            </button>
          )) : (
            <span style={{ fontSize:11, color:t.textDim, fontStyle:"italic" }}>Aucun cours — créez-en dans l'onglet 🎓</span>
          )}
        </div>
      )}
      {showNote && (
        <div style={{ paddingLeft:44, paddingRight:10, paddingBottom:8 }}>
          <textarea
            style={{ ...s.input, fontSize:12, resize:"vertical", minHeight:50, padding:"7px 10px" }}
            value={noteText}
            onChange={e => setNoteText(e.target.value)}
            onBlur={() => onUpdate({ note: noteText })}
            placeholder="Ajouter une note…"
          />
        </div>
      )}
      {(isWeekGoal || isDay) && showSubs && (
        <div style={{ paddingLeft:44, paddingRight:10, paddingBottom:10 }}>
          {(goal.subtasks||[]).map(sub => (
            <div key={sub.id} style={{ display:"flex", alignItems:"center", gap:7, marginBottom:5 }}>
              <input type="checkbox" checked={sub.done} onChange={() => onToggleSubtask(sub.id)}
                style={{ width:14, height:14, accentColor:"#8b5cf6", cursor:"pointer", flexShrink:0 }} />
              <span style={{ flex:1, fontSize:12, color:sub.done?t.textDim:t.text, textDecoration:sub.done?"line-through":"none" }}>{sub.text}</span>
              <button onClick={() => onRemoveSubtask(sub.id)} style={{ background:"none", border:"none", color:t.delColor, cursor:"pointer", fontSize:12, opacity:0.4, padding:"1px 3px" }}
                onMouseEnter={e=>e.currentTarget.style.opacity="1"} onMouseLeave={e=>e.currentTarget.style.opacity="0.4"}>✕</button>
            </div>
          ))}
          <div style={{ marginTop:4 }}>
            {addingSub
              ? <input
                  autoFocus
                  style={{ ...s.input, fontSize:12, padding:"4px 9px", width:"100%" }}
                  value={subText}
                  onChange={e=>setSubText(e.target.value)}
                  onKeyDown={e=>{ if(e.key==="Enter"){ if(subText.trim()){ onAddSubtask(subText); setSubText(""); } setAddingSub(false); } if(e.key==="Escape"){ setSubText(""); setAddingSub(false); } }}
                  onBlur={()=>{ if(subText.trim()) onAddSubtask(subText); setSubText(""); setAddingSub(false); }}
                  placeholder="Nouvelle sous-tâche… (Entrée)" />
              : <button onClick={()=>setAddingSub(true)}
                  style={{ background:"none", border:"1px dashed rgba(139,92,246,0.25)", borderRadius:7, color:"#8b5cf6", cursor:"pointer", fontSize:12, padding:"3px 10px", opacity:0.6, transition:"opacity 0.15s" }}
                  onMouseEnter={e=>e.currentTarget.style.opacity="1"} onMouseLeave={e=>e.currentTarget.style.opacity="0.6"}>
                  + sous-tâche
                </button>
            }
          </div>
        </div>
      )}
    </div>
  );
}

// ── App ───────────────────────────────────────────────────────────────────────

export default function App() {
  const [data,        setData]        = useState(load);
  useEffect(() => {
    loadFromFile().then(fileData => {
      if (!fileData) return;
      setData(fileData);
      try { localStorage.setItem("goalsAppV2", JSON.stringify(fileData)); } catch {}
    });
  }, []);
  const [tab,         setTab]         = useState("day");
  const [selectedDay, setSelectedDay] = useState(getTodayKey());
  const [showPresets, setShowPresets] = useState(true);
  const [showDayPre,  setShowDayPre]  = useState(true);
  const [isDark,      setIsDark]      = useState(() => localStorage.getItem("theme") !== "light");
  const [spinKey,     setSpinKey]     = useState(0);
  const [viewWeekKey, setViewWeekKey] = useState(getWeekKey());
  const [undo,        setUndo]        = useState(null);
  const [showSearch,  setShowSearch]  = useState(false);
  const [searchQ,     setSearchQ]     = useState("");
  const [showQuickAdd, setShowQuickAdd] = useState(false);
  const [qaTab,        setQaTab]        = useState("day");
  const [soundOn,     setSoundOn]     = useState(true);
  const [sideWeekOff, setSideWeekOff] = useState(0);
  const [pomoOpen,    setPomoOpen]    = useState(false);
  const undoTimerRef     = useRef(null);
  const dataRef          = useRef(data);
  useEffect(() => { dataRef.current = data; });
  const importRef        = useRef(null);
  const searchInputRef   = useRef(null);
  const pomoElapsedRef   = useRef(0); // minutes work écoulées dans le pomodoro en cours (0 si pas lancé)
  const pomoResetRef     = useRef(null); // fonction reset() du PomodoroWidget

  const t = isDark ? THEME.dark : THEME.light;
  const s = mkS(t);

  const getSettings     = ()         => ({ scoreTarget: SCORE_TARGET, scoreMinL3: SCORE_MIN_L3, scoreMinL2: SCORE_MIN_L2, scoreMinL1: SCORE_MIN_L1, ...data.settings });
  const updateSettings  = patch      => persist({ ...data, settings: { ...getSettings(), ...patch } });

  const weekKey  = getWeekKey();
  const monthKey = getMonthKey();
  const weekDays = getWeekDays(weekKey);
  const todayKey = getTodayKey();
  const sideWeekStart = (() => { const d = localDate(weekKey); d.setDate(d.getDate() + sideWeekOff*7); return dateToKey(d); })();
  const sideWeekDays  = getWeekDays(sideWeekStart);

  const persist = nd => { setData(nd); save(nd); };

  // ── Data accessors ──
  const getGoalsForWeek = wk      => data.weeks?.[wk]?.goals || [];
  const setGoalsForWeek = (wk,gs) => persist({ ...data, weeks:{ ...data.weeks, [wk]:{ ...data.weeks?.[wk], key:wk, goals:gs } } });
  const getDayGoals     = dk      => data.days?.[dk]?.goals || [];
  const setDayGoals     = (dk,gs) => persist({ ...data, days:{ ...data.days, [dk]:{ ...data.days?.[dk], goals:gs } } });
  const getDayJournal      = dk      => data.journal?.[dk] || "";
  const setDayJournal      = (dk,tx) => persist({ ...data, journal:{ ...data.journal, [dk]:tx } });
  const getDayMood         = dk      => data.moods?.[dk] || 0;
  const setDayMood         = (dk,v)  => persist({ ...data, moods:{ ...data.moods, [dk]:v } });
  const logPomodoro = (mins, linkedTaskId) => {
    const dk = getTodayKey();
    const existing = data.pomodoro?.[dk];
    const sessions = Array.isArray(existing) ? existing
      : typeof existing === "number" && existing > 0 ? [{ id:uid(), mins:existing, at:"" }]
      : [];
    const sess = { id:uid(), mins, at:new Date().toLocaleTimeString("fr-FR",{hour:"2-digit",minute:"2-digit"}) };
    // créditer uniquement la tâche liée (cherche dans tous les jours)
    let newDays = { ...data.days };
    if (linkedTaskId) {
      for (const [dayKey, dayVal] of Object.entries(newDays)) {
        const goals = dayVal?.goals || [];
        if (goals.some(g => g.id === linkedTaskId)) {
          newDays = { ...newDays, [dayKey]: { ...dayVal, goals: goals.map(g =>
            g.id === linkedTaskId ? { ...g, pomodoroMins: (g.pomodoroMins || 0) + mins } : g
          )}};
          break;
        }
      }
    }
    persist({ ...data, pomodoro: { ...data.pomodoro, [dk]: [...sessions, sess] }, days: newDays });
  };
  const deletePomodoro = (dk, sid) => {
    const existing = data.pomodoro?.[dk];
    const sessions = Array.isArray(existing) ? existing : [];
    const filtered = sessions.filter(s => s.id !== sid);
    const next = { ...data.pomodoro };
    if (filtered.length === 0) delete next[dk]; else next[dk] = filtered;
    persist({ ...data, pomodoro:next });
  };
  // ── Recipes ──
  const getRecipes    = ()        => data.recipes || [];
  const addRecipe     = r         => persist({ ...data, recipes: [...getRecipes(), r] });
  const updateRecipe  = (id,patch)=> persist({ ...data, recipes: getRecipes().map(r=>r.id===id?{...r,...patch}:r) });
  const deleteRecipe  = id        => persist({ ...data, recipes: getRecipes().filter(r=>r.id!==id) });
  const getMeals      = dk        => data.meals?.[dk] || [];
  const addMeal       = (dk,entry)=> persist({ ...data, meals:{ ...data.meals, [dk]:[...getMeals(dk),entry] } });
  const removeMeal    = (dk,id)   => persist({ ...data, meals:{ ...data.meals, [dk]:getMeals(dk).filter(m=>m.id!==id) } });

  // ── Courses ──
  const getCourses        = ()          => data.courses || [];
  const addCourse         = c           => persist({ ...data, courses: [...getCourses(), c] });
  const updateCourse      = (id,patch)  => persist({ ...data, courses: getCourses().map(c=>c.id===id?{...c,...patch}:c) });
  const deleteCourse      = id          => persist({ ...data, courses: getCourses().filter(c=>c.id!==id) });
  const toggleCourseSession = (cid,wk,idx) => {
    const arr = [...(data.courseProgress?.[cid]?.[String(wk)] || [])];
    arr[idx] = !arr[idx];
    persist({ ...data, courseProgress: { ...data.courseProgress, [cid]: { ...data.courseProgress?.[cid], [String(wk)]: arr } } });
  };
  // ── Exams ──
  const getExams          = ()          => data.exams || [];
  const addExam           = e           => persist({ ...data, exams: [...getExams(), e] });
  const deleteExam        = id          => persist({ ...data, exams: getExams().filter(e=>e.id!==id) });
  const updateExam        = (id,patch)  => persist({ ...data, exams: getExams().map(e=>e.id===id?{...e,...patch}:e) });
  // ── Projects ──
  const getProjects       = ()          => data.projects || [];
  const addProject        = p           => persist({ ...data, projects: [...getProjects(), p] });
  const updateProject     = (id,patch)  => persist({ ...data, projects: getProjects().map(p=>p.id===id?{...p,...patch}:p) });
  const deleteProject     = id          => persist({ ...data, projects: getProjects().filter(p=>p.id!==id) });
  // ── Course sessions for a given day ──
  const getCourseSessions = (dk) => {
    if (!dk) return [];
    const d = localDate(dk);
    const dow = (d.getDay() + 6) % 7;
    const sessions = [];
    for (const course of getCourses()) {
      if (!course.semesterStart) continue;
      const start = toMonday(localDate(course.semesterStart));
      for (let si = 0; si < (course.timetable||[]).length; si++) {
        const slot = course.timetable[si];
        if (slot.day !== dow) continue;
        const diffDays = Math.floor((d - start) / 86400000);
        const weekNum = Math.floor(diffDays / 7) + 1;
        if (weekNum < 1 || weekNum > (course.totalWeeks || 14)) continue;
        const prog = data.courseProgress?.[course.id]?.[String(weekNum)] || [];
        sessions.push({ courseId:course.id, courseName:course.name, courseColor:course.color, courseEmoji:course.emoji, slotIdx:si, slotId:slot.id, weekNum, startTime:slot.startTime, endTime:slot.endTime, type:slot.type, done:!!prog[si] });
      }
    }
    return sessions.sort((a,b)=>a.startTime.localeCompare(b.startTime));
  };

  const getWeekReview      = wk      => data.weekReviews?.[wk] || { q1:"", q2:"", q3:"", q4:"" };
  const setWeekReview      = (wk,patch) => persist({ ...data, weekReviews:{ ...data.weekReviews, [wk]:{ ...getWeekReview(wk), ...patch } } });
  const getMonthTasks   = ()      => data.months?.[monthKey]?.tasks || [];
  const setMonthTasks   = tasks   => persist({ ...data, months:{ ...data.months, [monthKey]:{ ...data.months?.[monthKey], tasks } } });
  const getWeekHabits   = (wk=weekKey) => data.habits?.weeks?.[wk]?.done || [];
  const getDayHabits    = dk      => data.habits?.days?.[dk]?.done || [];

  // ── Yesterday suggestions ──
  const getGlobalDismissed = () => data.globalDismissed || [];
  const getPendingSuggestions = dk => {
    const yk = prevDayKey(dk);
    const dismissed = getGlobalDismissed();
    const currGoals = getDayGoals(dk);
    return getDayGoals(yk).filter(g =>
      !g.done && !dismissed.includes(g.id) &&
      !currGoals.some(tg => tg.carriedFrom === g.id)
    );
  };
  const acceptSuggestion = (dk, task) => {
    const carried = { ...task, id: uid(), createdAt: task.createdAt || prevDayKey(dk) };
    const newGoals = [...getDayGoals(dk), carried];
    const dismissed = [...getGlobalDismissed(), task.id];
    persist({ ...data, globalDismissed: dismissed, days: { ...data.days, [dk]: { ...data.days?.[dk], goals: newGoals } } });
  };
  const dismissSuggestion = (dk, taskId) => {
    // dismiss permanent — ne reviendra plus jamais comme suggestion
    const dismissed = [...getGlobalDismissed(), taskId];
    persist({ ...data, globalDismissed: dismissed });
  };
  const markSuggestionDone = (dk, task) => {
    const yk = prevDayKey(dk);
    const prevGoals = getDayGoals(yk).map(g => g.id === task.id ? { ...g, done: true, doing: false } : g);
    const dismissed = [...getGlobalDismissed(), task.id];
    persist({ ...data, globalDismissed: dismissed, days: { ...data.days, [yk]: { ...data.days?.[yk], goals: prevGoals } } });
  };
  const acceptAllSuggestions = dk => {
    const suggs = getPendingSuggestions(dk);
    const newGoals = [...getDayGoals(dk), ...suggs.map(sg => ({ ...sg, id: uid(), createdAt: sg.createdAt || prevDayKey(dk) }))];
    const dismissed = [...getGlobalDismissed(), ...suggs.map(g => g.id)];
    persist({ ...data, globalDismissed: dismissed, days: { ...data.days, [dk]: { ...data.days?.[dk], goals: newGoals } } });
  };
  const dismissAllSuggestions = dk => {
    const suggs = getPendingSuggestions(dk);
    const dismissed = [...getGlobalDismissed(), ...suggs.map(g => g.id)];
    persist({ ...data, globalDismissed: dismissed });
  };

  // ── Auto-carry all non-done tasks from previous day ──
useEffect(() => {
  const today = getTodayKey();
  const d = dataRef.current;
  
  // On récupère les clés des jours existants pour trouver le dernier jour d'activité
  const allDayKeys = Object.keys(d.days || {})
    .filter(k => k < today) // Uniquement les jours passés
    .sort();

  if (!allDayKeys.length) return;

  // On prend UNIQUEMENT le dernier jour où l'utilisateur a eu des tâches
  const lastActiveDayKey = allDayKeys[allDayKeys.length - 1];
  
  // Si le dernier jour d'activité est déjà hier ou plus vieux, on carry vers AUJOURD'HUI
  const prevGoals = d.days[lastActiveDayKey]?.goals || [];
  const currGoals = d.days[today]?.goals || [];

  // Filtrer pour ne prendre que les tâches non faites 
  // ET qui n'ont pas déjà été reportées aujourd'hui
  const toCarry = prevGoals.filter(g => 
    !g.done && 
    !g.carriedOver && // Évite de carry une tâche déjà marquée comme "reportée"
    !currGoals.some(tg => tg.carriedFrom === g.id)
  );

  if (toCarry.length === 0) return;

  // Préparation des versions "neuves" pour aujourd'hui
  const carried = toCarry.map(g => ({
    ...g,
    id: uid(),
    carriedFrom: g.id,
    createdAt: g.createdAt || lastActiveDayKey, // On garde la date de création originale
    done: false,
    doing: false,
    elapsedMins: 0,
    pomodoroMins: 0,
    startTime: null,
    duration: null,
  }));

  // On marque les anciennes tâches comme "reportées" (pour ne plus les toucher)
  const updatedPrev = prevGoals.map(g => 
    toCarry.some(c => c.id === g.id) ? { ...g, carriedOver: true } : g
  );

  const nd = {
    ...d,
    days: {
      ...d.days,
      [lastActiveDayKey]: { ...d.days[lastActiveDayKey], goals: updatedPrev },
      [today]: { ...d.days[today], goals: [...currGoals, ...carried] },
    }
  };

  save(nd);
  setData(nd);
}, []); // S'exécute une fois au chargement


  // ── Undo ──
  const triggerUndo = (restore, msg) => {
    if (undoTimerRef.current) clearTimeout(undoTimerRef.current);
    setUndo({ msg, restore });
    undoTimerRef.current = setTimeout(() => setUndo(null), 4500);
  };
  const doUndo = () => { if (undo) { undo.restore(); setUndo(null); clearTimeout(undoTimerRef.current); } };

  // ── View week goals (may differ from current week) ──
  const viewWg    = getGoalsForWeek(viewWeekKey);
  const viewTotal = viewWg.length;
  const viewDone  = viewWg.filter(g => g.done).length;
  const viewPct   = viewTotal === 0 ? 0 : Math.round(viewDone / viewTotal * 100);
  const viewColor = pc(viewPct, t);

  const addViewWeekGoal    = (text,cat,pri) => { if (!text.trim()) return; setGoalsForWeek(viewWeekKey, [...viewWg, { id:uid(), text:text.trim(), cat, priority:pri, done:false }]); };
  const checkWeekPreset    = p => { const ex=viewWg.find(g=>g.text===p.text); if(ex){ toggleViewWeekGoal(ex.id); } else { setGoalsForWeek(viewWeekKey,[...viewWg,{id:uid(),text:p.text.trim(),cat:p.cat,priority:p.priority,done:true}]); playDone(soundOn); } };
  const toggleViewWeekGoal = id => {
    const g = viewWg.find(x => x.id === id); if (!g) return;
    let patch;
    const switchBonus = (!g.doing && !g.done) ? (pomoElapsedRef.current || 0) : 0;
    if (!g.doing && !g.done)      { patch = { doing:true,  done:false, startedAt:new Date().toISOString(), pomodoroMins: g.pomodoroMins||0 }; pomoResetRef.current?.(); pomoElapsedRef.current=0; setPomoOpen(true); }
    else if (g.doing && !g.done)  { const bonus=pomoElapsedRef.current||0; pomoElapsedRef.current=0; pomoResetRef.current?.(); patch = { doing:false, done:true, startedAt:g.startedAt, elapsedMins:(g.pomodoroMins||0)+bonus }; playDone(soundOn); setPomoOpen(false); }
    else                           patch = { doing:false, done:false, startedAt:null, elapsedMins:null, pomodoroMins:null };
    // une seule tâche en cours à la fois : sauvegarder le temps partiel sur l'ancienne
    const updated = viewWg.map(x => {
      if (x.id===id) return {...x,...patch};
      if (!g.doing && !g.done && x.doing && !x.done) return {...x, doing:false, startedAt:null, pomodoroMins:(x.pomodoroMins||0)+switchBonus};
      return x;
    });
    setGoalsForWeek(viewWeekKey, updated);
  };
  const removeViewWeekGoal = id => {
    const g = viewWg.find(x => x.id === id);
    const snap = viewWg;
    setGoalsForWeek(viewWeekKey, snap.filter(x => x.id !== id));
    triggerUndo(() => setData(d => { const nd={...d,weeks:{...d.weeks,[viewWeekKey]:{...d.weeks?.[viewWeekKey],key:viewWeekKey,goals:[...(d.weeks?.[viewWeekKey]?.goals||[]),g]}}}; save(nd); return nd; }), `"${g?.text}" supprimé`);
  };
  const updateViewWeekGoal = (id, patch) => setGoalsForWeek(viewWeekKey, viewWg.map(g => g.id===id ? {...g,...patch} : g));
  const addWeekGoalSubtask = (goalId, text) => {
    if (!text.trim()) return;
    updateViewWeekGoal(goalId, { subtasks: [...(viewWg.find(g=>g.id===goalId)?.subtasks||[]), {id:uid(), text:text.trim(), done:false}] });
  };
  const toggleWeekGoalSubtask = (goalId, subId) => {
    const g = viewWg.find(x=>x.id===goalId); if (!g) return;
    updateViewWeekGoal(goalId, { subtasks: (g.subtasks||[]).map(s=>s.id===subId?{...s,done:!s.done}:s) });
  };
  const removeWeekGoalSubtask = (goalId, subId) => {
    const g = viewWg.find(x=>x.id===goalId); if (!g) return;
    updateViewWeekGoal(goalId, { subtasks: (g.subtasks||[]).filter(s=>s.id!==subId) });
  };
  const reorderViewWeekGoals = (from, to) => {
    const arr = [...viewWg]; const [item] = arr.splice(from,1); arr.splice(to,0,item); setGoalsForWeek(viewWeekKey, arr);
  };

  // ── Day goal handlers ──
  const addDayGoal      = (dk,text,cat="perso",pri="mid") => { if (!text.trim()) return; setDayGoals(dk,[...getDayGoals(dk),{id:uid(),text:text.trim(),cat,priority:pri,done:false,createdAt:dk}]); };
  const checkDayPreset  = (dk,p) => { const gs=getDayGoals(dk); const ex=gs.find(g=>g.text===p.text); if(ex){ toggleDayGoal(dk,ex.id); } else { setDayGoals(dk,[...gs,{id:uid(),text:p.text.trim(),cat:p.cat,priority:p.priority,done:true,createdAt:dk}]); playDone(soundOn); } };
  const toggleDayGoal = (dk,id) => {
    const gs = getDayGoals(dk), g = gs.find(x => x.id === id); if (!g) return;
    let patch;
    const switchBonus = (!g.doing && !g.done) ? (pomoElapsedRef.current || 0) : 0;
    if (!g.doing && !g.done)      { patch = { doing:true,  done:false, startedAt:new Date().toISOString(), pomodoroMins: g.pomodoroMins||0 }; pomoResetRef.current?.(); pomoElapsedRef.current=0; setPomoOpen(true); }
    else if (g.doing && !g.done)  { const bonus=pomoElapsedRef.current||0; pomoElapsedRef.current=0; pomoResetRef.current?.(); patch = { doing:false, done:true, startedAt:g.startedAt, elapsedMins:(g.pomodoroMins||0)+bonus }; playDone(soundOn); setPomoOpen(false); }
    else                           patch = { doing:false, done:false, startedAt:null, elapsedMins:null, pomodoroMins:null };
    // une seule tâche en cours à la fois : sauvegarder le temps partiel sur l'ancienne
    const updated = gs.map(x => {
      if (x.id===id) return {...x,...patch};
      if (!g.doing && !g.done && x.doing && !x.done) return {...x, doing:false, startedAt:null, pomodoroMins:(x.pomodoroMins||0)+switchBonus};
      return x;
    });
    // si la tâche vient d'être marquée done dans un jour passé, supprimer les copies portées dans les jours suivants
    const becomingDone = g.doing && !g.done; // cycle: doing → done
    if (becomingDone) {
      const d = dataRef.current;
      const updatedDays = { ...d.days, [dk]: { ...d.days?.[dk], goals: updated } };
      Object.entries(d.days||{}).forEach(([otherDk, dv]) => {
        if (otherDk <= dk) return;
        const filtered = (dv.goals||[]).filter(tg => tg.carriedFrom !== id);
        if (filtered.length !== (dv.goals||[]).length) updatedDays[otherDk] = { ...dv, goals: filtered };
      });
      const nd = { ...d, days: updatedDays };
      save(nd); setData(nd);
    } else {
      setDayGoals(dk, updated);
    }
  };
  const removeDayGoal = (dk,id) => {
    const g = getDayGoals(dk).find(x => x.id === id);
    const snap = getDayGoals(dk);
    setDayGoals(dk, snap.filter(x => x.id !== id));
    triggerUndo(() => setData(d => { const nd={...d,days:{...d.days,[dk]:{...d.days?.[dk],goals:[...(d.days?.[dk]?.goals||[]),g]}}}; save(nd); return nd; }), `"${g?.text}" supprimé`);
  };
  const updateDayGoal  = (dk,id,patch) => setDayGoals(dk, getDayGoals(dk).map(g => g.id===id ? {...g,...patch} : g));
  const linkDayGoal = (dk, goalId, weekGoalId) => updateDayGoal(dk, goalId, { weekGoalId });
  const addDayGoalSubtask = (dk, goalId, text) => {
    if (!text.trim()) return;
    const g = getDayGoals(dk).find(x=>x.id===goalId); if (!g) return;
    updateDayGoal(dk, goalId, { subtasks: [...(g.subtasks||[]), {id:uid(), text:text.trim(), done:false}] });
  };
  const toggleDayGoalSubtask = (dk, goalId, subId) => {
    const g = getDayGoals(dk).find(x=>x.id===goalId); if (!g) return;
    updateDayGoal(dk, goalId, { subtasks: (g.subtasks||[]).map(s=>s.id===subId?{...s,done:!s.done}:s) });
  };
  const removeDayGoalSubtask = (dk, goalId, subId) => {
    const g = getDayGoals(dk).find(x=>x.id===goalId); if (!g) return;
    updateDayGoal(dk, goalId, { subtasks: (g.subtasks||[]).filter(s=>s.id!==subId) });
  };
  const reorderDayGoals = (dk,from,to)  => {
    const arr=[...getDayGoals(dk)]; const [item]=arr.splice(from,1); arr.splice(to,0,item); setDayGoals(dk,arr);
  };

  // ── Month handlers ──
  const addMonthTask    = text => { const ts=getMonthTasks(); if(!text.trim()||ts.length>=3) return; setMonthTasks([...ts,{id:uid(),text:text.trim(),done:false}]); };
  const toggleMonthTask = id   => setMonthTasks(getMonthTasks().map(t=>t.id===id?{...t,done:!t.done}:t));
  const removeMonthTask = id   => setMonthTasks(getMonthTasks().filter(t=>t.id!==id));

  // ── Todo (backlog) handlers ──
  const getTodoItems   = ()       => data.todo || [];
  const setTodoItems   = items    => persist({ ...data, todo: items });
  const addTodoItem    = (text, cat, pri) => { if (!text.trim()) return; setTodoItems([...getTodoItems(), { id:uid(), text:text.trim(), cat, priority:pri, createdAt:getTodayKey() }]); };
  const removeTodoItem = id       => { const snap=getTodoItems(); setTodoItems(snap.filter(x=>x.id!==id)); triggerUndo(()=>setData(d=>{ const nd={...d,todo:[...(d.todo||[]),snap.find(x=>x.id===id)].filter(Boolean)}; save(nd); return nd; }),`"${snap.find(x=>x.id===id)?.text}" supprimé`); };
  const updateTodoItem = (id, patch) => setTodoItems(getTodoItems().map(x=>x.id===id?{...x,...patch}:x));
  const scheduleTodoToDay = (id, dk) => {
    const item = getTodoItems().find(x=>x.id===id);
    if (!item) return;
    const newDayGoals = [...getDayGoals(dk), { id:uid(), text:item.text, cat:item.cat, priority:item.priority, done:false, createdAt:dk }];
    const newTodos = getTodoItems().filter(x=>x.id!==id);
    persist({ ...data, days:{ ...data.days, [dk]:{ ...data.days?.[dk], goals:newDayGoals } }, todo:newTodos });
  };
  // kept for backward compat
  const scheduleTodoToday = id => scheduleTodoToDay(id, todayKey);

  // ── Habit handlers ──
  const getWeeklyHabitsList = () => data.habits?.weeklyList ?? WEEKLY_HABITS;
  const getDailyHabitsList  = () => data.habits?.dailyList  ?? DAILY_HABITS;

  const toggleWeekHabit = (id, wk=weekKey) => {
    const done=getWeekHabits(wk), next=done.includes(id)?done.filter(x=>x!==id):[...done,id];
    persist({ ...data, habits:{ ...data.habits, weeks:{ ...data.habits?.weeks, [wk]:{ done:next } } } });
  };
  const toggleDayHabit = (dk,id) => {
    const done=getDayHabits(dk), next=done.includes(id)?done.filter(x=>x!==id):[...done,id];
    persist({ ...data, habits:{ ...data.habits, days:{ ...data.habits?.days, [dk]:{ done:next } } } });
  };
  const addWeeklyHabit = (text, icon) => {
    const list = getWeeklyHabitsList();
    const id = "wh_" + uid();
    persist({ ...data, habits:{ ...data.habits, weeklyList:[...list,{ id, text, icon }] } });
  };
  const removeWeeklyHabit = id => {
    const list = getWeeklyHabitsList().filter(h=>h.id!==id);
    persist({ ...data, habits:{ ...data.habits, weeklyList:list } });
  };
  const updateWeeklyHabit = (id, patch) => {
    const list = getWeeklyHabitsList().map(h=>h.id===id?{...h,...patch}:h);
    persist({ ...data, habits:{ ...data.habits, weeklyList:list } });
  };
  const reorderWeeklyHabits = (from, to) => {
    const list = [...getWeeklyHabitsList()];
    const [item] = list.splice(from,1); list.splice(to,0,item);
    persist({ ...data, habits:{ ...data.habits, weeklyList:list } });
  };
  const resetWeeklyHabits = () => persist({ ...data, habits:{ ...data.habits, weeklyList:WEEKLY_HABITS } });

  const addDailyHabit = (text, icon) => {
    const list = getDailyHabitsList();
    const id = "dh_" + uid();
    persist({ ...data, habits:{ ...data.habits, dailyList:[...list,{ id, text, icon }] } });
  };
  const removeDailyHabit = id => {
    const list = getDailyHabitsList().filter(h=>h.id!==id);
    persist({ ...data, habits:{ ...data.habits, dailyList:list } });
  };
  const updateDailyHabit = (id, patch) => {
    const list = getDailyHabitsList().map(h=>h.id===id?{...h,...patch}:h);
    persist({ ...data, habits:{ ...data.habits, dailyList:list } });
  };
  const reorderDailyHabits = (from, to) => {
    const list = [...getDailyHabitsList()];
    const [item] = list.splice(from,1); list.splice(to,0,item);
    persist({ ...data, habits:{ ...data.habits, dailyList:list } });
  };
  const resetDailyHabits = () => persist({ ...data, habits:{ ...data.habits, dailyList:DAILY_HABITS } });

  // ── Recurring tasks auto-copy (once per week) ──
  useEffect(() => {
    const flag = `recurringDone_${weekKey}`;
    if (localStorage.getItem(flag)) return;
    const prevD = new Date(weekKey); prevD.setDate(prevD.getDate()-7);
    const prevKey = prevD.toISOString().slice(0,10);
    const prevGoals = data.weeks?.[prevKey]?.goals || [];
    const recurring = prevGoals.filter(g => g.recurring);
    if (recurring.length > 0) {
      const cur = data.weeks?.[weekKey]?.goals || [];
      const existTexts = new Set(cur.map(g => g.text));
      const toAdd = recurring.filter(g => !existTexts.has(g.text)).map(g => ({...g, id:uid(), done:false}));
      if (toAdd.length > 0) setGoalsForWeek(weekKey, [...cur, ...toAdd]);
    }
    localStorage.setItem(flag, "1");
  }, []); // eslint-disable-line

  // ── Notifications ──
  useEffect(() => {
    if (!("Notification" in window)) return;
    if (Notification.permission === "default") Notification.requestPermission();
    const check = () => {
      if (Notification.permission !== "granted") return;
      const now = new Date(), h = now.getHours(), dk = getTodayKey();
      if (h === 21) {
        const flag = `notif_journal_${dk}`;
        if (!(data.journal?.[dk]||"").trim() && !sessionStorage.getItem(flag)) {
          sessionStorage.setItem(flag, "1");
          new Notification("📝 Journal du jour", { body:"Tu n'as pas encore écrit dans ton journal aujourd'hui !" });
        }
      }
      if (now.getDay() === 0 && h === 20) {
        const wk = getWeekKey(), r = data.weekReviews?.[wk]||{}, flag=`notif_review_${wk}`;
        if (!(r.q1||r.q2||r.q3||r.q4) && !sessionStorage.getItem(flag)) {
          sessionStorage.setItem(flag, "1");
          new Notification("📋 Résumé de semaine", { body:"C'est dimanche ! Prends 5 min pour ton bilan." });
        }
      }
    };
    const id = setInterval(check, 60000);
    return () => clearInterval(id);
  }, [data]); // eslint-disable-line

  // ── Keyboard shortcuts ──
  useEffect(() => {
    const handler = e => {
      const tag = document.activeElement?.tagName;
      const typing = ["INPUT","TEXTAREA","SELECT"].includes(tag);
      if ((e.key==="/" || (e.key==="k"&&(e.ctrlKey||e.metaKey))) && !typing) {
        e.preventDefault(); setShowSearch(true); setTimeout(() => searchInputRef.current?.focus(), 50);
      }
      if (e.key==="Escape") { setShowSearch(false); setSearchQ(""); setShowQuickAdd(false); }
      if (e.key==="n" && !typing && !showSearch) { e.preventDefault(); setShowQuickAdd(true); }
      if (e.key==="z"&&(e.ctrlKey||e.metaKey)&&!e.shiftKey) { e.preventDefault(); doUndo(); }
      if (!e.ctrlKey&&!e.metaKey&&!e.altKey&&!typing) {
        const map={"1":"day","2":"month","3":"habits","4":"todo","5":"history","6":"analytics","7":"recipes","8":"cours","9":"projets"};
        if (map[e.key]) { setTab(map[e.key]); }
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [undo]); // eslint-disable-line

  // ── Computed ──
  const wg       = getGoalsForWeek(weekKey);
  const wTotal   = wg.length, wDone = wg.filter(g=>g.done).length;
  const wPct     = wTotal===0?0:Math.round(wDone/wTotal*100);
  const wColor   = pc(wPct, t);
  const now      = new Date();
  const monthLabel = MONTHS_FR[now.getMonth()]+" "+now.getFullYear();
  const isCurrentWeek = viewWeekKey === weekKey;

  const tabs = [["day","📅","Journée"],["month","📆","Mois"],["habits","🔄","Habitudes"],["todo","📌","To-Do"],["history","📊","Historique"],["analytics","📈","Analyse"],["recipes","🍽️","Recettes"],["cours","🎓","Cours"],["projets","📁","Projets"]];

  // ── Week navigation ──
  const prevWeek = () => { const d=new Date(viewWeekKey); d.setDate(d.getDate()-7); setViewWeekKey(d.toISOString().slice(0,10)); };
  const nextWeek = () => { const d=new Date(viewWeekKey); d.setDate(d.getDate()+7); const nk=d.toISOString().slice(0,10); if(nk<=weekKey) setViewWeekKey(nk); };

  // ── Export / Import ──
  const exportData = () => {
    const blob = new Blob([JSON.stringify(data, null, 2)], {type:"application/json"});
    const a = document.createElement("a"); a.href=URL.createObjectURL(blob); a.download="coolplanning.json"; a.click();
  };
  const exportCSV = () => {
    const rows = [["Date","Type","Texte","Catégorie","Priorité","Fait","Créé le"]];
    Object.entries(data.days||{}).sort().forEach(([dk,dv]) => {
      (dv.goals||[]).forEach(g => rows.push([dk,"Tâche",g.text,CATEGORIES.find(c=>c.id===g.cat)?.label||g.cat,PRIORITIES.find(p=>p.id===g.priority)?.label||g.priority,g.done?"Oui":"Non",g.createdAt||dk]));
    });
    Object.entries(data.weeks||{}).sort().forEach(([wk,wv]) => {
      (wv.goals||[]).forEach(g => rows.push([wk,"Objectif semaine",g.text,CATEGORIES.find(c=>c.id===g.cat)?.label||g.cat,PRIORITIES.find(p=>p.id===g.priority)?.label||g.priority,g.done?"Oui":"Non",""]));
    });
    const csv = rows.map(r=>r.map(v=>`"${String(v).replace(/"/g,'""')}"`).join(",")).join("\n");
    const blob = new Blob(["\uFEFF"+csv],{type:"text/csv;charset=utf-8;"});
    const a = document.createElement("a"); a.href=URL.createObjectURL(blob); a.download="coolplanning.csv"; a.click();
  };
  const exportPDF = () => {
    const html = generatePDFHtml(data);
    const w = window.open("","_blank");
    if (!w) { alert("Autorise les pop-ups pour exporter en PDF"); return; }
    w.document.write(html); w.document.close(); w.focus();
    setTimeout(()=>w.print(), 400);
  };
  const importData = e => {
    const file = e.target.files[0]; if (!file) return;
    const reader = new FileReader();
    reader.onload = ev => { try { persist(JSON.parse(ev.target.result)); } catch { alert("Fichier invalide"); } };
    reader.readAsText(file); e.target.value = "";
  };

  const H = t.isDark
    ? { day:"#60a5fa", week:"#c4b5fd", month:"#f472b6", habits:"#34d399", todo:"#a78bfa", history:"#f97316", analytics:"#38bdf8", hist2:"#f97316", cours:"#4ade80", projets:"#60a5fa" }
    : { day:"#1d4ed8", week:"#5b21b6", month:"#9d174d", habits:"#047857", todo:"#6d28d9", history:"#c2410c", analytics:"#0369a1", recipes:"#b45309", hist2:"#c2410c", cours:"#047857", projets:"#1d4ed8" };
  const headerTitle = () => {
    if (tab==="day")       return <span style={{ color:H.day }}>{DAYS_FR[weekDays.indexOf(selectedDay)]} {new Date(selectedDay).toLocaleDateString("fr-FR",{day:"2-digit",month:"long"})}</span>;
    if (tab==="month")     return <span style={{ color:H.month }}>Mois — {monthLabel}</span>;
    if (tab==="habits")    return <span style={{ color:H.habits }}>Habitudes</span>;
    if (tab==="todo")      return <span style={{ color:H.todo }}>To-Do — {getTodoItems().length} idée{getTodoItems().length!==1?"s":""}</span>;
    if (tab==="history")   return <span style={{ color:H.history }}>Historique</span>;
    if (tab==="analytics") return <span style={{ color:H.analytics }}>Analyse</span>;
    if (tab==="recipes")   return <span style={{ color:H.recipes }}>Recettes — {getRecipes().length} recette{getRecipes().length!==1?"s":""}</span>;
    if (tab==="cours")     return <span style={{ color:H.cours }}>Cours &amp; Examens — {getCourses().length} matière{getCourses().length!==1?"s":""}</span>;
    if (tab==="projets")   return <span style={{ color:H.projets }}>Projets — {getProjects().filter(p=>!p.archived).length} actif{getProjects().filter(p=>!p.archived).length!==1?"s":""}</span>;
  };

  const btnStyle = (active) => ({ ...s.iconBtn, borderColor: active ? "rgba(139,92,246,0.4)" : t.inpBdr, background: active ? "rgba(139,92,246,0.12)" : "transparent", color: active ? "#c4b5fd" : t.textSub });

  return (
    <>
      <style>{makeCSS()}</style>
      <div data-theme={isDark?"dark":"light"} id="app-root" style={{ display:"flex", height:"100vh", background:t.bg, backgroundImage:t.bgImg, fontFamily:"'Inter',system-ui,sans-serif", color:t.text, overflow:"hidden", position:"relative" }}>

        <div className="orb"  style={{ position:"absolute", width:500, height:500, borderRadius:"50%", background:`radial-gradient(circle,${t.orb1} 0%,transparent 70%)`, top:"-15%", left:"-8%", zIndex:0, pointerEvents:"none" }} />
        <div className="orb2" style={{ position:"absolute", width:400, height:400, borderRadius:"50%", background:`radial-gradient(circle,${t.orb2} 0%,transparent 70%)`, bottom:"-10%", right:"-5%", zIndex:0, pointerEvents:"none" }} />

        {/* ── Sidebar ── */}
        <div id="sidebar" style={{ position:"relative", zIndex:10, width:238, background:t.glass, borderRight:`1px solid ${t.glassBdr}`, backdropFilter:"blur(24px)", WebkitBackdropFilter:"blur(24px)", display:"flex", flexDirection:"column", flexShrink:0 }}>
          <div className="side-header" style={{ padding:"22px 18px 16px", borderBottom:`1px solid ${t.divider}` }}>
            <div style={{ fontSize:15, fontWeight:800, color:"#c4b5fd" }}>🎯 Mes Objectifs</div>
            <div style={{ fontSize:11, color:t.textDim, marginTop:4 }}>{now.toLocaleDateString("fr-FR",{weekday:"long",day:"numeric",month:"long"})}</div>
          </div>
          <div style={{ flex:1, padding:"10px", overflowY:"auto" }}>
            <div className="side-section-label" style={{ fontSize:9, color:t.textTiny, padding:"8px 14px 4px", textTransform:"uppercase", letterSpacing:"1.2px", fontWeight:700 }}>Vues</div>
            <div className="tab-list" style={{ display:"flex", flexDirection:"column" }}>
              {tabs.map(([id,ico,lbl]) => (
                <button key={id} className="sb" style={s.sideBtn(tab===id)} onClick={()=>setTab(id)}>
                  <span style={{ fontSize:14 }}>{ico}</span>{lbl}
                  <span style={{ fontSize:9, marginLeft:"auto", color:t.textTiny, fontFamily:"monospace" }}>{ {"day":"1","month":"2","habits":"3","todo":"4","history":"5","analytics":"6","recipes":"7","cours":"8","projets":"9"}[id]||"" }</span>
                </button>
              ))}
            </div>
            <div className="side-section-label" style={{ fontSize:9, color:t.textTiny, padding:"16px 14px 4px", textTransform:"uppercase", letterSpacing:"1.2px", fontWeight:700 }}>Semaine</div>
            <div style={{ display:"flex", alignItems:"center", gap:4, padding:"2px 10px 6px" }}>
              <button className="bt" onClick={()=>setSideWeekOff(o=>o-1)} style={{ ...btnStyle(false), width:24, height:24, fontSize:11, flexShrink:0 }}>◀</button>
              <button style={{ flex:1, background:"none", border:"none", cursor:"pointer", fontSize:10, color:sideWeekOff===0?"#8b5cf6":t.textSub, fontWeight:sideWeekOff===0?700:400, textAlign:"center", padding:"2px 0" }}
                onClick={()=>setSideWeekOff(0)}>
                {sideWeekOff===0 ? "Cette semaine" : (() => { const [,m,d]=sideWeekDays[0].split("-"); return `${+d} ${MONTHS_FR[+m-1].slice(0,4).toLowerCase()}`; })()}
              </button>
              <button className="bt" onClick={()=>setSideWeekOff(o=>o+1)} style={{ ...btnStyle(false), width:24, height:24, fontSize:11, flexShrink:0 }}>▶</button>
            </div>
            <div className="day-list">
              {DAYS_FR.map((d,i) => {
                const dk=sideWeekDays[i], dg=getDayGoals(dk);
                const dgCommitted=dg.filter(g=>!g.isBonus), dd=dgCommitted.filter(g=>g.done).length;
                const dh=getDayHabits(dk), isToday=dk===todayKey, isFuture=dk>todayKey;
                const isActive=(tab==="day"||tab==="habits")&&selectedDay===dk;
                const dailyTotal=getDailyHabitsList().length, habitsAllDone=dailyTotal>0&&dh.length>=dailyTotal;
                const dayScoreTarget = getSettings().scoreTarget;
                const dayEarned = dg.filter(g=>g.done&&g.level&&!g.isBonus).reduce((s,g)=>s+g.level,0);
                const scoreReached = dg.some(g=>g.level) && dayEarned >= dayScoreTarget;
                const taskColor = dgCommitted.length>0&&dd===dgCommitted.length ? "#34d399" : scoreReached ? "#4ade80" : "#f97316";
                return (
                  <button key={dk} className="sb" style={{ ...s.sideBtn(isActive), borderLeft:isToday?"2px solid #8b5cf6":isFuture?"2px solid rgba(139,92,246,0.25)":"2px solid transparent" }}
                    onClick={()=>{ if(tab!=="habits") setTab("day"); setSelectedDay(dk); }}
                    onDragOver={e=>e.preventDefault()}
                    onDrop={e=>{ e.preventDefault(); const todoId=e.dataTransfer.getData("todoId"); if(todoId) scheduleTodoToDay(todoId,dk); }}>
                    <span style={{ fontSize:10, fontWeight:600, width:22, color:isFuture?t.textSub:undefined }}>{d.slice(0,3)}</span>
                    <span style={{ flex:1, fontSize:11 }}>{new Date(dk).toLocaleDateString("fr-FR",{day:"2-digit",month:"2-digit"})}</span>
                    <span style={{ display:"flex", flexDirection:"column", alignItems:"flex-end", gap:1 }}>
                      {dgCommitted.length>0 && <span style={{ fontSize:9, color:taskColor, fontWeight:700 }}>{dd}/{dgCommitted.length}</span>}
                      {habitsAllDone
                        ? <span style={{ fontSize:11, color:"#34d399" }}>✓</span>
                        : dh.length>0 && <span style={{ fontSize:9, color:"#8b5cf6", fontWeight:700 }}>🔄{dh.length}</span>}
                    </span>
                    {isToday && <span style={{ fontSize:8, color:"#8b5cf6", fontWeight:800 }}>auj.</span>}
                    {isFuture && !dg.length && <span style={{ fontSize:8, color:t.textTiny }}>+</span>}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* ── Main ── */}
        <div style={{ position:"relative", zIndex:1, flex:1, display:"flex", flexDirection:"column", overflow:"hidden", minWidth:0 }}>
          <div id="main-header" style={{ padding:"12px 24px", borderBottom:`1px solid ${t.glassBdr}`, display:"flex", alignItems:"center", justifyContent:"space-between", background:t.glass, backdropFilter:"blur(20px)", WebkitBackdropFilter:"blur(20px)", flexShrink:0, gap:10 }}>
            <div style={{ display:"flex", alignItems:"center", gap:10, minWidth:0 }}>
              <div style={{ fontSize:17, fontWeight:800, letterSpacing:"-0.3px", whiteSpace:"nowrap" }}>{headerTitle()}</div>
            </div>
            <div style={{ display:"flex", gap:6, alignItems:"center", flexShrink:0 }}>
              <button className="bt" onClick={()=>{ setShowSearch(true); setTimeout(()=>searchInputRef.current?.focus(),50); }} style={btnStyle(showSearch)} title="Rechercher (/)">🔍</button>
              <button className="bt" onClick={()=>setSoundOn(v=>!v)} style={btnStyle(!soundOn)} title={soundOn?"Son activé":"Son désactivé"}>{soundOn?"🔊":"🔇"}</button>
              <button className="bt" onClick={exportData} style={btnStyle(false)} title="Exporter JSON">⬇️</button>
              <button className="bt" onClick={exportCSV} style={btnStyle(false)} title="Exporter CSV">📊</button>
              <button className="bt" onClick={exportPDF} style={btnStyle(false)} title="Exporter PDF">🖨️</button>
              <input ref={importRef} type="file" accept=".json" style={{ display:"none" }} onChange={importData} />
              <button className="bt" onClick={()=>importRef.current?.click()} style={btnStyle(false)} title="Importer JSON">⬆️</button>
              <button className="bt" onClick={()=>setPomoOpen(v=>!v)} style={btnStyle(pomoOpen)} title="Pomodoro Focus">⏱</button>
              {tab==="day" && (
                <button className="bt" onClick={()=>setShowDayPre(!showDayPre)}
                  style={{ padding:"7px 12px", borderRadius:10, border:`1px solid ${showDayPre?"rgba(139,92,246,0.5)":t.inpBdr}`, background:showDayPre?t.filterActive:"transparent", color:showDayPre?"#c4b5fd":t.textSub, fontSize:12, cursor:"pointer", fontWeight:500, height:34 }}>
                  ⚡ Prédéfinis
                </button>
              )}
              <button key={spinKey} className="bt tspin" onClick={()=>{ setSpinKey(k=>k+1); setIsDark(d=>{ localStorage.setItem("theme", d ? "light" : "dark"); return !d; }); }}
                style={{ ...btnStyle(false), borderColor:t.inpBdr }}>
                {t.themeIcon}
              </button>
            </div>
          </div>

          <div id="main-content" style={{ flex:1, overflowY:"auto", padding:"22px 26px" }}>
            {tab==="day"       && <DayView goals={getDayGoals(selectedDay)} dayKey={selectedDay} todayKey={todayKey} onAdd={(tx,cat,pri)=>addDayGoal(selectedDay,tx,cat,pri)} onToggle={id=>toggleDayGoal(selectedDay,id)} onRemove={id=>removeDayGoal(selectedDay,id)} onUpdate={(id,p)=>updateDayGoal(selectedDay,id,p)} onReorder={(f,to)=>reorderDayGoals(selectedDay,f,to)} onLink={(goalId,wgId)=>linkDayGoal(selectedDay,goalId,wgId)} showPresets={showDayPre} habits={getDailyHabitsList()} habitsDone={getDayHabits(selectedDay)} habitsData={data.habits} onToggleHabit={id=>toggleDayHabit(selectedDay,id)} journal={getDayJournal(selectedDay)} onJournalChange={tx=>setDayJournal(selectedDay,tx)} suggestions={getPendingSuggestions(selectedDay)} onAcceptSugg={task=>acceptSuggestion(selectedDay,task)} onDismissSugg={id=>dismissSuggestion(selectedDay,id)} onMarkSuggDone={task=>markSuggestionDone(selectedDay,task)} onAcceptAllSugg={()=>acceptAllSuggestions(selectedDay)} onDismissAllSugg={()=>dismissAllSuggestions(selectedDay)} weekDoneTasks={weekDays.reduce((sum,dk)=>{const gs=getDayGoals(dk);return sum+gs.filter(g=>g.done).length;},0)} monthTasks={getMonthTasks()} weekGoals={getGoalsForWeek(weekKey)} todoCount={getTodoItems().length} weekReview={getWeekReview(getWeekKey(new Date(selectedDay+"T12:00:00")))} onWeekReviewChange={(patch)=>setWeekReview(getWeekKey(new Date(selectedDay+"T12:00:00")),patch)} onAddSubtask={(goalId,text)=>addDayGoalSubtask(selectedDay,goalId,text)} onToggleSubtask={(goalId,subId)=>toggleDayGoalSubtask(selectedDay,goalId,subId)} onRemoveSubtask={(goalId,subId)=>removeDayGoalSubtask(selectedDay,goalId,subId)} mood={getDayMood(selectedDay)} onMoodChange={v=>setDayMood(selectedDay,v)} meals={getMeals(selectedDay)} onRemoveMeal={id=>removeMeal(selectedDay,id)} projects={getProjects()} courses={getCourses()} courseSessions={getCourseSessions(selectedDay)} upcomingExams={getExams().filter(e=>{ const diff=Math.round((new Date(e.date+"T12:00:00")-new Date(selectedDay+"T12:00:00"))/86400000); return diff>=0&&diff<=14; }).sort((a,b)=>a.date.localeCompare(b.date))} settings={getSettings()} onUpdateSettings={updateSettings} s={s} t={t} />}
            {tab==="month"     && <MonthView tasks={getMonthTasks()} monthLabel={monthLabel} wPct={wPct} wDone={wDone} wTotal={wTotal} weekLabel={getWeekLabel(weekKey)} onAdd={addMonthTask} onToggle={toggleMonthTask} onRemove={removeMonthTask} s={s} t={t} />}
            {tab==="habits"    && <HabitsView weekDone={getWeekHabits(getWeekKey(new Date(selectedDay+"T12:00:00")))} dayDone={getDayHabits(selectedDay)} onToggleWeek={id=>toggleWeekHabit(id,getWeekKey(new Date(selectedDay+"T12:00:00")))} onToggleDay={id=>toggleDayHabit(selectedDay,id)} habitsData={data.habits} weekKey={getWeekKey(new Date(selectedDay+"T12:00:00"))} selectedDay={selectedDay} weeklyHabits={getWeeklyHabitsList()} dailyHabits={getDailyHabitsList()} onAddWeekly={addWeeklyHabit} onRemoveWeekly={removeWeeklyHabit} onUpdateWeekly={updateWeeklyHabit} onReorderWeekly={reorderWeeklyHabits} onResetWeekly={resetWeeklyHabits} onAddDaily={addDailyHabit} onRemoveDaily={removeDailyHabit} onUpdateDaily={updateDailyHabit} onReorderDaily={reorderDailyHabits} onResetDaily={resetDailyHabits} s={s} t={t} />}
            {tab==="todo"      && <TodoView items={getTodoItems()} onAdd={addTodoItem} onRemove={removeTodoItem} onUpdate={updateTodoItem} onScheduleToday={scheduleTodoToday} onScheduleToDay={scheduleTodoToDay} s={s} t={t} />}
            {tab==="history"   && <HistoryView data={data} weekKey={weekKey} onDeletePomodoro={deletePomodoro} onJournalChange={(dk,tx)=>setDayJournal(dk,tx)} onDeleteGoal={(dk,id)=>removeDayGoal(dk,id)} s={s} t={t} />}
            {tab==="analytics" && <AnalyticsView data={data} weekKey={weekKey} monthKey={monthKey} dailyHabitsCount={getDailyHabitsList().length} journal={data.journal||{}} weekReviews={data.weekReviews||{}} pomodoro={data.pomodoro||{}} settings={getSettings()} onDeleteGoal={(dk,id)=>removeDayGoal(dk,id)} t={t} s={s} />}
            {tab==="recipes"   && <RecipesView recipes={getRecipes()} meals={data.meals||{}} onAdd={addRecipe} onUpdate={updateRecipe} onDelete={deleteRecipe} onAddMeal={addMeal} onRemoveMeal={removeMeal} s={s} t={t} />}
            {tab==="cours"     && <CoursesView courses={getCourses()} courseProgress={data.courseProgress||{}} exams={getExams()} onAddCourse={addCourse} onUpdateCourse={updateCourse} onDeleteCourse={deleteCourse} onToggleSession={toggleCourseSession} onAddExam={addExam} onUpdateExam={updateExam} onDeleteExam={deleteExam} data={data} s={s} t={t} />}
            {tab==="projets"   && <ProjectsView projects={getProjects()} data={data} onAddProject={addProject} onUpdateProject={updateProject} onDeleteProject={deleteProject} s={s} t={t} />}
          </div>
        </div>

        {/* ── Search overlay ── */}
        {showSearch && (
          <SearchOverlay
            data={data} t={t} s={s}
            searchQ={searchQ} setSearchQ={setSearchQ}
            searchInputRef={searchInputRef}
            onClose={()=>{ setShowSearch(false); setSearchQ(""); }}
            onGoToDay={dk=>{ setSelectedDay(dk); setTab("day"); }}
            onGoToWeek={wk=>{ setViewWeekKey(wk); setTab("week"); }}
          />
        )}

        {/* ── Quick Add Modal ── */}
        {showQuickAdd && (
          <QuickAddModal
            tab={qaTab} setTab={setQaTab}
            onClose={() => setShowQuickAdd(false)}
            onAddDay={(text,cat,pri) => addDayGoal(todayKey,text,cat,pri)}
            onAddWeek={(text,cat,pri) => addViewWeekGoal(text,cat,pri)}
            onAddTodo={(text,cat,pri) => addTodoItem(text,cat,pri)}
            s={s} t={t}
          />
        )}

        {/* ── Undo toast ── */}
        {undo && (
          <div style={{ position:"fixed", bottom:24, left:"50%", transform:"translateX(-50%)", zIndex:1000, background:t.glass, border:`1px solid ${t.glassBdr}`, borderRadius:12, padding:"11px 18px", backdropFilter:"blur(20px)", WebkitBackdropFilter:"blur(20px)", display:"flex", alignItems:"center", gap:12, boxShadow:"0 8px 32px rgba(0,0,0,0.4)", animation:"toastIn 0.3s ease", whiteSpace:"nowrap" }}>
            <span style={{ fontSize:13, color:t.text }}>{undo.msg}</span>
            <button onClick={doUndo} style={{ padding:"5px 14px", borderRadius:8, border:"1px solid rgba(139,92,246,0.5)", background:"rgba(139,92,246,0.15)", color:"#c4b5fd", fontSize:12, fontWeight:700, cursor:"pointer" }}>Annuler</button>
            <span style={{ fontSize:10, color:t.textDim }}>Ctrl+Z</span>
            <button onClick={()=>setUndo(null)} style={{ background:"none", border:"none", color:t.textSub, cursor:"pointer", fontSize:14 }}>✕</button>
          </div>
        )}
        {(pomoOpen || Object.values(data.days||{}).some(day=>(day.goals||[]).some(g=>g.doing&&!g.done))) && <PomodoroWidget soundOn={soundOn} onClose={()=>setPomoOpen(false)} onWorkComplete={logPomodoro} allTasks={getDayGoals(todayKey).filter(g=>!g.done)} doingTasks={getDayGoals(todayKey).filter(g=>g.doing&&!g.done)} elapsedRef={pomoElapsedRef} resetRef={pomoResetRef} t={t} />}
      </div>
    </>
  );
}

// ── Shared atoms ──────────────────────────────────────────────────────────────

function StatCard({ label, value, color, delay=0, t }) {
  return (
    <div className="sc fu" style={{ background:t.statCard, border:`1px solid ${t.statBdr}`, borderTop:`3px solid ${color}`, borderRadius:14, padding:"16px 20px", boxShadow:"0 4px 24px rgba(0,0,0,0.15)", animationDelay:`${delay}s` }}>
      <div style={{ fontSize:26, fontWeight:800, color:t.text, lineHeight:1, marginBottom:4 }}>{value}</div>
      <div style={{ fontSize:11, color:t.textSub, fontWeight:500 }}>{label}</div>
    </div>
  );
}

function ProgressBar({ pct, color, t }) {
  return (
    <div style={{ background:t.progressBg, borderRadius:99, height:6, overflow:"hidden" }}>
      <div className="pb" style={{ height:"100%", borderRadius:99, width:`${pct}%`, background:`linear-gradient(90deg,${color},${color}bb)`, boxShadow:pct>0?`0 0 10px ${color}55`:"none" }} />
    </div>
  );
}

function Checkbox({ done, doing, color="#34d399", t, onToggle }) {
  const bdrCol = done ? color : doing ? "#f97316" : t.checkboxBdr;
  const bgCol  = done ? color : doing ? "rgba(249,115,22,0.15)" : "transparent";
  return (
    <button className={`ck${doing&&!done?" doing-ring":""}`}
      style={{ width:22, height:22, borderRadius:6, border:`2px solid ${bdrCol}`, background:bgCol,
        cursor:"pointer", flexShrink:0, display:"flex", alignItems:"center", justifyContent:"center",
        boxShadow:done?`0 0 12px ${color}55`:"none", transition:"border-color 0.2s,background 0.2s" }}
      onClick={onToggle}
      title={done?"Terminer → Réinitialiser":doing?"Marquer comme terminé":"Démarrer"}>
      {done  && <span style={{ color:"#0f0f1a", fontSize:11, fontWeight:900 }}>✓</span>}
      {doing && !done && <span style={{ color:"#f97316", fontSize:10, fontWeight:900 }}>▶</span>}
    </button>
  );
}

function GoalFilters({ filterStatus, setFS, filterCat, setFC, t }) {
  return (
    <div style={{ padding:"9px 14px", borderBottom:`1px solid ${t.divider}`, display:"flex", gap:5, flexWrap:"wrap" }}>
      {["all","doing","todo","done"].map(f=>(
        <button key={f} className="fp" style={{ padding:"4px 12px", borderRadius:20, border:`1px solid ${filterStatus===f?(f==="doing"?"rgba(249,115,22,0.5)":"rgba(139,92,246,0.5)"):t.filterBdr}`, background:filterStatus===f?(f==="doing"?"rgba(249,115,22,0.12)":t.filterActive):"transparent", color:filterStatus===f?(f==="doing"?"#f97316":"#c4b5fd"):t.textSub, fontSize:11, cursor:"pointer" }} onClick={()=>setFS(f)}>
          {f==="all"?"Tous":f==="doing"?"▶ En cours":f==="todo"?"À faire":"Faits"}
        </button>
      ))}
      <span style={{ color:t.divider, margin:"0 4px", lineHeight:"26px" }}>|</span>
      <button className="fp" style={{ padding:"4px 12px", borderRadius:20, border:`1px solid ${filterCat==="all"?"rgba(139,92,246,0.5)":t.filterBdr}`, background:filterCat==="all"?t.filterActive:"transparent", color:filterCat==="all"?"#c4b5fd":t.textSub, fontSize:11, cursor:"pointer" }} onClick={()=>setFC("all")}>Tous</button>
      {CATEGORIES.map(c=>{ const cc=catCol(c.id,t); return (
        <button key={c.id} className="fp" style={{ padding:"4px 10px", borderRadius:20, border:`1px solid ${filterCat===c.id?cc+"bb":t.filterBdr}`, background:filterCat===c.id?cc+"22":"transparent", color:filterCat===c.id?cc:t.textSub, fontSize:11, cursor:"pointer" }} onClick={()=>setFC(c.id)}>{CAT_ICONS[c.id]}</button>
      );})}
    </div>
  );
}

function CatProgressBars({ goals, t }) {
  if (!goals.length) return null;
  return (
    <div style={{ padding:"12px 18px", borderTop:`1px solid ${t.divider}`, display:"flex", gap:14, flexWrap:"wrap" }}>
      {CATEGORIES.map(c => {
        const cg=goals.filter(g=>g.cat===c.id); if(!cg.length) return null;
        const cd=cg.filter(g=>g.done).length;
        return (
          <div key={c.id} style={{ flex:1, minWidth:80 }}>
            <div style={{ fontSize:10, color:t.textDim, marginBottom:4 }}>{CAT_ICONS[c.id]} {c.label}</div>
            <ProgressBar pct={Math.round(cd/cg.length*100)} color={catCol(c.id,t)} t={t} />
            <div style={{ fontSize:9, color:catCol(c.id,t), marginTop:3, fontWeight:700 }}>{cd}/{cg.length}</div>
          </div>
        );
      })}
    </div>
  );
}

function PresetPanel({ habits, habitsDone, habitsData, dayKey, onToggle, label, s, t }) {
  const done = habitsDone.length;
  const total = habits.length;
  const pct = total ? Math.round(done/total*100) : 0;
  return (
    <div className="gc fi" style={s.card}>
      <div style={s.cardHead}>
        <span style={s.cardTitle}>{label}</span>
        <span style={{ fontSize:11, fontWeight:700, color:pc(pct,t) }}>{done}/{total}</span>
      </div>
      <div style={{ padding:"10px 12px", overflowY:"auto", maxHeight:460 }}>
        {habits.length === 0
          ? <div style={{ textAlign:"center", color:t.textTiny, padding:"24px 0", fontSize:12 }}>Aucune habitude — ajoutes-en dans la section Habitudes</div>
          : habits.map(h => {
              const isDone = habitsDone.includes(h.id);
              const streak = dayKey ? computeDayStreak(h.id, habitsData, dayKey) : 0;
              return (
                <div key={h.id} className="hr fu" onClick={()=>onToggle(h.id)}
                  style={{ display:"flex", alignItems:"center", gap:10, padding:"9px 11px", borderRadius:10, marginBottom:4, cursor:"pointer",
                    background:isDone?"rgba(52,211,153,0.07)":t.habitBg,
                    border:`1px solid ${isDone?"rgba(52,211,153,0.25)":t.cardBdr}` }}>
                  <div style={{ width:20, height:20, borderRadius:5, border:`2px solid ${isDone?"#34d399":t.checkboxBdr}`, background:isDone?"#34d399":"transparent", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0, transition:"all 0.15s", boxShadow:isDone?"0 0 8px #34d39966":"none" }}>
                    {isDone && <span style={{ color:"#0f0f1a", fontSize:10, fontWeight:900 }}>✓</span>}
                  </div>
                  <span style={{ fontSize:16, flexShrink:0 }}>{h.icon}</span>
                  <span style={{ flex:1, fontSize:12, color:isDone?t.textDim:t.text, textDecoration:isDone?"line-through":"none" }}>{h.text}</span>
                  {streak > 1 && <span style={{ fontSize:12, color:"#f97316", fontWeight:700 }}>🔥{streak}</span>}
                </div>
              );
            })
        }
      </div>
      {total > 0 && (
        <div style={{ padding:"8px 14px 12px" }}>
          <ProgressBar pct={pct} color={pc(pct,t)} t={t} />
        </div>
      )}
    </div>
  );
}

// ── DayView ───────────────────────────────────────────────────────────────────

function DayView({ goals, dayKey, onAdd, onToggle, onRemove, onUpdate, onReorder, onLink, showPresets, habits, habitsDone, habitsData, onToggleHabit, journal, onJournalChange, suggestions, onAcceptSugg, onDismissSugg, onMarkSuggDone, onAcceptAllSugg, onDismissAllSugg, weekDoneTasks, monthTasks, weekGoals, todoCount, todayKey, weekReview, onWeekReviewChange, onAddSubtask, onToggleSubtask, onRemoveSubtask, mood, onMoodChange, meals, onRemoveMeal, projects, courses, courseSessions, upcomingExams, settings, onUpdateSettings, s, t }) {
  const [text, setText]       = useState("");
  const [cat,  setCat]        = useState("perso");
  const [pri,  setPri]        = useState("mid");
  const [filterCat,  setFC]   = useState("all");
  const [filterStatus, setFS] = useState("all");
  const [viewMode,    setVM]  = useState("list");
  const [showScoreSettings, setShowScoreSettings] = useState(false);
  const [editScoreTarget, setEditScoreTarget] = useState("");
  const [editScoreMinL3,  setEditScoreMinL3]  = useState("");
  const [editScoreMinL2,  setEditScoreMinL2]  = useState("");
  const [editScoreMinL1,  setEditScoreMinL1]  = useState("");
  const [journalDraft, setJournalDraft] = useState(journal);
  useEffect(()=>{ setJournalDraft(journal); }, [journal]);

  const dayOfWeek = (() => { const d = new Date(dayKey + "T12:00:00"); return (d.getDay()+6)%7; })(); // Mon=0
  const isSunday = dayOfWeek === 6;
  const isMonday = dayOfWeek === 0;
  const isToday = dayKey === todayKey;

  const done = goals.filter(g=>g.done).length;
  const pct  = goals.length===0?0:Math.round(done/goals.length*100);
  const pcol = pc(pct, t);

  const filtered = goals
    .filter(g=>filterCat==="all"||g.cat===filterCat)
    .filter(g=>filterStatus==="all"
      ||(filterStatus==="done"  ? g.done
      :  filterStatus==="doing" ? (g.doing&&!g.done)
      :  (!g.done&&!g.doing)))
    .sort((a,b) => {
      const rank = g => g.done ? 2 : (g.doing ? 0 : 1);
      return rank(a) - rank(b);
    });

  const handleReorder = (fromIdx, toIdx) => {
    onReorder(fromIdx, toIdx);
  };

  return (
    <div className="fi">
      <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(140px,1fr))", gap:12, marginBottom:upcomingExams&&upcomingExams.length>0?12:22 }}>
        <StatCard label="Tâches planifiées" value={goals.length}      color={catCol("pro",t)}   delay={0}    t={t} />
        <StatCard label="Accomplies"        value={done}              color={catCol("sport",t)} delay={0.05} t={t} />
        <StatCard label="Restantes"         value={goals.length-done} color={priCol("mid",t)}   delay={0.1}  t={t} />
      </div>
      {/* Upcoming exams strip */}
      {upcomingExams && upcomingExams.length > 0 && (
        <div style={{ marginBottom:18, display:"flex", flexWrap:"wrap", gap:7 }}>
          {upcomingExams.map(exam => {
            const et = EXAM_TYPES.find(e=>e.id===exam.type);
            const diff = Math.round((new Date(exam.date+"T12:00:00")-new Date(dayKey+"T12:00:00"))/86400000);
            const urg = diff===0?"#f87171":diff<=3?"#f97316":diff<=7?"#fbbf24":"#38bdf8";
            return (
              <div key={exam.id} style={{ padding:"4px 12px", borderRadius:20, background:urg+"18", border:`1px solid ${urg}40`, display:"flex", alignItems:"center", gap:6 }}>
                <span style={{ fontSize:12 }}>{et?.emoji||"📋"}</span>
                <span style={{ fontSize:11, color:urg, fontWeight:700 }}>{exam.name}</span>
                <span style={{ fontSize:10, color:t.textDim }}>· {diff===0?"auj.!":diff===1?"demain":`dans ${diff}j`}</span>
              </div>
            );
          })}
        </div>
      )}
      {/* Section Suggestions (Tâches oubliées la veille) */}
      {suggestions && suggestions.length > 0 && (
        <div className="fu" style={{ 
          marginBottom: 16, 
          padding: "12px 16px", 
          background: "rgba(249, 115, 22, 0.08)", 
          border: "1px dashed rgba(249, 115, 22, 0.4)", 
          borderRadius: 14 
        }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
            <span style={{ fontSize: 12, fontWeight: 700, color: "#f97316" }}>
              ⏳ {suggestions.length} tâche(s) de la veille non reportée(s) :
            </span>
            <div style={{ display: "flex", gap: 8 }}>
              <button onClick={onDismissAllSugg} style={{ background: "none", border: "none", color: t.textDim, fontSize: 11, cursor: "pointer" }}>Tout ignorer</button>
              <button onClick={onAcceptAllSugg} style={{ background: "#f97316", border: "none", color: "white", padding: "4px 10px", borderRadius: 8, fontSize: 11, fontWeight: 700, cursor: "pointer" }}>Tout importer</button>
            </div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            {suggestions.map(sugg => (
              <div key={sugg.id} style={{ display: "flex", alignItems: "center", gap:10, background: t.card, padding: "8px 12px", borderRadius: 10, border: `1px solid ${t.cardBdr}` }}>
                <span style={{ flex: 1, fontSize: 12, color: t.text }}>{sugg.text}</span>
                <button onClick={() => onMarkSuggDone(sugg)} style={{ background: "none", border: "none", cursor: "pointer", fontSize: 12 }} title="Marquer comme fait hier">✅</button>
                <button onClick={() => onAcceptSugg(sugg)} style={{ background: "rgba(139,92,246,0.15)", border: "none", color: "#c4b5fd", padding: "4px 8px", borderRadius: 6, fontSize: 11, cursor: "pointer" }}>➕ Importer</button>
                <button onClick={() => onDismissSugg(sugg.id)} style={{ background: "none", border: "none", color: t.delColor, cursor: "pointer", fontSize: 12 }}>✕</button>
              </div>
            ))}
          </div>
        </div>
      )}
      <div style={{ display:"grid", gridTemplateColumns:showPresets?"1fr 250px":"1fr", gap:18 }}>
        <div className="gc" style={s.card}>
          <div style={s.cardHead}>
            <span style={s.cardTitle}>Tâches du jour</span>
            {goals.length > 0 && (() => {
              const info = goals.length <= 3 ? { label:"journée légère", color:"#34d399" }
                : goals.length <= 6 ? { label:"journée normale", color:"#38bdf8" }
                : goals.length <= 9 ? { label:"journée chargée", color:"#f97316" }
                : { label:"journée ambitieuse ⚡", color:"#fb923c" };
              return <span style={{ fontSize:10, padding:"2px 9px", borderRadius:20, background:info.color+"1a", color:info.color, border:`1px solid ${info.color}33`, fontWeight:600 }}>{info.label}</span>;
            })()}
            <span style={{ fontSize:11, color:t.textDim }}>{done}/{goals.length}</span>
            <button onClick={()=>setVM(v=>v==="list"?"horaire":"list")}
              style={{ fontSize:11, padding:"3px 10px", borderRadius:8, border:`1px solid ${viewMode==="horaire"?"rgba(56,189,248,0.45)":t.inpBdr}`, background:viewMode==="horaire"?"rgba(56,189,248,0.12)":"transparent", color:viewMode==="horaire"?"#38bdf8":t.textSub, cursor:"pointer", fontWeight:viewMode==="horaire"?600:400, flexShrink:0 }}>
              {viewMode==="list"?"⏱ Horaire":"📋 Liste"}
            </button>
          </div>
          <div style={{ padding:"12px 16px", borderBottom:`1px solid ${t.divider}`, display:"flex", gap:8, flexWrap:"wrap" }}>
            <input style={{ ...s.input, flex:1, minWidth:140 }} value={text} onChange={e=>setText(e.target.value)}
              onKeyDown={e=>{ if(e.key==="Enter"){ onAdd(text,cat,pri); setText(""); } }}
              placeholder="Nouvelle tâche… (Entrée)" />
            <select style={s.sel} value={cat} onChange={e=>setCat(e.target.value)}>
              {CATEGORIES.map(c=><option key={c.id} value={c.id}>{CAT_ICONS[c.id]} {c.label}</option>)}
            </select>
            <select style={s.sel} value={pri} onChange={e=>setPri(e.target.value)}>
              {PRIORITIES.map(p=><option key={p.id} value={p.id}>{p.label}</option>)}
            </select>
            <button className="bg" style={s.addBtn} onClick={()=>{ onAdd(text,cat,pri); setText(""); }}>Ajouter</button>
          </div>
          {viewMode==="list" && <GoalFilters filterStatus={filterStatus} setFS={setFS} filterCat={filterCat} setFC={setFC} t={t} />}
          {viewMode==="list" ? (
            <div style={{ padding:"6px 8px", minHeight:80, maxHeight:420, overflowY:"auto" }}>
              {(()=>{
                const committedFiltered = filtered.filter(g => !g.isBonus);
                const bonusFiltered = filtered.filter(g => g.isBonus);
                const scoreTarget  = settings?.scoreTarget ?? SCORE_TARGET;
                const scoreMinL3   = settings?.scoreMinL3  ?? SCORE_MIN_L3;
                const scoreMinL2   = settings?.scoreMinL2  ?? SCORE_MIN_L2;
                const scoreMinL1   = settings?.scoreMinL1  ?? SCORE_MIN_L1;
                const earnedScore = [...committedFiltered, ...bonusFiltered].filter(g=>g.done&&g.level).reduce((s,g)=>s+g.level,0);
                const bonusScore  = bonusFiltered.filter(g=>g.done&&g.level).reduce((s,g)=>s+g.level,0);
                const l3Done      = committedFiltered.filter(g=>g.done&&g.level===3).length;
                const l2Done      = committedFiltered.filter(g=>g.done&&g.level===2).length;
                const l1Done      = committedFiltered.filter(g=>g.done&&g.level===1).length;
                const l3Total     = committedFiltered.filter(g=>g.level===3).length;
                const l2Total     = committedFiltered.filter(g=>g.level===2).length;
                const l1Total     = committedFiltered.filter(g=>g.level===1).length;
                const scorePct    = Math.min(100, earnedScore / scoreTarget * 100);
                const pointsOk    = earnedScore >= scoreTarget;
                const scoreOk     = pointsOk && l3Done >= scoreMinL3 && l2Done >= scoreMinL2 && l1Done >= scoreMinL1;
                const scoreColor  = scoreOk ? "#34d399" : pointsOk ? "#a3e635" : earnedScore >= scoreTarget/2 ? "#f97316" : "#f87171";
                return <>
                  {/* Score panel */}
                  {committedFiltered.some(g=>g.level) && (
                    <div style={{ margin:"6px 8px 4px", padding:"8px 12px", borderRadius:10, background:scoreOk?"rgba(52,211,153,0.06)":"rgba(139,92,246,0.05)", border:`1px solid ${scoreColor}25` }}>
                      <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:4 }}>
                        <span style={{ fontSize:11, fontWeight:700, color:t.textSub, flex:1 }}>🎯 Score du jour</span>
                        {pointsOk && (
                          <span style={{ fontSize:15, fontWeight:900, color:"#4ade80", background:"rgba(74,222,128,0.12)", border:"1px solid rgba(74,222,128,0.35)", borderRadius:8, padding:"1px 9px", letterSpacing:"-0.5px" }}>
                            {earnedScore} ✓
                          </span>
                        )}
                        {!pointsOk && <span style={{ fontSize:14, fontWeight:800, color:scoreColor }}>{earnedScore}<span style={{ fontSize:10, fontWeight:400, color:t.textDim }}> / {scoreTarget} pts</span></span>}
                        <button onClick={()=>{ setShowScoreSettings(v=>!v); setEditScoreTarget(String(scoreTarget)); setEditScoreMinL3(String(scoreMinL3)); setEditScoreMinL2(String(scoreMinL2)); setEditScoreMinL1(String(scoreMinL1)); }}
                          style={{ background:"none", border:"none", cursor:"pointer", fontSize:13, opacity:showScoreSettings?1:0.35, padding:"1px 3px", transition:"opacity 0.15s" }}
                          onMouseEnter={e=>e.currentTarget.style.opacity="1"} onMouseLeave={e=>e.currentTarget.style.opacity=showScoreSettings?"1":"0.35"}>⚙️</button>
                      </div>
                      {showScoreSettings && (
                        <div style={{ display:"flex", flexWrap:"wrap", gap:8, alignItems:"center", marginBottom:8, padding:"6px 8px", borderRadius:8, background:"rgba(255,255,255,0.04)", border:`1px solid ${t.glassBdr}` }}>
                          <span style={{ fontSize:10, color:t.textDim, whiteSpace:"nowrap" }}>Objectif pts :</span>
                          <input type="number" min="1" max="50" value={editScoreTarget} onChange={e=>setEditScoreTarget(e.target.value)}
                            style={{ ...s.input, width:44, padding:"3px 6px", fontSize:12, textAlign:"center" }} />
                          <span style={{ fontSize:10, color:"#f87171", whiteSpace:"nowrap" }}>Min ×3 :</span>
                          <input type="number" min="0" max="20" value={editScoreMinL3} onChange={e=>setEditScoreMinL3(e.target.value)}
                            style={{ ...s.input, width:44, padding:"3px 6px", fontSize:12, textAlign:"center" }} />
                          <span style={{ fontSize:10, color:"#f97316", whiteSpace:"nowrap" }}>Min ×2 :</span>
                          <input type="number" min="0" max="20" value={editScoreMinL2} onChange={e=>setEditScoreMinL2(e.target.value)}
                            style={{ ...s.input, width:44, padding:"3px 6px", fontSize:12, textAlign:"center" }} />
                          <span style={{ fontSize:10, color:"#34d399", whiteSpace:"nowrap" }}>Min ×1 :</span>
                          <input type="number" min="0" max="20" value={editScoreMinL1} onChange={e=>setEditScoreMinL1(e.target.value)}
                            style={{ ...s.input, width:44, padding:"3px 6px", fontSize:12, textAlign:"center" }} />
                          <button onClick={()=>{ onUpdateSettings({ scoreTarget:+editScoreTarget||scoreTarget, scoreMinL3:+editScoreMinL3, scoreMinL2:+editScoreMinL2, scoreMinL1:+editScoreMinL1 }); setShowScoreSettings(false); }}
                            style={{ padding:"3px 10px", borderRadius:7, border:"none", background:"rgba(139,92,246,0.2)", color:"#c4b5fd", cursor:"pointer", fontSize:11, fontWeight:600, whiteSpace:"nowrap" }}>✓ OK</button>
                        </div>
                      )}
                      <div style={{ height:5, borderRadius:3, background:"rgba(255,255,255,0.07)", overflow:"hidden", marginBottom:5 }}>
                        <div style={{ height:"100%", borderRadius:3, width:`${scorePct}%`, background:scoreColor, transition:"width 0.4s ease" }}/>
                      </div>
                      <div style={{ display:"flex", gap:10, fontSize:10, color:t.textDim, flexWrap:"wrap" }}>
                        {scoreMinL3>0 && <span style={{ color: l3Done>=scoreMinL3?"#34d399":t.textDim }}>×3 : {l3Done}/{Math.max(scoreMinL3,l3Total)} {l3Done>=scoreMinL3?"✓":""}</span>}
                        {scoreMinL2>0 && <span style={{ color: l2Done>=scoreMinL2?"#34d399":t.textDim }}>×2 : {l2Done}/{Math.max(scoreMinL2,l2Total)} {l2Done>=scoreMinL2?"✓":""}</span>}
                        {scoreMinL1>0 && <span style={{ color: l1Done>=scoreMinL1?"#34d399":t.textDim }}>×1 : {l1Done}/{Math.max(scoreMinL1,l1Total)} {l1Done>=scoreMinL1?"✓":""}</span>}
                        {scoreMinL3===0&&scoreMinL2===0&&scoreMinL1===0 && l3Total>0 && <span style={{ color: l3Done>=scoreMinL3?"#34d399":t.textDim }}>×3 : {l3Done}/{l3Total}</span>}
                        <span>· Engagé : {committedFiltered.filter(g=>g.done).length}/{committedFiltered.length}</span>
                        {bonusFiltered.length>0 && <span>· Bonus : {bonusFiltered.filter(g=>g.done).length}/{bonusFiltered.length} ⭐{bonusScore>0?` +${bonusScore}pts`:""}</span>}
                      </div>
                    </div>
                  )}
                  {committedFiltered.length===0 && bonusFiltered.length===0
                    ? <div style={{textAlign:"center",color:t.textTiny,padding:"32px 0",fontSize:13}}>Aucune tâche pour ce jour</div>
                    : <>
                        {committedFiltered.map((g,i)=>(
                          <GoalItem key={g.id} goal={g} idx={goals.indexOf(g)} onToggle={()=>onToggle(g.id)} onRemove={()=>onRemove(g.id)} onUpdate={p=>onUpdate(g.id,p)} onReorder={handleReorder} showPendingBadge isDay weekGoals={weekGoals} onLink={wgId=>onLink(g.id,wgId)} onAddSubtask={text=>onAddSubtask(g.id,text)} onToggleSubtask={sid=>onToggleSubtask(g.id,sid)} onRemoveSubtask={sid=>onRemoveSubtask(g.id,sid)} projects={projects||[]} courses={courses||[]} t={t} s={s} />
                        ))}
                        {bonusFiltered.length>0 && (
                          <>
                            <div style={{ display:"flex", alignItems:"center", gap:8, padding:"6px 8px 2px" }}>
                              <div style={{ flex:1, height:1, background:t.divider }}/>
                              <span style={{ fontSize:10, color:t.textDim, fontWeight:600, whiteSpace:"nowrap" }}>⭐ Bonus</span>
                              <div style={{ flex:1, height:1, background:t.divider }}/>
                            </div>
                            {bonusFiltered.map((g,i)=>(
                              <GoalItem key={g.id} goal={g} idx={goals.indexOf(g)} onToggle={()=>onToggle(g.id)} onRemove={()=>onRemove(g.id)} onUpdate={p=>onUpdate(g.id,p)} onReorder={handleReorder} showPendingBadge isDay weekGoals={weekGoals} onLink={wgId=>onLink(g.id,wgId)} onAddSubtask={text=>onAddSubtask(g.id,text)} onToggleSubtask={sid=>onToggleSubtask(g.id,sid)} onRemoveSubtask={sid=>onRemoveSubtask(g.id,sid)} projects={projects||[]} courses={courses||[]} t={t} s={s} />
                            ))}
                          </>
                        )}
                      </>
                  }
                </>;
              })()}
            </div>
          ) : (
            <div style={{ padding:"12px 14px", maxHeight:520, overflowY:"auto" }}>
              <TimelineView goals={goals} courseSessions={courseSessions||[]} projects={projects||[]} dayKey={dayKey} onToggleGoal={onToggle} t={t} s={s} />
            </div>
          )}
          <CatProgressBars goals={goals} t={t} />
        </div>
        {showPresets && <PresetPanel habits={habits} habitsDone={habitsDone} habitsData={habitsData} dayKey={dayKey} onToggle={onToggleHabit} label="📅 Habitudes du jour" s={s} t={t} />}
      </div>
      {/* Feature 6: Monday planning mode */}
      {isMonday && isToday && (
        <div className="gc" style={{ ...s.card, marginTop:18, border:"1px solid rgba(139,92,246,0.3)", background:"rgba(139,92,246,0.05)" }}>
          <div style={s.cardHead}>
            <span style={s.cardTitle}>🗓 Planification de la semaine</span>
          </div>
          <div style={{ padding:"14px 18px" }}>
            <div style={{ fontSize:13, color:"#c4b5fd", fontWeight:600, marginBottom:12 }}>C'est lundi — prends 5 minutes pour organiser ta semaine !</div>
            <div style={{ display:"flex", gap:18, flexWrap:"wrap" }}>
              <div style={{ display:"flex", flexDirection:"column", gap:4 }}>
                <div style={{ fontSize:11, color:t.textDim }}>Priorités du mois</div>
                <div style={{ fontSize:20, fontWeight:800, color:t.text }}>{monthTasks?.length ?? 0}/3</div>
                {monthTasks && monthTasks.filter(x=>x.done).length > 0 && <div style={{ fontSize:10, color:"#34d399" }}>{monthTasks.filter(x=>x.done).length} accomplie(s)</div>}
              </div>
              <div style={{ display:"flex", flexDirection:"column", gap:4 }}>
                <div style={{ fontSize:11, color:t.textDim }}>Objectifs semaine</div>
                <div style={{ fontSize:20, fontWeight:800, color:t.text }}>{weekGoals?.length ?? 0}</div>
              </div>
              <div style={{ display:"flex", flexDirection:"column", gap:4 }}>
                <div style={{ fontSize:11, color:t.textDim }}>Backlog To-Do</div>
                <div style={{ fontSize:20, fontWeight:800, color:t.text }}>{todoCount ?? 0}</div>
              </div>
            </div>
            {monthTasks && monthTasks.length > 0 && (
              <div style={{ marginTop:12, display:"flex", flexDirection:"column", gap:5 }}>
                {monthTasks.map((mt,i) => (
                  <div key={mt.id} style={{ fontSize:12, color:mt.done?"#34d399":t.text, display:"flex", gap:6, alignItems:"center" }}>
                    <span style={{ color:t.textTiny }}>{i+1}.</span>
                    <span style={{ textDecoration:mt.done?"line-through":"none" }}>{mt.text}</span>
                    {mt.done && <span style={{ fontSize:10 }}>✓</span>}
                  </div>
                ))}
              </div>
            )}
            <button style={{ marginTop:14, padding:"7px 16px", borderRadius:10, border:"1px solid rgba(139,92,246,0.4)", background:"rgba(139,92,246,0.12)", color:"#c4b5fd", fontSize:12, cursor:"pointer", fontWeight:600 }}>
              Aller aux objectifs →
            </button>
          </div>
        </div>
      )}

      {/* Résumé de semaine — dimanche uniquement, 4 questions sauvegardées */}
      {isSunday && (
        <div className="gc" style={{ ...s.card, marginTop:18, border:"1px solid rgba(249,115,22,0.3)", background:"rgba(249,115,22,0.04)" }}>
          <div style={s.cardHead}>
            <span style={s.cardTitle}>📋 Résumé de semaine</span>
            <span style={{ fontSize:11, color:"#f97316" }}>{weekDoneTasks ?? 0} tâches cette semaine</span>
          </div>
          <div style={{ padding:"14px 16px", display:"flex", flexDirection:"column", gap:14 }}>
            <div style={{ fontSize:12, color:t.textDim }}>C'est dimanche — bilan de ta semaine ✍️</div>
            {[
              { key:"q1", label:"🏆 Ce que j'ai accompli cette semaine", placeholder:"Mes victoires, grandes ou petites…" },
              { key:"q2", label:"✅ Ce qui a bien marché",               placeholder:"Habitudes, méthodes, moments…" },
              { key:"q3", label:"🔄 Ce que je ferais différemment",      placeholder:"Ce qui n'a pas marché, à ajuster…" },
              { key:"q4", label:"🎯 Priorité de la semaine prochaine",   placeholder:"L'objectif n°1 pour la semaine prochaine…" },
            ].map(({ key, label, placeholder }) => (
              <div key={key}>
                <div style={{ fontSize:11, fontWeight:600, color:"#f97316", marginBottom:5 }}>{label}</div>
                <textarea
                  style={{ ...s.input, width:"100%", minHeight:72, resize:"vertical", lineHeight:1.6, fontSize:12 }}
                  value={weekReview?.[key] || ""}
                  onChange={e => onWeekReviewChange({ [key]: e.target.value })}
                  onBlur={e => onWeekReviewChange({ [key]: e.target.value })}
                  placeholder={placeholder}
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {meals && meals.length > 0 && (
        <div className="gc" style={{ ...s.card, marginTop:18 }}>
          <div style={s.cardHead}><span style={s.cardTitle}>🍽️ Repas du jour</span></div>
          <div style={{ padding:"10px 14px", display:"flex", flexDirection:"column", gap:6 }}>
            {meals.map(m => (
              <div key={m.id} style={{ display:"flex", alignItems:"center", gap:10, padding:"8px 12px", borderRadius:10, background:"rgba(180,87,9,0.08)", border:"1px solid rgba(180,87,9,0.2)" }}>
                <span style={{ fontSize:16 }}>{m.emoji||"🍽️"}</span>
                <span style={{ flex:1, fontSize:13, color:"#fdba74", fontWeight:600 }}>{m.name}</span>
                {m.prepTime && <span style={{ fontSize:11, color:"#92400e" }}>⏱ {m.prepTime}min</span>}
                <button onClick={()=>onRemoveMeal(m.id)} style={{ background:"none", border:"none", cursor:"pointer", color:"#92400e", fontSize:14, padding:"2px 4px" }}>✕</button>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="gc" style={{ ...s.card, marginTop:18 }}>
        <div style={s.cardHead}>
          <span style={s.cardTitle}>📝 Journal du jour</span>
          <div style={{ display:"flex", alignItems:"center", gap:8 }}>
            {/* Mood picker */}
            <div style={{ display:"flex", gap:3 }}>
              {["😫","🙁","😐","🙂","😄"].map((em,i) => {
                const v = i+1;
                return (
                  <button key={v} onClick={()=>onMoodChange(mood===v?0:v)}
                    title={["Difficile","Bof","Neutre","Bien","Super !"][i]}
                    style={{ background:mood===v?"rgba(139,92,246,0.2)":"transparent", border:`1px solid ${mood===v?"rgba(139,92,246,0.5)":"transparent"}`, borderRadius:8, padding:"2px 4px", cursor:"pointer", fontSize:15, opacity:mood===0||mood===v?1:0.35, transition:"all 0.15s" }}>
                    {em}
                  </button>
                );
              })}
            </div>
            {journalDraft && <span style={{ fontSize:10, color:"#34d399" }}>sauvegardé</span>}
          </div>
        </div>
        <div style={{ padding:"14px 16px" }}>
          <textarea
            value={journalDraft}
            onChange={e=>setJournalDraft(e.target.value)}
            onBlur={()=>onJournalChange(journalDraft)}
            placeholder="Comment s'est passée ta journée ? Qu'est-ce que tu as appris, ressenti, accompli…"

            style={{ ...s.input, width:"100%", minHeight:120, resize:"vertical", lineHeight:1.6, fontSize:13 }}
          />
        </div>
      </div>
    </div>
  );
}

// ── WeekView ──────────────────────────────────────────────────────────────────

function WeekView({ goals, wTotal, wDone, wPct, wColor, onAdd, onToggle, onRemove, onUpdate, onReorder, showPresets, habits, habitsDone, onToggleHabit, onAddPreset, onAddSubtask, onToggleSubtask, onRemoveSubtask, s, t }) {
  const [text, setText]       = useState("");
  const [cat,  setCat]        = useState("pro");
  const [pri,  setPri]        = useState("mid");
  const [filterCat,  setFC]   = useState("all");
  const [filterStatus, setFS] = useState("all");

  const filtered = goals
    .filter(g=>filterCat==="all"||g.cat===filterCat)
    .filter(g=>filterStatus==="all"
      ||(filterStatus==="done"  ? g.done
      :  filterStatus==="doing" ? (g.doing&&!g.done)
      :  (!g.done&&!g.doing)))
    .sort((a,b)=>{
      const stateA=a.done?2:a.doing?0:1, stateB=b.done?2:b.doing?0:1;
      if(stateA!==stateB) return stateA-stateB;
      return ({high:0,mid:1,low:2}[a.priority]??1)-({high:0,mid:1,low:2}[b.priority]??1);
    });

  const filteredIds = filtered.map(g=>g.id);
  const handleReorder = (fromIdx, toIdx) => {
    const fromId=filteredIds[fromIdx], toId=filteredIds[toIdx];
    const origFrom=goals.findIndex(g=>g.id===fromId), origTo=goals.findIndex(g=>g.id===toId);
    onReorder(origFrom, origTo);
  };

  return (
    <div className="fi">
      <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(140px,1fr))", gap:12, marginBottom:22 }}>
        <StatCard label="Total"     value={wTotal}      color={catCol("pro",t)}   delay={0}    t={t} />
        <StatCard label="Accomplis" value={wDone}        color={catCol("sport",t)} delay={0.05} t={t} />
        <StatCard label="Restants"  value={wTotal-wDone} color={priCol("mid",t)}   delay={0.1}  t={t} />
        <StatCard label="Réussite"  value={wPct+"%"}     color={wColor}  delay={0.15} t={t} />
      </div>
      <div style={{ display:"grid", gridTemplateColumns:showPresets?"1fr 270px":"1fr", gap:18 }}>
        <div className="gc" style={s.card}>
          <div style={s.cardHead}><span style={s.cardTitle}>Objectifs de la semaine</span><span style={{ fontSize:11, color:t.textDim }}>{wDone}/{wTotal}</span></div>
          <div style={{ padding:"12px 16px", borderBottom:`1px solid ${t.divider}`, display:"flex", gap:8, flexWrap:"wrap" }}>
            <input style={{ ...s.input, flex:1, minWidth:160 }} value={text} onChange={e=>setText(e.target.value)}
              onKeyDown={e=>{ if(e.key==="Enter"){ onAdd(text,cat,pri); setText(""); } }}
              placeholder="Nouvel objectif… (Entrée)" />
            <select style={s.sel} value={cat} onChange={e=>setCat(e.target.value)}>
              {CATEGORIES.map(c=><option key={c.id} value={c.id}>{CAT_ICONS[c.id]} {c.label}</option>)}
            </select>
            <select style={s.sel} value={pri} onChange={e=>setPri(e.target.value)}>
              {PRIORITIES.map(p=><option key={p.id} value={p.id}>{p.label}</option>)}
            </select>
            <button className="bg" style={s.addBtn} onClick={()=>{ onAdd(text,cat,pri); setText(""); }}>Ajouter</button>
          </div>
          <GoalFilters filterStatus={filterStatus} setFS={setFS} filterCat={filterCat} setFC={setFC} t={t} />
          <div style={{ padding:"6px 8px", minHeight:80, maxHeight:420, overflowY:"auto" }}>
            {filtered.length===0
              ? <div style={{ textAlign:"center", color:t.textTiny, padding:"32px 0", fontSize:13 }}>Aucun objectif cette semaine</div>
              : filtered.map((g,i)=>(
                <GoalItem key={g.id} goal={g} idx={i} onToggle={()=>onToggle(g.id)} onRemove={()=>onRemove(g.id)} onUpdate={p=>onUpdate(g.id,p)} onReorder={handleReorder} isWeekGoal onAddSubtask={text=>onAddSubtask(g.id,text)} onToggleSubtask={sid=>onToggleSubtask(g.id,sid)} onRemoveSubtask={sid=>onRemoveSubtask(g.id,sid)} t={t} s={s} />
              ))
            }
          </div>
          <CatProgressBars goals={goals} t={t} />
        </div>
        {showPresets && <PresetPanel habits={habits} habitsDone={habitsDone} onToggle={onToggleHabit} label="🗓 Habitudes de la semaine" s={s} t={t} />}
      </div>
    </div>
  );
}

// ── MonthView ─────────────────────────────────────────────────────────────────

function MonthView({ tasks, monthLabel, wPct, wDone, wTotal, weekLabel, onAdd, onToggle, onRemove, s, t }) {
  const [text, setText] = useState("");
  const canAdd = tasks.length < 3;
  const done   = tasks.filter(x=>x.done).length;
  const wc     = pc(wPct, t);

  return (
    <div className="fi">
      <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(140px,1fr))", gap:12, marginBottom:22 }}>
        <StatCard label="Priorités"  value={`${tasks.length}/3`} color={catCol("maison",t)} delay={0}    t={t} />
        <StatCard label="Accomplies" value={done}                 color={catCol("sport",t)}  delay={0.05} t={t} />
        <StatCard label="Semaine"    value={`${wPct}%`}           color={wc}      delay={0.1}  t={t} />
      </div>
      <div className="gc" style={s.card}>
        <div style={s.cardHead}>
          <span style={s.cardTitle}>📆 Priorités de {monthLabel}</span>
          <span style={{ fontSize:11, color:t.textDim }}>{done}/{tasks.length} accompli(s)</span>
        </div>
        <div style={{ margin:"12px 16px 0", padding:"10px 14px", borderRadius:10, background:t.weekCtxBg, border:`1px solid ${t.cardBdr}`, display:"flex", alignItems:"center", gap:10 }}>
          <span style={{ fontSize:11, color:t.text, whiteSpace:"nowrap", flexShrink:0 }}>Semaine — {weekLabel}</span>
          <div style={{ flex:1, minWidth:0 }}><ProgressBar pct={wPct} color={wc} t={t} /></div>
          <span style={{ fontSize:11, fontWeight:700, color:wc, whiteSpace:"nowrap", flexShrink:0 }}>{wDone}/{wTotal}</span>
        </div>
        <div style={{ padding:"16px", display:"flex", flexDirection:"column", gap:10 }}>
          {[0,1,2].map(i=>{
            const task=tasks[i];
            return (
              <div key={i} className="fu" style={{ display:"flex", alignItems:"center", gap:12, padding:"14px 16px", borderRadius:12, background:task?(task.done?"rgba(52,211,153,0.06)":t.monthSlot):t.monthEmpty, border:`1px solid ${task?(task.done?"rgba(52,211,153,0.2)":t.monthSlotBdr):t.monthEmptyBdr}`, minHeight:54, animationDelay:`${i*0.07}s` }}>
                <div style={{ width:28, height:28, borderRadius:8, background:task?.done?"rgba(52,211,153,0.15)":"rgba(139,92,246,0.15)", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
                  <span style={{ fontSize:13, fontWeight:800, color:task?.done?"#34d399":"#a78bfa" }}>{i+1}</span>
                </div>
                {task ? (
                  <>
                    <span style={{ flex:1, fontSize:14, fontWeight:600, color:task.done?t.textDim:t.text, textDecoration:task.done?"line-through":"none" }}>{task.text}</span>
                    <Checkbox done={task.done} color="#34d399" t={t} onToggle={()=>onToggle(task.id)} />
                    <button className="db" style={s.delBtn} onClick={()=>onRemove(task.id)}>✕</button>
                  </>
                ) : (
                  <span style={{ fontSize:13, color:t.textTiny, fontStyle:"italic" }}>— Non défini</span>
                )}
              </div>
            );
          })}
        </div>
        <div style={{ padding:"0 16px 16px" }}>
          {canAdd ? (
            <div style={{ display:"flex", gap:8 }}>
              <input style={{ ...s.input, flex:1 }} value={text} onChange={e=>setText(e.target.value)}
                onKeyDown={e=>{ if(e.key==="Enter"){ onAdd(text); setText(""); } }}
                placeholder={`Priorité n°${tasks.length+1}…`} />
              <button className="bg" style={s.addBtn} onClick={()=>{ onAdd(text); setText(""); }}>Ajouter</button>
            </div>
          ) : (
            <div style={{ textAlign:"center", padding:"12px", borderRadius:10, background:"rgba(52,211,153,0.08)", border:"1px solid rgba(52,211,153,0.2)", fontSize:13, color:"#34d399" }}>✅ Tes 3 priorités sont définies — concentre-toi !</div>
          )}
        </div>
      </div>
      <div className="gc" style={{ ...s.card, marginTop:14 }}>
        <div style={{ padding:"14px 20px" }}>
          <div style={{ fontSize:12, fontWeight:600, color:t.textSub, marginBottom:10 }}>💡 Rappels</div>
          {["Choisis 3 objectifs qui auront le plus d'impact.","Si tout est prioritaire, rien ne l'est.","Reviens ici chaque semaine pour garder le cap."].map((tx,i)=>(
            <div key={i} style={{ fontSize:12, color:t.textDim, padding:"6px 0", borderBottom:i<2?`1px solid ${t.divider}`:"none" }}>→ {tx}</div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── HabitsView ────────────────────────────────────────────────────────────────

function HabitRow({ habit, idx, done, streak, onToggle, onRemove, onUpdate, onReorder, t }) {
  const [editing,  setEditing]  = useState(false);
  const [editText, setEditText] = useState(habit.text);
  const [editIcon, setEditIcon] = useState(habit.icon);
  const [dragOver, setDragOver] = useState(false);

  const commitEdit = () => {
    if (editText.trim()) onUpdate(habit.id, { text:editText.trim(), icon:editIcon||habit.icon });
    setEditing(false);
  };

  return (
    <div
      draggable
      onDragStart={e=>{ e.dataTransfer.setData("habitIdx", String(idx)); }}
      onDragOver={e=>{ e.preventDefault(); setDragOver(true); }}
      onDragLeave={()=>setDragOver(false)}
      onDrop={e=>{ e.preventDefault(); setDragOver(false); const from=+e.dataTransfer.getData("habitIdx"); if(from!==idx) onReorder(from,idx); }}
      className="fu"
      style={{ display:"flex", alignItems:"center", gap:11, padding:"11px 14px", borderRadius:10, marginBottom:5, background:done?"rgba(52,211,153,0.06)":t.habitBg, border:`1px solid ${dragOver?"rgba(139,92,246,0.5)":done?"rgba(52,211,153,0.2)":t.cardBdr}`, outline:dragOver?"2px dashed rgba(139,92,246,0.35)":"none" }}>
      <span style={{ cursor:"grab", color:t.textTiny, fontSize:13, flexShrink:0, userSelect:"none" }}>⠿</span>
      {editing ? (
        <>
          <input value={editIcon} onChange={e=>setEditIcon(e.target.value)}
            style={{ width:38, textAlign:"center", background:t.inp, border:`1px solid ${t.inpBdr}`, borderRadius:6, padding:"3px 4px", fontSize:18, color:t.text, flexShrink:0 }} />
          <input value={editText} onChange={e=>setEditText(e.target.value)} autoFocus
            onKeyDown={e=>{ if(e.key==="Enter"||e.key==="Escape") commitEdit(); }} onBlur={commitEdit}
            style={{ flex:1, background:t.inp, border:`1px solid ${t.inpBdr}`, borderRadius:6, padding:"5px 8px", fontSize:13, color:t.text }} />
        </>
      ) : (
        <div className="hr" style={{ display:"flex", alignItems:"center", gap:11, flex:1, cursor:"pointer" }} onClick={()=>onToggle(habit.id)}>
          <span style={{ fontSize:20 }}>{habit.icon}</span>
          <span onDoubleClick={e=>{ e.stopPropagation(); setEditing(true); setEditText(habit.text); setEditIcon(habit.icon); }}
            title="Double-clic pour renommer"
            style={{ flex:1, fontSize:13, color:done?t.textDim:t.text, textDecoration:done?"line-through":"none", fontWeight:done?400:500 }}>{habit.text}</span>
          {streak>1 && <span className="fl" style={{ fontSize:12, color:"#f97316", fontWeight:700 }}>🔥{streak}</span>}
          <div style={{ width:22, height:22, borderRadius:6, border:`2px solid ${done?"#34d399":t.checkboxBdr}`, background:done?"#34d399":"transparent", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0, boxShadow:done?"0 0 12px #34d39966":"none", transition:"all 0.2s" }}>
            {done && <span style={{ color:"#0f0f1a", fontSize:11, fontWeight:900 }}>✓</span>}
          </div>
        </div>
      )}
      <button className="db" style={{ background:"none", border:"none", cursor:"pointer", fontSize:14, color:t.delColor, padding:"2px 4px", flexShrink:0 }} onClick={e=>{ e.stopPropagation(); onRemove(habit.id); }}>✕</button>
    </div>
  );
}

function AddHabitRow({ text, setText, icon, setIcon, onAdd, divider, s }) {
  return (
    <div style={{ display:"flex", gap:6, padding:"10px 12px", borderTop:`1px solid ${divider}` }}>
      <input value={icon} onChange={e=>setIcon(e.target.value)} style={{ ...s.input, width:46, textAlign:"center", padding:"8px 4px", flexShrink:0 }} placeholder="🌟" />
      <input value={text} onChange={e=>setText(e.target.value)}
        onKeyDown={e=>{ if(e.key==="Enter"&&text.trim()){ onAdd(text.trim(), icon||"⭐"); setText(""); setIcon("⭐"); } }}
        style={{ ...s.input, flex:1 }} placeholder="Nouvelle habitude… (Entrée)" />
      <button className="bg" style={{ ...s.addBtn, padding:"8px 14px", fontSize:12 }}
        onClick={()=>{ if(text.trim()){ onAdd(text.trim(), icon||"⭐"); setText(""); setIcon("⭐"); } }}>+</button>
    </div>
  );
}

function HabitsView({ weekDone, dayDone, onToggleWeek, onToggleDay, habitsData, weekKey, selectedDay, weeklyHabits, dailyHabits, onAddWeekly, onRemoveWeekly, onUpdateWeekly, onReorderWeekly, onResetWeekly, onAddDaily, onRemoveDaily, onUpdateDaily, onReorderDaily, onResetDaily, s, t }) {
  const wPct = weeklyHabits.length===0?0:Math.round(weekDone.length/weeklyHabits.length*100);
  const dPct = dailyHabits.length===0 ?0:Math.round(dayDone.length/dailyHabits.length*100);
  const wc=pc(wPct,t), dc=pc(dPct,t);
  const dayLabel = new Date(selectedDay).toLocaleDateString("fr-FR",{weekday:"short",day:"numeric",month:"short"});

  const [wText, setWText] = useState("");
  const [wIcon, setWIcon] = useState("⭐");
  const [dText, setDText] = useState("");
  const [dIcon, setDIcon] = useState("⭐");

  return (
    <div className="fi" style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:22 }}>
      <div>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(120px,1fr))", gap:10, marginBottom:16 }}>
          <StatCard label="Cette semaine" value={`${weekDone.length}/${weeklyHabits.length}`} color={catCol("pro",t)} delay={0}    t={t} />
          <StatCard label="Réussite"       value={`${wPct}%`}                                  color={wc}      delay={0.05} t={t} />
        </div>
        <div className="gc" style={s.card}>
          <div style={s.cardHead}>
            <span style={s.cardTitle}>🗓 Hebdomadaires</span>
            <button onClick={onResetWeekly} title="Rétablir la liste par défaut"
              style={{ fontSize:10, color:t.textTiny, background:"transparent", border:"none", cursor:"pointer", opacity:0.5, padding:"2px 6px" }}
              onMouseEnter={e=>e.currentTarget.style.opacity="1"} onMouseLeave={e=>e.currentTarget.style.opacity="0.5"}>↺ défaut</button>
          </div>
          <div style={{ padding:"10px 12px" }}>
            {weeklyHabits.length===0
              ? <div style={{ textAlign:"center", color:t.textTiny, padding:"24px 0", fontSize:13 }}>Aucune habitude — ajoutes-en une !</div>
              : weeklyHabits.map((h,i)=><HabitRow key={h.id} habit={h} idx={i} done={weekDone.includes(h.id)} streak={computeWeekStreak(h.id,habitsData,weekKey)} onToggle={onToggleWeek} onRemove={onRemoveWeekly} onUpdate={onUpdateWeekly} onReorder={onReorderWeekly} t={t} />)
            }
          </div>
          <AddHabitRow text={wText} setText={setWText} icon={wIcon} setIcon={setWIcon} onAdd={onAddWeekly} divider={t.divider} s={s} />
          <div style={{ padding:"10px 16px", borderTop:`1px solid ${t.divider}` }}>
            <ProgressBar pct={wPct} color={wc} t={t} />
          </div>
        </div>
      </div>
      <div>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(120px,1fr))", gap:10, marginBottom:16 }}>
          <StatCard label={dayLabel} value={`${dayDone.length}/${dailyHabits.length}`} color={catCol("sport",t)} delay={0.05} t={t} />
          <StatCard label="Réussite"  value={`${dPct}%`}                                color={dc}      delay={0.1}  t={t} />
        </div>
        <div className="gc" style={s.card}>
          <div style={s.cardHead}>
            <span style={s.cardTitle}>📅 Quotidiennes</span>
            <button onClick={onResetDaily} title="Rétablir la liste par défaut"
              style={{ fontSize:10, color:t.textTiny, background:"transparent", border:"none", cursor:"pointer", opacity:0.5, padding:"2px 6px" }}
              onMouseEnter={e=>e.currentTarget.style.opacity="1"} onMouseLeave={e=>e.currentTarget.style.opacity="0.5"}>↺ défaut</button>
          </div>
          <div style={{ padding:"10px 12px" }}>
            {dailyHabits.length===0
              ? <div style={{ textAlign:"center", color:t.textTiny, padding:"24px 0", fontSize:13 }}>Aucune habitude — ajoutes-en une !</div>
              : dailyHabits.map((h,i)=><HabitRow key={h.id} habit={h} idx={i} done={dayDone.includes(h.id)} streak={computeDayStreak(h.id,habitsData,selectedDay)} onToggle={onToggleDay} onRemove={onRemoveDaily} onUpdate={onUpdateDaily} onReorder={onReorderDaily} t={t} />)
            }
          </div>
          <AddHabitRow text={dText} setText={setDText} icon={dIcon} setIcon={setDIcon} onAdd={onAddDaily} divider={t.divider} s={s} />
          <div style={{ padding:"10px 16px", borderTop:`1px solid ${t.divider}` }}>
            <ProgressBar pct={dPct} color={dc} t={t} />
          </div>
        </div>
      </div>
    </div>
  );
}

// ── TodoItemRow (with mini date-picker & drag) ────────────────────────────────

function TodoItemRow({ item, i, p, isEditing, editText, setEditing, setEditText, commitEdit, groupBy, onRemove, onScheduleToDay, s, t }) {
  const [showPicker, setShowPicker] = useState(false);

  const days7 = Array.from({length:7}, (_,n) => {
    const d = new Date(); d.setDate(d.getDate() + n);
    const dk = dateToKey(d);
    const label = n === 0 ? "Auj." : n === 1 ? "Dem." : DAYS_FR[(d.getDay()+6)%7].slice(0,3)+".";
    const dateStr = d.toLocaleDateString("fr-FR", {day:"2-digit", month:"2-digit"});
    return { dk, label, dateStr };
  });

  return (
    <div
      draggable
      onDragStart={e => { e.dataTransfer.setData("todoId", item.id); }}
      className="fu"
      style={{ borderRadius:10, marginBottom:4, background:t.card, border:`1px solid ${showPicker?"rgba(139,92,246,0.4)":t.cardBdr}`, animationDelay:`${i*0.03}s`, overflow:"visible" }}>
      <div style={{ display:"flex", alignItems:"center", gap:8, padding:"8px 10px" }}>
        <span style={{ cursor:"grab", color:t.textTiny, fontSize:12, flexShrink:0, userSelect:"none" }}>⠿</span>
        {!groupBy && <span style={{ fontSize:13 }}>{CAT_ICONS[item.cat]}</span>}
        {isEditing
          ? <input
              style={{ ...s.input, flex:1, padding:"4px 8px", fontSize:13, height:28 }}
              value={editText}
              onChange={e => setEditText(e.target.value)}
              onKeyDown={e => { if (e.key==="Enter"||e.key==="Escape") commitEdit(item.id); }}
              onBlur={() => commitEdit(item.id)}
              autoFocus />
          : <span
              onDoubleClick={() => { setEditing(item.id); setEditText(item.text); }}
              title="Double-clic pour modifier"
              style={{ flex:1, fontSize:13, color:t.text, cursor:"text", userSelect:"none" }}>
              {item.text}
            </span>
        }
        {p && <span style={s.badge(priCol(p.id,t))}>{p.label}</span>}
        <button
          onClick={e => { e.stopPropagation(); setShowPicker(v => !v); }}
          style={{ fontSize:11, padding:"3px 9px", borderRadius:8, border:`1px solid ${showPicker?"rgba(139,92,246,0.6)":"rgba(139,92,246,0.4)"}`, background:showPicker?"rgba(139,92,246,0.2)":"rgba(139,92,246,0.1)", color:"#c4b5fd", cursor:"pointer", fontWeight:600, whiteSpace:"nowrap", flexShrink:0 }}>
          📅{showPicker ? " ▴" : " ▾"}
        </button>
        <button className="db" style={s.delBtn} onClick={() => onRemove(item.id)}>✕</button>
      </div>
      {showPicker && (
        <div style={{ display:"flex", gap:5, padding:"6px 10px 10px", flexWrap:"wrap", borderTop:`1px solid ${t.divider}` }}>
          {days7.map(({dk, label, dateStr}) => (
            <button key={dk} onClick={() => { onScheduleToDay(item.id, dk); setShowPicker(false); }}
              style={{ display:"flex", flexDirection:"column", alignItems:"center", padding:"5px 9px", borderRadius:8, border:`1px solid ${t.cardBdr}`, background:t.inp, cursor:"pointer", color:t.text, fontSize:11, gap:1 }}
              onMouseEnter={e=>{ e.currentTarget.style.background="rgba(139,92,246,0.15)"; e.currentTarget.style.borderColor="rgba(139,92,246,0.4)"; e.currentTarget.style.color="#c4b5fd"; }}
              onMouseLeave={e=>{ e.currentTarget.style.background=t.inp; e.currentTarget.style.borderColor=t.cardBdr; e.currentTarget.style.color=t.text; }}>
              <span style={{ fontWeight:700 }}>{label}</span>
              <span style={{ fontSize:9, color:t.textDim }}>{dateStr}</span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

// ── TodoView ──────────────────────────────────────────────────────────────────

function TodoView({ items, onAdd, onRemove, onUpdate, onScheduleToday, onScheduleToDay, s, t }) {
  const [text,    setText]    = useState("");
  const [cat,     setCat]     = useState("perso");
  const [pri,     setPri]     = useState("mid");
  const [groupBy, setGroupBy] = useState(true);
  const [editing, setEditing] = useState(null);
  const [editText, setEditText] = useState("");
  const [filterCat, setFC]    = useState("all");

  const visible = filterCat === "all" ? items : items.filter(x => x.cat === filterCat);

  const groups = groupBy
    ? CATEGORIES.map(c => ({ ...c, items: visible.filter(x => x.cat === c.id) })).filter(g => g.items.length > 0)
    : [{ id:"all", label:"Toutes", color:"#a78bfa", items: visible }];

  const commitEdit = (id) => {
    if (editText.trim()) onUpdate(id, { text: editText.trim() });
    setEditing(null);
  };

  return (
    <div className="fi">
      {/* Stats */}
      <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(140px,1fr))", gap:12, marginBottom:22 }}>
        <StatCard label="Idées en attente" value={items.length}                         color="#a78bfa"          delay={0}    t={t} />
        <StatCard label="Catégories"       value={new Set(items.map(x=>x.cat)).size}    color={catCol("pro",t)}  delay={0.05} t={t} />
        <StatCard label="Haute priorité"   value={items.filter(x=>x.priority==="high").length} color={priCol("high",t)} delay={0.1} t={t} />
      </div>

      {/* Add bar */}
      <div className="gc" style={{ ...s.card, marginBottom:18 }}>
        <div style={{ padding:"14px 16px", display:"flex", gap:8, flexWrap:"wrap" }}>
          <input
            style={{ ...s.input, flex:1, minWidth:160 }}
            value={text}
            onChange={e => setText(e.target.value)}
            onKeyDown={e => { if (e.key==="Enter") { onAdd(text, cat, pri); setText(""); } }}
            placeholder="Nouvelle idée à planifier plus tard… (Entrée)"
          />
          <select style={s.sel} value={cat} onChange={e => setCat(e.target.value)}>
            {CATEGORIES.map(c => <option key={c.id} value={c.id}>{CAT_ICONS[c.id]} {c.label}</option>)}
          </select>
          <select style={s.sel} value={pri} onChange={e => setPri(e.target.value)}>
            {PRIORITIES.map(p => <option key={p.id} value={p.id}>{p.label}</option>)}
          </select>
          <button className="bg" style={s.addBtn} onClick={() => { onAdd(text, cat, pri); setText(""); }}>Ajouter</button>
        </div>
      </div>

      {/* Filters + group toggle */}
      <div style={{ display:"flex", gap:5, flexWrap:"wrap", marginBottom:14, alignItems:"center" }}>
        <button className="fp" onClick={() => setGroupBy(v => !v)}
          style={{ padding:"4px 12px", borderRadius:20, border:`1px solid ${groupBy?"rgba(139,92,246,0.5)":t.filterBdr}`, background:groupBy?t.filterActive:"transparent", color:groupBy?"#c4b5fd":t.textSub, fontSize:11, cursor:"pointer", fontWeight:500 }}>
          {groupBy ? "⊞ Par catégorie" : "≡ Liste"}
        </button>
        <span style={{ color:t.divider, margin:"0 4px", lineHeight:"26px" }}>|</span>
        <button className="fp" onClick={() => setFC("all")}
          style={{ padding:"4px 12px", borderRadius:20, border:`1px solid ${filterCat==="all"?"rgba(139,92,246,0.5)":t.filterBdr}`, background:filterCat==="all"?t.filterActive:"transparent", color:filterCat==="all"?"#c4b5fd":t.textSub, fontSize:11, cursor:"pointer" }}>
          Toutes
        </button>
        {CATEGORIES.map(c => {
          const hasItems = items.some(x => x.cat === c.id);
          if (!hasItems) return null;
          const cc = catCol(c.id, t);
          return (
            <button key={c.id} className="fp"
              onClick={() => setFC(c.id)}
              style={{ padding:"4px 10px", borderRadius:20, border:`1px solid ${filterCat===c.id?cc+"bb":t.filterBdr}`, background:filterCat===c.id?cc+"22":"transparent", color:filterCat===c.id?cc:t.textSub, fontSize:11, cursor:"pointer" }}>
              {CAT_ICONS[c.id]} {items.filter(x=>x.cat===c.id).length}
            </button>
          );
        })}
      </div>

      {/* Items */}
      {visible.length === 0 ? (
        <div style={{ textAlign:"center", color:t.textTiny, padding:"80px 0" }}>
          <div style={{ fontSize:40, marginBottom:12 }}>📌</div>
          <div style={{ fontSize:14 }}>Aucune idée pour l'instant — ajoute des tâches à planifier !</div>
        </div>
      ) : (
        <div style={{ display:"flex", flexDirection:"column", gap:18 }}>
          {groups.map(g => (
            <div key={g.id} className="gc" style={s.card}>
              {groupBy && (
                <div style={s.cardHead}>
                  <span style={{ fontSize:13, fontWeight:700, color:catCol(g.id, t) }}>{CAT_ICONS[g.id]} {g.label}</span>
                  <span style={{ fontSize:11, color:t.textDim }}>{g.items.length} tâche{g.items.length!==1?"s":""}</span>
                </div>
              )}
              <div style={{ padding:"8px 10px" }}>
                {g.items.map((item, i) => {
                  const p = PRIORITIES.find(x => x.id === item.priority);
                  const isEditing = editing === item.id;
                  return (
                    <TodoItemRow key={item.id} item={item} i={i} p={p} isEditing={isEditing} editText={editText}
                      setEditing={setEditing} setEditText={setEditText} commitEdit={commitEdit}
                      groupBy={groupBy} onRemove={onRemove} onScheduleToDay={onScheduleToDay} s={s} t={t} />
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// ── HistoryCalendar ───────────────────────────────────────────────────────────

function HistoryCalendar({ data, t, s }) {
  const now = new Date();
  const [year,  setYear]  = useState(now.getFullYear());
  const [month, setMonth] = useState(now.getMonth());
  const [selDk, setSelDk] = useState(null);
  const todayKey = getTodayKey();

  const daysInMonth = new Date(year, month+1, 0).getDate();
  const startDow    = (new Date(year, month, 1).getDay()+6)%7; // Mon=0

  const prevM = () => { if (month===0){setMonth(11);setYear(y=>y-1);}else setMonth(m=>m-1); setSelDk(null); };
  const nextM = () => {
    if (year===now.getFullYear()&&month===now.getMonth()) return;
    if (month===11){setMonth(0);setYear(y=>y+1);}else setMonth(m=>m+1);
    setSelDk(null);
  };
  const canNext = !(year===now.getFullYear()&&month===now.getMonth());

  const MOOD_EM  = ["","😫","🙁","😐","🙂","😄"];

  const cells = [];
  for (let i=0;i<startDow;i++) cells.push(null);
  for (let d=1;d<=daysInMonth;d++) {
    const dk = `${year}-${String(month+1).padStart(2,"0")}-${String(d).padStart(2,"0")}`;
    const hasJ   = !!(data.journal?.[dk]?.trim());
    const goals  = data.days?.[dk]?.goals||[];
    const done   = goals.filter(g=>g.done).length;
    const mood   = data.moods?.[dk]||0;
    const future = dk > todayKey;
    cells.push({ d, dk, hasJ, total:goals.length, done, mood, future });
  }

  const selData = selDk ? { journal:data.journal?.[selDk]||"", goals:data.days?.[selDk]?.goals||[], mood:data.moods?.[selDk]||0 } : null;

  return (
    <div>
      {/* Month nav */}
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:12 }}>
        <button onClick={prevM} style={{ ...s.iconBtn, border:`1px solid ${t.inpBdr}` }}>◀</button>
        <span style={{ fontSize:14, fontWeight:700, color:t.text }}>{MONTHS_FR[month]} {year}</span>
        <button onClick={nextM} disabled={!canNext} style={{ ...s.iconBtn, border:`1px solid ${t.inpBdr}`, opacity:canNext?1:0.3 }}>▶</button>
      </div>

      {/* Day-of-week headers */}
      <div style={{ display:"grid", gridTemplateColumns:"repeat(7,1fr)", gap:2, marginBottom:2 }}>
        {DAYS_FR.map(d=>(
          <div key={d} style={{ textAlign:"center", fontSize:9, color:t.textTiny, fontWeight:700, padding:"3px 0", textTransform:"uppercase" }}>{d.slice(0,2)}</div>
        ))}
      </div>

      {/* Grid */}
      <div style={{ display:"grid", gridTemplateColumns:"repeat(7,1fr)", gap:2 }}>
        {cells.map((cell,i) => {
          if (!cell) return <div key={`e${i}`} />;
          const { d, dk, hasJ, total, done, mood, future } = cell;
          const isSel   = selDk===dk, isToday=dk===todayKey;
          let dotCol = null;
          if (!future) {
            if (hasJ && total>0) dotCol="#8b5cf6";
            else if (hasJ)       dotCol="#38bdf8";
            else if (total>0)    dotCol = done/total>=0.8?"#34d399":done/total>=0.5?"#f97316":"#f87171";
          }
          return (
            <button key={dk} onClick={()=>setSelDk(isSel?null:dk)}
              style={{ padding:"5px 2px", borderRadius:7, border:`1px solid ${isSel?"#8b5cf6":isToday?"rgba(139,92,246,0.45)":"transparent"}`,
                background:isSel?"rgba(139,92,246,0.15)":isToday?"rgba(139,92,246,0.07)":"transparent",
                cursor:"pointer", display:"flex", flexDirection:"column", alignItems:"center", gap:2, opacity:future?0.3:1 }}>
              <span style={{ fontSize:11, fontWeight:isToday?800:400, color:isToday?"#c4b5fd":t.text, lineHeight:1 }}>{d}</span>
              {dotCol && <div style={{ width:5, height:5, borderRadius:"50%", background:dotCol, flexShrink:0 }} />}
              {mood>0 && !future && <span style={{ fontSize:8, lineHeight:1 }}>{MOOD_EM[mood]}</span>}
            </button>
          );
        })}
      </div>

      {/* Legend */}
      <div style={{ display:"flex", gap:10, marginTop:8, flexWrap:"wrap" }}>
        {[["#8b5cf6","Journal+Tâches"],["#38bdf8","Journal"],["#34d399","≥80%"],["#f97316","50-79%"],["#f87171","<50%"]].map(([col,lbl])=>(
          <div key={lbl} style={{ display:"flex", alignItems:"center", gap:3 }}>
            <div style={{ width:6, height:6, borderRadius:"50%", background:col, flexShrink:0 }} />
            <span style={{ fontSize:9, color:t.textDim }}>{lbl}</span>
          </div>
        ))}
      </div>

      {/* Day detail panel */}
      {selData && (
        <div className="fu" style={{ marginTop:12, borderRadius:12, border:`1px solid rgba(139,92,246,0.3)`, overflow:"hidden" }}>
          <div style={{ padding:"9px 14px", background:"rgba(139,92,246,0.08)", display:"flex", justifyContent:"space-between", alignItems:"center" }}>
            <span style={{ fontSize:12, fontWeight:700, color:"#c4b5fd" }}>
              {new Date(selDk+"T12:00:00").toLocaleDateString("fr-FR",{weekday:"long",day:"numeric",month:"long",year:"numeric"})}
            </span>
            {selData.mood>0 && <span style={{ fontSize:18 }}>{MOOD_EM[selData.mood]}</span>}
          </div>
          <div style={{ padding:"12px 14px", display:"flex", flexDirection:"column", gap:10 }}>
            {selData.journal && (
              <div>
                <div style={{ fontSize:10, fontWeight:700, color:"#38bdf8", marginBottom:4 }}>📝 Journal</div>
                <div style={{ fontSize:12, color:t.text, lineHeight:1.65, whiteSpace:"pre-wrap" }}>{selData.journal}</div>
              </div>
            )}
            {selData.goals.length>0 && (
              <div>
                <div style={{ fontSize:10, fontWeight:700, color:"#34d399", marginBottom:6 }}>✅ Tâches ({selData.goals.filter(g=>g.done).length}/{selData.goals.length})</div>
                <div style={{ display:"flex", flexDirection:"column", gap:3 }}>
                  {selData.goals.map(g=>(
                    <div key={g.id} style={{ display:"flex", alignItems:"center", gap:7 }}>
                      <span style={{ color:g.done?"#34d399":"#f87171", fontSize:10, minWidth:10 }}>{g.done?"✓":"○"}</span>
                      <span style={{ fontSize:12 }}>{CAT_ICONS[g.cat]||"•"}</span>
                      <span style={{ fontSize:12, color:g.done?t.textSub:t.text, textDecoration:g.done?"line-through":"none", opacity:g.done?0.7:1 }}>{g.text}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
            {!selData.journal && !selData.goals.length && (
              <div style={{ textAlign:"center", color:t.textTiny, fontSize:12, padding:"6px 0" }}>Aucune donnée pour ce jour</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

// ── JournalHistoryEntry ───────────────────────────────────────────────────────

function JournalHistoryEntry({ dk, tx, isOpen, onToggle, onSave, t, s }) {
  const [draft, setDraft] = useState(tx);
  const [editing, setEditing] = useState(false);
  useEffect(() => { setDraft(tx); }, [tx]);
  return (
    <div style={{ borderRadius:10, border:`1px solid ${editing?"#8b5cf6":t.cardBdr}`, transition:"border-color 0.2s" }}>
      <div style={{ display:"flex", alignItems:"center", padding:"8px 14px", background:t.progressBg, borderRadius: isOpen ? "10px 10px 0 0" : 10 }}>
        <button onClick={onToggle} style={{ flex:1, display:"flex", justifyContent:"space-between", alignItems:"center", background:"none", border:"none", cursor:"pointer", padding:0 }}>
          <span style={{ fontSize:12, fontWeight:600, color:t.textSub }}>
            {new Date(dk+"T12:00:00").toLocaleDateString("fr-FR",{weekday:"long",day:"numeric",month:"long",year:"numeric"})}
          </span>
          <span style={{ fontSize:10, color:t.textDim }}>{isOpen ? "▲" : "▼"}</span>
        </button>
        {isOpen && !editing && (
          <button onClick={e=>{e.stopPropagation();setEditing(true);}} style={{ marginLeft:8, background:"none", border:"none", cursor:"pointer", fontSize:13, color:t.textDim, padding:"2px 4px" }} title="Modifier">✏️</button>
        )}
      </div>
      {isOpen && (
        <div style={{ padding:"10px 14px" }}>
          {editing ? (
            <>
              <textarea
                autoFocus
                value={draft}
                onChange={e=>setDraft(e.target.value)}
                style={{ ...s.input, width:"100%", minHeight:120, fontSize:13, lineHeight:1.65, resize:"vertical", padding:"10px 12px", boxSizing:"border-box" }}
              />
              <div style={{ display:"flex", gap:8, marginTop:8, justifyContent:"flex-end" }}>
                <button onClick={()=>{setDraft(tx);setEditing(false);}} style={{ padding:"5px 14px", borderRadius:8, border:`1px solid ${t.inpBdr}`, background:"transparent", color:t.textSub, fontSize:12, cursor:"pointer" }}>Annuler</button>
                <button onClick={()=>{onSave(draft);setEditing(false);}} style={{ padding:"5px 14px", borderRadius:8, border:"1px solid rgba(139,92,246,0.5)", background:"rgba(139,92,246,0.15)", color:"#c4b5fd", fontSize:12, fontWeight:700, cursor:"pointer" }}>Sauvegarder</button>
              </div>
            </>
          ) : (
            <div style={{ fontSize:13, color:t.text, lineHeight:1.65, whiteSpace:"pre-wrap", wordBreak:"break-word" }}>{draft}</div>
          )}
        </div>
      )}
    </div>
  );
}

// ── HistoryView ───────────────────────────────────────────────────────────────

function HistoryView({ data, weekKey, onDeletePomodoro, onJournalChange, onDeleteGoal, s, t }) {
  const [query, setQuery] = useState("");
  const [openSections, setOpenSections] = useState({ journal: true, days: false, weeks: false, pomo: false });
  const [openItems, setOpenItems] = useState({});

  const q = query.trim().toLowerCase();

  const toggleSection = key => setOpenSections(prev => ({ ...prev, [key]: !prev[key] }));
  const toggleItem = key => setOpenItems(prev => ({ ...prev, [key]: !prev[key] }));

  // Journal entries
  const journalEntries = Object.entries(data.journal||{})
    .filter(([,tx]) => tx.trim())
    .filter(([dk, tx]) => !q || dk.includes(q) || tx.toLowerCase().includes(q))
    .sort(([a],[b]) => b.localeCompare(a));

  // Day task history
  const dayEntries = Object.entries(data.days||{})
    .filter(([dk, dv]) => (dv.goals||[]).length > 0)
    .filter(([dk, dv]) => !q || dk.includes(q) || (dv.goals||[]).some(g => g.text.toLowerCase().includes(q)))
    .sort(([a],[b]) => b.localeCompare(a));

  // Weekly goals history
  const weekEntries = Object.entries(data.weeks||{})
    .filter(([,wv]) => (wv.goals||[]).length > 0)
    .filter(([wk, wv]) => !q || wk.includes(q) || (wv.goals||[]).some(g => g.text.toLowerCase().includes(q)))
    .sort(([a],[b]) => b.localeCompare(a));

  const SectionHeader = ({ label, count, open, onToggle }) => (
    <button onClick={onToggle} style={{ width:"100%", display:"flex", justifyContent:"space-between", alignItems:"center", padding:"12px 18px", background:"none", border:"none", cursor:"pointer", borderBottom: open ? `1px solid ${t.divider}` : "none" }}>
      <span style={{ fontSize:13, fontWeight:700, color:t.text }}>{label}</span>
      <div style={{ display:"flex", alignItems:"center", gap:8 }}>
        <span style={{ fontSize:11, color:t.textDim, padding:"2px 10px", borderRadius:20, background:t.progressBg }}>{count}</span>
        <span style={{ fontSize:12, color:t.textDim }}>{open ? "▲" : "▼"}</span>
      </div>
    </button>
  );

  return (
    <div className="fi" style={{ display:"grid", gap:14 }}>
      {/* Calendar */}
      <div className="gc" style={s.card}>
        <div style={s.cardHead}><span style={s.cardTitle}>📅 Calendrier</span></div>
        <div style={{ padding:"14px 16px" }}>
          <HistoryCalendar data={data} t={t} s={s} />
        </div>
      </div>

      {/* Search bar */}
      <div style={{ position:"relative" }}>
        <span style={{ position:"absolute", left:14, top:"50%", transform:"translateY(-50%)", fontSize:14, color:t.textDim, pointerEvents:"none" }}>🔍</span>
        <input
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder="Rechercher dans l'historique…"
          style={{ ...s.input, paddingLeft:38, fontSize:13 }}
        />
        {query && (
          <button onClick={() => setQuery("")} style={{ position:"absolute", right:12, top:"50%", transform:"translateY(-50%)", background:"none", border:"none", cursor:"pointer", color:t.textDim, fontSize:14 }}>✕</button>
        )}
      </div>

      {/* Journal section */}
      <div className="gc" style={s.card}>
        <SectionHeader label="📝 Journal" count={`${journalEntries.length} entrée${journalEntries.length!==1?"s":""}`} open={openSections.journal} onToggle={() => toggleSection("journal")} />
        {openSections.journal && (
          <div style={{ padding:"10px 14px", display:"flex", flexDirection:"column", gap:8 }}>
            {journalEntries.length === 0
              ? <div style={{ textAlign:"center", color:t.textTiny, padding:"24px 0", fontSize:12 }}>Aucune entrée{q ? " pour cette recherche" : ""}</div>
              : journalEntries.map(([dk, tx]) => {
                  const isOpen = openItems["j_"+dk] !== false;
                  return <JournalHistoryEntry key={dk} dk={dk} tx={tx} isOpen={isOpen} onToggle={()=>toggleItem("j_"+dk)} onSave={txt=>onJournalChange(dk,txt)} t={t} s={s} />;
                })
            }
          </div>
        )}
      </div>

      {/* Day tasks section */}
      <div className="gc" style={s.card}>
        <SectionHeader label="✅ Tâches par jour" count={`${dayEntries.length} jour${dayEntries.length!==1?"s":""}`} open={openSections.days} onToggle={() => toggleSection("days")} />
        {openSections.days && (
          <div style={{ padding:"10px 14px", display:"flex", flexDirection:"column", gap:8 }}>
            {dayEntries.length === 0
              ? <div style={{ textAlign:"center", color:t.textTiny, padding:"24px 0", fontSize:12 }}>Aucun jour{q ? " pour cette recherche" : ""}</div>
              : dayEntries.map(([dk, dv]) => {
                  const isOpen = !!openItems["d_"+dk];
                  const goals = q ? (dv.goals||[]).filter(g => !q || g.text.toLowerCase().includes(q) || dk.includes(q)) : (dv.goals||[]);
                  const done = goals.filter(g=>g.done).length;
                  const pct = goals.length ? Math.round(done/goals.length*100) : 0;
                  const col = pc(pct, t);
                  return (
                    <div key={dk} style={{ borderRadius:10, border:`1px solid ${t.cardBdr}`, overflow:"hidden" }}>
                      <button onClick={() => toggleItem("d_"+dk)} style={{ width:"100%", display:"flex", justifyContent:"space-between", alignItems:"center", padding:"8px 14px", background:t.progressBg, border:"none", cursor:"pointer" }}>
                        <span style={{ fontSize:12, fontWeight:600, color:t.textSub }}>
                          {new Date(dk+"T12:00:00").toLocaleDateString("fr-FR",{weekday:"short",day:"numeric",month:"short"})}
                        </span>
                        <div style={{ display:"flex", alignItems:"center", gap:8 }}>
                          <span style={{ fontSize:11, color:col, fontWeight:700 }}>{done}/{goals.length} — {pct}%</span>
                          <span style={{ fontSize:10, color:t.textDim }}>{isOpen ? "▲" : "▼"}</span>
                        </div>
                      </button>
                      {isOpen && (
                        <div style={{ padding:"10px 14px", display:"flex", flexDirection:"column", gap:5 }}>
                          {goals.map(g => (
                            <div key={g.id} style={{ display:"flex", alignItems:"center", gap:8, fontSize:12, color:g.done?t.textSub:t.text }}>
                              <span style={{ color:g.done?"#34d399":"#f87171", fontSize:11, minWidth:14 }}>{g.done?"✓":"✕"}</span>
                              <span style={{ fontSize:13 }}>{CAT_ICONS[g.cat]||"•"}</span>
                              <span style={{ textDecoration:g.done?"line-through":"none", opacity:g.done?0.6:1 }}>{g.text}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })
            }
          </div>
        )}
      </div>

      {/* Weekly goals section */}
      <div className="gc" style={s.card}>
        <SectionHeader label="📋 Objectifs hebdomadaires" count={`${weekEntries.length} semaine${weekEntries.length!==1?"s":""}`} open={openSections.weeks} onToggle={() => toggleSection("weeks")} />
        {openSections.weeks && (
          <div style={{ padding:"10px 14px", display:"flex", flexDirection:"column", gap:8 }}>
            {weekEntries.length === 0
              ? <div style={{ textAlign:"center", color:t.textTiny, padding:"24px 0", fontSize:12 }}>Aucune semaine{q ? " pour cette recherche" : ""}</div>
              : weekEntries.map(([wk, wv]) => {
                  const isOpen = !!openItems["w_"+wk];
                  const goals = q ? (wv.goals||[]).filter(g => !q || g.text.toLowerCase().includes(q) || wk.includes(q)) : (wv.goals||[]);
                  const done = goals.filter(g=>g.done).length;
                  const pct = goals.length ? Math.round(done/goals.length*100) : 0;
                  const col = pc(pct, t);
                  return (
                    <div key={wk} style={{ borderRadius:10, border:`1px solid ${t.cardBdr}`, overflow:"hidden" }}>
                      <button onClick={() => toggleItem("w_"+wk)} style={{ width:"100%", display:"flex", justifyContent:"space-between", alignItems:"center", padding:"8px 14px", background:t.progressBg, border:"none", cursor:"pointer" }}>
                        <span style={{ fontSize:12, fontWeight:700, color:"#f97316" }}>📅 {getWeekLabel(wk)}</span>
                        <div style={{ display:"flex", alignItems:"center", gap:8 }}>
                          <span style={{ fontSize:11, color:col, fontWeight:700 }}>{done}/{goals.length} — {pct}%</span>
                          <span style={{ fontSize:10, color:t.textDim }}>{isOpen ? "▲" : "▼"}</span>
                        </div>
                      </button>
                      {isOpen && (
                        <div style={{ padding:"10px 14px", display:"flex", flexWrap:"wrap", gap:5 }}>
                          {goals.map(g => (
                            <span key={g.id} style={{ fontSize:11, padding:"3px 10px", borderRadius:20, background:g.done?t.tagDone:t.tagBg, color:g.done?"#34d399":t.textDim, border:`1px solid ${g.done?t.tagDoneBdr:t.tagBdr}` }}>
                              {g.done?"✓":"✕"} {g.text}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })
            }
          </div>
        )}
      </div>

      {/* Pomodoro log */}
      {(() => {
        const fmtTime = m => m >= 60 ? `${Math.floor(m/60)}h${m%60>0?String(m%60).padStart(2,"0"):""}` : `${m} min`;
        const pomoSessions = Object.entries(data.pomodoro||{})
          .map(([dk, val]) => {
            const sessions = Array.isArray(val) ? val
              : typeof val === "number" && val > 0 ? [{ id:"_legacy_"+dk, mins:val, at:"" }]
              : [];
            return { dk, sessions };
          })
          .filter(({sessions}) => sessions.length > 0)
          .filter(({dk}) => !q || dk.includes(q) || new Date(dk+"T12:00:00").toLocaleDateString("fr-FR",{weekday:"long",day:"numeric",month:"long",year:"numeric"}).toLowerCase().includes(q))
          .sort((a,b) => b.dk.localeCompare(a.dk));
        if (!pomoSessions.length) return null;
        const totalMins = pomoSessions.reduce((s,{sessions})=>s+sessions.reduce((ss,x)=>ss+(x.mins||0),0),0);
        const totalSessions = pomoSessions.reduce((s,{sessions})=>s+sessions.length,0);
        return (
          <div className="gc" style={s.card}>
            <SectionHeader
              label="🍅 Sessions Pomodoro"
              count={`${totalSessions} session${totalSessions!==1?"s":""} · ${fmtTime(totalMins)}`}
              open={openSections.pomo}
              onToggle={() => toggleSection("pomo")}
            />
            {openSections.pomo && (
              <div style={{ padding:"10px 14px", display:"flex", flexDirection:"column", gap:10 }}>
                {pomoSessions.map(({dk, sessions}) => {
                  const dayTotal = sessions.reduce((s,x)=>s+(x.mins||0),0);
                  return (
                    <div key={dk}>
                      <div style={{ fontSize:11, fontWeight:700, color:"#8b5cf6", padding:"4px 8px", display:"flex", justifyContent:"space-between" }}>
                        <span>{new Date(dk+"T12:00:00").toLocaleDateString("fr-FR",{weekday:"long",day:"numeric",month:"long"})}</span>
                        <span style={{ fontWeight:400, color:t.textDim }}>{fmtTime(dayTotal)}</span>
                      </div>
                      <div style={{ display:"flex", flexDirection:"column", gap:3 }}>
                        {sessions.map((sess, i) => (
                          <div key={sess.id} className="fu" style={{ display:"flex", alignItems:"center", gap:10, padding:"6px 10px 6px 16px", borderRadius:8, border:`1px solid ${t.cardBdr}` }}>
                            <span style={{ fontSize:12 }}>🍅</span>
                            <span style={{ fontSize:11, color:t.textSub, flex:1 }}>Session {i+1}{sess.at ? ` · ${sess.at}` : ""}</span>
                            <span style={{ fontSize:11, fontWeight:700, color:"#8b5cf6" }}>{fmtTime(sess.mins)}</span>
                            <button onClick={() => onDeletePomodoro(dk, sess.id)}
                              style={{ background:"none", border:"none", cursor:"pointer", color:t.delColor, fontSize:12, padding:"2px 5px", opacity:0.35, transition:"opacity 0.15s" }}
                              onMouseEnter={e=>e.currentTarget.style.opacity="1"} onMouseLeave={e=>e.currentTarget.style.opacity="0.35"}
                              title="Supprimer cette session">✕</button>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        );
      })()}
    </div>
  );
}

// ── AnalyticsView ─────────────────────────────────────────────────────────────

function AnalyticsView({ data, weekKey, monthKey, dailyHabitsCount, journal, weekReviews, pomodoro, settings, onDeleteGoal, t, s }) {
  const scoreTarget = settings?.scoreTarget ?? SCORE_TARGET;
  const scoreMinL3  = settings?.scoreMinL3  ?? SCORE_MIN_L3;
  const today = new Date(getTodayKey());

  // Last 8 weeks bar chart
  const weeks8 = Array.from({length:8}, (_,i) => {
    const d = new Date(weekKey); d.setDate(d.getDate() - i*7);
    const wk = d.toISOString().slice(0,10);
    const goals = data.weeks?.[wk]?.goals || [];
    const done  = goals.filter(g=>g.done).length;
    const pct   = goals.length ? Math.round(done/goals.length*100) : 0;
    return { wk, done, total:goals.length, pct };
  }).reverse();

  // All-time goals (for stacked bar)
  const allGoals = [
    ...Object.values(data.weeks||{}).flatMap(w=>w.goals||[]),
    ...Object.values(data.days||{}).flatMap(d=>d.goals||[]),
  ];

  // Journal entries sorted by date desc
  const journalEntries = Object.entries(journal)
    .filter(([,tx])=>tx.trim())
    .sort(([a],[b])=>b.localeCompare(a))
    .slice(0,5);

  // Habit heatmap: 12 weeks × 7 days
  const heatStart = new Date(weekKey); heatStart.setDate(heatStart.getDate() - 11*7);
  const heatCols  = Array.from({length:12}, (_,wi) =>
    Array.from({length:7}, (_,di) => {
      const d = new Date(heatStart); d.setDate(d.getDate() + wi*7 + di);
      const dk = d.toISOString().slice(0,10);
      const done = (data.habits?.days?.[dk]?.done||[]).length;
      const total = dailyHabitsCount || 1;
      return { dk, done, total, isFuture: d > today };
    })
  );

  const maxDone = Math.max(...weeks8.map(w=>w.done), 1);

  // Feature 3: Best day of week (4 dernières semaines, exclut aujourd'hui)
  const weekdayStats = Array.from({length:7}, (_,wi) => {
    const cutoff = new Date(today); cutoff.setDate(cutoff.getDate() - 28);
    const todayKey2 = dateToKey(today);
    const daysForWd = Object.entries(data.days||{}).filter(([dk]) => {
      if (dk >= todayKey2) return false; // exclut aujourd'hui et futur
      const d = localDate(dk);
      return (d.getDay()+6)%7 === wi && d >= cutoff; // 4 semaines max
    });
    const withGoals = daysForWd.filter(([,dv]) => (dv.goals||[]).length > 0); // au moins 1 tâche entrée
    if (!withGoals.length) return { wd:wi, avg:0, count:0 };
    const avg = withGoals.reduce((sum,[,dv]) => {
      const gs = dv.goals||[];
      const settled = gs.filter(g => !g.doing || g.done);
      const done = settled.filter(g=>g.done).length;
      return sum + (settled.length ? Math.round(done/settled.length*100) : 0);
    }, 0) / withGoals.length;
    return { wd:wi, avg:Math.round(avg), count:withGoals.length };
  });
  const bestWd = weekdayStats.reduce((best,cur) => cur.avg > best.avg ? cur : best, weekdayStats[0]);
  const maxWdAvg = Math.max(...weekdayStats.map(w=>w.avg), 1);

  // Feature 4: Streak of complete days (>=80%)
  const computeCurrentStreak = () => {
    let streak = 0;
    const d = new Date(getTodayKey());
    while (true) {
      const dk = dateToKey(d);
      const gs = data.days?.[dk]?.goals || [];
      if (!gs.length) break;
      const done = gs.filter(g=>g.done).length;
      const pct = Math.round(done/gs.length*100);
      if (pct < 80) break;
      streak++;
      d.setDate(d.getDate()-1);
    }
    return streak;
  };
  const computeBestStreak = () => {
    const allDks = Object.keys(data.days||{}).sort();
    let best = 0, cur = 0;
    for (const dk of allDks) {
      const gs = data.days[dk]?.goals || [];
      if (gs.length) {
        const done = gs.filter(g=>g.done).length;
        if (Math.round(done/gs.length*100) >= 80) { cur++; best = Math.max(best, cur); continue; }
      }
      cur = 0;
    }
    return best;
  };
  const currentStreak = computeCurrentStreak();
  const bestStreak = computeBestStreak();

  // Best day of current week (most tasks done)
  const bestDayThisWeek = (() => {
    const weekStart = new Date(weekKey + "T12:00:00");
    let best = null;
    for (let i = 0; i < 7; i++) {
      const d = new Date(weekStart); d.setDate(d.getDate() + i);
      const dk = dateToKey(d);
      const gs = data.days?.[dk]?.goals || [];
      const done = gs.filter(g => g.done).length;
      if (done > 0 && (!best || done > best.done)) best = { dk, done, label: DAYS_FR[i] };
    }
    return best;
  })();

  // Monthly category breakdown
  const monthGoals = Object.entries(data.days||{})
    .filter(([dk]) => dk.startsWith(monthKey))
    .flatMap(([,dv]) => dv.goals||[]);

  return (
    <div className="fi" style={{ display:"grid", gap:18 }}>
      {/* Streak stat cards */}
      <div data-statgrid style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(140px,1fr))", gap:12 }}>
        <StatCard label="Jours consécutifs ≥80%" value={currentStreak === 0 ? "—" : `${currentStreak} 🔥`} color="#f59e0b" delay={0} t={t} />
        <StatCard label="Meilleur streak (tout temps)" value={bestStreak === 0 ? "—" : `${bestStreak} ⭐`} color="#8b5cf6" delay={0.05} t={t} />
      </div>

      {/* Score journalier — coefficient analytics */}
      {(() => {
        const days90 = Object.entries(data.days||{})
          .filter(([dk]) => dk >= dateToKey(new Date(Date.now()-90*86400000)))
          .map(([dk, dv]) => {
            const gs = dv?.goals||[];
            const committed = gs.filter(g=>!g.isBonus);
            const earned = committed.filter(g=>g.done&&g.level).reduce((s,g)=>s+g.level,0);
            const l3done = committed.filter(g=>g.done&&g.level===3).length;
            const ok = earned >= scoreTarget && l3done >= scoreMinL3;
            return { dk, earned, l3done, ok, hasLevel: committed.some(g=>g.level) };
          })
          .filter(d=>d.hasLevel)
          .sort((a,b)=>a.dk.localeCompare(b.dk));
        if (days90.length === 0) return null;
        const avgScore = Math.round(days90.reduce((s,d)=>s+d.earned,0)/days90.length*10)/10;
        const okDays = days90.filter(d=>d.ok).length;
        return (
          <div className="gc" style={{ ...s.card, marginBottom:14 }}>
            <div style={s.cardHead}><span style={s.cardTitle}>🎯 Score journalier — 90 jours</span></div>
            <div style={{ padding:"14px 20px" }}>
              <div style={{ display:"flex", gap:18, marginBottom:14, flexWrap:"wrap" }}>
                <div style={{ textAlign:"center" }}>
                  <div style={{ fontSize:22, fontWeight:800, color:"#a78bfa" }}>{avgScore}</div>
                  <div style={{ fontSize:10, color:t.textDim }}>moy. / {scoreTarget} pts</div>
                </div>
                <div style={{ textAlign:"center" }}>
                  <div style={{ fontSize:22, fontWeight:800, color:"#34d399" }}>{okDays}</div>
                  <div style={{ fontSize:10, color:t.textDim }}>jours réussis</div>
                </div>
                <div style={{ textAlign:"center" }}>
                  <div style={{ fontSize:22, fontWeight:800, color:"#38bdf8" }}>{days90.length}</div>
                  <div style={{ fontSize:10, color:t.textDim }}>jours notés</div>
                </div>
              </div>
              <div style={{ display:"flex", gap:2, alignItems:"flex-end", height:50 }}>
                {days90.slice(-30).map(d => {
                  const h = Math.max(4, Math.round(d.earned / scoreTarget * 100));
                  const col = d.ok?"#34d399":d.earned>=scoreTarget/2?"#f97316":"#f87171";
                  return (
                    <div key={d.dk} title={`${d.dk}: ${d.earned}pts`} style={{ flex:1, height:`${Math.min(100,h)}%`, background:col, borderRadius:"2px 2px 0 0", minWidth:3, cursor:"default" }}/>
                  );
                })}
              </div>
              <div style={{ fontSize:9, color:t.textDim, marginTop:4 }}>30 derniers jours notés</div>
            </div>
          </div>
        );
      })()}

      {/* Pomodoro daily chart */}
      {(() => {
        const days14 = Array.from({length:14}, (_,i) => {
          const d = new Date(); d.setDate(d.getDate() - (13-i));
          const dk = dateToKey(d);
          const raw = pomodoro[dk];
          const mins = Array.isArray(raw) ? raw.reduce((s,x)=>s+(x.mins||0),0) : (typeof raw==="number" ? raw : 0);
          return { dk, mins, label: d.toLocaleDateString("fr-FR",{day:"2-digit",month:"2-digit"}) };
        });
        const totalMins = days14.reduce((s,d)=>s+d.mins,0);
        if (!totalMins) return null;
        const maxMins = Math.max(...days14.map(d=>d.mins), 1);
        const fmtTime = m => m >= 60 ? `${Math.floor(m/60)}h${m%60>0?String(m%60).padStart(2,"0"):""}` : `${m}m`;
        return (
          <div className="gc" style={s.card}>
            <div style={s.cardHead}>
              <span style={s.cardTitle}>🍅 Pomodoro — focus par jour</span>
              <span style={{ fontSize:11, color:t.textDim }}>{fmtTime(totalMins)} ces 2 semaines</span>
            </div>
            <div style={{ padding:"16px 20px" }}>
              <div style={{ display:"flex", alignItems:"flex-end", gap:4, height:90 }}>
                {days14.map((d,i) => {
                  const h = d.mins ? Math.max((d.mins/maxMins)*100, 6) : 0;
                  const isToday = d.dk === getTodayKey();
                  const col = isToday ? "#c4b5fd" : "#8b5cf6";
                  return (
                    <div key={d.dk} style={{ flex:1, display:"flex", flexDirection:"column", alignItems:"center", gap:3, height:"100%" }}>
                      {d.mins > 0 && <div style={{ fontSize:9, color:col, fontWeight:700, lineHeight:1 }}>{fmtTime(d.mins)}</div>}
                      <div style={{ flex:1, width:"100%", display:"flex", alignItems:"flex-end" }}>
                        <div style={{ width:"100%", height:`${h}%`, minHeight:d.mins?3:0,
                          background: d.mins ? `linear-gradient(180deg,${col},${col}88)` : t.progressBg,
                          borderRadius:"4px 4px 2px 2px",
                          boxShadow: d.mins ? `0 -2px 8px ${col}44` : "none",
                          opacity: isToday ? 1 : 0.75 }} />
                      </div>
                      <div style={{ fontSize:8, color:isToday?"#c4b5fd":t.textTiny, fontWeight:isToday?700:400, textAlign:"center" }}>
                        {d.label.slice(0,5)}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        );
      })()}

      {/* Feature 3: Best day of week */}
      <div className="gc" style={s.card}>
        <div style={s.cardHead}>
          <span style={s.cardTitle}>📅 Meilleur jour — 4 sem.</span>
          {bestWd.count > 0 && <span style={{ fontSize:11, color:"#34d399", fontWeight:700 }}>{DAYS_FR[bestWd.wd]} — {bestWd.avg}%</span>}
        </div>
        <div style={{ padding:"16px 20px" }}>
          {bestWd.count === 0
            ? <div style={{ textAlign:"center", color:t.textTiny, fontSize:12 }}>Pas assez de données</div>
            : (
              <div style={{ display:"flex", alignItems:"flex-end", gap:6, height:80 }}>
                {weekdayStats.map((wd) => {
                  const col = wd.wd === bestWd.wd ? "#34d399" : pc(wd.avg, t);
                  const h = wd.count ? Math.max((wd.avg / maxWdAvg) * 100, 4) : 0;
                  return (
                    <div key={wd.wd} style={{ flex:1, display:"flex", flexDirection:"column", alignItems:"center", gap:3, height:"100%" }}>
                      <div style={{ fontSize:10, color:col, fontWeight:700, lineHeight:1 }}>{wd.count ? `${wd.avg}%` : ""}</div>
                      <div style={{ flex:1, width:"100%", display:"flex", alignItems:"flex-end" }}>
                        <div style={{ width:"100%", height:`${h}%`, minHeight:wd.count?3:0, background:`linear-gradient(180deg,${col},${col}99)`, borderRadius:"4px 4px 2px 2px", boxShadow:wd.avg>0?`0 -2px 8px ${col}44`:"none" }} />
                      </div>
                      <div style={{ fontSize:9, color:wd.wd===bestWd.wd?"#34d399":t.textDim, fontWeight:wd.wd===bestWd.wd?700:400 }}>{DAYS_FR[wd.wd].slice(0,3)}</div>
                    </div>
                  );
                })}
              </div>
            )
          }
        </div>
      </div>

      {/* Weekly completion bars */}
      <div className="gc" style={s.card}>
        <div style={s.cardHead}><span style={s.cardTitle}>📊 Tâches accomplies — 8 dernières semaines</span></div>
        <div style={{ padding:"20px 24px" }}>
          <div style={{ display:"flex", alignItems:"flex-end", gap:8, height:120 }}>
            {weeks8.map((w,i) => {
              const col = pc(w.pct, t);
              const h   = w.total ? Math.max((w.done/maxDone)*100, w.total?4:0) : 0;
              return (
                <div key={w.wk} style={{ flex:1, display:"flex", flexDirection:"column", alignItems:"center", gap:4, height:"100%" }}>
                  <div style={{ fontSize:11, color:col, fontWeight:800, lineHeight:1 }}>{w.done||""}</div>
                  <div style={{ flex:1, width:"100%", display:"flex", alignItems:"flex-end" }}>
                    <div className="pb" style={{ width:"100%", height:`${h}%`, minHeight:w.total?3:0, background:`linear-gradient(180deg,${col},${col}99)`, borderRadius:"5px 5px 2px 2px", boxShadow:w.done?`0 -2px 10px ${col}44`:"none", transition:"height 1s cubic-bezier(0.4,0,0.2,1)" }} />
                  </div>
                  <div style={{ fontSize:9, color:t.textDim }}>{w.total?`${w.pct}%`:"-"}</div>
                  <div style={{ fontSize:8, color:t.textTiny, textAlign:"center" }}>{new Date(w.wk).toLocaleDateString("fr-FR",{day:"2-digit",month:"2-digit"})}</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>


      {/* Most postponed tasks */}
      {(() => {
        const allDayGoalsWithDk = Object.entries(data.days||{}).flatMap(([dk, d]) => (d.goals||[]).map(g => ({ ...g, _dk: dk })));
        const withAge = allDayGoalsWithDk
          .filter(g => !g.done && g.createdAt)
          .map(g => ({ ...g, pendingDays: Math.round((new Date(getTodayKey()+"T12:00:00") - new Date(g.createdAt+"T12:00:00")) / 86400000) }))
          .filter(g => g.pendingDays >= 2);
        const seen = new Map();
        for (const g of withAge) {
          if (!seen.has(g.text) || g.pendingDays > seen.get(g.text).pendingDays) seen.set(g.text, g);
        }
        const top = [...seen.values()].sort((a,b) => b.pendingDays - a.pendingDays).slice(0, 5);
        if (!top.length) return null;
        return (
          <div className="gc" style={s.card}>
            <div style={s.cardHead}>
              <span style={s.cardTitle}>⏳ Tâches les plus repoussées</span>
              <span style={{ fontSize:11, color:t.textDim }}>toujours en attente</span>
            </div>
            <div style={{ padding:"12px 16px", display:"flex", flexDirection:"column", gap:7 }}>
              {top.map((g, i) => {
                const dc = g.pendingDays >= 7 ? "#f87171" : g.pendingDays >= 4 ? "#f97316" : "#fb923c";
                return (
                  <div key={g.id} className="fu" style={{ display:"flex", alignItems:"center", gap:10, padding:"10px 12px", borderRadius:10, background:t.card, border:`1px solid ${t.cardBdr}`, animationDelay:`${i*0.04}s` }}>
                    <span style={{ fontSize:13, fontWeight:800, color:t.textTiny, minWidth:18, textAlign:"center" }}>{i+1}</span>
                    <span style={{ fontSize:14 }}>{CAT_ICONS[g.cat]||"•"}</span>
                    <span style={{ flex:1, fontSize:13, color:t.text }}>{g.text}</span>
                    <span style={{ fontSize:11, padding:"3px 10px", borderRadius:20, background:dc+"18", color:dc, border:`1px solid ${dc}30`, fontWeight:700, whiteSpace:"nowrap" }}>
                      {g.pendingDays} jour{g.pendingDays>1?"s":""}
                    </span>
                    <button onClick={()=>onDeleteGoal(g._dk, g.id)} title="Supprimer définitivement (obsolète)"
                      style={{ background:"none", border:"none", cursor:"pointer", fontSize:14, color:"#f87171", opacity:0.4, padding:"2px 4px", flexShrink:0, transition:"opacity 0.15s" }}
                      onMouseEnter={e=>e.currentTarget.style.opacity="1"}
                      onMouseLeave={e=>e.currentTarget.style.opacity="0.4"}>🗑</button>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })()}

      {/* Stacked 100% bar — tâches accomplies par catégorie */}
      {(() => {
        const doneGoals = allGoals.filter(g => g.done);
        const total = doneGoals.length;
        if (!total) return null;
        const segments = CATEGORIES.map(c => {
          const count = doneGoals.filter(g => g.cat === c.id).length;
          return { ...c, count, pct: Math.round(count / total * 100) };
        }).filter(s => s.count > 0);
        return (
          <div className="gc" style={s.card}>
            <div style={s.cardHead}>
              <span style={s.cardTitle}>🎨 Répartition des tâches accomplies</span>
              <span style={{ fontSize:11, color:t.textDim }}>{total} tâches complétées</span>
            </div>
            <div style={{ padding:"16px 20px" }}>
              {/* Barre empilée */}
              <div style={{ display:"flex", borderRadius:99, overflow:"hidden", height:22, marginBottom:14 }}>
                {segments.map((seg, i) => (
                  <div key={seg.id} className="pb"
                    title={`${seg.label} : ${seg.count} tâches (${seg.pct}%)`}
                    style={{ width:`${seg.pct}%`, background:catCol(seg.id,t), display:"flex", alignItems:"center", justifyContent:"center", transition:"width 0.9s cubic-bezier(0.4,0,0.2,1)", minWidth: seg.pct > 5 ? undefined : 0, overflow:"hidden" }}>
                    {seg.pct > 7 && <span style={{ fontSize:10, fontWeight:700, color:"#fff", textShadow:"0 1px 3px rgba(0,0,0,0.4)", whiteSpace:"nowrap" }}>{seg.pct}%</span>}
                  </div>
                ))}
              </div>
              {/* Légende */}
              <div style={{ display:"flex", flexWrap:"wrap", gap:"8px 16px" }}>
                {segments.map(seg => (
                  <div key={seg.id} style={{ display:"flex", alignItems:"center", gap:6 }}>
                    <div style={{ width:10, height:10, borderRadius:3, background:catCol(seg.id,t), flexShrink:0 }} />
                    <span style={{ fontSize:11, color:t.textSub }}>{CAT_ICONS[seg.id]} {seg.label}</span>
                    <span style={{ fontSize:11, fontWeight:700, color:catCol(seg.id,t) }}>{seg.count}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );
      })()}

      {/* Mood graph */}
      {(() => {
        const MOOD_EM = ["","😫","🙁","😐","🙂","😄"];
        const MOOD_COL = ["","#f87171","#fb923c","#fbbf24","#34d399","#38bdf8"];
        const entries = Object.entries(data.moods||{}).filter(([,v])=>v>0).sort(([a],[b])=>a.localeCompare(b)).slice(-30);
        if (entries.length < 2) return null;
        const n = entries.length;
        const W = 300, H = 80, PX = 18, PY = 12;
        const pts = entries.map(([dk,v],i) => ({ x: PX+(i/(n-1))*(W-2*PX), y: H-PY-((v-1)/4)*(H-2*PY), v, dk }));
        const line = pts.map((p,i)=>`${i?"L":"M"}${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(" ");
        const fill = `${line} L${pts[n-1].x.toFixed(1)},${H-PY} L${pts[0].x.toFixed(1)},${H-PY} Z`;
        const avg = Math.round(entries.reduce((s,[,v])=>s+v,0)/n*10)/10;
        return (
          <div className="gc" style={s.card}>
            <div style={s.cardHead}>
              <span style={s.cardTitle}>😊 Humeur — 30 derniers jours</span>
              <span style={{ fontSize:11, color:t.textDim }}>Moy. {avg} {MOOD_EM[Math.round(avg)]}</span>
            </div>
            <div style={{ padding:"14px 20px" }}>
              <svg viewBox={`0 0 ${W} ${H}`} style={{ width:"100%", height:H, overflow:"visible" }}>
                <defs>
                  <linearGradient id="moodFill" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.25" />
                    <stop offset="100%" stopColor="#8b5cf6" stopOpacity="0" />
                  </linearGradient>
                </defs>
                {[1,2,3,4,5].map(v => {
                  const y = H-PY-((v-1)/4)*(H-2*PY);
                  return <line key={v} x1={PX} y1={y} x2={W-PX} y2={y} stroke={t.isDark?"rgba(255,255,255,0.06)":"rgba(0,0,0,0.07)"} strokeWidth={1} />;
                })}
                <path d={fill} fill="url(#moodFill)" />
                <path d={line} fill="none" stroke="#8b5cf6" strokeWidth={2} strokeLinejoin="round" strokeLinecap="round" />
                {pts.map((p,i) => (
                  <g key={i}>
                    <circle cx={p.x} cy={p.y} r={4} fill={MOOD_COL[p.v]} stroke={t.isDark?"#08080f":"#f1f5f9"} strokeWidth={2} />
                    <title>{p.dk}: {MOOD_EM[p.v]}</title>
                  </g>
                ))}
                {[1,3,5].map(v => {
                  const y = H-PY-((v-1)/4)*(H-2*PY);
                  return <text key={v} x={PX-5} y={y+4} textAnchor="end" fontSize={11} fill={t.isDark?"rgba(255,255,255,0.25)":"rgba(0,0,0,0.3)"}>{MOOD_EM[v]}</text>;
                })}
              </svg>
            </div>
          </div>
        );
      })()}

      {/* Monthly category breakdown */}
      {monthGoals.length > 0 && (
        <div className="gc" style={s.card}>
          <div style={s.cardHead}>
            <span style={s.cardTitle}>📂 Répartition par catégorie — ce mois</span>
            <span style={{ fontSize:11, color:t.textDim }}>{new Date(monthKey+"-01").toLocaleDateString("fr-FR",{month:"long",year:"numeric"})}</span>
          </div>
          <div style={{ padding:"16px 20px" }}>
            {CATEGORIES.map(c => {
              const cg = monthGoals.filter(g => g.cat === c.id);
              if (!cg.length) return null;
              const cd = cg.filter(g => g.done).length;
              const pct = Math.round(cd/cg.length*100);
              return (
                <div key={c.id} style={{ marginBottom:14 }}>
                  <div style={{ display:"flex", justifyContent:"space-between", fontSize:12, marginBottom:5 }}>
                    <span style={{ color:t.text }}>{CAT_ICONS[c.id]} {c.label}</span>
                    <span style={{ color:catCol(c.id,t), fontWeight:700 }}>{cd}/{cg.length} — {pct}%</span>
                  </div>
                  <ProgressBar pct={pct} color={catCol(c.id,t)} t={t} />
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Résumés de semaine */}
      {(() => {
        const reviews = Object.entries(weekReviews||{})
          .filter(([,r]) => r.q1||r.q2||r.q3||r.q4)
          .sort(([a],[b]) => b.localeCompare(a))
          .slice(0, 2);
        if (!reviews.length) return null;
        const QS = [
          { key:"q1", label:"🏆 Accompli",         color:"#34d399" },
          { key:"q2", label:"✅ Ce qui a marché",   color:"#38bdf8" },
          { key:"q3", label:"🔄 À faire différemment", color:"#f97316" },
          { key:"q4", label:"🎯 Priorité suivante", color:"#a78bfa" },
        ];
        return (
          <div className="gc" style={s.card}>
            <div style={s.cardHead}>
              <span style={s.cardTitle}>📋 Résumés de semaine</span>
              <span style={{ fontSize:11, color:t.textDim }}>{reviews.length} semaine{reviews.length>1?"s":""}</span>
            </div>
            <div style={{ padding:"12px 16px", display:"flex", flexDirection:"column", gap:14, maxHeight:600, overflowY:"auto" }}>
              {reviews.map(([wk, r]) => (
                <div key={wk} className="fu" style={{ borderRadius:12, border:`1px solid ${t.cardBdr}`, overflow:"hidden" }}>
                  <div style={{ padding:"9px 14px", background:t.progressBg, display:"flex", justifyContent:"space-between", alignItems:"center" }}>
                    <span style={{ fontSize:12, fontWeight:700, color:"#f97316" }}>📅 {getWeekLabel(wk)}</span>
                  </div>
                  <div style={{ padding:"12px 14px", display:"flex", flexDirection:"column", gap:10 }}>
                    {QS.map(({ key, label, color }) => r[key] ? (
                      <div key={key}>
                        <div style={{ fontSize:10, fontWeight:700, color, marginBottom:3 }}>{label}</div>
                        <div style={{ fontSize:12, color:t.text, lineHeight:1.6, whiteSpace:"pre-wrap" }}>{r[key]}</div>
                      </div>
                    ) : null)}
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      })()}

      {/* Journal entries */}
      {journalEntries.length > 0 && (
        <div className="gc" style={s.card}>
          <div style={s.cardHead}>
            <span style={s.cardTitle}>📝 Journal — entrées récentes</span>
            <span style={{ fontSize:11, color:t.textDim }}>{journalEntries.length} entrée{journalEntries.length>1?"s":""}</span>
          </div>
          <div style={{ padding:"12px 16px", display:"flex", flexDirection:"column", gap:10, maxHeight:480, overflowY:"auto" }}>
            {journalEntries.map(([dk,tx])=>(
              <div key={dk} className="fu" style={{ borderRadius:10, border:`1px solid ${t.cardBdr}` }}>
                <div style={{ padding:"8px 14px", background:t.progressBg, display:"flex", justifyContent:"space-between", alignItems:"center", borderRadius:"10px 10px 0 0" }}>
                  <span style={{ fontSize:11, fontWeight:600, color:t.textSub }}>
                    {new Date(dk+"T12:00:00").toLocaleDateString("fr-FR",{weekday:"long",day:"numeric",month:"long"})}
                  </span>
                  <span style={{ fontSize:10, color:t.textDim }}>{dk}</span>
                </div>
                <div style={{ padding:"12px 14px", fontSize:13, color:t.text, lineHeight:1.65, whiteSpace:"pre-wrap", wordBreak:"break-word", maxHeight:180, overflowY:"auto" }}>{tx}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Habit heatmap */}
      <div className="gc" style={s.card}>
        <div style={s.cardHead}><span style={s.cardTitle}>🔥 Heatmap habitudes — 12 semaines</span></div>
        <div style={{ padding:"16px 20px", overflowX:"auto" }}>
          <div style={{ display:"inline-flex", gap:4 }}>
            {/* Day labels */}
            <div style={{ display:"flex", flexDirection:"column", gap:4, paddingTop:20 }}>
              {DAYS_FR.map((d,i) => (
                <div key={i} style={{ height:14, fontSize:9, color:t.textDim, display:"flex", alignItems:"center", paddingRight:6, whiteSpace:"nowrap" }}>{d.slice(0,3)}</div>
              ))}
            </div>
            {/* Columns */}
            {heatCols.map((col,wi) => (
              <div key={wi} style={{ display:"flex", flexDirection:"column", gap:4 }}>
                <div style={{ fontSize:8, color:t.textTiny, textAlign:"center", height:16, display:"flex", alignItems:"center", justifyContent:"center", whiteSpace:"nowrap" }}>
                  {wi%3===0 ? new Date(col[0].dk).toLocaleDateString("fr-FR",{day:"2-digit",month:"2-digit"}) : ""}
                </div>
                {col.map((cell,di) => {
                  const ratio    = cell.isFuture ? 0 : cell.done / cell.total;
                  const isEmpty  = ratio === 0;
                  const bg       = cell.isFuture ? "transparent"
                    : isEmpty ? (t === THEME.dark ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.06)")
                    : ratio === 1 ? "rgba(16,185,129,1)"
                    : ratio < 0.5 ? `rgba(139,92,246,${0.2+ratio*0.7})`
                    : `rgba(52,211,153,${0.2+ratio*0.7})`;
                  return (
                    <div key={di} title={`${cell.dk}: ${cell.done}/${cell.total} habitudes`}
                      style={{ width:14, height:14, borderRadius:3, background:bg, cursor:"default", transition:"transform 0.1s" }}
                      onMouseEnter={e=>{ e.currentTarget.style.transform="scale(1.3)"; }}
                      onMouseLeave={e=>{ e.currentTarget.style.transform="scale(1)"; }}
                    />
                  );
                })}
              </div>
            ))}
          </div>
          <div style={{ display:"flex", gap:6, alignItems:"center", marginTop:12, justifyContent:"flex-end" }}>
            <span style={{ fontSize:10, color:t.textDim }}>Moins</span>
            {[0,0.25,0.5,0.75,1].map(v=>(
              <div key={v} style={{ width:12, height:12, borderRadius:3, background:v===0?(t===THEME.dark?"rgba(255,255,255,0.04)":"rgba(0,0,0,0.06)"):v===1?"rgba(16,185,129,1)":v<0.5?`rgba(139,92,246,${0.2+v*0.7})`:`rgba(52,211,153,${0.2+v*0.7})` }} />
            ))}
            <span style={{ fontSize:10, color:t.textDim }}>Plus</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── PomodoroWidget ────────────────────────────────────────────────────────────

function PomodoroWidget({ soundOn, onClose, onWorkComplete, doingTasks, allTasks, elapsedRef, resetRef, t }) {
  const WORK_S = 25*60, BREAK_S = 5*60;
  const [running,  setRunning]  = useState(false);
  const [mode,     setMode]     = useState("work");
  const [secs,     setSecs]     = useState(WORK_S);
  const [cycles,   setCycles]   = useState(0);
  const [mini,     setMini]     = useState(false);
  const [linkedId, setLinkedId] = useState(() => doingTasks?.[0]?.id || "");
  const intervalRef          = useRef(null);
  const modeRef              = useRef("work");
  const secsRef              = useRef(WORK_S);
  const soundRef             = useRef(soundOn);
  const justDoneRef          = useRef(false);
  useEffect(()=>{ soundRef.current=soundOn; },[soundOn]);
  useEffect(()=>{ if (doingTasks?.[0]?.id && !linkedId) setLinkedId(doingTasks[0].id); },[doingTasks]);
  useEffect(()=>{
    secsRef.current=secs;
    if (elapsedRef) elapsedRef.current = (running && modeRef.current==="work") ? Math.round((WORK_S-secs)/60) : 0;
  },[secs,running]);

  useEffect(()=>{
    if (justDoneRef.current) {
      justDoneRef.current = false;
      setSecs(mode==="work" ? WORK_S : BREAK_S);
    }
  },[mode]);

  useEffect(()=>{
    if (!running) { clearInterval(intervalRef.current); return; }
    intervalRef.current = setInterval(()=>{
      let completed = false;
      setSecs(s=>{ if (s>1) return s-1; completed=true; return 0; });
      if (!completed) return;
      // tout hors de l'updater → appelé une seule fois, pas de side-effect dans updater
      clearInterval(intervalRef.current);
      setRunning(false);
      playTimerEnd(soundRef.current);
      if (Notification.permission==="granted") {
        const iW = modeRef.current==="work";
        new Notification(iW?"⏱ Pause !":"💪 Au travail !",{ body:iW?"25 min de focus terminées. Pause de 5 min !":"La pause est finie. C'est reparti !" });
      }
      const wasWork = modeRef.current==="work";
      const next = wasWork?"break":"work";
      modeRef.current = next;
      justDoneRef.current = true;
      setMode(next);
      if (wasWork) { setCycles(c=>c+1); onWorkComplete?.(WORK_S/60, linkedId); }
    },1000);
    return ()=>clearInterval(intervalRef.current);
  },[running]);

  const logElapsed = () => {
    if (modeRef.current==="work") {
      const elapsed = Math.round((WORK_S - secsRef.current) / 60);
      if (elapsed > 0) onWorkComplete?.(elapsed, linkedId);
    }
  };
  const reset = ()=>{ setRunning(false); clearInterval(intervalRef.current); modeRef.current="work"; setMode("work"); setSecs(WORK_S); };
  useEffect(()=>{ if (resetRef) resetRef.current=reset; });
  const skip  = ()=>{
    // ne log que si on est en work (pas si le timer a déjà terminé naturellement)
    if (modeRef.current==="work") logElapsed();
    setRunning(false); clearInterval(intervalRef.current);
    const next = modeRef.current==="work"?"break":"work";
    modeRef.current=next; justDoneRef.current=true;
    setMode(next);
    if (modeRef.current==="break") setCycles(c=>c+1);
  };

  const totalS = mode==="work"?WORK_S:BREAK_S;
  const pct    = (totalS-secs)/totalS;
  const mm     = String(Math.floor(secs/60)).padStart(2,"0");
  const ss     = String(secs%60).padStart(2,"0");
  const col    = mode==="work"?"#8b5cf6":"#34d399";
  const R=38, C=2*Math.PI*R;
  const dash = C*(1-pct);

  if (mini) return (
    <div onClick={()=>setMini(false)}
      style={{ position:"fixed", bottom:24, right:24, zIndex:990, display:"flex", alignItems:"center", gap:8,
        background:t.glass, border:`1px solid ${t.glassBdr}`, borderRadius:50, padding:"8px 14px",
        backdropFilter:"blur(20px)", WebkitBackdropFilter:"blur(20px)", boxShadow:"0 8px 32px rgba(0,0,0,0.3)", cursor:"pointer",
        animation:running?`${mode==="work"?"pomoPulse":"breakPulse"} 2s infinite`:"none" }}>
      <div style={{ width:8, height:8, borderRadius:"50%", background:running?col:t.textDim, boxShadow:running?`0 0 8px ${col}`:"none" }} />
      <span style={{ fontSize:14, fontWeight:800, color:t.text, fontVariantNumeric:"tabular-nums" }}>{mm}:{ss}</span>
      <span style={{ fontSize:10, color:t.textDim }}>{mode==="work"?"🎯":"☕"}</span>
    </div>
  );

  return (
    <div style={{ position:"fixed", bottom:24, right:24, zIndex:990, background:t.glass, border:`1px solid ${t.glassBdr}`,
      borderRadius:20, backdropFilter:"blur(24px)", WebkitBackdropFilter:"blur(24px)",
      boxShadow:"0 16px 48px rgba(0,0,0,0.4)", padding:"18px 22px", minWidth:220, animation:"slideUp 0.22s ease" }}>
      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:14 }}>
        <span style={{ fontSize:12, fontWeight:700, color:col }}>{mode==="work"?"🎯 Focus":"☕ Pause"}</span>
        <div style={{ display:"flex", gap:4, alignItems:"center" }}>
          {cycles>0 && <span style={{ fontSize:10, color:t.textDim, padding:"2px 7px", borderRadius:20, background:t.progressBg }}>{cycles}🍅</span>}
          <button onClick={()=>setMini(true)} title="Réduire" style={{ background:"none",border:"none",cursor:"pointer",color:t.textDim,fontSize:13,padding:"1px 4px",lineHeight:1 }}>—</button>
          <button onClick={onClose}           title="Fermer"  style={{ background:"none",border:"none",cursor:"pointer",color:t.textDim,fontSize:13,padding:"1px 4px",lineHeight:1 }}>✕</button>
        </div>
      </div>
      <div style={{ display:"flex", justifyContent:"center", marginBottom:16 }}>
        <div style={{ position:"relative", width:100, height:100 }}>
          <svg width={100} height={100} style={{ transform:"rotate(-90deg)" }}>
            <circle cx={50} cy={50} r={R} fill="none" stroke={t.progressBg} strokeWidth={7} />
            <circle cx={50} cy={50} r={R} fill="none" stroke={col} strokeWidth={7}
              strokeDasharray={`${C} ${C}`} strokeDashoffset={dash} strokeLinecap="round"
              style={{ transition:"stroke-dashoffset 1s linear,stroke 0.3s" }} />
          </svg>
          <div style={{ position:"absolute",inset:0,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center" }}>
            <span style={{ fontSize:23, fontWeight:800, color:t.text, fontVariantNumeric:"tabular-nums", letterSpacing:"-1px", lineHeight:1 }}>{mm}:{ss}</span>
            <span style={{ fontSize:9, color:t.textDim, marginTop:2 }}>{mode==="work"?"FOCUS":"PAUSE"}</span>
          </div>
        </div>
      </div>
      <div style={{ display:"flex", gap:8, justifyContent:"center" }}>
        <button onClick={reset} style={{ padding:"7px 12px",borderRadius:10,border:`1px solid ${t.inpBdr}`,background:"transparent",color:t.textSub,fontSize:12,cursor:"pointer" }}>↺</button>
        <button onClick={()=>setRunning(v=>!v)}
          style={{ padding:"7px 22px",borderRadius:10,border:`1px solid ${col}55`,background:`${col}22`,color:col,fontSize:16,cursor:"pointer",fontWeight:700,minWidth:64 }}>
          {running?"⏸":"▶"}
        </button>
        <button onClick={skip} style={{ padding:"7px 12px",borderRadius:10,border:`1px solid ${t.inpBdr}`,background:"transparent",color:t.textSub,fontSize:12,cursor:"pointer" }}>⏭</button>
      </div>
      {allTasks && allTasks.length > 0 && (
        <div style={{ marginTop:12 }}>
          <div style={{ fontSize:9, fontWeight:700, color:t.textDim, marginBottom:5, textTransform:"uppercase", letterSpacing:"0.8px" }}>Tâche associée</div>
          <select value={linkedId} onChange={e=>setLinkedId(e.target.value)}
            style={{ width:"100%", background:t.inpBg, border:`1px solid ${t.inpBdr}`, borderRadius:8, color:t.text, fontSize:11, padding:"5px 8px", cursor:"pointer" }}>
            <option value="">— aucune —</option>
            {allTasks.map(tsk => (
              <option key={tsk.id} value={tsk.id}>{tsk.doing?"▶ ":""}{tsk.text}</option>
            ))}
          </select>
        </div>
      )}
    </div>
  );
}

// ── RecipesView ───────────────────────────────────────────────────────────────

const RECIPE_TAGS = [["⚡","Rapide"],["🌱","Végé"],["🎉","Festif"],["💰","Budget"],["👌","Facile"],["🌶️","Épicé"],["🥗","Healthy"]];
const RECIPE_EMOJIS = ["🍝","🥗","🍲","🥘","🍛","🍜","🥩","🐟","🍕","🥪","🌮","🥞","🍳","🥚","🍱","🥣","🥧","🍰"];

// ── TimelineView ──────────────────────────────────────────────────────────────

function TimelineView({ goals, courseSessions, projects, dayKey, onToggleGoal, t, s }) {
  const HOUR_H = 60, START_H = 7, END_H = 22, TOTAL_H = END_H - START_H;
  const timeToY   = ts => { if (!ts) return 0; const [h,m]=ts.split(":").map(Number); return ((h-START_H)+m/60)*HOUR_H; };
  const timeDiffM = (a,b) => { const [ah,am]=a.split(":").map(Number), [bh,bm]=b.split(":").map(Number); return (bh*60+bm)-(ah*60+am); };

  const scheduled   = goals.filter(g=>g.startTime);
  const unscheduled = goals.filter(g=>!g.startTime);

  return (
    <div>
      {/* Timeline grid */}
      <div style={{ display:"flex", gap:0, position:"relative", marginBottom:16 }}>
        {/* Hour labels */}
        <div style={{ width:38, flexShrink:0, position:"relative", height:TOTAL_H*HOUR_H }}>
          {Array.from({length:TOTAL_H+1},(_,i)=>(
            <div key={i} style={{ position:"absolute", top:i*HOUR_H-7, right:6, fontSize:9, color:t.textDim, lineHeight:1, fontVariantNumeric:"tabular-nums" }}>
              {String(START_H+i).padStart(2,"0")}h
            </div>
          ))}
        </div>
        {/* Content area */}
        <div style={{ flex:1, position:"relative", height:TOTAL_H*HOUR_H, borderLeft:`1px solid ${t.divider}`, overflow:"hidden" }}>
          {/* Hour lines */}
          {Array.from({length:TOTAL_H+1},(_,i)=>(
            <div key={i} style={{ position:"absolute", top:i*HOUR_H, left:0, right:0, height:1, background:t.divider, opacity: i%2===0?1:0.4 }} />
          ))}
          {/* Half-hour lines */}
          {Array.from({length:TOTAL_H},(_,i)=>(
            <div key={`hh${i}`} style={{ position:"absolute", top:i*HOUR_H+HOUR_H/2, left:0, right:0, height:1, background:t.divider, opacity:0.2 }} />
          ))}
          {/* Course session blocks */}
          {courseSessions.map((sess,i)=>{
            const top = timeToY(sess.startTime);
            const h   = Math.max(22, timeDiffM(sess.startTime,sess.endTime)/60*HOUR_H);
            return (
              <div key={`cs${i}`} style={{ position:"absolute", top, left:0, right:0, height:h, background:sess.courseColor+"1e", borderLeft:`3px solid ${sess.courseColor}`, borderRadius:"0 6px 6px 0", padding:"3px 8px", overflow:"hidden", display:"flex", alignItems:"center", gap:6, pointerEvents:"none" }}>
                <span style={{ fontSize:11 }}>{sess.courseEmoji}</span>
                <span style={{ fontSize:10, color:sess.courseColor, fontWeight:600, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{sess.courseName} · {sess.type}</span>
                {sess.done && <span style={{ fontSize:10, color:"#34d399", marginLeft:"auto", flexShrink:0 }}>✓</span>}
              </div>
            );
          })}
          {/* Task blocks */}
          {scheduled.map((goal)=>{
            const top  = timeToY(goal.startTime);
            const durM = goal.duration || 30;
            const h    = Math.max(26, durM/60*HOUR_H);
            const col  = catCol(goal.cat, t);
            const proj = projects?.find(p=>p.id===goal.projectId);
            return (
              <div key={goal.id} onClick={()=>onToggleGoal(goal.id)}
                style={{ position:"absolute", top, left:8, right:0, height:h, background:goal.done?"rgba(52,211,153,0.12)":col+"22", borderLeft:`3px solid ${goal.done?"#34d399":col}`, borderRadius:"0 8px 8px 0", padding:"3px 8px", overflow:"hidden", display:"flex", alignItems:"center", gap:6, cursor:"pointer", zIndex:2, transition:"opacity 0.15s", opacity:goal.done?0.6:1 }}
                title={`${goal.done?"✓ ":""}${goal.text} (${goal.startTime}${goal.duration?`, ${goal.duration}min`:""})`}>
                <span style={{ fontSize:10, color:goal.done?"#34d399":col, fontWeight:600, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap", flex:1 }}>
                  {goal.done?"✓ ":""}{CAT_ICONS[goal.cat]} {goal.text}
                </span>
                {proj && <span style={{ fontSize:9, color:proj.color, flexShrink:0 }}>{proj.emoji}</span>}
                <span style={{ fontSize:9, color:t.textDim, flexShrink:0 }}>{goal.startTime}</span>
              </div>
            );
          })}
          {/* Now indicator */}
          {(()=>{
            const now = new Date(); const td = getTodayKey();
            if (dayKey!==td) return null;
            const ts = `${String(now.getHours()).padStart(2,"0")}:${String(now.getMinutes()).padStart(2,"0")}`;
            const top = timeToY(ts);
            if (top<0||top>TOTAL_H*HOUR_H) return null;
            return <div style={{ position:"absolute", top, left:0, right:0, height:2, background:"#f87171", zIndex:10 }}><div style={{ width:8,height:8,borderRadius:"50%",background:"#f87171",marginLeft:-4,marginTop:-3 }}/></div>;
          })()}
        </div>
      </div>
      {/* Unscheduled tasks */}
      {unscheduled.length>0 && (
        <div>
          <div style={{ fontSize:10, color:t.textDim, fontWeight:700, textTransform:"uppercase", letterSpacing:"0.8px", marginBottom:8, paddingLeft:2 }}>Non planifiées ({unscheduled.length})</div>
          {unscheduled.map(g=>{
            const col = catCol(g.cat,t);
            const proj = projects?.find(p=>p.id===g.projectId);
            return (
              <div key={g.id} onClick={()=>onToggleGoal(g.id)} style={{ display:"flex", alignItems:"center", gap:8, padding:"6px 10px", borderRadius:8, background:g.done?"rgba(52,211,153,0.06)":"rgba(255,255,255,0.02)", border:`1px solid ${g.done?"rgba(52,211,153,0.2)":t.cardBdr}`, marginBottom:4, cursor:"pointer", transition:"background 0.15s" }}
                onMouseEnter={e=>e.currentTarget.style.background=g.done?"rgba(52,211,153,0.1)":"rgba(139,92,246,0.06)"} onMouseLeave={e=>e.currentTarget.style.background=g.done?"rgba(52,211,153,0.06)":"rgba(255,255,255,0.02)"}>
                <div style={{ width:10, height:10, borderRadius:2, border:`2px solid ${g.done?"#34d399":col}`, background:g.done?"#34d399":"transparent", flexShrink:0 }} />
                <span style={{ flex:1, fontSize:12, color:g.done?t.textDim:t.text, textDecoration:g.done?"line-through":"none" }}>{CAT_ICONS[g.cat]} {g.text}</span>
                {proj && <span style={{ fontSize:9, color:proj.color }}>{proj.emoji} {proj.name.slice(0,12)}</span>}
                {g.doing&&!g.done && <span style={{ fontSize:9, color:"#f97316", fontWeight:700 }}>▶</span>}
              </div>
            );
          })}
        </div>
      )}
      {scheduled.length===0&&unscheduled.length===0&&courseSessions.length===0&&(
        <div style={{ textAlign:"center", color:t.textTiny, padding:"40px 0", fontSize:13 }}>Aucune tâche ni cours ce jour</div>
      )}
    </div>
  );
}

// ── ChecklistAddItem ──────────────────────────────────────────────────────────

function ChecklistAddItem({ examId, checklist, onUpdateExam, t, s }) {
  const [text, setText] = useState("");
  return (
    <input
      style={{ ...s.input, width:"100%", fontSize:11, padding:"4px 8px", marginTop:4 }}
      value={text}
      onChange={e=>setText(e.target.value)}
      onKeyDown={e=>{ if(e.key==="Enter"&&text.trim()){ onUpdateExam(examId,{checklist:[...checklist,{id:uid(),text:text.trim(),done:false}]}); setText(""); } }}
      placeholder="+ Ajouter une étape… (Entrée)"
    />
  );
}

// ── CoursesView ───────────────────────────────────────────────────────────────

function CoursesView({ courses, courseProgress, exams, onAddCourse, onUpdateCourse, onDeleteCourse, onToggleSession, onAddExam, onUpdateExam, onDeleteExam, data, s, t }) {
  const [selId,          setSelId]        = useState(courses[0]?.id||null);
  const [showAddCourse,  setShowCourse]   = useState(false);
  const [showAddExam,    setShowExam]     = useState(false);
  const [editingCourse,  setEditCourse]   = useState(null);
  const [cName, setCName]   = useState(""); const [cColor, setCColor] = useState(COURSE_COLORS[0]);
  const [cEmoji,setCEmoji]  = useState("📚"); const [cCreds, setCCreds] = useState(3);
  const [cSemStart,setCStart] = useState(()=>{ const d=new Date(); d.setDate(d.getDate()-((d.getDay()+6)%7)); return dateToKey(d); });
  const [cWeeks,  setCWeeks] = useState(14); const [cSlots, setCSlots] = useState([]);
  const [eName,setEName]=useState(""); const [eCourseId,setECid]=useState(""); const [eDate,setEDate]=useState("");
  const [eTime,setETime]=useState("08:00"); const [eType,setEType]=useState("exam"); const [eLoc,setELoc]=useState(""); const [eNote,setENote]=useState("");

  const today    = getTodayKey();
  const upcoming = exams.filter(e=>e.date>=today).sort((a,b)=>a.date.localeCompare(b.date)).slice(0,12);

  // ── Study hours from Pomodoro on tasks linked to courses ──
  const studyMinsByCourse = {};
  Object.values(data.days||{}).forEach(dv=>{
    (dv?.goals||[]).forEach(g=>{ if(g.courseId&&g.pomodoroMins>0) studyMinsByCourse[g.courseId]=(studyMinsByCourse[g.courseId]||0)+g.pomodoroMins; });
  });
  const fmtStudy = mins => mins>=60 ? `${Math.floor(mins/60)}h${mins%60>0?String(mins%60).padStart(2,"0"):""}` : `${mins}min`;
  const sel      = courses.find(c=>c.id===selId);

  const resetCourse = ()=>{ setCName(""); setCColor(COURSE_COLORS[0]); setCEmoji("📚"); setCCreds(3); setCWeeks(14); setCSlots([]); setEditCourse(null); };
  const pct = (course) => {
    const total = (course.timetable?.length||0)*(course.totalWeeks||14); if(!total) return 0;
    let done=0;
    for(let w=1;w<=(course.totalWeeks||14);w++){ const p=courseProgress?.[course.id]?.[String(w)]||[]; for(let i=0;i<(course.timetable?.length||0);i++) if(p[i]) done++; }
    return Math.round(done/total*100);
  };
  const isUpToDate = (course) => {
    if (!course.semesterStart || !course.timetable?.length) return false;
    const now = new Date();
    const start = toMonday(localDate(course.semesterStart));
    let hasPast = false;
    for (let w = 1; w <= (course.totalWeeks||14); w++) {
      for (let si = 0; si < course.timetable.length; si++) {
        const slot = course.timetable[si];
        const sessDate = new Date(start.getTime());
        sessDate.setDate(start.getDate() + (w-1)*7 + slot.day);
        // utilise l'heure de fin réelle si disponible, sinon fin de journée
        if (slot.endTime) {
          const [h, m] = slot.endTime.split(":").map(Number);
          sessDate.setHours(h, m, 0, 0);
        } else {
          sessDate.setHours(23, 59, 59, 999);
        }
        if (sessDate > now) continue;
        hasPast = true;
        if (!(courseProgress?.[course.id]?.[String(w)]?.[si])) return false;
      }
    }
    return hasPast;
  };
  const isCourseEnded = (course) => {
    if (!course.semesterStart || !course.timetable?.length) return false;
    const now = new Date();
    const start = toMonday(localDate(course.semesterStart));
    const lastDay = Math.max(...course.timetable.map(s=>s.day));
    const lastDate = new Date(start.getTime());
    lastDate.setDate(start.getDate() + ((course.totalWeeks||14)-1)*7 + lastDay);
    lastDate.setHours(23, 59, 59, 999);
    return now > lastDate;
  };
  const hasFutureExam = (courseId) => exams.some(e=>e.courseId===courseId && e.date>=today);

  const saveCourse = ()=>{
    if(!cName.trim()) return;
    const cd={name:cName.trim(),color:cColor,emoji:cEmoji,credits:+cCreds,semesterStart:cSemStart,totalWeeks:+cWeeks,timetable:cSlots};
    if(editingCourse){ onUpdateCourse(editingCourse.id,cd); } else { const nc={...cd,id:uid()}; onAddCourse(nc); setSelId(nc.id); }
    setShowCourse(false); resetCourse();
  };
  const saveExam = ()=>{
    if(!eName.trim()||!eDate) return;
    onAddExam({id:uid(),name:eName.trim(),courseId:eCourseId,date:eDate,time:eTime,type:eType,location:eLoc,note:eNote});
    setShowExam(false); setEName(""); setEDate(""); setELoc(""); setENote(""); setECid("");
  };

  return (
    <div className="fi">
      {/* Upcoming exams */}
      {upcoming.length>0 && (
        <div className="gc" style={{ ...s.card, marginBottom:18 }}>
          <div style={s.cardHead}>
            <span style={s.cardTitle}>📋 Échéances à venir</span>
            <button onClick={()=>setShowExam(true)} style={{ fontSize:11, padding:"4px 12px", borderRadius:8, border:"1px solid rgba(139,92,246,0.4)", background:"rgba(139,92,246,0.1)", color:"#c4b5fd", cursor:"pointer" }}>+ Ajouter</button>
          </div>
          <div style={{ padding:"10px 14px", display:"flex", flexDirection:"column", gap:6 }}>
            {upcoming.map(exam=>{
              const et=EXAM_TYPES.find(e=>e.id===exam.type), course=courses.find(c=>c.id===exam.courseId);
              const diff=Math.round((new Date(exam.date+"T12:00:00")-new Date(today+"T12:00:00"))/86400000);
              const urg=diff===0?"#f87171":diff<=3?"#f97316":diff<=7?"#fbbf24":"#34d399";
              return (
                <div key={exam.id} style={{ display:"flex", alignItems:"center", gap:10, padding:"8px 12px", borderRadius:10, background:urg+"0e", border:`1px solid ${urg}33` }}>
                  <span style={{ fontSize:15 }}>{et?.emoji||"📋"}</span>
                  <div style={{ flex:1, minWidth:0 }}>
                    <div style={{ fontSize:12, fontWeight:700, color:t.text }}>{exam.name}</div>
                    {course&&<div style={{ fontSize:10, color:course.color }}>{course.emoji} {course.name}</div>}
                    {exam.location&&<div style={{ fontSize:10, color:t.textDim }}>📍 {exam.location}</div>}
                  </div>
                  <div style={{ textAlign:"right", flexShrink:0 }}>
                    <div style={{ fontSize:11, fontWeight:700, color:urg }}>{diff===0?"Aujourd'hui !":diff===1?"Demain":`dans ${diff}j`}</div>
                    <div style={{ fontSize:10, color:t.textDim }}>{new Date(exam.date+"T12:00:00").toLocaleDateString("fr-FR",{day:"2-digit",month:"short"})}{exam.time&&` · ${exam.time}`}</div>
                    {(exam.checklist||[]).length>0 && (
                      <div style={{ fontSize:9, color:t.textDim, marginTop:2 }}>
                        {exam.checklist.filter(i=>i.done).length}/{exam.checklist.length} étapes
                      </div>
                    )}
                  </div>
                  <button onClick={()=>onDeleteExam(exam.id)} className="db" style={{ ...s.delBtn, opacity:0.3 }}>✕</button>
                </div>
              );
            })}
          </div>
        </div>
      )}

      <div style={{ display:"grid", gridTemplateColumns:"220px 1fr", gap:18, alignItems:"start" }}>
        {/* Left: course list */}
        <div style={{ display:"flex", flexDirection:"column", gap:6 }}>
          <button className="bg" onClick={()=>{ resetCourse(); setShowCourse(true); }} style={{ ...s.addBtn, width:"100%", fontSize:12, marginBottom:2 }}>+ Nouveau cours</button>
          {!upcoming.length&&<button onClick={()=>setShowExam(true)} style={{ width:"100%",padding:"7px",borderRadius:10,border:"1px dashed rgba(139,92,246,0.3)",background:"transparent",color:"#8b5cf6",fontSize:11,cursor:"pointer" }}>+ Examen / deadline</button>}
          {(() => {
            const active = courses.filter(c=>!isCourseEnded(c)||hasFutureExam(c.id));
            const hist   = courses.filter(c=>isCourseEnded(c)&&!hasFutureExam(c.id));
            const renderCard = (course) => {
              const p=pct(course), isSel=course.id===selId, upToDate=isUpToDate(course), ended=isCourseEnded(course);
              return (
                <button key={course.id} onClick={()=>setSelId(course.id)} style={{ padding:"10px 12px", borderRadius:10, border:`1px solid ${isSel?course.color+"55":upToDate?"rgba(52,211,153,0.3)":t.cardBdr}`, background:isSel?course.color+"18":ended?"transparent":t.card, cursor:"pointer", textAlign:"left", transition:"all 0.15s", opacity:ended?0.7:1 }}>
                  <div style={{ display:"flex", alignItems:"center", gap:8 }}>
                    <span style={{ fontSize:16 }}>{course.emoji}</span>
                    <div style={{ flex:1, minWidth:0 }}>
                      <div style={{ fontSize:12, fontWeight:600, color:isSel?course.color:ended?t.textSub:t.text, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{course.name}</div>
                      <div style={{ fontSize:10, color:t.textDim }}>{course.credits} ECTS · {p}%{studyMinsByCourse[course.id]?` · 🍅 ${fmtStudy(studyMinsByCourse[course.id])}`:""}</div>
                    </div>
                    {upToDate && <span title="À jour ✓" style={{ fontSize:13, color:"#34d399", flexShrink:0 }}>✓</span>}
                  </div>
                  <div style={{ marginTop:6, height:3, borderRadius:2, background:t.progressBg }}><div className="pb" style={{ height:"100%", width:`${p}%`, background:upToDate?"#34d399":course.color, borderRadius:2 }}/></div>
                </button>
              );
            };
            return (
              <>
                {active.map(renderCard)}
                {!active.length&&!hist.length&&<div style={{ textAlign:"center", color:t.textDim, fontSize:12, padding:"20px 10px" }}>Ajoutez vos matières !</div>}
                {hist.length>0&&(
                  <div style={{ marginTop:6 }}>
                    <div style={{ fontSize:9, color:t.textTiny, fontWeight:700, textTransform:"uppercase", letterSpacing:"0.8px", padding:"8px 4px 4px" }}>Historique ({hist.length})</div>
                    {hist.map(renderCard)}
                  </div>
                )}
              </>
            );
          })()}
        </div>

        {/* Right: selected course */}
        {sel ? (
          <div className="gc" style={s.card}>
            <div style={{ ...s.cardHead, gap:8 }}>
              <span style={{ fontSize:20 }}>{sel.emoji}</span>
              <span style={{ ...s.cardTitle, flex:1, fontSize:14, fontWeight:700, color:sel.color }}>{sel.name}</span>
              <span style={{ fontSize:11, color:t.textDim }}>{sel.credits} ECTS · {sel.totalWeeks} sem.</span>
              {studyMinsByCourse[sel.id]>0 && <span style={{ fontSize:11, padding:"2px 8px", borderRadius:20, background:"rgba(168,139,250,0.12)", color:"#a78bfa", border:"1px solid rgba(168,139,250,0.3)" }}>🍅 {fmtStudy(studyMinsByCourse[sel.id])}</span>}
              <button onClick={()=>{ setEditCourse(sel); setCName(sel.name); setCColor(sel.color); setCEmoji(sel.emoji); setCCreds(sel.credits); setCStart(sel.semesterStart||""); setCWeeks(sel.totalWeeks); setCSlots([...(sel.timetable||[])]);  setShowCourse(true); }}
                style={{ fontSize:11, padding:"3px 9px", borderRadius:7, border:`1px solid ${t.inpBdr}`, background:"transparent", color:t.textSub, cursor:"pointer" }}>✏️</button>
              <button onClick={()=>{ onDeleteCourse(sel.id); setSelId(courses.find(c=>c.id!==sel.id)?.id||null); }} className="db" style={{ ...s.delBtn, opacity:0.4, fontSize:14 }}>🗑</button>
            </div>
            {(sel.timetable?.length||0)>0&&(
              <div style={{ padding:"8px 14px", borderBottom:`1px solid ${t.divider}`, display:"flex", flexWrap:"wrap", gap:5 }}>
                {sel.timetable.map(slot=>(
                  <span key={slot.id} style={{ fontSize:10, padding:"3px 9px", borderRadius:8, background:sel.color+"20", color:sel.color, border:`1px solid ${sel.color}40` }}>
                    {DAYS_FR[slot.day].slice(0,3)} {slot.startTime}–{slot.endTime} · {slot.type}
                  </span>
                ))}
              </div>
            )}
            <div style={{ overflowX:"auto" }}>
              <table style={{ width:"100%", borderCollapse:"collapse", fontSize:11 }}>
                <thead>
                  <tr>
                    <th style={{ padding:"8px 12px", textAlign:"left", color:t.textDim, fontWeight:600, borderBottom:`1px solid ${t.divider}`, position:"sticky", top:0, background:t.glass, zIndex:1, whiteSpace:"nowrap" }}>Sem.</th>
                    <th style={{ padding:"8px 12px", textAlign:"left", color:t.textDim, fontWeight:600, borderBottom:`1px solid ${t.divider}`, position:"sticky", top:0, background:t.glass, zIndex:1 }}>Date</th>
                    {(sel.timetable||[]).map(slot=>(
                      <th key={slot.id} style={{ padding:"8px 12px", textAlign:"center", color:sel.color, fontWeight:600, borderBottom:`1px solid ${t.divider}`, position:"sticky", top:0, background:t.glass, zIndex:1, whiteSpace:"nowrap" }}>
                        {slot.type}<div style={{ fontSize:9, color:t.textDim, fontWeight:400 }}>{DAYS_FR[slot.day].slice(0,3)} {slot.startTime}</div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {Array.from({length:sel.totalWeeks||14},(_,wi)=>{
                    const wn=wi+1;
                    const prog=courseProgress?.[sel.id]?.[String(wn)]||[];
                    const wDate=sel.semesterStart?(()=>{ const d=toMonday(localDate(sel.semesterStart)); d.setDate(d.getDate()+wi*7); return d; })():null;
                    const wLabel=wDate?wDate.toLocaleDateString("fr-FR",{day:"2-digit",month:"short"}):"";
                    const now2=new Date();
                    const isCur=wDate&&(()=>{ const end=new Date(wDate); end.setDate(end.getDate()+7); return now2>=wDate&&now2<end; })();
                    return (
                      <tr key={wn} style={{ background:isCur?sel.color+"0d":"transparent", borderBottom:`1px solid ${t.divider}` }}>
                        <td style={{ padding:"7px 12px", color:isCur?sel.color:t.textSub, fontWeight:isCur?700:400, whiteSpace:"nowrap" }}>
                          S{wn} {isCur&&<span style={{ fontSize:9 }}>← auj.</span>}
                        </td>
                        <td style={{ padding:"7px 12px", color:t.textDim, fontSize:10 }}>{wLabel}</td>
                        {(sel.timetable||[]).map((slot,si)=>(
                          <td key={slot.id} style={{ padding:"7px 12px", textAlign:"center" }}>
                            <input type="checkbox" checked={!!prog[si]} onChange={()=>onToggleSession(sel.id,wn,si)}
                              style={{ width:16, height:16, accentColor:sel.color, cursor:"pointer" }} />
                          </td>
                        ))}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            {/* Exam checklists for this course */}
            {exams.filter(e=>e.courseId===sel.id).length>0 && (
              <div style={{ borderTop:`1px solid ${t.divider}`, padding:"14px 16px" }}>
                <div style={{ fontSize:12, fontWeight:700, color:t.textSub, marginBottom:10 }}>📋 Échéances & préparation</div>
                <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
                  {exams.filter(e=>e.courseId===sel.id).sort((a,b)=>a.date.localeCompare(b.date)).map(exam=>{
                    const et=EXAM_TYPES.find(x=>x.id===exam.type);
                    const diff=Math.round((new Date(exam.date+"T12:00:00")-new Date(today+"T12:00:00"))/86400000);
                    const urg=diff<=0?"#f87171":diff<=3?"#f97316":diff<=7?"#fbbf24":t.textDim;
                    const checklist=exam.checklist||[];
                    const doneCount=checklist.filter(i=>i.done).length;
                    const donePct=checklist.length?Math.round(doneCount/checklist.length*100):0;
                    return (
                      <div key={exam.id} style={{ borderRadius:10, border:`1px solid ${t.cardBdr}`, overflow:"hidden" }}>
                        <div style={{ display:"flex", alignItems:"center", gap:8, padding:"8px 12px", background:t.progressBg }}>
                          <span style={{ fontSize:13 }}>{et?.emoji||"📋"}</span>
                          <span style={{ flex:1, fontSize:12, fontWeight:700, color:t.text }}>{exam.name}</span>
                          <span style={{ fontSize:10, fontWeight:700, color:urg }}>{diff<0?"passé":diff===0?"auj.!":diff===1?"demain":`dans ${diff}j`}</span>
                          {checklist.length>0 && <span style={{ fontSize:10, color:t.textDim }}>{doneCount}/{checklist.length}</span>}
                        </div>
                        {checklist.length>0 && (
                          <div style={{ height:3, background:t.progressBg }}>
                            <div style={{ height:"100%", width:`${donePct}%`, background:donePct===100?"#34d399":sel.color, transition:"width 0.3s" }}/>
                          </div>
                        )}
                        <div style={{ padding:"8px 12px" }}>
                          {checklist.map(item=>(
                            <div key={item.id} style={{ display:"flex", alignItems:"center", gap:7, marginBottom:4 }}>
                              <input type="checkbox" checked={item.done} onChange={()=>onUpdateExam(exam.id,{checklist:checklist.map(i=>i.id===item.id?{...i,done:!i.done}:i)})}
                                style={{ width:13, height:13, accentColor:sel.color, cursor:"pointer", flexShrink:0 }}/>
                              <span style={{ flex:1, fontSize:11, color:item.done?t.textDim:t.text, textDecoration:item.done?"line-through":"none" }}>{item.text}</span>
                              <button onClick={()=>onUpdateExam(exam.id,{checklist:checklist.filter(i=>i.id!==item.id)})}
                                style={{ background:"none", border:"none", color:t.delColor, cursor:"pointer", fontSize:11, opacity:0.35, padding:"1px 3px" }}
                                onMouseEnter={e=>e.currentTarget.style.opacity="1"} onMouseLeave={e=>e.currentTarget.style.opacity="0.35"}>✕</button>
                            </div>
                          ))}
                          <ChecklistAddItem examId={exam.id} checklist={checklist} onUpdateExam={onUpdateExam} t={t} s={s}/>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="gc" style={{ ...s.card, display:"flex", alignItems:"center", justifyContent:"center", color:t.textDim, fontSize:13, minHeight:200 }}>
            Sélectionnez un cours ou créez-en un
          </div>
        )}
      </div>

      {/* Add/edit course modal */}
      {showAddCourse&&(
        <div onClick={e=>{ if(e.target===e.currentTarget){ setShowCourse(false); resetCourse(); } }} style={{ position:"fixed",inset:0,zIndex:998,background:"rgba(0,0,0,0.55)",backdropFilter:"blur(8px)",WebkitBackdropFilter:"blur(8px)",display:"flex",alignItems:"flex-start",justifyContent:"center",paddingTop:50,overflow:"auto" }}>
          <div style={{ width:"100%",maxWidth:560,background:t.glass,border:`1px solid ${t.glassBdr}`,borderRadius:18,backdropFilter:"blur(24px)",WebkitBackdropFilter:"blur(24px)",boxShadow:"0 24px 80px rgba(0,0,0,0.5)",margin:"0 16px 60px",overflow:"hidden" }}>
            <div style={{ padding:"14px 18px",borderBottom:`1px solid ${t.divider}`,display:"flex",alignItems:"center",justifyContent:"space-between" }}>
              <span style={{ fontSize:15,fontWeight:700,color:t.text }}>{editingCourse?"Modifier le cours":"Nouveau cours"}</span>
              <button onClick={()=>{ setShowCourse(false); resetCourse(); }} style={{ background:"none",border:"none",color:t.textSub,cursor:"pointer",fontSize:16 }}>✕</button>
            </div>
            <div style={{ padding:"16px 18px",display:"flex",flexDirection:"column",gap:12 }}>
              <div style={{ display:"flex",gap:8 }}>
                <input value={cEmoji} onChange={e=>setCEmoji(e.target.value)} style={{ ...s.input,width:56,textAlign:"center",fontSize:18,padding:"8px" }} />
                <input value={cName} onChange={e=>setCName(e.target.value)} style={{ ...s.input,flex:1 }} placeholder="Nom du cours (ex: Analyse IV)" autoFocus />
              </div>
              <div style={{ display:"flex",gap:8 }}>
                <div style={{ flex:1 }}><div style={{ fontSize:11,color:t.textDim,marginBottom:4 }}>Crédits ECTS</div><input type="number" min="1" max="30" value={cCreds} onChange={e=>setCCreds(e.target.value)} style={s.input}/></div>
                <div style={{ flex:1 }}><div style={{ fontSize:11,color:t.textDim,marginBottom:4 }}>Semaines</div><input type="number" min="1" max="28" value={cWeeks} onChange={e=>setCWeeks(e.target.value)} style={s.input}/></div>
              </div>
              <div><div style={{ fontSize:11,color:t.textDim,marginBottom:4 }}>Début semestre (Semaine 1)</div><input type="date" value={cSemStart} onChange={e=>setCStart(e.target.value)} style={s.input}/></div>
              <div>
                <div style={{ fontSize:11,color:t.textDim,marginBottom:6 }}>Couleur</div>
                <div style={{ display:"flex",gap:5,flexWrap:"wrap" }}>
                  {COURSE_COLORS.map(col=><button key={col} onClick={()=>setCColor(col)} style={{ width:22,height:22,borderRadius:"50%",background:col,border:`3px solid ${cColor===col?"white":"transparent"}`,cursor:"pointer" }}/>)}
                </div>
              </div>
              <div>
                <div style={{ display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:6 }}>
                  <div style={{ fontSize:11,color:t.textDim }}>Horaire hebdomadaire</div>
                  <button onClick={()=>setCSlots(prev=>[...prev,{id:uid(),day:0,startTime:"08:15",endTime:"10:00",type:"Cours"}])} style={{ fontSize:11,padding:"3px 9px",borderRadius:7,border:"1px dashed rgba(139,92,246,0.4)",background:"transparent",color:"#8b5cf6",cursor:"pointer" }}>+ Créneau</button>
                </div>
                {cSlots.map((slot,i)=>(
                  <div key={slot.id} style={{ display:"flex",gap:5,marginBottom:5,alignItems:"center" }}>
                    <select value={slot.day} onChange={e=>setCSlots(p=>p.map((ss,j)=>j===i?{...ss,day:+e.target.value}:ss))} style={{ ...s.sel,flex:1 }}>
                      {DAYS_FR.map((d,di)=><option key={di} value={di}>{d}</option>)}
                    </select>
                    <input type="time" value={slot.startTime} onChange={e=>setCSlots(p=>p.map((ss,j)=>j===i?{...ss,startTime:e.target.value}:ss))} style={{ ...s.input,width:76,padding:"7px 5px",textAlign:"center" }}/>
                    <span style={{ color:t.textDim,fontSize:11 }}>→</span>
                    <input type="time" value={slot.endTime} onChange={e=>setCSlots(p=>p.map((ss,j)=>j===i?{...ss,endTime:e.target.value}:ss))} style={{ ...s.input,width:76,padding:"7px 5px",textAlign:"center" }}/>
                    <select value={slot.type} onChange={e=>setCSlots(p=>p.map((ss,j)=>j===i?{...ss,type:e.target.value}:ss))} style={{ ...s.sel,flex:1 }}>
                      {TIMETABLE_TYPES.map(tt=><option key={tt} value={tt}>{tt}</option>)}
                    </select>
                    <button onClick={()=>setCSlots(p=>p.filter((_,j)=>j!==i))} style={{ background:"none",border:"none",color:"#f87171",cursor:"pointer",fontSize:14,padding:"2px 4px" }}>✕</button>
                  </div>
                ))}
                {!cSlots.length&&<div style={{ fontSize:11,color:t.textTiny,textAlign:"center",padding:"8px 0" }}>Aucun créneau — ajoutez cours, exercices, TP…</div>}
              </div>
            </div>
            <div style={{ padding:"12px 18px",borderTop:`1px solid ${t.divider}`,display:"flex",gap:8,justifyContent:"flex-end" }}>
              <button onClick={()=>{ setShowCourse(false); resetCourse(); }} style={{ padding:"9px 16px",borderRadius:10,border:`1px solid ${t.inpBdr}`,background:"transparent",color:t.textSub,cursor:"pointer",fontSize:13 }}>Annuler</button>
              <button className="bg" onClick={saveCourse} style={s.addBtn}>{editingCourse?"Enregistrer":"Créer le cours"}</button>
            </div>
          </div>
        </div>
      )}

      {/* Add exam modal */}
      {showAddExam&&(
        <div onClick={e=>{ if(e.target===e.currentTarget) setShowExam(false); }} style={{ position:"fixed",inset:0,zIndex:998,background:"rgba(0,0,0,0.55)",backdropFilter:"blur(8px)",WebkitBackdropFilter:"blur(8px)",display:"flex",alignItems:"center",justifyContent:"center",padding:20 }}>
          <div style={{ width:"100%",maxWidth:460,background:t.glass,border:`1px solid ${t.glassBdr}`,borderRadius:18,backdropFilter:"blur(24px)",WebkitBackdropFilter:"blur(24px)",boxShadow:"0 24px 80px rgba(0,0,0,0.5)",overflow:"hidden" }}>
            <div style={{ padding:"14px 18px",borderBottom:`1px solid ${t.divider}`,display:"flex",alignItems:"center",justifyContent:"space-between" }}>
              <span style={{ fontSize:15,fontWeight:700,color:t.text }}>Nouvelle échéance</span>
              <button onClick={()=>setShowExam(false)} style={{ background:"none",border:"none",color:t.textSub,cursor:"pointer",fontSize:16 }}>✕</button>
            </div>
            <div style={{ padding:"16px 18px",display:"flex",flexDirection:"column",gap:10 }}>
              <input value={eName} onChange={e=>setEName(e.target.value)} style={s.input} placeholder="Nom (ex: Examen final Analyse IV)" autoFocus/>
              <div style={{ display:"flex",gap:8 }}>
                <select value={eType} onChange={e=>setEType(e.target.value)} style={{ ...s.sel,flex:1 }}>
                  {EXAM_TYPES.map(et=><option key={et.id} value={et.id}>{et.emoji} {et.label}</option>)}
                </select>
                <select value={eCourseId} onChange={e=>setECid(e.target.value)} style={{ ...s.sel,flex:1 }}>
                  <option value="">— cours (opt.) —</option>
                  {courses.map(c=><option key={c.id} value={c.id}>{c.emoji} {c.name}</option>)}
                </select>
              </div>
              <div style={{ display:"flex",gap:8 }}>
                <div style={{ flex:2 }}><div style={{ fontSize:11,color:t.textDim,marginBottom:4 }}>Date</div><input type="date" value={eDate} onChange={e=>setEDate(e.target.value)} style={s.input}/></div>
                <div style={{ flex:1 }}><div style={{ fontSize:11,color:t.textDim,marginBottom:4 }}>Heure</div><input type="time" value={eTime} onChange={e=>setETime(e.target.value)} style={s.input}/></div>
              </div>
              <input value={eLoc} onChange={e=>setELoc(e.target.value)} style={s.input} placeholder="Lieu / salle (optionnel)"/>
              <textarea value={eNote} onChange={e=>setENote(e.target.value)} style={{ ...s.input,resize:"vertical",minHeight:55 }} placeholder="Note (optionnel)"/>
            </div>
            <div style={{ padding:"12px 18px",borderTop:`1px solid ${t.divider}`,display:"flex",gap:8,justifyContent:"flex-end" }}>
              <button onClick={()=>setShowExam(false)} style={{ padding:"9px 16px",borderRadius:10,border:`1px solid ${t.inpBdr}`,background:"transparent",color:t.textSub,cursor:"pointer",fontSize:13 }}>Annuler</button>
              <button className="bg" onClick={saveExam} style={s.addBtn}>Ajouter</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ── ProjectsView ──────────────────────────────────────────────────────────────

function ProjectsView({ projects, data, onAddProject, onUpdateProject, onDeleteProject, s, t }) {
  const [showAdd,  setShowAdd]  = useState(false);
  const [selId,    setSelId]    = useState(null);
  const [editProj, setEditProj] = useState(null);
  const [pName,setPName]=useState(""); const [pColor,setPColor]=useState(COURSE_COLORS[0]);
  const [pEmoji,setPEmoji]=useState("📁"); const [pDeadline,setPDL]=useState(""); const [pDesc,setPDesc]=useState("");

  const today = getTodayKey();
  const getLinked = (pid) => {
    const tasks=[];
    Object.entries(data.days||{}).forEach(([dk,dv])=>(dv.goals||[]).forEach(g=>{ if(g.projectId===pid) tasks.push({...g,sourceType:"day",sourceKey:dk}); }));
    (data.todo||[]).forEach(g=>{ if(g.projectId===pid) tasks.push({...g,sourceType:"todo"}); });
    return tasks;
  };

  const active   = projects.filter(p=>!p.archived);
  const archived = projects.filter(p=>p.archived);

  const openAdd = (proj=null)=>{
    setEditProj(proj);
    if(proj){ setPName(proj.name); setPColor(proj.color); setPEmoji(proj.emoji); setPDL(proj.deadline||""); setPDesc(proj.description||""); }
    else { setPName(""); setPColor(COURSE_COLORS[0]); setPEmoji("📁"); setPDL(""); setPDesc(""); }
    setShowAdd(true);
  };
  const save = ()=>{
    if(!pName.trim()) return;
    const pd={name:pName.trim(),color:pColor,emoji:pEmoji,deadline:pDeadline,description:pDesc};
    if(editProj){ onUpdateProject(editProj.id,pd); }
    else { const np={...pd,id:uid(),archived:false,createdAt:today}; onAddProject(np); }
    setShowAdd(false); setEditProj(null);
  };

  return (
    <div className="fi">
      <div style={{ display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:18 }}>
        <div style={{ fontSize:13,color:t.textDim }}>{active.length} projet{active.length!==1?"s":""} actif{active.length!==1?"s":""}</div>
        <button className="bg" onClick={()=>openAdd()} style={s.addBtn}>+ Nouveau projet</button>
      </div>

      {!active.length&&(
        <div style={{ textAlign:"center",padding:"60px 20px",color:t.textDim }}>
          <div style={{ fontSize:32,marginBottom:12 }}>📁</div>
          <div style={{ fontSize:14,fontWeight:600,marginBottom:6 }}>Aucun projet actif</div>
          <div style={{ fontSize:12 }}>Créez des projets pour regrouper et suivre vos tâches !</div>
        </div>
      )}

      <div style={{ display:"grid",gridTemplateColumns:"repeat(auto-fill,minmax(280px,1fr))",gap:16 }}>
        {active.map(proj=>{
          const tasks=getLinked(proj.id), done=tasks.filter(t2=>t2.done).length;
          const p=tasks.length?Math.round(done/tasks.length*100):0;
          const ddiff=proj.deadline?Math.round((new Date(proj.deadline+"T12:00:00")-new Date(today+"T12:00:00"))/86400000):null;
          const isExp=selId===proj.id;
          return (
            <div key={proj.id} className="gc" style={{ ...s.card,overflow:"hidden",border:`1px solid ${isExp?proj.color+"55":t.cardBdr}` }}>
              <div style={{ height:4,background:proj.color }}/>
              <div style={{ padding:"14px 16px" }}>
                <div style={{ display:"flex",alignItems:"flex-start",gap:10,marginBottom:8 }}>
                  <span style={{ fontSize:24 }}>{proj.emoji}</span>
                  <div style={{ flex:1,minWidth:0 }}>
                    <div style={{ fontSize:14,fontWeight:700,color:t.text,marginBottom:2 }}>{proj.name}</div>
                    {proj.description&&<div style={{ fontSize:11,color:t.textDim,overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap" }}>{proj.description}</div>}
                  </div>
                  <div style={{ display:"flex",gap:2,flexShrink:0 }}>
                    <button onClick={()=>openAdd(proj)} style={{ background:"none",border:"none",cursor:"pointer",fontSize:13,color:t.textSub,padding:"2px 4px",opacity:0.5,transition:"opacity 0.15s" }} onMouseEnter={e=>e.currentTarget.style.opacity="1"} onMouseLeave={e=>e.currentTarget.style.opacity="0.5"}>✏️</button>
                    <button onClick={()=>onUpdateProject(proj.id,{archived:true})} title="Archiver" style={{ background:"none",border:"none",cursor:"pointer",fontSize:12,color:t.textSub,padding:"2px 4px",opacity:0.5,transition:"opacity 0.15s" }} onMouseEnter={e=>e.currentTarget.style.opacity="1"} onMouseLeave={e=>e.currentTarget.style.opacity="0.5"}>📦</button>
                  </div>
                </div>
                {ddiff!==null&&(
                  <div style={{ fontSize:11,color:ddiff<0?"#f87171":ddiff<=7?"#f97316":"#34d399",marginBottom:8,fontWeight:600 }}>
                    {ddiff<0?`⚠️ Dépassé de ${-ddiff}j`:ddiff===0?"📋 Deadline aujourd'hui !":ddiff===1?"📅 Demain":`📅 Dans ${ddiff}j · ${new Date(proj.deadline+"T12:00:00").toLocaleDateString("fr-FR",{day:"2-digit",month:"short"})}`}
                  </div>
                )}
                <div style={{ display:"flex",alignItems:"center",gap:8,marginBottom:8 }}>
                  <div style={{ flex:1,height:6,borderRadius:3,background:t.progressBg,overflow:"hidden" }}><div className="pb" style={{ height:"100%",width:`${p}%`,background:proj.color,borderRadius:3 }}/></div>
                  <span style={{ fontSize:11,color:t.textDim,whiteSpace:"nowrap" }}>{done}/{tasks.length} tâches</span>
                </div>
                <button onClick={()=>setSelId(isExp?null:proj.id)} style={{ width:"100%",padding:"5px",borderRadius:8,border:`1px solid ${t.cardBdr}`,background:"transparent",color:t.textDim,fontSize:11,cursor:"pointer" }}>
                  {isExp?"▲ Masquer":`▼ Voir ${tasks.length} tâche${tasks.length!==1?"s":""}`}
                </button>
                {isExp&&(
                  <div style={{ marginTop:8,display:"flex",flexDirection:"column",gap:4 }}>
                    {!tasks.length&&<div style={{ fontSize:11,color:t.textTiny,textAlign:"center",padding:"10px 0" }}>Liez des tâches à ce projet via le bouton 📁 dans la vue Journée</div>}
                    {tasks.map(task=>(
                      <div key={task.id} style={{ display:"flex",alignItems:"center",gap:8,padding:"5px 8px",borderRadius:7,background:task.done?t.tagDone:t.card,border:`1px solid ${task.done?t.tagDoneBdr:t.cardBdr}` }}>
                        <span style={{ fontSize:11,color:task.done?"#34d399":t.textDim }}>{task.done?"✓":"○"}</span>
                        <span style={{ flex:1,fontSize:11,color:task.done?t.textDim:t.text,textDecoration:task.done?"line-through":"none",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap" }}>{task.text}</span>
                        {task.sourceKey&&<span style={{ fontSize:9,color:t.textTiny }}>{task.sourceKey}</span>}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {archived.length>0&&(
        <div style={{ marginTop:24 }}>
          <div style={{ fontSize:11,color:t.textDim,marginBottom:10,fontWeight:600,textTransform:"uppercase",letterSpacing:"0.8px" }}>Archivés ({archived.length})</div>
          {archived.map(p=>(
            <div key={p.id} style={{ display:"flex",alignItems:"center",gap:10,padding:"8px 14px",borderRadius:10,border:`1px solid ${t.cardBdr}`,background:t.card,opacity:0.6,marginBottom:5 }}>
              <span>{p.emoji}</span><span style={{ flex:1,fontSize:12,color:t.textSub }}>{p.name}</span>
              <button onClick={()=>onUpdateProject(p.id,{archived:false})} style={{ fontSize:11,color:"#8b5cf6",background:"none",border:"1px solid rgba(139,92,246,0.3)",borderRadius:6,padding:"2px 8px",cursor:"pointer" }}>Restaurer</button>
              <button onClick={()=>onDeleteProject(p.id)} className="db" style={s.delBtn}>✕</button>
            </div>
          ))}
        </div>
      )}

      {showAdd&&(
        <div onClick={e=>{ if(e.target===e.currentTarget){ setShowAdd(false); setEditProj(null); } }} style={{ position:"fixed",inset:0,zIndex:998,background:"rgba(0,0,0,0.55)",backdropFilter:"blur(8px)",WebkitBackdropFilter:"blur(8px)",display:"flex",alignItems:"center",justifyContent:"center",padding:20 }}>
          <div style={{ width:"100%",maxWidth:440,background:t.glass,border:`1px solid ${t.glassBdr}`,borderRadius:18,backdropFilter:"blur(24px)",WebkitBackdropFilter:"blur(24px)",boxShadow:"0 24px 80px rgba(0,0,0,0.5)",overflow:"hidden" }}>
            <div style={{ padding:"14px 18px",borderBottom:`1px solid ${t.divider}`,display:"flex",alignItems:"center",justifyContent:"space-between" }}>
              <span style={{ fontSize:15,fontWeight:700,color:t.text }}>{editProj?"Modifier le projet":"Nouveau projet"}</span>
              <button onClick={()=>{ setShowAdd(false); setEditProj(null); }} style={{ background:"none",border:"none",color:t.textSub,cursor:"pointer",fontSize:16 }}>✕</button>
            </div>
            <div style={{ padding:"16px 18px",display:"flex",flexDirection:"column",gap:10 }}>
              <div style={{ display:"flex",gap:8 }}>
                <input value={pEmoji} onChange={e=>setPEmoji(e.target.value)} style={{ ...s.input,width:56,textAlign:"center",fontSize:18,padding:"8px" }}/>
                <input value={pName} onChange={e=>setPName(e.target.value)} style={{ ...s.input,flex:1 }} placeholder="Nom du projet" autoFocus/>
              </div>
              <div><div style={{ fontSize:11,color:t.textDim,marginBottom:6 }}>Couleur</div><div style={{ display:"flex",gap:5,flexWrap:"wrap" }}>{COURSE_COLORS.map(col=><button key={col} onClick={()=>setPColor(col)} style={{ width:22,height:22,borderRadius:"50%",background:col,border:`3px solid ${pColor===col?"white":"transparent"}`,cursor:"pointer" }}/>)}</div></div>
              <div><div style={{ fontSize:11,color:t.textDim,marginBottom:4 }}>Deadline (optionnel)</div><input type="date" value={pDeadline} onChange={e=>setPDL(e.target.value)} style={s.input}/></div>
              <textarea value={pDesc} onChange={e=>setPDesc(e.target.value)} style={{ ...s.input,resize:"vertical",minHeight:55 }} placeholder="Description (optionnel)"/>
            </div>
            <div style={{ padding:"12px 18px",borderTop:`1px solid ${t.divider}`,display:"flex",gap:8,justifyContent:"flex-end" }}>
              <button onClick={()=>{ setShowAdd(false); setEditProj(null); }} style={{ padding:"9px 16px",borderRadius:10,border:`1px solid ${t.inpBdr}`,background:"transparent",color:t.textSub,cursor:"pointer",fontSize:13 }}>Annuler</button>
              <button className="bg" onClick={save} style={s.addBtn}>{editProj?"Enregistrer":"Créer"}</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function RecipesView({ recipes, meals, onAdd, onUpdate, onDelete, onAddMeal, onRemoveMeal, s, t }) {
  const [query, setQuery]       = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId]     = useState(null);
  const [expanded, setExpanded] = useState({});
  const [planning, setPlanning] = useState(null);

  const emptyForm = { name:"", emoji:"🍽️", tags:[], prepTime:"", ingredients:[""], steps:[""], note:"" };
  const [form, setForm] = useState(emptyForm);

  const q = query.trim().toLowerCase();
  const filtered = recipes
    .filter(r => !q || r.name.toLowerCase().includes(q)
      || (r.tags||[]).some(tg=>tg.toLowerCase().includes(q))
      || (r.ingredients||[]).some(i=>i.toLowerCase().includes(q)))
    .sort((a, b) => a.name.localeCompare(b.name, "fr"));

  const openEdit = r => {
    setForm({ name:r.name, emoji:r.emoji||"🍽️", tags:r.tags||[], prepTime:r.prepTime||"", ingredients:r.ingredients.length?r.ingredients:[""], steps:r.steps.length?r.steps:[""], note:r.note||"" });
    setEditId(r.id); setShowForm(true);
  };

  const handleSave = () => {
    if (!form.name.trim()) return;
    const r = { id:editId||uid(), name:form.name.trim(), emoji:form.emoji, tags:form.tags, prepTime:form.prepTime?Number(form.prepTime):null, ingredients:form.ingredients.filter(i=>i.trim()), steps:form.steps.filter(s=>s.trim()), note:form.note, createdAt:editId?(recipes.find(r=>r.id===editId)?.createdAt||getTodayKey()):getTodayKey() };
    editId ? onUpdate(editId, r) : onAdd(r);
    setShowForm(false); setEditId(null); setForm(emptyForm);
  };

  const planDays = Array.from({length:7},(_,i)=>{ const d=new Date(); d.setDate(d.getDate()+i); return { dk:dateToKey(d), label:i===0?"Aujourd'hui":i===1?"Demain":d.toLocaleDateString("fr-FR",{weekday:"short",day:"numeric"}) }; });

  const ingRefs  = useRef([]);
  const stepRefs = useRef([]);
  const setIngredient = (i,v) => setForm(f=>({ ...f, ingredients:f.ingredients.map((x,j)=>j===i?v:x) }));
  const addIngredient = (afterIdx) => { setForm(f=>({ ...f, ingredients:[...f.ingredients,""] })); setTimeout(()=>ingRefs.current[afterIdx+1]?.focus(), 30); };
  const delIngredient = i     => setForm(f=>({ ...f, ingredients:f.ingredients.filter((_,j)=>j!==i) }));
  const setStep       = (i,v) => setForm(f=>({ ...f, steps:f.steps.map((x,j)=>j===i?v:x) }));
  const addStep       = (afterIdx) => { setForm(f=>({ ...f, steps:[...f.steps,""] })); setTimeout(()=>stepRefs.current[afterIdx+1]?.focus(), 30); };
  const delStep       = i     => setForm(f=>({ ...f, steps:f.steps.filter((_,j)=>j!==i) }));
  const toggleTag     = tg    => setForm(f=>({ ...f, tags:f.tags.includes(tg)?f.tags.filter(x=>x!==tg):[...f.tags,tg] }));

  const col = "#f97316";

  return (
    <div className="fi" style={{ display:"grid", gap:14 }}>
      {/* Header bar */}
      <div style={{ display:"flex", gap:10, alignItems:"center" }}>
        <div style={{ position:"relative", flex:1 }}>
          <span style={{ position:"absolute", left:12, top:"50%", transform:"translateY(-50%)", fontSize:14, color:t.textDim, pointerEvents:"none" }}>🔍</span>
          <input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Rechercher une recette, ingrédient…" style={{ ...s.input, paddingLeft:36, fontSize:13 }} />
        </div>
        <button onClick={()=>{ setForm(emptyForm); setEditId(null); setShowForm(true); }}
          style={{ padding:"9px 18px", borderRadius:10, border:"1px solid rgba(249,115,22,0.4)", background:"rgba(249,115,22,0.12)", color:col, fontSize:13, fontWeight:700, cursor:"pointer", whiteSpace:"nowrap" }}>
          + Recette
        </button>
      </div>

      {/* Recipe cards */}
      {filtered.length === 0
        ? <div style={{ textAlign:"center", color:t.textTiny, padding:"40px 0", fontSize:13 }}>{q?"Aucune recette trouvée":"Aucune recette — ajoutes-en une !"}</div>
        : filtered.map(r => {
            const isOpen = !!expanded[r.id];
            const isPlanning = planning === r.id;
            return (
              <div key={r.id} className="gc" style={{ ...s.card, border:`1px solid ${isOpen?"rgba(249,115,22,0.3)":t.cardBdr}`, transition:"border-color 0.2s" }}>
                {/* Card header */}
                <div style={{ display:"flex", alignItems:"center", gap:12, padding:"14px 16px", cursor:"pointer" }} onClick={()=>setExpanded(e=>({...e,[r.id]:!e[r.id]}))}>
                  <span style={{ fontSize:28, flexShrink:0 }}>{r.emoji||"🍽️"}</span>
                  <div style={{ flex:1, minWidth:0 }}>
                    <div style={{ fontSize:14, fontWeight:700, color:t.text }}>{r.name}</div>
                    <div style={{ display:"flex", flexWrap:"wrap", gap:4, marginTop:4 }}>
                      {(r.tags||[]).map(tg=><span key={tg} style={{ fontSize:10, padding:"1px 7px", borderRadius:20, background:"rgba(249,115,22,0.1)", color:col, border:"1px solid rgba(249,115,22,0.2)" }}>{tg}</span>)}
                      {r.prepTime && <span style={{ fontSize:10, color:t.textDim }}>⏱ {r.prepTime} min</span>}
                    </div>
                  </div>
                  <div style={{ display:"flex", gap:6, alignItems:"center" }}>
                    <button onClick={e=>{e.stopPropagation();setPlanning(isPlanning?null:r.id);}} title="Planifier"
                      style={{ padding:"5px 11px", borderRadius:8, border:`1px solid ${isPlanning?"rgba(249,115,22,0.5)":t.inpBdr}`, background:isPlanning?"rgba(249,115,22,0.12)":"transparent", color:isPlanning?col:t.textSub, fontSize:12, cursor:"pointer", fontWeight:600 }}>
                      📅
                    </button>
                    <button onClick={e=>{e.stopPropagation();openEdit(r);}} style={{ background:"none", border:"none", cursor:"pointer", fontSize:13, color:t.textDim, padding:"4px" }}>✏️</button>
                    <button onClick={e=>{e.stopPropagation();onDelete(r.id);}} style={{ background:"none", border:"none", cursor:"pointer", fontSize:13, color:t.delColor, padding:"4px" }}>✕</button>
                    <span style={{ fontSize:11, color:t.textDim }}>{isOpen?"▲":"▼"}</span>
                  </div>
                </div>

                {/* Plan day picker */}
                {isPlanning && (
                  <div style={{ padding:"8px 16px 12px", borderTop:`1px solid ${t.divider}`, display:"flex", flexWrap:"wrap", gap:6 }}>
                    <span style={{ fontSize:11, color:t.textDim, width:"100%", marginBottom:2 }}>Planifier pour :</span>
                    {planDays.map(({dk,label})=>{
                      const already = (meals[dk]||[]).some(m=>m.recipeId===r.id);
                      return (
                        <button key={dk} onClick={()=>{ if(!already){ onAddMeal(dk,{id:uid(),recipeId:r.id,name:r.name,emoji:r.emoji||"🍽️",prepTime:r.prepTime}); } setPlanning(null); }}
                          style={{ padding:"5px 12px", borderRadius:8, fontSize:11, cursor:already?"default":"pointer", fontWeight:600,
                            border:`1px solid ${already?"rgba(52,211,153,0.3)":"rgba(249,115,22,0.3)"}`,
                            background:already?"rgba(52,211,153,0.08)":"rgba(249,115,22,0.08)",
                            color:already?"#34d399":col }}>
                          {label}{already?" ✓":""}
                        </button>
                      );
                    })}
                  </div>
                )}

                {/* Expanded content */}
                {isOpen && (
                  <div style={{ padding:"12px 18px 16px", borderTop:`1px solid ${t.divider}`, display:"grid", gap:14 }}>
                    {r.ingredients.length > 0 && (
                      <div>
                        <div style={{ fontSize:11, fontWeight:700, color:col, marginBottom:8, textTransform:"uppercase", letterSpacing:"0.7px" }}>Ingrédients</div>
                        <ul style={{ margin:0, padding:"0 0 0 18px", display:"grid", gap:4 }}>
                          {r.ingredients.map((ing,i)=><li key={i} style={{ fontSize:13, color:t.text }}>{ing}</li>)}
                        </ul>
                      </div>
                    )}
                    {r.steps.length > 0 && (
                      <div>
                        <div style={{ fontSize:11, fontWeight:700, color:col, marginBottom:8, textTransform:"uppercase", letterSpacing:"0.7px" }}>Étapes</div>
                        <ol style={{ margin:0, padding:"0 0 0 18px", display:"grid", gap:6 }}>
                          {r.steps.map((st,i)=><li key={i} style={{ fontSize:13, color:t.text, lineHeight:1.5 }}>{st}</li>)}
                        </ol>
                      </div>
                    )}
                    {r.note && <div style={{ fontSize:12, color:t.textDim, fontStyle:"italic", borderLeft:`2px solid ${col}44`, paddingLeft:10 }}>{r.note}</div>}
                  </div>
                )}
              </div>
            );
          })
      }

      {/* Add/Edit form modal */}
      {showForm && (
        <div style={{ position:"fixed", inset:0, zIndex:1000, background:"rgba(0,0,0,0.6)", backdropFilter:"blur(8px)", display:"flex", alignItems:"center", justifyContent:"center", padding:20 }}
          onClick={e=>{ if(e.target===e.currentTarget){setShowForm(false);setEditId(null);} }}>
          <div style={{ background:t.card, border:`1px solid ${t.cardBdr}`, borderRadius:20, padding:"24px 26px", width:"100%", maxWidth:520, maxHeight:"85vh", overflowY:"auto", display:"grid", gap:14 }}>
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center" }}>
              <span style={{ fontSize:15, fontWeight:700, color:t.text }}>{editId?"Modifier la recette":"Nouvelle recette"}</span>
              <button onClick={()=>{setShowForm(false);setEditId(null);}} style={{ background:"none",border:"none",cursor:"pointer",color:t.textDim,fontSize:18 }}>✕</button>
            </div>

            {/* Emoji picker */}
            <div>
              <div style={{ fontSize:11, color:t.textDim, marginBottom:6 }}>Icône</div>
              <div style={{ display:"flex", flexWrap:"wrap", gap:6, marginBottom:8 }}>
                {RECIPE_EMOJIS.map(em=>(
                  <button key={em} onClick={()=>setForm(f=>({...f,emoji:em}))}
                    style={{ fontSize:20, padding:"4px 6px", borderRadius:8, border:`1px solid ${form.emoji===em?"rgba(249,115,22,0.5)":t.cardBdr}`, background:form.emoji===em?"rgba(249,115,22,0.12)":"transparent", cursor:"pointer" }}>{em}</button>
                ))}
              </div>
              <div style={{ display:"flex", alignItems:"center", gap:8 }}>
                <span style={{ fontSize:11, color:t.textDim, whiteSpace:"nowrap" }}>Ou saisir :</span>
                <input value={form.emoji} onChange={e=>setForm(f=>({...f,emoji:e.target.value}))} placeholder="Colle un emoji…" style={{ ...s.input, width:90, fontSize:20, textAlign:"center", padding:"4px 8px" }} />
                <span style={{ fontSize:24 }}>{form.emoji}</span>
              </div>
            </div>

            <input value={form.name} onChange={e=>setForm(f=>({...f,name:e.target.value}))} placeholder="Nom de la recette *" style={{ ...s.input, fontSize:14, fontWeight:600 }} />

            {/* Tags */}
            <div>
              <div style={{ fontSize:11, color:t.textDim, marginBottom:6 }}>Tags</div>
              <div style={{ display:"flex", flexWrap:"wrap", gap:6 }}>
                {RECIPE_TAGS.map(([em,lbl])=>{
                  const active = form.tags.includes(lbl);
                  return <button key={lbl} onClick={()=>toggleTag(lbl)} style={{ padding:"4px 10px", borderRadius:20, fontSize:11, cursor:"pointer", fontWeight:600, border:`1px solid ${active?"rgba(249,115,22,0.4)":t.inpBdr}`, background:active?"rgba(249,115,22,0.12)":"transparent", color:active?col:t.textSub }}>{em} {lbl}</button>;
                })}
              </div>
            </div>

            <div style={{ display:"flex", alignItems:"center", gap:8 }}>
              <span style={{ fontSize:12, color:t.textSub, whiteSpace:"nowrap" }}>⏱ Temps (min)</span>
              <input type="number" min="1" value={form.prepTime} onChange={e=>setForm(f=>({...f,prepTime:e.target.value}))} placeholder="ex: 30" style={{ ...s.input, width:80 }} />
            </div>

            {/* Ingredients */}
            <div>
              <div style={{ fontSize:11, color:t.textDim, marginBottom:6 }}>Ingrédients</div>
              {form.ingredients.map((ing,i)=>(
                <div key={i} style={{ display:"flex", gap:6, marginBottom:5 }}>
                  <input ref={el=>ingRefs.current[i]=el} value={ing} onChange={e=>setIngredient(i,e.target.value)}
                    onKeyDown={e=>{ if(e.key==="Enter"){ e.preventDefault(); addIngredient(i); } }}
                    placeholder={`Ingrédient ${i+1}`} style={{ ...s.input, flex:1, fontSize:12 }} />
                  {form.ingredients.length>1 && <button onClick={()=>delIngredient(i)} style={{ background:"none",border:"none",cursor:"pointer",color:t.delColor,fontSize:16,padding:"0 4px" }}>−</button>}
                </div>
              ))}
              <button onClick={()=>addIngredient(form.ingredients.length-1)} style={{ fontSize:12, color:col, background:"none", border:`1px dashed ${col}55`, borderRadius:8, padding:"4px 12px", cursor:"pointer", marginTop:2 }}>+ Ingrédient</button>
            </div>

            {/* Steps */}
            <div>
              <div style={{ fontSize:11, color:t.textDim, marginBottom:6 }}>Étapes</div>
              {form.steps.map((st,i)=>(
                <div key={i} style={{ display:"flex", gap:6, marginBottom:5, alignItems:"flex-start" }}>
                  <span style={{ fontSize:11, color:col, fontWeight:700, marginTop:10, minWidth:18 }}>{i+1}.</span>
                  <textarea ref={el=>stepRefs.current[i]=el} value={st} onChange={e=>setStep(i,e.target.value)}
                    onKeyDown={e=>{ if(e.key==="Enter"&&!e.shiftKey){ e.preventDefault(); addStep(i); } }}
                    placeholder={`Étape ${i+1}… (Shift+Entrée pour saut de ligne)`} style={{ ...s.input, flex:1, fontSize:12, resize:"vertical", minHeight:44, padding:"8px 10px" }} />
                  {form.steps.length>1 && <button onClick={()=>delStep(i)} style={{ background:"none",border:"none",cursor:"pointer",color:t.delColor,fontSize:16,padding:"0 4px",marginTop:4 }}>−</button>}
                </div>
              ))}
              <button onClick={()=>addStep(form.steps.length-1)} style={{ fontSize:12, color:col, background:"none", border:`1px dashed ${col}55`, borderRadius:8, padding:"4px 12px", cursor:"pointer", marginTop:2 }}>+ Étape</button>
            </div>

            <textarea value={form.note} onChange={e=>setForm(f=>({...f,note:e.target.value}))} placeholder="Note (facultatif)…" style={{ ...s.input, minHeight:60, fontSize:12, resize:"vertical" }} />

            <div style={{ display:"flex", gap:10, justifyContent:"flex-end" }}>
              <button onClick={()=>{setShowForm(false);setEditId(null);}} style={{ padding:"9px 20px", borderRadius:10, border:`1px solid ${t.inpBdr}`, background:"transparent", color:t.textSub, fontSize:13, cursor:"pointer" }}>Annuler</button>
              <button onClick={handleSave} style={{ padding:"9px 24px", borderRadius:10, border:"1px solid rgba(249,115,22,0.4)", background:"rgba(249,115,22,0.15)", color:col, fontSize:13, fontWeight:700, cursor:"pointer" }}>
                {editId?"Enregistrer":"Créer la recette"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ── QuickAddModal ─────────────────────────────────────────────────────────────

function QuickAddModal({ tab, setTab, onClose, onAddDay, onAddWeek, onAddTodo, s, t }) {
  const [text, setText] = useState("");
  const [cat,  setCat]  = useState("perso");
  const [pri,  setPri]  = useState("mid");
  const inputRef = useRef(null);

  useEffect(() => { setTimeout(() => inputRef.current?.focus(), 50); }, []);

  const qaTabDefs = [
    { id:"day",  label:"📅 Aujourd'hui" },
    { id:"todo", label:"📌 To-Do" },
  ];

  const handleAdd = () => {
    if (!text.trim()) return;
    if (tab === "day")  onAddDay(text, cat, pri);
    if (tab === "todo") onAddTodo(text, cat, pri);
    setText("");
    onClose();
  };

  return (
    <div onClick={e=>{ if(e.target===e.currentTarget) onClose(); }}
      style={{ position:"fixed", inset:0, zIndex:998, background:"rgba(0,0,0,0.55)", backdropFilter:"blur(8px)", WebkitBackdropFilter:"blur(8px)", display:"flex", alignItems:"flex-start", justifyContent:"center", paddingTop:100, animation:"fadeIn 0.15s ease" }}>
      <div style={{ width:"100%", maxWidth:500, background:t.glass, border:`1px solid ${t.glassBdr}`, borderRadius:18, backdropFilter:"blur(24px)", WebkitBackdropFilter:"blur(24px)", overflow:"hidden", boxShadow:"0 24px 80px rgba(0,0,0,0.5)", animation:"slideUp 0.2s ease" }}>
        <div style={{ padding:"14px 18px", borderBottom:`1px solid ${t.divider}`, display:"flex", alignItems:"center", justifyContent:"space-between" }}>
          <span style={{ fontSize:15, fontWeight:700, color:t.text }}>⚡ Ajout rapide</span>
          <button onClick={onClose} style={{ background:"none", border:"none", color:t.textSub, cursor:"pointer", fontSize:16 }}>✕</button>
        </div>
        {/* Tabs */}
        <div style={{ display:"flex", gap:4, padding:"10px 14px", borderBottom:`1px solid ${t.divider}` }}>
          {qaTabDefs.map(({id,label}) => (
            <button key={id} onClick={() => setTab(id)}
              style={{ padding:"6px 14px", borderRadius:20, border:`1px solid ${tab===id?"rgba(139,92,246,0.5)":t.filterBdr}`, background:tab===id?t.filterActive:"transparent", color:tab===id?"#c4b5fd":t.textSub, fontSize:12, cursor:"pointer", fontWeight:tab===id?600:400 }}>
              {label}
            </button>
          ))}
        </div>
        {/* Input area */}
        <div style={{ padding:"16px 18px", display:"flex", flexDirection:"column", gap:10 }}>
          <input ref={inputRef}
            style={{ ...s.input, fontSize:14 }}
            value={text}
            onChange={e => setText(e.target.value)}
            onKeyDown={e => { if (e.key==="Enter") handleAdd(); if (e.key==="Escape") onClose(); }}
            placeholder={tab==="day"?"Tâche du jour…":"Idée à planifier plus tard…"} />
          <div style={{ display:"flex", gap:8 }}>
            <select style={{ ...s.sel, flex:1 }} value={cat} onChange={e=>setCat(e.target.value)}>
              {CATEGORIES.map(c=><option key={c.id} value={c.id}>{CAT_ICONS[c.id]} {c.label}</option>)}
            </select>
            <select style={{ ...s.sel, flex:1 }} value={pri} onChange={e=>setPri(e.target.value)}>
              {PRIORITIES.map(p=><option key={p.id} value={p.id}>{p.label}</option>)}
            </select>
            <button className="bg" style={s.addBtn} onClick={handleAdd}>Ajouter</button>
          </div>
        </div>
        <div style={{ padding:"8px 18px 12px", display:"flex", gap:16, color:t.textTiny, fontSize:10 }}>
          <span>↵ Ajouter</span><span>Échap Fermer</span><span style={{ marginLeft:"auto" }}>Raccourci: N</span>
        </div>
      </div>
    </div>
  );
}

// ── SearchOverlay ─────────────────────────────────────────────────────────────

function SearchOverlay({ data, t, s, searchQ, setSearchQ, searchInputRef, onClose, onGoToDay, onGoToWeek }) {
  const results = [];
  if (searchQ.trim().length > 1) {
    Object.entries(data.weeks||{}).forEach(([wk,wv]) => {
      (wv.goals||[]).forEach(g => {
        if (g.text.toLowerCase().includes(searchQ.toLowerCase()))
          results.push({ type:"week", wk, goal:g });
      });
    });
    Object.entries(data.days||{}).forEach(([dk,dv]) => {
      (dv.goals||[]).forEach(g => {
        if (g.text.toLowerCase().includes(searchQ.toLowerCase()))
          results.push({ type:"day", dk, goal:g });
      });
    });
    results.sort((a,b) => {
      const ka = a.type==="week" ? a.wk : a.dk;
      const kb = b.type==="week" ? b.wk : b.dk;
      return kb.localeCompare(ka);
    });
  }

  return (
    <div onClick={e=>{ if(e.target===e.currentTarget) onClose(); }}
      style={{ position:"fixed", inset:0, zIndex:999, background:"rgba(0,0,0,0.55)", backdropFilter:"blur(8px)", WebkitBackdropFilter:"blur(8px)", display:"flex", alignItems:"flex-start", justifyContent:"center", paddingTop:70, animation:"fadeIn 0.15s ease" }}>
      <div style={{ width:"100%", maxWidth:560, background:t.glass, border:`1px solid ${t.glassBdr}`, borderRadius:18, backdropFilter:"blur(24px)", WebkitBackdropFilter:"blur(24px)", overflow:"hidden", boxShadow:"0 24px 80px rgba(0,0,0,0.5)", animation:"slideUp 0.2s ease" }}>
        <div style={{ padding:"14px 18px", borderBottom:`1px solid ${t.divider}`, display:"flex", alignItems:"center", gap:10 }}>
          <span style={{ fontSize:16, flexShrink:0 }}>🔍</span>
          <input ref={searchInputRef}
            style={{ ...s.input, border:"none", background:"transparent", fontSize:15, padding:"4px 0", flex:1 }}
            value={searchQ} onChange={e=>setSearchQ(e.target.value)}
            placeholder="Rechercher une tâche…" />
          <button onClick={onClose} style={{ background:"none", border:"none", color:t.textSub, cursor:"pointer", fontSize:16 }}>✕</button>
        </div>
        <div style={{ maxHeight:400, overflowY:"auto" }}>
          {searchQ.length <= 1 && (
            <div style={{ textAlign:"center", padding:"40px", color:t.textDim, fontSize:13 }}>Tapez au moins 2 caractères…</div>
          )}
          {searchQ.length > 1 && results.length === 0 && (
            <div style={{ textAlign:"center", padding:"40px", color:t.textDim, fontSize:13 }}>Aucun résultat pour « {searchQ} »</div>
          )}
          {results.slice(0,30).map((r,i) => {
            const c = CATEGORIES.find(x=>x.id===r.goal.cat);
            return (
              <div key={i} className="ir"
                style={{ padding:"11px 18px", borderBottom:`1px solid ${t.divider}`, cursor:"pointer", display:"flex", gap:10, alignItems:"center" }}
                onClick={()=>{ r.type==="day" ? onGoToDay(r.dk) : onGoToWeek(r.wk); onClose(); }}>
                <span style={{ fontSize:13, color:r.goal.done?"#34d399":t.text, flex:1, textDecoration:r.goal.done?"line-through":"none" }}>{r.goal.text}</span>
                <span style={{ fontSize:10, color:t.textDim, flexShrink:0 }}>{r.type==="day"?r.dk:getWeekLabel(r.wk)}</span>
                {c && <span style={{ ...s.badge(catCol(c.id,t)), flexShrink:0 }}>{CAT_ICONS[r.goal.cat]}</span>}
                <span style={{ fontSize:10, color:t.textTiny, flexShrink:0 }}>{r.type==="day"?"Jour":"Semaine"}</span>
              </div>
            );
          })}
        </div>
        <div style={{ padding:"9px 18px", borderTop:`1px solid ${t.divider}`, display:"flex", gap:16, color:t.textTiny, fontSize:10 }}>
          <span>↵ Aller à</span><span>Échap Fermer</span><span>Ctrl+Z Annuler suppression</span>
        </div>
      </div>
    </div>
  );
}
