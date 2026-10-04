"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";


const slides = [
  { id: 1, src: "/images/carrosel/carrosel-1.png" },
  { id: 2, src: "/images/carrosel/carrossel-2.png" },
  { id: 3, src: "/images/carrosel/carrossel-3.png" },
  { id: 4, src: "/images/carrosel/carrossel-4.png" },
];

export function Hero() {
  const [current, setCurrent] = useState(0);
  const [lastInteraction, setLastInteraction] = useState(Date.now());

  useEffect(() => {
    const timer = setInterval(() => {
      const now = Date.now();
      if (now - lastInteraction >= 5000) {
        setCurrent((c) => (c + 1) % slides.length);
        setLastInteraction(now);
      }
    }, 500);
    return () => clearInterval(timer);
  }, [lastInteraction]);

  const handleDotClick = (index: number) => {
    setCurrent(index);
    setLastInteraction(Date.now());
  };

  return (
    <div className="relative w-full aspect-[16/7] md:aspect-[21/7] lg:aspect-[25/7] overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={slides[current].id}
          initial={{ opacity: 0, scale: 1.04 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
          className="absolute inset-0"
        >
          <Image
            src={slides[current].src}
            alt="Azevedo Ofts"
            fill
            priority={current === 0}
            className="object-cover object-center"
            sizes="100vw"
          />
        </motion.div>
      </AnimatePresence>

      {/* Dots */}
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-2 z-10">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => handleDotClick(i)}
            className={`rounded-full transition-all duration-300 ${
              i === current ? "w-6 h-2 bg-white" : "w-2 h-2 bg-white/50"
            }`}
            aria-label={`Slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}