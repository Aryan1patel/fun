import { useEffect, useRef } from 'react';

const makeStars = () =>
  Array.from({ length: 250 }, () => ({
    x: Math.random() * window.innerWidth,
    y: Math.random() * window.innerHeight,
    r: Math.random() * 1.8 + 0.4,
    o: Math.random() * 0.8 + 0.2,
    do: (Math.random() * 0.01 + 0.004) * (Math.random() < 0.5 ? 1 : -1),
    hue: Math.random() < 0.3 ? 45 : Math.random() < 0.15 ? 330 : 220,
    twinklePhase: Math.random() * Math.PI * 2,
    twinkleSpeed: Math.random() * 0.02 + 0.01,
  }));
const STARS = makeStars();

const AURORA_BOY = [
  { y: 0.22, phase: 0,   speed: 0.0012, amp: 0.08, color: [126,207,255] },
  { y: 0.32, phase: 2.1, speed: 0.0009, amp: 0.06, color: [147,197,253] },
  { y: 0.18, phase: 4.2, speed: 0.0014, amp: 0.05, color: [255,215,0] },
  { y: 0.28, phase: 1.5, speed: 0.0007, amp: 0.04, color: [255,121,168] },
];

export default function StarfieldCanvas({ isCute }) {
  const canvasRef = useRef(null);
  const animRef   = useRef(null);

  useEffect(() => {
    // In cute mode, hide canvas entirely — light pink gradient takes over
    if (isCute) {
      if (canvasRef.current) canvasRef.current.style.display = 'none';
      return;
    }
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.style.display = 'block';
    const ctx = canvas.getContext('2d');
    const auroras = AURORA_BOY.map(a => ({ ...a }));

    const resize = () => { canvas.width = window.innerWidth; canvas.height = window.innerHeight; };
    resize();
    window.addEventListener('resize', resize);

    const animate = () => {
      const W = canvas.width, H = canvas.height;
      ctx.clearRect(0, 0, W, H);

      auroras.forEach(a => {
        a.phase += a.speed;
        const cy = a.y + Math.sin(a.phase) * a.amp;
        const g = ctx.createLinearGradient(0, 0, 0, H);
        const [r, g2, b] = a.color;
        g.addColorStop(0, `rgba(${r},${g2},${b},0)`);
        g.addColorStop(Math.max(0, cy - 0.14), `rgba(${r},${g2},${b},0)`);
        g.addColorStop(cy, `rgba(${r},${g2},${b},0.09)`);
        g.addColorStop(Math.min(1, cy + 0.14), `rgba(${r},${g2},${b},0)`);
        g.addColorStop(1, `rgba(${r},${g2},${b},0)`);
        ctx.fillStyle = g;
        ctx.fillRect(0, 0, W, H);
      });

      STARS.forEach(s => {
        s.o += s.do;
        if (s.o > 1 || s.o < 0.1) s.do *= -1;
        
        // Enhanced twinkling effect
        s.twinklePhase += s.twinkleSpeed;
        const twinkle = Math.sin(s.twinklePhase) * 0.3 + 0.7;
        
        ctx.globalAlpha = s.o * 0.75 * twinkle;
        ctx.fillStyle = `hsl(${s.hue}, 70%, 90%)`;
        
        // Add glow for larger stars
        if (s.r > 1.2) {
          ctx.shadowBlur = 8;
          ctx.shadowColor = `hsl(${s.hue}, 70%, 90%)`;
        }
        
        ctx.beginPath(); 
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2); 
        ctx.fill();
        
        ctx.shadowBlur = 0;
      });
      ctx.globalAlpha = 1;
      animRef.current = requestAnimationFrame(animate);
    };
    animate();

    return () => { window.removeEventListener('resize', resize); cancelAnimationFrame(animRef.current); };
  }, [isCute]);

  return (
    <canvas ref={canvasRef} style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none' }} />
  );
}
