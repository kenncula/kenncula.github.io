import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useIntroAnimation } from '../context/IntroAnimationContext';

const introLabels = ['Engineer', 'Latino', 'Biker', 'Cook'];

const Intro = () => {
  const { phase } = useIntroAnimation();
  const introReady = phase === 'settled';
  const [labelIndex, setLabelIndex] = useState(0);
  // Adjust the whole bio section height here: more negative moves it up, positive moves it down.
  const bioSectionOffset = '-top-24 md:-top-28';
  // Adjust the desktop portrait height here: use md:-top-* to move up, md:top-* to move down.
  const bioPhotoOffset = 'md:top-12'; // move up
  const moreLinkClass =
    'text-sm inline-flex items-center gap-1.5 text-stone-400 transition-colors hover:text-brand-gold-light';

  useEffect(() => {
    const delay = 1400 + Math.random() * 2200;
    const timer = setTimeout(() => {
      setLabelIndex((current) => (current + 1) % introLabels.length);
    }, delay);

    return () => clearTimeout(timer);
  }, [labelIndex]);

  return (
    <section
      id="Home"
      className="relative min-h-screen flex flex-col justify-center overflow-hidden bg-matte-pattern text-stone-300 px-6 pt-28 pb-12 md:pt-32"
    >
      <motion.div
        className={`relative mx-auto grid w-full max-w-6xl items-center gap-12 md:grid-cols-[minmax(0,1fr)_minmax(20rem,24rem)] md:gap-16 ${bioSectionOffset}`}
        initial={{ opacity: 0, y: 18 }}
        animate={introReady ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
      >
        <div>
          <p className="mt-4 text-3xl font-medium uppercase tracking-wide text-brand-gold">
            <motion.span
              key={introLabels[labelIndex]}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              className="inline-block"
            >
              {introLabels[labelIndex]}
            </motion.span>
          </p>
          <h1 className="max-w-3xl text-4xl font-semibold leading-tight text-white sm:text-5xl md:text-6xl">
            Kenneth Cula
          </h1>
          <div className="mt-3 max-w-2xl space-y-4 text-lg leading-relaxed text-stone-200 sm:text-xl">
            <p>
              I&apos;m a software engineer working at{' '}
              <a
                href="https://www.att.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-brand-gold-light"
              >
                AT&amp;T
              </a>{' '}
              <span >in Atlanta</span> on{' '}
              <span className="text-brand-gold-light">AI automation</span> and building software for <span className="text-brand-gold-light"> cellular IoT </span>
               devices. My work focuses on integrating AI tools and workflows to speed up network data analysis, 
               as well as building embedded systems logic to bring legacy IoT devices to the 5G NR standard and beyond.

            </p>
            <p>
              I graduated from{' '} <a
                href="https://www.cornell.edu/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-brand-gold-light"
              > 
               Cornell University</a> {' '} with M.Eng. in CS and Bachelors in CS.
               </p>
            <p>
              I spend my free time hitting squash, riding long-haul biking, and playing {' '}
              <a
                href="https://www.chess.com/member/kenncula"
                target="_blank"
                rel="noopener noreferrer"
                className="text-brand-gold-light"
              > 
               chess</a>. 
            </p>
          </div>

          <p className="mt-8">
            <a className={moreLinkClass} href="#Experience">
              More about my work
              <span aria-hidden>→</span>
            </a>
          </p>
        </div>

        <motion.div
          className={`relative mx-auto mb-24 w-full max-w-xs justify-self-center md:mb-48 md:max-w-sm md:justify-self-end ${bioPhotoOffset}`}
          initial={{ opacity: 0, scale: 0.96 }}
          animate={introReady ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.96 }}
          transition={{ duration: 1, ease: 'easeOut', delay: introReady ? 0.2 : 0 }}
        >
          <div className="absolute -inset-3 " aria-hidden  />
          <img
            // src="/ken-pics/headshot4.jpeg"
            src="/ken-pics/comic-nobg.png"
            alt="Kenn Cula"
            className="relative aspect-[4/5] object-cover"
          />
        </motion.div>
      </motion.div>

      <p
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-brand-gold/40 text-sm select-none"
        aria-hidden
      >
        ↓
      </p>
    </section>
  );
};

export default Intro;
