
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Package,
  ShoppingBag,
  Tag,
} from "lucide-react";
import { getKitById } from "@/data/kits";
import KitCustomizer from "@/components/KitCustomizer";
import LocalizedKitCopy from "@/components/LocalizedKitCopy";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function KitDetailPage({ params }: PageProps) {
  const { id } = await params;
  const kit = getKitById(id);
  if (!kit) notFound();


  const discount =
    kit.oldPrice && kit.oldPrice > kit.price
      ? Math.round(((kit.oldPrice - kit.price) / kit.oldPrice) * 100)
      : 0;

  const savings =
    kit.oldPrice && kit.oldPrice > kit.price
      ? kit.oldPrice - kit.price
      : 0;

  return (
    <main className="min-h-screen bg-[#F8FAF7] pb-[calc(110px+env(safe-area-inset-bottom))] sm:pb-24">
      {/* Header */}
      <header className="sticky top-0 z-30 border-b border-[#E8DFD1] bg-[#F8FAF7]/95 backdrop-blur-xl">
        <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link
            href="/kits"
            className="inline-flex items-center gap-2 text-sm font-bold text-[#202124] transition hover:text-[#168447]"
          >
            <ArrowLeft size={18} />
            <span>Back to Kits</span>
          </Link>

          <span className="text-sm font-black tracking-wide text-[#168447]">
            RASHID MEGA MART
          </span>

          <Link
            href="/cart"
            aria-label="Open cart"
            className="flex size-9 items-center justify-center rounded-full bg-[#EAF5ED] text-[#168447] transition hover:bg-[#EAF5ED]"
          >
            <ShoppingBag size={18} />
          </Link>
        </div>
      </header>

      {/* Breadcrumb */}
      <div className="mx-auto max-w-7xl px-3 pt-3 sm:px-6 sm:pt-5 lg:px-8">
        <nav
          aria-label="Breadcrumb"
          className="flex items-center gap-2 overflow-hidden text-xs text-[#686868]"
        >
          <Link href="/" className="shrink-0 hover:text-[#168447]">
            Home
          </Link>
          <span>/</span>
          <Link href="/kits" className="shrink-0 hover:text-[#168447]">
            Grocery Kits
          </Link>
          <span>/</span>
          <span className="truncate font-semibold text-[#168447]">
            {kit.name}
          </span>
        </nav>
      </div>

      {/* Product Details */}
      <section data-reveal className="mx-auto max-w-7xl px-3 py-3 sm:px-6 sm:py-6 lg:px-8">
        <div className="grid items-start gap-3 sm:gap-5 lg:grid-cols-2 lg:gap-8">
          {/* Product Image */}
          <div className="min-w-0">
            <div className="group relative aspect-[5/4] overflow-hidden rounded-2xl border border-[#E8DFD1] bg-white shadow-[0_5px_18px_rgba(70,40,30,0.05)] sm:aspect-square sm:rounded-[28px] sm:shadow-[0_12px_40px_rgba(70,40,30,0.06)]">
              {kit.image ? (
                <Image
                  src={kit.image}
                  alt={kit.name}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-contain p-5 transition-transform duration-500 group-hover:scale-[1.035] sm:p-10"
                />
              ) : (
                <div className="flex h-full items-center justify-center">
                  <Package size={76} className="text-[#168447]/30" />
                </div>
              )}

              {discount > 0 && (
                <span className="absolute left-4 top-4 rounded-xl bg-[#168447] px-4 py-2 text-xs font-black tracking-wide text-white shadow-lg sm:left-6 sm:top-6">
                  {discount}% OFF
                </span>
              )}

              <div className="absolute bottom-3 right-3 rounded-full border border-[#E8DFD1] bg-white/95 px-3 py-1.5 text-[10px] font-extrabold tracking-wide text-[#168447] shadow-sm">RASHID MEGA MART
              </div>

              {!kit.isAvailable && (
                <div className="absolute inset-0 flex items-center justify-center bg-white/70 backdrop-blur-sm">
                  <span className="rounded-full bg-[#202124] px-5 py-3 text-sm font-bold text-white">
                    Currently Unavailable
                  </span>
                </div>
              )}
            </div>

            {/* Image Information */}
            <div className="mt-2 flex items-center justify-between rounded-xl border border-[#E8DFD1] bg-white px-2.5 py-2.5 sm:mt-3 sm:px-3 sm:py-3">
              <div className="flex items-center gap-3">
                <div className="flex size-9 items-center justify-center rounded-lg bg-[#EAF5ED] text-[#168447]">
                  <Package size={20} />
                </div>
                <div>
                  <p className="text-sm font-extrabold text-[#202124]">
                    Products in this kit
                  </p>
                  <p className="text-xs text-[#686868]">
                    Edit quantities, remove items or add your own
                  </p>
                </div>
              </div>

              <span className="rounded-full bg-[#FAF0C8] px-3 py-1.5 text-xs font-black text-[#A27A2A]">
                {kit.items.length} Items
              </span>
            </div>
          </div>

          {/* Product Information */}
          <div className="flex min-w-0 flex-col pt-1">
            <div className="flex flex-wrap items-center gap-2">
              {kit.isAvailable ? (
                <span className="inline-flex items-center gap-1.5 rounded-full bg-[#EAF5ED] px-3 py-1.5 text-[11px] font-bold text-[#168447]">
                  <Check size={13} />
                  In Stock
                </span>
              ) : (
                <span className="rounded-full bg-red-50 px-3 py-1.5 text-[11px] font-bold text-red-600">
                  Out of Stock
                </span>
              )}
            </div>

            <h1 className="mt-1.5 text-[23px] font-black leading-[1.12] tracking-tight text-[#202124] sm:mt-3 sm:text-3xl lg:text-[38px]">
              {kit.name}
            </h1>

            {kit.subtitle && (
              <p className="mt-2 text-sm font-semibold text-[#168447] sm:text-base">
                <LocalizedKitCopy value={kit.subtitle} />
              </p>
            )}

            <p className="mt-2 max-w-xl text-sm leading-6 text-[#686868] sm:text-[15px]">
              <LocalizedKitCopy value={kit.description} />
            </p>

            {/* Price Card */}
            <div className="mt-2.5 rounded-xl border border-[#D8E7DB] bg-[linear-gradient(135deg,#EAF5ED_0%,#FAF0C8_100%)] p-3 shadow-sm sm:mt-4 sm:p-4">
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#686868]">
                Special Kit Price
              </p>

              <div className="mt-2 flex flex-wrap items-center gap-2">
                <span className="text-3xl font-black tracking-tight text-[#168447] sm:text-4xl">
                  ₹{kit.price.toLocaleString("en-IN")}
                </span>

                {kit.oldPrice && kit.oldPrice > kit.price && (
                  <span className="text-lg font-semibold text-[#686868] line-through">
                    ₹{kit.oldPrice.toLocaleString("en-IN")}
                  </span>
                )}

                {discount > 0 && (
                  <span className="rounded-lg bg-[#FAF0C8] px-3 py-1.5 text-xs font-extrabold text-[#A27A2A]">
                    {discount}% OFF
                  </span>
                )}
              </div>

              {savings > 0 && (
                <div className="mt-2 inline-flex items-center gap-2 rounded-lg bg-[#EAF5ED] px-3 py-1.5 text-xs font-bold text-[#168447]">
                  <Tag size={15} />
                  You save ₹{savings.toLocaleString("en-IN")}
                </div>
              )}
            </div>

            {/* Cart Action */}
            <div className="mt-2.5 sm:mt-3">
              {kit.isAvailable ? (
                <KitCustomizer kit={kit} />
              ) : (
                <div className="rounded-xl border border-[#E8DFD1] bg-[#FAFAF6] px-4 py-5 text-center">
                  <p className="text-sm font-extrabold text-[#55564E]">This kit is currently unavailable</p>
                  <p className="mt-1 text-xs leading-5 text-[#85857B]">Please check back later or contact our store team for availability.</p>
                </div>
              )}
            </div>

            <p className="mt-3 text-center text-xs text-[#686868]">
              {kit.isAvailable ? "Add this kit to your cart to continue shopping." : "This kit cannot be added to your cart while unavailable."}
            </p>
          </div>
        </div>
      </section>

      <div className="fixed inset-x-0 bottom-[calc(68px+env(safe-area-inset-bottom))] z-40 border-t border-[#E8DFD1] bg-white/95 px-3 py-2 shadow-[0_-6px_20px_rgba(40,30,20,0.08)] backdrop-blur-lg sm:hidden">
        {kit.isAvailable ? (
          <a href="#customize-kit-title" className="flex min-h-12 w-full items-center justify-between rounded-xl bg-[#168447] px-4 text-sm font-extrabold text-white active:scale-[.99]">
            <span>Customize this kit</span>
            <span>₹{kit.price.toLocaleString("en-IN")} <ArrowRight size={16} className="ml-1 inline" /></span>
          </a>
        ) : (
          <div aria-disabled="true" className="flex min-h-12 w-full items-center justify-center rounded-xl bg-[#EAE8E1] px-4 text-sm font-extrabold text-[#77776E]">
            Currently Unavailable
          </div>
        )}
      </div>

      {/* Explore More Kits */}
      <section data-reveal className="mx-auto max-w-7xl px-4 pb-7 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-4 rounded-2xl border border-[#E8DFD1] bg-white px-5 py-6 text-center shadow-sm sm:flex-row sm:text-left sm:px-7">
          <div>
            <h2 className="text-lg font-black text-[#202124]">
              Looking for more options?
            </h2>
            <p className="mt-1 text-sm text-[#686868]">
              Explore more grocery combos from Rashid Mega Mart.
            </p>
          </div>

          <Link
            href="/kits"
            className="rmm-button-primary shrink-0 rounded-xl px-5 py-3 text-sm"
          >
            Explore More Kits
            <ArrowRight size={17} />
          </Link>
        </div>
      </section>
    </main>
  );
}
