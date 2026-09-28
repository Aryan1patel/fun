import { useCallback, useEffect, useRef, useState } from 'react';
import { db } from '../firebase';
import { doc, onSnapshot, setDoc, updateDoc } from 'firebase/firestore';

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
  .h6-wl-divider {
    padding: 10px clamp(20px,5vw,60px);
    font-family: var(--serif); font-size: 10px; letter-spacing: 3px;
    color: var(--ink3); text-transform: uppercase;
    border-top: 1px solid rgba(139,26,26,.1);
    border-bottom: 1px solid rgba(139,26,26,.07);
  }
`;

/* ── Firestore document ref ── */
const WATCHLIST_DOC = 'watchlist/shared';

const QUOTES = [
  <>I miss you<br />in the smallest moments<br /><em>the most</em></>,

  <>You're my favorite<br /><em>notification</em></>,

  <>I still get excited<br />to talk to <em>you</em></>,

  <>You make<br /><em>distance</em> feel temporary</>,

  <>If love had<br />a favorite person,<br />it would be <em>you</em></>,

  <>these songs make me<br />think of <em>you</em></>,

];

const SONGS = [
  { title: 'Apocalypse',         artist: 'Cigarettes After Sex', url: 'https://open.spotify.com/track/5Y9P0dGRB0QIIA9FbLCPjL' },
  { title: 'Those Eyes',         artist: 'New West',             url: 'https://open.spotify.com/track/3bNv3a8PNpSAYSFdFmiGDw' },
  { title: 'Until I Found You',  artist: 'Stephen Sanchez',      url: 'https://open.spotify.com/track/0dqrGbzAEDPRSDbGoIJhRF' },
  { title: 'I Like Me Better',   artist: 'Lauv',                 url: 'https://open.spotify.com/track/2zFnMxXqoQ64hWxBSDqsbl' },
  { title: 'Sweet Creature',     artist: 'Harry Styles',         url: 'https://open.spotify.com/track/7wGoVu4Dady5GV0Sv4UIsx' },
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
];

export default function Ch9Home({ active, goToChapter, user, isCute }) {
  const [qIdx, setQIdx] = useState(0);
  const [lb, setLb]     = useState(null);

  /* ── movie watchlist state (Firestore = syncs across devices) ── */
  const [movies,   setMovies]   = useState([]);
  const [olPicks,  setOlPicks]  = useState([]);
  const [ashPicks, setAshPicks] = useState([]);
  const [fsReady,  setFsReady]  = useState(false);
  const [newTitle, setNewTitle] = useState('');
  /* ── TMDB browser ── */
  const [activeTab,   setActiveTab]   = useState('trending');
  const [query,       setQuery]       = useState('');
  const [tmdbMovies,  setTmdbMovies]  = useState([]);
  const [tmdbLoading, setTmdbLoading] = useState(false);

  /* rotate quote */
  useEffect(() => {
    if (!active) return;
    const id = setInterval(() => setQIdx(i => (i + 1) % QUOTES.length), 4500);
    return () => clearInterval(id);
  }, [active]);

  /* ── Firestore real-time listener ── */
  useEffect(() => {
    const ref = doc(db, 'watchlist', 'shared');
    // ensure document exists on first load
    setDoc(ref, { movies: [], picks_oliver: [], picks_ashley: [] }, { merge: true });
    const unsub = onSnapshot(ref, snap => {
      if (!snap.exists()) return;
      const data = snap.data();
      setMovies(data.movies       || []);
      setOlPicks(data.picks_oliver || []);
      setAshPicks(data.picks_ashley|| []);
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
      movies:        movies.filter(m => m.id !== id),
      picks_oliver:  olPicks.filter(x => x !== id),
      picks_ashley:  ashPicks.filter(x => x !== id),
    });
  }, [movies, olPicks, ashPicks]);

  const matches = movies.filter(m => olPicks.includes(m.id) && ashPicks.includes(m.id));

  /* ── TMDB fetch ── */
  const fetchTMDB = useCallback(async (tab, q) => {
    setTmdbLoading(true);
    try {
      let url;
      if (q.trim()) {
        url = `https://api.themoviedb.org/3/search/multi?api_key=${TMDB_KEY}&query=${encodeURIComponent(q.trim())}&page=1&include_adult=false`;
      } else if (tab === 'trending') {
        url = `https://api.themoviedb.org/3/trending/all/week?api_key=${TMDB_KEY}`;
      } else if (tab === 'movies') {
        url = `https://api.themoviedb.org/3/discover/movie?api_key=${TMDB_KEY}&sort_by=popularity.desc&page=1`;
      } else if (tab === 'tv') {
        url = `https://api.themoviedb.org/3/discover/tv?api_key=${TMDB_KEY}&sort_by=popularity.desc&page=1`;
      } else {
        url = `https://api.themoviedb.org/3/discover/movie?api_key=${TMDB_KEY}&with_genres=${tab}&sort_by=popularity.desc&page=1`;
      }
      const res  = await fetch(url);
      const data = await res.json();
      setTmdbMovies((data.results || []).filter(m => m.poster_path && m.media_type !== 'person'));
    } catch {
      setTmdbMovies([]);
    }
    setTmdbLoading(false);
  }, []);

  useEffect(() => {
    if (!active) return;
    const t = setTimeout(() => fetchTMDB(activeTab, query), query ? 450 : 0);
    return () => clearTimeout(t);
  }, [active, activeTab, query, fetchTMDB]);

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
            <span className="mid"><b>songs</b> that <em>remind me</em> of <u>you</u></span>
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
            <a key={i} className="h6-song-row" href={s.url} target="_blank" rel="noopener noreferrer">
              <span className="h6-song-num">{i + 1}</span>
              <span className="h6-song-dot">♪</span>
              <div className="h6-song-info">
                <div className="h6-song-name">{s.title}</div>
                <div className="h6-song-artist">{s.artist}</div>
              </div>
              <span className="h6-song-open">open ↗</span>
            </a>
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
                ? <>{user === 'oliver' ? '❄️' : '🌸'} You are <b>{user === 'oliver' ? 'Oliver' : 'Ashley'}</b> · Make our list then pick 3 from those · matches show below!</>
                : 'Add movies & shows, each pick 3, see what matches!'}
            </p>
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
                    onClick={() => !added && addFromTMDB(m)}
                    title={added ? 'Already in watchlist' : `Add "${title}"`}
                  >
                    <img className="h6-tmdb-poster" src={`${TMDB_IMG}${m.poster_path}`} alt={title} loading="lazy" />
                    <div className="h6-tmdb-info">
                      <p className="h6-tmdb-title">{title}</p>
                      <div className="h6-tmdb-meta">
                        {rating && parseFloat(rating) > 0 && <span className="h6-tmdb-rating">★ {rating}</span>}
                        <span className="h6-tmdb-yr">{year}</span>
                      </div>
                    </div>
                    {added
                      ? <span className="h6-tmdb-added">✓ Added</span>
                      : <div className="h6-tmdb-add">
                          <svg viewBox="0 0 24 24" aria-hidden="true"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
                          Add to list
                        </div>
                    }
                  </div>
                );
              })}
            </div>
          </div>

          {/* watchlist divider */}
          <div className="h6-wl-divider">Our Watchlist</div>

          {/* manual add row */}
          {/* <div className="h6-add-row">
            <input
              className="h6-add-in"
              placeholder="Or type any title manually..."
              value={newTitle}
              onChange={e => setNewTitle(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && addMovie()}
            />
            <button className="h6-add-btn" onClick={addMovie}>+ Add</button>
          </div> */}

          {/* list */}
          {movies.length === 0
            ? <p className="h6-wl-empty">Nothing on the list yet — add something above! 🍿</p>
            : <div className="h6-movie-list">
                {movies.map(m => {
                  const olOn  = olPicks.includes(m.id);
                  const ashOn = ashPicks.includes(m.id);
                  const isMatch = olOn && ashOn;
                  const myOn    = myPicks.includes(m.id);
                  const myFull  = myPicks.length >= 3 && !myOn;

                  return (
                    <div key={m.id} className={`h6-movie-row${isMatch ? ' is-match' : ''}`}>
                      {isMatch && <span className="h6-match-badge">MATCH ✦</span>}
                      <span className="h6-movie-title">{m.title}</span>
                      <div className="h6-pick-btns">
                        {/* Oliver pick */}
                        <button
                          className={`h6-pick-btn${olOn ? ' active' : ''}${user === 'oliver' ? ' mine' : ' readonly'}${user === 'oliver' && myFull ? ' capped' : ''}`}
                          onClick={() => user === 'oliver' && togglePick(m.id)}
                          title={user === 'oliver' ? (myFull ? 'Max 3 picks' : 'Toggle your pick') : "Oliver's pick"}
                        >❄️ {olOn ? '✓' : '○'}</button>
                        {/* Ashley pick */}
                        <button
                          className={`h6-pick-btn${ashOn ? ' active' : ''}${user === 'ashley' ? ' mine' : ' readonly'}${user === 'ashley' && myFull ? ' capped' : ''}`}
                          onClick={() => user === 'ashley' && togglePick(m.id)}
                          title={user === 'ashley' ? (myFull ? 'Max 3 picks' : 'Toggle your pick') : "Ashley's pick"}
                        >🌸 {ashOn ? '✓' : '○'}</button>
                      </div>
                      <button className="h6-del-btn" onClick={() => removeMovie(m.id)} title="Remove">×</button>
                    </div>
                  );
                })}
              </div>
          }

          {/* summary */}
          <div className="h6-wl-summary">
            <span>❄️ Oliver: <b>{olPicks.length}/3</b> picked</span>
            <span>🌸 Ashley: <b>{ashPicks.length}/3</b> picked</span>
          </div>

          {/* matches */}
          <div className="h6-matches">
            <p className="h6-matches-ttl">
              {matches.length > 0 ? '✦ Tonight we watch' : 'Keep picking...'}
            </p>
            {matches.length > 0
              ? <div className="h6-matches-chips">
                  {matches.map(m => <span key={m.id} className="h6-match-chip">{m.title}</span>)}
                </div>
              : <p className="h6-no-match">Keep picking — your overlap will appear here 🍿</p>
            }
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
