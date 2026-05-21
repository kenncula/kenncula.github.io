import { motion } from 'framer-motion';
import { useIntroAnimation } from '../context/IntroAnimationContext';

const textReveal = {
  hidden: { opacity: 0, y: 28, filter: 'blur(10px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.8, ease: 'easeOut' },
  },
};

const photoReveal = {
  hidden: { opacity: 0, x: 32, filter: 'blur(10px)' },
  visible: {
    opacity: 1,
    x: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.8, delay: 0.15, ease: 'easeOut' },
  },
};

const Intro = () => {
  const { showOverlay } = useIntroAnimation();
  const moreLinkClass =
    'text-sm inline-flex items-center gap-1.5 text-stone-300 transition-colors hover:text-brand-gold-light';

  return (
    <section
      id="Home"
      className="relative flex min-h-screen flex-col justify-center bg-matte-pattern px-6 pb-12 pt-28 text-stone-300 md:pt-32"
    >
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-10 lg:flex-row lg:items-center lg:justify-between">
        <motion.div
          className="max-w-3xl"
          initial={showOverlay ? 'hidden' : false}
          animate={showOverlay ? 'hidden' : 'visible'}
          variants={textReveal}
        >
          <p className="mb-4 text-sm font-medium uppercase tracking-[0.28em] text-brand-gold-light/90">
            Software engineer
          </p>
          <h1 className="max-w-2xl text-4xl font-semibold leading-tight text-stone-50 sm:text-5xl lg:text-6xl">
            I build <span className="text-brand-gold">AI automation</span> and{' '}
            <span className="text-brand-gold-light">embedded cellular IoT</span> systems at{' '}
            <span className="text-brand-gold">AT&amp;T</span> in Atlanta.
          </h1>
          <div className="mt-6 max-w-2xl space-y-4 text-base leading-8 text-stone-100 sm:text-lg">
            <p>
              I&apos;m a software engineer focused on intelligent automation and connected devices,
              building software for AI automation and embedded cellular IoT systems.
            </p>
            <p>
              I graduated from <span className="text-brand-gold">Cornell University</span> with a{' '}
              <span className="text-brand-gold-light">B.A. in Computer Science</span> and an{' '}
              <span className="text-brand-gold-light">M.Eng. in Computer Science</span>.
            </p>
            <p>
              Outside of work, I enjoy playing <span className="text-brand-gold">squash</span>,{' '}
              <span className="text-brand-gold">chess</span>, and{' '}
              <span className="text-brand-gold">biking</span>.
            </p>
          </div>

          <p className="mt-8">
            <a className={moreLinkClass} href="#About">
              More about me
              <span aria-hidden>→</span>
            </a>
          </p>
        </motion.div>

        <motion.div
          className="w-full max-w-sm lg:max-w-md"
          initial={showOverlay ? 'hidden' : false}
          animate={showOverlay ? 'hidden' : 'visible'}
          variants={photoReveal}
        >
          <div className="mx-auto overflow-hidden rounded-[2rem] border border-brand-gold/40 bg-stone-900/60 p-2 shadow-[0_0_40px_rgba(201,162,39,0.18)]">
            <img
              src="ken-pics/headshot1.jpg"
              alt="Portrait of Kenn Cula"
              className="aspect-[4/5] w-full rounded-[1.5rem] object-cover object-center"
            />
          </div>
        </motion.div>
      </div>

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
