// Lightweight click spark preview helper
const variants = ['burst', 'pulse', 'ripple', 'rotate', 'blur'];
let cycle = 0;

function createSpark(x, y, variant) {
  const el = document.createElement('div');
  el.className = 'cursor-click-spark' + (variant && variant !== 'burst' ? ' ' + variant : '');
  el.style.left = x + 'px';
  el.style.top = y + 'px';
  el.style.position = 'fixed';
  el.style.pointerEvents = 'none';
  document.body.appendChild(el);

  const remove = () => {
    if (el && el.parentNode) el.parentNode.removeChild(el);
  };

  el.addEventListener('animationend', remove, { once: true });
  // fallback cleanup
  setTimeout(remove, 1400);
}

function onPointer(e) {
  // ignore when interacting with form inputs
  const tag = e.target && e.target.tagName && e.target.tagName.toLowerCase();
  if (tag === 'input' || tag === 'textarea' || e.target.isContentEditable) return;

  const x = e.clientX;
  const y = e.clientY;
  const variant = variants[cycle % variants.length];
  cycle += 1;
  createSpark(x, y, variant);
}

function init() {
  if (typeof window === 'undefined') return;
  window.addEventListener('pointerdown', onPointer, { passive: true });
}

// Auto-init when imported
init();

export default init;
