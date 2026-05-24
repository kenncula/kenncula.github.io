import { createContext, useContext, useEffect, useMemo, useRef, useState } from 'react';

const INTRO_KEY = 'kenncula-intro-done';
const NAV_LINK_COUNT = 7;
const NAV_STAGGER_MS = 100;

/** Center logo fade / brighten / dim — extended for character stagger */
export const GLOW_IN_MS = 3200;
/** Nav shimmer starts only after logo intro completes */
export const NAV_GLOW_START_MS = GLOW_IN_MS;
export const NAV_GLOW_MS = 3000;
export const NAV_SETTLE_MS = NAV_GLOW_MS + (NAV_LINK_COUNT - 1) * NAV_STAGGER_MS + 150;

export const TRAVEL_SETTLE_MS = 1800;
export const OVERLAY_FADE_MS = 1000;

export function getIntroGlowKeyframes(accentHex = '#C9A227') {
  // Convert hex to RGB for rgba usage
  const r = parseInt(accentHex.slice(1, 3), 16);
  const g = parseInt(accentHex.slice(3, 5), 16);
  const b = parseInt(accentHex.slice(5, 7), 16);
  const rgb = `${r}, ${g}, ${b}`;
  // Lighter variant for shimmer peak
  const lr = Math.min(255, r + 50);
  const lg = Math.min(255, g + 50);
  const lb = Math.min(255, b + 50);
  const darkRgb = `${Math.floor(r * 0.2)}, ${Math.floor(g * 0.2)}, ${Math.floor(b * 0.2)}`;
  const lightHex = `#${lr.toString(16).padStart(2,'0')}${lg.toString(16).padStart(2,'0')}${lb.toString(16).padStart(2,'0')}`;

  return {
    opacity: [0, 0.6, 1, 1, 1],
    color: [`rgb(${darkRgb})`, `rgba(${rgb}, 0.8)`, '#fffcf0', lightHex, accentHex],
    textShadow: [
      '0 0 0 transparent, 0 0 0 transparent',
      `0 0 12px rgba(${rgb}, 0.4), 0 0 24px rgba(${rgb}, 0.2)`,
      `0 0 32px rgba(255, 245, 210, 0.95), 0 0 64px rgba(255, 220, 140, 0.8), 0 0 100px rgba(${rgb}, 0.6)`,
      `0 0 20px rgba(${rgb}, 0.6), 0 0 40px rgba(${rgb}, 0.35)`,
      `0 0 14px rgba(${rgb}, 0.5), 0 0 28px rgba(${rgb}, 0.28)`,
    ],
  };
}

// Keep backward-compatible static export for any other consumers
export const introGlowKeyframes = getIntroGlowKeyframes();

export const introGlowTransition = {
  duration: GLOW_IN_MS / 1000,
  times: [0, 0.2, 0.45, 0.7, 1],
  ease: 'easeInOut',
};

export const navGlowTransition = {
  duration: NAV_GLOW_MS / 1000,
  times: [0, 0.2, 0.45, 0.7, 1],
  ease: 'easeInOut',
};

function hasSeenIntro() {
  try {
    return sessionStorage.getItem(INTRO_KEY) === '1';
  } catch {
    return false;
  }
}

function markIntroSeen() {
  try {
    sessionStorage.setItem(INTRO_KEY, '1');
  } catch {
    /* ignore */
  }
}

function prefersReducedMotion() {
  return (
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches
  );
}

function getInitialPhase() {
  if (hasSeenIntro() || prefersReducedMotion()) return 'settled';
  return 'intro';
}

function getInitialNavState(phase) {
  if (phase === 'settled') return 'settled';
  return 'hidden';
}

const IntroAnimationContext = createContext(null);

export function IntroAnimationProvider({ children }) {
  const [initialPhase] = useState(getInitialPhase);
  const [phase, setPhase] = useState(initialPhase);
  const [showOverlay, setShowOverlay] = useState(initialPhase !== 'settled');
  const [navLinkState, setNavLinkState] = useState(() =>
    getInitialNavState(initialPhase)
  );
  const timersStarted = useRef(false);

  useEffect(() => {
    if (initialPhase === 'settled') {
      if (!hasSeenIntro()) markIntroSeen();
      setNavLinkState('settled');
      return;
    }

    if (timersStarted.current) return;
    timersStarted.current = true;

    const travelTimer = setTimeout(() => {
      setPhase('travel');
      setNavLinkState('glow');
    }, GLOW_IN_MS);

    const navSettleTimer = setTimeout(
      () => setNavLinkState('settled'),
      NAV_GLOW_START_MS + NAV_SETTLE_MS
    );

    const overlayTimer = setTimeout(() => {
      setShowOverlay(false);
      markIntroSeen();
    }, GLOW_IN_MS + TRAVEL_SETTLE_MS);

    const settledTimer = setTimeout(() => {
      setPhase('settled');
    }, GLOW_IN_MS + TRAVEL_SETTLE_MS + OVERLAY_FADE_MS);

    return () => {
      clearTimeout(travelTimer);
      clearTimeout(navSettleTimer);
      clearTimeout(overlayTimer);
      clearTimeout(settledTimer);
      timersStarted.current = false;
    };
  }, [initialPhase]);

  const value = useMemo(
    () => ({
      phase,
      showOverlay,
      navLinkState,
      playLogoGlow: phase === 'intro',
      atCenter: phase === 'intro',
    }),
    [phase, showOverlay, navLinkState]
  );

  return (
    <IntroAnimationContext.Provider value={value}>
      {children}
    </IntroAnimationContext.Provider>
  );
}

export function useIntroAnimation() {
  const ctx = useContext(IntroAnimationContext);
  if (!ctx) {
    throw new Error('useIntroAnimation must be used within IntroAnimationProvider');
  }
  return ctx;
}
