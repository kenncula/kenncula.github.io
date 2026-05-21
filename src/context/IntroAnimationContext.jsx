import { createContext, useContext, useEffect, useMemo, useRef, useState } from 'react';

const INTRO_KEY = 'kenncula-intro-done';
const NAV_LINK_COUNT = 5;
const NAV_STAGGER_MS = 100;

/** Center logo fade / brighten / dim */
export const GLOW_IN_MS = 2800;
/** Nav shimmer starts only after logo intro completes */
export const NAV_GLOW_START_MS = GLOW_IN_MS;
export const NAV_GLOW_MS = 3000;
export const NAV_SETTLE_MS = NAV_GLOW_MS + (NAV_LINK_COUNT - 1) * NAV_STAGGER_MS + 150;

export const TRAVEL_SETTLE_MS = 1600;
export const OVERLAY_FADE_MS = 900;

export const introGlowKeyframes = {
  opacity: [0, 1, 1, 1],
  color: ['#4a3f12', '#fff6dc', '#e8c96a', '#C9A227'],
  textShadow: [
    '0 0 0 transparent, 0 0 0 transparent',
    '0 0 28px rgba(255, 245, 210, 0.95), 0 0 56px rgba(255, 220, 140, 0.75), 0 0 90px rgba(212, 175, 55, 0.5)',
    '0 0 20px rgba(201, 162, 39, 0.6), 0 0 40px rgba(201, 162, 39, 0.35)',
    '0 0 14px rgba(201, 162, 39, 0.5), 0 0 28px rgba(201, 162, 39, 0.28)',
  ],
};

export const introGlowTransition = {
  duration: GLOW_IN_MS / 1000,
  times: [0, 0.38, 0.65, 1],
  ease: 'easeInOut',
};

export const navGlowTransition = {
  duration: NAV_GLOW_MS / 1000,
  times: [0, 0.35, 0.65, 1],
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
  const initialPhase = getInitialPhase();
  const [phase, setPhase] = useState(initialPhase);
  const [showOverlay, setShowOverlay] = useState(initialPhase !== 'settled');
  const [navLinkState, setNavLinkState] = useState(() =>
    getInitialNavState(initialPhase)
  );
  const timersStarted = useRef(false);

  useEffect(() => {
    if (phase === 'settled') {
      if (!hasSeenIntro()) markIntroSeen();
      setNavLinkState('settled');
      return;
    }

    if (phase !== 'intro' || timersStarted.current) return;
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
  }, [phase]);

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
