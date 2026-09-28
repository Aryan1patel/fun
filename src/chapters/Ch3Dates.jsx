import { useLayoutEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import chatGptImg from '../assets/chatgpt.png';
import mc1 from '../assets/pics/mincraft/WhatsApp Image 2026-09-28 at 19.04.06 (1).jpeg';
import mc2 from '../assets/pics/mincraft/WhatsApp Image 2026-09-28 at 19.04.06 (2).jpeg';
import mc3 from '../assets/pics/mincraft/WhatsApp Image 2026-09-28 at 19.04.06.jpeg';
import mc4 from '../assets/pics/mincraft/WhatsApp Image 2026-09-28 at 19.04.07 (1).jpeg';
import mc5 from '../assets/pics/mincraft/WhatsApp Image 2026-09-28 at 19.04.07.jpeg';
import mc6 from '../assets/pics/mincraft/WhatsApp Image 2026-09-28 at 19.04.08.jpeg';

gsap.registerPlugin(ScrollTrigger);

/* ─────────────────────────────────────────────────
   Chapter 3 — Important Dates (Greek / Hermes edition)

   Setup:  npm i gsap
   Optional: add this to index.html <head> so fonts load early
   <link href="https://fonts.googleapis.com/css2?family=Alegreya:ital,wght@0,400;0,500;1,400;1,500&family=Marcellus&display=swap" rel="stylesheet">

   This chapter scrolls INSIDE its own container (.ch3-root), so it
   never fights your chapter system. If your site has a header, change
   --ch3-h below (e.g. calc(100dvh - 64px)).

   COMIC: put oliver-asks.png in your /public folder (or change
   COMIC_SRC below). It appears right after Chapter II.

   MINECRAFT GALLERY: put mc1.jpeg … mc6.jpeg in src/assets/.
   Edit captions / order in MC_PICS below.

   Shared class still used: nav-btn
───────────────────────────────────────────────── */
const STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Alegreya:ital,wght@0,400;0,500;1,400;1,500&family=Marcellus&display=swap');

  .ch3-root {
    --ch3-h: 100dvh;
    --ch3-night: #0a1230;
    --ch3-marble: #efe8da;
    --ch3-marble-2: rgba(239,232,218,.82);
    --ch3-bronze: #d1a15a;
    --ch3-olive: #a9bb5c;
    --ch3-rose: #f08ba8;
    --ch3-display: "Marcellus", Georgia, serif;
    --ch3-body: "Alegreya", Georgia, "Times New Roman", serif;

    position: relative; width: 100%; height: var(--ch3-h);
    overflow-x: hidden; overflow-y: auto; overscroll-behavior: contain;
    background: var(--ch3-night); color: var(--ch3-marble);
    font-family: var(--ch3-body); font-size: 18px;
    -webkit-font-smoothing: antialiased; scrollbar-width: thin;
  }
  .ch3-root *, .ch3-root *::before, .ch3-root *::after { box-sizing: border-box; }
  .ch3-root h1, .ch3-root h2, .ch3-root h3, .ch3-root p { margin: 0; }
  .ch3-root :focus-visible { outline: 2px solid var(--ch3-bronze); outline-offset: 4px; }

  /* ── Ashley light theme: rose-gold dawn ── */
  .ch3-root.ashley {
    --ch3-night:    #fff3f1;
    --ch3-marble:   #2d1233;               /* deep plum text */
    --ch3-marble-2: rgba(45,18,51,.74);
    --ch3-bronze:   #c2416f;               /* rose-gold accent, readable on light */
    --ch3-olive:    #7a9a3f;               /* sage instead of neon olive */
    --ch3-rose:     #ec4f8b;
    --ch3-gold:     #d99a3d;
  }

  /* sky: blush → peach → lilac, then a lavender-rose dusk as you scroll */
  .ch3-root.ashley .ch3-sky-night { background: linear-gradient(180deg, #ffe3ec 0%, #ffd6e4 38%, #ffe4d6 72%, #f7d5ee 100%); }
  .ch3-root.ashley .ch3-sky-dusk  { background: linear-gradient(180deg, #e6d4ff 0%, #f6c4e6 50%, #ffc7b4 100%); }
  .ch3-root.ashley .ch3-sky-glow  { background: radial-gradient(75% 50% at 50% 100%, rgba(255,190,120,.55), rgba(236,79,139,.25) 45%, transparent 78%); }
  .ch3-root.ashley .ch3-horizon   { background: radial-gradient(60% 34% at 50% 78%, rgba(255,196,130,.55), rgba(236,79,139,.2) 45%, transparent 72%); }

  /* stars become little golden-white sparkles */
  .ch3-root.ashley .ch3-star-group i { background: #fff; box-shadow: 0 0 7px 1px rgba(236,79,139,.55); }

  /* mountains: layered lavender / mauve instead of navy */
  .ch3-root.ashley .ch3-ridge-far  > path { fill: #e0c3ec; }
  .ch3-root.ashley .ch3-ridge-mid  > path { fill: #c99ddb; }
  .ch3-root.ashley .ch3-ridge-near > path { fill: #a06bbd; }
  .ch3-root.ashley .ch3-ridge-near g path { fill: #6b3a8a; }
  .ch3-root.ashley .ch3-temple { filter: drop-shadow(0 0 18px rgba(255,170,120,.75)) drop-shadow(0 0 6px rgba(236,79,139,.45)); }
  .ch3-root.ashley .ch3-temple rect,
  .ch3-root.ashley .ch3-temple polygon { fill: #fff8f0; stroke: #d4a017; stroke-width: 1px; paint-order: stroke fill; }

  /* hero bits */
  .ch3-root.ashley .ch3-cad path { stroke: var(--ch3-gold); }
  .ch3-root.ashley .ch3-amp { color: var(--ch3-rose); }
  .ch3-root.ashley .ch3-h1 { text-shadow: 0 2px 30px rgba(255,255,255,.6); }

  /* big outlined numerals, feathers, thread */
  .ch3-root.ashley .ch3-bignum { -webkit-text-stroke-color: rgba(236,79,139,.22); }
  .ch3-root.ashley .ch3-feather { fill: rgba(236,79,139,.2); }
  .ch3-root.ashley .ch3-thread .ch3-full { stroke: rgba(194,65,111,.3); }
  .ch3-root.ashley .ch3-thread .ch3-done { stroke: var(--ch3-rose); filter: drop-shadow(0 0 6px rgba(236,79,139,.6)); }

  /* winged message */
  .ch3-root.ashley .ch3-fg path { fill: #fff; stroke: rgba(217,154,61,.95); }
  .ch3-root.ashley .ch3-marker rect { fill: #fffaf4; }
  .ch3-root.ashley .ch3-marker svg { filter: drop-shadow(0 6px 14px rgba(194,65,111,.35)); }

  /* rules, small stars in chapter I */
  .ch3-root.ashley .ch3-rule.ch3-both  { background: linear-gradient(90deg, var(--ch3-gold), var(--ch3-rose)); }
  .ch3-root.ashley .ch3-rule.ch3-olive { background: var(--ch3-olive); }
  .ch3-root.ashley .ch3-rule.ch3-rose  { background: var(--ch3-rose); }
  .ch3-root.ashley .ch3-visual g[fill="#efe8da"] { fill: var(--ch3-rose); }
  .ch3-root.ashley .ch3-lbl { fill: var(--ch3-marble); }
  .ch3-root.ashley .ch3-lbl.ch3-b { fill: var(--ch3-bronze); }

  /* greek-key border in rose-gold (the old hue-rotate hack looked muddy) */
  .ch3-root.ashley .ch3-meander {
    filter: none; opacity: .75;
    background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='20' height='16' viewBox='0 0 20 16'%3E%3Cpath d='M0 15H4V2H18V15H20M18 12H10V7H14' fill='none' stroke='%23c2416f' stroke-width='1.5'/%3E%3C/svg%3E") repeat-x;
  }

  /* cards / frames: frosted white glass with soft pink shadows */
  .ch3-root.ashley .ch3-tablet {
    border-color: rgba(194,65,111,.35); background: rgba(255,255,255,.62);
    box-shadow: 0 10px 30px rgba(236,79,139,.15); backdrop-filter: blur(6px);
  }
  .ch3-root.ashley .ch3-comic-frame,
  .ch3-root.ashley .ch3-gal-frame {
    background: rgba(255,255,255,.7); border-color: rgba(194,65,111,.4);
    box-shadow: 0 24px 60px rgba(150,60,110,.2), 0 0 50px rgba(236,79,139,.18);
  }
  .ch3-root.ashley .ch3-gal-arrow { background: rgba(255,255,255,.9); color: var(--ch3-bronze); border-color: rgba(194,65,111,.5); }
  .ch3-root.ashley .ch3-gal-arrow:hover:not(:disabled) { background: rgba(236,79,139,.18); }
  .ch3-root.ashley .ch3-gal-dot { border-color: var(--ch3-bronze); }
  .ch3-root.ashley .ch3-gal-dot.ch3-on { background: var(--ch3-rose); border-color: var(--ch3-rose); }

  /* heart + stamp */
  .ch3-root.ashley .ch3-heart-glow { background: radial-gradient(closest-side, rgba(255,150,190,.75), transparent 72%); }
  .ch3-root.ashley .ch3-blk { background: linear-gradient(160deg, #ff7fae, #ec4f8b); }
  .ch3-root.ashley .ch3-stamp { color: var(--ch3-bronze); }

  /* ending */
  .ch3-root.ashley .ch3-end h2 {
    background: linear-gradient(90deg, #d99a3d, #ec4f8b 55%, #a855f7);
    -webkit-background-clip: text; background-clip: text; color: transparent;
  }
  .ch3-root.ashley .ch3-again { color: var(--ch3-bronze); border-color: rgba(194,65,111,.5); }
  .ch3-root.ashley .ch3-again:hover { color: var(--ch3-marble); border-color: var(--ch3-marble); }

  .ch3-root.ashley dialog.ch3-zoom { background: rgba(255,238,246,.97); }
  .ch3-root.ashley dialog.ch3-zoom p { color: var(--ch3-marble-2); }

  /* ── Ashley: a little more pop ── */
  .ch3-root.ashley .ch3-text { color: rgba(45,18,51,.88); }
  .ch3-root.ashley .ch3-copy h2,
  .ch3-root.ashley .ch3-road h2 { text-shadow: 0 1px 0 rgba(255,255,255,.7); }
  .ch3-root.ashley .ch3-visual svg { filter: drop-shadow(0 6px 14px rgba(194,65,111,.25)); }

  /* chapter I sparkles + line */
  .ch3-root.ashley .ch3-sp-o { fill: #6f9a2f; stroke: #fff; stroke-width: 2.5; paint-order: stroke fill; }
  .ch3-root.ashley .ch3-sp-a { fill: #e03d82; stroke: #fff; stroke-width: 2.5; paint-order: stroke fill; }
  .ch3-root.ashley .ch3-c1glow { fill-opacity: .36; }
  .ch3-root.ashley #ch3-c1line { stroke: #d9892b; stroke-width: 2.4; }
  .ch3-root.ashley .ch3-c1hello { fill: #c2416f; font-size: 22px; }

  /* chapter II olive branch */
  .ch3-root.ashley #ch3-stem { stroke: #5f7f26; stroke-width: 4.5; }
  .ch3-root.ashley .ch3-leaf { fill: #8fb03a; }
  .ch3-root.ashley .ch3-olive { fill: #3f5a1a; }

  /* thread, numerals, stars, cards */
  .ch3-root.ashley .ch3-thread .ch3-full { stroke: rgba(194,65,111,.5); }
  .ch3-root.ashley .ch3-thread .ch3-done { stroke-width: 2.8; }
  .ch3-root.ashley .ch3-bignum { -webkit-text-stroke-color: rgba(236,79,139,.38); }
  .ch3-root.ashley .ch3-star-group i { box-shadow: 0 0 9px 2px rgba(236,79,139,.6); }
  .ch3-root.ashley .ch3-tablet { border-color: rgba(194,65,111,.55); background: rgba(255,255,255,.78); }
  .ch3-root.ashley .ch3-comic-frame,
  .ch3-root.ashley .ch3-gal-frame { border-color: rgba(194,65,111,.6); background: rgba(255,255,255,.82); }
  .ch3-root.ashley .ch3-marker svg { filter: drop-shadow(0 8px 16px rgba(194,65,111,.5)); }
  .ch3-root.ashley .ch3-blk {
    box-shadow: inset 0 var(--bevel,4px) 0 rgba(255,255,255,.4),
                inset 0 calc(var(--bevel,4px) * -1) 0 rgba(120,20,70,.28),
                0 3px 8px rgba(194,65,111,.3);
  }

  /* sky (sticky so it stays put while the chapter scrolls) */
  .ch3-sky { position: sticky; top: 0; height: var(--ch3-h); margin-bottom: calc(var(--ch3-h) * -1); z-index: 0; overflow: hidden; pointer-events: none; }
  .ch3-sky > div { position: absolute; inset: 0; }
  .ch3-sky-night { background: linear-gradient(180deg, #070c26 0%, #0f1c46 58%, #1b2d66 100%); }
  .ch3-sky-dusk  { background: linear-gradient(180deg, #170f37 0%, #3a2258 55%, #7a3160 100%); opacity: 0; }
  .ch3-sky-glow  { background: radial-gradient(70% 45% at 50% 100%, rgba(240,139,168,.42), rgba(209,161,90,.18) 45%, transparent 75%); opacity: 0; }
  .ch3-stars { overflow: hidden; }
  .ch3-star-group { position: absolute; left: 0; right: 0; top: 0; height: calc(var(--ch3-h) * 2.6); }
  .ch3-star-group i { position: absolute; display: block; border-radius: 50%; background: var(--ch3-marble); }
  @keyframes ch3-twinkle { 50% { opacity: .12; } }

  /* hero */
  .ch3-hero-wrap { position: relative; height: calc(var(--ch3-h) * 2.4); z-index: 2; }
  .ch3-hero { position: sticky; top: 0; height: var(--ch3-h); overflow: hidden; }
  .ch3-horizon { position: absolute; inset: 0; background: radial-gradient(60% 34% at 50% 78%, rgba(240,139,168,.28), transparent 70%); }
  .ch3-ridge { position: absolute; inset: 0; width: 100%; height: 100%; }
  .ch3-temple { filter: drop-shadow(0 0 16px rgba(239,232,218,.4)); }
  .ch3-hero-content {
    position: absolute; inset: 0; display: flex; flex-direction: column;
    align-items: center; justify-content: center; text-align: center;
    padding: 0 6vw calc(var(--ch3-h) * .48);
  }
  .ch3-cad { height: clamp(96px, calc(var(--ch3-h) * .17), 150px); width: auto; margin-bottom: 1.4rem; overflow: visible; }
  .ch3-cad path { stroke-linecap: butt; }
  .ch3-h1 {
    font-family: var(--ch3-display); font-weight: 400;
    font-size: clamp(3.2rem, 11vw, 8.6rem); line-height: .96; letter-spacing: .01em;
    display: flex; flex-direction: column; align-items: center; color: var(--ch3-marble);
  }
  .ch3-line { display: inline-flex; align-items: baseline; gap: .28em; }
  .ch3-m { display: inline-block; overflow: hidden; padding: .08em 0 .14em; margin: -.08em 0 -.14em; }
  .ch3-ch { display: inline-block; }
  .ch3-amp { font-family: var(--ch3-body); font-style: italic; font-size: .62em; color: var(--ch3-bronze); }
  .ch3-tagline { margin-top: 1.4rem; font-size: clamp(1.1rem, 2vw, 1.4rem); color: var(--ch3-marble-2); font-style: italic; }
  .ch3-cue {
    position: absolute; left: 50%; bottom: calc(var(--ch3-h) * .05); transform: translateX(-50%);
    display: flex; flex-direction: column; align-items: center; gap: .6rem;
    font-size: .95rem; color: var(--ch3-marble-2); font-style: italic;
  }
  .ch3-cue::after { content: ""; width: 1px; height: 38px; background: linear-gradient(var(--ch3-bronze), transparent); animation: ch3-cue 2.2s ease-in-out infinite; transform-origin: top; }
  @keyframes ch3-cue { 0%,100% { transform: scaleY(.3); opacity: .4; } 50% { transform: scaleY(1); opacity: 1; } }
  .ch3-hero-note {
    position: absolute; left: 50%; top: 30%; transform: translateX(-50%);
    width: min(30ch, 86%); text-align: center;
    font-size: clamp(1.5rem, 3.4vw, 2.5rem); line-height: 1.25; font-style: italic;
  }

  /* story */
  .ch3-story { position: relative; z-index: 2; overflow-x: clip; }
  .ch3-thread { position: absolute; left: 0; top: 0; z-index: 0; pointer-events: none; overflow: visible; }
  .ch3-thread .ch3-full { fill: none; stroke: rgba(209,161,90,.28); stroke-width: 1.4; stroke-dasharray: 2 9; }
  .ch3-thread .ch3-done { fill: none; stroke: var(--ch3-bronze); stroke-width: 2; filter: drop-shadow(0 0 6px rgba(209,161,90,.7)); }
  .ch3-feathers { position: absolute; inset: 0; z-index: 0; pointer-events: none; }
  .ch3-feather { position: absolute; fill: rgba(239,232,218,.17); }

  .ch3-rail { position: sticky; top: 0; height: 0; z-index: 1; }
  .ch3-marker {
    position: absolute; left: 0; top: calc(var(--ch3-h) * .5); width: 128px; height: 68px;
    margin: -34px 0 0 -64px; pointer-events: none; opacity: 0; will-change: transform;
  }
  .ch3-marker svg { width: 100%; height: 100%; overflow: visible; transition: transform .7s cubic-bezier(.2,.8,.2,1); filter: drop-shadow(0 6px 14px rgba(0,0,0,.45)); }
  .ch3-fg path { fill: var(--ch3-marble); stroke: rgba(184,138,70,.9); stroke-width: .7; }
  .ch3-wl, .ch3-wr { transition: opacity .5s; }
  .ch3-marker.ch3-delivered svg { transform: scale(1.4); }
  .ch3-marker.ch3-delivered .ch3-wl, .ch3-marker.ch3-delivered .ch3-wr { opacity: 0; }

  .ch3-chapter, .ch3-scene { position: relative; }
  .ch3-chapter { min-height: var(--ch3-h); display: flex; align-items: center; padding: calc(var(--ch3-h) * .18) 0; }
  .ch3-inner {
    position: relative; z-index: 2; width: min(1120px, 90%); margin: 0 auto;
    display: grid; grid-template-columns: 1fr 1fr; gap: clamp(3rem, 12vw, 10rem); align-items: center;
  }
  .ch3-flip .ch3-copy { order: 2; }
  .ch3-scene { height: calc(var(--ch3-h) * 2.8); }
  .ch3-stick { position: sticky; top: 0; height: var(--ch3-h); display: flex; align-items: center; }

  .ch3-bignum {
    position: absolute; z-index: 0; top: 50%; margin-top: -.5em; line-height: 1;
    font-family: var(--ch3-display); font-size: clamp(14rem, 40vw, 34rem);
    color: transparent; -webkit-text-stroke: 1px rgba(239,232,218,.13);
    pointer-events: none; user-select: none;
  }
  .ch3-bignum.ch3-r { right: -2%; }
  .ch3-bignum.ch3-l { left: -2%; }

  .ch3-when { font-size: 1.05rem; color: var(--ch3-bronze); letter-spacing: .02em; }
  .ch3-copy h2, .ch3-road h2 { font-family: var(--ch3-display); font-weight: 400; font-size: clamp(2rem, 4.6vw, 3.8rem); line-height: 1.06; color: var(--ch3-marble); }
  .ch3-copy h2 { margin-top: .5rem; }
  .ch3-rule { width: 72px; height: 2px; margin: 1.2rem 0 1.4rem; }
  .ch3-rule.ch3-both  { background: linear-gradient(90deg, var(--ch3-olive), var(--ch3-rose)); }
  .ch3-rule.ch3-olive { background: var(--ch3-olive); }
  .ch3-rule.ch3-rose  { background: var(--ch3-rose); }
  .ch3-lede { font-style: italic; font-size: clamp(1.55rem, 3.3vw, 2.5rem); line-height: 1.24; margin-bottom: 1.4rem; max-width: 20ch; }
  .ch3-text { font-size: clamp(1.1rem, 1.6vw, 1.3rem); line-height: 1.65; color: var(--ch3-marble-2); max-width: 34rem; }

  .ch3-visual svg { width: 100%; height: auto; display: block; overflow: visible; }
  .ch3-lbl { font-family: var(--ch3-body); font-style: italic; font-size: 19px; fill: var(--ch3-marble); }
  .ch3-lbl.ch3-b { fill: var(--ch3-bronze); }
  .ch3-spark { transform-box: fill-box; transform-origin: center; transform: scale(var(--s, 1)); }
  .ch3-leaf, .ch3-olive { transform-box: fill-box; transform: scale(var(--s, 1)); }
  .ch3-leaf { transform-origin: 0 50%; }
  .ch3-olive { transform-origin: center; }
  .ch3-pulse { transform-box: fill-box; transform-origin: center; animation: ch3-pulse 1.05s ease-out infinite; }
  @keyframes ch3-pulse { from { transform: scale(.6); opacity: .8; } to { transform: scale(2.6); opacity: 0; } }

  /* pixel heart */
  .ch3-heart-wrap { position: relative; display: grid; place-items: center; }
  .ch3-heart-glow { position: absolute; inset: -20%; background: radial-gradient(closest-side, rgba(240,139,168,.5), transparent 72%); opacity: 0; }
  .ch3-heart { --b: clamp(22px, 3.9vw, 40px); position: relative; display: grid; grid-template-columns: repeat(9, var(--b)); grid-auto-rows: var(--b); gap: 2px; }
  .ch3-blk {
    background: var(--ch3-rose); filter: brightness(var(--tone, 1));
    box-shadow: inset 0 var(--bevel, 4px) 0 rgba(255,255,255,.3), inset 0 calc(var(--bevel, 4px) * -1) 0 rgba(0,0,0,.2), inset 0 0 0 1px rgba(0,0,0,.18);
  }
  .ch3-blk.ch3-off { visibility: hidden; }
  .ch3-stamp { margin-top: 1.6rem; font-family: var(--ch3-display); font-size: clamp(1.4rem, 2.6vw, 2rem); text-align: center; color: var(--ch3-rose); }

  /* road ahead */
  .ch3-meander { height: 16px; opacity: .6; background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='20' height='16' viewBox='0 0 20 16'%3E%3Cpath d='M0 15H4V2H18V15H20M18 12H10V7H14' fill='none' stroke='%23d1a15a' stroke-width='1.5'/%3E%3C/svg%3E") repeat-x; }
  .ch3-road { min-height: var(--ch3-h); display: flex; align-items: center; padding: calc(var(--ch3-h) * .18) 0; position: relative; }
  .ch3-road-inner { position: relative; z-index: 2; width: min(1120px, 90%); margin: 0 auto; }
  .ch3-road .ch3-text { margin-top: 1rem; }
  .ch3-tablets { list-style: none; padding: 0; margin: 3rem 0 0; display: grid; grid-template-columns: repeat(2, 1fr); gap: 1.25rem; max-width: 760px; }
  .ch3-tablet { border: 1px solid rgba(209,161,90,.4); background: rgba(10,18,48,.4); padding: 0 0 1.5rem; }
  .ch3-tablet .ch3-meander { height: 14px; margin-bottom: 1.3rem; opacity: .45; }
  .ch3-tablet h3 { font-family: var(--ch3-display); font-weight: 400; font-size: 1.3rem; padding: 0 1.4rem; color: var(--ch3-marble); }
  .ch3-tablet p { padding: 0 1.4rem; margin-top: .5rem; font-style: italic; color: var(--ch3-marble-2); }

  /* comic — the night it was delivered */
  .ch3-comic { position: relative; z-index: 2; padding: calc(var(--ch3-h) * .1) 0 calc(var(--ch3-h) * .14); }
  .ch3-comic-inner { width: min(1000px, 92%); margin: 0 auto; text-align: center; }
  .ch3-comic-frame { margin: 1.2rem 0 0; padding: 10px; background: rgba(10,18,48,.55); border: 1px solid rgba(209,161,90,.5); box-shadow: 0 30px 80px rgba(0,0,0,.5), 0 0 60px rgba(240,139,168,.14); }
  .ch3-comic-frame .ch3-meander { height: 12px; margin: 0 0 10px; opacity: .5; }
  .ch3-comic-btn { all: unset; display: block; width: 100%; cursor: zoom-in; }
  .ch3-comic-btn:focus-visible { outline: 2px solid var(--ch3-bronze); outline-offset: 4px; }
  .ch3-comic-img { display: block; width: 100%; height: auto; aspect-ratio: 3 / 2; }
  .ch3-comic-cap { margin-top: 1.2rem; font-style: italic; color: var(--ch3-marble-2); font-size: clamp(1.05rem, 2vw, 1.3rem); }
  dialog.ch3-zoom { margin: 0; inset: 0; width: 100vw; height: 100vh; max-width: none; max-height: none; border: 0; padding: 3vw; background: rgba(4,7,22,.95); cursor: zoom-out; }
  dialog.ch3-zoom[open] { display: grid; place-items: center; }
  dialog.ch3-zoom img { max-width: 100%; max-height: 92vh; }
  dialog.ch3-zoom p { position: absolute; bottom: 2vh; left: 0; right: 0; text-align: center; font-style: italic; color: rgba(239,232,218,.82); font-size: .95rem; }

  /* minecraft gallery */
  .ch3-gal { position: relative; z-index: 2; padding: calc(var(--ch3-h) * .1) 0 calc(var(--ch3-h) * .14); }
  .ch3-gal-inner { width: min(1000px, 92%); margin: 0 auto; text-align: center; }
  .ch3-gal-frame { position: relative; margin: 1.2rem 0 0; padding: 10px; background: rgba(10,18,48,.55); border: 1px solid rgba(209,161,90,.5); box-shadow: 0 30px 80px rgba(0,0,0,.5), 0 0 60px rgba(240,139,168,.14); }
  .ch3-gal-frame .ch3-meander { height: 12px; margin: 0 0 10px; opacity: .5; }
  .ch3-gal-viewport { position: relative; }
  .ch3-gal-track { display: flex; overflow-x: auto; scroll-snap-type: x mandatory; scrollbar-width: none; -webkit-overflow-scrolling: touch; }
  .ch3-gal-track::-webkit-scrollbar { display: none; }
  .ch3-gal-slide { all: unset; flex: 0 0 100%; scroll-snap-align: center; cursor: zoom-in; display: block; }
  .ch3-gal-slide:focus-visible { outline: 2px solid var(--ch3-bronze); outline-offset: -4px; }
  .ch3-gal-slide img { display: block; width: 100%; height: auto; aspect-ratio: 1400 / 636; object-fit: cover; }
  .ch3-gal-arrow {
    position: absolute; top: 50%; transform: translateY(-50%); z-index: 3;
    width: 44px; height: 44px; border-radius: 50%; cursor: pointer;
    background: rgba(10,18,48,.75); color: var(--ch3-bronze);
    border: 1px solid rgba(209,161,90,.6); font-size: 1.4rem; line-height: 1;
    display: grid; place-items: center; transition: opacity .3s, background .3s;
  }
  .ch3-gal-arrow:hover:not(:disabled) { background: rgba(209,161,90,.25); }
  .ch3-gal-arrow:disabled { opacity: .25; cursor: default; }
  .ch3-gal-prev { left: 10px; }
  .ch3-gal-next { right: 10px; }
  .ch3-gal-bar { display: flex; align-items: center; justify-content: center; gap: 1rem; margin-top: 12px; }
  .ch3-gal-dots { display: flex; gap: .55rem; }
  .ch3-gal-dot { width: 9px; height: 9px; border-radius: 50%; padding: 0; border: 1px solid var(--ch3-bronze); background: transparent; cursor: pointer; transition: background .3s, transform .3s; }
  .ch3-gal-dot.ch3-on { background: var(--ch3-bronze); transform: scale(1.25); }
  .ch3-gal-count { font-style: italic; color: var(--ch3-marble-2); font-size: .95rem; }
  .ch3-gal-cap { margin-top: 1.2rem; font-style: italic; color: var(--ch3-marble-2); font-size: clamp(1.05rem, 2vw, 1.3rem); min-height: 1.6em; }
  @media (max-width: 820px) { .ch3-gal-arrow { width: 36px; height: 36px; font-size: 1.1rem; } }

  /* end */
  .ch3-end { min-height: var(--ch3-h); display: flex; align-items: center; justify-content: center; text-align: center; position: relative; padding: calc(var(--ch3-h) * .16) 6%; }
  .ch3-end-inner { position: relative; z-index: 2; display: flex; flex-direction: column; align-items: center; gap: 1.6rem; }
  .ch3-end h2 { font-family: var(--ch3-display); font-weight: 400; font-size: clamp(2.6rem, 8vw, 6.4rem); line-height: 1; color: var(--ch3-marble); }
  .ch3-end .ch3-lede { max-width: 26ch; margin: 0; }
  .ch3-tally { display: flex; flex-direction: column; gap: .3rem; font-size: 1.15rem; color: var(--ch3-marble-2); }
  .ch3-tally b { font-weight: 500; color: var(--ch3-marble); }
  .ch3-again { font: inherit; font-size: 1.1rem; color: var(--ch3-bronze); background: none; border: 0; padding: .4rem 0; cursor: pointer; border-bottom: 1px solid rgba(209,161,90,.5); }
  .ch3-again:hover { color: var(--ch3-marble); border-color: var(--ch3-marble); }
  .ch3-fine { margin-top: 1.5rem; width: min(360px, 70%); }

  /* responsive */
  @media (max-width: 820px) {
    .ch3-inner { grid-template-columns: 1fr; gap: 2.5rem; }
    .ch3-inner, .ch3-road-inner { width: 80%; }
    .ch3-flip .ch3-copy { order: 0; }
    .ch3-chapter { padding: calc(var(--ch3-h) * .14) 0; }
    .ch3-tablets { grid-template-columns: 1fr; }
    .ch3-visual { max-width: 380px; margin: 0 auto; width: 100%; }
    .ch3-scene .ch3-inner { gap: 1.6rem; }
    .ch3-heart { --b: clamp(16px, 5vw, 24px); --bevel: 3px; }
    .ch3-scene .ch3-text { font-size: 1.05rem; }
    .ch3-scene .ch3-copy h2 { font-size: 1.9rem; }
    .ch3-scene .ch3-rule { margin: .8rem 0 1rem; }
  }

  /* static fallback (prefers-reduced-motion) */
  .ch3-static .ch3-hero-wrap { height: var(--ch3-h); }
  .ch3-static .ch3-hero-note { display: none; }
  .ch3-static .ch3-scene { height: auto; padding: calc(var(--ch3-h) * .14) 0; }
  .ch3-static .ch3-stick { position: static; height: auto; }
  .ch3-static .ch3-rail, .ch3-static .ch3-thread, .ch3-static .ch3-feathers { display: none; }
  .ch3-static .ch3-heart-glow { opacity: 1; }
  .ch3-static .ch3-sky-dusk { opacity: .6; }
  @media (prefers-reduced-motion: reduce) {
    .ch3-cue::after, .ch3-pulse, .ch3-star-group i { animation: none !important; }
  }
`;

/* ───────────── dates (edit these) ─────────────
   All YYYY-MM-DD. Birthdays use the birth date — the chapter works
   out the next birthday and the age being turned. */
const KEY_DATES = {
  met:    '2026-05-02',
  oliver: '2026-08-23',
  ashley: '2026-09-12',
  abday:  '2009-11-10',   // Ashley — 10 November 2009
  obday:  '2008-07-02',   // Oliver — 2 July 2008
};

const COMIC_SRC = chatGptImg;

/* Minecraft gallery — edit captions / order here */
const MC_PICS = [
  { src: mc1, cap: 'Little tough parkour, but very entertaning' },
  { src: mc2, cap: 'The redstone wall, with crazy tracks.' },
  { src: mc3, cap: 'A nice looking Room with Tricks' },
  { src: mc4, cap: 'The heart, in a burst of cherry petals.' },
  { src: mc5, cap: 'Really fun experience' },
  { src: mc6, cap: 'The path, the fountain, and the tower.' },
];

const startOfToday = () => { const n = new Date(); return new Date(n.getFullYear(), n.getMonth(), n.getDate()); };
const parseDate = (s) => { const [y, m, d] = s.split('-').map(Number); return new Date(y, m - 1, d); };
const plural = (n) => `${n} day${n === 1 ? '' : 's'}`;

function daysSince(d) { return d ? Math.round((startOfToday() - parseDate(d)) / 86400000) : null; }
function daysAgo(d) {
  const n = daysSince(d);
  if (n === null || isNaN(n)) return '';
  if (n === 0) return 'today';
  if (n < 0) return `in ${plural(-n)}`;
  return `${plural(n)} ago`;
}
function nextBirthday(birth) {
  if (!birth) return 'Date still to be written';
  const [by, bm, bd] = birth.split('-').map(Number);
  const t = startOfToday();
  let year = t.getFullYear();
  let next = new Date(year, bm - 1, bd);
  if (next < t) { year += 1; next = new Date(year, bm - 1, bd); }
  const n = Math.round((next - t) / 86400000);
  const age = year - by;
  return n === 0 ? `Turns ${age} today!` : `Turns ${age} in ${plural(n)}`;
}

/* ───────────── static scenery (generated once) ───────────── */
function rng(seed) {
  return () => {
    seed |= 0; seed = (seed + 0x6D2B79F5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
const rand = rng(2610);

const STAR_GROUPS = [42, 34, 26].map((n, gi) =>
  Array.from({ length: n }, () => ({
    left: rand() * 100, top: rand() * 100,
    size: 1 + rand() * 1.1 * (gi + 1),
    op: 0.3 + rand() * 0.6,
    twinkle: rand() < 0.25 ? { dur: 3 + rand() * 4, delay: rand() * 4 } : null,
  }))
);
const STAR_DEPTHS = [0.18, 0.32, 0.5];

const FEATHERS = Array.from({ length: 14 }, () => {
  const depth = rand();
  const w = 16 + depth * 34;
  return { left: rand() * 96, top: rand() * 96, w, h: (w * 64) / 48, rot: Math.round(rand() * 360), k: depth * 0.45 - 0.18 };
});

const HEART = ['011000110', '111101111', '111111111', '111111111', '011111110', '001111100', '000111000', '000010000'];
const HEART_CELLS = HEART.flatMap((row, r) =>
  row.split('').map((c) => ({ on: c === '1', row: r, tone: (0.9 + rand() * 0.16).toFixed(2) }))
);

/* olive branch: leaf + olive positions computed from the stem curve */
const STEM_D = 'M60 400C120 320 150 260 200 200C250 140 300 110 360 40';
const STEM_SEGS = [[60, 400, 120, 320, 150, 260, 200, 200], [200, 200, 250, 140, 300, 110, 360, 40]];
const bez = ([x0, y0, x1, y1, x2, y2, x3, y3], t) => {
  const u = 1 - t;
  return [u*u*u*x0 + 3*u*u*t*x1 + 3*u*t*t*x2 + t*t*t*x3, u*u*u*y0 + 3*u*u*t*y1 + 3*u*t*t*y2 + t*t*t*y3];
};
const STEM = (() => {
  const pts = [];
  STEM_SEGS.forEach((seg, si) => { for (let i = si ? 1 : 0; i <= 100; i++) pts.push(bez(seg, i / 100)); });
  const cum = [0];
  for (let i = 1; i < pts.length; i++) cum.push(cum[i - 1] + Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]));
  return { pts, cum, len: cum[cum.length - 1] };
})();
function stemAt(f) {
  const target = f * STEM.len;
  let i = 1;
  while (i < STEM.cum.length - 1 && STEM.cum[i] < target) i++;
  const a = STEM.pts[i - 1], b = STEM.pts[i];
  const t = (target - STEM.cum[i - 1]) / (STEM.cum[i] - STEM.cum[i - 1] || 1);
  return { x: a[0] + (b[0] - a[0]) * t, y: a[1] + (b[1] - a[1]) * t, ang: (Math.atan2(b[1] - a[1], b[0] - a[0]) * 180) / Math.PI };
}
const LEAVES = Array.from({ length: 9 }, (_, i) => {
  const p = stemAt(0.16 + i * 0.09);
  return { x: p.x, y: p.y, rot: p.ang + (i % 2 ? 1 : -1) * 52, fill: i % 3 === 0 ? '#8c9f45' : '#a9bb5c' };
});
const OLIVES = [0.5, 0.68, 0.83].map((t, k) => {
  const p = stemAt(t), side = k % 2 ? 1 : -1;
  return { x1: p.x, y1: p.y, x2: p.x + side * 14, y2: p.y + 18, cx: p.x + side * 14, cy: p.y + 28 };
});

const CAD_PATHS = [
  'M60 30V192', 'M54 22a6 6 0 1 0 12 0a6 6 0 1 0-12 0',
  'M56 44C44 36 24 32 4 38C18 40 30 44 44 52', 'M56 56C44 50 28 50 12 58C24 58 36 60 46 66', 'M56 68C46 64 34 66 22 76C32 74 42 74 52 78',
  'M64 44C76 36 96 32 116 38C102 40 90 44 76 52', 'M64 56C76 50 92 50 108 58C96 58 84 60 74 66', 'M64 68C74 64 86 66 98 76C88 74 78 74 68 78',
  'M60 80C92 94 92 116 60 130C28 144 28 164 60 178', 'M60 80C28 94 28 116 60 130C92 144 92 164 60 178',
];
const FEATHER_D = 'M0 0C-12-7-30-8-46-3C-32 0-14 3 0 3Z';
const FEATHER_T = ['rotate(-34) scale(.7)', 'rotate(-14) scale(.9)', 'rotate(6)', 'rotate(26) scale(.85)'];
const SPARK_D = 'M0-16L3.5-3.5L16 0L3.5 3.5L0 16L-3.5 3.5L-16 0L-3.5-3.5Z';

const LEDE_1 = 'It started with a hello, and it never really stopped.';
const LEDE_2 = 'Heart racing. Palms sweating. One question.';

const Chars = ({ text }) => text.split('').map((c, i) => (
  <span className="ch3-m" key={i} aria-hidden="true"><span className="ch3-ch">{c}</span></span>
));
const Words = ({ text }) => text.split(' ').map((w, i, a) => (
  <span key={i} className="ch3-w">{w}{i < a.length - 1 ? ' ' : ''}</span>
));

export default function Ch3Dates({ active, goToChapter, isCute }) {
  const rootRef = useRef(null);
  const storyRef = useRef(null);
  const threadRef = useRef(null);
  const fullRef = useRef(null);
  const doneRef = useRef(null);
  const markerRef = useRef(null);
  const zoomRef = useRef(null);
  const galTrackRef = useRef(null);
  const galZoomRef = useRef(null);

  const [slide, setSlide] = useState(0);
  const [galZoom, setGalZoom] = useState(0);

  const [animated] = useState(
    () => typeof window === 'undefined' || !window.matchMedia('(prefers-reduced-motion: reduce)').matches
  );

  useLayoutEffect(() => {
    const root = rootRef.current;
    if (!root) return undefined;
    if (!active) { root.scrollTop = 0; return undefined; }
    if (!animated) return undefined;

    const story = storyRef.current, svg = threadRef.current;
    const pFull = fullRef.current, pDone = doneRef.current, marker = markerRef.current;
    const S = (o) => ({ scroller: root, ...o });
    const hidden = { strokeDasharray: '1 2', strokeDashoffset: 1 };

    let table = [], totalLen = 0, lastAnchorY = 0, storyH = 0, qx = null, qr = null;

    /* ── the thread the winged message follows ── */
    function buildThread() {
      const W = story.clientWidth, H = story.clientHeight;
      if (!W || !H) return;
      storyH = H;
      svg.setAttribute('width', W); svg.setAttribute('height', H); svg.setAttribute('viewBox', `0 0 ${W} ${H}`);
      const anchors = [...story.querySelectorAll('[data-anchor]')];
      const mobile = W < 820;
      const amp = Math.min(W * 0.03, 44);
      const swing = W * 0.2;
      const gutter = W * 0.055;
      const pts = [{ x: W / 2, y: 0 }];
      let prev = 0;
      anchors.forEach((a, i) => {
        const cy = a.offsetTop + a.offsetHeight / 2;
        if (mobile) {
          // hug the side margins, weave left ↔ right between chapters
          pts.push({ x: i % 2 ? W - gutter : gutter, y: cy });
        } else {
          if (i > 0) pts.push({ x: W / 2 + (i % 2 ? -1 : 1) * swing, y: (prev + cy) / 2 });
          pts.push({ x: W / 2 + (i % 2 ? 1 : -1) * amp, y: cy });
        }
        prev = cy;
      });
      gsap.set(marker, { scale: mobile ? 0.5 : 1 });
      lastAnchorY = pts[pts.length - 1].y;
      pts.push({ x: W / 2, y: H });
      let d = `M${pts[0].x} ${pts[0].y}`;
      for (let i = 1; i < pts.length; i++) {
        const a = pts[i - 1], b = pts[i], dy = (b.y - a.y) * 0.5;
        d += ` C${a.x} ${a.y + dy} ${b.x} ${b.y - dy} ${b.x} ${b.y}`;
      }
      pFull.setAttribute('d', d); pDone.setAttribute('d', d);
      totalLen = pFull.getTotalLength();
      pDone.style.strokeDasharray = `${totalLen} ${totalLen}`;
      pDone.style.strokeDashoffset = totalLen;
      table = [];
      const N = Math.max(60, Math.ceil(totalLen / 5));
      for (let k = 0; k <= N; k++) {
        const l = (totalLen * k) / N, p = pFull.getPointAtLength(l);
        table.push({ x: p.x, y: p.y, l });
      }
    }
    function lookup(y) {
      let lo = 0, hi = table.length - 1;
      while (hi - lo > 1) { const m = (lo + hi) >> 1; if (table[m].y < y) lo = m; else hi = m; }
      const a = table[lo], b = table[hi], t = b.y - a.y ? (y - a.y) / (b.y - a.y) : 0;
      return { x: a.x + (b.x - a.x) * t, l: a.l + (b.l - a.l) * t, dx: b.x - a.x, dy: b.y - a.y };
    }
    function tick() {
      if (!table.length || !qx) return;
      const y = root.scrollTop + root.clientHeight * 0.5 - story.offsetTop;
      const p = lookup(Math.max(0, Math.min(storyH, y)));
      pDone.style.strokeDashoffset = totalLen - p.l;
      qx(p.x);
      const bank = (Math.atan2(p.dx, p.dy || 1) * 180) / Math.PI;
      qr(Math.max(-22, Math.min(22, bank * 0.9)));
      marker.style.opacity = Math.max(0, Math.min(1, y / 180));
      marker.classList.toggle('ch3-delivered', y >= lastAnchorY - 30);
    }

    const ctx = gsap.context(() => {
      /* intro — the caduceus draws itself, then the names rise */
      const cad = gsap.utils.toArray('.ch3-cad path');
      cad.forEach((p) => p.setAttribute('pathLength', '1'));
      const chars = gsap.utils.toArray('.ch3-h1 .ch3-ch');
      gsap.set(cad, hidden);
      gsap.set(chars, { yPercent: 115 });
      gsap.set(['.ch3-amp', '.ch3-tagline', '.ch3-cue', '.ch3-hero-note'], { opacity: 0 });
      gsap.timeline({ defaults: { ease: 'power3.out' } })
        .to(cad, { strokeDashoffset: 0, duration: 1.8, stagger: 0.12, ease: 'power2.inOut' })
        .to(chars, { yPercent: 0, duration: 1.1, stagger: 0.045 }, '-=.9')
        .to('.ch3-amp', { opacity: 1, duration: 0.8 }, '-=.7')
        .to('.ch3-tagline', { opacity: 1, duration: 1 }, '-=.4')
        .to('.ch3-cue', { opacity: 1, duration: 1 }, '-=.4');

      /* hero scroll — the camera climbs toward Olympus */
      gsap.timeline({ scrollTrigger: S({ trigger: '.ch3-hero-wrap', start: 'top top', end: 'bottom bottom', scrub: 0.6 }) })
        .to('.ch3-ridge-near', { yPercent: 40, ease: 'none', duration: 1 }, 0)
        .to('.ch3-ridge-mid', { yPercent: 20, ease: 'none', duration: 1 }, 0)
        .to('.ch3-ridge-far', { yPercent: 6, scale: 1.24, transformOrigin: '50% 66%', ease: 'none', duration: 1 }, 0)
        .to('.ch3-horizon', { opacity: 0, ease: 'none', duration: 0.8 }, 0)
        .to('.ch3-hero-content', { yPercent: -30, opacity: 0, ease: 'none', duration: 0.4 }, 0.08)
        .to('.ch3-cue', { opacity: 0, ease: 'none', duration: 0.15 }, 0)
        .to('.ch3-hero-note', { opacity: 1, ease: 'none', duration: 0.2 }, 0.5);

      /* sky + stars */
      gsap.to('.ch3-sky-dusk', { opacity: 1, ease: 'none', scrollTrigger: S({ trigger: story, start: 'top 80%', end: '55% center', scrub: true }) });
      gsap.to('.ch3-sky-glow', { opacity: 1, ease: 'none', scrollTrigger: S({ trigger: '.ch3-end', start: 'top 75%', end: 'top 20%', scrub: true }) });
      gsap.utils.toArray('.ch3-star-group').forEach((g) => {
        const d = parseFloat(g.dataset.depth);
        gsap.to(g, {
          y: () => -root.clientHeight * d * 1.6, ease: 'none',
          scrollTrigger: S({ trigger: root, start: 0, end: () => root.scrollHeight - root.clientHeight, scrub: true, invalidateOnRefresh: true }),
        });
      });

      /* parallax numerals + drifting feathers */
      gsap.utils.toArray('[data-parallax]').forEach((el) => {
        gsap.fromTo(el, { yPercent: 22 }, { yPercent: -30, ease: 'none',
          scrollTrigger: S({ trigger: el.closest('.ch3-chapter, .ch3-scene'), start: 'top bottom', end: 'bottom top', scrub: true }) });
      });
      gsap.utils.toArray('.ch3-feather').forEach((el) => {
        const k = parseFloat(el.dataset.k);
        gsap.to(el, { y: () => -k * story.clientHeight, rotation: `+=${k * 260}`, ease: 'none',
          scrollTrigger: S({ trigger: story, start: 'top bottom', end: 'bottom top', scrub: true, invalidateOnRefresh: true }) });
      });

      /* lines that light up word by word */
      gsap.utils.toArray('.ch3-words').forEach((el) => {
        gsap.fromTo(el.querySelectorAll('.ch3-w'), { opacity: 0.16 }, { opacity: 1, stagger: 0.12, ease: 'none',
          scrollTrigger: S({ trigger: el, start: 'top 82%', end: 'bottom 48%', scrub: true }) });
      });

      /* chapter I — two stars find each other */
      const c1 = root.querySelector('#ch3-c1line');
      c1.setAttribute('pathLength', '1');
      gsap.set(c1, hidden);
      gsap.set('.ch3-c1spark', { '--s': 0.4, opacity: 0.35 });
      gsap.set('.ch3-c1glow', { opacity: 0 });
      gsap.set('.ch3-c1hello', { opacity: 0 });
      gsap.timeline({ scrollTrigger: S({ trigger: '#ch3-ch1 .ch3-visual', start: 'top 85%', end: 'bottom 40%', scrub: 0.8 }) })
        .to('.ch3-c1spark', { '--s': 1, opacity: 1, duration: 0.3, ease: 'none' }, 0)
        .to('.ch3-c1glow', { opacity: 1, duration: 0.3, ease: 'none' }, 0)
        .to(c1, { strokeDashoffset: 0, duration: 0.8, ease: 'none' }, 0.2)
        .to('.ch3-c1hello', { opacity: 1, duration: 0.2, ease: 'none' }, 0.85);

      /* chapter II — the olive branch grows */
      const stem = root.querySelector('#ch3-stem');
      stem.setAttribute('pathLength', '1');
      gsap.set(stem, hidden);
      gsap.set('.ch3-leaf', { '--s': 0 });
      gsap.set('.ch3-olive', { '--s': 0, opacity: 0 });
      gsap.set('.ch3-stalk', { opacity: 0 });
      gsap.timeline({ scrollTrigger: S({ trigger: '#ch3-ch2 .ch3-visual', start: 'top 85%', end: 'bottom 40%', scrub: 0.8 }) })
        .to(stem, { strokeDashoffset: 0, duration: 0.7, ease: 'none' }, 0)
        .to('.ch3-leaf', { '--s': 1, duration: 0.16, stagger: 0.07, ease: 'none' }, 0.12)
        .to('.ch3-stalk', { opacity: 1, duration: 0.1, stagger: 0.05, ease: 'none' }, 0.7)
        .to('.ch3-olive', { '--s': 1, opacity: 1, duration: 0.12, stagger: 0.05, ease: 'none' }, 0.74)
        .to('.ch3-tip', { opacity: 0.9, duration: 0.05, ease: 'none' }, 0.95);

      /* comic drifts up into place as you scroll */
      gsap.fromTo('.ch3-comic-frame', { opacity: 0, y: 70, rotation: -1.5, scale: 0.94 },
        { opacity: 1, y: 0, rotation: 0, scale: 1, ease: 'none',
          scrollTrigger: S({ trigger: '.ch3-comic', start: 'top 90%', end: 'top 40%', scrub: true }) });

      /* minecraft gallery drifts up the same way */
      gsap.fromTo('.ch3-gal-frame', { opacity: 0, y: 70, rotation: 1.5, scale: 0.94 },
        { opacity: 1, y: 0, rotation: 0, scale: 1, ease: 'none',
          scrollTrigger: S({ trigger: '.ch3-gal', start: 'top 90%', end: 'top 40%', scrub: true }) });

      /* chapter III — Ashley builds a heart, block by block */
      const blocks = gsap.utils.toArray('.ch3-blk:not(.ch3-off)')
        .sort((a, b) => (b.dataset.row - a.dataset.row) + (Math.random() - 0.5) * 1.4);
      gsap.set(blocks, { opacity: 0, y: -54 });
      gsap.set('.ch3-heart-glow', { opacity: 0 });
      gsap.set('.ch3-stamp', { opacity: 0, y: 14 });
      gsap.timeline({ scrollTrigger: S({ trigger: '#ch3-ch3', start: 'top top', end: 'bottom bottom', scrub: 0.6 }) })
        .to(blocks, { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out', stagger: { each: 6 / blocks.length } }, 0)
        .to('.ch3-heart-glow', { opacity: 1, duration: 1.2, ease: 'none' }, 6.4)
        .to('.ch3-stamp', { opacity: 1, y: 0, duration: 0.8, ease: 'none' }, 7.2)
        .to({}, { duration: 1.2 }, 8);

      /* the winged message */
      qx = gsap.quickTo(marker, 'x', { duration: 0.7, ease: 'power3.out' });
      qr = gsap.quickTo(marker, 'rotation', { duration: 0.7, ease: 'power3.out' });
      gsap.to('.ch3-wl', { rotation: -11, svgOrigin: '-12 -3', duration: 0.5, yoyo: true, repeat: -1, ease: 'sine.inOut' });
      gsap.to('.ch3-wr', { rotation: 11, svgOrigin: '12 -3', duration: 0.5, yoyo: true, repeat: -1, ease: 'sine.inOut' });
      gsap.ticker.add(tick);
    }, root);

    /* layout can change (fonts, resize, chapter becoming visible) → rebuild the thread */
    let timer;
    const relayout = () => { buildThread(); ScrollTrigger.refresh(); };
    const ro = new ResizeObserver(() => { clearTimeout(timer); timer = setTimeout(relayout, 120); });
    ro.observe(root); ro.observe(story);
    buildThread();
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(relayout);

    return () => {
      clearTimeout(timer);
      ro.disconnect();
      gsap.ticker.remove(tick);
      ctx.revert();
      root.scrollTop = 0;
    };
  }, [active, animated]);

  const backToTop = () => rootRef.current && rootRef.current.scrollTo({ top: 0, behavior: 'smooth' });

  /* gallery helpers */
  const goSlide = (i) => {
    const t = galTrackRef.current;
    if (!t) return;
    const n = Math.max(0, Math.min(MC_PICS.length - 1, i));
    t.scrollTo({ left: n * t.clientWidth, behavior: 'smooth' });
  };
  const onGalScroll = (e) => {
    const t = e.currentTarget;
    setSlide(Math.round(t.scrollLeft / t.clientWidth));
  };
  const openGalZoom = (i) => { setGalZoom(i); galZoomRef.current && galZoomRef.current.showModal(); };

  return (
    <div className={`ch3-root${animated ? '' : ' ch3-static'}${isCute ? ' ashley' : ''}`} ref={rootRef}>
      <style>{STYLES}</style>

      {/* shared feather symbol */}
      <svg width="0" height="0" style={{ position: 'absolute' }} aria-hidden="true">
        <symbol id="ch3-feather" viewBox="0 0 48 64"><path d="M4 62C6 34 20 10 44 2C42 26 30 48 8 62Z" /></symbol>
      </svg>

      <div className="ch3-sky" aria-hidden="true">
        <div className="ch3-sky-night" />
        <div className="ch3-sky-dusk" />
        <div className="ch3-sky-glow" />
        <div className="ch3-stars">
          {STAR_GROUPS.map((group, gi) => (
            <div className="ch3-star-group" data-depth={STAR_DEPTHS[gi]} key={gi}>
              {group.map((s, i) => (
                <i key={i} style={{
                  left: `${s.left}%`, top: `${s.top}%`, width: s.size, height: s.size, opacity: s.op,
                  animation: s.twinkle ? `ch3-twinkle ${s.twinkle.dur.toFixed(1)}s ease-in-out ${s.twinkle.delay.toFixed(1)}s infinite` : undefined,
                }} />
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* ═════════ HERO ═════════ */}
      <div className="ch3-hero-wrap">
        <header className="ch3-hero">
          <div className="ch3-horizon" />

          <svg className="ch3-ridge ch3-ridge-far" viewBox="0 0 1440 900" preserveAspectRatio="xMidYMax slice" aria-hidden="true">
            <path fill="#24346f" d="M0 800L140 760L300 790L450 700L580 640L640 570L800 570L860 640L1000 700L1150 670L1300 740L1440 710V900H0Z" />
            <g className="ch3-temple" fill="#efe8da" fillOpacity=".95" transform="translate(720 570) scale(1.5) translate(-720 -570)">
              <rect x="650" y="562" width="140" height="8" />
              {[662, 686, 710, 734, 758, 778].map((x) => <rect key={x} x={x} y="522" width="8" height="40" />)}
              <rect x="652" y="510" width="136" height="12" />
              <polygon points="645,510 720,480 795,510" />
            </g>
          </svg>
          <svg className="ch3-ridge ch3-ridge-mid" viewBox="0 0 1440 900" preserveAspectRatio="xMidYMax slice" aria-hidden="true">
            <path fill="#142050" d="M0 830L160 790L340 825L520 770L700 830L900 780L1100 830L1280 790L1440 825V900H0Z" />
          </svg>
          <svg className="ch3-ridge ch3-ridge-near" viewBox="0 0 1440 900" preserveAspectRatio="xMidYMax slice" aria-hidden="true">
            <path fill="#08102c" d="M0 870L200 845L420 872L640 850L900 875L1150 848L1440 872V900H0Z" />
            <g fill="#08102c">
              <path d="M180 862C166 832 172 772 180 742C188 772 194 832 180 862Z" />
              <path d="M214 866C203 838 208 790 214 766C220 790 225 838 214 866Z" />
              <path d="M1216 862C1202 832 1208 772 1216 742C1224 772 1230 832 1216 862Z" />
              <path d="M1254 866C1243 838 1248 790 1254 766C1260 790 1265 838 1254 866Z" />
            </g>
          </svg>

          <div className="ch3-hero-content">
            <svg className="ch3-cad" viewBox="0 0 120 200" fill="none" stroke="#d1a15a" strokeWidth="2.2" strokeLinejoin="round" aria-hidden="true">
              {CAD_PATHS.map((d) => <path key={d} d={d} />)}
            </svg>
            <h1 className="ch3-h1" aria-label="Oliver and Ashley">
              <span className="ch3-line"><Chars text="Oliver" /></span>
              <span className="ch3-line"><span className="ch3-amp" aria-hidden="true">&amp;</span><Chars text="Ashley" /></span>
            </h1>
            <p className="ch3-tagline">Their story, carried on the Wings.</p>
          </div>

          <p className="ch3-hero-note">It started with a message.</p>
          <div className="ch3-cue">Scroll to follow the message</div>
        </header>
      </div>

      {/* ═════════ STORY ═════════ */}
      <main className="ch3-story" ref={storyRef}>
        {/* winged message rides a sticky rail so it stays mid-screen */}
        <div className="ch3-rail" aria-hidden="true">
          <div className="ch3-marker" ref={markerRef}>
            <svg viewBox="-64 -34 128 68">
              <g className="ch3-wl ch3-fg"><g transform="translate(-12 -3)">
                {FEATHER_T.map((t) => <path key={t} transform={t} d={FEATHER_D} />)}
              </g></g>
              <g className="ch3-wr ch3-fg"><g transform="translate(12 -3) scale(-1 1)">
                {FEATHER_T.map((t) => <path key={t} transform={t} d={FEATHER_D} />)}
              </g></g>
              <rect x="-13" y="-9" width="26" height="18" rx="2" fill="#efe8da" />
              <path d="M-13-9L0 2L13-9" fill="none" stroke="#b98c4a" strokeWidth="1.4" />
              <circle cy="2" r="3.4" fill="#f08ba8" />
            </svg>
          </div>
        </div>

        <svg className="ch3-thread" ref={threadRef} aria-hidden="true">
          <path className="ch3-full" ref={fullRef} />
          <path className="ch3-done" ref={doneRef} />
        </svg>

        <div className="ch3-feathers" aria-hidden="true">
          {FEATHERS.map((f, i) => (
            <svg key={i} className="ch3-feather" viewBox="0 0 48 64" data-k={f.k.toFixed(3)}
              style={{ left: `${f.left}%`, top: `${f.top}%`, width: f.w, height: f.h, transform: `rotate(${f.rot}deg)` }}>
              <use href="#ch3-feather" />
            </svg>
          ))}
        </div>

        {/* I */}
        <section className="ch3-chapter" id="ch3-ch1" data-anchor>
          <div className="ch3-bignum ch3-r" data-parallax aria-hidden="true">2</div>
          <div className="ch3-inner">
            <div className="ch3-copy">
              <p className="ch3-when">2 May 2026, {daysAgo(KEY_DATES.met)}</p>
              <h2>Two strangers, one message</h2>
              <div className="ch3-rule ch3-both" />
              <p className="ch3-lede ch3-words"><Words text={LEDE_1} /></p>
              <p className="ch3-text">Two people on opposite sides of a screen. crosses every border there is: sea, sky, and the gap between one stranger and another. He took the first message and carried it all the way.</p>
            </div>
            <div className="ch3-visual">
              <svg viewBox="0 0 420 320" aria-hidden="true">
                <g fill="#efe8da" opacity=".5">
                  <circle cx="40" cy="60" r="1.4" /><circle cx="150" cy="30" r="1.8" /><circle cx="250" cy="250" r="1.4" />
                  <circle cx="390" cy="190" r="1.6" /><circle cx="120" cy="150" r="1.2" /><circle cx="300" cy="150" r="1.2" />
                </g>
                <path id="ch3-c1line" d="M130 250C200 240 270 130 350 70" fill="none" stroke="#d1a15a" strokeWidth="1.6" />
                <g transform="translate(130 250)">
                  <circle r="24" fill="#a9bb5c" fillOpacity=".16" className="ch3-c1glow" />
                  <path className="ch3-spark ch3-c1spark ch3-sp-o" fill="#a9bb5c" d={SPARK_D} />
                </g>
                <g transform="translate(350 70)">
                  <circle r="24" fill="#f08ba8" fillOpacity=".16" className="ch3-c1glow" />
                  <path className="ch3-spark ch3-c1spark ch3-sp-a" fill="#f08ba8" d={SPARK_D} />
                </g>
                <text className="ch3-lbl" x="130" y="292" textAnchor="middle">Oliver</text>
                <text className="ch3-lbl" x="350" y="40" textAnchor="middle">Ashley</text>
                <text className="ch3-lbl ch3-b ch3-c1hello" x="212" y="196" textAnchor="middle">hello</text>
              </svg>
            </div>
          </div>
        </section>

        {/* II */}
        <section className="ch3-chapter ch3-flip" id="ch3-ch2" data-anchor>
          <div className="ch3-bignum ch3-l" data-parallax aria-hidden="true">23</div>
          <div className="ch3-inner">
            <div className="ch3-copy">
              <p className="ch3-when">23 August 2026, {daysAgo(KEY_DATES.oliver)}</p>
              <h2>Oliver asked</h2>
              <div className="ch3-rule ch3-olive" />
              <p className="ch3-lede ch3-words"><Words text={LEDE_2} /></p>
              <p className="ch3-text">Oliver asked Ashley to be his girlfriend. It was really nice when she said yes :) although i kinda knew already 😁 .</p>
            </div>
            <div className="ch3-visual">
              <svg viewBox="0 0 420 420" aria-hidden="true">
                <path id="ch3-stem" d={STEM_D} fill="none" stroke="#7d8f3b" strokeWidth="4" strokeLinecap="round" />
                {LEAVES.map((l, i) => (
                  <g key={i} transform={`translate(${l.x.toFixed(1)} ${l.y.toFixed(1)}) rotate(${l.rot.toFixed(1)})`}>
                    <path className="ch3-leaf" d="M0 0C10-10 34-10 52 0C34 10 10 10 0 0Z" fill={l.fill} />
                  </g>
                ))}
                {OLIVES.map((o, i) => (
                  <g key={i}>
                    <line className="ch3-stalk" x1={o.x1} y1={o.y1} x2={o.x2} y2={o.y2} stroke="#7d8f3b" strokeWidth="2" />
                    <circle className="ch3-olive" cx={o.cx} cy={o.cy} r="10" fill="#4b5a22" />
                  </g>
                ))}
                <circle className="ch3-pulse ch3-tip" cx="360" cy="40" r="10" fill="none" stroke="#a9bb5c" strokeWidth="1.5" opacity="0" />
              </svg>
            </div>
          </div>
        </section>

        {/* Comic — the night it was delivered */}
        <section className="ch3-comic" aria-label="A comic of the night Oliver asked">
          <div className="ch3-comic-inner">
            <p className="ch3-when">23 August 2026, the night it was delivered</p>
            <figure className="ch3-comic-frame">
              <div className="ch3-meander" aria-hidden="true" />
              <button type="button" className="ch3-comic-btn" aria-label="Open the comic full screen"
                onClick={() => zoomRef.current && zoomRef.current.showModal()}>
                <img className="ch3-comic-img" src={COMIC_SRC} width="1536" height="1024" loading="lazy"
                  alt="A comic: nervous Oliver in the UK, eating chips, asks Ashley in Brazil to be his girlfriend. She says yes." />
              </button>
            </figure>
            <p className="ch3-comic-cap">The chips witnessed everything.</p>
          </div>
          <dialog className="ch3-zoom" ref={zoomRef} onClick={() => zoomRef.current.close()}>
            <img src={COMIC_SRC} alt="The comic, full screen" />
            <p>tap anywhere to close</p>
          </dialog>
        </section>

        {/* III (pinned while the heart builds) */}
        <div className="ch3-scene" id="ch3-ch3" data-anchor>
          <div className="ch3-stick">
            <div className="ch3-bignum ch3-r" data-parallax aria-hidden="true">12</div>
            <div className="ch3-inner">
              <div className="ch3-copy">
                <p className="ch3-when">12 September 2026, {daysAgo(KEY_DATES.ashley)}</p>
                <h2>Ashley answered with a Surprise</h2>
                <div className="ch3-rule ch3-rose" />
                <p className="ch3-text">Oliver asked with words. Ashley asked back with a world: a whole Minecraft game she built just for him 🥺😘.</p>
              </div>
              <div className="ch3-visual ch3-heart-wrap">
                <div className="ch3-heart-glow" />
                <div className="ch3-heart" role="img" aria-label="A heart built from Minecraft-style blocks">
                  {HEART_CELLS.map((c, i) => (
                    <span key={i} className={`ch3-blk${c.on ? '' : ' ch3-off'}`} data-row={c.row} style={c.on ? { '--tone': c.tone } : undefined} />
                  ))}
                </div>
                <p className="ch3-stamp">Officially official.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Minecraft gallery */}
        <section className="ch3-gal" aria-label="Screenshots of the Minecraft world Ashley built">
          <div className="ch3-gal-inner">
            <p className="ch3-when">12 September 2026, a look inside the world</p>
            <figure className="ch3-gal-frame">
              <div className="ch3-meander" aria-hidden="true" />
              <div className="ch3-gal-viewport">
                <button type="button" className="ch3-gal-arrow ch3-gal-prev" aria-label="Previous picture"
                  disabled={slide === 0} onClick={() => goSlide(slide - 1)}>‹</button>
                <div className="ch3-gal-track" ref={galTrackRef} onScroll={onGalScroll}>
                  {MC_PICS.map((p, i) => (
                    <button type="button" key={i} className="ch3-gal-slide"
                      aria-label={`Open picture ${i + 1} full screen`} onClick={() => openGalZoom(i)}>
                      <img src={p.src} alt={p.cap} loading="lazy" />
                    </button>
                  ))}
                </div>
                <button type="button" className="ch3-gal-arrow ch3-gal-next" aria-label="Next picture"
                  disabled={slide === MC_PICS.length - 1} onClick={() => goSlide(slide + 1)}>›</button>
              </div>
              <div className="ch3-gal-bar">
                <div className="ch3-gal-dots">
                  {MC_PICS.map((_, i) => (
                    <button type="button" key={i} aria-label={`Go to picture ${i + 1}`}
                      className={`ch3-gal-dot${i === slide ? ' ch3-on' : ''}`} onClick={() => goSlide(i)} />
                  ))}
                </div>
                <span className="ch3-gal-count">{slide + 1} / {MC_PICS.length}</span>
              </div>
            </figure>
            <p className="ch3-gal-cap">{MC_PICS[slide] ? MC_PICS[slide].cap : ''}</p>
          </div>
          <dialog className="ch3-zoom" ref={galZoomRef} onClick={() => galZoomRef.current.close()}>
            <img src={MC_PICS[galZoom].src} alt={MC_PICS[galZoom].cap} />
            <p>tap anywhere to close</p>
          </dialog>
        </section>

        {/* Road ahead */}
        <section className="ch3-road" data-anchor>
          <div className="ch3-road-inner">
            <h2>Hermes is still on the road</h2>
            <p className="ch3-text">Two birthdays are still on their way.</p>
            <ul className="ch3-tablets">
              <li className="ch3-tablet"><div className="ch3-meander" /><h3>Ashley’s birthday</h3><p>{nextBirthday(KEY_DATES.abday)}</p></li>
              <li className="ch3-tablet"><div className="ch3-meander" /><h3>Oliver’s birthday</h3><p>{nextBirthday(KEY_DATES.obday)}</p></li>
            </ul>
          </div>
        </section>

        {/* End */}
        <section className="ch3-end" data-anchor>
          <div className="ch3-end-inner">
            <h2>Message delivered.</h2>
            <p className="ch3-lede">May Hermes keep the road between you two open.</p>
            <div className="ch3-tally">
              <p><b>{Math.max(0, daysSince(KEY_DATES.met))}</b> days since hello.</p>
              <p><b>{Math.max(0, daysSince(KEY_DATES.oliver))}</b> days since Oliver asked.</p>
              <p><b>{Math.max(0, daysSince(KEY_DATES.ashley))}</b> days since Ashley answered.</p>
            </div>
            <button className="ch3-again" type="button" onClick={backToTop}>Back to Olympus</button>
            <button className="nav-btn" onClick={() => goToChapter(4)}>NEXT CHAPTER →</button>
            <div className="ch3-meander ch3-fine" aria-hidden="true" />
          </div>
        </section>
      </main>
    </div>
  );
}
