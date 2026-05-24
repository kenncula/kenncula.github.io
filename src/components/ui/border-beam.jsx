"use client";

import { motion } from "framer-motion";
import { cn } from "../../lib/utils";

/**
 * BorderBeam — An animated beam of light that travels along the border of its container.
 * Adapted from Magic UI (MIT License) for use with framer-motion.
 *
 * Usage: Place inside a relatively-positioned parent with overflow-hidden.
 *   <div className="relative overflow-hidden rounded-xl ...">
 *     <BorderBeam />
 *   </div>
 */

export const BorderBeam = ({
  className,
  size = 50,
  delay = 0,
  duration = 6,
  colorFrom = "#ffaa40",
  colorTo = "#9c40ff",
  transition,
  style,
  reverse = false,
  initialOffset = 0,
  borderWidth = 1,
}) => {
  return (
    <div
      className="pointer-events-none absolute inset-0 rounded-[inherit]"
      style={{
        border: `${borderWidth}px solid transparent`,
        WebkitMask:
          "linear-gradient(transparent, transparent) padding-box, linear-gradient(#000, #000) border-box",
        WebkitMaskComposite: "xor",
        maskComposite: "exclude",
      }}
    >
      <motion.div
        className={cn(
          "absolute aspect-square bg-gradient-to-l",
          className
        )}
        style={{
          width: size,
          offsetPath: `rect(0 auto auto 0 round ${size}px)`,
          background: `linear-gradient(to left, ${colorFrom}, ${colorTo}, transparent)`,
          ...style,
        }}
        initial={{ offsetDistance: `${initialOffset}%` }}
        animate={{
          offsetDistance: reverse
            ? [`${100 - initialOffset}%`, `${-initialOffset}%`]
            : [`${initialOffset}%`, `${100 + initialOffset}%`],
        }}
        transition={{
          repeat: Infinity,
          ease: "linear",
          duration,
          delay: -delay,
          ...transition,
        }}
      />
    </div>
  );
};
