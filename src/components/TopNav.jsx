import { motion } from 'framer-motion';
import { EnvelopeIcon } from '@heroicons/react/24/outline';
import { useTheme } from '../context/ThemeContext';
import MusicPlayer from './Music';
import {
  introGlowKeyframes,
  navGlowTransition,
  useIntroAnimation,
} from '../context/IntroAnimationContext';

const NAV_LINKS = [
  { label: 'About', href: '#Home' },
  { label: 'Experience', href: '#Experience' },
  { label: 'Projects', href: '#Projects' },
  { label: 'Resume', href: 'resume.pdf', external: true },
];

const CONTACT_LINKS = [
  {
    label: 'GitHub',
    href: 'https://github.com/kenncula',
    iconUrl: '/github-logo.png',
  },
  {
    label: 'LinkedIn',
    href: 'https://linkedin.com/in/kenneth-cula',
    iconUrl: '/linkedin.png',
  },
  {
    label: 'Email',
    href: 'mailto:kenncula@gmail.com',
    icon: <EnvelopeIcon className="h-5 w-5" aria-hidden />,
  },
];

const TopNav = () => {
  const { dark } = useTheme();
  const { navLinkState, showOverlay } = useIntroAnimation();

  const barClass = dark
    ? 'border-stone-800/80 text-stone-300'
    : 'border-stone-200/80 text-stone-700';

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-[45] border-b backdrop-blur-sm transition-colors duration-200 ${barClass} ${
        showOverlay ? 'bg-transparent' : dark ? 'bg-matte-pattern/95' : 'bg-stone-50/95'
      }`}
    >
      <div className="flex h-14 items-center justify-end pl-36 pr-4 sm:pl-44 sm:pr-6 md:h-16 md:pr-8">
        <nav
          className="flex flex-1 flex-wrap items-center justify-end gap-x-3 gap-y-1 text-sm sm:gap-x-5 sm:text-base"
          aria-label="Main"
        >
          {/* <div
            className={`transition-opacity duration-300 ${
              showOverlay ? 'pointer-events-none opacity-0' : 'opacity-100'
            }`}
          >
            <MusicPlayer />
          </div> */}
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
                color: '#C9A227',
                textShadow:
                  '0 0 14px rgba(201, 162, 39, 0.45), 0 0 28px rgba(201, 162, 39, 0.22)',
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
                    ? 'text-brand-gold transition-colors duration-200 hover:text-brand-gold-light'
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

          <div className="flex items-center gap-2 sm:gap-3">
            {CONTACT_LINKS.map(({ label, href, icon, iconUrl }, i) => {
              const isHidden = navLinkState === 'hidden';
              const isGlowing = navLinkState === 'glow';
              const index = NAV_LINKS.length + i;

              let animate;
              let transition;

              if (isHidden) {
                animate = { opacity: 0 };
                transition = { duration: 0 };
              } else if (isGlowing) {
                animate = introGlowKeyframes;
                transition = { ...navGlowTransition, delay: index * 0.1 };
              } else {
                animate = {
                  opacity: 1,
                  color: '#C9A227',
                  textShadow:
                    '0 0 14px rgba(201, 162, 39, 0.45), 0 0 28px rgba(201, 162, 39, 0.22)',
                };
                transition = { duration: 0.35, ease: 'easeOut' };
              }

              return (
                <motion.a
                  key={label}
                  href={href}
                  aria-label={label}
                  title={label}
                  className={`grid h-8 w-8 place-items-center rounded-full text-brand-gold drop-shadow-[0_0_8px_rgba(201,162,39,0.35)] hover:text-brand-gold-light ${
                    isHidden ? 'pointer-events-none' : ''
                  } ${
                    navLinkState === 'settled'
                      ? 'transition-colors duration-200'
                      : 'text-brand-gold'
                  }`}
                  initial={false}
                  animate={animate}
                  transition={transition}
                  target={href.startsWith('http') ? '_blank' : undefined}
                  rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                >
                  {iconUrl ? (
                    <span
                      className="h-5 w-5 bg-current"
                      style={{
                        WebkitMask: `url(${iconUrl}) center / contain no-repeat`,
                        mask: `url(${iconUrl}) center / contain no-repeat`,
                      }}
                      aria-hidden
                    />
                  ) : (
                    icon
                  )}
                </motion.a>
              );
            })}
          </div>
        </nav>
      </div>
    </header>
  );
};

export default TopNav;
