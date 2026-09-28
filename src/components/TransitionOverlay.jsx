import { useEffect, useRef } from 'react';

const COLS = 8;
const TOTAL_BLOCKS = 48;

export default function TransitionOverlay({ phase }) {
  const overlayRef = useRef(null);
  const blocksRef = useRef([]);

  useEffect(() => {
    const blocks = blocksRef.current;
    if (!blocks.length) return;

    if (phase === 'in') {
      overlayRef.current.style.opacity = 1;
      overlayRef.current.classList.add('animating');
      blocks.forEach((b, i) => {
        b.style.transitionDelay = (i % COLS * 38) + 'ms';
        b.style.transformOrigin = 'bottom';
        b.style.transform = 'scaleY(1)';
      });
    } else if (phase === 'out') {
      blocks.forEach((b, i) => {
        b.style.transitionDelay = (i % COLS * 38) + 'ms';
        b.style.transformOrigin = 'top';
        b.style.transform = 'scaleY(0)';
      });
    } else if (phase === 'idle') {
      overlayRef.current.style.opacity = 0;
      overlayRef.current.classList.remove('animating');
    }
  }, [phase]);

  return (
    <div id="transition-overlay" ref={overlayRef}>
      {Array.from({ length: TOTAL_BLOCKS }, (_, i) => (
        <div
          key={i}
          className="t-block"
          ref={el => { blocksRef.current[i] = el; }}
        />
      ))}
    </div>
  );
}
