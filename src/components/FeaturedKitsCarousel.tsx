"use client";

import { useRef } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import KitCard from "@/components/KitCard";
import type { GroceryKit } from "@/data/kits";

interface FeaturedKitsCarouselProps {
  kits: GroceryKit[];
}

export default function FeaturedKitsCarousel({ kits }: FeaturedKitsCarouselProps) {
  const trackRef = useRef<HTMLDivElement>(null);

  const move = (direction: "prev" | "next") => {
    const track = trackRef.current;
    if (!track) return;
    const firstCard = track.querySelector<HTMLElement>("[data-kit-slide]");
    const distance = firstCard ? firstCard.offsetWidth + 12 : 280;
    track.scrollBy({ left: direction === "next" ? distance : -distance, behavior: "smooth" });
  };

  return (
    <div className="relative">
      <div className="mb-2 hidden justify-end gap-1.5 sm:flex">
        <button
          type="button"
          onClick={() => move("prev")}
          aria-label="Previous grocery kits"
          className="flex size-8 items-center justify-center rounded-full border border-[#800020]/15 bg-white text-[#800020] transition hover:bg-[#800020] hover:text-white"
        >
          <ArrowLeft size={15} />
        </button>
        <button
          type="button"
          onClick={() => move("next")}
          aria-label="Next grocery kits"
          className="flex size-8 items-center justify-center rounded-full border border-[#800020]/15 bg-white text-[#800020] transition hover:bg-[#800020] hover:text-white"
        >
          <ArrowRight size={15} />
        </button>
      </div>
      <div
        ref={trackRef}
        className="flex snap-x snap-mandatory gap-3 overflow-x-auto overscroll-x-contain scroll-smooth pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {kits.map((kit, index) => (
          <div
            key={kit.id}
            data-kit-slide
            className="w-[76vw] max-w-[286px] shrink-0 snap-start sm:w-[280px] sm:max-w-[300px] min-[420px]:w-[76vw] min-[480px]:w-[48vw] sm:w-[260px] lg:w-[260px]"
          >
            <KitCard kit={kit} eagerImage={index === 0} />
          </div>
        ))}
      </div>
    </div>
  );
}
