"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";

const campaigns = [
  {
    image: "/images/camisas-categoria/categoria-1.png",
    label: "Camisas casuais",
    href: "/produtos?sub=casual",
  },
  {
    image: "/images/camisas-categoria/categoria-2.png",
    label: "Camisas streetwear",
    href: "/produtos?sub=streetwear",
  },
  {
    image: "/images/camisas-categoria/categoria-3.png",
    label: "Camisas polo",
    href: "/produtos?sub=polo",
  },
];

export function CategoryCampaign() {
  const [mobilePosition, setMobilePosition] = useState(0);
  const mobileTrackRef = useRef<HTMLDivElement>(null);
  const [desktopPosition, setDesktopPosition] = useState(3);
  const [instantReset, setInstantReset] = useState(false);
  const [animating, setAnimating] = useState(false);
  const desktopSlides = Array.from({ length: 3 }, (_, cycle) =>
    campaigns.map((campaign) => ({ ...campaign, key: `${campaign.href}-${cycle}` }))
  ).flat();

  useEffect(() => {
    const timer = window.setTimeout(() => {
      const nextPosition = (mobilePosition + 1) % campaigns.length;
      setMobilePosition(nextPosition);
      mobileTrackRef.current?.scrollTo({
        left: nextPosition * mobileTrackRef.current.clientWidth,
        behavior: "smooth",
      });
    }, 5000);

    return () => window.clearTimeout(timer);
  }, [mobilePosition]);

  const handleMobileScroll = () => {
    const track = mobileTrackRef.current;
    if (!track || track.clientWidth === 0) return;

    const position = Math.round(track.scrollLeft / track.clientWidth);
    setMobilePosition(Math.min(position, campaigns.length - 1));
  };

  const goToMobileSlide = (index: number) => {
    setMobilePosition(index);
    mobileTrackRef.current?.scrollTo({
      left: index * (mobileTrackRef.current?.clientWidth ?? 0),
      behavior: "smooth",
    });
  };

  const moveDesktop = (direction: -1 | 1) => {
    if (animating) return;
    setInstantReset(false);
    setAnimating(true);
    setDesktopPosition((position) => position + direction);
  };

  const handleDesktopAnimationComplete = () => {
    if (desktopPosition >= campaigns.length * 2) {
      setInstantReset(true);
      setDesktopPosition(campaigns.length);
    } else if (desktopPosition < campaigns.length) {
      setInstantReset(true);
      setDesktopPosition(campaigns.length * 2 - 1);
    } else {
      setAnimating(false);
    }
  };

  return (
    <section aria-label="Explore nossas camisas" className="w-full">
      <div className="relative md:hidden">
        <div
          ref={mobileTrackRef}
          onScroll={handleMobileScroll}
          className="categories-scroll flex snap-x snap-mandatory overflow-x-auto"
        >
          {campaigns.map((campaign) => (
            <Link
              key={campaign.href}
              href={campaign.href}
              aria-label={`Ver produtos: ${campaign.label}`}
              className="group relative block w-full shrink-0 snap-start cursor-pointer overflow-hidden outline-none"
            >
              <Image
                src={campaign.image}
                alt={campaign.label}
                width={500}
                height={650}
                sizes="(max-width: 767px) 100vw, 33vw"
                className="block h-auto w-full"
              />
              <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 transition-colors duration-300 hover:bg-white/10"
              />
            </Link>
          ))}
        </div>

        <div
          role="group"
          aria-label="Navegação das categorias"
          className="absolute bottom-2.5 left-1/2 z-10 flex -translate-x-1/2 items-center gap-1"
        >
          {campaigns.map((campaign, index) => (
            <button
              key={campaign.href}
              type="button"
              onClick={() => goToMobileSlide(index)}
              aria-label={`Ir para ${campaign.label}`}
              aria-current={index === mobilePosition ? "true" : undefined}
              className={`rounded-full transition-all duration-300 ${
                index === mobilePosition
                  ? "h-1 w-3.5 bg-white"
                  : "h-1 w-1 bg-white/50"
              }`}
            />
          ))}
        </div>
      </div>

      <div className="group/desktop relative hidden overflow-hidden md:block">
        <motion.div
          className="flex w-[300%]"
          initial={false}
          animate={{ x: `${(-desktopPosition * 100) / 9}%` }}
          transition={{
            x: instantReset
              ? { duration: 0 }
              : { duration: 0.75, ease: [0.22, 1, 0.36, 1] },
          }}
          onAnimationComplete={handleDesktopAnimationComplete}
        >
          {desktopSlides.map((campaign) => (
            <Link
              key={campaign.key}
              href={campaign.href}
              aria-label={`Ver produtos: ${campaign.label}`}
              className="group relative block shrink-0 cursor-pointer overflow-hidden outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#0b1f3a]"
              style={{ width: `${100 / desktopSlides.length}%` }}
            >
              <Image
                src={campaign.image}
                alt={campaign.label}
                width={500}
                height={650}
                sizes="33vw"
                className="block h-auto w-full"
              />
              <span
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 transition-colors duration-300 group-hover:bg-white/10"
              />
            </Link>
          ))}
        </motion.div>

        <button
          type="button"
          onClick={() => moveDesktop(-1)}
          disabled={animating}
          aria-label="Ver categorias anteriores"
          className="absolute left-4 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-gray-500/50 text-white opacity-0 shadow-lg backdrop-blur-md transition-all duration-300 hover:bg-gray-600/65 focus-visible:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white group-hover/desktop:opacity-100 disabled:cursor-wait"
        >
          <ChevronLeft size={24} />
        </button>
        <button
          type="button"
          onClick={() => moveDesktop(1)}
          disabled={animating}
          aria-label="Ver próximas categorias"
          className="absolute right-4 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-gray-500/50 text-white opacity-0 shadow-lg backdrop-blur-md transition-all duration-300 hover:bg-gray-600/65 focus-visible:opacity-100 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white group-hover/desktop:opacity-100 disabled:cursor-wait"
        >
          <ChevronRight size={24} />
        </button>
      </div>
    </section>
  );
}
