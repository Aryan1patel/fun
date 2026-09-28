import { useState, useEffect, useRef, useCallback } from 'react';
import StarfieldCanvas from './components/StarfieldCanvas';
import TopBar from './components/TopBar';
import TransitionOverlay from './components/TransitionOverlay';
import FloatingParticles from './components/FloatingParticles';
import Toast from './components/Toast';
import Lightbox from './components/Lightbox';
import Ch1Title from './chapters/Ch1Title';
import Ch2Story from './chapters/Ch2Story';
import Ch3Dates from './chapters/Ch3Dates';
import Ch4IDs from './chapters/Ch4IDs';
import Ch5LoveNotes from './chapters/Ch10LoveNotes';
import Ch6Home from './chapters/Ch9Home';

/* ─────────────────────────────────────────────────
   🔑 SITE PASSWORD — change this to whatever you want
───────────────────────────────────────────────── */
const SITE_PASSWORD   = 'pufferfish';
const SHORTCUT_PASS   = '1111';
const SHORTCUT_CHAPTER = 6; // home page chapter number

const TOTAL_CHAPTERS = 6;

/* ══ Gate / Person-select styles ══ */
const GATE_CSS = `
  .gate-overlay {
    position: fixed; inset: 0; z-index: 500;
    display: flex; align-items: center; justify-content: center;
    background: rgba(4,6,16,.95); backdrop-filter: blur(3px);
    animation: gate-in .35s ease;
  }
  @keyframes gate-in { from { opacity: 0; } to { opacity: 1; } }

  .gate-box {
    display: flex; flex-direction: column; align-items: center; gap: 20px;
    padding: clamp(30px,5vw,50px) clamp(28px,6vw,54px);
    max-width: 380px; width: 90%;
    background: var(--surface); border: 1px solid var(--border);
    box-shadow: 0 0 60px var(--glow-acc), 0 0 0 1px rgba(255,255,255,.04);
  }
  .gate-box.shake { animation: gate-shake .35s ease; }
  @keyframes gate-shake { 0%,100%{transform:translateX(0)} 25%{transform:translateX(-10px)} 75%{transform:translateX(10px)} }

  .gate-icon  { font-size: 38px; }
  .gate-title { font-family: var(--font-pixel); font-size: 9px; letter-spacing: 3px; color: var(--acc); text-align: center; }
  .gate-sub   { font-size: 13px; color: var(--text3); text-align: center; line-height: 1.6; }

  .gate-input {
    all: unset; box-sizing: border-box; width: 100%;
    background: rgba(0,0,0,.35); border: 1px solid var(--border);
    padding: 13px 18px; font-family: var(--font-pixel); font-size: 11px;
    color: var(--text); letter-spacing: 2px; text-align: center;
    transition: border-color .2s, box-shadow .2s;
  }
  .gate-input::placeholder { color: var(--text3); letter-spacing: 1px; }
  .gate-input:focus { border-color: var(--acc); box-shadow: 0 0 0 1px var(--acc); }

  .gate-btn {
    all: unset; box-sizing: border-box; cursor: pointer; width: 100%; text-align: center;
    background: var(--acc-dim); border: 1px solid var(--acc);
    color: var(--acc); font-family: var(--font-pixel); font-size: 9px;
    letter-spacing: 2px; padding: 13px;
    transition: background .2s, color .2s;
  }
  .gate-btn:hover { background: var(--acc); color: var(--bg); }
  .gate-error { font-family: var(--font-pixel); font-size: 7px; color: #ff5c6c; letter-spacing: 1px; min-height: 12px; text-align: center; }

  /* person cards */
  .ps-heading { font-family: var(--font-pixel); font-size: 8px; letter-spacing: 4px; color: var(--text3); text-align: center; }
  .ps-cards   { display: flex; gap: 16px; flex-wrap: wrap; justify-content: center; }
  .ps-card {
    all: unset; cursor: pointer; display: flex; flex-direction: column;
    align-items: center; gap: 14px; padding: 28px 34px;
    background: var(--surface); border: 2px solid var(--border);
    transition: border-color .25s, box-shadow .25s, transform .25s;
    min-width: 130px;
  }
  .ps-card:hover                { transform: translateY(-5px); }
  .ps-card.oliver:hover         { border-color: var(--oliver); box-shadow: 0 0 24px rgba(126,207,255,.2); }
  .ps-card.ashley:hover         { border-color: var(--ashley); box-shadow: 0 0 24px rgba(255,121,168,.2); }
  .ps-emoji                     { font-size: 38px; }
  .ps-label                     { font-family: var(--font-pixel); font-size: 9px; letter-spacing: 2px; }
  .ps-card.oliver .ps-label     { color: var(--oliver); }
  .ps-card.ashley .ps-label     { color: var(--ashley); }

  /* user badge in app */
  .user-badge {
    position: fixed; bottom: 14px; left: 14px; z-index: 200;
    font-family: var(--font-pixel); font-size: 7px; letter-spacing: 1px;
    padding: 5px 10px; background: var(--surface); border: 1px solid var(--border);
    cursor: pointer; transition: border-color .2s; color: var(--text3);
  }
  .user-badge:hover { border-color: var(--acc); color: var(--acc); }
`;

/* ══ Password gate ══ */
function PasswordGate({ onSuccess, onShortcut }) {
  const [val, setVal]     = useState('');
  const [err, setErr]     = useState('');
  const [shake, setShake] = useState(false);

  const attempt = useCallback(() => {
    if (val.trim().toLowerCase() === SITE_PASSWORD.toLowerCase()) {
      onSuccess();
    } else if (val.trim() === SHORTCUT_PASS) {
      onShortcut();
    } else {
      setShake(true); setErr('Wrong password ✘');
      setTimeout(() => { setShake(false); setErr(''); }, 700);
      setVal('');
    }
  }, [val, onSuccess, onShortcut]);

  useEffect(() => {
    const fn = (e) => { if (e.key === 'Enter') attempt(); };
    window.addEventListener('keydown', fn);
    return () => window.removeEventListener('keydown', fn);
  }, [attempt]);

  return (
    <div className="gate-overlay">
      <style>{GATE_CSS}</style>
      <div className={`gate-box${shake ? ' shake' : ''}`}>
        <span className="gate-icon">🔒</span>
        <span className="gate-title">PRIVATE ACCESS</span>
        <p className="gate-sub">Our little corner of the internet 💚<br />Enter the password to continue</p>
        <input
          className="gate-input" type="password"
          placeholder="· · · · · · · ·"
          value={val} onChange={e => setVal(e.target.value)}
          autoFocus
        />
        <button className="gate-btn" onClick={attempt}>ENTER ↵</button>
        <span className="gate-error">{err}</span>
      </div>
    </div>
  );
}

/* ══ Person selector ══ */
function PersonSelector({ onSelect }) {
  return (
    <div className="gate-overlay">
      <style>{GATE_CSS}</style>
      <div className="gate-box" style={{ gap: '28px' }}>
        <span className="gate-icon">✨</span>
        <span className="gate-title">WHO ARE YOU?</span>
        <p className="gate-sub">Choose so the site knows your picks!</p>
        <div className="ps-cards">
          <button className="ps-card oliver" onClick={() => onSelect('oliver')}>
            <span className="ps-emoji">❄️</span>
            <span className="ps-label">OLIVER</span>
          </button>
          <button className="ps-card ashley" onClick={() => onSelect('ashley')}>
            <span className="ps-emoji">🌸</span>
            <span className="ps-label">ASHLEY</span>
          </button>
        </div>
      </div>
    </div>
  );
}

/* ══ Custom cursor ══ */
function CustomCursor() {
  const dotRef  = useRef(null);
  const ringRef = useRef(null);
  const posRef  = useRef({ x: 0, y: 0 });
  const ringPos = useRef({ x: 0, y: 0 });
  const rafRef  = useRef(null);

  useEffect(() => {
    const onMove = (e) => {
      posRef.current = { x: e.clientX, y: e.clientY };
      if (dotRef.current) {
        dotRef.current.style.left = e.clientX + 'px';
        dotRef.current.style.top  = e.clientY + 'px';
      }
    };

    const lerp = (a, b, t) => a + (b - a) * t;
    const tick = () => {
      ringPos.current.x = lerp(ringPos.current.x, posRef.current.x, 0.1);
      ringPos.current.y = lerp(ringPos.current.y, posRef.current.y, 0.1);
      if (ringRef.current) {
        ringRef.current.style.left = ringPos.current.x + 'px';
        ringRef.current.style.top  = ringPos.current.y + 'px';
      }
      rafRef.current = requestAnimationFrame(tick);
    };

    const onEnter = () => document.body.classList.add('cursor-hover');
    const onLeave = () => document.body.classList.remove('cursor-hover');

    document.addEventListener('mousemove', onMove);
    rafRef.current = requestAnimationFrame(tick);

    const interactives = 'button, a, [role="button"], input, .qopt, .id-value, .srv-ip, .gal-item, .pdot';
    const addListeners = () => {
      document.querySelectorAll(interactives).forEach(el => {
        el.addEventListener('mouseenter', onEnter);
        el.addEventListener('mouseleave', onLeave);
      });
    };
    addListeners();
    const observer = new MutationObserver(addListeners);
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      document.removeEventListener('mousemove', onMove);
      cancelAnimationFrame(rafRef.current);
      observer.disconnect();
    };
  }, []);

  return (
    <>
      <div id="cursor-dot"  ref={dotRef}  />
      <div id="cursor-ring" ref={ringRef} />
    </>
  );
}

export default function App() {
  /* ── auth phase: 'password' | 'person' | 'app' ── */
  const [phase, setPhase] = useState(() => sessionStorage.getItem('oa-phase') || 'password');
  const [user,  setUser]  = useState(() => sessionStorage.getItem('oa-user')  || null);

  const [currentChapter, setCurrentChapter] = useState(1);
  const [isCute, setIsCute] = useState(() => localStorage.getItem('oa-mode') === 'cute');
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [toastMsg, setToastMsg] = useState('');
  const [toastVisible, setToastVisible] = useState(false);
  const [lightboxSrc, setLightboxSrc] = useState('');
  const [lightboxCap, setLightboxCap] = useState('');
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [transitionPhase, setTransitionPhase] = useState('idle');
  const [spawnBurst, setSpawnBurst] = useState(0);

  const toastTimerRef = useRef(null);
  const chapterRefs   = useRef({});

  useEffect(() => { document.body.classList.toggle('cute', isCute); }, [isCute]);

  const showToast = useCallback((msg) => {
    setToastMsg(msg); setToastVisible(true);
    clearTimeout(toastTimerRef.current);
    toastTimerRef.current = setTimeout(() => setToastVisible(false), 2600);
  }, []);

  const spawnFloaties = useCallback((n = 1) => { setSpawnBurst(prev => prev + n); }, []);

  const goToChapter = useCallback((n) => {
    if (n === currentChapter || isTransitioning) return;
    if (n < 1 || n > TOTAL_CHAPTERS) return;
    setIsTransitioning(true);
    setTransitionPhase('in');
    setTimeout(() => {
      setCurrentChapter(n);
      setTransitionPhase('out');
      const el = chapterRefs.current[n];
      if (el) el.scrollTop = 0;
      setTimeout(() => { setTransitionPhase('idle'); setIsTransitioning(false); }, 380);
    }, 360);
  }, [currentChapter, isTransitioning]);

  const toggleMode = useCallback(() => {
    setIsCute(prev => {
      const next = !prev;
      localStorage.setItem('oa-mode', next ? 'cute' : 'boy');
      showToast(next ? '🌸 Ashley Mode' : '❄️ Oliver Mode');
      spawnFloaties(14);
      return next;
    });
  }, [showToast, spawnFloaties]);

  const openLightbox = useCallback((src, cap) => {
    setLightboxSrc(src); setLightboxCap(cap); setLightboxOpen(true);
  }, []);

  const copyText = useCallback((text, label) => {
    navigator.clipboard.writeText(text).catch(() => {
      const ta = document.createElement('textarea');
      ta.value = text; document.body.appendChild(ta); ta.select();
      document.execCommand('copy'); document.body.removeChild(ta);
    });
    showToast('Copied — ' + (label || text));
  }, [showToast]);

  const handlePasswordSuccess = useCallback(() => { setPhase('person'); }, []);

  const handleShortcut = useCallback(() => {
    setPhase('shortcut');
  }, []);

  const handleShortcutSelect = useCallback((u) => {
    setUser(u);
    // set the correct theme for the chosen person
    const cute = u === 'ashley';
    setIsCute(cute);
    localStorage.setItem('oa-mode', cute ? 'cute' : 'boy');
    sessionStorage.setItem('oa-user', u);
    sessionStorage.setItem('oa-phase', 'app');
    setPhase('app');
    setCurrentChapter(SHORTCUT_CHAPTER);
    showToast(u === 'oliver' ? '❄️ Hey Oliver!' : '🌸 Hey Ashley!');
  }, [showToast]);

  const handlePersonSelect = useCallback((u) => {
    setUser(u);
    sessionStorage.setItem('oa-user', u);
    sessionStorage.setItem('oa-phase', 'app');
    setPhase('app');
    showToast(u === 'oliver' ? '❄️ Hey Oliver!' : '🌸 Hey Ashley!');
  }, [showToast]);

  const chapterProps = { goToChapter, showToast, spawnFloaties, isCute, copyText, openLightbox, currentChapter, user };

  return (
    <>
      <CustomCursor />
      <StarfieldCanvas isCute={isCute} />
      <FloatingParticles isCute={isCute} spawnBurst={spawnBurst} />

      {/* ── Auth gates (overlay on top of starfield) ── */}
      {phase === 'password'  && <PasswordGate onSuccess={handlePasswordSuccess} onShortcut={handleShortcut} />}
      {phase === 'person'    && <PersonSelector onSelect={handlePersonSelect} />}
      {phase === 'shortcut'  && <PersonSelector onSelect={handleShortcutSelect} />}

      {/* ── Main app ── */}
      {phase === 'app' && (
        <>
          <TopBar
            currentChapter={currentChapter}
            totalChapters={TOTAL_CHAPTERS}
            isCute={isCute}
            onBack={() => goToChapter(currentChapter - 1)}
            onDotClick={goToChapter}
            onModeToggle={toggleMode}
          />
          <TransitionOverlay phase={transitionPhase} />

          {[Ch1Title, Ch2Story, Ch3Dates, Ch4IDs, Ch5LoveNotes, Ch6Home].map((ChapterComp, idx) => {
            const n = idx + 1;
            return (
              <div
                key={n} id={`ch${n}`}
                className={`chapter${currentChapter === n ? ' active' : ''}`}
                ref={el => { chapterRefs.current[n] = el; }}
              >
                <ChapterComp active={currentChapter === n} {...chapterProps} />
              </div>
            );
          })}

          <Toast msg={toastMsg} visible={toastVisible} />
          <Lightbox src={lightboxSrc} cap={lightboxCap} open={lightboxOpen} onClose={() => setLightboxOpen(false)} />

          {/* tiny user badge — click to switch person */}
          <style>{GATE_CSS}</style>
          <button
            className="user-badge"
            onClick={() => { sessionStorage.removeItem('oa-phase'); sessionStorage.removeItem('oa-user'); setPhase('person'); setUser(null); }}
            title="Switch user"
          >
            {user === 'oliver' ? '❄️ Oliver' : '🌸 Ashley'} · switch
          </button>
        </>
      )}
    </>
  );
}
