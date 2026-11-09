
"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, type FormEvent } from "react";
import {
  ArrowLeft,
  CheckCircle2,
  MapPin,
  Minus,
  Plus,
  ShieldCheck,
  ShoppingBag,
  Trash2,
  Truck,
} from "lucide-react";
import { useCart } from "@/context/CartContext";

const STORE_WHATSAPP_NUMBER = "918962531603";

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
    subtotal,
    isLoaded,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
    clearCart,
  } = useCart();

  const [customerName, setCustomerName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState<"COD" | "UPI">("COD");

  const handleCheckout = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (items.length === 0) return;

    if (!/^\d{10,15}$/.test(STORE_WHATSAPP_NUMBER)) {
      alert("WhatsApp number sahi format mein nahi hai.");
      return;
    }

    const orderItems = items
      .map(
        (item, index) =>
          `${index + 1}. ${item.name}${item.packSize ? ` (${item.packSize})` : ""}\n   Qty: ${item.quantity} x ${formatPrice(item.price)} = ${formatPrice(item.price * item.quantity)}`
      )
      .join("\n\n");

    const message = `🛒 *NEW ORDER - RASHID MEGA MART*

*Customer Details*
Name: ${customerName.trim()}
Phone: ${phone.trim()}
Address: ${address.trim()}

*Order Items*
${orderItems}

*Order Summary*
Total Items: ${totalItems}
Subtotal: ${formatPrice(subtotal)}
Delivery: To be confirmed by store
Estimated Total: ${formatPrice(subtotal)}

Payment Preference: ${paymentMethod === "COD" ? "Cash on Delivery" : "UPI"}

Please confirm product availability, delivery charges and final amount.

Thank you!`;

    const whatsappUrl = `https://wa.me/${STORE_WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

    window.open(whatsappUrl, "_blank", "noopener,noreferrer");
  };

  if (!isLoaded) {
    return (
      <div className="mx-auto min-h-[60vh] w-full max-w-6xl px-3 py-10 sm:px-6 sm:py-16">
        <div className="mx-auto max-w-md animate-pulse space-y-4">
          <div className="h-8 w-48 rounded-lg bg-gray-200" />
          <div className="h-28 rounded-2xl bg-gray-100" />
          <div className="h-28 rounded-2xl bg-gray-100" />
          <div className="h-40 rounded-2xl bg-gray-100" />
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <section className="mx-auto flex min-h-[65vh] w-full max-w-6xl flex-col items-center justify-center px-4 py-12 pb-28 text-center sm:px-6 sm:py-16">
        <div className="mb-5 flex size-20 items-center justify-center rounded-full bg-green-50 sm:mb-6 sm:size-24">
          <ShoppingBag size={38} className="text-[#168447] sm:size-11" />
        </div>

        <h1 className="text-xl font-extrabold text-[#202B24] sm:text-3xl">
          Your cart is empty
        </h1>

        <p className="mt-3 max-w-sm text-sm leading-6 text-gray-500">
          Abhi aapne koi product add nahi kiya hai. Apne favourite grocery
          products shopping se add karein.
        </p>

        <Link
          href="/shop"
          className="mt-6 inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-[#168447] px-6 py-3 text-sm font-bold text-white shadow-lg shadow-green-900/10 transition hover:bg-[#075C2B] active:scale-[0.98]"
        >
          <ShoppingBag size={18} />
          Start Shopping
        </Link>

        <Link
          href="/"
          className="mt-5 inline-flex min-h-10 items-center justify-center text-sm font-semibold text-gray-500 transition hover:text-[#168447]"
        >
          <span className="inline-flex items-center gap-2">
            <ArrowLeft size={16} />
            Back to Home
          </span>
        </Link>
      </section>
    );
  }

  return (
    <section className="min-h-screen w-full overflow-x-clip bg-[#F4F8F3] px-3 py-5 pb-28 min-[375px]:px-4 sm:px-6 sm:py-9 sm:pb-12">
      <div className="mx-auto w-full max-w-6xl min-w-0">
        {/* Header */}
        <div className="mb-5 flex flex-col gap-3 min-[430px]:flex-row min-[430px]:items-center min-[430px]:justify-between sm:mb-7">
          <div className="min-w-0">
            <p className="mb-1 text-[10px] font-bold uppercase tracking-[0.18em] text-[#168447] sm:text-xs">
              Rashid Mega Mart
            </p>

            <h1 className="text-xl font-extrabold leading-tight text-[#202B24] min-[375px]:text-2xl sm:text-3xl">
              My Shopping Cart
            </h1>

            <p className="mt-1 text-xs text-gray-500 sm:text-sm">
              {totalItems} {totalItems === 1 ? "item" : "items"} in your cart
            </p>
          </div>

          <Link
            href="/shop"
            className="inline-flex min-h-10 w-fit items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white px-3 py-2 text-xs font-bold text-[#168447] transition hover:border-[#168447] sm:min-h-11 sm:px-4 sm:text-sm"
          >
            <ArrowLeft size={15} />
            Continue Shopping
          </Link>
        </div>

        <div className="grid min-w-0 items-start gap-5 lg:grid-cols-[minmax(0,1fr)_360px] lg:gap-6">
          {/* Cart Items */}
          <div className="min-w-0 space-y-3 sm:space-y-4">
            <div className="flex items-center justify-between gap-3">
              <h2 className="text-sm font-bold text-[#202B24] sm:text-base">
                Cart Items
              </h2>

              <button
                type="button"
                onClick={() => {
                  if (window.confirm("Remove all items from your cart?")) {
                    clearCart();
                  }
                }}
                className="inline-flex min-h-9 items-center justify-center rounded-lg px-2 text-xs font-semibold text-red-500 transition hover:bg-red-50 hover:text-red-700"
              >
                Clear Cart
              </button>
            </div>

            {items.map((item) => (
              <article
                key={item.id}
                className="flex min-w-0 gap-3 rounded-2xl border border-gray-100 bg-white p-3 shadow-sm min-[430px]:gap-4 sm:gap-5 sm:p-5"
              >
                <div className="relative size-[76px] shrink-0 overflow-hidden rounded-xl bg-[#F4F8F3] min-[375px]:size-[88px] min-[430px]:size-24 sm:size-28">
                  {item.image ? (
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      unoptimized
                      sizes="(max-width: 374px) 76px, (max-width: 429px) 88px, 112px"
                      className="object-contain p-2"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center text-2xl sm:text-3xl">
                      🛒
                    </div>
                  )}
                </div>

                <div className="flex min-w-0 flex-1 flex-col justify-between gap-2">
                  <div className="min-w-0">
                    <h3 className="line-clamp-2 break-words text-xs font-bold leading-5 text-[#202B24] min-[375px]:text-sm sm:text-base">
                      {item.name}
                    </h3>

                    {item.brand && (
                      <p className="mt-1 truncate text-[10px] text-gray-500 sm:text-xs">
                        {item.brand}
                      </p>
                    )}

                    {item.packSize && (
                      <p className="mt-1 text-[10px] text-gray-400 sm:text-xs">
                        {item.packSize}
                      </p>
                    )}

                    <p className="mt-1.5 text-xs font-extrabold text-[#168447] sm:mt-2 sm:text-sm">
                      {formatPrice(item.price)}
                    </p>
                  </div>

                  <div className="flex min-w-0 flex-wrap items-center justify-between gap-2">
                    <div className="inline-flex h-9 shrink-0 items-center rounded-lg border border-gray-200">
                      <button
                        type="button"
                        aria-label={`Decrease ${item.name} quantity`}
                        onClick={() => decreaseQuantity(item.id)}
                        className="flex size-9 items-center justify-center rounded-l-lg text-gray-600 transition hover:bg-gray-100 active:bg-gray-200"
                      >
                        <Minus size={14} />
                      </button>

                      <span className="min-w-7 text-center text-xs font-bold tabular-nums text-[#202B24]">
                        {item.quantity}
                      </span>

                      <button
                        type="button"
                        aria-label={`Increase ${item.name} quantity`}
                        onClick={() => increaseQuantity(item.id)}
                        className="flex size-9 items-center justify-center rounded-r-lg text-gray-600 transition hover:bg-gray-100 active:bg-gray-200"
                      >
                        <Plus size={14} />
                      </button>
                    </div>

                    <div className="flex min-w-0 items-center gap-1.5 min-[375px]:gap-2">
                      <span className="truncate text-xs font-extrabold text-[#202B24] min-[375px]:text-sm">
                        {formatPrice(item.price * item.quantity)}
                      </span>

                      <button
                        type="button"
                        aria-label={`Remove ${item.name}`}
                        onClick={() => removeFromCart(item.id)}
                        className="flex size-9 shrink-0 items-center justify-center rounded-lg text-red-400 transition hover:bg-red-50 hover:text-red-600 active:bg-red-100"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              </article>
            ))}

            {/* Delivery Info */}
            <div className="flex min-w-0 gap-3 rounded-2xl border border-green-100 bg-green-50 p-3.5 sm:p-4">
              <Truck className="mt-0.5 shrink-0 text-[#168447]" size={21} />

              <div className="min-w-0">
                <p className="text-xs font-bold text-[#075C2B] sm:text-sm">
                  Free Delivery Within 5 KM
                </p>

                <p className="mt-1 text-[11px] leading-5 text-green-800/80 sm:text-xs">
                  5 KM se zyada distance par delivery charge store confirm
                  karega. Final amount order confirmation ke baad milega.
                </p>
              </div>
            </div>
          </div>

          {/* Checkout */}
          <aside className="min-w-0 space-y-4 sm:space-y-5">
            {/* Order Summary */}
            <div className="rounded-2xl border border-gray-100 bg-white p-4 shadow-sm sm:p-6">
              <h2 className="text-base font-extrabold text-[#202B24] sm:text-lg">
                Order Summary
              </h2>

              <div className="mt-4 space-y-3 text-xs sm:mt-5 sm:text-sm">
                <div className="flex justify-between gap-3 text-gray-500">
                  <span>Items ({totalItems})</span>
                  <span className="font-semibold text-[#202B24]">
                    {formatPrice(subtotal)}
                  </span>
                </div>

                <div className="flex justify-between gap-3 text-gray-500">
                  <span>Delivery Charge</span>
                  <span className="text-right font-semibold text-[#168447]">
                    To be confirmed
                  </span>
                </div>

                <div className="border-t border-dashed border-gray-200 pt-4">
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-xs font-bold text-[#202B24] sm:text-sm">
                      Estimated Total
                    </span>

                    <span className="text-lg font-extrabold text-[#168447] sm:text-xl">
                      {formatPrice(subtotal)}
                    </span>
                  </div>

                  <p className="mt-2 text-[10px] leading-5 text-gray-400 sm:text-[11px]">
                    Delivery charge, stock availability aur final amount
                    store confirm karega.
                  </p>
                </div>
              </div>
            </div>

            {/* Checkout Form */}
            <form
              onSubmit={handleCheckout}
              className="min-w-0 space-y-4 rounded-2xl border border-gray-100 bg-white p-4 shadow-sm sm:space-y-5 sm:p-6"
            >
              <div>
                <h2 className="text-base font-extrabold text-[#202B24] sm:text-lg">
                  Checkout Details
                </h2>

                <p className="mt-1 text-[11px] text-gray-500 sm:text-xs">
                  Order WhatsApp par store ko bhejein.
                </p>
              </div>

              <div className="space-y-3.5 sm:space-y-4">
                {/* Customer Name */}
                <div>
                  <label
                    htmlFor="customerName"
                    className="mb-1.5 block text-xs font-bold text-gray-700"
                  >
                    Full Name *
                  </label>

                  <input
                    id="customerName"
                    type="text"
                    required
                    minLength={2}
                    maxLength={70}
                    autoComplete="name"
                    value={customerName}
                    onChange={(event) => setCustomerName(event.target.value)}
                    placeholder="Enter your name"
                    className="min-h-12 w-full rounded-xl border border-gray-200 bg-[#FAFCF9] px-3.5 py-3 text-base text-[#202B24] outline-none transition placeholder:text-sm placeholder:text-gray-400 focus:border-[#168447] focus:ring-2 focus:ring-green-100 sm:px-4 sm:text-sm"
                  />
                </div>

                {/* Customer Phone */}
                <div>
                  <label
                    htmlFor="phone"
                    className="mb-1.5 block text-xs font-bold text-gray-700"
                  >
                    Mobile Number *
                  </label>

                  <input
                    id="phone"
                    type="tel"
                    required
                    inputMode="numeric"
                    autoComplete="tel"
                    pattern="[6-9][0-9]{9}"
                    maxLength={10}
                    value={phone}
                    onChange={(event) =>
                      setPhone(event.target.value.replace(/\D/g, "").slice(0, 10))
                    }
                    placeholder="10-digit mobile number"
                    className="min-h-12 w-full rounded-xl border border-gray-200 bg-[#FAFCF9] px-3.5 py-3 text-base text-[#202B24] outline-none transition placeholder:text-sm placeholder:text-gray-400 focus:border-[#168447] focus:ring-2 focus:ring-green-100 sm:px-4 sm:text-sm"
                  />
                </div>

                {/* Delivery Address */}
                <div>
                  <label
                    htmlFor="address"
                    className="mb-1.5 block text-xs font-bold text-gray-700"
                  >
                    Delivery Address *
                  </label>

                  <textarea
                    id="address"
                    required
                    minLength={10}
                    maxLength={300}
                    rows={3}
                    autoComplete="street-address"
                    value={address}
                    onChange={(event) => setAddress(event.target.value)}
                    placeholder="House no., street, area and landmark"
                    className="min-h-24 w-full resize-y rounded-xl border border-gray-200 bg-[#FAFCF9] px-3.5 py-3 text-base text-[#202B24] outline-none transition placeholder:text-sm placeholder:text-gray-400 focus:border-[#168447] focus:ring-2 focus:ring-green-100 sm:px-4 sm:text-sm"
                  />
                </div>
              </div>

              {/* Payment Preference */}
              <div>
                <p className="mb-3 text-xs font-bold text-gray-700">
                  Payment Preference
                </p>

                <div className="grid grid-cols-1 gap-2.5 min-[380px]:grid-cols-2 sm:gap-3">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod("COD")}
                    aria-pressed={paymentMethod === "COD"}
                    className={`min-h-[68px] rounded-xl border p-3 text-left transition active:scale-[0.99] ${
                      paymentMethod === "COD"
                        ? "border-[#168447] bg-green-50"
                        : "border-gray-200 bg-white"
                    }`}
                  >
                    <span className="block text-xs font-bold text-[#202B24] sm:text-sm">
                      Cash on Delivery
                    </span>

                    <span className="mt-1 block text-[10px] text-gray-500">
                      Pay when delivered
                    </span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod("UPI")}
                    aria-pressed={paymentMethod === "UPI"}
                    className={`min-h-[68px] rounded-xl border p-3 text-left transition active:scale-[0.99] ${
                      paymentMethod === "UPI"
                        ? "border-[#168447] bg-green-50"
                        : "border-gray-200 bg-white"
                    }`}
                  >
                    <span className="block text-xs font-bold text-[#202B24] sm:text-sm">
                      UPI Payment
                    </span>

                    <span className="mt-1 block text-[10px] text-gray-500">
                      Details after confirmation
                    </span>
                  </button>
                </div>

                {paymentMethod === "UPI" && (
                  <p className="mt-2 rounded-lg bg-amber-50 p-3 text-xs leading-5 text-amber-800">
                    Store order confirm karne ke baad verified UPI details
                    share karega. Abhi payment mat karein.
                  </p>
                )}
              </div>

              {/* WhatsApp Order Button */}
              <button
                type="submit"
                className="flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#168447] px-3 py-3.5 text-xs font-extrabold text-white shadow-lg shadow-green-900/10 transition hover:bg-[#075C2B] active:scale-[0.98] min-[375px]:text-sm"
              >
                <Image
                  src="/Whatsapp-3d.svg"
                  alt="WhatsApp"
                  width={23}
                  height={23}
                  unoptimized
                  className="shrink-0"
                />
                Place Order on WhatsApp
              </button>

              <p className="flex items-center justify-center gap-1.5 text-center text-[10px] leading-5 text-gray-400">
                <ShieldCheck size={13} className="shrink-0" />
                Your details will be shared with the store for this order.
              </p>
            </form>
          </aside>
        </div>

        <div className="mt-6 flex flex-wrap items-center justify-center gap-2 px-1 text-center text-[10px] leading-5 text-gray-400 sm:mt-7 sm:text-xs">
          <MapPin size={14} className="shrink-0" />
          <span>Delivery address and charges will be confirmed by the store.</span>
          <CheckCircle2 size={14} className="shrink-0 text-[#168447]" />
        </div>
      </div>
    </section>
  );
}
