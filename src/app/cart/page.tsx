"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState, type FormEvent } from "react";
import { ArrowLeft, Minus, Plus, ShoppingBag, Trash2, Truck, ShieldCheck, ChevronDown } from "lucide-react";

import { useCart } from "@/context/CartContext";
import { kits } from "@/data/kits";

const WHATSAPP_NUMBER = "918962531603";

const formatPrice = (amount: number) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);

export default function CartPage() {
  const {
    items,
    totalItems,
    isLoaded,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
    clearCart,
  } = useCart();

  const [customerName, setCustomerName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [specialInstructions, setOrderNote] = useState("");
  const [formError, setFormError] = useState("");

  // Always use the current catalogue price, not a stale price stored in localStorage.
  // This value updates immediately whenever cart quantity or contents change.
  const pricedItems = useMemo(
    () =>
      items.map((item) => {
        const kit = kits.find((entry) => entry.id === item.id);
        const unitPrice = kit?.price ?? item.price;
        return {
          ...item,
          name: kit?.name ?? item.name,
          unitPrice,
          lineTotal: unitPrice * item.quantity,
          available: item.catalogProductId ? true : Boolean(kit?.isAvailable),
        };
      }),
    [items]
  );

  const subtotal = useMemo(
    () => pricedItems.reduce((sum, item) => sum + item.lineTotal, 0),
    [pricedItems]
  );

  const handleWhatsAppEnquiry = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormError("");

    const cleanName = customerName.trim();
    const cleanPhone = phone.replace(/\D/g, "");
    const cleanAddress = address.trim();
    const cleanInstructions = specialInstructions.trim();

    if (cleanName.length < 2) {
      setFormError("Please enter your name.");
      return;
    }
    if (!/^[6-9]\d{9}$/.test(cleanPhone)) {
      setFormError("Please enter a valid 10-digit mobile number.");
      return;
    }
    if (!items.length) {
      setFormError("Your cart is empty.");
      return;
    }
    if (pricedItems.some((item) => !item.available)) {
      setFormError("A kit in your cart is unavailable. Please remove it and try again.");
      return;
    }

    const enquiryDetails = pricedItems
      .map((item, index) => {
        const contents = [
          ...(item.kitContents ?? []).map((line) => line.name + " (" + line.quantity + ")"),
          ...(item.requestedItems ?? []).map((line) => line.name + " (" + line.quantity + ")"),
        ];
        return [
          (index + 1) + ". " + (item.kitGroupName ? item.kitGroupName + " — " : "") + item.name,
          "   " + item.quantity + " × " + formatPrice(item.unitPrice) + " = " + formatPrice(item.lineTotal),
          contents.length ? "   Kit changes / extra items: " + contents.join(", ") : "",
        ].filter(Boolean).join("\n");
      })
      .join("\n\n");

    const hasExtras = items.some((item) => (item.requestedItems?.length ?? 0) > 0);
    const message = [
      "🛒 *Rashid Mega Mart — Shopping Enquiry*",\n      "",\n      "This is an enquiry only. Final availability, weight (where applicable), delivery charges and payable amount will be confirmed by the store.",
      "",
      "*Customer*",
      "Name: " + cleanName,
      "Mobile: " + cleanPhone,
      "Address: " + (cleanAddress || "Will confirm on WhatsApp"),
      "",
      "*Your Items*",
      enquiryDetails,
      "",
      "*Subtotal: " + formatPrice(subtotal) + "*",
      "Delivery: Confirm on WhatsApp",
      hasExtras ? "Extra item prices: Owner will confirm separately." : "",
      cleanInstructions ? "Note: " + cleanInstructions : "",
      "",
      "Please confirm availability, actual weights where applicable, delivery charges and final amount.",
    ].filter(Boolean).join("\n");

    if (message.length > 3500) {
      setFormError("Enquiry details are too long. Please reduce the extra items.");
      return;
    }

    window.location.assign(
      "https://wa.me/" + WHATSAPP_NUMBER + "?text=" + encodeURIComponent(message)
    );
  };

  if (!isLoaded) {
    return (
      <main className="min-h-[65vh] bg-[#FAF7EF] px-4 py-10">
        <div className="mx-auto max-w-5xl animate-pulse space-y-4">
          <div className="h-8 w-48 rounded-lg bg-[#E8DFD1]" />
          <div className="h-28 rounded-2xl bg-white" />
          <div className="h-28 rounded-2xl bg-white" />
        </div>
      </main>
    );
  }

  if (!items.length) {
    return (
      <main className="flex min-h-[70vh] items-center justify-center bg-[#FAF7EF] px-4 py-12">
        <div className="w-full max-w-md text-center">
          <div className="mx-auto mb-5 flex size-20 items-center justify-center rounded-3xl bg-[#F1EBDD] text-[#168447]">
            <ShoppingBag size={36} />
          </div>
          <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-[#168447]">Rashid Mega Mart</p>
          <h1 className="mt-2 text-2xl font-black text-[#202124]">Your cart is empty</h1>
          <p className="mt-2 text-sm text-[#686868]">Apni pasand ki grocery kit chunein aur shopping shuru karein.</p>
          <Link href="/kits" className="rmm-button-primary mt-6 min-h-12 rounded-xl px-7 py-3 text-sm">
            <ShoppingBag size={17} /> Browse Grocery Kits
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#FAF7EF] px-3 pt-4 pb-[calc(142px+env(safe-area-inset-bottom))] sm:px-6 sm:py-9 sm:pb-32">
      <div className="mx-auto max-w-5xl">
        <header className="mb-4 flex flex-wrap items-center justify-between gap-2 sm:mb-6 sm:gap-3">
          <div>
            <p className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-[#168447]">Rashid Mega Mart</p>
            <h1 className="mt-1 text-2xl font-black tracking-tight text-[#202124] sm:text-3xl">Your Cart</h1>
            <p className="mt-1 text-sm text-[#686868]">{totalItems} {totalItems === 1 ? "kit" : "kits"} selected</p>
          </div>
          <Link href="/kits" className="rmm-button-secondary min-h-11 rounded-xl px-3 py-2 text-[11px] sm:px-4 sm:text-xs">
            <ArrowLeft size={15} /> Continue Shopping
          </Link>
        </header>

        <div className="grid items-start gap-4 sm:gap-5 lg:grid-cols-[minmax(0,1fr)_350px]">
          <section className="space-y-2.5 sm:space-y-3">
            <div className="flex items-center justify-between px-1">
              <h2 className="font-extrabold text-[#202124]">Selected Kits</h2>
              <button
                type="button"
                onClick={() => {
                  if (window.confirm("Remove all items from your cart?")) clearCart();
                }}
                className="inline-flex min-h-10 items-center gap-1.5 rounded-lg px-2 text-[11px] font-bold text-red-600 hover:bg-red-50 sm:text-xs"
              >
                <Trash2 size={14} /> Clear cart
              </button>
            </div>

            {pricedItems.map((item) => (
              <article key={item.id} className="flex gap-2.5 rounded-2xl border border-[#E8DFD1] bg-white p-2.5 shadow-sm sm:gap-4 sm:p-4">
                <div className="relative size-[76px] shrink-0 overflow-hidden rounded-xl bg-[#FAF7EF] min-[380px]:size-20 sm:size-24">
                  {item.image ? (
                    <Image src={item.image} alt={item.name} fill unoptimized sizes="96px" className="object-contain p-2" />
                  ) : (
                    <div className="flex h-full items-center justify-center"><ShoppingBag /></div>
                  )}
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      {item.kitGroupName ? <p className="mb-0.5 text-[10px] font-extrabold uppercase tracking-wide text-[#168447]">{item.kitGroupName}</p> : null}
                      <h3 className="break-words text-sm font-extrabold text-[#202124] sm:text-base">{item.name}</h3>
                      <p className="mt-1 text-xs text-[#686868]">{formatPrice(item.unitPrice)} per kit</p>
                    </div>
                    <button type="button" aria-label={"Remove " + item.name} onClick={() => removeFromCart(item.id)} className="flex size-10 shrink-0 items-center justify-center rounded-xl text-[#9B8F80] hover:bg-red-50 hover:text-red-600">
                      <Trash2 size={16} />
                    </button>
                  </div>

                  <div className="mt-3 flex flex-wrap items-center justify-between gap-2 sm:mt-4 sm:gap-3">
                    <div className="inline-flex h-11 items-center rounded-xl border border-[#E8DFD1] bg-[#FAF7EF]">
                      <button type="button" aria-label={"Decrease " + item.name} onClick={() => decreaseQuantity(item.id)} className="flex size-11 items-center justify-center rounded-l-xl text-[#800020] hover:bg-[#F1EBDD]"><Minus size={14} /></button>
                      <span aria-live="polite" className="min-w-8 text-center text-sm font-black tabular-nums text-[#202124]">{item.quantity}</span>
                      <button type="button" aria-label={"Increase " + item.name} onClick={() => increaseQuantity(item.id)} className="flex size-11 items-center justify-center rounded-r-xl text-[#168447] hover:bg-[#EAF3E9]"><Plus size={14} /></button>
                    </div>
                    <p className="text-base font-black tabular-nums text-[#168447]">{formatPrice(item.lineTotal)}</p>
                  </div>

                  {(item.kitContents?.length || item.requestedItems?.length) ? (
                    <details className="mt-2.5 rounded-xl bg-[#FAF7EF] px-3 py-2.5">
                      <summary className="flex cursor-pointer list-none items-center justify-between gap-2 text-xs font-bold text-[#5E574E]">
                        View kit items / changes <ChevronDown size={14} />
                      </summary>
                      <ul className="mt-2 space-y-1 border-t border-[#E8DFD1] pt-2 text-xs text-[#686868]">
                        {(item.kitContents ?? []).map((line, index) => <li key={"kit-" + index}>{line.name} — {line.quantity}</li>)}
                        {(item.requestedItems ?? []).map((line, index) => <li key={"extra-" + index}>Extra: {line.name} — {line.quantity} (price to confirm)</li>)}
                      </ul>
                    </details>
                  ) : null}
                </div>
              </article>
            ))}

            <div className="flex items-start gap-3 rounded-2xl border border-[#E8DFD1] bg-white p-4">
              <Truck size={19} className="mt-0.5 shrink-0 text-[#806000]" />
              <div>
                <p className="text-sm font-extrabold text-[#202124]">Delivery</p>
                <p className="mt-1 text-xs leading-5 text-[#686868]">Delivery availability and charges will be confirmed by Rashid Mega Mart on WhatsApp.</p>
              </div>
            </div>
          </section>

          <aside className="space-y-4 lg:sticky lg:top-5">
            <section className="rounded-2xl border border-[#BBDCC5] bg-white p-4 shadow-sm sm:p-5">
              <h2 className="text-lg font-black text-[#202124]">Cart Summary</h2>
              <div className="mt-4 space-y-3">
                {pricedItems.map((item) => (
                  <div key={item.id} className="flex items-start justify-between gap-3 text-sm">
                    <span className="min-w-0 text-[#686868]">{item.name} × {item.quantity}</span>
                    <span className="shrink-0 font-bold tabular-nums text-[#202124]">{formatPrice(item.lineTotal)}</span>
                  </div>
                ))}
              </div>
              <div className="mt-4 border-t border-dashed border-[#D8CBB8] pt-4">
                <div className="flex items-center justify-between gap-3">
                  <span className="text-sm font-bold text-[#5E574E]">Subtotal</span>
                  <span aria-live="polite" className="text-2xl font-black tabular-nums text-[#168447]">{formatPrice(subtotal)}</span>
                </div>
                <p className="mt-2 text-[11px] leading-5 text-[#686868]">Quantity badalte hi subtotal apne aap update hota hai. Delivery charges WhatsApp par confirm honge.</p>
              </div>
            </section>

            <form id="cart-checkout" onSubmit={handleWhatsAppEnquiry} className="space-y-3 rounded-2xl border border-[#E8DFD1] bg-white p-4 shadow-sm sm:p-5">
              <div>
                <h2 className="text-lg font-black text-[#202124]">Send WhatsApp Enquiry</h2>
                <p className="mt-1 text-xs text-[#686868]">Bas naam aur mobile number bharein.</p>
              </div>
              <label className="block text-xs font-bold text-[#202124]">
                Your name *
                <input required minLength={2} maxLength={70} autoComplete="name" value={customerName} onChange={(event) => setCustomerName(event.target.value)} placeholder="Enter your name" className="mt-1.5 min-h-11 w-full rounded-xl border border-[#E8DFD1] bg-[#FAF7EF] px-3 text-sm outline-none focus:border-[#168447] focus:ring-2 focus:ring-[#168447]/10" />
              </label>
              <label className="block text-xs font-bold text-[#202124]">
                Mobile number *
                <input required type="tel" inputMode="numeric" autoComplete="tel" pattern="[6-9][0-9]{9}" maxLength={10} value={phone} onChange={(event) => setPhone(event.target.value.replace(/\D/g, "").slice(0, 10))} placeholder="10-digit mobile number" className="mt-1.5 min-h-11 w-full rounded-xl border border-[#E8DFD1] bg-[#FAF7EF] px-3 text-sm outline-none focus:border-[#168447] focus:ring-2 focus:ring-[#168447]/10" />
              </label>
              <label className="block text-xs font-bold text-[#202124]">
                Delivery address <span className="font-normal text-[#8A8175]">(optional)</span>
                <textarea maxLength={250} rows={2} autoComplete="street-address" value={address} onChange={(event) => setAddress(event.target.value)} placeholder="House no., area, landmark" className="mt-1.5 w-full resize-y rounded-xl border border-[#E8DFD1] bg-[#FAF7EF] px-3 py-2.5 text-sm outline-none focus:border-[#168447] focus:ring-2 focus:ring-[#168447]/10" />
              </label>
              <label className="block text-xs font-bold text-[#202124]">
                Special instructions <span className="font-normal text-[#8A8175]">(optional)</span>
                <textarea maxLength={240} rows={2} value={specialInstructions} onChange={(event) => setOrderNote(event.target.value)} placeholder="Any special instructions?" className="mt-1.5 w-full resize-y rounded-xl border border-[#E8DFD1] bg-[#FAF7EF] px-3 py-2.5 text-sm outline-none focus:border-[#168447] focus:ring-2 focus:ring-[#168447]/10" />
              </label>
              {formError ? <p role="alert" className="rounded-lg bg-red-50 px-3 py-2 text-xs font-medium text-red-700">{formError}</p> : null}
              <button type="submit" className="flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#168447] px-4 py-3 text-sm font-extrabold text-white shadow-md transition hover:bg-[#106B38] active:scale-[0.99]">
                <Image src="/Whatsapp-3d.svg" alt="" width={22} height={22} unoptimized /> Send Enquiry
              </button>
              <p className="flex items-center justify-center gap-1.5 text-center text-[10px] leading-4 text-[#777064]"><ShieldCheck size={13} /> Details will be shared with the store.</p>
            </form>
          </aside>
        </div>

        <div className="fixed inset-x-0 bottom-[calc(70px+env(safe-area-inset-bottom))] z-40 border-t border-[#E8DFD1] bg-white/98 px-3 py-2 shadow-[0_-8px_24px_rgba(40,30,20,0.08)] backdrop-blur-lg lg:hidden">
          <button type="button" onClick={() => document.querySelector<HTMLFormElement>("#cart-checkout")?.requestSubmit()} className="flex min-h-12 w-full items-center justify-between rounded-xl bg-[#168447] px-4 text-sm font-extrabold text-white shadow-sm active:scale-[.99]">
            <span className="flex items-center gap-2"><Image src="/Whatsapp-3d.svg" alt="" width={20} height={20} unoptimized /> Send Enquiry</span>
            <span className="tabular-nums">{formatPrice(subtotal)}</span>
          </button>
        </div>
      </div>
    </main>
  );
}
