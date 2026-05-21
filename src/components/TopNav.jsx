import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';
import {
  introGlowKeyframes,
  navGlowTransition,
  useIntroAnimation,
} from '../context/IntroAnimationContext';

const NAV_LINKS = [
  { label: 'About', href: '#About' },
  { label: 'Experience', href: '#Experience' },
  { label: 'Projects', href: '#Projects' },
  { label: 'Resume', href: 'resume.pdf', external: true },
  { label: 'Contacts', href: '#Contact' },
];

const TopNav = () => {
  const { dark } = useTheme();
  const { navLinkState, showOverlay } = useIntroAnimation();

  const barClass = dark
    ? 'border-stone-800/80 text-stone-300'
    : 'border-stone-200/80 text-stone-700';

  const linkBase = dark
    ? 'hover:text-brand-gold-light'
    : 'hover:text-stone-950';

  const linkSettled = dark ? 'text-stone-300' : 'text-stone-600';

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-[45] border-b backdrop-blur-sm transition-colors duration-200 ${barClass} ${
        showOverlay ? 'bg-transparent' : dark ? 'bg-matte-pattern/95' : 'bg-stone-50/95'
      }`}
    >
      <div className="flex h-14 items-center justify-end pl-36 pr-4 sm:pl-44 sm:pr-6 md:h-16 md:pr-8">
        <nav
          className="flex flex-1 flex-wrap items-center justify-end gap-x-4 gap-y-1 text-sm sm:gap-x-6 sm:text-base"
          aria-label="Main"
        >
          {NAV_LINKS.map(({ label, href, external }, i) => {
            const isHidden = navLinkState === 'hidden';
            const isGlowing = navLinkState === 'glow';

            let animate;
            let transition;

            if (isHidden) {
              animate = { opacity: 0 };
              transition = { duration: 0 };
            } else if (isGlowing) {
              animate = introGlowKeyframes;
              transition = { ...navGlowTransition, delay: i * 0.1 };
            } else {
              animate = {
                opacity: 1,
                color: dark ? '#d6d3d1' : '#57534e',
                textShadow: '0 0 0 transparent',
              };
              transition = { duration: 0.35, ease: 'easeOut' };
            }

            return (
              <motion.a
                key={label}
                href={href}
                className={`underline-offset-4 hover:underline ${
                  isHidden ? 'pointer-events-none' : ''
                } ${
                  navLinkState === 'settled'
                    ? `${linkSettled} ${linkBase} transition-colors duration-200`
                    : 'text-brand-gold'
                }`}
                initial={false}
                animate={animate}
                transition={transition}
                {...(external
                  ? { target: '_blank', rel: 'noopener noreferrer' }
                  : {})}
              >
                {label}
              </motion.a>
            );
          })}
        </nav>
      </div>
    </header>
  );
};

export default TopNav;
