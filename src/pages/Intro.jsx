import { motion } from 'framer-motion';
import { useIntroAnimation } from '../context/IntroAnimationContext';
import { WordRotate } from '../components/ui/word-rotate';
import { TextAnimate } from '../components/ui/text-animate';
import { Particles } from '../components/ui/particles';

const introLabels = ['Engineer', 'Latino', 'Biker', 'Cook'];

const Intro = () => {
  const { phase } = useIntroAnimation();
  const introReady = phase === 'settled';
  // Adjust the whole bio section height here: more negative moves it up, positive moves it down.
  const bioSectionOffset = '-top-24 md:-top-28';
  // Adjust the desktop portrait height here: use md:-top-* to move up, md:top-* to move down.
  const bioPhotoOffset = 'md:top-12'; // move up
  const moreLinkClass =
    'text-sm inline-flex items-center gap-1.5 text-stone-400 transition-colors hover:text-brand-gold-light';

  return (
    <section
      id="Home"
      className="relative min-h-screen flex flex-col justify-center overflow-hidden bg-matte-pattern text-stone-300 px-4 pt-20 pb-10 sm:px-6 sm:pt-28 sm:pb-12 md:pt-32"
    >
      {/* Floating gold particles background — fade in after intro settles */}
      <motion.div
        className="absolute inset-0 z-0"
        initial={{ opacity: 0 }}
        animate={introReady ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 1.5, ease: 'easeOut', delay: 0.3 }}
      >
        <Particles
          className="absolute inset-0"
          quantity={40}
          color="#C9A227"
          size={0.5}
          staticity={60}
          ease={40}
        />
      </motion.div>
      <motion.div
        className={`relative mx-auto grid w-full max-w-6xl items-center gap-8 sm:gap-12 md:grid-cols-[minmax(14rem,25rem)_minmax(0,1fr)] md:gap-16 ${bioSectionOffset}`}
        initial={{ opacity: 0, y: 18 }}
        animate={introReady ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <motion.div
          className={`relative order-2 mx-auto w-full max-w-[11rem] justify-self-center sm:max-w-[14rem] md:order-none md:mb-48 md:max-w-none md:justify-self-center ${bioPhotoOffset}`}
          initial={{ opacity: 0 }}
          animate={introReady ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 1, ease: 'easeOut', delay: introReady ? 0.2 : 0 }}
        >
          {/* Decorative accent shape behind the photo */}
          {/* <div
            className="absolute -inset-4 -translate-x-5 translate-y-5 rotate-3 rounded-2xl bg-brand-gold/20 blur-[2px] sm:-inset-5 sm:-translate-x-6 sm:translate-y-6"
            aria-hidden
          />
          <div
            className="absolute -inset-3 -translate-x-6 translate-y-3 -rotate-2 rounded-xl bg-brand-gold/10"
            aria-hidden
          /> */}
          <div className="relative isolate aspect-[4/5] overflow-hidden">
            <img
              src="/ken-pics/comic-nobg.png"
              alt="Kenn Cula"
              className="absolute inset-0 h-full w-full object-cover grayscale [mask-image:radial-gradient(ellipse_80%_70%_at_60%_30%,black_50%,transparent_100%)] [-webkit-mask-image:radial-gradient(ellipse_80%_70%_at_60%_30%,black_50%,transparent_100%)]"
            />
            <div
              className="pointer-events-none absolute inset-0 bg-brand-gold/30 mix-blend-color"
              style={{
                maskImage: 'url(/ken-pics/comic-nobg.png), radial-gradient(ellipse 80% 70% at 60% 30%, black 50%, transparent 100%)',
                maskSize: '100% 100%, 100% 100%',
                maskPosition: '0 0, center',
                maskComposite: 'intersect',
                WebkitMaskImage: 'url(/ken-pics/comic-nobg.png), radial-gradient(ellipse 80% 70% at 60% 30%, black 50%, transparent 100%)',
                WebkitMaskSize: '100% 100%, 100% 100%',
                WebkitMaskPosition: '0 0, center',
                WebkitMaskComposite: 'source-in',
              }}
              aria-hidden
            />
          </div>
        </motion.div>
        <div className="order-1 md:order-none">
          <div className="text-xl font-medium uppercase tracking-wide text-brand-gold sm:text-3xl">
            <WordRotate
              words={introLabels}
              duration={2800}
              className="inline-block text-brand-gold"
              motionProps={{
                initial: { opacity: 0, y: -14 },
                animate: { opacity: 1, y: 0 },
                exit: { opacity: 0, y: 14 },
                transition: { duration: 0.3, ease: 'easeOut' },
              }}
            />
          </div>
          {introReady && (
            <TextAnimate
              animation="blurInUp"
              by="character"
              duration={1.4}
              delay={0.2}
              as="h1"
              className="whitespace-nowrap text-3xl font-semibold leading-tight text-white sm:text-4xl md:text-5xl lg:text-6xl"
              once
            >
              Kenneth Cula
            </TextAnimate>
          )}
          {!introReady && (
            <h1 className="whitespace-nowrap text-3xl font-semibold leading-tight text-white sm:text-4xl md:text-5xl lg:text-6xl opacity-0">
              Kenneth Cula
            </h1>
          )}
          <div className="mt-3 space-y-3 text-base leading-relaxed text-stone-200 sm:space-y-4 sm:text-lg md:text-xl text-justify">
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
               Cornell University</a> {' '} with a M.Eng. in CS and B.A. in CS with a concentration in Systems.
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

          <p className="mt-6 sm:mt-8">
            <a className={moreLinkClass} href="#Experience">
              More about my work
              <span aria-hidden>→</span>
            </a>
          </p>
        </div>
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
