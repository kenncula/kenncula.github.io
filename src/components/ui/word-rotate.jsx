"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "../../lib/utils";

/**
 * WordRotate — Cycles through an array of words with a smooth enter/exit animation.
 * Adapted from Magic UI (MIT License) for use with framer-motion.
 */

export function WordRotate({
  words,
  duration = 2500,
  motionProps = {
    initial: { opacity: 0, y: -20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: 20 },
    transition: { duration: 0.25, ease: "easeOut" },
  },
  className,
}) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % words.length);
    }, duration);

    return () => clearInterval(interval);
  }, [words, duration]);

  return (
    <div className="overflow-hidden py-1">
      <AnimatePresence mode="wait">
        <motion.span
          key={words[index]}
          className={cn("inline-block", className)}
          {...motionProps}
        >
          {words[index]}
        </motion.span>
      </AnimatePresence>
    </div>
  );
}
