import { useCallback, useEffect, useRef, useState } from 'react';

import funny1 from '../assets/pics/funny/1000167438.jpg';
import funny2 from '../assets/pics/funny/nfun1.jpeg';
import funny3 from '../assets/pics/funny/nfun2.jpeg';
import funny4 from '../assets/pics/funny/nfun3.jpeg';
import funny5 from '../assets/pics/funny/WhatsApp Image 2026-09-24 at 00.11.12.jpeg';
import funny6 from '../assets/pics/funny/WhatsApp Image 2026-09-24 at 00.15.41 (1).jpeg';
import funny7 from '../assets/pics/funny/WhatsApp Image 2026-09-24 at 00.15.41.jpeg';
import funny8 from '../assets/pics/funny/WhatsApp Image 2026-09-24 at 00.11.12.jpeg';

/* ─────────────────────────────────────────────────
   Ch4 — Funny Pics
   Beat the sliding-tile puzzle to unlock all 8
   funny photos. Photos reveal in a staggered
   polaroid gallery with a built-in viewer.
   ───────────────────────────────────────────────── */

const STYLES = `
  /* ═══ game card ═══ */
  .ch4-card {
    --n: #8fd15b;
    --ng: rgba(143,209,91,.35);
    position: relative; background: var(--surface);
    border: 2px solid var(--border);
    box-shadow: 0 0 0 2px rgba(0,0,0,.5), inset 0 0 0 1px rgba(255,255,255,.04);
    padding: 28px 24px 32px; display: flex; flex-direction: column; gap: 18px;
    max-width: 420px; margin: 0 auto 28px;
    opacity: 0; transform: translateY(20px) scale(.98);
    transition: opacity .5s, transform .5s, border-color .3s, box-shadow .3s;
    overflow: hidden;
  }
  .ch4-card.visible { opacity: 1; transform: translateY(0) scale(1); }
  .ch4-card::after {
    content: ''; position: absolute; inset: 0; pointer-events: none;
    background: repeating-linear-gradient(0deg, rgba(255,255,255,.035) 0, rgba(255,255,255,.035) 1px, transparent 1px, transparent 3px);
    mix-blend-mode: overlay;
  }
  .ch4-card.solved { border-color: var(--n); box-shadow: 0 0 0 2px rgba(0,0,0,.5), 0 0 26px var(--ng), inset 0 0 0 1px rgba(255,255,255,.06); }

  .ch4-head { display: flex; align-items: center; justify-content: space-between; gap: 10px; padding-bottom: 14px; border-bottom: 1px dashed var(--border); }
  .ch4-plat { display: flex; align-items: center; gap: 10px; min-width: 0; }
  .ch4-icon { font-size: 28px; line-height: 1; flex-shrink: 0; }
  .ch4-name { font-family: var(--font-display); font-size: 17px; color: var(--text); font-weight: 700; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
  .ch4-lvl { font-family: var(--font-pixel); font-size: 7px; letter-spacing: 1.5px; color: var(--n); border: 1px solid var(--n); padding: 5px 9px; flex-shrink: 0; white-space: nowrap; }

  /* ═══ game chrome ═══ */
  .ch4-screen { display: flex; flex-direction: column; align-items: center; gap: 12px; }
  .ch4-msg { font-family: var(--font-pixel); font-size: 7px; letter-spacing: 1px; color: var(--text3); text-align: center; line-height: 1.6; transition: color .3s; }
  .ch4-msg.done { color: var(--n); text-shadow: 0 0 8px var(--ng); }
  .ch4-meta { display: flex; align-items: center; justify-content: space-between; width: 100%; max-width: 220px; }
  .ch4-moves { font-family: var(--font-pixel); font-size: 6px; letter-spacing: 1px; color: var(--text3); }
  .ch4-reset { font-family: var(--font-pixel); font-size: 6px; letter-spacing: 1px; color: var(--text3); background: none; border: 1px solid var(--border); padding: 5px 8px; cursor: pointer; transition: color .2s, border-color .2s; }
  .ch4-reset:hover { color: var(--n); border-color: var(--n); }

  /* ═══ slider puzzle ═══ */
  .ch4-puzzle { display: grid; grid-template-columns: repeat(3, 1fr); gap: 4px; width: 100%; max-width: 200px; aspect-ratio: 1; }
  .ch4-tile {
    all: unset; box-sizing: border-box; display: flex; align-items: center; justify-content: center;
    font-family: var(--font-pixel); font-size: 14px; color: var(--text);
    background: linear-gradient(150deg, rgba(255,255,255,.08), rgba(0,0,0,.28));
    border: 1px solid var(--border); cursor: pointer; text-align: center;
    transition: transform .12s ease, background .15s, border-color .15s, color .15s;
  }
  .ch4-tile:hover { transform: scale(1.05); border-color: var(--n); color: var(--n); }
  .ch4-tile:active { transform: scale(.94); }
  .ch4-tile:focus-visible { outline: 2px solid var(--n); outline-offset: 2px; }
  .ch4-tile.ch4-blank { visibility: hidden; cursor: default; }
  .ch4-tile.ch4-home { color: var(--n); }

  /* ═══ unlocked gallery ═══ */
  .ch4-unlocked { animation: ch4-flip .5s ease both; }
  @keyframes ch4-flip { from { opacity: 0; transform: rotateX(90deg); } to { opacity: 1; transform: rotateX(0); } }
  .ch4-badge { display: block; text-align: center; font-family: var(--font-pixel); font-size: 8px; letter-spacing: 2px; color: var(--n); text-shadow: 0 0 8px var(--ng); border: 1px solid var(--n); padding: 6px 12px; margin-bottom: 18px; }

  .ch4-gallery {
    display: grid; grid-template-columns: repeat(2, 1fr); gap: 16px; padding: 0;
  }
  @media (min-width: 520px) { .ch4-gallery { grid-template-columns: repeat(3, 1fr); } }
  @media (min-width: 780px) { .ch4-gallery { grid-template-columns: repeat(4, 1fr); } }

  .ch4-photo {
    all: unset; box-sizing: border-box; display: flex; flex-direction: column; cursor: zoom-in;
    background: #f3efe6; padding: 6px 6px 0; min-width: 0;
    box-shadow: 0 6px 16px rgba(0,0,0,.45);
    transform: rotate(var(--r)); transition: transform .25s, box-shadow .25s;
    animation: ch4-dev .8s var(--d) backwards;
  }
  .ch4-photo:hover { transform: rotate(0) scale(1.06); box-shadow: 0 10px 24px rgba(0,0,0,.55), 0 0 18px var(--ng); z-index: 2; }
  @keyframes ch4-dev {
    from { opacity: 0; filter: blur(10px) grayscale(1) brightness(1.8); transform: translateY(16px) rotate(var(--r)) scale(.92); }
    to   { opacity: 1; filter: none; transform: rotate(var(--r)); }
  }
  .ch4-img { display: block; width: 100%; aspect-ratio: 1; object-fit: cover; }
  .ch4-cap { font-family: var(--font-display); font-size: 12px; color: #2b2830; padding: 8px 2px 9px; text-align: center; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }

  /* ═══ sparks ═══ */
  .ch4-spark { position: absolute; font-size: 14px; pointer-events: none; animation: ch4-pop 1s ease-out forwards; }
  @keyframes ch4-pop { 0% { opacity: 0; transform: translate(0,0) scale(.3); } 25% { opacity: 1; } 100% { opacity: 0; transform: translate(var(--tx), var(--ty)) scale(1.1); } }

  /* ═══ congrats ═══ */
  .ch4-congrats {
    text-align: center; font-family: var(--font-pixel); font-size: 8px; letter-spacing: 1px; line-height: 1.7;
    color: var(--n); text-shadow: 0 0 8px var(--ng); padding: 14px 10px; border: 1px solid var(--border);
    background: rgba(143,209,91,.06); margin-top: 12px;
    opacity: 0; transform: translateY(10px); transition: opacity .5s, transform .5s;
  }
  .ch4-congrats.visible { opacity: 1; transform: translateY(0); }
  .ch4-hint { font-size: 14px; color: var(--text3); text-align: center; letter-spacing: 1px; margin-top: 8px; }

  /* ═══ photo viewer ═══ */
  .ch4-lb {
    position: fixed; inset: 0; z-index: 1000; display: flex; align-items: center; justify-content: center;
    background: rgba(4,4,10,.88); backdrop-filter: blur(6px); animation: ch4-fade .25s ease both;
  }
  @keyframes ch4-fade { from { opacity: 0; } to { opacity: 1; } }
  .ch4-lb-fig {
    margin: 0; background: #f3efe6; padding: 10px 10px 0; max-width: min(92vw, 560px);
    box-shadow: 0 0 40px var(--ng), 0 18px 50px rgba(0,0,0,.6); animation: ch4-lbin .3s ease both;
  }
  @keyframes ch4-lbin { from { opacity: 0; transform: scale(.92) rotate(-1.5deg); } to { opacity: 1; transform: none; } }
  .ch4-lb-fig .ch4-img { aspect-ratio: auto; max-height: 68vh; min-height: 220px; height: auto; }
  .ch4-lb-cap { font-family: var(--font-display); font-size: 15px; color: #2b2830; padding: 12px 4px 14px; text-align: center; }
  .ch4-lb-btn {
    position: absolute; background: rgba(0,0,0,.5); color: #fff; border: 1px solid var(--n);
    font-family: var(--font-pixel); font-size: 12px; width: 42px; height: 42px; cursor: pointer; transition: background .2s, color .2s;
  }
  .ch4-lb-btn:hover { background: var(--n); color: #000; }
  .ch4-lb-x { top: 16px; right: 16px; }
  .ch4-lb-prev { left: 12px; top: 50%; transform: translateY(-50%); }
  .ch4-lb-next { right: 12px; top: 50%; transform: translateY(-50%); }
  .ch4-lb-count { position: absolute; bottom: 18px; font-family: var(--font-pixel); font-size: 7px; letter-spacing: 2px; color: var(--n); }

  @media (prefers-reduced-motion: reduce) {
    .ch4-photo, .ch4-unlocked, .ch4-lb, .ch4-lb-fig, .ch4-spark { animation: none; }
  }

  body.cute .ch4-card { background: rgba(255,255,255,.82); border-color: rgba(236,72,153,.15); }
  body.cute .ch4-card.solved { border-color: var(--n); }
  body.cute .ch4-tile { background: rgba(255,255,255,.5); }
  body.cute .ch4-congrats { background: rgba(236,72,153,.08); color: var(--acc); text-shadow: var(--glow-acc); }
`;

/* ───────── photos data ───────── */
const FUNNY_PHOTOS = [
  { src: funny1, caption: '😂 #1' },
  { src: funny2, caption: '🤪 #2' },
  { src: funny3, caption: '💀 #3' },
  { src: funny4, caption: '😭 #4' },
  { src: funny5, caption: '🫠 #5' },
  { src: funny6, caption: '😜 #6' },
  { src: funny7, caption: '🤣 #7' },
  { src: funny8, caption: '😆 #8' },
];

const TILT = ['-2.5deg', '1.8deg', '-1.2deg', '2.5deg', '-0.8deg', '1.5deg', '-2deg', '0.6deg'];
const SPARKS = ['✨', '⭐', '💫', '🎉', '✨', '⭐', '🤣'];
const CLEAR_DELAY = 750;

/* ───────── helpers ───────── */
function useLater() {
  const ids = useRef([]);
  useEffect(() => () => ids.current.forEach(clearTimeout), []);
  return useCallback((fn, ms) => { ids.current.push(setTimeout(fn, ms)); }, []);
}

function adjacent(i) {
  const row = Math.floor(i / 3), col = i % 3, out = [];
  if (row > 0) out.push(i - 3);
  if (row < 2) out.push(i + 3);
  if (col > 0) out.push(i - 1);
  if (col < 2) out.push(i + 1);
  return out;
}

/* ───────── slider puzzle ───────── */
const SOLVED = [1, 2, 3, 4, 5, 6, 7, 8, 0];
const isSolved = (b) => b.every((v, i) => v === SOLVED[i]);
function shuffle() {
  const board = [...SOLVED]; let blank = 8, last = -1;
  for (let i = 0; i < 90; i++) {
    const opts = adjacent(blank).filter((n) => n !== last);
    const next = opts[Math.floor(Math.random() * opts.length)];
    [board[blank], board[next]] = [board[next], board[blank]];
    last = blank; blank = next;
  }
  return isSolved(board) ? shuffle() : board;
}

/* ───────── game component ───────── */
function SlideGame({ onSolve }) {
  const later = useLater();
  const [board, setBoard] = useState(shuffle);
  const [moves, setMoves] = useState(0);
  const [done, setDone] = useState(false);

  function tap(idx) {
    if (done) return;
    const blank = board.indexOf(0);
    if (!adjacent(blank).includes(idx)) return;
    const b = [...board];
    [b[blank], b[idx]] = [b[idx], b[blank]];
    setBoard(b); setMoves(moves + 1);
    if (isSolved(b)) { setDone(true); later(onSolve, CLEAR_DELAY); }
  }

  return (
    <div className="ch4-screen">
      <p className={`ch4-msg${done ? ' done' : ''}`}>{done ? '✅ PUZZLE COMPLETE!' : '🧩 SLIDE TILES INTO ORDER 1 → 8'}</p>
      <div className="ch4-puzzle">
        {board.map((val, idx) => (
          <button
            key={idx} type="button"
            className={`ch4-tile${val === 0 ? ' ch4-blank' : ''}${val !== 0 && val === idx + 1 ? ' ch4-home' : ''}`}
            onClick={() => tap(idx)}
            aria-label={val === 0 ? 'empty slot' : `tile ${val}`}
          >{val !== 0 ? val : ''}</button>
        ))}
      </div>
      <div className="ch4-meta">
        <span className="ch4-moves">MOVES: {moves}</span>
        {!done && <button type="button" className="ch4-reset" onClick={() => { setBoard(shuffle()); setMoves(0); }}>↻ RESHUFFLE</button>}
      </div>
    </div>
  );
}

/* ───────── chapter ───────── */
export default function Ch4IDs({ active, goToChapter }) {
  const cardRef = useRef(null);
  const [cleared, setCleared] = useState(false);
  const [showSparks, setShowSparks] = useState(false);
  const [lb, setLb] = useState(null); // index into FUNNY_PHOTOS

  useEffect(() => {
    if (!active) {
      if (cardRef.current) cardRef.current.classList.remove('visible');
      return;
    }
    const t = setTimeout(() => cardRef.current && cardRef.current.classList.add('visible'), 100);
    return () => clearTimeout(t);
  }, [active]);

  // viewer keyboard controls
  useEffect(() => {
    if (lb === null) return;
    const onKey = (e) => {
      if (e.key === 'Escape') setLb(null);
      if (e.key === 'ArrowRight') setLb((l) => (l + 1) % FUNNY_PHOTOS.length);
      if (e.key === 'ArrowLeft') setLb((l) => (l - 1 + FUNNY_PHOTOS.length) % FUNNY_PHOTOS.length);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [lb]);

  function solve() {
    setCleared(true);
    setShowSparks(true);
    setTimeout(() => setShowSparks(false), 1200);
  }

  return (
    <div className="ch-inner">
      <style>{STYLES}</style>
      <h2 className="ch-title">😂 Funny Pics</h2>
      <p className="ch-sub">Beat the puzzle to unlock our funniest moments 🤪</p>

      <div
        className={`ch4-card${cleared ? ' solved' : ''}`}
        ref={cardRef}
      >
        <div className="ch4-head">
          <div className="ch4-plat">
            <span className="ch4-icon">🧩</span>
            <span className="ch4-name">Slide Puzzle</span>
          </div>
          <span className="ch4-lvl">{cleared ? '✅ CLEARED' : 'LOCKED 🔒'}</span>
        </div>

        {!cleared ? (
          <SlideGame onSolve={solve} />
        ) : (
          <div className="ch4-unlocked" style={{ position: 'relative' }}>
            <span className="ch4-badge">🔓 GALLERY UNLOCKED</span>

            <div className="ch4-gallery">
              {FUNNY_PHOTOS.map((ph, j) => (
                <button
                  key={j} type="button" className="ch4-photo"
                  style={{ '--r': TILT[j % TILT.length], '--d': `${0.2 + j * 0.12}s` }}
                  onClick={() => setLb(j)}
                  aria-label={`Open funny photo ${j + 1}`}
                >
                  <img className="ch4-img" src={ph.src} alt={ph.caption} loading="lazy" />
                  <span className="ch4-cap">{ph.caption}</span>
                </button>
              ))}
            </div>

            {showSparks && SPARKS.map((s, k) => (
              <span
                key={k} className="ch4-spark"
                style={{
                  left: `${10 + k * 13}%`, top: '-6px',
                  '--tx': `${(k % 2 ? 1 : -1) * (10 + k * 6)}px`, '--ty': `${-18 - k * 4}px`,
                  animationDelay: `${k * 0.06}s`,
                }}
              >{s}</span>
            ))}
          </div>
        )}
      </div>

      <p className="ch4-hint">{cleared ? '👆 Tap anywhere' : '👆 Slide the numbered tiles to solve the puzzle!'}</p>

      <p className={`ch4-congrats${cleared ? ' visible' : ''}`} aria-hidden={!cleared}>
        🎉 YOU DID IT 😂
      </p>

      <button className="nav-btn" onClick={() => goToChapter(5)}>NEXT CHAPTER →</button>

      {/* ═══ full-screen photo viewer ═══ */}
      {lb !== null && (
        <div
          className="ch4-lb" role="dialog" aria-modal="true" aria-label="Photo viewer"
          onClick={() => setLb(null)}
        >
          <button type="button" className="ch4-lb-btn ch4-lb-x" aria-label="Close" onClick={() => setLb(null)}>✕</button>
          <figure className="ch4-lb-fig" key={lb} onClick={(e) => e.stopPropagation()}>
            <img className="ch4-img" src={FUNNY_PHOTOS[lb].src} alt={FUNNY_PHOTOS[lb].caption} />
            <figcaption className="ch4-lb-cap">{FUNNY_PHOTOS[lb].caption}</figcaption>
          </figure>
          <button type="button" className="ch4-lb-btn ch4-lb-prev" aria-label="Previous photo" onClick={(e) => { e.stopPropagation(); setLb((l) => (l - 1 + FUNNY_PHOTOS.length) % FUNNY_PHOTOS.length); }}>‹</button>
          <button type="button" className="ch4-lb-btn ch4-lb-next" aria-label="Next photo" onClick={(e) => { e.stopPropagation(); setLb((l) => (l + 1) % FUNNY_PHOTOS.length); }}>›</button>
          <span className="ch4-lb-count">{lb + 1} / {FUNNY_PHOTOS.length}</span>
        </div>
      )}
    </div>
  );
}
