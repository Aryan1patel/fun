import { useState, useEffect, useRef } from 'react';
import firstOliver from '../assets/firstpicofoliver.png';
import firstAshley from '../assets/fistash.png';
import lateNight from '../assets/latenight.png';
import usPic from '../assets/uspic.png';

/* ─────────────────────────────────────────────────
   Scroll-driven story — uses IntersectionObserver
   so it works correctly inside the .chapter wrapper.
   No GSAP / ScrollTrigger dependency needed here.
───────────────────────────────────────────────── */

const STYLES = `
  .s2-hero {
    display: flex; align-items: center; justify-content: center;
    text-align: center; position: relative; overflow: hidden;
    padding: 80px 24px 80px;
    min-height: calc(100dvh - var(--nav-h));
    opacity: 0; transition: opacity 1.3s;
  }
  .s2-hero.visible { opacity: 1; }

  .s2-scene {
    position: relative; overflow: hidden;
    display: flex; align-items: center; justify-content: center;
    padding: 80px 24px 80px;
    opacity: 0; transition: opacity 1.3s;
  }
  .s2-scene.visible { opacity: 1; }

  /* big decorative number behind each scene */
  .s2-bignum {
    position: absolute; left: -4%; bottom: -6%;
    font-family: var(--font-display); font-weight: 900;
    font-size: clamp(160px, 38vw, 380px); line-height: .8;
    color: transparent; user-select: none; pointer-events: none;
    z-index: 0;
  }

  /* ambient orb */
  .s2-orb {
    position: absolute; border-radius: 50%;
    width: min(80vw, 560px); aspect-ratio: 1;
    filter: blur(60px); pointer-events: none; z-index: 0;
    right: -20%; top: 5%;
  }

  /* floating emoji */
  .s2-float {
    position: absolute; pointer-events: none; z-index: 0;
    font-size: clamp(20px, 3.5vw, 34px); opacity: .45;
  }

  .s2-content {
    position: relative; z-index: 2;
    width: 100%; max-width: 640px;
  }

  .s2-chapter-label {
    display: flex; align-items: center; gap: 12px; margin-bottom: 18px;
  }
  .s2-chapter-label .line { flex: 1; height: 1px; }

  /* title reveal */
  .s2-mask { overflow: hidden; padding-bottom: .12em; }
  .s2-title {
    font-family: var(--font-display); font-weight: 900; line-height: 1.05;
    font-size: clamp(30px, 7vw, 62px); color: var(--text); margin: 0;
    transform: translateY(110%);
    transition: transform 2.2s cubic-bezier(0.16, 1, 0.3, 1);
  }
  .s2-scene.visible .s2-title,
  .s2-hero.visible .s2-title { transform: translateY(0); }

  /* body text */
  .s2-text {
    font-family: var(--font-body);
    font-size: clamp(17px, 3.2vw, 24px); line-height: 1.65;
    color: var(--text2); margin: 24px 0 0;
    opacity: 0; transform: translateY(28px);
    transition: opacity 1.4s 0.7s, transform 1.4s 0.7s;
  }
  .s2-scene.visible .s2-text,
  .s2-hero.visible .s2-text { opacity: 1; transform: translateY(0); }

  /* hero subtitle */
  .s2-hint {
    margin-top: 48px; font-size: 14px; color: var(--text3);
    animation: s2-bob 1.4s ease-in-out infinite;
    opacity: 0;
    transition: opacity 1.4s 1.4s;
  }
  .s2-hero.visible .s2-hint { opacity: 1; }
  @keyframes s2-bob { 0%,100% { transform: translateY(0); } 50% { transform: translateY(8px); } }

  /* photos */
  .s2-photos { display: flex; gap: 14px; margin-top: 32px; }
  .s2-photo { flex: 1; position: relative; }
  .s2-photo img {
    width: 100%; aspect-ratio: 1; object-fit: cover; object-position: top;
    border-radius: 12px; display: block;
  }
  .s2-photo span {
    position: absolute; bottom: 10px; left: 50%; transform: translateX(-50%);
    font-family: var(--font-pixel); font-size: 7px; letter-spacing: 1px;
    background: rgba(7,9,26,.8); padding: 4px 10px; border-radius: 4px;
    white-space: nowrap; backdrop-filter: blur(8px);
  }
  .s2-photo-o {
    opacity: 0; transform: translateX(-40px) rotate(-6deg);
    transition: opacity 1.4s 0.8s, transform 1.4s 0.8s;
  }
  .s2-photo-a {
    opacity: 0; transform: translateX(40px) rotate(6deg);
    transition: opacity 1.4s 1.2s, transform 1.4s 1.2s;
  }
  .s2-scene.visible .s2-photo-o { opacity: 1; transform: translateX(0) rotate(-2deg); }
  .s2-scene.visible .s2-photo-a { opacity: 1; transform: translateX(0) rotate(2deg); }

  /* side nav dots */
  .s2-nav {
    position: fixed; right: 14px; top: 50%; transform: translateY(-50%);
    z-index: 200; display: flex; flex-direction: column; gap: 10px;
  }
  .s2-nav button {
    width: 8px; height: 8px; padding: 0; border-radius: 50%; border: 0;
    cursor: pointer; transition: transform .3s, background .3s, box-shadow .3s;
  }
  .s2-nav button:focus-visible { outline: 2px solid var(--text); outline-offset: 3px; }

  /* progress bar */
  .s2-progress {
    position: fixed; top: var(--nav-h); left: 0; right: 0; height: 3px; z-index: 200;
    transform-origin: 0 50%; transform: scaleX(0);
    transition: transform 0.1s linear;
  }



  /* distance arc */
  .s2-arc-wrap { margin-top: 32px; text-align: center; }
  .s2-counter {
    font-family: var(--font-display); font-weight: 900;
    font-size: clamp(40px, 10vw, 72px); line-height: 1;
    opacity: 0; transform: scale(0.85);
    transition: opacity 1.4s 0.8s, transform 1.4s 0.8s;
  }
  .s2-scene.visible .s2-counter { opacity: 1; transform: scale(1); }
  .s2-arc-path {
    stroke-dasharray: 600; stroke-dashoffset: 600;
    transition: stroke-dashoffset 3.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) 0.6s;
  }
  .s2-scene.visible .s2-arc-path { stroke-dashoffset: 0; }

  /* finale buttons */
  .s2-finale {
    margin-top: 40px; display: flex; gap: 16px;
    justify-content: center; flex-wrap: wrap;
    opacity: 0; transform: translateY(20px);
    transition: opacity 1.4s 1.3s, transform 1.4s 1.5s;
  }
  .s2-scene.visible .s2-finale { opacity: 1; transform: translateY(0); }

  @media (prefers-reduced-motion: reduce) {
    .s2-title, .s2-text, .s2-hint,
    .s2-photo-o, .s2-photo-a,
    .s2-counter, .s2-finale { transition: none; }
  }
`;

const STORY_BEATS = [
  {
    icon: '🌐', chapter: 'Chapter 1', title: 'We Found Each Other',
    text: 'Two people. Different continents. On Discord 😄 at 02/05. First pic of us that we Shared :)',
    color: '#7ecfff', cuteColor: '#ec4899', floats: [ '✨', '🌙'],
  },
  {
    icon: '🎮', chapter: 'Chapter 2', title: 'Late Nights & Long Calls',
    text: 'Hours that felt like minutes. Calls that went until sunrise. Movies, games, just… talking. Every second mattered.',
    color: '#69ff47', cuteColor: '#a855f7', floats: ['🎮','🎧'],
  },
  {
    icon: '💕', chapter: 'Chapter 3', title: 'Falling Before We Knew',
    text: 'We were already togther before either of us had a word for it. The feeling just grew — powerfully :) .',
    color: '#ff79a8', cuteColor: '#f472b6', floats: ['💕', '🌸', '✨'],
  },
  // {
  //   icon: '💍', chapter: 'Chapter 4', title: 'He Asked',
  //   text: 'Heart pounding. Words carefully rehearsed. On 23 August 2026 — Oliver asked Ashley to be his girlfriend. She said yes.',
  //   color: '#ffd700', cuteColor: '#f59e0b', floats: ['💍', '💛', '⭐', '🥹'],
  //   highlight: '23 August 2026',
  // },
  // {
  //   icon: '⛏️', chapter: 'Chapter 5', title: 'She Made It Official Her Way',
  //   text: 'Ashley built an entire game inside their Minecraft server — and proposed inside it on 12 September 2026. The most incredible thing ever.',
  //   color: '#69ff47', cuteColor: '#ec4899', floats: ['⛏️', '🟩', '💎', '🏆'],
  //   highlight: '12 September 2026',
  // },
  {
    icon: '🌍', chapter: 'Now', title: 'Oliver & Ashley — Forever',
    text: 'Brazil meets the UK. A boy studying in the USA. A girl who made 9,400 km feel like nothing. This is us — and this is just the beginning.',
    color: '#7ecfff', cuteColor: '#ec4899', floats: ['🌍', '✈️', '💙', '💖'],
    distance: true,
  },
];

const FLOAT_SPOTS = [
  { left: '8%',  top: '14%' },
  { left: '84%', top: '22%' },
  { left: '12%', top: '72%' },
  { left: '80%', top: '78%' },
];

export default function Ch2Story({ active, goToChapter, isCute }) {
  const sectionsRef = useRef([]);
  const [current, setCurrent] = useState(-1);
  const [progress, setProgress] = useState(0);

  const total = STORY_BEATS.length;
  const accentOf = (b) => (isCute ? b.cuteColor : b.color);

  /* ── scroll progress bar ── */
  useEffect(() => {
    if (!active) return;
    // find the .chapter wrapper by walking up from the first section
    const chapter = sectionsRef.current[0]?.closest('.chapter');
    if (!chapter) return;

    const onScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = chapter;
      const pct = scrollHeight <= clientHeight ? 0 : scrollTop / (scrollHeight - clientHeight);
      setProgress(pct);
    };
    chapter.addEventListener('scroll', onScroll, { passive: true });
    return () => chapter.removeEventListener('scroll', onScroll);
  }, [active]);

  /* ── side nav scroll ── */
  const scrollToScene = (i) => {
    const chapter = sectionsRef.current[0]?.closest('.chapter');
    const target = sectionsRef.current[i + 1]; // +1 because index 0 = hero
    if (chapter && target) {
      chapter.scrollTo({ top: target.offsetTop, behavior: 'smooth' });
    }
  };

  /* ── IntersectionObserver for reveal + current dot ── */
  useEffect(() => {
    if (!active) {
      sectionsRef.current.forEach(el => el && el.classList.remove('visible'));
      return;
    }

    const chapter = sectionsRef.current[0]?.closest('.chapter');
    const root = chapter || null;

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            const idx = parseInt(entry.target.dataset.idx, 10);
            setCurrent(isNaN(idx) ? -1 : idx);
          }
        });
      },
      { root, threshold: 0.4 }
    );

    sectionsRef.current.forEach(el => el && io.observe(el));
    return () => io.disconnect();
  }, [active]);

  /* ── reset on deactivate ── */
  useEffect(() => {
    if (!active) {
      setCurrent(-1);
      setProgress(0);
      // scroll chapter back to top
      const chapter = sectionsRef.current[0]?.closest('.chapter');
      if (chapter) chapter.scrollTop = 0;
    }
  }, [active]);

  const heroAccent = accentOf(STORY_BEATS[0]);
  const navAccent = current >= 0 ? accentOf(STORY_BEATS[current]) : heroAccent;

  const renderText = (beat, accent) => {
    if (!beat.highlight) return beat.text;
    const hl = beat.highlight;
    const parts = beat.text.split(hl);
    return parts.reduce((acc, part, i) => {
      acc.push(<span key={`p${i}`}>{part}</span>);
      if (i < parts.length - 1) {
        acc.push(<span key={`h${i}`} style={{ color: accent, fontWeight: 700 }}>{hl}</span>);
      }
      return acc;
    }, []);
  };

  return (
    <>
      <style>{STYLES}</style>

      {/* progress bar */}
      <div
        className="s2-progress"
        style={{
          background: navAccent,
          boxShadow: `0 0 12px ${navAccent}`,
          transform: `scaleX(${progress})`,
        }}
      />

      {/* side nav dots */}
      {active && (
        <nav className="s2-nav" aria-label="Story chapters">
          {STORY_BEATS.map((b, i) => (
            <button
              key={i}
              aria-label={b.chapter}
              onClick={() => scrollToScene(i)}
              style={{
                background: i === current ? accentOf(b) : isCute ? 'rgba(236,72,153,0.25)' : 'rgba(255,255,255,0.25)',
                transform: i === current ? 'scale(1.6)' : 'scale(1)',
                boxShadow: i === current ? `0 0 10px ${accentOf(b)}` : 'none',
              }}
            />
          ))}
        </nav>
      )}

      {/* ch-inner provides the standard padded container */}
      <div className="ch-inner" style={{ gap: 0, padding: 0, maxWidth: '100%' }}>

        {/* ── hero ── */}
        <section
          className="s2-hero"
          ref={el => { sectionsRef.current[0] = el; }}
          data-idx="-1"
        >
          {/* ambient orb */}
          <div style={{
            position: 'absolute', borderRadius: '50%',
            width: 'min(80vw, 560px)', aspectRatio: '1',
            filter: 'blur(70px)', pointerEvents: 'none', zIndex: 0,
            left: '50%', top: '50%',
            transform: 'translate(-50%, -50%)',
            background: `radial-gradient(circle, ${heroAccent}28, transparent 68%)`,
          }} />
          <div className="s2-content">
            <div className="ch-eyebrow" style={{ color: heroAccent }}>Our Story</div>
            <div className="s2-mask">
              <h2 className="s2-title" style={{ fontSize: 'clamp(34px,9vw,76px)' }}>How We Got Here</h2>
            </div>
            <p className="s2-hint" style={{ fontFamily: 'var(--font-body)' }}>
              Scroll to begin ↓
            </p>
          </div>
        </section>

        {/* ── story scenes ── */}
        {STORY_BEATS.map((beat, i) => {
          const accent = accentOf(beat);
          return (
            <section
              key={i}
              className="s2-scene"
              ref={el => { sectionsRef.current[i + 1] = el; }}
              data-idx={i}
              style={{ background: `linear-gradient(180deg, transparent, ${accent}10 50%, transparent)` }}
            >
              {/* decorative orb */}
              <div
                className="s2-orb"
                style={{ background: `radial-gradient(circle, ${accent}30, transparent 68%)` }}
              />

              {/* giant outline number */}
              <div
                className="s2-bignum"
                style={{ WebkitTextStroke: `2px ${accent}2a` }}
                aria-hidden="true"
              >
                {i + 1}
              </div>

              {/* floating emojis */}
              {beat.floats.map((emoji, k) => (
                <div
                  key={k} className="s2-float"
                  style={{ left: FLOAT_SPOTS[k].left, top: FLOAT_SPOTS[k].top }}
                  aria-hidden="true"
                >
                  {emoji}
                </div>
              ))}

              {/* content */}
              <div className="s2-content">
                <div className="s2-chapter-label">
                  <span style={{ fontSize: 26 }}>{beat.icon}</span>
                  <span style={{
                    fontFamily: 'var(--font-pixel)', fontSize: 7,
                    letterSpacing: 2, textTransform: 'uppercase', color: accent,
                  }}>
                    {beat.chapter}
                  </span>
                  <span className="line" style={{ background: `${accent}44` }} />
                </div>

                <div className="s2-mask">
                  <h3 className="s2-title">{beat.title}</h3>
                </div>

                <p className="s2-text">{renderText(beat, accent)}</p>

                {/* scene 0: first photos */}
                {i === 0 && (
                  <div className="s2-photos">
                    <div className="s2-photo s2-photo-o">
                      <img
                        src={firstOliver} alt="Oliver"
                        style={{ border: '2px solid var(--oliver)', boxShadow: '0 8px 32px rgba(126,207,255,0.3)' }}
                      />
                      <span style={{ color: 'var(--oliver)' }}>Oliver 💙</span>
                    </div>
                    <div className="s2-photo s2-photo-a">
                      <img
                        src={firstAshley} alt="Ashley"
                        style={{ border: '2px solid var(--ashley)', boxShadow: '0 8px 32px rgba(255,121,168,0.3)' }}
                      />
                      <span style={{ color: 'var(--ashley)' }}>Ashley 💖</span>
                    </div>
                  </div>
                )}

                {/* scene 1: late night photo */}
                {i === 1 && (
                  <div className="s2-photos" style={{ justifyContent: 'center' }}>
                    <div className="s2-photo s2-photo-o" style={{ maxWidth: 460 }}>
                      <img
                        src={lateNight} alt="Late nights together"
                        style={{
                          border: `2px solid ${accent}`,
                          boxShadow: `0 8px 32px ${accent}4d`,
                          aspectRatio: 'auto',
                          objectPosition: 'center',
                        }}
                      />
                      <span style={{ color: accent }}>us 🌙</span>
                    </div>
                  </div>
                )}

                {/* scene 2: falling photo */}
                {i === 2 && (
                  <div className="s2-photos" style={{ justifyContent: 'center' }}>
                    <div className="s2-photo s2-photo-a" style={{ maxWidth: 460 }}>
                      <img
                        src={usPic} alt="Us"
                        style={{
                          border: `2px solid ${accent}`,
                          boxShadow: `0 8px 32px ${accent}4d`,
                          aspectRatio: 'auto',
                          objectPosition: 'center',
                        }}
                      />
                      <span style={{ color: accent }}>us 💕</span>
                    </div>
                  </div>
                )}
                {beat.distance && (
                  <div className="s2-arc-wrap">
                    <svg viewBox="0 0 600 190" style={{ width: '100%', overflow: 'visible' }} aria-hidden="true">
                      <path
                        className="s2-arc-path"
                        d="M 50 150 Q 300 -50 550 150"
                        fill="none" stroke={accent} strokeWidth="3"
                        strokeLinecap="round"
                        style={{ filter: `drop-shadow(0 0 8px ${accent})` }}
                      />
                      <circle cx="50"  cy="150" r="9" fill="var(--oliver)" />
                      <circle cx="550" cy="150" r="9" fill="var(--ashley)" />
                    </svg>
                    <div className="s2-counter" style={{ color: accent }}>9,400 km</div>
                  </div>
                )}

                {/* finale nav */}
                {i === total - 1 && (
                  <div className="s2-finale">
                    <button className="nav-btn" onClick={() => goToChapter(1)} style={{ margin: 0 }}>
                      ↺ Back to Start
                    </button>
                    <button className="nav-btn" onClick={() => goToChapter(3)} style={{ margin: 0 }}>
                      NEXT CHAPTER →
                    </button>
                  </div>
                )}
              </div>
            </section>
          );
        })}

      </div>
    </>
  );
}
