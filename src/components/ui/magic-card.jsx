"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useSpring,
} from "framer-motion";

import { cn } from "../../lib/utils";

/**
 * MagicCard — A spotlight effect card that follows your cursor.
 * Adapted from Magic UI (MIT License) for use with framer-motion and custom ThemeContext.
 */

export function MagicCard({
  children,
  className,
  gradientSize = 200,
  gradientColor = "#262626",
  gradientOpacity = 0.8,
  gradientFrom = "#9E7AFF",
  gradientTo = "#FE8BBB",
  dark = true,
}) {
  const mouseX = useMotionValue(-gradientSize);
  const mouseY = useMotionValue(-gradientSize);

  const reset = useCallback(
    (reason = "leave") => {
      const off = -gradientSize;
      mouseX.set(off);
      mouseY.set(off);
    },
    [mouseX, mouseY, gradientSize]
  );

  const handlePointerMove = useCallback(
    (e) => {
      const rect = e.currentTarget.getBoundingClientRect();
      mouseX.set(e.clientX - rect.left);
      mouseY.set(e.clientY - rect.top);
    },
    [mouseX, mouseY]
  );

  useEffect(() => {
    reset("init");
  }, [reset]);

  useEffect(() => {
    const handleGlobalPointerOut = (e) => {
      if (!e.relatedTarget) reset("global");
    };
    const handleBlur = () => reset("global");
    const handleVisibility = () => {
      if (document.visibilityState !== "visible") reset("global");
    };

    window.addEventListener("pointerout", handleGlobalPointerOut);
    window.addEventListener("blur", handleBlur);
    document.addEventListener("visibilitychange", handleVisibility);

    return () => {
      window.removeEventListener("pointerout", handleGlobalPointerOut);
      window.removeEventListener("blur", handleBlur);
      document.removeEventListener("visibilitychange", handleVisibility);
    };
  }, [reset]);

  return (
    <motion.div
      className={cn(
        "group relative isolate overflow-hidden rounded-[inherit] border border-transparent",
        className
      )}
      onPointerMove={handlePointerMove}
      onPointerLeave={() => reset("leave")}
      onPointerEnter={() => reset("enter")}
      style={{
        background: useMotionTemplate`
          linear-gradient(${dark ? "#141414" : "#fafaf9"} 0 0) padding-box,
          radial-gradient(${gradientSize}px circle at ${mouseX}px ${mouseY}px,
            ${gradientFrom},
            ${gradientTo},
            ${dark ? "#292524" : "#d6d3d1"} 100%
          ) border-box
        `,
      }}
    >
      <div
        className={cn(
          "absolute inset-px z-20 rounded-[inherit]",
          dark ? "bg-stone-900/40" : "bg-white/60"
        )}
      />

      <motion.div
        className="pointer-events-none absolute inset-px z-30 rounded-[inherit] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: useMotionTemplate`
            radial-gradient(${gradientSize}px circle at ${mouseX}px ${mouseY}px,
              ${gradientColor},
              transparent 100%
            )
          `,
          opacity: gradientOpacity,
        }}
      />

      <div className="relative z-40">{children}</div>
    </motion.div>
  );
}
