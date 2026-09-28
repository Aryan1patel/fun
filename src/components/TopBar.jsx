const CHAPTER_NAMES = ['Intro','Story','Dates','IDs','Servers','World','Quiz','Notes','Home'];

export default function TopBar({ currentChapter, totalChapters, isCute, onBack, onDotClick, onModeToggle }) {
  return (
    <header id="topbar">
      <button id="btn-back" aria-label="Previous chapter" disabled={currentChapter === 1} onClick={onBack}>
        ← Back
      </button>

      <div id="progress-dots" role="nav" aria-label="Chapters">
        {Array.from({ length: totalChapters }, (_, i) => i + 1).map(n => (
          <div
            key={n}
            className={`pdot${n === currentChapter ? ' active' : n < currentChapter ? ' done' : ''}`}
            title={CHAPTER_NAMES[n - 1]}
            role="button"
            tabIndex={0}
            onClick={() => onDotClick(n)}
            onKeyDown={e => e.key === 'Enter' && onDotClick(n)}
          />
        ))}
      </div>

      <button id="mode-btn" onClick={onModeToggle} title={isCute ? 'Switch to Oliver Mode' : 'Switch to Ashley Mode'}>
        {isCute ? '❄️' : '🌸'}
      </button>
    </header>
  );
}
