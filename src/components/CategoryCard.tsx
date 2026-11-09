
"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { ArrowUpRight, ShoppingBag } from "lucide-react";
import type { Category } from "@/data/categories";

interface CategoryCardProps {
  category: Category;
}

export default function CategoryCard({ category }: CategoryCardProps) {
  const [imageError, setImageError] = useState(false);

  return (
    <Link
      href={category.href}
      aria-label={`Explore ${category.name}`}
      className="group flex h-full min-w-0 flex-col items-center rounded-xl border border-[#E5EDE5] bg-white p-2.5 text-center shadow-sm transition duration-300 hover:-translate-y-1 hover:border-green-200 hover:shadow-md active:scale-[0.98] sm:rounded-2xl sm:p-4"
    >
      <div className="relative mb-2.5 aspect-square w-full max-w-[88px] overflow-hidden rounded-xl bg-[#F4F8F3] sm:mb-3 sm:max-w-28 sm:rounded-2xl">
        {!imageError ? (
          <Image
            src={category.image}
            alt={category.name}
            fill
            sizes="(max-width: 374px) 76px, (max-width: 639px) 88px, 112px"
            onError={() => setImageError(true)}
            className="object-contain p-2 transition duration-500 group-hover:scale-110 sm:p-2.5"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-[#168447]">
            <ShoppingBag size={30} strokeWidth={1.5} />
          </div>
        )}
      </div>

      <div className="flex w-full min-w-0 items-center justify-center gap-1">
        <h3 className="line-clamp-2 min-w-0 text-[11px] font-extrabold leading-4 text-[#202B24] sm:text-sm sm:leading-5">
          {category.name}
        </h3>

        <ArrowUpRight
          size={14}
          aria-hidden="true"
          className="hidden shrink-0 text-[#168447] opacity-0 transition group-hover:opacity-100 sm:block"
        />
      </div>

      <p className="mt-1 line-clamp-2 min-h-7 text-[9px] leading-[14px] text-gray-400 sm:min-h-8 sm:text-xs sm:leading-4">
        {category.description}
      </p>
    </Link>
  );
}
