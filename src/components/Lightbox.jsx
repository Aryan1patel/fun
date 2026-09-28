import { useEffect } from 'react';

export default function Lightbox({ src, cap, open, onClose }) {
  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [onClose]);

  return (
    <div
      id="lightbox"
      className={open ? 'open' : ''}
      aria-hidden={!open}
      onClick={(e) => { if (e.target.id === 'lightbox') onClose(); }}
    >
      <button id="lb-close" aria-label="Close" onClick={onClose}>✕</button>
      <img id="lb-img" src={src} alt={cap} />
      <p id="lb-cap">{cap}</p>
    </div>
  );
}
