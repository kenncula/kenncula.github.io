import { useEffect, useRef, useState } from 'react';

function isCursorGlowEnabled() {
  if (typeof window === 'undefined') return false;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return false;
  if (window.matchMedia('(pointer: coarse)').matches) return false;
  return true;
}

const CursorGlow = () => {
  const [active, setActive] = useState(isCursorGlowEnabled);
  const [visible, setVisible] = useState(false);
  const rafRef = useRef(null);

  useEffect(() => {
    if (!active) return;

    const root = document.documentElement;

    const onMove = (e) => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      rafRef.current = requestAnimationFrame(() => {
        root.style.setProperty('--cursor-x', `${e.clientX}px`);
        root.style.setProperty('--cursor-y', `${e.clientY}px`);
        setVisible(true);
      });
    };

    const onLeave = () => setVisible(false);
    const onEnter = () => setVisible(true);

    window.addEventListener('mousemove', onMove, { passive: true });
    document.addEventListener('mouseleave', onLeave);
    document.addEventListener('mouseenter', onEnter);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      window.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseleave', onLeave);
      document.removeEventListener('mouseenter', onEnter);
    };
  }, [active]);

  if (!active) return null;

  return (
    <div
      className="cursor-glow-layer pointer-events-none fixed inset-0 z-[25] overflow-hidden"
      aria-hidden
    >
      <div
        className="cursor-glow-outer"
        style={{ opacity: visible ? 1 : 0 }}
      />
      <div
        className="cursor-glow-inner"
        style={{ opacity: visible ? 1 : 0 }}
      />
    </div>
  );
};

export default CursorGlow;
