"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";


const desktopSlides = [
  "/images/carrosel/desktop/carrosel-1-1.png",
  "/images/carrosel/desktop/carrosel-1.png",
  "/images/carrosel/desktop/carrossel-2.png",
  "/images/carrosel/desktop/carrossel-3.png",
  "/images/carrosel/desktop/carrossel-4.png",
];

const mobileSlides = [
  "/images/carrosel/mobile/carrosel-1-1.png",
  "/images/carrosel/mobile/carrosel-1.png",
  "/images/carrosel/mobile/carrosel-2.png",
  "/images/carrosel/mobile/carrosel-3.png",
];

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? "100%" : "-100%",
  }),
  center: { x: 0 },
  exit: (direction: number) => ({
    x: direction > 0 ? "-100%" : "100%",
  }),
};

export function Hero() {
  const [current, setCurrent] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [direction, setDirection] = useState(1);
  const touchStartX = useRef<number | null>(null);
  const slides = isMobile ? mobileSlides : desktopSlides;
  const activeIndex = current % slides.length;

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 767px)");
    const updateViewport = () => setIsMobile(mediaQuery.matches);
    updateViewport();
    mediaQuery.addEventListener("change", updateViewport);
    return () => mediaQuery.removeEventListener("change", updateViewport);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDirection(1);
      setCurrent((slide) => (slide + 1) % slides.length);
    }, activeIndex === 0 ? 10000 : 5000);
    return () => clearTimeout(timer);
  }, [activeIndex, slides.length]);

  const handleDotClick = (index: number) => {
    setDirection(index >= activeIndex ? 1 : -1);
    setCurrent(index);
  };

  return (
    <div
      className="relative w-full touch-pan-y aspect-[2188/1250] overflow-hidden md:aspect-[21/9] lg:aspect-[25/9]"
      onTouchStart={(event) => {
        touchStartX.current = event.touches[0]?.clientX ?? null;
      }}
      onTouchEnd={(event) => {
        const startX = touchStartX.current;
        const endX = event.changedTouches[0]?.clientX;
        touchStartX.current = null;

        if (startX === null || endX === undefined || Math.abs(endX - startX) < 40) return;

        const swipeDirection = endX < startX ? 1 : -1;
        setDirection(swipeDirection);
        setCurrent((slide) => (slide + swipeDirection + slides.length) % slides.length);
      }}
    >
      <AnimatePresence initial={false} custom={direction}>
        <motion.div
          key={activeIndex}
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ x: { duration: 1, ease: [0.16, 1, 0.3, 1] } }}
          className="absolute inset-0"
        >
          <Image
            src={slides[activeIndex]}
            alt="Azevedo Ofts"
            fill
            priority={activeIndex === 0}
            className="object-cover object-center"
            sizes="100vw"
          />
        </motion.div>
      </AnimatePresence>

      {/* Dots */}
      <div className="absolute bottom-2.5 left-1/2 z-10 flex -translate-x-1/2 items-center gap-1 md:bottom-5 md:gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => handleDotClick(i)}
            className={`rounded-full transition-all duration-300 md:h-2 ${
              i === activeIndex
                ? "h-1 w-3.5 bg-white md:w-6"
                : "h-1 w-1 bg-white/50 md:w-2"
            }`}
            aria-label={`Slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}