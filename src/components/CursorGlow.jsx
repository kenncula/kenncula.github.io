import { useEffect, useRef, useState } from 'react';

function isCursorGlowEnabled() {
  if (typeof window === 'undefined') return false;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return false;
  if (window.matchMedia('(pointer: coarse)').matches) return false;
  return true;
}

const CursorGlow = () => {
  const [active] = useState(isCursorGlowEnabled);
  const [visible, setVisible] = useState(false);
  const [sparks, setSparks] = useState([]);
  const rafRef = useRef(null);
  const sparkIdRef = useRef(0);
  const sparkTimersRef = useRef([]);

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
    const onClick = (e) => {
      const id = sparkIdRef.current;
      sparkIdRef.current += 1;

      setSparks((current) => [
        ...current,
        { id, x: e.clientX, y: e.clientY },
      ]);

      const timer = window.setTimeout(() => {
        setSparks((current) => current.filter((spark) => spark.id !== id));
      }, 1000);
      sparkTimersRef.current.push(timer);
    };

    window.addEventListener('mousemove', onMove, { passive: true });
    window.addEventListener('click', onClick);
    document.addEventListener('mouseleave', onLeave);
    document.addEventListener('mouseenter', onEnter);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      sparkTimersRef.current.forEach((timer) => window.clearTimeout(timer));
      sparkTimersRef.current = [];
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('click', onClick);
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
      {sparks.map(({ id, x, y }) => (
        <span
          key={id}
          className="cursor-click-spark"
          style={{ left: `${x}px`, top: `${y}px` }}
        />
      ))}
    </div>
  );
};

export default CursorGlow;
