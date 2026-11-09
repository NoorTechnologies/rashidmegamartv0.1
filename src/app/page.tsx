
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Truck,
  ShieldCheck,
  Headset,
  Tag,
  ShoppingBag,
} from "lucide-react";

import CategoryCard from "@/components/CategoryCard";
import ProductCard from "@/components/ProductCard";
import KitCard from "@/components/KitCard";

import { categories } from "@/data/categories";
import { getBestSellingProducts } from "@/data/products";
import { getFeaturedKits } from "@/data/kits";

export default function HomePage() {
  const bestSellingProducts = getBestSellingProducts();
  const featuredKits = getFeaturedKits();

  return (
    <main className="min-h-screen w-full overflow-x-clip bg-[#F5FAF5]">
      {/* HERO */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#E8F5E9] via-[#D5F0DF] to-[#B7E4C7]">
        <div className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full border-[30px] border-white/30 sm:h-80 sm:w-80" />
        <div className="pointer-events-none absolute -bottom-32 -left-24 h-72 w-72 rounded-full bg-white/20 blur-2xl" />

        <div className="relative mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-8 px-3 py-9 min-[480px]:px-5 sm:py-12 md:grid-cols-2 md:gap-10 md:px-6 md:py-16 lg:px-8">
          <div className="min-w-0 text-[#202B24]">
            <span className="inline-flex max-w-full items-center gap-2 rounded-full border border-[#168447]/15 bg-white/70 px-3 py-2 text-[10px] font-bold text-[#168447] shadow-sm sm:px-4 sm:text-xs">
              <ShoppingBag size={15} className="shrink-0" />
              <span>Welcome to Rashid Mega Mart</span>
            </span>

            <h1 className="mt-5 max-w-xl text-[32px] font-extrabold leading-[1.15] tracking-tight min-[480px]:text-4xl sm:text-5xl lg:text-[54px]">
              Everyday Essentials,
              <span className="mt-1 block text-[#168447]">
                Better Prices.
              </span>
            </h1>

            <p className="mt-4 max-w-md text-[13px] leading-6 text-[#53665A] sm:text-sm sm:leading-7">
              Shop your daily grocery essentials and convenient family kits
              at Rashid Mega Mart.
            </p>

            <div className="mt-6 grid grid-cols-1 gap-3 min-[390px]:grid-cols-2 sm:flex sm:flex-wrap">
              <Link
                href="/shop"
                className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-[#168447] px-5 py-3 text-sm font-extrabold text-white shadow-[0_5px_16px_rgba(22,132,71,0.20)] transition hover:bg-[#075C2B] active:scale-[0.98]"
              >
                Shop Now
                <ArrowRight size={17} />
              </Link>

              <Link
                href="/kits"
                className="inline-flex min-h-12 items-center justify-center rounded-xl border border-[#168447]/30 bg-white/60 px-5 py-3 text-sm font-bold text-[#075C2B] transition hover:bg-white active:scale-[0.98]"
              >
                Explore Kits
              </Link>
            </div>

            <div className="mt-7 flex flex-wrap gap-x-5 gap-y-3 text-[11px] font-semibold text-[#42634E] sm:mt-8 sm:gap-6 sm:text-xs">
              <span className="flex items-center gap-2">
                <ShieldCheck size={17} className="shrink-0 text-[#168447]" />
                Quality Products
              </span>

              <span className="flex items-center gap-2">
                <Truck size={17} className="shrink-0 text-[#168447]" />
                Home Delivery
              </span>
            </div>
          </div>

          {/* Hero Image */}
          <div className="relative mx-auto w-full min-w-0 max-w-lg md:max-w-none">
            <div className="relative aspect-[5/4] w-full overflow-hidden rounded-2xl border-4 border-white/70 bg-white/50 shadow-[0_20px_50px_rgba(7,92,43,0.14)] sm:aspect-[4/3] sm:rounded-3xl">
              <Image
                src="/images/hero/grocery-hero.png"
                alt="Rashid Mega Mart grocery collection"
                fill
                priority
                sizes="(max-width: 767px) 100vw, 50vw"
                className="object-cover"
              />
            </div>

            <div className="absolute -bottom-3 left-3 rounded-xl border border-[#E1F0E5] bg-white px-3 py-2.5 shadow-xl sm:-bottom-4 sm:left-5 sm:rounded-2xl sm:px-5 sm:py-3">
              <p className="text-[10px] font-bold text-[#849489] sm:text-xs">
                Your Daily Needs
              </p>
              <p className="text-xs font-extrabold text-[#075C2B] sm:text-sm">
                All in One Place
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="mx-auto w-full max-w-7xl px-3 py-8 min-[480px]:px-5 sm:py-12 md:px-6 lg:px-8">
        <div className="mb-5 flex items-end justify-between gap-3 sm:mb-6">
          <div className="min-w-0">
            <p className="text-[10px] font-extrabold uppercase tracking-wider text-[#168447] sm:text-xs">
              Explore Products
            </p>

            <h2 className="mt-1 text-xl font-extrabold text-[#202B24] sm:text-2xl">
              Shop by Category
            </h2>
          </div>

          <Link
            href="/shop"
            className="inline-flex shrink-0 items-center gap-1 text-[11px] font-bold text-[#168447] transition hover:text-[#075C2B] sm:text-xs"
          >
            View All <ArrowRight size={15} />
          </Link>
        </div>

        <div className="grid grid-cols-2 gap-3 min-[480px]:grid-cols-4 sm:gap-4 lg:grid-cols-8">
          {categories.map((category) => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </div>
      </section>

      {/* GROCERY KITS BANNER */}
      <section className="mx-auto w-full max-w-7xl px-3 min-[480px]:px-5 md:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-2xl border border-[#B7E4C7] bg-gradient-to-r from-[#B7E4C7] via-[#D5F0DF] to-[#E8F5E9] px-4 py-6 min-[480px]:rounded-3xl min-[480px]:px-6 min-[480px]:py-8 sm:px-10 sm:py-10">
          <div className="pointer-events-none absolute -right-14 -top-16 h-48 w-48 rounded-full border-[25px] border-white/40" />

          <div className="relative flex flex-col items-start justify-between gap-5 sm:flex-row sm:items-center">
            <div className="min-w-0">
              <span className="inline-block rounded-full bg-[#168447] px-3 py-1.5 text-[9px] font-extrabold uppercase tracking-wider text-white sm:text-[10px]">
                Smart Shopping
              </span>

              <h2 className="mt-3 max-w-lg text-[22px] font-extrabold leading-tight text-[#075C2B] sm:mt-4 sm:text-3xl">
                Everything You Need in One Grocery Kit
              </h2>

              <p className="mt-2 text-xs leading-5 text-[#53665A] sm:text-sm">
                Convenient combos for everyday family needs.
              </p>
            </div>

            <Link
              href="/kits"
              className="inline-flex min-h-12 w-full shrink-0 items-center justify-center gap-2 rounded-xl bg-[#168447] px-5 py-3 text-sm font-extrabold text-white shadow-md transition hover:bg-[#075C2B] active:scale-[0.98] sm:w-auto sm:px-6"
            >
              Explore Kits <ArrowRight size={17} />
            </Link>
          </div>
        </div>
      </section>

      {/* BEST SELLERS */}
      <section className="mx-auto w-full max-w-7xl px-3 py-8 min-[480px]:px-5 sm:py-12 md:px-6 lg:px-8">
        <div className="mb-5 flex items-end justify-between gap-3 sm:mb-6">
          <div className="min-w-0">
            <p className="text-[10px] font-extrabold uppercase tracking-wider text-[#168447] sm:text-xs">
              Customer Favorites
            </p>

            <h2 className="mt-1 text-xl font-extrabold text-[#202B24] sm:text-2xl">
              Best Selling Products
            </h2>
          </div>

          <Link
            href="/shop"
            className="inline-flex shrink-0 items-center gap-1 text-[11px] font-bold text-[#168447] transition hover:text-[#075C2B] sm:text-xs"
          >
            View All <ArrowRight size={15} />
          </Link>
        </div>

        {bestSellingProducts.length > 0 ? (
          <div className="grid grid-cols-1 gap-4 min-[390px]:grid-cols-2 sm:grid-cols-3 sm:gap-5 lg:grid-cols-4">
            {bestSellingProducts.slice(0, 8).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <p className="rounded-2xl border border-[#DFEEE3] bg-white p-6 text-center text-sm text-[#68756B] sm:p-8">
            Products will be available soon.
          </p>
        )}
      </section>

      {/* FEATURED KITS */}
      <section className="bg-gradient-to-b from-[#E8F5E9] to-[#F5FAF5] py-8 sm:py-12">
        <div className="mx-auto w-full max-w-7xl px-3 min-[480px]:px-5 md:px-6 lg:px-8">
          <div className="mb-5 flex items-end justify-between gap-3 sm:mb-6">
            <div className="min-w-0">
              <p className="text-[10px] font-extrabold uppercase tracking-wider text-[#168447] sm:text-xs">
                Special Combos
              </p>

              <h2 className="mt-1 text-xl font-extrabold text-[#202B24] sm:text-2xl">
                Grocery Kits for You
              </h2>
            </div>

            <Link
              href="/kits"
              className="inline-flex shrink-0 items-center gap-1 text-[11px] font-bold text-[#168447] transition hover:text-[#075C2B] sm:text-xs"
            >
              View All <ArrowRight size={15} />
            </Link>
          </div>

          {featuredKits.length > 0 ? (
            <div className="grid grid-cols-1 gap-4 min-[560px]:grid-cols-2 sm:gap-5 lg:grid-cols-4">
              {featuredKits.slice(0, 4).map((kit) => (
                <KitCard key={kit.id} kit={kit} />
              ))}
            </div>
          ) : (
            <p className="rounded-2xl border border-[#DFEEE3] bg-white p-6 text-center text-sm text-[#68756B] sm:p-8">
              Grocery kits will be available soon.
            </p>
          )}
        </div>
      </section>

      {/* OFFERS */}
      <section className="mx-auto w-full max-w-7xl px-3 py-8 min-[480px]:px-5 sm:py-12 md:px-6 lg:px-8">
        <div className="rounded-2xl border border-[#B7E4C7] bg-gradient-to-br from-[#F1FAF3] via-[#E8F5E9] to-[#D5F0DF] p-4 min-[480px]:rounded-3xl min-[480px]:p-6 sm:p-9">
          <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#168447] text-white shadow-sm sm:h-14 sm:w-14 sm:rounded-2xl">
              <Tag size={25} />
            </div>

            <div className="min-w-0 flex-1">
              <h2 className="text-lg font-extrabold leading-tight text-[#075C2B] sm:text-xl">
                Great Value for Everyday Shopping
              </h2>

              <p className="mt-2 text-xs leading-5 text-[#53665A] sm:text-sm sm:leading-6">
                Explore our products and grocery combo kits to find the right
                essentials for your home.
              </p>
            </div>

            <Link
              href="/shop"
              className="inline-flex min-h-11 w-full shrink-0 items-center justify-center gap-2 rounded-xl bg-[#168447] px-5 py-3 text-xs font-bold text-white transition hover:bg-[#075C2B] sm:w-auto sm:text-sm"
            >
              Explore Offers <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* SERVICE BENEFITS */}
      <section className="mx-auto w-full max-w-7xl px-3 pb-10 min-[480px]:px-5 sm:pb-14 md:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-3 min-[480px]:grid-cols-2 sm:grid-cols-3 sm:gap-4">
          <div className="flex min-w-0 items-center gap-4 rounded-2xl border border-[#E1F0E5] bg-white p-4 shadow-[0_3px_14px_rgba(22,132,71,0.05)] sm:p-5">
            <Truck size={26} className="shrink-0 text-[#168447]" />

            <div className="min-w-0">
              <h3 className="text-sm font-extrabold text-[#202B24]">
                Home Delivery
              </h3>

              <p className="mt-1 text-xs leading-5 text-[#68756B]">
                Delivery within 5 km is free.
              </p>
            </div>
          </div>

          <div className="flex min-w-0 items-center gap-4 rounded-2xl border border-[#E1F0E5] bg-white p-4 shadow-[0_3px_14px_rgba(22,132,71,0.05)] sm:p-5">
            <ShieldCheck size={26} className="shrink-0 text-[#168447]" />

            <div className="min-w-0">
              <h3 className="text-sm font-extrabold text-[#202B24]">
                Quality Essentials
              </h3>

              <p className="mt-1 text-xs leading-5 text-[#68756B]">
                Everyday products for your home.
              </p>
            </div>
          </div>

          <div className="flex min-w-0 items-center gap-4 rounded-2xl border border-[#E1F0E5] bg-white p-4 shadow-[0_3px_14px_rgba(22,132,71,0.05)] min-[480px]:col-span-2 sm:col-span-1 sm:p-5">
            <Headset size={26} className="shrink-0 text-[#168447]" />

            <div className="min-w-0">
              <h3 className="text-sm font-extrabold text-[#202B24]">
                Customer Support
              </h3>

              <p className="mt-1 text-xs leading-5 text-[#68756B]">
                Connect with us for order assistance.
              </p>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
