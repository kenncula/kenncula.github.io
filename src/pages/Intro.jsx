import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useIntroAnimation } from '../context/IntroAnimationContext';

const introLabels = ['Engineer', 'Latino', 'Biker', 'Cook'];

const Intro = () => {
  const moreLinkClass =
    'text-sm inline-flex items-center gap-1.5 text-stone-300 transition-colors hover:text-brand-gold-light';

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
      className="relative min-h-screen flex flex-col justify-center bg-matte-pattern text-stone-300 px-6 pt-28 pb-12 md:pt-32"
    >
      <div className="w-full max-w-2xl mx-auto">
        <p className="text-sm font-medium tracking-wide text-stone-500 uppercase mb-4">
          Software engineer
        </p>
        <p className="text-lg sm:text-xl text-stone-300 leading-relaxed max-w-xl">
          Building thoughtful software: secure, distributed systems that work together like a
          symphony.
        </p>

        <p className="mt-8">
          <a className={moreLinkClass} href="#About">
            More about me
            <span aria-hidden>→</span>
          </a>
        </p>
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
