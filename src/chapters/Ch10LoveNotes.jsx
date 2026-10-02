import { useEffect, useRef, useState } from 'react';
import funPic3 from '../assets/pics/funny/ash.jpeg';
import funPic1 from '../assets/pics/funny/oliveee.jpeg';
import funPic2 from '../assets/pics/funny/cake.jpeg';

/* ─────────────────────────────────────────────────
   Self-contained — all styles live here.
   Props: active, goToChapter, spawnFloaties
   Shared class used: ch-inner

   LOOK: an oxblood scrapbook. Paper pages stacked on a deep
   wine background, a flowing script for the big moments,
   a soft serif for reading, small red tags on photos.

   ➜ ADD YOUR PHOTOS: fill in `src` for each entry in PHOTOS.
     Empty src shows a placeholder.
───────────────────────────────────────────────── */
const STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Pinyon+Script&family=Cormorant+Garamond:ital,wght@0,400;0,600;1,400;1,500&display=swap');

  /* ── Ashley theme (wine / cream) ── */
  .ch10-wrap {
    --wine:  #7a1410;
    --ink:   #8c1c16;
    --paper: #fcfbf8;
    --mute:  #8c8683;
    --blush: #e6d2d3;
    --script: 'Pinyon Script', 'Snell Roundhand', cursive;
    --serif:  'Cormorant Garamond', Georgia, serif;

    width: 100%; min-height: 100%;
    background: var(--wine);
    padding: clamp(12px, 3vw, 22px);
    padding-left: clamp(16px, 6vw, 80px);
    padding-right: clamp(16px, 6vw, 80px);
    padding-bottom: clamp(60px, 8vw, 100px);
    display: flex; flex-direction: column; gap: clamp(14px, 3vw, 22px);
    font-family: var(--serif); color: var(--ink);
    transition: background 0.5s;
    box-sizing: border-box;
  }

  /* ── Oliver theme (deep navy / ice-blue) ── */
  .ch10-wrap.oliver {
    --wine:  #1a4a70;
    --ink:   #3a9fd5;
    --paper: #0a1628;
    --mute:  #6a9dbf;
    --blush: #1c3a58;
  }

  /* page cards */
  .ch10-page {
    position: relative; overflow: hidden; background: var(--paper);
    padding: clamp(18px, 4vw, 34px);
    opacity: 0; transform: translateY(18px); transition: opacity .7s, transform .7s;
    box-sizing: border-box; width: 100%;
  }
  .ch10-page.visible { opacity: 1; transform: none; }

  /* oliver page card */
  .ch10-wrap.oliver .ch10-page { background: #0f1e38; }
  .ch10-wrap.oliver .ch10-img  { filter: grayscale(.4) contrast(1.05); }
  .ch10-wrap.oliver .ch10-blank { background: #132034; color: var(--ink); }
  .ch10-wrap.oliver .ch10-tag  { background: var(--ink); }
  .ch10-wrap.oliver .ch10-pill { background: var(--ink); border-color: var(--ink); color: #0a1628; }
  .ch10-wrap.oliver .ch10-pill:hover { background: var(--paper); color: var(--ink); }
  .ch10-wrap.oliver .ch10-pill.ghost { background: transparent; color: var(--ink); }
  .ch10-wrap.oliver .ch10-pill.ghost:hover { background: var(--ink); color: #0a1628; }
  .ch10-wrap.oliver .ch10-card { border-color: var(--ink); }
  .ch10-wrap.oliver .ch10-name.ash { color: #5bc0eb; }
  .ch10-wrap.oliver .ch10-nav-btn:hover { color: var(--ink); border-color: var(--ink); }

  .ch10-star { position: absolute; width: 74px; fill: var(--blush); pointer-events: none; }

  /* top bar / footer bar */
  .ch10-bar { display: flex; justify-content: space-between; align-items: center; gap: 10px; font-size: 16px; color: var(--mute); position: relative; z-index: 1; }
  .ch10-bar b { color: var(--ink); font-weight: 600; }
  .ch10-bar > :nth-child(2) { text-align: center; }

  /* page 1: cover */
  .ch10-cover-head { display: flex; align-items: center; justify-content: space-between; gap: 12px; position: relative; z-index: 1; }
  .ch10-date { font-size: 17px; color: var(--ink); font-weight: 600; }
  .ch10-title { text-align: center; }
  .ch10-title h2 { font-family: var(--script); font-weight: 400; font-size: clamp(50px, 13vw, 86px); line-height: 1; margin: 0; color: var(--ink); }
  .ch10-title p { margin: 6px 0 0; font-size: clamp(16px, 3.6vw, 20px); font-style: italic; color: var(--mute); }
  .ch10-title p b { font-style: normal; color: var(--ink); font-weight: 600; }

  .ch10-strip { display: grid; grid-template-columns: 1fr 1.25fr 1fr; gap: clamp(10px, 3vw, 24px); align-items: end; margin: 26px 0 22px; position: relative; z-index: 1; }
  .ch10-ph { position: relative; }
  .ch10-img, .ch10-blank { display: block; width: 100%; aspect-ratio: 4 / 5; object-fit: cover; border: 3px solid var(--wine); box-sizing: border-box; }
  .ch10-img { filter: grayscale(1) contrast(1.05); }
  .ch10-blank { background: #f1e6e6; display: flex; align-items: center; justify-content: center; font-family: var(--script); font-size: clamp(18px, 4vw, 26px); color: var(--ink); text-align: center; padding: 6px; }
  .ch10-tag {
    position: absolute; bottom: 12px; right: -6px; background: var(--wine); color: #fff;
    font-size: clamp(11px, 2.6vw, 14px); font-style: italic; padding: 3px 9px; white-space: nowrap;
  }
  .ch10-ph.mid .ch10-tag { bottom: auto; right: auto; top: 20px; left: -6px; }
  .ch10-credit { text-align: center; font-size: 16px; color: var(--mute); position: relative; z-index: 1; }
  .ch10-credit b { color: var(--ink); font-weight: 600; }

  /* page 2: notes */
  .ch10-read { min-height: 300px; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 18px; padding: 34px 0 28px; position: relative; z-index: 1; }
  .ch10-quote-wrap { animation: ch10-in .6s ease both; display: flex; flex-direction: column; align-items: center; gap: 18px; }
  @keyframes ch10-in { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: none; } }
  .ch10-quote { max-width: 460px; margin: 0; text-align: center; font-size: clamp(21px, 4.6vw, 27px); line-height: 1.5; font-style: italic; font-weight: 500; color: var(--ink); }
  .ch10-quote::first-letter { font-family: var(--script); font-style: normal; font-weight: 400; font-size: 2.7em; line-height: .7; padding-right: 2px; }
  .ch10-by { font-size: 16px; color: var(--mute); font-style: italic; }
  .ch10-nav-btn {
    all: unset; box-sizing: border-box; cursor: pointer; min-height: 44px; padding: 0 6px; font-family: var(--serif); font-size: 17px; color: var(--mute);
    border-bottom: 1px solid transparent; transition: color .2s, border-color .2s;
  }
  .ch10-nav-btn:hover { color: var(--ink); border-color: var(--ink); }

  /* page 3: generator */
  .ch10-gen { text-align: center; display: flex; flex-direction: column; align-items: center; gap: 16px; position: relative; z-index: 1; padding: 8px 0 4px; }
  .ch10-gen h3 { margin: 0; font-weight: 400; font-style: italic; font-size: clamp(20px, 4.6vw, 26px); color: var(--mute); }
  .ch10-gen h3 span { display: block; font-family: var(--script); font-style: normal; font-size: clamp(54px, 15vw, 92px); line-height: 1; color: var(--ink); }
  .ch10-card { position: relative; border: 3px solid var(--wine); max-width: 480px; width: 100%; box-sizing: border-box; padding: 34px 22px 26px; margin-top: 8px; min-height: 130px; display: flex; align-items: center; justify-content: center; }
  .ch10-card .ch10-tag { top: -13px; bottom: auto; left: 16px; right: auto; }
  .ch10-card p { margin: 0; font-size: clamp(19px, 4.2vw, 23px); line-height: 1.55; font-style: italic; color: var(--ink); animation: ch10-in .5s ease both; }
  .ch10-pill {
    all: unset; box-sizing: border-box; cursor: pointer; min-height: 44px; padding: 0 26px; display: inline-flex; align-items: center;
    background: var(--wine); color: #fff; border: 2px solid var(--wine); font-family: var(--serif); font-size: 19px; font-weight: 600; letter-spacing: .3px;
    transition: background .2s, color .2s;
  }
  .ch10-pill:hover { background: var(--paper); color: var(--wine); }
  .ch10-pill.ghost { background: transparent; color: var(--wine); }
  .ch10-pill.ghost:hover { background: var(--wine); color: #fff; }

  /* page 4: sign-off */
  .ch10-sign { text-align: center; display: flex; flex-direction: column; align-items: center; gap: 4px; padding: 14px 0 6px; position: relative; z-index: 1; }
  .ch10-name { font-family: var(--script); font-size: clamp(34px, 9vw, 58px); line-height: 1.15; color: var(--ink); }
  .ch10-name.ash { color: #b23a4c; }
  .ch10-amp { font-family: var(--script); font-size: clamp(46px, 12vw, 78px); line-height: 1; color: var(--blush); margin: -2px 0; }
  .ch10-flags { font-size: clamp(24px, 6vw, 34px); letter-spacing: 6px; margin-top: 14px; }
  .ch10-sub { font-size: 18px; font-style: italic; color: var(--mute); margin: 8px 0 0; }
  .ch10-ctas { display: flex; gap: 12px; flex-wrap: wrap; justify-content: center; margin-top: 22px; }

  .ch10-nav-btn:focus-visible, .ch10-pill:focus-visible { outline: 2px solid var(--wine); outline-offset: 3px; }

  @media (prefers-reduced-motion: reduce) {
    .ch10-page { transition: none; }
    .ch10-quote-wrap, .ch10-card p { animation: none; }
  }
`;

const NOTES = [
  "You make every single day better just by existing. I love you more than the gods could describe 🌍😘",
  "I asked you on 23rd August and I was so nervous. But you said yes. That yes changed everything ❤️",
  "You built me an entire Minecraft game just to ask me back. 12 September will always be ours 🎮🥺",
  "Brazil and the UK. Like two constellations that were always meant to align 🌟",
  "Ashley Franke da Costa — the best thing that ever happened to Oliver Ellis Westwood 🩷",
  "I think about you constantly. You've genuinely ruined me in the best possible way 😂💚",
  "You are my home, even when you're thousands of miles away 🏠❤️",
  "Thank you for existing. Thank you for being you. Thank you for choosing me",
  "I fall for you more every single day. I didn't think that was possible, but here we are 💚",
  "Distance is just a number. What we have is not ❤️",
];

const NOTE_CARDS = [
  { text: "\"You make every single day better just by existing. The distance doesn't scare me — it just means every moment together is even more special. You're my favourite person in the whole world 🌍\"", author: '— Oliver 💚', pink: false },
  { text: '"I asked you on 23rd August and I was so nervous I could barely speak. But you said yes. And that yes changed everything 💚"', author: '— Still thinking about that moment 🥺', pink: false },
  { text: "\"You made an entire Minecraft game just to ask me back. Ashley, you literally built a world for me. I'll never forget that as long as I live 🎮💕\"", author: '— 12 September forever 💚', pink: true },
  { text: "\"Brazil and the UK seem so far apart. But you feel closer to me than anyone I've ever met. We make it work every single day and I wouldn't change it 🌍\"", author: '— Your UK/USA boy 🇬🇧🇺🇸', pink: false },
];

// Replace src with your photos (import, URL or /public path).
const PHOTOS = [
  { src: funPic1, tag: 'You are', alt: 'Oliver and Ashley' },
  { src: funPic2, tag: 'My', alt: 'Ashley' },
  { src: funPic3, tag: 'favourite person', alt: 'Together' },
];

function Star({ style }) {
  return (
    <svg className="ch10-star" style={style} viewBox="0 0 24 24" aria-hidden="true">
      <polygon points="12,1.5 15,9 23,9.5 16.8,14.6 18.9,22.5 12,18 5.1,22.5 7.2,14.6 1,9.5 9,9" />
    </svg>
  );
}

export default function Ch10LoveNotes({ active, goToChapter, spawnFloaties, isCute }) {
  const pagesRef = useRef([]);
  const lastNoteRef = useRef(-1);
  const [page, setPage] = useState(0);
  const [noteText, setNoteText] = useState('Tap the button for a note from Oliver 💚');
  const [noteKey, setNoteKey] = useState(0);

  useEffect(() => {
    if (!active) {
      pagesRef.current.forEach((el) => el && el.classList.remove('visible'));
      return;
    }
    const t = pagesRef.current.map((el, i) => el && setTimeout(() => el.classList.add('visible'), i * 180));
    return () => t.forEach((x) => x && clearTimeout(x));
  }, [active]);

  const go = (d) => setPage((p) => (p + d + NOTE_CARDS.length) % NOTE_CARDS.length);

  const getNote = () => {
    let idx;
    do { idx = Math.floor(Math.random() * NOTES.length); } while (idx === lastNoteRef.current);
    lastNoteRef.current = idx;
    setNoteText(NOTES[idx]);
    setNoteKey((k) => k + 1);
    if (spawnFloaties) spawnFloaties(10);
  };

  const cur = NOTE_CARDS[page];
  const quote = cur.text.replace(/^["\u201C]|["\u201D]$/g, '');
  const reg = (i) => (el) => { pagesRef.current[i] = el; };

  return (
    <>
      <style>{STYLES}</style>
      <div className={`ch10-wrap${!isCute ? ' oliver' : ''}`}>

        {/* 1 · cover */}
        <section className="ch10-page" ref={reg(0)}>
          <Star style={{ top: -14, left: -18, transform: 'rotate(-14deg)' }} />
          <div className="ch10-cover-head">
            <span className="ch10-date">23.08</span>
            <div className="ch10-title">
              <h2>Love Notes</h2>
            </div>
            <span className="ch10-date">12.09</span>
          </div>
          <div className="ch10-strip">
            {PHOTOS.map((ph, i) => (
              <div key={i} className={`ch10-ph${i === 1 ? ' mid' : ''}`}>
                {ph.src
                  ? <img className="ch10-img" src={ph.src} alt={ph.alt} loading="lazy" />
                  : <div className="ch10-blank" role="img" aria-label={ph.alt}>your photo</div>}
                <span className="ch10-tag">{ph.tag}</span>
              </div>
            ))}
          </div>
          <p className="ch10-credit">made by <b>Oliver</b></p>
        </section>

        {/* 2 · notes, one page at a time */}
        <section className="ch10-page" ref={reg(1)}>
          <Star style={{ top: 30, right: -26, transform: 'rotate(12deg)' }} />
          <div className="ch10-bar">
            <span>since august</span>
            <span>notes <b>from Oliver</b> to Ashley</span>
            <span>always</span>
          </div>
          <div className="ch10-read" aria-live="polite">
            <div className="ch10-quote-wrap" key={page}>
              <p className="ch10-quote">{quote}</p>
              <span className="ch10-by">{cur.author}</span>
            </div>
          </div>
          <div className="ch10-bar">
            <button type="button" className="ch10-nav-btn" onClick={() => go(-1)}>back</button>
            <span>page <b>{page + 1}</b> of {NOTE_CARDS.length}</span>
            <button type="button" className="ch10-nav-btn" onClick={() => go(1)}>next</button>
          </div>
        </section>

        {/* 3 · note generator */}
        <section className="ch10-page" ref={reg(2)}>
          <Star style={{ bottom: -10, left: -20, transform: 'rotate(18deg)' }} />
          <div className="ch10-gen">
         
            <div className="ch10-card">
              <span className="ch10-tag">for today</span>
              <p key={noteKey}>{noteText}</p>
            </div>
            <button type="button" className="ch10-pill" onClick={getNote}>Draw a note</button>
          </div>
        </section>

        {/* 4 · sign-off */}
        <section className="ch10-page" ref={reg(3)}>
          <Star style={{ top: -12, right: -14, transform: 'rotate(-10deg)' }} />
          <div className="ch10-sign">

            <div className="ch10-ctas">
              <button type="button" className="ch10-pill" onClick={() => goToChapter(6)}>Next</button>
            </div>
          </div>
        </section>

      </div>
    </>
  );
}
