
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowLeft,
  Package,
  CheckCircle2,
  Tag,
} from "lucide-react";
import { getKitById } from "@/data/kits";
import KitDetailClient from "@/components/KitDetailClient";

interface KitPageProps {
  params: Promise<{ id: string }>;
}

export default async function KitDetailPage({
  params,
}: KitPageProps) {
  const { id } = await params;
  const kit = getKitById(id);

  if (!kit || !kit.isAvailable) {
    if (!kit) notFound();
  }

  const discount =
    kit.oldPrice && kit.oldPrice > kit.price
      ? Math.round(
          ((kit.oldPrice - kit.price) / kit.oldPrice) * 100
        )
      : 0;

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#F4FAF5] via-white to-white px-4 py-6 pb-28 sm:px-6 sm:py-10 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <Link
          href="/kits"
          className="mb-6 inline-flex items-center gap-2 text-sm font-bold text-[#168447] transition hover:text-[#075C2B]"
        >
          <ArrowLeft size={18} />
          Back to Grocery Kits
        </Link>

        <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
          <div className="relative flex min-h-[280px] items-center justify-center overflow-hidden rounded-3xl border border-[#DFEEE3] bg-gradient-to-br from-[#F1FAF3] to-[#E8F5E9] sm:min-h-[420px]">
            {discount > 0 && (
              <span className="absolute left-4 top-4 z-10 rounded-full bg-red-600 px-4 py-2 text-xs font-extrabold text-white shadow-md">
                {discount}% OFF
              </span>
            )}

            {kit.image ? (
              <Image
                src={kit.image}
                alt={kit.name}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-contain p-6 sm:p-10"
              />
            ) : (
              <Package size={80} className="text-[#168447]" />
            )}
          </div>

          <div className="flex flex-col justify-center">
            <span className="mb-3 w-fit rounded-full bg-[#EAF7EE] px-3 py-1.5 text-xs font-extrabold uppercase tracking-wider text-[#168447]">
              {kit.category}
            </span>

            <h1 className="text-3xl font-black leading-tight text-[#202B24] sm:text-4xl">
              {kit.name}
            </h1>

            <p className="mt-3 text-sm leading-6 text-[#68756B] sm:text-base">
              {kit.subtitle}
            </p>

            <p className="mt-4 text-sm leading-6 text-[#53665A]">
              {kit.description}
            </p>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <span className="text-3xl font-black text-[#075C2B]">
                ₹{kit.price.toLocaleString("en-IN")}
              </span>

              {kit.oldPrice && kit.oldPrice > kit.price && (
                <span className="text-base text-[#98A69C] line-through">
                  ₹{kit.oldPrice.toLocaleString("en-IN")}
                </span>
              )}

              {discount > 0 && (
                <span className="rounded-lg bg-[#EAF7EE] px-2.5 py-1 text-xs font-extrabold text-[#168447]">
                  Save {discount}%
                </span>
              )}
            </div>

            <div className="mt-6 flex items-center gap-3 rounded-2xl border border-[#DFEEE3] bg-white p-4">
              <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-[#EAF7EE] text-[#168447]">
                <Package size={24} />
              </div>
              <div>
                <p className="text-2xl font-black text-[#075C2B]">
                  {kit.items.length}
                </p>
                <p className="text-xs font-semibold text-[#68756B]">
                  Total Products Included
                </p>
              </div>
            </div>

            <KitDetailClient kit={kit} />
          </div>
        </div>

        <section className="mt-12">
          <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
            <div>
              <p className="text-xs font-extrabold uppercase tracking-wider text-[#168447]">
                Kit Contents
              </p>
              <h2 className="mt-1 text-2xl font-black text-[#202B24]">
                Is Kit Mein Kya-Kya Hai?
              </h2>
            </div>

            <span className="rounded-full bg-[#EAF7EE] px-3 py-1.5 text-xs font-extrabold text-[#075C2B]">
              {kit.items.length} Items
            </span>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {kit.items.map((item, index) => (
              <div
                key={`${kit.id}-${index}`}
                className="flex items-center gap-3 rounded-2xl border border-[#DFEEE3] bg-white p-4 shadow-[0_3px_14px_rgba(7,92,43,0.03)]"
              >
                <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-[#EAF7EE] text-[#168447]">
                  <CheckCircle2 size={20} />
                </div>

                <div className="min-w-0">
                  <p className="text-[10px] font-bold uppercase tracking-wider text-[#98A69C]">
                    Product {index + 1}
                  </p>
                  <p className="mt-0.5 break-words text-sm font-extrabold text-[#202B24]">
                    {item}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <div className="mt-8 flex items-center gap-2 rounded-2xl bg-[#F1FAF3] p-4 text-sm text-[#53665A]">
          <Tag size={18} className="shrink-0 text-[#168447]" />
          Kit ke andar diye gaye sabhi products aur unki quantities yahan listed hain.
        </div>
      </div>
    </main>
  );
}
