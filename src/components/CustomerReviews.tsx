
"use client";

import { useRef, useState } from "react";
import { ArrowLeft, ArrowRight, Quote, Star } from "lucide-react";

interface Review {
  id: number;
  name: string;
  role: string;
  initials: string;
  rating: number;
  message: string;
  date: string;
}

const reviews: Review[] = [
  {
    id: 1,
    name: "Customer 01",
    role: "Grocery Customer",
    initials: "C1",
    rating: 5,
    message:
      "Yahan grocery products ki achhi variety milti hai. Shopping ka experience kaafi convenient raha.",
    date: "Recent feedback",
  },
  {
    id: 2,
    name: "Customer 02",
    role: "Grocery Customer",
    initials: "C2",
    rating: 5,
    message:
      "Daily essentials ek hi jagah mil jaate hain. Grocery kits ka concept bhi kaafi useful hai.",
    date: "Recent feedback",
  },
  {
    id: 3,
    name: "Customer 03",
    role: "Grocery Customer",
    initials: "C3",
    rating: 5,
    message:
      "Products browse karna aur order select karna easy hai. Website ka experience simple hai.",
    date: "Recent feedback",
  },
  {
    id: 4,
    name: "Customer 04",
    role: "Grocery Customer",
    initials: "C4",
    rating: 5,
    message:
      "Ghar ke zaroori samaan ke liye convenient shopping option. Grocery kits bhi achhe lage.",
    date: "Recent feedback",
  },
];

const avatarStyles = [
  "bg-rose-100 text-[#A83250]",
  "bg-amber-100 text-amber-700",
  "bg-emerald-100 text-emerald-700",
  "bg-orange-100 text-orange-700",
];

export default function CustomerReviews() {
  const sliderRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  // Move to the exact position of one review card.
  const goToSlide = (index: number) => {
    const slider = sliderRef.current;
    if (!slider) return;

    const target = slider.children[index] as HTMLElement | undefined;
    if (!target) return;

    const sliderRect = slider.getBoundingClientRect();
    const targetRect = target.getBoundingClientRect();

    const targetPosition =
      slider.scrollLeft + targetRect.left - sliderRect.left;

    slider.scrollTo({
      left: targetPosition,
      behavior: "smooth",
    });
  };

  // Update active dot based on the nearest card.
  const handleScroll = () => {
    const slider = sliderRef.current;
    if (!slider) return;

    const cards = Array.from(slider.children) as HTMLElement[];

    let closestIndex = 0;
    let closestDistance = Infinity;

    cards.forEach((card, index) => {
      const distance = Math.abs(
        card.getBoundingClientRect().left -
          slider.getBoundingClientRect().left
      );

      if (distance < closestDistance) {
        closestDistance = distance;
        closestIndex = index;
      }
    });

    setActiveIndex(closestIndex);
  };

  const previous = () => {
    goToSlide(Math.max(0, activeIndex - 1));
  };

  const next = () => {
    goToSlide(Math.min(reviews.length - 1, activeIndex + 1));
  };

  return (
    <section className="bg-white py-8 sm:py-11">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* Heading */}
        <div className="mb-6 flex items-end justify-between gap-3">
          <div>
            <span className="mb-2 inline-flex items-center gap-1.5 rounded-full bg-[#F8E8ED] px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-[#A83250]">
              <Star size={11} fill="currentColor" />
              Customer Stories
            </span>

            <h2 className="text-2xl font-extrabold tracking-tight text-[#171717] sm:text-3xl">
              Genuine Voices.
              <span className="block text-[#A83250]">
                Honest Reviews.
              </span>
            </h2>

            <p className="mt-1.5 text-xs text-[#6A7282] sm:text-sm">
              What customers say about their experience.
            </p>
          </div>

          {/* Navigation Arrows */}
          <div className="flex shrink-0 gap-2">
            <button
              type="button"
              onClick={previous}
              disabled={activeIndex === 0}
              aria-label="Previous review"
              className="flex size-9 items-center justify-center rounded-full border border-[#E5E7EB] text-[#A83250] transition-all duration-200 hover:bg-[#F8E8ED] disabled:cursor-not-allowed disabled:opacity-30 sm:size-10"
            >
              <ArrowLeft size={17} />
            </button>

            <button
              type="button"
              onClick={next}
              disabled={activeIndex === reviews.length - 1}
              aria-label="Next review"
              className="flex size-9 items-center justify-center rounded-full bg-[#A83250] text-white transition-all duration-200 hover:bg-[#87263F] disabled:cursor-not-allowed disabled:opacity-30 sm:size-10"
            >
              <ArrowRight size={17} />
            </button>
          </div>
        </div>

        {/* Review Carousel */}
        <div
          ref={sliderRef}
          onScroll={handleScroll}
          className="flex snap-x snap-mandatory gap-3 overflow-x-auto scroll-smooth pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:gap-4"
        >
          {reviews.map((review, index) => (
            <article
              key={review.id}
              className="flex min-h-[215px] w-[88%] shrink-0 snap-start flex-col rounded-2xl border border-[#E5E7EB] bg-[#FFFDF9] p-4 transition-colors duration-200 hover:border-[#E8C3CE] sm:w-[calc(50%-8px)] sm:p-5 lg:w-[calc(33.333%-11px)]"
            >
              <div className="mb-3 flex items-center justify-between">
                <div className="flex gap-0.5">
                  {Array.from({ length: review.rating }).map((_, i) => (
                    <Star
                      key={i}
                      size={14}
                      fill="#D4A84F"
                      stroke="#D4A84F"
                    />
                  ))}
                </div>

                <Quote
                  size={24}
                  className="text-[#E8C3CE]"
                  fill="#F8E8ED"
                />
              </div>

              <p className="flex-1 text-[13px] leading-6 text-[#4A5565]">
                “{review.message}”
              </p>

              <div className="mt-4 flex items-center gap-2.5 border-t border-[#F0EAE7] pt-3">
                <div
                  className={`flex size-9 shrink-0 items-center justify-center rounded-full text-xs font-bold ${avatarStyles[index % avatarStyles.length]}`}
                >
                  {review.initials}
                </div>

                <div className="min-w-0">
                  <h3 className="truncate text-xs font-bold text-[#171717]">
                    {review.name}
                  </h3>

                  <p className="text-[10px] text-[#6A7282]">
                    {review.role}
                  </p>
                </div>

                <span className="ml-auto shrink-0 text-[9px] text-[#99A1AF]">
                  {review.date}
                </span>
              </div>
            </article>
          ))}
        </div>

        {/* Clickable Dots */}
        <div className="mt-3 flex items-center justify-center gap-1.5">
          {reviews.map((review, index) => (
            <button
              key={review.id}
              type="button"
              onClick={() => goToSlide(index)}
              aria-label={`Go to review ${index + 1}`}
              aria-current={activeIndex === index ? "true" : undefined}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                activeIndex === index
                  ? "w-6 bg-[#A83250]"
                  : "w-1.5 bg-[#E5E7EB] hover:bg-[#A83250]/50"
              }`}
            />
          ))}
        </div>

        <p className="mt-3 text-center text-[10px] text-[#99A1AF]">
          Sample review content — replace with actual customer feedback.
        </p>
      </div>
    </section>
  );
}
