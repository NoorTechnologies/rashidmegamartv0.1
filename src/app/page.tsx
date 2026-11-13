
import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Truck,
  ShieldCheck,
  ShoppingBag,
  MessageCircle,
  Package,
  ShoppingBasket,
  HeartHandshake,
} from "lucide-react";

import Footer from "@/components/Footer";
import CategoryCard from "@/components/CategoryCard";
import ProductCard from "@/components/ProductCard";
import KitCard from "@/components/KitCard";
import CustomerReviews from "@/components/CustomerReviews";

import { categories } from "@/data/categories";
import { getBestSellingProducts } from "@/data/products";
import { getFeaturedKits } from "@/data/kits";

export default function HomePage() {
  const bestSellingProducts = getBestSellingProducts();
  const featuredKits = getFeaturedKits();

  return (
    <main className="min-h-screen w-full overflow-x-clip bg-[#FFF9D8]/30">

      {/* HERO */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#FEF9C3] via-white to-[#FFF9D8]/50 px-3 pb-8 pt-6 text-[#171717] sm:px-5 sm:pb-12 sm:pt-10">
        <div className="pointer-events-none absolute -left-24 top-10 h-64 w-64 rounded-full bg-[#D4A84F]/15 blur-[90px]" />
        <div className="pointer-events-none absolute -right-24 bottom-0 h-72 w-72 rounded-full bg-[#A83250]/[0.07] blur-[90px]" />

        <div className="relative mx-auto flex w-full max-w-7xl flex-col items-center text-center">

          <span className="inline-flex items-center gap-2 rounded-full border border-[#D4A84F]/40 bg-white/90 px-4 py-2 text-[10px] font-bold tracking-wide text-[#A83250] shadow-sm sm:text-xs">
            <ShoppingBag size={15} />
            YOUR NEIGHBOURHOOD GROCERY STORE
          </span>

          <div className="mt-5 flex flex-col items-center">
            <Image
              src="/images/logo.png"
              alt="Rashid Mega Mart Logo"
              width={110}
              height={110}
              priority
              className="h-20 w-20 object-contain sm:h-24 sm:w-24"
            />

            <h1 className="mt-3 max-w-2xl text-2xl font-black leading-tight tracking-tight text-[#171717] sm:text-4xl md:text-5xl">
              Welcome to
              <span className="mt-1 block text-[#A83250]">
                Rashid Mega Mart
              </span>
            </h1>

            <p className="mt-3 max-w-md text-xs leading-6 text-[#6A7282] sm:text-sm">
              Your daily groceries, household essentials and family kits —
              everything you need in one place.
            </p>
          </div>

          {/* HERO IMAGE */}
          <div className="relative mt-5 w-full max-w-[560px]">
            <div className="pointer-events-none absolute inset-x-8 bottom-2 h-10 rounded-full bg-[#D4A84F]/20 blur-2xl" />

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

          {/* HERO BUTTONS */}
          <div className="mt-5 flex w-full max-w-md flex-col gap-3 min-[390px]:flex-row">
            <Link
              href="/shop"
              className="group inline-flex min-h-12 flex-1 items-center justify-center gap-2 rounded-xl bg-[#A83250] px-5 py-3 text-sm font-extrabold text-white shadow-[0_6px_20px_rgba(168,50,80,0.20)] transition-all duration-300 hover:-translate-y-1 hover:bg-[#87263F] active:scale-95"
            >
              Shop Now
              <ArrowRight
                size={18}
                className="transition-transform group-hover:translate-x-1"
              />
            </Link>

            <Link
              href="/kits"
              className="group inline-flex min-h-12 flex-1 items-center justify-center gap-2 rounded-xl border border-[#D4A84F]/60 bg-white px-5 py-3 text-sm font-extrabold text-[#A83250] shadow-sm transition-all duration-300 hover:-translate-y-1 hover:bg-[#F8E8ED] active:scale-95"
            >
              Explore Kits
              <ShoppingBag
                size={18}
                className="transition-transform group-hover:scale-110"
              />
            </Link>
          </div>

          {/* TRUST POINTS */}
          <div className="mt-5 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-[10px] font-semibold text-[#6A7282] sm:text-xs">
            <span className="flex items-center gap-2">
              <ShieldCheck size={16} className="text-[#138047]" />
              Quality Products
            </span>

            <span className="flex items-center gap-2">
              <Truck size={16} className="text-[#138047]" />
              Home Delivery
            </span>
          </div>
        </div>
      </section>

      {/* GROCERY CATEGORIES */}
      <section className="mx-auto w-full max-w-7xl px-3 pb-7 pt-5 min-[480px]:px-5 sm:pb-10 sm:pt-7 md:px-6 lg:px-8">
        <div className="mb-4 flex items-end justify-between gap-3 sm:mb-6">
          <div>
            <p className="text-[10px] font-extrabold uppercase tracking-wider text-[#A47A2C] sm:text-xs">
              Fresh picks for your home
            </p>

            <h2 className="mt-1 text-xl font-extrabold text-[#A83250] sm:text-2xl">
              Grocery
            </h2>
          </div>

          <Link
            href="/shop"
            className="inline-flex shrink-0 items-center gap-1 text-[11px] font-bold text-[#A83250] transition hover:text-[#87263F] sm:text-xs"
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
            <p className="text-[10px] font-extrabold uppercase tracking-wider text-[#A47A2C] sm:text-xs">
              Smart shopping combos
            </p>

            <h2 className="mt-1 text-xl font-extrabold text-[#A83250] sm:text-2xl">
              Grocery Kits
            </h2>
          </div>

          <Link
            href="/kits"
            className="inline-flex shrink-0 items-center gap-1 text-[11px] font-bold text-[#A83250] transition hover:text-[#87263F] sm:text-xs"
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
          <div className="rounded-2xl border border-[#E5E7EB] bg-white p-6 text-center sm:p-8">
            <ShoppingBag className="mx-auto text-[#D4A84F]" size={30} />

            <p className="mt-2 text-sm font-semibold text-[#6A7282]">
              Grocery kits will be available soon.
            </p>
          </div>
        )}
      </section>

      {/* BEST SELLERS */}
      <section className="mx-auto w-full max-w-7xl px-3 py-8 min-[480px]:px-5 sm:py-12 md:px-6 lg:px-8">
        <div className="mb-5 flex items-end justify-between gap-3 sm:mb-6">
          <div>
            <p className="text-[10px] font-extrabold uppercase tracking-wider text-[#A47A2C] sm:text-xs">
              Customer Favorites
            </p>

            <h2 className="mt-1 text-xl font-extrabold text-[#A83250] sm:text-2xl">
              Best Selling Products
            </h2>
          </div>

          <Link
            href="/shop"
            className="inline-flex shrink-0 items-center gap-1 text-[11px] font-bold text-[#A83250] transition hover:text-[#87263F] sm:text-xs"
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
          <p className="rounded-2xl border border-[#E5E7EB] bg-white p-6 text-center text-sm text-[#6A7282] sm:p-8">
            Products will be available soon.
          </p>
        )}
      </section>

      {/* OFFERS BANNER */}
      <section className="mx-auto w-full max-w-7xl px-3 py-6 min-[480px]:px-5 sm:py-10 md:px-6 lg:px-8">
        <div className="overflow-hidden rounded-2xl border border-[#D4A84F]/35 bg-white shadow-[0_10px_30px_rgba(53,18,13,0.07)] sm:grid sm:grid-cols-2 sm:rounded-3xl">

          {/* IMAGE */}
          <div className="relative h-[180px] w-full bg-[#FFF9D8] sm:order-2 sm:h-full sm:min-h-[340px]">
            <Image
              src="/hero.png"
              alt="Rashid Mega Mart groceries"
              fill
              sizes="(max-width: 640px) 100vw, 50vw"
              className="object-cover object-center"
            />
          </div>

          {/* CONTENT */}
          <div className="flex flex-col items-start justify-center bg-gradient-to-br from-[#FFF9D8] to-white p-5 sm:order-1 sm:p-8 lg:p-12">
            <span className="inline-flex items-center gap-2 rounded-full border border-[#D4A84F]/50 bg-white px-3 py-1.5 text-[9px] font-extrabold uppercase tracking-[0.15em] text-[#78350F] sm:text-[10px]">
              <span className="h-2 w-2 rounded-full bg-[#138047]" />
              Rashid Mega Mart
            </span>

            <h2 className="mt-4 text-[27px] font-black leading-tight tracking-tight text-[#A83250] sm:mt-5 sm:text-4xl lg:text-5xl">
              Great Value.
              <span className="mt-1 block text-[#35120D]">
                Everyday Essentials.
              </span>
            </h2>

            <p className="mt-3 max-w-md text-xs leading-6 text-[#55483C] sm:mt-4 sm:text-sm">
              Discover groceries, household essentials and thoughtfully curated
              grocery kits for your family.
            </p>

            <Link
              href="/shop"
              className="mt-5 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#A83250] px-5 py-3 text-sm font-extrabold text-white shadow-[0_6px_18px_rgba(168,50,80,0.20)] transition hover:bg-[#87263F] active:scale-[0.98] sm:mt-6 sm:w-auto sm:min-w-[190px]"
            >
              Explore Collection
              <ArrowRight size={18} />
            </Link>

            <p className="mt-4 text-[9px] font-bold tracking-[0.12em] text-[#78350F]/75 sm:text-[10px]">
              QUALITY <span className="px-1 text-[#D4A84F]">•</span>
              VALUE <span className="px-1 text-[#D4A84F]">•</span>
              CONVENIENCE
            </p>
          </div>
        </div>
      </section>

      {/* WHY CHOOSE US */}
      <section className="mx-auto w-full max-w-7xl px-3 py-8 min-[480px]:px-5 sm:py-12 md:px-6 lg:px-8">
        <div className="mb-5 text-center sm:mb-8">
          <p className="text-[10px] font-extrabold uppercase tracking-[0.16em] text-[#A47A2C] sm:text-xs">
            Shopping Made Simple
          </p>

          <h2 className="mt-2 text-2xl font-black tracking-tight text-[#A83250] sm:text-3xl">
            Why Choose Us?
          </h2>

          <p className="mx-auto mt-2 max-w-md text-xs leading-5 text-[#6A7282] sm:text-sm">
            Everything you need for convenient everyday grocery shopping.
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
          {[
            {
              icon: ShoppingBasket,
              title: "Daily Essentials",
              description: "Groceries and household needs in one place.",
              color: "bg-[#F8E8ED]",
              iconColor: "text-[#A83250]",
            },
            {
              icon: Package,
              title: "Grocery Kits",
              description: "Convenient combo kits for everyday shopping.",
              color: "bg-[#FFF4D6]",
              iconColor: "text-[#A47A2C]",
            },
            {
              icon: MessageCircle,
              title: "Easy Ordering",
              description: "Connect with us easily through WhatsApp.",
              color: "bg-[#E8F5EC]",
              iconColor: "text-[#138047]",
            },
            {
              icon: HeartHandshake,
              title: "Customer Support",
              description: "We're here to help with your shopping queries.",
              color: "bg-[#EAF1FF]",
              iconColor: "text-[#1877F2]",
            },
          ].map((item) => {
            const Icon = item.icon;

            return (
              <div
                key={item.title}
                className="rounded-2xl border border-[#E5E7EB] bg-white p-3 shadow-sm transition hover:-translate-y-1 hover:shadow-md sm:rounded-3xl sm:p-5"
              >
                <div
                  className={`flex h-10 w-10 items-center justify-center rounded-xl ${item.color} sm:h-12 sm:w-12`}
                >
                  <Icon size={21} className={item.iconColor} />
                </div>

                <h3 className="mt-3 text-xs font-extrabold text-[#30251F] sm:mt-4 sm:text-sm">
                  {item.title}
                </h3>

                <p className="mt-1.5 text-[10px] leading-[1.6] text-[#6A7282] sm:text-xs sm:leading-5">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* CUSTOMER REVIEWS */}
      <CustomerReviews />

      {/* FOOTER */}
      <Footer />
    </main>
  );
}
