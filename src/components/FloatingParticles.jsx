import { useEffect, useRef } from 'react';

const BOY_FLOATIES  = ['⛏️','🎮','⚡','💎','🌟','☽','✦','💚','⭐','🔷','🎯','🚀','⚔️','🏆'];
const CUTE_FLOATIES = ['🌸','💕','✨','🦋','🌷','💖','🌙','🎀','⭐','🌺','💝','🌼','🍓','🎨'];

export default function FloatingParticles({ isCute, spawnBurst }) {
  const containerRef = useRef(null);
  const prevBurstRef = useRef(0);
  const isCuteRef = useRef(isCute);
  useEffect(() => { isCuteRef.current = isCute; }, [isCute]);

  const spawnOne = () => {
    if (!containerRef.current) return;
    const pool = isCuteRef.current ? CUTE_FLOATIES : BOY_FLOATIES;
    const f = document.createElement('span');
    f.className = 'floatie';
    f.textContent = pool[Math.floor(Math.random() * pool.length)];
    f.style.left = (Math.random() * 96 + 2) + 'vw';
    f.style.fontSize = (Math.random() * 18 + 14) + 'px';
    const dur = (Math.random() * 12 + 8).toFixed(1);
    f.style.animationDuration = dur + 's';
    f.style.opacity = '0';
    
    // Add random horizontal drift
    const drift = (Math.random() - 0.5) * 40;
    f.style.setProperty('--drift', `${drift}px`);
    
    // Add glow effect randomly
    if (Math.random() > 0.7) {
      f.style.filter = 'drop-shadow(0 0 8px currentColor)';
    }
    
    containerRef.current.appendChild(f);
    setTimeout(() => f.remove(), parseFloat(dur) * 1000 + 400);
  };

  useEffect(() => {
    const id = setInterval(spawnOne, 1400);
    for (let i = 0; i < 8; i++) setTimeout(spawnOne, i * 150);
    return () => clearInterval(id);
  }, [isCute]);

  useEffect(() => {
    if (spawnBurst === prevBurstRef.current) return;
    const n = spawnBurst - prevBurstRef.current;
    prevBurstRef.current = spawnBurst;
    for (let i = 0; i < Math.abs(n); i++) setTimeout(spawnOne, i * 55);
  }, [spawnBurst]);

  return <div id="floaties" ref={containerRef} />;
}
