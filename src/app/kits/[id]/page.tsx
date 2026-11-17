
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  Package,
  ShoppingBag,
  Tag,
  Sparkles,
} from "lucide-react";
import { getKitById } from "@/data/kits";
import KitCustomizer from "@/components/KitCustomizer";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function KitDetailPage({ params }: PageProps) {
  const { id } = await params;
  const kit = getKitById(id);
  if (!kit || !kit.isAvailable) notFound();


  const discount =
    kit.oldPrice && kit.oldPrice > kit.price
      ? Math.round(((kit.oldPrice - kit.price) / kit.oldPrice) * 100)
      : 0;

  const savings =
    kit.oldPrice && kit.oldPrice > kit.price
      ? kit.oldPrice - kit.price
      : 0;

  return (
    <main className="min-h-screen bg-[#FFFDF8] pb-24">
      {/* Header */}
      <header className="sticky top-0 z-30 border-b border-[#EFE3D9] bg-[#FFFDF8]/95 backdrop-blur-xl">
        <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <Link
            href="/kits"
            className="inline-flex items-center gap-2 text-sm font-bold text-[#30251F] transition hover:text-[#A83250]"
          >
            <ArrowLeft size={18} />
            <span>Back to Kits</span>
          </Link>

          <span className="text-sm font-black tracking-wide text-[#A83250]">
            RASHID MEGA MART
          </span>

          <Link
            href="/cart"
            aria-label="Open cart"
            className="flex size-9 items-center justify-center rounded-full bg-[#F8E8ED] text-[#A83250] transition hover:bg-[#F1D5DE]"
          >
            <ShoppingBag size={18} />
          </Link>
        </div>
      </header>

      {/* Breadcrumb */}
      <div className="mx-auto max-w-7xl px-4 pt-5 sm:px-6 lg:px-8">
        <nav
          aria-label="Breadcrumb"
          className="flex items-center gap-2 overflow-hidden text-xs text-[#94847A]"
        >
          <Link href="/" className="shrink-0 hover:text-[#A83250]">
            Home
          </Link>
          <span>/</span>
          <Link href="/kits" className="shrink-0 hover:text-[#A83250]">
            Grocery Kits
          </Link>
          <span>/</span>
          <span className="truncate font-semibold text-[#A83250]">
            {kit.name}
          </span>
        </nav>
      </div>

      {/* Product Details */}
      <section className="mx-auto max-w-7xl px-3 py-4 sm:px-6 sm:py-10 lg:px-8">
        <div className="grid items-start gap-4 sm:gap-7 lg:grid-cols-2 lg:gap-14">
          {/* Product Image */}
          <div className="min-w-0">
            <div className="group relative aspect-[1.08/1] overflow-hidden rounded-2xl sm:aspect-square sm:rounded-[28px] border border-[#EFE3D9] bg-white shadow-[0_12px_40px_rgba(70,40,30,0.06)]">
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
                  <Package size={76} className="text-[#A83250]/30" />
                </div>
              )}

              {discount > 0 && (
                <span className="absolute left-4 top-4 rounded-xl bg-[#A83250] px-4 py-2 text-xs font-black tracking-wide text-white shadow-lg sm:left-6 sm:top-6">
                  {discount}% OFF
                </span>
              )}

              <div className="absolute bottom-4 right-4 flex items-center gap-1.5 rounded-full border border-[#EFE3D9] bg-white/95 px-3 py-2 text-[11px] font-bold text-[#A83250] shadow-sm backdrop-blur-sm">
                <Sparkles size={13} />
                RASHID MEGA MART
              </div>

              {!kit.isAvailable && (
                <div className="absolute inset-0 flex items-center justify-center bg-white/70 backdrop-blur-sm">
                  <span className="rounded-full bg-[#30251F] px-5 py-3 text-sm font-bold text-white">
                    Currently Unavailable
                  </span>
                </div>
              )}
            </div>

            {/* Image Information */}
            <div className="mt-4 flex items-center justify-between rounded-2xl border border-[#EFE3D9] bg-white px-4 py-4 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="flex size-10 items-center justify-center rounded-xl bg-[#F8E8ED] text-[#A83250]">
                  <Package size={20} />
                </div>
                <div>
                  <p className="text-sm font-extrabold text-[#30251F]">
                    Products in this kit
                  </p>
                  <p className="text-xs text-[#94847A]">
                    See the full product list below
                  </p>
                </div>
              </div>

              <span className="rounded-full bg-[#FFF4E0] px-3 py-1.5 text-xs font-black text-[#9A6410]">
                {kit.items.length} Items
              </span>
            </div>
          </div>

          {/* Product Information */}
          <div className="flex min-w-0 flex-col pt-1">
            <div className="flex flex-wrap items-center gap-2">
              {kit.isAvailable ? (
                <span className="inline-flex items-center gap-1.5 rounded-full bg-[#EAF6EE] px-3 py-1.5 text-[11px] font-bold text-[#138047]">
                  <Check size={13} />
                  In Stock
                </span>
              ) : (
                <span className="rounded-full bg-red-50 px-3 py-1.5 text-[11px] font-bold text-red-600">
                  Out of Stock
                </span>
              )}
            </div>

            <h1 className="mt-3 text-2xl font-black leading-tight tracking-tight text-[#30251F] sm:mt-5 sm:text-4xl lg:text-[42px]">
              {kit.name}
            </h1>

            {kit.subtitle && (
              <p className="mt-3 text-sm font-semibold text-[#A83250] sm:text-base">
                {kit.subtitle}
              </p>
            )}

            <p className="mt-4 max-w-xl text-sm leading-7 text-[#796B61] sm:text-base">
              {kit.description}
            </p>

            {/* Price Card */}
            <div className="mt-5 rounded-2xl border border-[#EFE3D9] bg-white p-4 shadow-[0_8px_28px_rgba(70,40,30,0.04)] sm:mt-7 sm:p-6">
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#94847A]">
                Special Kit Price
              </p>

              <div className="mt-3 flex flex-wrap items-center gap-3">
                <span className="text-4xl font-black tracking-tight text-[#A83250]">
                  ₹{kit.price.toLocaleString("en-IN")}
                </span>

                {kit.oldPrice && kit.oldPrice > kit.price && (
                  <span className="text-lg font-semibold text-[#A99D94] line-through">
                    ₹{kit.oldPrice.toLocaleString("en-IN")}
                  </span>
                )}

                {discount > 0 && (
                  <span className="rounded-lg bg-[#FFF2D9] px-3 py-1.5 text-xs font-extrabold text-[#9A6410]">
                    {discount}% OFF
                  </span>
                )}
              </div>

              {savings > 0 && (
                <div className="mt-4 inline-flex items-center gap-2 rounded-lg bg-[#EAF6EE] px-3 py-2 text-xs font-bold text-[#138047]">
                  <Tag size={15} />
                  You save ₹{savings.toLocaleString("en-IN")}
                </div>
              )}
            </div>

            {/* Cart Action */}
            <div className="mt-6">
              <KitCustomizer kit={kit} />
            </div>

            <p className="mt-3 text-center text-xs text-[#94847A]">
              Add this kit to your cart to continue shopping.
            </p>
          </div>
        </div>
      </section>

      {/* Explore More Kits */}
      <section className="mx-auto max-w-7xl px-4 pb-10 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-4 rounded-2xl border border-[#EFE3D9] bg-white px-5 py-6 text-center shadow-sm sm:flex-row sm:text-left sm:px-7">
          <div>
            <h2 className="text-lg font-black text-[#30251F]">
              Looking for more options?
            </h2>
            <p className="mt-1 text-sm text-[#94847A]">
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
