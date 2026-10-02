import { useCallback, useEffect, useRef, useState } from 'react';
import { db } from '../firebase';
import { doc, onSnapshot, setDoc, updateDoc } from 'firebase/firestore';

/* ── songs audio ── */
import songApocalypse  from '../assets/Apocalypse - Cigarettes After Sex.mp3';
import songThoseEyes   from '../assets/Those_Eyes_-_New_West_(mp3.pm).mp3';
import songUntilFound  from '../assets/Until_I_Found_You.mp3';
import songILikeMeBetter from '../assets/i like m better.mp3';
import songSweetCreature from '../assets/Harry_Styles_-_Sweet_Creature_NR_(mp3.pm).mp3';

/* ── ash ── */
import ash1 from '../assets/pics/ash/nail.jpeg';
import ash2 from '../assets/pics/ash/IMG_2426.jpg';
import ash3 from '../assets/pics/ash/IMG_4099.jpg';
import ash4 from '../assets/pics/ash/nail2.jpeg';
import ash5 from '../assets/pics/ash/ashley.jpg';
import ash6 from '../assets/pics/ash/WhatsApp Image 2026-09-28 at 16.10.19.jpeg';
import ash7 from '../assets/pics/ash/nail3.jpeg'
import ash8 from '../assets/pics/ash/hands.jpeg'
import ash9 from '../assets/pics/ash/new33.jpeg'


// 32614

/* ── olive ── */
import olive1 from '../assets/pics/olive/WhatsApp Image 2026-09-22 at 02.34.21 (1).jpeg';
import olive2 from '../assets/pics/olive/WhatsApp Image 2026-09-22 at 02.34.21.jpeg';
import olive3 from '../assets/pics/olive/2.jpeg';
import olive4 from '../assets/pics/olive/1.jpeg';
import olive5 from '../assets/pics/olive/oliveee.jpeg';
import olive6 from '../assets/pics/olive/3.jpeg';
import olive7 from '../assets/pics/olive/4.jpeg';



/* ─────────────────────────────────────────────────
   Chapter 6 — HOME
   Full-bleed cream/crimson aesthetic page.
   Completely escapes the dark starfield background.
   Does NOT use .ch-inner so it can fill 100% width.
───────────────────────────────────────────────── */
const STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400;1,700&family=EB+Garamond:ital,wght@0,400;0,500;1,400;1,500&display=swap');

  /* ── full-bleed page — Ashley theme (cream/crimson) ── */
  .h6 {
    --cr:  #8b1a1a;
    --cr2: #6b1313;
    --cream: #f6f0e8;
    --cream2: #ede5d8;
    --ink:  #1a1210;
    --ink2: #3d2d28;
    --ink3: #7a6560;
    --serif: 'EB Garamond', Georgia, serif;
    --script: 'Playfair Display', Georgia, serif;
    position: absolute; inset: 0;
    background: var(--cream);
    overflow-y: auto; overflow-x: hidden;
    font-family: var(--serif);
    color: var(--ink);
    scrollbar-width: thin; scrollbar-color: rgba(139,26,26,.2) transparent;
    transition: background 0.5s, color 0.5s;
  }
  .h6::-webkit-scrollbar { width: 4px; }
  .h6::-webkit-scrollbar-thumb { background: rgba(139,26,26,.25); }

  /* ── Oliver theme (deep navy / ice-blue) ── */
  .h6.oliver {
    --cr:   #3a9fd5;
    --cr2:  #2a7aaa;
    --cream: #0a1628;
    --cream2: #0f1e38;
    --ink:  #e8f4ff;
    --ink2: #b0d4f0;
    --ink3: #6a9dbf;
  }
  .h6.oliver { scrollbar-color: rgba(58,159,213,.25) transparent; }
  .h6.oliver::-webkit-scrollbar-thumb { background: rgba(58,159,213,.3); }

  /* ── Oliver overrides: strip borders ── */
  .h6.oliver .h6-rule { border-top-color: rgba(58,159,213,.18); }
  .h6.oliver .h6-strip { border-top-color: rgba(58,159,213,.15); border-bottom-color: rgba(58,159,213,.15); }

  /* quote section */
  .h6.oliver .h6-s2 { background: var(--cream); }
  .h6.oliver .h6-s2-bar { border-bottom-color: rgba(58,159,213,.14); }
  .h6.oliver .h6-s2-foot { border-top-color: rgba(58,159,213,.14); }

  /* star section */
  .h6.oliver .h6-s3 {
    background: linear-gradient(135deg, #0c1d38 0%, #0f2040 60%, #0d1a30 100%);
  }
  .h6.oliver .h6-s3-star { color: #3a9fd5; }

  /* mosaic section */
  .h6.oliver .h6-s4 { background: var(--cream); }
  .h6.oliver .h6-s4-label { border-bottom-color: rgba(58,159,213,.13); }
  .h6.oliver .h6-mitem { border-color: rgba(58,159,213,.1); }

  /* signoff */
  .h6.oliver .h6-s5 { background: #1a4a70; }

  /* watchlist */
  .h6.oliver .h6-watch { background: var(--cream); }
  .h6.oliver .h6-watch-head { border-bottom-color: rgba(58,159,213,.13); }
  .h6.oliver .h6-add-row { border-bottom-color: rgba(58,159,213,.1); }
  .h6.oliver .h6-add-in {
    background: var(--cream2);
    border-color: rgba(58,159,213,.25);
    color: var(--ink);
  }
  .h6.oliver .h6-add-in::placeholder { color: var(--ink3); }
  .h6.oliver .h6-add-in:focus { border-color: var(--cr); }
  .h6.oliver .h6-add-btn { background: var(--cr); border-color: var(--cr); }
  .h6.oliver .h6-movie-row { border-bottom-color: rgba(58,159,213,.08); }
  .h6.oliver .h6-movie-row:hover { background: rgba(58,159,213,.05); }
  .h6.oliver .h6-movie-row.is-match { background: rgba(58,159,213,.1); }
  .h6.oliver .h6-movie-title { color: var(--ink); }
  .h6.oliver .h6-match-badge { color: var(--cr); border-color: var(--cr); }
  .h6.oliver .h6-pick-btn { border-color: rgba(58,159,213,.25); color: var(--ink3); }
  .h6.oliver .h6-pick-btn.mine:hover { border-color: var(--cr); color: var(--cr); }
  .h6.oliver .h6-pick-btn.active { background: var(--cr); border-color: var(--cr); }
  .h6.oliver .h6-del-btn { color: var(--ink3); }
  .h6.oliver .h6-del-btn:hover { color: var(--cr); }
  .h6.oliver .h6-wl-empty { color: var(--ink3); }
  .h6.oliver .h6-wl-divider { color: var(--ink3); border-top-color: rgba(58,159,213,.13); border-bottom-color: rgba(58,159,213,.1); }
  .h6.oliver .h6-wl-summary { border-top-color: rgba(58,159,213,.1); color: var(--ink3); }
  .h6.oliver .h6-matches { border-top-color: rgba(58,159,213,.15); background: rgba(58,159,213,.04); }
  .h6.oliver .h6-matches-ttl { color: var(--cr); }
  .h6.oliver .h6-match-chip { background: var(--cr); }
  .h6.oliver .h6-no-match { color: var(--ink3); }

  /* TMDB browser */
  .h6.oliver .h6-tmdb-browser { border-bottom-color: rgba(58,159,213,.13); }
  .h6.oliver .h6-search-row { border-bottom-color: rgba(58,159,213,.08); }
  .h6.oliver .h6-search-in { background: var(--cream2); border-color: rgba(58,159,213,.22); color: var(--ink); }
  .h6.oliver .h6-search-in::placeholder { color: var(--ink3); }
  .h6.oliver .h6-search-in:focus { border-color: var(--cr); }
  .h6.oliver .h6-search-clear { background: rgba(58,159,213,.08); border-color: rgba(58,159,213,.22); color: var(--ink3); }
  .h6.oliver .h6-search-clear:hover { background: rgba(58,159,213,.18); color: var(--ink); }
  .h6.oliver .h6-tabs { border-bottom-color: rgba(58,159,213,.1); }
  .h6.oliver .h6-tab { color: var(--ink3); }
  .h6.oliver .h6-tab:hover { color: var(--ink2); }
  .h6.oliver .h6-tab.on { color: var(--cr); border-bottom-color: var(--cr); }
  .h6.oliver .h6-tmdb-grid { scrollbar-color: rgba(58,159,213,.2) transparent; }
  .h6.oliver .h6-tmdb-card:hover { border-color: var(--cr); }
  .h6.oliver .h6-tmdb-poster { background: var(--cream2); }
  .h6.oliver .h6-tmdb-info { background: var(--cream); }
  .h6.oliver .h6-tmdb-title { color: var(--ink); }
  .h6.oliver .h6-tmdb-rating { color: var(--cr); }
  .h6.oliver .h6-tmdb-yr { color: var(--ink3); }
  .h6.oliver .h6-tmdb-add { background: rgba(26,74,112,.9); }
  .h6.oliver .h6-tmdb-added { background: var(--cr); }
  .h6.oliver .h6-tmdb-loading,
  .h6.oliver .h6-tmdb-empty { color: var(--ink3); }

  /* lightbox oliver tint */
  .h6.oliver .h6-lb img { border-color: rgba(58,159,213,.4); box-shadow: 0 0 60px rgba(58,159,213,.25); }

  /* s2 bar text */
  .h6.oliver .h6-s2-bar .mid b { color: var(--ink); }
  .h6.oliver .h6-s2-bar .mid em { color: var(--cr); }
  .h6.oliver .h6-s2-bar .mid u { text-decoration-color: var(--cr); }
  .h6.oliver .h6-s2-foot button:hover { color: var(--cr); }

  /* ── divider line ── */
  .h6-rule { border: none; border-top: 1px solid rgba(139,26,26,.15); margin: 0; }

  /* ══════════════════════════════════════
     SECTION 1 — Full-bleed hero strip
  ══════════════════════════════════════ */
  .h6-s1 { position: relative; }

  .h6-s1-top {
    display: flex; align-items: center; justify-content: space-between;
    padding: clamp(16px,3vw,30px) clamp(20px,5vw,60px);
  }
  .h6-s1-num {
    font-family: var(--serif); font-size: clamp(11px,2vw,14px);
    letter-spacing: 3px; color: var(--ink3);
  }
  .h6-s1-title {
    text-align: center; flex: 1; padding: 0 clamp(12px,2vw,30px);
  }
  .h6-s1-title .script {
    display: block;
    font-family: var(--script); font-style: italic; font-weight: 400;
    font-size: clamp(26px, 5vw, 52px);
    color: var(--cr); line-height: 1.1;
  }
  .h6-s1-title .script em {
    text-decoration: underline;
    text-decoration-color: rgba(139,26,26,.3);
    font-style: italic;
  }
  .h6-s1-title .bracket {
    display: block;
    font-family: var(--serif); font-size: clamp(11px,1.8vw,15px);
    letter-spacing: 6px; color: var(--ink2); margin-top: 4px;
  }

  /* full-width infinite marquee strip */
  .h6-strip {
    width: 100%; border-top: 1px solid rgba(139,26,26,.12);
    border-bottom: 1px solid rgba(139,26,26,.12);
    overflow: hidden; position: relative;
  }
  .h6.oliver .h6-strip { border-top-color: rgba(58,159,213,.15); border-bottom-color: rgba(58,159,213,.15); }

  .h6-marquee {
    display: flex;
    animation: h6-marquee-scroll 14s linear infinite;
    width: max-content;
  }
  .h6-marquee:hover { animation-play-state: paused; }

  @keyframes h6-marquee-scroll {
    0%   { transform: translateX(0); }
    100% { transform: translateX(-50%); }
  }

  .h6-strip-col {
    flex: 0 0 33.333vw; width: 33.333vw;
    position: relative; overflow: hidden; cursor: zoom-in;
    border-right: 1px solid rgba(139,26,26,.12);
  }
  .h6.oliver .h6-strip-col { border-right-color: rgba(58,159,213,.15); }

  .h6-strip-col img {
    display: block; width: 100%;
    height: clamp(200px, 35vw, 420px);
    object-fit: cover;
    filter: grayscale(1) contrast(1.06);
    transition: filter .45s, transform .45s;
  }
  .h6-strip-col:hover img {
    filter: grayscale(.15) contrast(1); transform: scale(1.04);
  }
  .h6-strip-tag {
    position: absolute; font-family: var(--serif);
    font-size: clamp(8px,1.2vw,11px); letter-spacing: 1px;
    background: var(--cr); color: #fff;
    padding: 3px 8px; pointer-events: none;
    z-index: 2;
  }
  .h6-strip-tag.bl { bottom: 10px; left: 10px; }
  .h6-strip-tag.br { bottom: 10px; right: 10px; }

  .h6-s1-credit {
    text-align: center;
    padding: clamp(10px,2vw,16px);
    font-size: clamp(11px,1.5vw,13px); color: var(--ink3); letter-spacing: 1px;
  }
  .h6-s1-credit b { color: var(--ink2); font-weight: 600; }

  /* ══════════════════════════════════════
     SECTION 2 — Quote carousel
  ══════════════════════════════════════ */
  .h6-s2 { background: var(--cream); }

  .h6-s2-bar {
    display: flex; align-items: center; justify-content: space-between;
    padding: clamp(10px,2vw,14px) clamp(20px,5vw,60px);
    border-bottom: 1px solid rgba(139,26,26,.1);
    font-size: clamp(11px,1.8vw,13px); color: var(--ink3);
  }
  .h6-s2-bar .mid { text-align: center; flex: 1; font-style: italic; color: var(--ink2); }
  .h6-s2-bar .mid b { font-weight: 700; font-style: normal; color: var(--ink); }
  .h6-s2-bar .mid em { color: var(--cr); font-style: italic; }
  .h6-s2-bar .mid u { text-decoration-color: var(--cr); }

  .h6-s2-stage {
    min-height: clamp(200px, 30vw, 320px);
    display: flex; align-items: center; justify-content: center;
    padding: clamp(30px,5vw,60px) clamp(20px,8vw,120px);
  }
  .h6-s2-quote {
    text-align: center;
    font-family: var(--script); font-style: italic; font-weight: 400;
    font-size: clamp(24px, 4.5vw, 52px);
    color: var(--cr2); line-height: 1.25;
    animation: h6-qfade .5s ease both;
  }
  .h6-s2-quote em { font-style: italic; font-weight: 700; }
  @keyframes h6-qfade {
    from { opacity: 0; transform: translateY(10px); }
    to   { opacity: 1; transform: none; }
  }

  .h6-s2-foot {
    display: flex; align-items: center; justify-content: space-between;
    padding: clamp(10px,2vw,14px) clamp(20px,5vw,60px);
    border-top: 1px solid rgba(139,26,26,.1);
    font-size: clamp(11px,1.8vw,13px); color: var(--ink3);
  }
  .h6-s2-foot button {
    all: unset; cursor: pointer; font-family: var(--serif);
    font-size: clamp(11px,1.8vw,13px); color: var(--ink3); letter-spacing: .5px;
    transition: color .2s;
  }
  .h6-s2-foot button:hover { color: var(--cr); }

  /* ════ Songs section ════ */
  .h6-songs {
    background: var(--cream2);
    border-top: 1px solid rgba(139,26,26,.08);
    border-bottom: 1px solid rgba(139,26,26,.08);
    padding: clamp(20px,4vw,36px) clamp(20px,5vw,60px);
  }
  .h6-songs-title {
    font-family: var(--script); font-style: italic;
    font-size: clamp(20px,4vw,36px); color: var(--cr);
    text-align: center; margin-bottom: clamp(14px,2.5vw,22px);
  }
  .h6-song-row {
    display: flex; align-items: center; gap: 14px;
    padding: 11px 0; border-bottom: 1px solid rgba(139,26,26,.07);
    text-decoration: none; color: inherit;
    transition: background .15s;
  }
  .h6-song-row:last-child { border-bottom: none; }
  .h6-song-row:hover { background: rgba(139,26,26,.04); margin: 0 -16px; padding-left: 16px; padding-right: 16px; }
  .h6-song-num {
    font-family: var(--serif); font-size: 12px; color: var(--ink3);
    min-width: 22px; text-align: right;
  }
  .h6-song-dot {
    width: 36px; height: 36px; border-radius: 50%; flex-shrink: 0;
    background: var(--cr); display: flex; align-items: center; justify-content: center;
    font-size: 16px; transition: transform .2s;
  }
  .h6-song-row:hover .h6-song-dot { transform: scale(1.1); }
  .h6-song-info { flex: 1; }
  .h6-song-name { font-family: var(--serif); font-size: clamp(15px,2.5vw,18px); color: var(--ink); font-weight: 600; }
  .h6-song-artist { font-family: var(--serif); font-size: 13px; color: var(--ink3); font-style: italic; margin-top: 2px; }
  .h6-song-open { font-family: var(--serif); font-size: 11px; color: var(--cr); letter-spacing: 1px; opacity: 0; transition: opacity .2s; }
  .h6-song-row:hover .h6-song-open { opacity: 1; }
  .h6.oliver .h6-songs { background: var(--cream2); border-color: rgba(58,159,213,.1); }
  .h6.oliver .h6-song-row { border-color: rgba(58,159,213,.08); }
  .h6.oliver .h6-song-row:hover { background: rgba(58,159,213,.05); }
  .h6.oliver .h6-song-dot { background: var(--cr); }
  .h6.oliver .h6-song-open { color: var(--cr); }
  .h6-song-row.playing .h6-song-name { color: var(--cr); }
  .h6-song-row.playing .h6-song-dot { animation: h6-pulse-play 1s ease-in-out infinite; }
  @keyframes h6-pulse-play { 0%,100% { transform: scale(1); } 50% { transform: scale(1.15); } }

  /* ══════════════════════════════════════
     SECTION 3 — Star / "colour Blue"
  ══════════════════════════════════════ */
  .h6-s3 {
    background: linear-gradient(135deg, #f3e8de 0%, #ecddd0 60%, #f0e6dc 100%);
    position: relative; overflow: hidden;
  }
  .h6-s3-star {
    position: absolute; font-size: clamp(60px,15vw,160px);
    opacity: .12; pointer-events: none; color: var(--cr); line-height: 1;
  }
  .h6-s3-star.tl { top: -20px; left: -20px; transform: rotate(-15deg); }
  .h6-s3-star.tr { top: -20px; right: -20px; transform: rotate(15deg); }
  .h6-s3-star.bl { bottom: -20px; left: 10px; transform: rotate(10deg); font-size: clamp(30px,8vw,80px); }
  .h6-s3-star.br { bottom: -20px; right: 10px; transform: rotate(-10deg); font-size: clamp(30px,8vw,80px); }

  .h6-s3-inner {
    position: relative; z-index: 1;
    padding: clamp(30px,5vw,60px) clamp(20px,5vw,60px);
    display: flex; flex-direction: column; align-items: center; gap: clamp(20px,3vw,36px);
  }
  .h6-s3-title { text-align: center; }
  .h6-s3-title .small {
    display: block; font-family: var(--serif);
    font-size: clamp(12px,2vw,15px); color: var(--ink2); letter-spacing: 1px;
  }
  .h6-s3-title .big {
    display: block; font-family: var(--script); font-style: italic;
    font-size: clamp(26px,5vw,52px); color: var(--cr2); line-height: 1.15;
  }
  .h6-s3-title .big b { font-style: normal; font-weight: 700; }
  .h6-s3-title .big em { font-style: italic; }

  /* 3-up vinyl photo row */
  .h6-vinyls {
    display: flex; gap: clamp(16px,3vw,40px); align-items: center; justify-content: center;
    flex-wrap: wrap;
  }
  .h6-vinyl {
    cursor: zoom-in; flex-shrink: 0;
    width: clamp(100px, 22vw, 180px); height: clamp(100px, 22vw, 180px);
    border-radius: 50%; overflow: hidden; position: relative;
    box-shadow: 0 8px 28px rgba(0,0,0,.22);
    transition: transform .4s, box-shadow .4s;
  }
  .h6-vinyl:hover { transform: rotate(12deg) scale(1.08); box-shadow: 0 14px 40px rgba(0,0,0,.3); }
  .h6-vinyl img {
    width: 100%; height: 100%; object-fit: cover; display: block;
    filter: grayscale(.3);
  }
  .h6-vinyl::after {
    content: ''; position: absolute; inset: 30%; border-radius: 50%;
    background: radial-gradient(circle, rgba(0,0,0,.85) 30%, transparent 72%);
    pointer-events: none;
  }

  /* ══════════════════════════════════════
     SECTION 4 — Full-bleed mosaic
  ══════════════════════════════════════ */
  .h6-s4 { background: var(--cream); }
  .h6-s4-label {
    text-align: center; padding: clamp(14px,2.5vw,22px);
    font-family: var(--serif); font-size: clamp(10px,1.5vw,12px);
    letter-spacing: 4px; color: var(--ink3); text-transform: uppercase;
    border-bottom: 1px solid rgba(139,26,26,.1);
  }
  .h6-mosaic {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    grid-auto-rows: clamp(120px, 20vw, 220px);
  }
  .h6-mosaic .span2c { grid-column: span 2; }
  .h6-mosaic .span2r { grid-row: span 2; }
  .h6-mosaic .span2c.span2r { grid-column: span 2; grid-row: span 2; }
  .h6-mitem {
    overflow: hidden; position: relative; cursor: zoom-in;
    border: 1px solid rgba(139,26,26,.07);
  }
  .h6-mitem img {
    width: 100%; height: 100%; object-fit: cover; display: block;
    filter: grayscale(.45) contrast(1.04);
    transition: filter .4s, transform .4s;
  }
  .h6-mitem:hover img { filter: grayscale(0); transform: scale(1.05); }

  /* ══════════════════════════════════════
     SECTION 5 — Signoff
  ══════════════════════════════════════ */
  .h6-s5 {
    background: var(--cr); color: #fff;
    display: flex; flex-direction: column; align-items: center;
    gap: clamp(12px,2.5vw,20px);
    padding: clamp(40px,7vw,80px) clamp(20px,5vw,60px);
    text-align: center;
  }
  .h6-s5 .headline {
    font-family: var(--script); font-style: italic;
    font-size: clamp(24px,5vw,52px); color: #fff; line-height: 1.1;
    font-weight: 400;
  }
  .h6-s5 .names {
    font-family: var(--serif); font-size: clamp(11px,2vw,15px);
    letter-spacing: 4px; color: rgba(255,255,255,.7);
  }
  .h6-s5 .flags { font-size: clamp(22px,5vw,38px); letter-spacing: 8px; }
  .h6-s5 .tag {
    font-size: clamp(10px,1.5vw,12px); letter-spacing: 3px;
    color: rgba(255,255,255,.5);
  }
  .h6-s5-btn {
    all: unset; cursor: pointer; margin-top: 10px;
    border: 1px solid rgba(255,255,255,.6); color: rgba(255,255,255,.9);
    font-family: var(--serif); font-size: clamp(12px,1.8vw,14px);
    letter-spacing: 2px; padding: clamp(10px,2vw,14px) clamp(24px,4vw,40px);
    transition: background .25s, color .25s, border-color .25s;
  }
  .h6-s5-btn:hover { background: rgba(255,255,255,.12); border-color: #fff; color: #fff; }

  /* ══════════════════════════════════════
     LIGHTBOX
  ══════════════════════════════════════ */
  .h6-lb {
    position: fixed; inset: 0; z-index: 9999;
    background: rgba(5,3,2,.93); backdrop-filter: blur(8px);
    display: flex; align-items: center; justify-content: center;
    animation: h6-lbFade .2s ease;
  }
  @keyframes h6-lbFade { from { opacity: 0; } to { opacity: 1; } }
  .h6-lb img {
    max-width: min(90vw, 640px); max-height: 82vh; object-fit: contain;
    border: 2px solid rgba(139,26,26,.4); box-shadow: 0 0 60px rgba(139,26,26,.25);
    animation: h6-lbZ .3s ease;
  }
  @keyframes h6-lbZ { from { transform: scale(.9); opacity: 0; } to { transform: none; opacity: 1; } }
  .h6-lb-x, .h6-lb-arr {
    all: unset; cursor: pointer; position: absolute;
    color: rgba(255,255,255,.8); display: flex; align-items: center; justify-content: center;
    border: 1px solid rgba(255,255,255,.15); transition: color .2s, border-color .2s, background .2s;
  }
  .h6-lb-x:hover, .h6-lb-arr:hover { color: #fff; border-color: rgba(139,26,26,.7); background: rgba(139,26,26,.15); }
  .h6-lb-x { top: 16px; right: 16px; width: 40px; height: 40px; font-size: 18px; }
  .h6-lb-arr { top: 50%; transform: translateY(-50%); width: 44px; height: 60px; font-size: 24px; }
  .h6-lb-arr.l { left: 12px; }
  .h6-lb-arr.r { right: 12px; }
  .h6-lb-cnt {
    position: absolute; bottom: 20px; font-family: var(--serif);
    font-size: 12px; letter-spacing: 2px; color: rgba(255,255,255,.4);
  }
  /* ════ Watch Together ════ */
  .h6-watch { background: var(--cream); }
  .h6-watch-head {
    padding: clamp(20px,4vw,36px) clamp(20px,5vw,60px) clamp(14px,3vw,24px);
    text-align: center; border-bottom: 1px solid rgba(139,26,26,.1);
  }
  .h6-watch-title {
    font-family: var(--script); font-style: italic;
    font-size: clamp(24px,5vw,46px); color: var(--cr); line-height: 1.1;
  }
  .h6-watch-who {
    font-family: var(--serif); font-size: clamp(11px,1.8vw,13px);
    color: var(--ink3); letter-spacing: 1px; margin-top: 6px;
  }
  .h6-watch-who b { color: var(--ink2); }

  .h6-add-row {
    display: flex; gap: 0;
    padding: clamp(12px,2vw,18px) clamp(20px,5vw,60px);
    border-bottom: 1px solid rgba(139,26,26,.08);
  }
  .h6-add-in {
    flex: 1; all: unset; box-sizing: border-box;
    padding: 11px 16px; font-family: var(--serif); font-size: 15px;
    color: var(--ink); background: var(--cream2);
    border: 1px solid rgba(139,26,26,.2); border-right: none;
    transition: border-color .2s;
  }
  .h6-add-in::placeholder { color: var(--ink3); }
  .h6-add-in:focus { outline: none; border-color: var(--cr); }
  .h6-add-btn {
    all: unset; cursor: pointer;
    background: var(--cr); color: #fff;
    padding: 11px 20px; font-family: var(--serif); font-size: 14px; letter-spacing: 1px;
    border: 1px solid var(--cr); white-space: nowrap;
    transition: opacity .2s;
  }
  .h6-add-btn:hover { opacity: .82; }

  .h6-movie-list {
    max-height: 340px; overflow-y: auto;
    scrollbar-width: thin; scrollbar-color: rgba(139,26,26,.2) transparent;
  }
  .h6-movie-row {
    display: flex; align-items: center; gap: 10px;
    padding: 10px clamp(20px,5vw,60px);
    border-bottom: 1px solid rgba(139,26,26,.06);
    transition: background .15s;
  }
  .h6-movie-row:hover { background: rgba(139,26,26,.03); }
  .h6-movie-row.is-match { background: rgba(139,26,26,.06); }
  .h6-movie-title { flex: 1; font-family: var(--serif); font-size: 15px; color: var(--ink); }
  .h6-match-badge {
    font-family: var(--serif); font-size: 10px; color: var(--cr);
    border: 1px solid var(--cr); padding: 2px 7px; letter-spacing: 1px; white-space: nowrap;
    animation: h6-mp .3s ease;
  }
  @keyframes h6-mp { from { transform: scale(.8); opacity: 0; } to { transform: none; opacity: 1; } }
  .h6-pick-btns { display: flex; gap: 6px; }
  .h6-pick-btn {
    all: unset; cursor: pointer; padding: 5px 10px; display: flex; align-items: center; gap: 4px;
    font-family: var(--serif); font-size: 12px; letter-spacing: .5px;
    border: 1px solid rgba(139,26,26,.2); color: var(--ink3);
    transition: all .2s; white-space: nowrap; border-radius: 2px;
  }
  .h6-pick-btn.mine     { cursor: pointer; }
  .h6-pick-btn.mine:hover { border-color: var(--cr); color: var(--cr); }
  .h6-pick-btn.active   { background: var(--cr); color: #fff; border-color: var(--cr); }
  .h6-pick-btn.readonly { cursor: default; opacity: .55; pointer-events: none; }
  .h6-pick-btn.capped   { opacity: .35; cursor: not-allowed; }
  .h6-del-btn {
    all: unset; cursor: pointer; color: var(--ink3); font-size: 14px;
    width: 22px; text-align: center; opacity: .35; transition: opacity .2s, color .2s;
  }
  .h6-del-btn:hover { opacity: 1; color: var(--cr); }
  .h6-wl-empty {
    padding: clamp(20px,4vw,36px); text-align: center;
    font-family: var(--serif); font-style: italic; font-size: 15px; color: var(--ink3);
  }

  .h6-wl-summary {
    display: flex; gap: 24px; flex-wrap: wrap; justify-content: center;
    padding: clamp(10px,2vw,16px) clamp(20px,5vw,60px);
    border-top: 1px solid rgba(139,26,26,.08);
    font-family: var(--serif); font-size: 13px; color: var(--ink3);
  }
  .h6-wl-summary b { color: var(--ink2); }

  .h6-matches {
    padding: clamp(14px,3vw,28px) clamp(20px,5vw,60px);
    border-top: 1px solid rgba(139,26,26,.12);
    background: rgba(139,26,26,.03); text-align: center;
  }
  .h6-matches-ttl {
    font-family: var(--script); font-style: italic;
    font-size: clamp(20px,4vw,34px); color: var(--cr); margin-bottom: 14px;
  }
  .h6-matches-chips { display: flex; gap: 10px; flex-wrap: wrap; justify-content: center; }
  .h6-match-chip {
    background: var(--cr); color: #fff; font-family: var(--serif);
    font-size: 14px; padding: 8px 18px; animation: h6-mp .4s ease;
  }
  .h6-no-match {
    font-family: var(--serif); font-style: italic; font-size: 14px; color: var(--ink3);
  }

  /* ════ TMDB browser ════ */
  .h6-tmdb-browser { border-bottom: 1px solid rgba(139,26,26,.1); }

  .h6-search-row {
    display: flex; gap: 0;
    padding: clamp(10px,2vw,14px) clamp(20px,5vw,60px);
    border-bottom: 1px solid rgba(139,26,26,.06);
  }
  .h6-search-in {
    flex: 1; all: unset; box-sizing: border-box;
    padding: 10px 14px; font-family: var(--serif); font-size: 14px;
    color: var(--ink); background: var(--cream2);
    border: 1px solid rgba(139,26,26,.18); border-right: none;
    transition: border-color .2s;
  }
  .h6-search-in::placeholder { color: var(--ink3); }
  .h6-search-in:focus { outline: none; border-color: var(--cr); }
  .h6-search-clear {
    all: unset; cursor: pointer;
    background: rgba(139,26,26,.06); border: 1px solid rgba(139,26,26,.18);
    border-left: none; color: var(--ink3); padding: 10px 14px;
    font-family: var(--serif); font-size: 13px; white-space: nowrap;
    transition: background .2s;
  }
  .h6-search-clear:hover { background: rgba(139,26,26,.14); color: var(--ink); }

  .h6-tabs {
    display: flex; overflow-x: auto;
    padding: 0 clamp(20px,5vw,60px);
    border-bottom: 1px solid rgba(139,26,26,.08);
    scrollbar-width: none;
  }
  .h6-tabs::-webkit-scrollbar { display: none; }
  .h6-tab {
    all: unset; cursor: pointer; white-space: nowrap;
    padding: 11px 14px; font-family: var(--serif); font-size: 13px;
    color: var(--ink3); border-bottom: 2px solid transparent;
    transition: color .2s, border-color .2s;
  }
  .h6-tab:hover { color: var(--ink2); }
  .h6-tab.on { color: var(--cr); border-bottom-color: var(--cr); font-weight: 600; }

  .h6-tmdb-grid {
    display: grid; grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
    gap: 10px; padding: clamp(14px,3vw,20px) clamp(20px,5vw,60px);
    max-height: 390px; overflow-y: auto;
    scrollbar-width: thin; scrollbar-color: rgba(139,26,26,.2) transparent;
  }
  .h6-tmdb-card {
    cursor: pointer; position: relative;
    border: 2px solid transparent;
    transition: border-color .2s, transform .25s;
  }
  .h6-tmdb-card:hover { border-color: var(--cr); transform: translateY(-3px); }
  .h6-tmdb-card:hover .h6-tmdb-add { opacity: 1; }
  .h6-tmdb-poster {
    display: block; width: 100%; aspect-ratio: 2/3; object-fit: cover;
    background: var(--cream2);
  }
  .h6-tmdb-info { padding: 5px 5px 4px; background: var(--cream); }
  .h6-tmdb-title {
    margin: 0; font-family: var(--serif); font-size: 11px; color: var(--ink);
    line-height: 1.3; display: -webkit-box;
    -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;
  }
  .h6-tmdb-meta { display: flex; align-items: center; justify-content: space-between; margin-top: 3px; }
  .h6-tmdb-rating { font-size: 10px; color: var(--cr); font-family: var(--serif); }
  .h6-tmdb-yr    { font-size: 10px; color: var(--ink3); font-family: var(--serif); }
  .h6-tmdb-add {
    position: absolute; inset: 0; background: rgba(139,26,26,.88);
    display: flex; flex-direction: column; align-items: center; justify-content: center;
    gap: 5px; opacity: 0; transition: opacity .2s;
    color: #fff; font-family: var(--serif); font-size: 11px; letter-spacing: 1px;
  }
  .h6-tmdb-add svg { width: 22px; height: 22px; stroke: #fff; stroke-width: 2.5; fill: none; }
  .h6-tmdb-added {
    position: absolute; top: 5px; right: 5px; background: var(--cr);
    color: #fff; font-family: var(--serif); font-size: 9px; padding: 2px 6px;
  }
  .h6-tmdb-loading, .h6-tmdb-empty {
    grid-column: 1 / -1; text-align: center; padding: clamp(28px,5vw,48px);
    font-family: var(--serif); font-style: italic; font-size: 14px; color: var(--ink3);
  }

  /* ── pagination ── */
  .h6-tmdb-pager {
    display: flex; align-items: center; justify-content: center; gap: 14px;
    padding: clamp(10px,2vw,16px) clamp(20px,5vw,60px);
    border-top: 1px solid rgba(139,26,26,.07);
  }
  .h6-pager-btn {
    all: unset; cursor: pointer;
    font-family: var(--serif); font-size: 13px; letter-spacing: 1px;
    color: var(--cr); border: 1px solid rgba(139,26,26,.25);
    padding: 7px 16px; transition: background .2s, color .2s;
  }
  .h6-pager-btn:hover:not(:disabled) { background: var(--cr); color: #fff; }
  .h6-pager-btn:disabled { opacity: .3; cursor: default; }
  .h6-pager-info {
    font-family: var(--serif); font-size: 13px; color: var(--ink3);
    min-width: 100px; text-align: center;
  }
  .h6-pager-info b { color: var(--ink2); }

  .h6.oliver .h6-tmdb-pager { border-top-color: rgba(58,159,213,.1); }
  .h6.oliver .h6-pager-btn { color: var(--cr); border-color: rgba(58,159,213,.3); }
  .h6.oliver .h6-pager-btn:hover:not(:disabled) { background: var(--cr); color: var(--cream); }

  /* ══════════════════════════════════════
     TMDB CARD ACTION BUTTONS
  ══════════════════════════════════════ */
  .h6-tmdb-card { cursor: default; } /* remove pointer from whole card */

  .h6-card-actions {
    position: absolute; top: 5px; right: 5px;
    display: flex; flex-direction: column; gap: 5px;
    opacity: 0; transition: opacity .2s;
  }
  .h6-tmdb-card:hover .h6-card-actions { opacity: 1; }

  .h6-card-info-btn,
  .h6-card-add-btn {
    all: unset; cursor: pointer;
    width: 26px; height: 26px; border-radius: 50%;
    display: flex; align-items: center; justify-content: center;
    font-size: 14px; font-weight: 700; line-height: 1;
    transition: transform .15s, background .15s;
  }
  .h6-card-info-btn {
    background: rgba(0,0,0,.72); color: rgba(255,255,255,.9);
    font-size: 13px;
  }
  .h6-card-info-btn:hover { background: rgba(0,0,0,.9); transform: scale(1.12); }

  .h6-card-add-btn {
    background: var(--cr); color: #fff;
    font-size: 17px;
  }
  .h6-card-add-btn:hover { transform: scale(1.15); filter: brightness(1.1); }

  /* ══════════════════════════════════════
     MOVIE INFO MODAL
  ══════════════════════════════════════ */
  .h6-info-backdrop {
    position: fixed; inset: 0; z-index: 10000;
    background: rgba(4,3,2,.82); backdrop-filter: blur(6px);
    display: flex; align-items: center; justify-content: center;
    padding: 20px;
    animation: h6-lbFade .2s ease;
  }
  .h6-info-modal {
    position: relative;
    background: #1a1210; border: 1px solid rgba(255,255,255,.1);
    box-shadow: 0 20px 60px rgba(0,0,0,.7);
    width: min(680px, 96vw); max-height: 88vh;
    overflow-y: auto; overflow-x: hidden;
    scrollbar-width: thin; scrollbar-color: rgba(255,255,255,.15) transparent;
    animation: h6-lbZ .25s ease;
  }
  .h6-info-close {
    all: unset; cursor: pointer; position: sticky; top: 0; float: right;
    margin: 12px 12px 0 0;
    width: 34px; height: 34px; border-radius: 50%; z-index: 2;
    background: rgba(255,255,255,.1); border: 1px solid rgba(255,255,255,.2);
    color: rgba(255,255,255,.8); font-size: 16px;
    display: flex; align-items: center; justify-content: center;
    transition: background .2s, color .2s;
  }
  .h6-info-close:hover { background: var(--cr); color: #fff; border-color: var(--cr); }

  .h6-info-body {
    display: flex; gap: clamp(16px,4vw,32px);
    padding: clamp(20px,4vw,36px);
    clear: both;
  }
  .h6-info-poster {
    flex-shrink: 0;
    width: clamp(100px, 28vw, 180px);
    aspect-ratio: 2/3; object-fit: cover;
    border: 1px solid rgba(139,26,26,.15);
    box-shadow: 0 8px 24px rgba(0,0,0,.22);
  }
  .h6-info-text {
    flex: 1; display: flex; flex-direction: column; gap: 12px;
    min-width: 0;
  }
  .h6-info-title {
    font-family: var(--script); font-style: italic;
    font-size: clamp(20px,4vw,32px); color: #e8c8c8; line-height: 1.15;
    margin: 0;
  }
  .h6-info-meta {
    display: flex; flex-wrap: wrap; gap: 8px; align-items: center;
  }
  .h6-info-yr {
    font-family: var(--serif); font-size: 12px; color: rgba(255,255,255,.6);
    border: 1px solid rgba(255,255,255,.18); padding: 2px 8px;
  }
  .h6-info-rating {
    font-family: var(--serif); font-size: 12px; color: #e87ea1;
    border: 1px solid rgba(232,126,161,.35); padding: 2px 8px;
  }
  .h6-info-type {
    font-family: var(--serif); font-size: 11px; letter-spacing: 2px;
    text-transform: uppercase; color: rgba(255,255,255,.5); padding: 2px 8px;
    background: rgba(255,255,255,.07); border: 1px solid rgba(255,255,255,.12);
  }
  .h6-info-overview {
    font-family: var(--serif); font-size: clamp(13px,2vw,15px);
    color: rgba(255,255,255,.78); line-height: 1.7; margin: 0;
  }
  .h6-info-add-btn {
    all: unset; cursor: pointer; align-self: flex-start;
    font-family: var(--serif); font-size: 13px; letter-spacing: 1px;
    background: var(--cr); color: #fff;
    padding: 10px 22px; margin-top: 4px;
    border: 1px solid var(--cr);
    transition: opacity .2s, background .2s;
  }
  .h6-info-add-btn:hover:not(:disabled) { opacity: .85; }
  .h6-info-add-btn.added {
    background: transparent; color: rgba(255,255,255,.4);
    border-color: rgba(255,255,255,.15); cursor: default;
  }

  /* oliver overrides — modal is already dark, just swap accent colour */
  .h6.oliver .h6-info-close:hover { background: var(--cr); border-color: var(--cr); }
  .h6.oliver .h6-info-title  { color: #c8dff0; }
  .h6.oliver .h6-info-rating { color: #7ec8e8; border-color: rgba(126,200,232,.35); }
  .h6.oliver .h6-info-add-btn { background: var(--cr); border-color: var(--cr); }
  .h6-wl-divider {
    padding: 10px clamp(20px,5vw,60px);
    font-family: var(--serif); font-size: 10px; letter-spacing: 3px;
    color: var(--ink3); text-transform: uppercase;
    border-top: 1px solid rgba(139,26,26,.1);
    border-bottom: 1px solid rgba(139,26,26,.07);
  }

  /* ══════════════════════════════════════
     TICKET BANKS
  ══════════════════════════════════════ */
  .h6-ticket-banks {
    display: flex; gap: clamp(12px,3vw,28px); flex-wrap: wrap;
    padding: clamp(16px,3vw,28px) clamp(20px,5vw,60px);
    border-bottom: 1px solid rgba(139,26,26,.08);
    justify-content: center;
  }

  .h6-ticket-bank {
    flex: 1; min-width: 200px; max-width: 360px;
    background: var(--cream2);
    border: 1px solid rgba(139,26,26,.14);
    padding: clamp(14px,2.5vw,22px) clamp(16px,3vw,28px);
    display: flex; flex-direction: column; gap: 10px;
    transition: border-color .25s, box-shadow .25s;
  }
  .h6-ticket-bank.mine {
    border-color: var(--cr);
    box-shadow: 0 0 0 1px rgba(139,26,26,.12), 0 4px 20px rgba(139,26,26,.08);
  }
  .h6-ticket-bank.ash { border-left: 3px solid #e87ea1; }
  .h6-ticket-bank.ol  { border-left: 3px solid #5aaddb; }

  .h6-tbank-header {
    display: flex; align-items: baseline; justify-content: space-between;
    gap: 8px;
  }
  .h6-tbank-who {
    font-family: var(--script); font-style: italic;
    font-size: clamp(17px,2.8vw,22px); color: var(--cr);
  }
  .h6-tbank-label {
    font-family: var(--serif); font-size: 10px; letter-spacing: 2px;
    color: var(--ink3); text-transform: uppercase;
  }

  .h6-tbank-tickets {
    display: flex; flex-wrap: wrap; gap: 5px; align-items: center;
  }
  .h6-ticket {
    font-size: clamp(16px,2.5vw,22px);
    transition: transform .2s, opacity .2s, filter .2s;
    line-height: 1;
  }
  .h6-ticket.full  { opacity: 1; }
  .h6-ticket.used  { opacity: .22; filter: grayscale(1); transform: scale(.85); }

  .h6-tbank-count {
    font-family: var(--serif); font-size: 12px; color: var(--ink3); letter-spacing: .5px;
  }
  .h6-tbank-count b { color: var(--cr); }

  .h6-tbank-warn {
    font-family: var(--serif); font-size: 11px; font-style: italic;
    color: var(--cr); opacity: .8; margin: 0;
    animation: h6-qfade .35s ease;
  }

  /* oliver overrides for ticket banks */
  .h6.oliver .h6-ticket-bank { background: var(--cream2); border-color: rgba(58,159,213,.18); }
  .h6.oliver .h6-ticket-bank.mine { border-color: var(--cr); box-shadow: 0 0 0 1px rgba(58,159,213,.15), 0 4px 20px rgba(58,159,213,.07); }
  .h6.oliver .h6-ticket-bank.ash  { border-left-color: #e87ea1; }
  .h6.oliver .h6-ticket-bank.ol   { border-left-color: var(--cr); }
  .h6.oliver .h6-tbank-who { color: var(--cr); }
  .h6.oliver .h6-tbank-count b { color: var(--cr); }
  .h6.oliver .h6-tbank-warn { color: var(--cr); }

  /* ══════════════════════════════════════
     TICKET BUTTON (per movie row)
  ══════════════════════════════════════ */
  .h6-ticket-btn {
    all: unset; cursor: pointer;
    padding: 5px 10px; display: flex; align-items: center; gap: 4px;
    font-family: var(--serif); font-size: 12px; letter-spacing: .5px;
    border: 1px solid rgba(139,26,26,.3); color: var(--ink3);
    border-radius: 2px; white-space: nowrap;
    transition: all .2s;
  }
  .h6-ticket-btn:hover:not(.capped) {
    border-color: var(--cr); color: var(--cr);
    background: rgba(139,26,26,.06);
  }
  .h6-ticket-btn.active {
    background: var(--cr); color: #fff; border-color: var(--cr);
    font-weight: 600;
  }
  .h6-ticket-btn.capped {
    opacity: .3; cursor: not-allowed;
  }

  .h6.oliver .h6-ticket-btn { border-color: rgba(58,159,213,.3); }
  .h6.oliver .h6-ticket-btn:hover:not(.capped) { border-color: var(--cr); color: var(--cr); background: rgba(58,159,213,.07); }
  .h6.oliver .h6-ticket-btn.active { background: var(--cr); border-color: var(--cr); }

  /* ══════════════════════════════════════
     POWER BADGES & ROW HIGHLIGHTS
  ══════════════════════════════════════ */
  .h6-power-badge {
    font-family: var(--serif); font-size: 10px;
    padding: 2px 8px; letter-spacing: 1px; white-space: nowrap;
    border: 1px solid; border-radius: 2px;
    animation: h6-mp .3s ease;
  }
  .h6-power-badge.ash {
    color: #c0496a; border-color: #c0496a;
    background: rgba(192,73,106,.07);
  }
  .h6-power-badge.ol {
    color: #3a9fd5; border-color: #3a9fd5;
    background: rgba(58,159,213,.07);
  }

  .h6-match-badge.ticket {
    color: #c07a20; border-color: #c07a20;
    background: rgba(192,122,32,.07);
    font-weight: 600;
  }

  .h6-movie-row.is-ash-power  { background: rgba(192,73,106,.05); }
  .h6-movie-row.is-ol-power   { background: rgba(58,159,213,.05); }
  .h6-movie-row.is-ticket-match { background: rgba(192,122,32,.07); }

  .h6.oliver .h6-movie-row.is-ash-power  { background: rgba(192,73,106,.06); }
  .h6.oliver .h6-movie-row.is-ol-power   { background: rgba(58,159,213,.08); }
  .h6.oliver .h6-movie-row.is-ticket-match { background: rgba(192,122,32,.09); }

  /* ══════════════════════════════════════
     TICKET RESULTS / POWER PICKS SECTION
  ══════════════════════════════════════ */
  .h6-ticket-results { border-top: 1px solid rgba(139,26,26,.12); }

  .h6-power-section {
    display: flex; flex-direction: column; align-items: center;
    gap: 10px; margin-top: 14px;
  }
  .h6-power-label {
    font-family: var(--serif); font-size: 11px; letter-spacing: 2px;
    text-transform: uppercase; padding: 3px 12px; border-radius: 2px;
  }
  .h6-power-label.ash {
    background: rgba(192,73,106,.1); color: #c0496a;
    border: 1px solid rgba(192,73,106,.3);
  }
  .h6-power-label.ol {
    background: rgba(58,159,213,.1); color: #3a9fd5;
    border: 1px solid rgba(58,159,213,.3);
  }

  .h6-match-chip.ash-chip {
    background: #c0496a;
  }
  .h6-match-chip.ol-chip {
    background: #3a9fd5;
  }
  .h6-match-chip.both {
    background: #c07a20;
    outline: 2px solid rgba(255,255,255,.35);
  }
  .h6-chip-both {
    font-size: 10px; opacity: .85; font-style: italic;
  }

  .h6.oliver .h6-ticket-results { border-top-color: rgba(58,159,213,.15); }
`;


/* ── Firestore document ref ── */
const WATCHLIST_DOC = 'watchlist/shared';

/* ── Ticket config ── */
const TICKETS_ASHLEY = 10;
const TICKETS_OLIVER = 2;

/** Returns 'YYYY-MM' string for the current month */
function currentMonth() {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}`;
}

const QUOTES = [
  <>I miss you<br />in the smallest moments<br /><em>the most</em></>,

  <>You're my favorite<br /><em>notification</em></>,

  <>I still get excited<br />to talk to <em>you</em></>,

  <>You make<br /><em>distance</em> feel temporary</>,

  <>If love had<br />a favorite person,<br />it would be <em>you</em></>,


];

const SONGS = [
  { title: 'Apocalypse',         artist: 'Cigarettes After Sex', url: 'https://open.spotify.com/track/5Y9P0dGRB0QIIA9FbLCPjL', audio: songApocalypse },
  { title: 'Those Eyes',         artist: 'New West',             url: 'https://open.spotify.com/track/3bNv3a8PNpSAYSFdFmiGDw', audio: songThoseEyes  },
  { title: 'Until I Found You',  artist: 'Stephen Sanchez',      url: 'https://open.spotify.com/track/0dqrGbzAEDPRSDbGoIJhRF', audio: songUntilFound },
  { title: 'I Like Me Better',   artist: 'Lauv',                 url: 'https://open.spotify.com/track/2zFnMxXqoQ64hWxBSDqsbl', audio: songILikeMeBetter },
  { title: 'Sweet Creature',     artist: 'Harry Styles',         url: 'https://open.spotify.com/track/7wGoVu4Dady5GV0Sv4UIsx', audio: songSweetCreature },
];

const STRIP  = [ash1, ash2,ash7,ash3, ash5,ash4,ash6,ash9];
const STRIP_OLIVE = [olive7, olive2, olive3, olive5, olive1];
const VINYL  = [olive2, olive3, olive1];
const MOSAIC = [
  { src: olive4, cls: 'span2c' },
  { src: ash3,   cls: '' },
  { src: ash1,   cls: 'span2r' },
  { src: olive2, cls: '' },
  { src: ash2,   cls: '' },
  { src: olive3, cls: '' },
  { src: olive1, cls: 'span2c' },
  { src: ash3,   cls: '' },
];
const ALL_LB = [...STRIP, ...VINYL, ...MOSAIC.map(m => m.src)];

/* ── TMDB ── */
const TMDB_KEY = '1f8d3bec1b042fe87c04750802d2b6c2';
const TMDB_IMG = 'https://image.tmdb.org/t/p/w300';
const TABS = [
  { id: 'trending', label: '🔥 Trending' },
  { id: 'movies',   label: '🎥 Movies'  },
  { id: 'tv',       label: '📺 TV Shows' },
  { id: '16',       label: '🎨 Animation'},
  { id: '10751',    label: '👨‍👩‍👧 Family'  },
  { id: '35',       label: '😂 Comedy'  },
  { id: '10749',    label: '💕 Romance' },
  { id: '18',       label: '🎭 Drama'   },
  { id: '878',      label: '🚀 Sci-Fi'  },
  { id: '28',       label: '💥 Action'  },
  { id: '27',       label: '👻 Horror'  },
  { id: '9648',     label: '🔍 Mystery' },
  { id: '53',       label: '😰 Thriller'},
];

export default function Ch9Home({ active, goToChapter, user, isCute }) {
  const [qIdx, setQIdx] = useState(0);
  const [lb, setLb]     = useState(null);
  const [playingIdx, setPlayingIdx] = useState(null);
  const audioRef = useRef(null);

  /* ── movie watchlist state (Firestore = syncs across devices) ── */
  const [movies,   setMovies]   = useState([]);
  const [olPicks,  setOlPicks]  = useState([]);
  const [ashPicks, setAshPicks] = useState([]);
  const [fsReady,  setFsReady]  = useState(false);
  const [newTitle, setNewTitle] = useState('');

  /* ── ticket system state ── */
  const [ashTickets, setAshTickets] = useState(TICKETS_ASHLEY);
  const [olTickets,  setOlTickets]  = useState(TICKETS_OLIVER);
  /* ticketPicks: movie ids that were added via ticket (not mutual-pick system) */
  const [ashTicketPicks, setAshTicketPicks] = useState([]);
  const [olTicketPicks,  setOlTicketPicks]  = useState([]);
  /* ── TMDB browser ── */
  const [activeTab,   setActiveTab]   = useState('trending');
  const [query,       setQuery]       = useState('');
  const [tmdbMovies,  setTmdbMovies]  = useState([]);
  const [tmdbLoading, setTmdbLoading] = useState(false);
  const [tmdbPage,    setTmdbPage]    = useState(1);
  const [tmdbTotal,   setTmdbTotal]   = useState(1);
  const [infoMovie,   setInfoMovie]   = useState(null); // movie object for detail modal

  /* rotate quote */
  useEffect(() => {
    if (!active) return;
    const id = setInterval(() => setQIdx(i => (i + 1) % QUOTES.length), 4500);
    return () => clearInterval(id);
  }, [active]);

  /* stop audio when leaving chapter */
  useEffect(() => {
    if (!active && audioRef.current) {
      audioRef.current.pause();
      setPlayingIdx(null);
    }
  }, [active]);

  const togglePlay = useCallback((i, audioSrc) => {
    if (!audioSrc) return; // no local file — just open Spotify link
    if (playingIdx === i) {
      audioRef.current.pause();
      setPlayingIdx(null);
    } else {
      if (audioRef.current) audioRef.current.pause();
      audioRef.current = new Audio(audioSrc);
      audioRef.current.play();
      audioRef.current.onended = () => setPlayingIdx(null);
      setPlayingIdx(i);
    }
  }, [playingIdx]);

  /* ── Firestore real-time listener ── */
  useEffect(() => {
    const ref = doc(db, 'watchlist', 'shared');
    const month = currentMonth();

    const unsub = onSnapshot(ref, snap => {
      if (!snap.exists()) {
        // first ever load — create the document with empty defaults
        setDoc(ref, {
          movies: [], picks_oliver: [], picks_ashley: [],
          tickets_ashley: TICKETS_ASHLEY, tickets_oliver: TICKETS_OLIVER,
          ticket_picks_ashley: [], ticket_picks_oliver: [],
          tickets_month: month,
        });
        return;
      }
      const data = snap.data();

      // ── monthly ticket reset ──
      if (data.tickets_month && data.tickets_month !== month) {
        // new month — reset everyone's tickets
        updateDoc(ref, {
          tickets_ashley: TICKETS_ASHLEY,
          tickets_oliver: TICKETS_OLIVER,
          ticket_picks_ashley: [],
          ticket_picks_oliver: [],
          tickets_month: month,
        });
        // optimistic local update; snapshot will arrive shortly
        setAshTickets(TICKETS_ASHLEY);
        setOlTickets(TICKETS_OLIVER);
        setAshTicketPicks([]);
        setOlTicketPicks([]);
      } else {
        setAshTickets(data.tickets_ashley ?? TICKETS_ASHLEY);
        setOlTickets(data.tickets_oliver  ?? TICKETS_OLIVER);
        setAshTicketPicks(data.ticket_picks_ashley || []);
        setOlTicketPicks(data.ticket_picks_oliver  || []);
      }

      setMovies(data.movies        || []);
      setOlPicks(data.picks_oliver  || []);
      setAshPicks(data.picks_ashley || []);
      setFsReady(true);
    });
    return () => unsub();
  }, []);

  /* movie helpers */
  const myPicks    = user === 'oliver' ? olPicks : ashPicks;
  const setMyPicks = user === 'oliver'
    ? (fn) => {
        const next = typeof fn === 'function' ? fn(olPicks) : fn;
        updateDoc(doc(db, 'watchlist', 'shared'), { picks_oliver: next });
      }
    : (fn) => {
        const next = typeof fn === 'function' ? fn(ashPicks) : fn;
        updateDoc(doc(db, 'watchlist', 'shared'), { picks_ashley: next });
      };

  const addMovie = useCallback(() => {
    const t = newTitle.trim();
    if (!t) return;
    const next = [...movies, { id: Date.now(), title: t }];
    updateDoc(doc(db, 'watchlist', 'shared'), { movies: next });
    setNewTitle('');
  }, [newTitle, movies]);

  const togglePick = useCallback((id) => {
    if (!user) return;
    setMyPicks(prev => {
      if (prev.includes(id)) return prev.filter(x => x !== id);
      if (prev.length >= 3) return prev;
      return [...prev, id];
    });
  }, [user, setMyPicks]);

  const removeMovie = useCallback((id) => {
    const ref = doc(db, 'watchlist', 'shared');
    updateDoc(ref, {
      movies:               movies.filter(m => m.id !== id),
      picks_oliver:         olPicks.filter(x => x !== id),
      picks_ashley:         ashPicks.filter(x => x !== id),
      ticket_picks_ashley:  ashTicketPicks.filter(x => x !== id),
      ticket_picks_oliver:  olTicketPicks.filter(x => x !== id),
    });
  }, [movies, olPicks, ashPicks, ashTicketPicks, olTicketPicks]);

  /* ── use a ticket to claim a movie ── */
  const useTicket = useCallback((movieId) => {
    if (!user) return;
    const ref = doc(db, 'watchlist', 'shared');
    const isAsh = user === 'ashley';
    const myTickets    = isAsh ? ashTickets    : olTickets;
    const myTkPicks    = isAsh ? ashTicketPicks : olTicketPicks;
    const tkField      = isAsh ? 'tickets_ashley'       : 'tickets_oliver';
    const tkPicksField = isAsh ? 'ticket_picks_ashley'  : 'ticket_picks_oliver';

    // already used a ticket on this movie — release it
    if (myTkPicks.includes(movieId)) {
      updateDoc(ref, {
        [tkField]:      myTickets + 1,
        [tkPicksField]: myTkPicks.filter(x => x !== movieId),
      });
      return;
    }
    // no tickets left
    if (myTickets <= 0) return;

    updateDoc(ref, {
      [tkField]:      myTickets - 1,
      [tkPicksField]: [...myTkPicks, movieId],
    });
  }, [user, ashTickets, olTickets, ashTicketPicks, olTicketPicks]);

  const matches = movies.filter(m => olPicks.includes(m.id) && ashPicks.includes(m.id));

  /* ticket-claimed movies (solo power plays) */
  const ashTicketMovies = movies.filter(m => ashTicketPicks.includes(m.id));
  const olTicketMovies  = movies.filter(m => olTicketPicks.includes(m.id));

  /* "both used a ticket" = mutual agreement via tickets */
  const ticketMatches = movies.filter(m =>
    ashTicketPicks.includes(m.id) && olTicketPicks.includes(m.id)
  );

  const myTickets      = user === 'oliver' ? olTickets   : ashTickets;
  const myTicketPicks  = user === 'oliver' ? olTicketPicks : ashTicketPicks;
  const myMaxTickets   = user === 'oliver' ? TICKETS_OLIVER : TICKETS_ASHLEY;

  /* ── TMDB fetch ── */
  const fetchTMDB = useCallback(async (tab, q, page = 1) => {
    setTmdbLoading(true);
    try {
      let url;
      if (q.trim()) {
        url = `https://api.themoviedb.org/3/search/multi?api_key=${TMDB_KEY}&query=${encodeURIComponent(q.trim())}&page=${page}&include_adult=false`;
      } else if (tab === 'trending') {
        url = `https://api.themoviedb.org/3/trending/all/week?api_key=${TMDB_KEY}&page=${page}`;
      } else if (tab === 'movies') {
        url = `https://api.themoviedb.org/3/discover/movie?api_key=${TMDB_KEY}&sort_by=popularity.desc&page=${page}`;
      } else if (tab === 'tv') {
        url = `https://api.themoviedb.org/3/discover/tv?api_key=${TMDB_KEY}&sort_by=popularity.desc&page=${page}`;
      } else {
        url = `https://api.themoviedb.org/3/discover/movie?api_key=${TMDB_KEY}&with_genres=${tab}&sort_by=popularity.desc&page=${page}`;
      }
      const res  = await fetch(url);
      const data = await res.json();
      setTmdbMovies((data.results || []).filter(m => m.poster_path && m.media_type !== 'person'));
      setTmdbTotal(Math.min(data.total_pages || 1, 500)); // TMDB caps at 500
    } catch {
      setTmdbMovies([]);
      setTmdbTotal(1);
    }
    setTmdbLoading(false);
  }, []);

  /* reset to page 1 when tab or query changes */
  useEffect(() => {
    if (!active) return;
    setTmdbPage(1);
    const t = setTimeout(() => fetchTMDB(activeTab, query, 1), query ? 450 : 0);
    return () => clearTimeout(t);
  }, [active, activeTab, query, fetchTMDB]);

  /* fetch when page changes (but not when tab/query changes — that's handled above) */
  const pageRef = useRef(1);
  useEffect(() => {
    if (!active) return;
    if (tmdbPage === 1) { pageRef.current = 1; return; } // already fetched by the tab/query effect
    if (tmdbPage === pageRef.current) return;
    pageRef.current = tmdbPage;
    fetchTMDB(activeTab, query, tmdbPage);
  }, [active, tmdbPage, activeTab, query, fetchTMDB]);

  const addFromTMDB = useCallback((m) => {
    const title = m.title || m.name || '';
    if (!title) return;
    if (movies.some(mv => mv.title.toLowerCase() === title.toLowerCase())) return;
    const next = [...movies, { id: Date.now(), title }];
    updateDoc(doc(db, 'watchlist', 'shared'), { movies: next });
  }, [movies]);

  /* lightbox keyboard */
  useEffect(() => {
    if (lb === null) return;
    const fn = e => {
      if (e.key === 'Escape')     setLb(null);
      if (e.key === 'ArrowRight') setLb(i => (i + 1) % ALL_LB.length);
      if (e.key === 'ArrowLeft')  setLb(i => (i - 1 + ALL_LB.length) % ALL_LB.length);
    };
    window.addEventListener('keydown', fn);
    return () => window.removeEventListener('keydown', fn);
  }, [lb]);

  const openStrip  = i => setLb(i);
  const openVinyl  = i => setLb(STRIP.length + i);
  const openMosaic = i => setLb(STRIP.length + VINYL.length + i);

  return (
    /* NOTE: intentionally NOT using .ch-inner so we get full bleed */
    <div style={{ position: 'relative', width: '100%', minHeight: '100%' }}>
      <style>{STYLES}</style>
      <div className={`h6${!isCute ? ' oliver' : ''}`}>

        {/* ═══ 1: hero photo strip ═══ */}
        <section className="h6-s1">
          <div className="h6-s1-top">
            <span className="h6-s1-num">09</span>
            <div className="h6-s1-title">
              <span className="script">I love you <em>more</em><br />than words</span>
              <span className="bracket">[ are good at explaining ]</span>
            </div>
            <span className="h6-s1-num">02</span>
          </div>

          <div className="h6-strip">
            {/* duplicate STRIP for seamless infinite loop */}
            <div className="h6-marquee">
              {[...STRIP, ...STRIP].map((src, i) => (
                <div key={i} className="h6-strip-col" onClick={() => openStrip(i % STRIP.length)}>
                  <img src={src} alt="" loading="lazy" />
                </div>
              ))}
            </div>
            {/* stationary labels — sit over the marquee, don't move */}
            <span className="h6-strip-tag bl">cutie 🤍</span>
            <span className="h6-strip-tag br">pretty girl ♡ </span>
          </div>
        </section>

        <hr className="h6-rule" />

        {/* ═══ 2: quote carousel ═══ */}
        <section className="h6-s2">
          <div className="h6-s2-bar">
            <span>true love</span>
            <span>always</span>
          </div>

          <div className="h6-s2-stage">
            <p className="h6-s2-quote" key={qIdx}>{QUOTES[qIdx]}</p>
          </div>

          <div className="h6-s2-foot">
            <button onClick={() => setQIdx(i => (i - 1 + QUOTES.length) % QUOTES.length)}>back</button>
            <span><b>{qIdx + 1}</b> of {QUOTES.length}</span>
            <button onClick={() => setQIdx(i => (i + 1) % QUOTES.length)}>next</button>
          </div>
        </section>

        <hr className="h6-rule" />

        {/* ═══ SONGS ═══ */}
        <section className="h6-songs">
          <p className="h6-songs-title">songs that make me think of you</p>
          {SONGS.map((s, i) => (
            <div key={i} className={`h6-song-row${playingIdx === i ? ' playing' : ''}`}>
              <span className="h6-song-num">{i + 1}</span>
              <button
                className="h6-song-dot"
                onClick={() => togglePlay(i, s.audio)}
                aria-label={playingIdx === i ? 'Pause' : 'Play'}
              >
                {s.audio ? (playingIdx === i ? '⏸' : '▶') : '♪'}
              </button>
              <div className="h6-song-info">
                <div className="h6-song-name">{s.title}</div>
                <div className="h6-song-artist">{s.artist}</div>
              </div>
              <a href={s.url} target="_blank" rel="noopener noreferrer" className="h6-song-open" onClick={e => e.stopPropagation()}>
                spotify ↗
              </a>
            </div>
          ))}
        </section>

        <hr className="h6-rule" />
        {/* ═══ OLIVER MARQUEE ═══ */}
        <section className="h6-s1" style={{ paddingBottom: 0 }}>
          <div className="h6-s1-top">
            <span className="h6-s1-num">him</span>
            <div className="h6-s1-title">
              <span className="script">Me<em></em></span>
            </div>
            <span className="h6-s1-num"></span>
          </div>
          <div className="h6-strip">
            <div className="h6-marquee" style={{ animationDirection: 'reverse' }}>
              {[...STRIP_OLIVE, ...STRIP_OLIVE].map((src, i) => (
                <div key={i} className="h6-strip-col">
                  <img src={src} alt="" loading="lazy" />
                </div>
              ))}
            </div>
            <span className="h6-strip-tag bl">that's</span>
            <span className="h6-strip-tag br">me</span>
          </div>
        </section>

        <hr className="h6-rule" />

        {/* ═══ WATCH TOGETHER ═══ */}
        <section className="h6-watch">

          <div className="h6-watch-head">
            <p className="h6-watch-title">Watching Time</p>
            <p className="h6-watch-who">
              {user
                ? <>{user === 'oliver' ? '❄️' : '🌸'} You are <b>{user === 'oliver' ? 'Oliver' : 'Ashley'}</b> · Add movies, pick 3 with mutual picks · or use tickets for power picks!</>
                : 'Add movies & shows, use picks or tickets to choose what to watch!'}
            </p>
          </div>

          {/* ═══ TICKET BANKS ═══ */}
          <div className="h6-ticket-banks">

            {/* Ashley's bank */}
            <div className={`h6-ticket-bank ash${user === 'ashley' ? ' mine' : ''}`}>
              <div className="h6-tbank-header">
                <span className="h6-tbank-who">🌸 Ashley</span>
                <span className="h6-tbank-label">Movie Power</span>
              </div>
              <div className="h6-tbank-tickets">
                {Array.from({ length: TICKETS_ASHLEY }).map((_, i) => (
                  <span
                    key={i}
                    className={`h6-ticket${i < ashTickets ? ' full' : ' used'}`}
                    aria-label={i < ashTickets ? 'ticket available' : 'ticket used'}
                  >🎟</span>
                ))}
              </div>
              <p className="h6-tbank-count">
                <b>{ashTickets}</b> / {TICKETS_ASHLEY} left this month
              </p>
              {user === 'ashley' && ashTickets <= 3 && ashTickets > 0 && (
                <p className="h6-tbank-warn">Almost out! Use them wisely 🍿</p>
              )}
              {user === 'ashley' && ashTickets === 0 && (
                <p className="h6-tbank-warn">All tickets used — resets next month!</p>
              )}
            </div>

            {/* Oliver's bank */}
            <div className={`h6-ticket-bank ol${user === 'oliver' ? ' mine' : ''}`}>
              <div className="h6-tbank-header">
                <span className="h6-tbank-who">❄️ Oliver</span>
                <span className="h6-tbank-label">Movie Power</span>
              </div>
              <div className="h6-tbank-tickets">
                {Array.from({ length: TICKETS_OLIVER }).map((_, i) => (
                  <span
                    key={i}
                    className={`h6-ticket${i < olTickets ? ' full' : ' used'}`}
                    aria-label={i < olTickets ? 'ticket available' : 'ticket used'}
                  >🎟</span>
                ))}
              </div>
              <p className="h6-tbank-count">
                <b>{olTickets}</b> / {TICKETS_OLIVER} left this month
              </p>
              {user === 'oliver' && olTickets === 0 && (
                <p className="h6-tbank-warn">All tickets used — resets next month!</p>
              )}
            </div>

          </div>

          {/* ═══ TMDB browser ═══ */}
          <div className="h6-tmdb-browser">
            {/* search */}
            <div className="h6-search-row">
              <input
                className="h6-search-in"
                placeholder="🔍  Search movies & TV shows..."
                value={query}
                onChange={e => setQuery(e.target.value)}
              />
              {query && (
                <button className="h6-search-clear" onClick={() => setQuery('')}>✕ Clear</button>
              )}
            </div>

            {/* tabs */}
            {!query && (
              <div className="h6-tabs" role="tablist">
                {TABS.map(t => (
                  <button
                    key={t.id}
                    className={`h6-tab${activeTab === t.id ? ' on' : ''}`}
                    onClick={() => setActiveTab(t.id)}
                  >{t.label}</button>
                ))}
              </div>
            )}

            {/* poster grid */}
            <div className="h6-tmdb-grid">
              {tmdbLoading ? (
                <div className="h6-tmdb-loading">Loading... ✨</div>
              ) : tmdbMovies.length === 0 ? (
                <div className="h6-tmdb-empty">No results — try another search or tab!</div>
              ) : tmdbMovies.map(m => {
                const title  = m.title || m.name || '';
                const year   = (m.release_date || m.first_air_date || '').slice(0, 4);
                const rating = m.vote_average ? m.vote_average.toFixed(1) : null;
                const added  = movies.some(mv => mv.title.toLowerCase() === title.toLowerCase());
                return (
                  <div
                    key={`${m.id}-${m.media_type || 'movie'}`}
                    className="h6-tmdb-card"
                  >
                    <img className="h6-tmdb-poster" src={`${TMDB_IMG}${m.poster_path}`} alt={title} loading="lazy" />
                    <div className="h6-tmdb-info">
                      <p className="h6-tmdb-title">{title}</p>
                      <div className="h6-tmdb-meta">
                        {rating && parseFloat(rating) > 0 && <span className="h6-tmdb-rating">★ {rating}</span>}
                        <span className="h6-tmdb-yr">{year}</span>
                      </div>
                    </div>
                    {/* card action buttons */}
                    <div className="h6-card-actions">
                      <button
                        className="h6-card-info-btn"
                        onClick={e => { e.stopPropagation(); setInfoMovie(m); }}
                        title="See description"
                        aria-label="Info"
                      >ⓘ</button>
                      {added
                        ? <span className="h6-tmdb-added">✓</span>
                        : <button
                            className="h6-card-add-btn"
                            onClick={e => { e.stopPropagation(); addFromTMDB(m); }}
                            title={`Add "${title}" to watchlist`}
                            aria-label="Add to watchlist"
                          >＋</button>
                      }
                    </div>
                  </div>
                );
              })}
            </div>

            {/* pagination */}
            {!tmdbLoading && tmdbMovies.length > 0 && (
              <div className="h6-tmdb-pager">
                <button
                  className="h6-pager-btn"
                  disabled={tmdbPage <= 1}
                  onClick={() => setTmdbPage(p => Math.max(1, p - 1))}
                >‹ Prev</button>
                <span className="h6-pager-info">Page <b>{tmdbPage}</b> of {tmdbTotal}</span>
                <button
                  className="h6-pager-btn"
                  disabled={tmdbPage >= tmdbTotal}
                  onClick={() => setTmdbPage(p => Math.min(tmdbTotal, p + 1))}
                >Next ›</button>
              </div>
            )}
          </div>

          {/* watchlist divider */}
          <div className="h6-wl-divider">Our Watchlist</div>

          {/* list */}
          {movies.length === 0
            ? <p className="h6-wl-empty">Nothing on the list yet — add something above! 🍿</p>
            : <div className="h6-movie-list">
                {movies.map(m => {
                  const olOn  = olPicks.includes(m.id);
                  const ashOn = ashPicks.includes(m.id);
                  const isMutualPick = olOn && ashOn;

                  const myOn    = myPicks.includes(m.id);
                  const myFull  = myPicks.length >= 3 && !myOn;

                  const ashTkOn = ashTicketPicks.includes(m.id);
                  const olTkOn  = olTicketPicks.includes(m.id);
                  const isBothTicket = ashTkOn && olTkOn;
                  const isAshPower   = ashTkOn && !olTkOn;
                  const isOlPower    = olTkOn && !ashTkOn;

                  const myTkOn   = user === 'ashley' ? ashTkOn : olTkOn;
                  const canTicket = user && (myTkOn || myTickets > 0);

                  // row highlight priority: both-ticket > mutual-pick > single power
                  const rowClass = [
                    'h6-movie-row',
                    isBothTicket  ? ' is-ticket-match' :
                    isMutualPick  ? ' is-match' :
                    isAshPower    ? ' is-ash-power' :
                    isOlPower     ? ' is-ol-power' : '',
                  ].join('');

                  return (
                    <div key={m.id} className={rowClass}>
                      {/* status badge */}
                      {isBothTicket  && <span className="h6-match-badge ticket">🎟 BOTH PICKED ✦</span>}
                      {isMutualPick  && !isBothTicket && <span className="h6-match-badge">MATCH ✦</span>}
                      {isAshPower    && !isBothTicket && <span className="h6-power-badge ash">🌸 Ashley's pick</span>}
                      {isOlPower     && !isBothTicket && <span className="h6-power-badge ol">❄️ Oliver's pick</span>}

                      <span className="h6-movie-title">{m.title}</span>

                      <div className="h6-pick-btns">
                        {/* ── normal mutual-pick buttons ── */}
                        <button
                          className={`h6-pick-btn${olOn ? ' active' : ''}${user === 'oliver' ? ' mine' : ' readonly'}${user === 'oliver' && myFull ? ' capped' : ''}`}
                          onClick={() => user === 'oliver' && togglePick(m.id)}
                          title={user === 'oliver' ? (myFull ? 'Max 3 picks' : 'Toggle your pick') : "Oliver's pick"}
                        >❄️ {olOn ? '✓' : '○'}</button>
                        <button
                          className={`h6-pick-btn${ashOn ? ' active' : ''}${user === 'ashley' ? ' mine' : ' readonly'}${user === 'ashley' && myFull ? ' capped' : ''}`}
                          onClick={() => user === 'ashley' && togglePick(m.id)}
                          title={user === 'ashley' ? (myFull ? 'Max 3 picks' : 'Toggle your pick') : "Ashley's pick"}
                        >🌸 {ashOn ? '✓' : '○'}</button>

                        {/* ── ticket / power pick button ── */}
                        {user && (
                          <button
                            className={`h6-ticket-btn${myTkOn ? ' active' : ''}${!canTicket ? ' capped' : ''}`}
                            onClick={() => canTicket && useTicket(m.id)}
                            title={
                              myTkOn
                                ? 'Cancel ticket pick (refunds 1 ticket)'
                                : myTickets <= 0
                                  ? 'No tickets left this month'
                                  : `Use a ticket to power-pick this (${myTickets} left)`
                            }
                          >
                            🎟 {myTkOn ? 'Picked' : 'Ticket'}
                          </button>
                        )}
                      </div>

                      <button className="h6-del-btn" onClick={() => removeMovie(m.id)} title="Remove">×</button>
                    </div>
                  );
                })}
              </div>
          }

          {/* summary */}
          <div className="h6-wl-summary">
            <span>❄️ Oliver: <b>{olPicks.length}/3</b> picks · <b>{olTicketPicks.length}</b> ticket{olTicketPicks.length !== 1 ? 's' : ''} used</span>
            <span>🌸 Ashley: <b>{ashPicks.length}/3</b> picks · <b>{ashTicketPicks.length}</b> ticket{ashTicketPicks.length !== 1 ? 's' : ''} used</span>
          </div>

          {/* ── mutual picks matches ── */}
          {matches.length > 0 && (
            <div className="h6-matches">
              <p className="h6-matches-ttl">✦ Mutual picks — we both want this</p>
              <div className="h6-matches-chips">
                {matches.map(m => <span key={m.id} className="h6-match-chip">{m.title}</span>)}
              </div>
            </div>
          )}

          {/* ── ticket power picks ── */}
          <div className="h6-matches h6-ticket-results">
            <p className="h6-matches-ttl">
              {ashTicketMovies.length === 0 && olTicketMovies.length === 0
                ? '🎟 No ticket picks yet'
                : '🎟 Power Picks'}
            </p>

            {/* Ashley's solo ticket picks */}
            {ashTicketMovies.length > 0 && (
              <div className="h6-power-section">
                <span className="h6-power-label ash">🌸 Ashley chose</span>
                <div className="h6-matches-chips">
                  {ashTicketMovies.map(m => (
                    <span
                      key={m.id}
                      className={`h6-match-chip ash-chip${olTicketPicks.includes(m.id) ? ' both' : ''}`}
                    >
                      {m.title}
                      {olTicketPicks.includes(m.id) && <span className="h6-chip-both"> ✦ both!</span>}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Oliver's solo ticket picks */}
            {olTicketMovies.length > 0 && (
              <div className="h6-power-section">
                <span className="h6-power-label ol">❄️ Oliver chose</span>
                <div className="h6-matches-chips">
                  {olTicketMovies.map(m => (
                    <span
                      key={m.id}
                      className={`h6-match-chip ol-chip${ashTicketPicks.includes(m.id) ? ' both' : ''}`}
                    >
                      {m.title}
                      {ashTicketPicks.includes(m.id) && <span className="h6-chip-both"> ✦ both!</span>}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {ashTicketMovies.length === 0 && olTicketMovies.length === 0 && (
              <p className="h6-no-match">Use a 🎟 ticket on any movie to power-pick it anytime!</p>
            )}
          </div>

        </section>


        {/* ═══ 5: signoff ═══ */}
        <section className="h6-s5">
          <p className="headline">Oliver &amp; Ashley, forever 💚</p>
          <p className="names">OLIVER × ASHLEY</p>
          {/* <button className="h6-s5-btn" onClick={() => goToChapter(1)}>
            ↺ FROM THE BEGINNING
          </button> */}
        </section>

      </div>

      {/* ── movie info modal ── */}
      {infoMovie && (() => {
        const m     = infoMovie;
        const title = m.title || m.name || '';
        const year  = (m.release_date || m.first_air_date || '').slice(0, 4);
        const rating = m.vote_average ? m.vote_average.toFixed(1) : null;
        const added  = movies.some(mv => mv.title.toLowerCase() === title.toLowerCase());
        return (
          <div className="h6-info-backdrop" onClick={() => setInfoMovie(null)}>
            <div className="h6-info-modal" onClick={e => e.stopPropagation()}>
              <button className="h6-info-close" onClick={() => setInfoMovie(null)}>✕</button>
              <div className="h6-info-body">
                {m.poster_path && (
                  <img
                    className="h6-info-poster"
                    src={`${TMDB_IMG}${m.poster_path}`}
                    alt={title}
                  />
                )}
                <div className="h6-info-text">
                  <p className="h6-info-title">{title}</p>
                  <div className="h6-info-meta">
                    {year && <span className="h6-info-yr">{year}</span>}
                    {rating && parseFloat(rating) > 0 && (
                      <span className="h6-info-rating">★ {rating}</span>
                    )}
                    {m.media_type === 'tv' || m.first_air_date
                      ? <span className="h6-info-type">TV Series</span>
                      : <span className="h6-info-type">Movie</span>
                    }
                  </div>
                  <p className="h6-info-overview">
                    {m.overview || 'No description available.'}
                  </p>
                  <button
                    className={`h6-info-add-btn${added ? ' added' : ''}`}
                    onClick={() => { if (!added) { addFromTMDB(m); setInfoMovie(null); } }}
                    disabled={added}
                  >
                    {added ? '✓ Already in watchlist' : '＋ Add to watchlist'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        );
      })()}

      {/* lightbox */}
      {lb !== null && (
        <div className="h6-lb" onClick={() => setLb(null)}>
          <button className="h6-lb-x" onClick={e => { e.stopPropagation(); setLb(null); }}>✕</button>
          <img key={lb} src={ALL_LB[lb]} alt="" onClick={e => e.stopPropagation()} />
          <button className="h6-lb-arr l" onClick={e => { e.stopPropagation(); setLb(i => (i - 1 + ALL_LB.length) % ALL_LB.length); }}>‹</button>
          <button className="h6-lb-arr r" onClick={e => { e.stopPropagation(); setLb(i => (i + 1) % ALL_LB.length); }}>›</button>
          <span className="h6-lb-cnt">{lb + 1} / {ALL_LB.length}</span>
        </div>
      )}
    </div>
  );
}
