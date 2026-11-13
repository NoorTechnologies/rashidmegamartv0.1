
"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { ShoppingBag, ArrowUpRight } from "lucide-react";
import type { Category } from "@/data/categories";

interface CategoryCardProps {
  category: Category;
}

const categoryColors: Record<string, string> = {
  "rice-grains": "bg-[#EAF3FF]",
  "atta-flour": "bg-[#FFF0E5]",
  "pulses-dal": "bg-[#FFF4D9]",
  "oil-ghee": "bg-[#FFF0E8]",
  "spices-masala": "bg-[#FCE9E7]",
  dairy: "bg-[#EAF5FF]",
  "tea-coffee": "bg-[#F3EDE7]",
  "personal-care": "bg-[#F9EAF4]",
};

export default function CategoryCard({ category }: CategoryCardProps) {
  const [imageError, setImageError] = useState(false);

  const cardColor = categoryColors[category.id] ?? "bg-[#F5F2EC]";

  return (
    <Link
      href={category.href}
      aria-label={`Explore ${category.name}`}
      className="group relative flex min-w-0 flex-col rounded-2xl border border-[#EDE7DF] bg-white p-2 shadow-[0_2px_10px_rgba(53,18,13,0.035)] transition-all duration-300 hover:-translate-y-1 hover:border-[#D4A84F]/60 hover:shadow-[0_10px_25px_rgba(53,18,13,0.09)] active:scale-[0.97] sm:rounded-3xl sm:p-3"
    >
      {/* Image Area */}
      <div
        className={`relative aspect-square w-full overflow-hidden rounded-xl sm:rounded-2xl ${cardColor}`}
      >
        {/* Decorative Background */}
        <div className="pointer-events-none absolute -right-5 -top-5 h-20 w-20 rounded-full border border-white/60 sm:h-24 sm:w-24" />

        {!imageError && category.image ? (
          <Image
            src={category.image}
            alt={category.name}
            fill
            sizes="(max-width: 480px) 28vw, (max-width: 768px) 20vw, 150px"
            onError={() => setImageError(true)}
            className="object-contain p-2.5 transition-transform duration-500 ease-out group-hover:scale-110 sm:p-3.5"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-[#A83250]">
            <ShoppingBag size={30} strokeWidth={1.5} />
          </div>
        )}

        {/* Explore Icon */}
        <span className="absolute right-1.5 top-1.5 flex h-6 w-6 items-center justify-center rounded-full border border-white/80 bg-white/85 text-[#A83250] shadow-sm transition-all duration-300 group-hover:bg-[#A83250] group-hover:text-white sm:right-2 sm:top-2 sm:h-7 sm:w-7">
          <ArrowUpRight size={14} strokeWidth={2.2} />
        </span>
      </div>

      {/* Category Details */}
      <div className="flex w-full flex-1 flex-col items-center px-0.5 pb-0.5 pt-2 sm:px-1 sm:pt-3">
        <h3 className="line-clamp-2 min-h-8 w-full text-center text-[10px] font-extrabold leading-4 text-[#30251F] transition-colors duration-300 group-hover:text-[#A83250] sm:min-h-10 sm:text-sm sm:leading-5">
          {category.name}
        </h3>

        <p className="mt-1 hidden w-full line-clamp-2 text-center text-[11px] leading-4 text-[#76665C] sm:block">
          {category.description}
        </p>

        <span className="mt-1.5 hidden items-center gap-1 text-[10px] font-bold text-[#A83250] sm:inline-flex">
          Explore Category
          <ArrowUpRight size={12} />
        </span>
      </div>
    </Link>
  );
}
