import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  introGlowKeyframes,
  introGlowTransition,
  useIntroAnimation,
} from '../context/IntroAnimationContext';

const BRAND_TEXT = 'Kenn Cula';
const TRAVEL_SPRING = { type: 'spring', stiffness: 55, damping: 22, mass: 1.1 };

const centerPosition = {
  top: '50%',
  left: '50%',
  x: '-50%',
  y: '-50%',
  fontSize: 'clamp(2.25rem, 7vw, 4rem)',
};

const cornerPosition = {
  top: '1.5rem',
  left: '1.5rem',
  x: 0,
  y: 0,
  fontSize: '1.35rem',
};

const SiteBrand = () => {
  const location = useLocation();
  const { phase, showOverlay, playLogoGlow, atCenter } = useIntroAnimation();

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
        className="fixed z-50 font-display font-semibold tracking-wide select-none"
        initial={atCenter ? centerPosition : cornerPosition}
        animate={atCenter ? centerPosition : cornerPosition}
        transition={phase === 'travel' ? TRAVEL_SPRING : { duration: 0 }}
      >
        <motion.span
          className={
            playLogoGlow
              ? 'inline-block text-brand-gold'
              : 'brand-backlight inline-block text-brand-gold'
          }
          initial={playLogoGlow ? { opacity: 0, color: '#4a3f12' } : false}
          animate={playLogoGlow ? introGlowKeyframes : undefined}
          transition={playLogoGlow ? introGlowTransition : undefined}
        >
          <Link
            to="/"
            onClick={handleLogoClick}
            className="hover:text-brand-gold-light transition-colors duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-gold"
            aria-label="Kenn Cula — home"
          >
            {BRAND_TEXT}
          </Link>
        </motion.span>
      </motion.div>
    </>
  );
};

export default SiteBrand;
