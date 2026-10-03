"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, HTMLMotionProps } from "framer-motion";

interface BlurRevealProps extends HTMLMotionProps<"div"> {
  children: React.ReactNode;
  duration?: number;
  blurAmount?: number;
  offset?: number;
}

export const BlurReveal = ({
  children,
  duration = 0.8,
  blurAmount = 8,
  offset = 15,
  ...props
}, ref_prop): JSX.Element | null => {
  const [isVisible, setIsVisible] = useState(false);
  const domRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      {
        threshold: 0.05,
      }
    );

    if (domRef.current) {
      observer.observe(domRef.current);
    }

    return () => {
      if (domRef.current) {
        observer.unobserve(domRef.current);
      }
    };
  }, []);

  return (
    <motion.div
      ref={domRef}
      initial={{ opacity: 0, filter: `blur(${blurAmount}px)`, y: offset }}
      animate={{
        opacity: isVisible ? 1 : 0,
        filter: isVisible ? "blur(0px)" : `blur(${blurAmount}px)`,
        y: isVisible ? 0 : offset
      }}
      transition={{
        duration: duration,
        ease: [0.25, 0.1, 0.25, 1], // Curva mais suave e orgânica
      }}
      {...props}
    >
      {children}
    </motion.div>
  );
};