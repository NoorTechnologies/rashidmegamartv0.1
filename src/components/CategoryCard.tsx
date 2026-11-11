
"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { ArrowUpRight, ShoppingBag } from "lucide-react";
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
  const cardColor = categoryColors[category.id] ?? "bg-[#F1F5F9]";

  return (
    <Link
      href={category.href}
      aria-label={`Explore ${category.name}`}
      className="group flex min-w-0 flex-col overflow-hidden rounded-xl border border-black/[0.04] bg-white p-2 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg active:scale-[0.98] sm:rounded-2xl sm:p-3"
    >
      <div
        className={`relative aspect-square w-full overflow-hidden rounded-lg ${cardColor} sm:rounded-xl`}
      >
        {!imageError ? (
          <Image
            src={category.image}
            alt={category.name}
            fill
            sizes="(max-width: 640px) 30vw, 150px"
            onError={() => setImageError(true)}
            className="object-contain p-1.5 transition duration-500 group-hover:scale-110 sm:p-3"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-[#168447]">
            <ShoppingBag size={30} strokeWidth={1.5} />
          </div>
        )}
      </div>

      <div className="mt-2 flex min-w-0 items-center justify-between gap-1">
        <h3 className="line-clamp-2 min-w-0 text-left text-[10px] font-extrabold leading-[14px] text-[#26332B] sm:text-sm sm:leading-5">
          {category.name}
        </h3>

        <ArrowUpRight
          size={13}
          aria-hidden="true"
          className="shrink-0 text-[#168447] transition duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
        />
      </div>

      <p className="mt-1 line-clamp-2 text-left text-[9px] leading-[13px] text-gray-500 sm:text-[11px] sm:leading-4">
        {category.description}
      </p>
    </Link>
  );
}
