import { useEffect, useState, useRef, useMemo } from 'react';
import oliverImg from '../assets/pics/olive/WhatsApp Image 2026-09-22 at 02.34.21.jpeg';
import ashleyImg from '../assets/ashleyyy.jpg';

import olive1 from '../assets/pics/olive/WhatsApp Image 2026-09-22 at 02.34.21 (1).jpeg';

/* ─────────────────────────────────────────────────
   Self-contained — all styles live here. No new deps.
   Global CSS vars used: --oliver, --oliver2, --ashley, --ashley2,
   --gold, --glow-acc, --glow-gold, --glow-pink,
   --text, --text2, --text3, --surface, --border, --nav-h,
   --font-pixel, --font-display, --font-body
   Shared classes: big-btn, pulse-btn

   DEPTH: the world is built from layers. Each layer has a
   --d value; when the mouse moves (or the page idles) the
   layer shifts by --d px. Bigger number = closer to you.
───────────────────────────────────────────────── */
const STYLES = `
  .ch1-wrap {
    --ring-bg: rgba(7,9,26,0.92);
    position: relative;
    min-height: calc(100dvh - var(--nav-h));
    display: flex; flex-direction: column;
    justify-content: center; align-items: center;
    overflow: hidden;
    isolation: isolate;
  }
  .ch1-wrap.is-cute { --ring-bg: rgba(255,255,255,0.95); }

  /* ── depth layers ── */
  .ch1-layer {
    position: absolute; inset: -3%; pointer-events: none; will-change: transform;
    transform: translate3d(calc(var(--mx,0) * var(--d,0) * 1px), calc(var(--my,0) * var(--d,0) * 0.5px), 0);
  }

  /* ── sky ── */
  .ch1-sky {
    position: absolute; inset: 0; z-index: 0;
    background: linear-gradient(180deg, #05061a 0%, #0d0f33 42%, #26194f 74%, #52275f 100%);
  }
  .ch1-wrap.is-cute .ch1-sky {
    background: linear-gradient(180deg, #fff3f9 0%, #fde4f1 50%, #fbcfe8 100%);
  }

  /* ── stars ── */
  .ch1-star {
    position: absolute; border-radius: 50%; background: #fff;
    animation: ch1-twinkle var(--t) ease-in-out var(--dl) infinite;
  }
  @keyframes ch1-twinkle {
    0%,100% { opacity: .15; transform: scale(1); }
    50%     { opacity: .95; transform: scale(1.5); }
  }
  .ch1-wrap.is-cute .ch1-stars { display: none; }

  .ch1-shoot {
    position: absolute; top: 14%; left: 72%; width: 130px; height: 2px; opacity: 0;
    background: linear-gradient(90deg, #fff, transparent);
    animation: ch1-shoot 11s ease-in 3s infinite;
  }
  @keyframes ch1-shoot {
    0%   { opacity: 0; transform: translate3d(0,0,0) rotate(-32deg); }
    2%   { opacity: 1; }
    9%   { opacity: 0; transform: translate3d(-340px,215px,0) rotate(-32deg); }
    100% { opacity: 0; transform: translate3d(-340px,215px,0) rotate(-32deg); }
  }

  /* ── colour mesh ── */
  .ch1-mesh { position: absolute; inset: 0; z-index: 0; overflow: hidden; pointer-events: none; }
  .ch1-blob {
    position: absolute; border-radius: 50%;
    filter: blur(90px); opacity: 0.22;
    animation: ch1-blobDrift linear infinite alternate;
  }
  .ch1-blob-1 { width: 520px; height: 520px; left: -15%; top: -20%; background: var(--oliver2); animation-duration: 9s; }
  .ch1-blob-2 { width: 420px; height: 420px; right: -10%; bottom: 0; background: var(--ashley2); animation-duration: 12s; animation-direction: alternate-reverse; }
  .ch1-blob-3 { width: 300px; height: 300px; left: 40%; top: 25%; background: rgba(255,215,0,0.3); animation-duration: 8s; animation-delay: 2s; }
  @keyframes ch1-blobDrift {
    0%   { transform: translate(0,0) scale(1); }
    100% { transform: translate(30px,20px) scale(1.15); }
  }

  /* ── moon (square, like Minecraft) / sun in cute mode ── */
  .ch1-moon {
    position: absolute; right: 13%; top: 9%;
    width: clamp(48px, 8vw, 92px); aspect-ratio: 1;
    background: #e9eeff;
    box-shadow: 0 0 70px 22px rgba(150,170,255,0.28), inset -8px -8px 0 rgba(150,160,210,0.35);
  }
  .ch1-moon::before, .ch1-moon::after { content: ''; position: absolute; background: rgba(150,160,210,0.45); }
  .ch1-moon::before { left: 18%; top: 22%; width: 22%; height: 22%; }
  .ch1-moon::after  { left: 56%; top: 56%; width: 16%; height: 16%; }
  .ch1-wrap.is-cute .ch1-moon {
    border-radius: 50%;
    background: radial-gradient(circle at 35% 35%, #fff8da, #ffd3e6);
    box-shadow: 0 0 90px 34px rgba(249,168,212,0.55);
  }
  .ch1-wrap.is-cute .ch1-moon::before, .ch1-wrap.is-cute .ch1-moon::after { display: none; }

  /* ── blocky clouds ── */
  .ch1-cloud {
    position: absolute; left: 0; fill: rgba(190,200,255,0.10);
    animation: ch1-cloudDrift linear infinite;
  }
  .ch1-wrap.is-cute .ch1-cloud { fill: rgba(255,255,255,0.85); }
  @keyframes ch1-cloudDrift {
    from { transform: translateX(-25vw); }
    to   { transform: translateX(110vw); }
  }

  /* ── pixel hills ── */
  .ch1-hills {
    position: absolute; left: -4%; right: -4%; bottom: 30px;
    height: clamp(180px, 30vh, 320px); pointer-events: none; will-change: transform;
    transform: translate3d(calc(var(--mx,0) * var(--d,0) * 1px), calc(var(--my,0) * var(--d,0) * 0.5px), 0);
  }
  .ch1-hills svg { width: 100%; height: 100%; display: block; }

  /* ── fireflies ── */
  .ch1-fly {
    position: absolute; width: 4px; height: 4px; border-radius: 50%;
    background: #c9ff7a; box-shadow: 0 0 10px 3px rgba(190,255,100,0.55);
    animation: ch1-fly var(--t) ease-in-out var(--dl) infinite;
  }
  @keyframes ch1-fly {
    0%,100% { transform: translate(0,0); opacity: 0; }
    20%     { opacity: .9; }
    50%     { transform: translate(26px,-34px); opacity: .35; }
    80%     { opacity: .9; }
  }

  /* ── floating 3-D blocks ── */
  @keyframes ch1-blockFloat {
    0%   { transform: translateY(120vh) rotate3d(1,1,0,0deg);   opacity: 0; }
    5%   { opacity: 0.55; }
    95%  { opacity: 0.35; }
    100% { transform: translateY(-30vh) rotate3d(1,1,0,720deg); opacity: 0; }
  }

  /* ── ground strip ── */
  .ch1-ground {
    position: absolute; bottom: 0; left: 0; right: 0; height: 56px; z-index: 2;
    background: repeating-linear-gradient(
      90deg,
      rgba(26,74,15,0.95)  0px,   rgba(26,74,15,0.95)  56px,
      rgba(61,32,6,0.95)   56px,  rgba(61,32,6,0.95)   112px,
      rgba(40,40,40,0.95)  112px, rgba(40,40,40,0.95)  168px,
      rgba(22,64,12,0.95)  168px, rgba(22,64,12,0.95)  224px
    );
    border-top: 2px solid rgba(0,0,0,0.5);
  }
  .ch1-ground::before {
    content: ''; position: absolute; top: 0; left: 0; right: 0; height: 3px;
    background: linear-gradient(90deg, #2d8a1f, #5ab52a, #2d8a1f, #5ab52a);
  }
  .ch1-wrap.is-cute .ch1-ground {
    background: repeating-linear-gradient(90deg,
      rgba(236,72,153,0.35)  0px,  rgba(236,72,153,0.35)  56px,
      rgba(249,168,212,0.35) 56px, rgba(249,168,212,0.35) 112px,
      rgba(251,207,232,0.45) 112px,rgba(251,207,232,0.45) 168px,
      rgba(236,72,153,0.25)  168px,rgba(236,72,153,0.25)  224px
    );
    border-top-color: rgba(236,72,153,0.25);
  }
  .ch1-wrap.is-cute .ch1-ground::before { background: linear-gradient(90deg, #ec4899, #f9a8d4, #ec4899); }

  /* readability vignette */
  .ch1-vignette {
    position: absolute; inset: 0; z-index: 3; pointer-events: none;
    background: radial-gradient(ellipse at 50% 45%, transparent 42%, rgba(3,4,14,0.55) 100%);
  }
  .ch1-wrap.is-cute .ch1-vignette {
    background: radial-gradient(ellipse at 50% 45%, transparent 45%, rgba(236,72,153,0.10) 100%);
  }

  /* ── content ── */
  .ch1-content {
    position: relative; z-index: 4; text-align: center;
    padding: 24px 20px 84px; width: 100%; max-width: 900px;
  }
  .ch1-eyebrow {
    font-family: var(--font-pixel); font-size: 7px; letter-spacing: 4px;
    color: var(--text3); text-transform: uppercase; margin-bottom: 8px;
  }

  /* portraits + heart link */
  .ch1-stage { perspective: 1000px; }
  .ch1-tilt {
    transform-style: preserve-3d;
    transform: rotateY(calc(var(--mx,0) * 7deg)) rotateX(calc(var(--my,0) * -5deg));
  }
  .ch1-pair {
    --pz: clamp(92px, 20vw, 168px);
    display: grid; grid-template-columns: 1fr auto 1fr; align-items: start;
    gap: clamp(4px, 2vw, 28px); max-width: 860px; margin: 22px auto 0;
  }
  .ch1-col { display: flex; flex-direction: column; align-items: center; transform: translateZ(30px); }

  .ch1-portrait {
    position: relative; width: var(--pz); height: var(--pz);
    border-radius: 50%; padding: 4px;
    animation: ch1-charBob 3.2s ease-in-out infinite;
  }
  .ch1-portrait.is-ashley { animation-delay: .8s; }
  .ch1-portrait::before {
    content: ''; position: absolute; inset: 0; border-radius: 50%;
    background: conic-gradient(from 0deg, var(--c1), transparent 35%, var(--c2), transparent 75%, var(--c1));
    animation: ch1-spin 7s linear infinite;
  }
  .ch1-portrait::after {
    content: ''; position: absolute; inset: -18px; border-radius: 50%; z-index: -1;
    background: radial-gradient(circle, var(--c1), transparent 68%);
    opacity: .28; filter: blur(16px);
  }
  .ch1-portrait img {
    position: relative; display: block; width: 100%; height: 100%;
    border-radius: 50%; object-fit: cover; object-position: top;
    border: 3px solid var(--ring-bg);
  }
  @keyframes ch1-spin { to { transform: rotate(360deg); } }
  @keyframes ch1-charBob {
    0%,100% { transform: translateY(0); }
    50%     { transform: translateY(-10px); }
  }

  .ch1-link {
    width: clamp(70px, 16vw, 190px); overflow: visible; color: var(--text3);
    margin-top: calc(var(--pz) * 0.5 - 30px);
  }
  .ch1-heartsvg {
    transform-box: fill-box; transform-origin: center;
    animation: ch1-heartBeat 1.4s ease-in-out infinite;
    filter: drop-shadow(0 0 6px rgba(255,90,120,0.75));
  }
  @keyframes ch1-heartBeat {
    0%  { transform: scale(1); }
    14% { transform: scale(1.3); }
    28% { transform: scale(1.05); }
    42% { transform: scale(1.18); }
    70% { transform: scale(1); }
  }

  /* typed names (full text reserves the space, so nothing jumps) */
  .ch1-name-slot { display: block; position: relative; margin-top: 20px; }
  .ch1-name {
    font-family: var(--font-display); font-weight: 900; letter-spacing: -1px;
    font-size: clamp(16px, 3.3vw, 32px); line-height: 1.12; text-wrap: balance;
  }
  .ch1-name.ghost { visibility: hidden; display: block; }
  .ch1-name.typed { position: absolute; inset: 0; display: block; }
  .ch1-name.oliver { color: var(--oliver); text-shadow: 0 0 46px rgba(126,207,255,0.35); }
  .ch1-name.ashley { color: var(--ashley); text-shadow: 0 0 46px rgba(255,121,168,0.35); }
  .ch1-sr { position: absolute; width: 1px; height: 1px; overflow: hidden; clip: rect(0 0 0 0); white-space: nowrap; }
  @keyframes ch1-blink { 0%,100%{opacity:1} 50%{opacity:0} }
  .ch1-cursor { animation: ch1-blink 1s step-end infinite; }

  /* tagline */
  .ch1-tagline {
    font-family: var(--font-display);
    font-weight: 800; 
    font-size: clamp(4px, 2.5vw, 10px);
    letter-spacing: 4px; margin: 26px 0 22px; text-transform: uppercase;
    background: linear-gradient(90deg, var(--oliver), var(--ashley), var(--gold), var(--oliver));
    background-size: 300% 100%;
    -webkit-background-clip: text; background-clip: text;
    -webkit-text-fill-color: transparent;
    animation: ch1-taglineGrad 6s ease infinite;
  }
  @keyframes ch1-taglineGrad {
    0%,100% { background-position: 0% 50%; }
    50%     { background-position: 100% 50%; }
  }

  /* date strip */
  .ch1-stat {
    display: inline-block; padding: 10px 22px; margin-bottom: 22px;
    background: var(--surface); border: 1px solid var(--border);
    backdrop-filter: blur(14px);
  }
  .ch1-wrap.is-cute .ch1-stat { background: rgba(255,255,255,0.82); border-color: rgba(236,72,153,0.15); }
  .ch1-stat-label { font-family: var(--font-pixel); font-size: 6px; color: var(--text3); letter-spacing: 2px; margin-bottom: 4px; display: block; text-transform: uppercase; }
  .ch1-stat-val   { font-family: var(--font-display); font-size: clamp(12px, 2.8vw, 17px); color: var(--text); font-weight: 700; }

  /* cute sparkles */
  @keyframes ch1-sparkle0 { 0%,100%{opacity:.2;transform:scale(1) rotate(0deg)} 50%{opacity:.7;transform:scale(1.3) rotate(15deg)} }
  @keyframes ch1-sparkle1 { 0%,100%{opacity:.3;transform:scale(1) rotate(0deg)} 50%{opacity:.8;transform:scale(1.2) rotate(-20deg)} }
  @keyframes ch1-sparkle2 { 0%,100%{opacity:.15;transform:scale(1)} 50%{opacity:.6;transform:scale(1.4)} }

  @media (prefers-reduced-motion: reduce) {
    .ch1-star, .ch1-shoot, .ch1-cloud, .ch1-blob, .ch1-fly, .ch1-portrait,
    .ch1-portrait::before, .ch1-heartsvg, .ch1-tagline { animation: none !important; }
    .ch1-shoot { display: none; }
  }
`;

/* ── deterministic random so nothing jumps between renders ── */
function mulberry32(a) {
  return () => {
    a |= 0; a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const rand = mulberry32(7);
const STARS = Array.from({ length: 70 }, () => {
  const r = rand();
  return { x: rand() * 100, y: rand() * 62, s: r < 0.12 ? 3 : r < 0.5 ? 2 : 1.5, dl: rand() * 5, t: 2 + rand() * 4 };
});

const FLIES = Array.from({ length: 14 }, (_, i) => ({
  x: 4 + ((i * 7.3) % 92), y: 58 + ((i * 13) % 32), dl: (i * 0.7) % 6, t: 5 + (i % 5) * 1.5,
}));

const CLOUDS = [
  { top: '15%', w: 190, dur: 90,  delay: -20,  o: 1 },
  { top: '29%', w: 130, dur: 120, delay: -70,  o: 0.7 },
  { top: '7%',  w: 150, dur: 105, delay: -45,  o: 0.8 },
  { top: '40%', w: 100, dur: 140, delay: -100, o: 0.5 },
];

/* blocky hills — stepped silhouettes, like Minecraft terrain */
const CELL = 16, COLS = 80, VW = CELL * COLS, VH = 320;
function hillPath({ seed, base, amp, f1, f2 }) {
  let d = `M0 ${VH}`;
  for (let i = 0; i < COLS; i++) {
    const n = Math.sin(i * f1 + seed) * 0.6 + Math.sin(i * f2 + seed * 2.3) * 0.4;
    const y = VH - Math.round((base + amp * n) / CELL) * CELL;
    d += ` L${i * CELL} ${y} L${(i + 1) * CELL} ${y}`;
  }
  return `${d} L${VW} ${VH} Z`;
}
const HILLS = [
  { d: hillPath({ seed: 1.2, base: 120, amp: 55, f1: 0.11, f2: 0.29 }), depth: -14, night: '#2b2a5e', day: 'rgba(249,168,212,0.55)' },
  { d: hillPath({ seed: 4.7, base: 90,  amp: 45, f1: 0.15, f2: 0.37 }), depth: -26, night: '#1b1d47', day: 'rgba(244,114,182,0.50)' },
  { d: hillPath({ seed: 8.1, base: 50,  amp: 30, f1: 0.21, f2: 0.53 }), depth: -40, night: '#12311e', day: 'rgba(236,72,153,0.40)' },
];

/* ── 3D Pixel blocks (boy mode) ── */
const BLOCKS = [
  { left: '6%',  size: 34, dur: 18, delay: 0,    type: 'grass' },
  { left: '20%', size: 26, dur: 22, delay: 3.5,  type: 'wood'  },
  { left: '36%', size: 42, dur: 16, delay: 7,    type: 'stone' },
  { left: '56%', size: 30, dur: 21, delay: 1.5,  type: 'grass' },
  { left: '72%', size: 48, dur: 26, delay: 5,    type: 'wood'  },
  { left: '84%', size: 26, dur: 18, delay: 9,    type: 'stone' },
  { left: '13%', size: 20, dur: 13, delay: 11.5, type: 'grass' },
  { left: '62%', size: 36, dur: 17, delay: 4.5,  type: 'wood'  },
];
const BC = {
  grass: ['rgba(88,172,60,0.85)', 'rgba(62,110,30,0.75)', 'rgba(70,42,10,0.7)'],
  wood:  ['rgba(140,100,40,0.8)', 'rgba(100,72,28,0.75)', 'rgba(80,55,20,0.7)'],
  stone: ['rgba(120,120,130,0.7)', 'rgba(90,90,100,0.7)', 'rgba(70,70,80,0.65)'],
};

function PixelBlock({ left, size, dur, delay, type }) {
  const h = size / 2;
  const [top, side, bot] = BC[type];
  const face = (tf, bg) => ({
    position: 'absolute', width: '100%', height: '100%',
    transform: tf, background: bg, border: '1px solid rgba(255,255,255,0.05)',
  });
  return (
    <div style={{
      position: 'absolute', left, bottom: '-80px',
      width: size, height: size,
      transformStyle: 'preserve-3d',
      animation: `ch1-blockFloat ${dur}s linear ${delay}s infinite`,
    }}>
      <div style={face(`translateZ(${h}px)`, side)} />
      <div style={face(`rotateY(180deg) translateZ(${h}px)`, side)} />
      <div style={face(`rotateX(90deg) translateZ(${h}px)`, top)} />
      <div style={face(`rotateX(-90deg) translateZ(${h}px)`, bot)} />
      <div style={face(`rotateY(-90deg) translateZ(${h}px)`, side)} />
      <div style={face(`rotateY(90deg) translateZ(${h}px)`, side)} />
    </div>
  );
}

function Cloud({ top, w, dur, delay, o }) {
  return (
    <div className="ch1-cloud" style={{ top, width: w, opacity: o, animationDuration: `${dur}s`, animationDelay: `${delay}s` }}>
      <svg viewBox="0 0 120 48" width="100%" shapeRendering="crispEdges" aria-hidden="true">
        <rect x="24" y="0" width="48" height="12" />
        <rect x="0" y="12" width="120" height="12" />
        <rect x="12" y="24" width="84" height="12" />
      </svg>
    </div>
  );
}

/* ── Typewriter hook ── */
function useTypewriter(text, speed = 46, active = false) {
  const [displayed, setDisplayed] = useState('');
  const [done, setDone] = useState(false);

  useEffect(() => {
    setDisplayed(''); setDone(false);
    if (!active) return;
    let i = 0, doneTimer;
    const id = setInterval(() => {
      i += 1;
      setDisplayed(text.slice(0, i));
      if (i >= text.length) {
        clearInterval(id);
        doneTimer = setTimeout(() => setDone(true), 180);
      }
    }, speed);
    return () => { clearInterval(id); clearTimeout(doneTimer); };
  }, [text, speed, active]);

  return { displayed, done };
}

function TypedName({ full, typed, cursor, className, cursorColor }) {
  return (
    <span className="ch1-name-slot">
      <span className="ch1-sr">{full}</span>
      <span className={`ch1-name ghost ${className}`} aria-hidden="true">{full}</span>
      <span className={`ch1-name typed ${className}`} aria-hidden="true">
        {typed}
        {cursor && <span className="ch1-cursor" style={{ color: cursorColor }}>|</span>}
      </span>
    </span>
  );
}

export default function Ch1Title({ active, goToChapter, isCute }) {
  const wrapRef = useRef(null);
  const [phase, setPhase] = useState(0);
  const reduce = useMemo(
    () => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches,
    []
  );

  useEffect(() => {
    if (!active) { setPhase(0); return; }
    const t = setTimeout(() => setPhase(1), 200);
    return () => clearTimeout(t);
  }, [active]);

  const { displayed: name1, done: done1 } = useTypewriter('Oliver Ellis Westwood', 46, phase >= 1);
  const { displayed: name2, done: done2 } = useTypewriter('Ashley Franke da Costa', 46, done1);
  useEffect(() => { if (done1) setPhase(2); }, [done1]);
  useEffect(() => { if (done2) setPhase(3); }, [done2]);

  /* depth: layers follow the pointer, and sway gently when it's idle */
  useEffect(() => {
    if (!active || reduce) return;
    const el = wrapRef.current;
    if (!el) return;
    let tx = 0, ty = 0, cx = 0, cy = 0, raf = 0, last = 0;

    const onMove = (e) => {
      const r = el.getBoundingClientRect();
      tx = ((e.clientX - r.left) / r.width - 0.5) * 2;
      ty = ((e.clientY - r.top) / r.height - 0.5) * 2;
      last = performance.now();
    };
    const tick = (now) => {
      if (now - last > 2500) { tx = Math.sin(now / 4200) * 0.35; ty = Math.cos(now / 5200) * 0.2; }
      cx += (tx - cx) * 0.07;
      cy += (ty - cy) * 0.07;
      el.style.setProperty('--mx', cx.toFixed(3));
      el.style.setProperty('--my', cy.toFixed(3));
      raf = requestAnimationFrame(tick);
    };
    window.addEventListener('pointermove', onMove);
    raf = requestAnimationFrame(tick);
    return () => { window.removeEventListener('pointermove', onMove); cancelAnimationFrame(raf); };
  }, [active, reduce]);

  const fade = (pMin, delay = '0s') => ({
    opacity: phase >= pMin ? 1 : 0,
    transform: phase >= pMin ? 'translateY(0)' : 'translateY(20px)',
    transition: `opacity 0.7s ${delay}, transform 0.7s ${delay}`,
    willChange: 'opacity, transform',
  });

  return (
    <div ref={wrapRef} className={`ch1-wrap ${isCute ? 'is-cute' : ''}`}>
      <style>{STYLES}</style>

      {/* ── world ── */}
      <div className="ch1-sky" aria-hidden="true" />

      <div className="ch1-layer ch1-stars" style={{ '--d': -4 }} aria-hidden="true">
        {STARS.map((s, i) => (
          <div key={i} className="ch1-star" style={{ left: `${s.x}%`, top: `${s.y}%`, width: s.s, height: s.s, '--dl': `${s.dl}s`, '--t': `${s.t}s` }} />
        ))}
        <div className="ch1-shoot" />
      </div>

      <div className="ch1-mesh" aria-hidden="true">
        <div className="ch1-blob ch1-blob-1" />
        <div className="ch1-blob ch1-blob-2" />
        <div className="ch1-blob ch1-blob-3" />
      </div>

      <div className="ch1-layer" style={{ '--d': -10 }} aria-hidden="true">
        <div className="ch1-moon" />
      </div>

      <div className="ch1-layer" style={{ '--d': -8 }} aria-hidden="true">
        {CLOUDS.map((c, i) => <Cloud key={i} {...c} />)}
      </div>

      {HILLS.map((h, i) => (
        <div key={i} className="ch1-hills" style={{ '--d': h.depth, zIndex: 1 }} aria-hidden="true">
          <svg viewBox={`0 0 ${VW} ${VH}`} preserveAspectRatio="xMidYMax slice" shapeRendering="crispEdges">
            <path d={h.d} fill={isCute ? h.day : h.night} />
          </svg>
        </div>
      ))}

      {!isCute && (
        <>
          <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none', zIndex: 1 }} aria-hidden="true">
            {BLOCKS.map((b, i) => <PixelBlock key={i} {...b} />)}
          </div>
          <div className="ch1-layer" style={{ '--d': -34, zIndex: 2 }} aria-hidden="true">
            {FLIES.map((f, i) => (
              <div key={i} className="ch1-fly" style={{ left: `${f.x}%`, top: `${f.y}%`, '--dl': `${f.dl}s`, '--t': `${f.t}s` }} />
            ))}
          </div>
        </>
      )}

      {isCute && (
        <div style={{ position: 'absolute', inset: 0, overflow: 'hidden', pointerEvents: 'none', zIndex: 1 }} aria-hidden="true">
          {['✦', '✧', '⋆', '✦', '✧', '✦', '⋆', '✧', '✦', '✧', '⋆'].map((s, i) => (
            <div key={i} style={{
              position: 'absolute',
              left: `${8 + i * 8}%`, top: `${10 + (i % 4) * 20}%`,
              fontSize: `${10 + (i % 3) * 6}px`,
              color: i % 2 === 0 ? 'rgba(236,72,153,0.35)' : 'rgba(249,168,212,0.5)',
              animation: `ch1-sparkle${i % 3} ${3 + i * 0.4}s ease-in-out infinite`,
            }}>{s}</div>
          ))}
        </div>
      )}

      <div className="ch1-ground" />
      <div className="ch1-vignette" aria-hidden="true" />

      {/* ── content ── */}
      <div className="ch1-content">
        <div className="ch1-eyebrow" style={fade(1, '0.1s')}>
          {isCute ? '🌸 a love story 🌸' : 'our story ♥︎'}
        </div>

        <div className="ch1-stage" style={fade(1, '0.2s')}>
          <div className="ch1-tilt">
            <div className="ch1-pair">
              {/* Oliver */}
              <div className="ch1-col">
                <div className="ch1-portrait is-oliver" style={{ '--c1': 'var(--oliver)', '--c2': 'var(--oliver2)', boxShadow: 'var(--glow-acc)' }}>
                  <img src={oliverImg} alt="Oliver" />
                </div>
                <TypedName full="Oliver Ellis Westwood" typed={name1} cursor={!done1} className="oliver" cursorColor="var(--oliver)" />
              </div>

              {/* heart travels between them */}
              <svg className="ch1-link" viewBox="0 0 200 90" aria-hidden="true">
                <defs>
                  <linearGradient id="ch1-hg" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0" style={{ stopColor: 'var(--oliver)' }} />
                    <stop offset="1" style={{ stopColor: 'var(--ashley)' }} />
                  </linearGradient>
                </defs>
                <path id="ch1-arc" d="M6 70 Q100 -30 194 70" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="2 8" strokeLinecap="round" />
                <g transform={reduce ? 'translate(100 20)' : undefined}>
                  {!reduce && (
                    <animateMotion dur="4.5s" repeatCount="indefinite" calcMode="spline" keyPoints="0;1;0" keyTimes="0;0.5;1" keySplines="0.45 0 0.55 1;0.45 0 0.55 1">
                      <mpath href="#ch1-arc" />
                    </animateMotion>
                  )}
                  <g className="ch1-heartsvg">
                    <path d="M0 -4 C0 -9 -9 -9 -9 -2 C-9 4 0 8 0 10 C0 8 9 4 9 -2 C9 -9 0 -9 0 -4Z" fill="url(#ch1-hg)" transform="scale(1.4)" />
                  </g>
                </g>
              </svg>

              {/* Ashley */}
              <div className="ch1-col">
                <div className="ch1-portrait is-ashley" style={{ '--c1': 'var(--ashley)', '--c2': 'var(--ashley2)', boxShadow: 'var(--glow-pink)' }}>
                  <img src={ashleyImg} alt="Ashley" />
                </div>
                <TypedName full="Ashley Franke da Costa" typed={name2} cursor={done1 && !done2} className="ashley" cursorColor="var(--ashley)" />
              </div>
            </div>
          </div>
        </div>

        <p className="ch1-tagline" style={fade(2, '0.1s')}>
          {'A little website for ourself lol♡'}
        </p>

        <div style={fade(3, '0.25s')}>
          <div className="ch1-stat">
            <span className="ch1-stat-label">Official Since</span>
            <span className="ch1-stat-val">12 Sep 2026 / 23 Aug 2026</span>
          </div>
        </div>

        <div style={fade(3, '0.4s')}>
          <button className="big-btn pulse-btn" onClick={() => goToChapter(2)}>
            {isCute ? '🌸 Start Our Story' : '▶ Start Our Story'}
          </button>
        </div>

      
      </div>
    </div>
  );
}
