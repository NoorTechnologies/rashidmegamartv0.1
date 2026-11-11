
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
    <main className="min-h-screen w-full overflow-x-clip bg-[#F8F9FA]">
      {/* HERO */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#EAF5ED] via-white to-[#F8F9FA] px-3 pb-10 pt-8 text-[#202B24] sm:px-5 sm:pb-14 sm:pt-12">
        <div className="pointer-events-none absolute -left-24 top-10 h-64 w-64 rounded-full bg-[#168447]/10 blur-[90px]" />
        <div className="pointer-events-none absolute -right-24 bottom-0 h-72 w-72 rounded-full bg-[#F5D9A8]/30 blur-[90px]" />

        <div className="relative mx-auto flex w-full max-w-7xl flex-col items-center text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-[#DDECE0] bg-white/90 px-4 py-2 text-[10px] font-bold tracking-wide text-[#168447] shadow-sm sm:text-xs">
            <ShoppingBag size={15} />
            YOUR NEIGHBOURHOOD GROCERY STORE
          </span>

          <div className="mt-6 flex flex-col items-center">
            <Image
              src="/images/logo.png"
              alt="Rashid Mega Mart Logo"
              width={110}
              height={110}
              priority
              className="h-20 w-20 object-contain sm:h-24 sm:w-24"
            />

            <h1 className="mt-4 max-w-2xl text-2xl font-black leading-tight tracking-tight sm:text-4xl md:text-5xl">
              Welcome to
              <span className="mt-1 block text-[#168447]">
                Rashid Mega Mart
              </span>
            </h1>

            <p className="mt-3 max-w-md text-xs leading-6 text-[#647067] sm:text-sm">
              Your daily groceries, household essentials and family kits —
              everything you need in one place.
            </p>
          </div>

          <div className="relative mt-7 w-full max-w-[560px]">
            <div className="pointer-events-none absolute inset-x-8 bottom-2 h-10 rounded-full bg-[#AEB5B9]/30 blur-2xl" />

            <div className="relative mx-auto h-[230px] w-full overflow-hidden rounded-2xl sm:h-[340px] sm:rounded-3xl">
              <Image
                src="/hero.png"
                alt="Rashid Mega Mart grocery store"
                fill
                priority
                sizes="(max-width: 640px) 100vw, 560px"
                className="object-contain drop-shadow-[0_12px_22px_rgba(0,0,0,0.12)]"
              />
            </div>
          </div>

          <div className="mt-6 flex w-full max-w-md flex-col gap-3 min-[390px]:flex-row">
            <Link
              href="/shop"
              className="group inline-flex min-h-12 flex-1 items-center justify-center gap-2 rounded-xl bg-[#168447] px-5 py-3 text-sm font-extrabold text-white shadow-[0_6px_20px_rgba(22,132,71,0.16)] transition-all duration-300 hover:-translate-y-1 hover:bg-[#075C2B] active:scale-95"
            >
              Shop Now
              <ArrowRight
                size={18}
                className="transition-transform group-hover:translate-x-1"
              />
            </Link>

            <Link
              href="/kits"
              className="group inline-flex min-h-12 flex-1 items-center justify-center gap-2 rounded-xl border border-[#168447]/30 bg-white px-5 py-3 text-sm font-extrabold text-[#168447] shadow-sm transition-all duration-300 hover:-translate-y-1 hover:bg-[#F5FAF6] active:scale-95"
            >
              Explore Kits
              <ShoppingBag
                size={18}
                className="transition-transform group-hover:scale-110"
              />
            </Link>
          </div>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-[10px] font-semibold text-[#647067] sm:text-xs">
            <span className="flex items-center gap-2">
              <ShieldCheck size={16} className="text-[#168447]" />
              Quality Products
            </span>

            <span className="flex items-center gap-2">
              <Truck size={16} className="text-[#168447]" />
              Home Delivery
            </span>
          </div>
        </div>
      </section>

      {/* GROCERY CATEGORIES */}
      <section className="mx-auto w-full max-w-7xl px-3 pb-7 pt-5 min-[480px]:px-5 sm:pb-10 sm:pt-7 md:px-6 lg:px-8">
        <div className="mb-4 flex items-end justify-between gap-3 sm:mb-6">
          <div>
            <p className="text-[10px] font-extrabold uppercase tracking-wider text-[#168447] sm:text-xs">
              Fresh picks for your home
            </p>

            <h2 className="mt-1 text-xl font-extrabold text-[#202B24] sm:text-2xl">
              Grocery
            </h2>
          </div>

          <Link
            href="/shop"
            className="inline-flex shrink-0 items-center gap-1 text-[11px] font-bold text-[#168447] transition hover:text-[#075C2B] sm:text-xs"
          >
            View All <ArrowRight size={15} />
          </Link>
        </div>

        <div className="grid grid-cols-3 gap-2.5 min-[480px]:grid-cols-4 sm:gap-4 md:grid-cols-5 lg:grid-cols-8">
          {categories.map((category) => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </div>
      </section>

      {/* GROCERY KITS */}
      <section className="mx-auto w-full max-w-7xl px-3 pb-8 pt-3 min-[480px]:px-5 sm:pb-12 md:px-6 lg:px-8">
        <div className="mb-4 flex items-end justify-between gap-3 sm:mb-6">
          <div>
            <p className="text-[10px] font-extrabold uppercase tracking-wider text-[#168447] sm:text-xs">
              Smart shopping combos
            </p>

            <h2 className="mt-1 text-xl font-extrabold text-[#202B24] sm:text-2xl">
              Grocery Kits
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
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-5 lg:grid-cols-4">
            {featuredKits.slice(0, 4).map((kit) => (
              <KitCard key={kit.id} kit={kit} />
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-[#E5E7E9] bg-white p-6 text-center sm:p-8">
            <ShoppingBag className="mx-auto text-[#168447]" size={30} />

            <p className="mt-2 text-sm font-semibold text-[#68756B]">
              Grocery kits will be available soon.
            </p>
          </div>
        )}
      </section>

      {/* BEST SELLERS */}
      <section className="mx-auto w-full max-w-7xl px-3 py-8 min-[480px]:px-5 sm:py-12 md:px-6 lg:px-8">
        <div className="mb-5 flex items-end justify-between gap-3 sm:mb-6">
          <div>
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
          <div className="grid grid-cols-2 gap-3 min-[560px]:grid-cols-3 sm:gap-5 lg:grid-cols-4">
            {bestSellingProducts.slice(0, 8).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <p className="rounded-2xl border border-[#E5E7E9] bg-white p-6 text-center text-sm text-[#68756B] sm:p-8">
            Products will be available soon.
          </p>
        )}
      </section>

      {/* PREMIUM GROCERY OFFERS BANNER */}
      <section className="mx-auto w-full max-w-7xl px-3 py-8 min-[480px]:px-5 sm:py-12 md:px-6 lg:px-8">
        <div className="relative isolate min-h-[390px] overflow-hidden rounded-[28px] border border-[#B9F49B] bg-[#E9F9DF] shadow-[0_15px_35px_rgba(22,132,71,0.14)] sm:min-h-[440px] sm:rounded-[36px] lg:min-h-[480px]">
          <Image
            src="/hero.png"
            alt="Fresh vegetables and grocery basket"
            fill
            sizes="(max-width: 768px) 100vw, 1200px"
            className="absolute inset-0 -z-20 object-cover object-right"
          />

          <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[#F4FFE9]/95 via-[#F1FFE8]/85 to-transparent" />

          <div className="pointer-events-none absolute -left-20 top-10 -z-10 h-64 w-64 rounded-full bg-[#8BEA55]/25 blur-[90px]" />

          <div className="flex min-h-[390px] flex-col justify-between p-5 sm:min-h-[440px] sm:p-8 lg:min-h-[480px] lg:p-12">
            <div className="max-w-[650px]">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-[#079447] to-[#006B36] text-white shadow-lg sm:h-16 sm:w-16 sm:rounded-3xl">
                <Tag size={29} strokeWidth={2.2} />
              </div>

              <h2 className="mt-6 max-w-xl text-3xl font-black leading-[1.12] tracking-tight text-[#073F27] sm:mt-8 sm:text-4xl lg:text-5xl">
                Great Value for Everyday Shopping
              </h2>

              <p className="mt-4 max-w-lg text-sm leading-6 text-[#263B2D] sm:text-base sm:leading-7 lg:text-lg">
                Explore our products and grocery combo kits to find the right
                essentials for your home.
              </p>
            </div>

            <Link
              href="/shop"
              className="group mt-8 inline-flex min-h-[58px] w-full items-center justify-center gap-3 rounded-2xl border border-[#56D98B] bg-gradient-to-r from-[#078B43] to-[#006B35] px-5 py-4 text-base font-extrabold text-white shadow-[0_8px_22px_rgba(0,107,53,0.25)] transition duration-300 hover:-translate-y-1 hover:from-[#087B3D] hover:to-[#00552B] hover:shadow-[0_12px_28px_rgba(0,107,53,0.32)] active:scale-[0.98] sm:min-h-[68px] sm:text-xl"
            >
              Explore Offers

              <ArrowRight
                size={24}
                strokeWidth={2.5}
                className="transition-transform duration-300 group-hover:translate-x-2"
              />
            </Link>
          </div>
        </div>
      </section>

      {/* SERVICE BENEFITS */}
      <section className="mx-auto w-full max-w-7xl px-3 pb-10 min-[480px]:px-5 sm:pb-14 md:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-3 min-[480px]:grid-cols-2 sm:grid-cols-3 sm:gap-4">
          <div className="flex min-w-0 items-center gap-4 rounded-2xl border border-[#E5E7E9] bg-white p-4 shadow-sm sm:p-5">
            <Truck size={26} className="shrink-0 text-[#168447]" />

            <div>
              <h3 className="text-sm font-extrabold text-[#202B24]">
                Home Delivery
              </h3>

              <p className="mt-1 text-xs leading-5 text-[#68756B]">
                Delivery within 5 km is free.
              </p>
            </div>
          </div>

          <div className="flex min-w-0 items-center gap-4 rounded-2xl border border-[#E5E7E9] bg-white p-4 shadow-sm sm:p-5">
            <ShieldCheck size={26} className="shrink-0 text-[#168447]" />

            <div>
              <h3 className="text-sm font-extrabold text-[#202B24]">
                Quality Essentials
              </h3>

              <p className="mt-1 text-xs leading-5 text-[#68756B]">
                Everyday products for your home.
              </p>
            </div>
          </div>

          <div className="flex min-w-0 items-center gap-4 rounded-2xl border border-[#E5E7E9] bg-white p-4 shadow-sm min-[480px]:col-span-2 sm:col-span-1 sm:p-5">
            <Headset size={26} className="shrink-0 text-[#168447]" />

            <div>
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
