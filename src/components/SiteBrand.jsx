import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  getIntroGlowKeyframes,
  introGlowTransition,
  GLOW_IN_MS,
  useIntroAnimation,
} from '../context/IntroAnimationContext';

const BRAND_TEXT = 'Kenn Cula';
const BRAND_CHARS = BRAND_TEXT.split('');
const ACCENT_HEX = '#C9A227';

// Smoother, more elegant spring for travel
const TRAVEL_SPRING = { type: 'spring', stiffness: 42, damping: 18, mass: 1.3 };

const centerPosition = {
  top: '50%',
  left: '50%',
  x: '-50%',
  y: '-50%',
  fontSize: 'clamp(2.25rem, 7vw, 4rem)',
  letterSpacing: '0.025em',
  scale: 1,
};

const cornerPosition = {
  top: '0.95rem',
  left: '4%',
  x: '0%',
  y: '0%',
  fontSize: '1.65rem',
  letterSpacing: '0.02em',
  scale: 1,
};

// Character stagger animation for the initial reveal
const charRevealDelay = 0.08; // seconds between each character
const charRevealDuration = 0.5;

const SiteBrand = () => {
  const location = useLocation();
  const { phase, showOverlay, playLogoGlow, atCenter } = useIntroAnimation();
  const glowKeyframes = getIntroGlowKeyframes(ACCENT_HEX);

  const handleLogoClick = (e) => {
    if (location.pathname === '/') {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <>
      <motion.div
        className="fixed inset-0 z-40 bg-matte-pattern"
        initial={false}
        animate={{ opacity: showOverlay ? 1 : 0 }}
        transition={{ duration: 0.9, ease: 'easeInOut' }}
        style={{ pointerEvents: showOverlay ? 'auto' : 'none' }}
        aria-hidden={!showOverlay}
      />

      <motion.div
        className="fixed z-50 origin-top-left font-display font-semibold select-none"
        style={!atCenter ? { top: '0.95rem', left: '4%', fontSize: '1.65rem', letterSpacing: '0.02em' } : undefined}
        initial={atCenter ? centerPosition : cornerPosition}
        animate={atCenter ? centerPosition : cornerPosition}
        transition={phase === 'travel' ? TRAVEL_SPRING : { duration: 0 }}
      >
        {/* Radial light flare behind text at peak brightness */}
        <motion.div
          className="pointer-events-none absolute inset-0 -z-10 flex items-center justify-center"
          aria-hidden
        >
          <motion.div
            className="h-[300%] w-[140%] rounded-full"
            style={{
              background: 'radial-gradient(ellipse at center, rgba(201,162,39, 0.35) 0%, transparent 65%)',
            }}
            initial={{ opacity: 0, scale: 0.3 }}
            animate={
              playLogoGlow
                ? { opacity: [0, 0, 0.85, 0.25, 0], scale: [0.3, 0.3, 1.1, 0.9, 0.7] }
                : { opacity: 0, scale: 0.3 }
            }
            transition={
              playLogoGlow
                ? { duration: GLOW_IN_MS / 1000, times: [0, 0.2, 0.4, 0.7, 1], ease: 'easeInOut' }
                : { duration: 0.4 }
            }
          />
        </motion.div>

        {/* Character-by-character reveal with blur + glow animation */}
        <motion.span
          className={playLogoGlow ? 'inline-flex' : 'brand-backlight inline-flex'}
          style={!playLogoGlow ? { color: ACCENT_HEX, letterSpacing: '0.02em' } : undefined}
          initial={playLogoGlow ? { letterSpacing: '0em' } : false}
          animate={
            playLogoGlow
              ? { letterSpacing: ['0em', '0.08em', '0.04em', '0.02em'] }
              : undefined
          }
          transition={
            playLogoGlow
              ? { duration: GLOW_IN_MS / 1000, times: [0, 0.35, 0.65, 1], ease: 'easeInOut' }
              : { duration: 0 }
          }
        >
          <Link
            to="/"
            onClick={handleLogoClick}
            className="inline-flex hover:text-brand-gold-light focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-gold"
            aria-label="Kenn Cula — home"
          >
            {BRAND_CHARS.map((char, i) => (
              <motion.span
                key={i}
                className="inline-block"
                style={char === ' ' ? { width: '0.3em' } : undefined}
                initial={
                  playLogoGlow
                    ? { opacity: 0, filter: 'blur(12px)', y: 8 }
                    : false
                }
                animate={
                  playLogoGlow
                    ? {
                        opacity: glowKeyframes.opacity,
                        color: glowKeyframes.color,
                        textShadow: glowKeyframes.textShadow,
                        filter: ['blur(12px)', 'blur(0px)', 'blur(0px)', 'blur(0px)'],
                        y: [8, 0, 0, 0],
                      }
                    : { opacity: 1, color: ACCENT_HEX }
                }
                transition={
                  playLogoGlow
                    ? {
                        ...introGlowTransition,
                        delay: i * charRevealDelay,
                        filter: { duration: charRevealDuration, delay: i * charRevealDelay, ease: 'easeOut' },
                        y: { duration: charRevealDuration, delay: i * charRevealDelay, ease: 'easeOut' },
                      }
                    : { duration: 0 }
                }
              >
                {char === ' ' ? '\u00A0' : char}
              </motion.span>
            ))}
          </Link>
        </motion.span>
      </motion.div>
    </>
  );
};

export default SiteBrand;
