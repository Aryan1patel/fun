const PHOTOS = [
  // { file: 'us1.jpg',       cap: 'Us 💚' },
  // { file: 'mc1.jpg',       cap: 'On Minecraft 🎮' },
  // { file: 'her1.jpg',      cap: 'Ashley 🌸' },
  // { file: 'brazil1.jpg',   cap: 'Brazil vibes 🇧🇷' },
  // { file: 'uk1.jpg',       cap: 'UK days 🇬🇧' },
  // { file: 'usa1.jpg',      cap: 'USA chapter 🇺🇸' },
  // { file: 'proposal1.jpg', cap: '23 Aug 2026 💍' },
  // { file: 'proposal2.jpg', cap: '12 Sep 2026 🎮' },
];

const PLACEHOLDERS = [
  { emoji: '📷', label: 'us1.jpg', cap: 'Us 💚' },
  { emoji: '🎮', label: 'mc1.jpg', cap: 'On Minecraft 🎮' },
  { emoji: '🌸', label: 'her1.jpg', cap: 'Ashley 🌸' },
  { emoji: '🇧🇷', label: 'brazil1.jpg', cap: 'Brazil vibes 🇧🇷' },
  { emoji: '🇬🇧', label: 'uk1.jpg', cap: 'UK days 🇬🇧' },
  { emoji: '🇺🇸', label: 'usa1.jpg', cap: 'USA chapter 🇺🇸' },
  { emoji: '💍', label: 'proposal1.jpg', cap: '23 Aug 2026 💍' },
  { emoji: '🎮', label: 'proposal2.jpg', cap: '12 Sep 2026 🎮' },
];

export default function Ch5Photos({ active, goToChapter, openLightbox }) {
  const items = PHOTOS.length > 0 ? PHOTOS : PLACEHOLDERS;

  return (
    <div className="ch-inner">
      <h2 className="ch-title">📸 Our Photos</h2>
      <p className="ch-sub">
        Drop photos into <code>assets/photos/</code> 💚
      </p>
      <div className="gallery-grid" id="gallery-grid">
        {items.map((item, i) => (
          <div
            key={i}
            className="gal-item"
            data-cap={item.cap}
            onClick={() => {
              if (PHOTOS.length > 0) openLightbox(`assets/photos/${item.file}`, item.cap);
            }}
          >
            {PHOTOS.length > 0 ? (
              <img src={`assets/photos/${item.file}`} alt={item.cap} loading="lazy" />
            ) : (
              <div className="gal-ph">
                <span>{item.emoji}</span>
                <p>{item.label}</p>
              </div>
            )}
            <div className="gal-cap">{item.cap}</div>
          </div>
        ))}
      </div>
      <button className="nav-btn" onClick={() => goToChapter(6)}>NEXT CHAPTER →</button>
    </div>
  );
}
