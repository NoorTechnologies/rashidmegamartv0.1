
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
  PackageCheck,
} from "lucide-react";

import { useCart } from "@/context/CartContext";

const STORE_WHATSAPP_NUMBER = "918962531603";

const formatPrice = (amount: number) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);

const cleanCustomerText = (value: string) =>
  value.replace(/[\u0000-\u001F\u007F]/g, " ").replace(/\s+/g, " ").trim();

const escapeWhatsAppText = (value: string) =>
  value.replace(/([_*~`\\])/g, "\\$1");

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
  const [formError, setFormError] = useState("");
  const [checkoutStatus, setCheckoutStatus] = useState("");

  const orderSubtotal = items.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  const hasValidOrder =
    items.length > 0 &&
    Number.isSafeInteger(totalItems) &&
    Number.isFinite(orderSubtotal) &&
    Number.isSafeInteger(orderSubtotal) &&
    orderSubtotal >= 0 &&
    items.every(
      (item) =>
        item.id.trim().length > 0 &&
        item.name.trim().length > 0 &&
        Number.isFinite(item.price) &&
        item.price >= 0 &&
        Number.isSafeInteger(item.quantity) &&
        item.quantity > 0 &&
        Number.isSafeInteger(item.price * item.quantity)
    );

  const handleCheckout = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setFormError("");
    setCheckoutStatus("");

    if (items.length === 0) {
      setFormError("Your cart is empty. Please add products first.");
      return;
    }

    if (!hasValidOrder) {
      setFormError("Your cart contains invalid product or quantity data. Please update your cart and try again.");
      return;
    }

    const cleanName = cleanCustomerText(customerName);
    const cleanPhone = phone.replace(/\D/g, "");
    const cleanAddress = cleanCustomerText(address);

    if (cleanName.length < 2) {
      setFormError("Please enter your valid full name.");
      return;
    }

    if (!/^[6-9]\d{9}$/.test(cleanPhone)) {
      setFormError("Please enter a valid 10-digit mobile number.");
      return;
    }

    if (cleanAddress.length < 10) {
      setFormError("Please enter a complete delivery address.");
      return;
    }

    if (!/^\d{10,15}$/.test(STORE_WHATSAPP_NUMBER)) {
      setFormError("Store WhatsApp number is not configured correctly.");
      return;
    }

    const orderItems = items
      .map((item, index) => {
        const productName = escapeWhatsAppText(cleanCustomerText(item.name));
        const packSize = item.packSize
          ? ` (${escapeWhatsAppText(cleanCustomerText(item.packSize))})`
          : "";

        return `${index + 1}. ${productName}${packSize}
   Qty: ${item.quantity} x ${formatPrice(item.price)} = ${formatPrice(item.price * item.quantity)}`;
      })
      .join("\n\n");

    const message = `🛒 *NEW ORDER - RASHID MEGA MART*

*Customer Details*
Name: ${cleanName}
Phone: ${cleanPhone}
Address: ${cleanAddress}

*Order Items*
${orderItems}

*Order Summary*
Total Items: ${totalItems}
Product Subtotal: ${formatPrice(orderSubtotal)}
Delivery Charge: To be confirmed by store
Estimated Amount: ${formatPrice(orderSubtotal)} + delivery (if applicable)

Payment Preference: ${paymentMethod === "COD" ? "Cash on Delivery" : "UPI"}

Please confirm product availability, delivery charges and final payable amount.

Thank you!`;

    const whatsappUrl = `https://wa.me/${STORE_WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

    const whatsappWindow = window.open(whatsappUrl, "_blank");

    if (!whatsappWindow) {
      setFormError("Your browser blocked the WhatsApp window. Please allow pop-ups for this site and try again.");
      return;
    }

    whatsappWindow.opener = null;
    setCheckoutStatus("WhatsApp opened with your order details. Review the message and press Send to place your enquiry.");
  };

  if (!isLoaded) {
    return (
      <main className="min-h-[65vh] bg-[#FAF8F5] px-4 py-8 pb-28">
        <div className="mx-auto max-w-6xl animate-pulse space-y-5">
          <div className="h-8 w-48 rounded-lg bg-gray-200" />
          <div className="grid gap-5 lg:grid-cols-[1fr_360px]">
            <div className="space-y-3">
              <div className="h-28 rounded-2xl bg-gray-200" />
              <div className="h-28 rounded-2xl bg-gray-200" />
            </div>
            <div className="h-72 rounded-2xl bg-gray-200" />
          </div>
        </div>
      </main>
    );
  }

  if (items.length === 0) {
    return (
      <main className="flex min-h-[72vh] items-center justify-center bg-[#FAF8F5] px-4 py-12 pb-28">
        <div className="w-full max-w-md text-center">
          <div className="mx-auto mb-6 flex size-24 items-center justify-center rounded-[30px] bg-[#F8E8ED] text-[#A83250] shadow-sm">
            <ShoppingBag size={42} strokeWidth={1.7} />
          </div>

          <p className="mb-2 text-[11px] font-extrabold uppercase tracking-[0.2em] text-[#A83250]">
            Rashid Mega Mart
          </p>

          <h1 className="text-2xl font-black tracking-tight text-[#24201E] sm:text-3xl">
            Your cart is empty
          </h1>

          <p className="mx-auto mt-3 max-w-sm text-sm leading-6 text-[#77716C]">
            Abhi aapke cart mein koi product nahi hai. Apne favourite grocery
            products explore karein aur shopping shuru karein.
          </p>

          <Link
            href="/shop"
            className="rmm-button-primary mt-7 min-h-12 rounded-xl px-7 py-3 text-sm"
          >
            <ShoppingBag size={18} />
            Start Shopping
          </Link>

          <div className="mt-5">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-sm font-semibold text-[#77716C] transition hover:text-[#A83250]"
            >
              <ArrowLeft size={16} />
              Back to Home
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen overflow-x-clip bg-[#FAF8F5] px-3 py-4 pb-24 min-[375px]:px-4 sm:px-6 sm:py-9 sm:pb-14">
      <div className="mx-auto w-full max-w-6xl">
        {/* Page Header */}
        <header className="mb-4 flex flex-col gap-3 min-[430px]:flex-row min-[430px]:items-center min-[430px]:justify-between sm:mb-8">
          <div>
            <p className="mb-1.5 text-[10px] font-extrabold uppercase tracking-[0.2em] text-[#A83250] sm:text-xs">
              Rashid Mega Mart
            </p>

            <h1 className="text-2xl font-black tracking-tight text-[#24201E] sm:text-3xl">
              My Shopping Cart
            </h1>

            <p className="mt-1.5 text-xs text-[#817A74] sm:text-sm">
              {totalItems} {totalItems === 1 ? "item" : "items"} ready for
              checkout
            </p>
          </div>

          <Link
            href="/shop"
            className="rmm-button-secondary min-h-10 w-fit rounded-xl px-4 py-2 text-xs sm:min-h-11 sm:text-sm"
          >
            <ArrowLeft size={15} />
            Continue Shopping
          </Link>
        </header>

        <div className="grid min-w-0 items-start gap-4 lg:grid-cols-[minmax(0,1fr)_370px] lg:gap-7">
          {/* LEFT: CART ITEMS */}
          <section className="min-w-0">
            <div className="mb-3 flex items-center justify-between gap-3">
              <div>
                <h2 className="text-base font-extrabold text-[#24201E] sm:text-lg">
                  Your Items
                </h2>
                <p className="mt-0.5 text-[11px] text-[#8A817A]">
                  Review your selected products
                </p>
              </div>

              <button
                type="button"
                onClick={() => {
                  if (window.confirm("Remove all items from your cart?")) {
                    clearCart();
                  }
                }}
                className="inline-flex min-h-9 items-center gap-1.5 rounded-lg px-2 text-xs font-bold text-red-500 transition hover:bg-red-50 hover:text-red-700"
              >
                <Trash2 size={14} />
                Clear Cart
              </button>
            </div>

            <div className="space-y-3">
              {items.map((item) => (
                <article
                  key={item.id}
                  className="group flex min-w-0 gap-3 rounded-2xl border border-[#EEE8E1] bg-white p-3 shadow-[0_2px_12px_rgba(40,30,20,0.035)] transition hover:border-[#E5D4D9] hover:shadow-[0_5px_20px_rgba(40,30,20,0.06)] min-[430px]:gap-4 sm:p-4"
                >
                  {/* Product Image */}
                  <div className="relative size-[78px] shrink-0 overflow-hidden rounded-xl bg-[#F8F6F2] min-[375px]:size-[88px] sm:size-24">
                    {item.image ? (
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        unoptimized
                        sizes="(max-width: 374px) 78px, (max-width: 639px) 88px, 96px"
                        className="object-contain p-2.5 transition duration-300 group-hover:scale-105"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center text-3xl">
                        🛒
                      </div>
                    )}
                  </div>

                  {/* Product Details */}
                  <div className="flex min-w-0 flex-1 flex-col justify-between gap-3">
                    <div className="min-w-0">
                      <h3 className="line-clamp-2 break-words text-xs font-extrabold leading-5 text-[#29231F] min-[375px]:text-sm sm:text-[15px]">
                        {item.name}
                      </h3>

                      {item.brand && (
                        <p className="mt-1 truncate text-[10px] font-medium text-[#8B827B] sm:text-xs">
                          {item.brand}
                        </p>
                      )}

                      {item.packSize && (
                        <p className="mt-1 text-[10px] text-[#A49B94] sm:text-xs">
                          {item.packSize}
                        </p>
                      )}

                      <p className="mt-1.5 text-xs font-extrabold text-[#A83250] sm:text-sm">
                        {formatPrice(item.price)}
                      </p>
                    </div>

                    <div className="flex min-w-0 flex-wrap items-center justify-between gap-2">
                      {/* Quantity Control */}
                      <div className="inline-flex h-9 shrink-0 items-center rounded-lg border border-[#EAE4DE] bg-[#FCFBF9]">
                        <button
                          type="button"
                          aria-label={`Decrease ${item.name} quantity`}
                          onClick={() => decreaseQuantity(item.id)}
                          className="rmm-quantity-button flex size-9 items-center justify-center rounded-l-lg"
                        >
                          <Minus size={14} />
                        </button>

                        <span
                          aria-live="polite"
                          className="min-w-7 text-center text-xs font-extrabold tabular-nums text-[#29231F]"
                        >
                          {item.quantity}
                        </span>

                        <button
                          type="button"
                          aria-label={`Increase ${item.name} quantity`}
                          onClick={() => increaseQuantity(item.id)}
                          className="rmm-quantity-button flex size-9 items-center justify-center rounded-r-lg"
                        >
                          <Plus size={14} />
                        </button>
                      </div>

                      {/* Item Total & Remove */}
                      <div className="flex min-w-0 items-center gap-1.5 min-[375px]:gap-2">
                        <span className="truncate text-xs font-black text-[#29231F] min-[375px]:text-sm">
                          {formatPrice(item.price * item.quantity)}
                        </span>

                        <button
                          type="button"
                          aria-label={`Remove ${item.name}`}
                          onClick={() => removeFromCart(item.id)}
                          className="flex size-9 shrink-0 items-center justify-center rounded-lg text-[#B5AAA3] transition hover:bg-red-50 hover:text-red-600 active:bg-red-100"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            {/* Delivery Information */}
            <div className="mt-4 flex gap-3 rounded-2xl border border-[#E9E0D6] bg-[#FFFDF8] p-3.5 sm:p-4">
              <div className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-[#F5EAD6] text-[#A47A2C]">
                <Truck size={19} />
              </div>

              <div className="min-w-0">
                <p className="text-xs font-extrabold text-[#55432C] sm:text-sm">
                  Delivery details
                </p>

                <p className="mt-1 text-[11px] leading-5 text-[#81715C] sm:text-xs">
                  Delivery availability and charges will be confirmed by the
                  store after receiving your order.
                </p>
              </div>
            </div>
          </section>

          {/* RIGHT: ORDER SUMMARY + CHECKOUT */}
          <aside className="min-w-0 space-y-4 lg:sticky lg:top-5">
            {/* Order Summary */}
            <section className="rounded-2xl border border-[#EEE8E1] bg-white p-3.5 shadow-[0_3px_18px_rgba(40,30,20,0.04)] sm:p-5">
              <div className="flex items-center justify-between">
                <h2 className="text-base font-extrabold text-[#29231F] sm:text-lg">
                  Order Summary
                </h2>

                <span className="rounded-full bg-[#F8E8ED] px-2.5 py-1 text-[10px] font-extrabold text-[#A83250]">
                  {totalItems} ITEMS
                </span>
              </div>

              <div className="mt-5 space-y-3.5 text-xs sm:text-sm">
                <div className="flex items-center justify-between gap-3 text-[#817A74]">
                  <span>Product Subtotal</span>
                  <span className="font-bold text-[#29231F]">
                    {formatPrice(subtotal)}
                  </span>
                </div>

                <div className="flex items-center justify-between gap-3 text-[#817A74]">
                  <span>Delivery Charge</span>
                  <span className="text-right font-bold text-[#A47A2C]">
                    To be confirmed
                  </span>
                </div>

                <div className="border-t border-dashed border-[#E9E2DB] pt-4">
                  <div className="flex items-center justify-between gap-3">
                    <div>
                      <p className="text-sm font-extrabold text-[#29231F]">
                        Product Total
                      </p>
                      <p className="mt-1 text-[10px] text-[#999087]">
                        Before delivery charges
                      </p>
                    </div>

                    <span className="text-xl font-black tracking-tight text-[#A83250]">
                      {formatPrice(subtotal)}
                    </span>
                  </div>

                  <p className="mt-3 rounded-lg bg-[#FAF7F2] p-2.5 text-[10px] leading-5 text-[#817A74]">
                    Final payable amount will be confirmed by the store after
                    checking product availability and delivery charges.
                  </p>
                </div>
              </div>
            </section>

            {/* Checkout Form */}
            <form
              onSubmit={handleCheckout}
              className="min-w-0 space-y-4 rounded-2xl border border-[#EEE8E1] bg-white p-4 shadow-[0_3px_18px_rgba(40,30,20,0.04)] sm:space-y-5 sm:p-5"
            >
              <div>
                <div className="flex items-center gap-2">
                  <div className="flex size-8 items-center justify-center rounded-lg bg-[#F8E8ED] text-[#A83250]">
                    <ShoppingBag size={16} />
                  </div>

                  <h2 className="text-base font-extrabold text-[#29231F] sm:text-lg">
                    Checkout Details
                  </h2>
                </div>

                <p className="mt-2 text-[11px] leading-5 text-[#8A817A] sm:text-xs">
                  Apni details fill karein. Order WhatsApp par store ko bheja
                  jayega.
                </p>
              </div>

              <div className="space-y-3.5 sm:space-y-4">
                {/* Name */}
                <div>
                  <label
                    htmlFor="customerName"
                    className="mb-1.5 block text-xs font-bold text-[#554D47]"
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
                    onChange={(event) => {
                      setCustomerName(event.target.value);
                      setFormError("");
                      setCheckoutStatus("");
                    }}
                    placeholder="Enter your full name"
                    className="min-h-12 w-full rounded-xl border border-[#EAE4DE] bg-[#FCFBF9] px-3.5 py-3 text-base text-[#29231F] outline-none transition placeholder:text-sm placeholder:text-[#B0A69F] focus:border-[#A83250] focus:ring-2 focus:ring-[#A83250]/10 sm:px-4 sm:text-sm"
                  />
                </div>

                {/* Phone */}
                <div>
                  <label
                    htmlFor="phone"
                    className="mb-1.5 block text-xs font-bold text-[#554D47]"
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
                    onChange={(event) => {
                      setPhone(
                        event.target.value.replace(/\D/g, "").slice(0, 10)
                      );
                      setFormError("");
                      setCheckoutStatus("");
                    }}
                    placeholder="10-digit mobile number"
                    className="min-h-12 w-full rounded-xl border border-[#EAE4DE] bg-[#FCFBF9] px-3.5 py-3 text-base text-[#29231F] outline-none transition placeholder:text-sm placeholder:text-[#B0A69F] focus:border-[#A83250] focus:ring-2 focus:ring-[#A83250]/10 sm:px-4 sm:text-sm"
                  />
                </div>

                {/* Address */}
                <div>
                  <label
                    htmlFor="address"
                    className="mb-1.5 block text-xs font-bold text-[#554D47]"
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
                    onChange={(event) => {
                      setAddress(event.target.value);
                      setFormError("");
                      setCheckoutStatus("");
                    }}
                    placeholder="House no., street, area and landmark"
                    className="min-h-24 w-full resize-y rounded-xl border border-[#EAE4DE] bg-[#FCFBF9] px-3.5 py-3 text-base text-[#29231F] outline-none transition placeholder:text-sm placeholder:text-[#B0A69F] focus:border-[#A83250] focus:ring-2 focus:ring-[#A83250]/10 sm:px-4 sm:text-sm"
                  />
                </div>
              </div>

              {/* Payment Preference */}
              <div>
                <p className="mb-2.5 text-xs font-bold text-[#554D47]">
                  Payment Preference
                </p>

                <div className="grid grid-cols-2 gap-2.5">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod("COD")}
                    aria-pressed={paymentMethod === "COD"}
                    className={`min-h-[76px] rounded-xl border p-3 text-left transition active:scale-[0.99] ${
                      paymentMethod === "COD"
                        ? "border-[#A83250] bg-[#FDF6F8] ring-1 ring-[#A83250]/10"
                        : "border-[#EAE4DE] bg-white hover:border-[#D8C6CB]"
                    }`}
                  >
                    <span className="block text-xs font-extrabold text-[#29231F]">
                      Cash on Delivery
                    </span>

                    <span className="mt-1 block text-[10px] leading-4 text-[#8A817A]">
                      Pay when delivered
                    </span>

                    {paymentMethod === "COD" && (
                      <span className="mt-2 inline-flex items-center gap-1 text-[9px] font-bold text-[#A83250]">
                        <CheckCircle2 size={12} />
                        Selected
                      </span>
                    )}
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod("UPI")}
                    aria-pressed={paymentMethod === "UPI"}
                    className={`min-h-[76px] rounded-xl border p-3 text-left transition active:scale-[0.99] ${
                      paymentMethod === "UPI"
                        ? "border-[#A83250] bg-[#FDF6F8] ring-1 ring-[#A83250]/10"
                        : "border-[#EAE4DE] bg-white hover:border-[#D8C6CB]"
                    }`}
                  >
                    <span className="block text-xs font-extrabold text-[#29231F]">
                      UPI Payment
                    </span>

                    <span className="mt-1 block text-[10px] leading-4 text-[#8A817A]">
                      Details after confirmation
                    </span>

                    {paymentMethod === "UPI" && (
                      <span className="mt-2 inline-flex items-center gap-1 text-[9px] font-bold text-[#A83250]">
                        <CheckCircle2 size={12} />
                        Selected
                      </span>
                    )}
                  </button>
                </div>

                {paymentMethod === "UPI" && (
                  <p className="mt-2.5 rounded-xl border border-[#F1E1BC] bg-[#FFFBF0] p-3 text-[11px] leading-5 text-[#80612C]">
                    Store order confirm karne ke baad verified UPI details
                    share karega. Abhi payment mat karein.
                  </p>
                )}
              </div>

              {/* Checkout feedback */}
              {checkoutStatus && (
                <p
                  role="status"
                  className="rounded-xl border border-green-100 bg-green-50 px-3 py-2.5 text-xs font-medium leading-5 text-green-700"
                >
                  {checkoutStatus}
                </p>
              )}

              {formError && (
                <p
                  role="alert"
                  className="rounded-xl border border-red-100 bg-red-50 px-3 py-2.5 text-xs font-medium leading-5 text-red-600"
                >
                  {formError}
                </p>
              )}

              {/* WhatsApp Checkout */}
              <button
                type="submit"
                className="flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#138047] px-3 py-3.5 text-sm font-extrabold text-white shadow-lg shadow-green-900/10 transition hover:bg-[#0E6B3A] active:scale-[0.98] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#138047]"
              >
                <Image
                  src="/Whatsapp-3d.svg"
                  alt=""
                  width={23}
                  height={23}
                  unoptimized
                  className="shrink-0"
                />
                Place Order on WhatsApp
              </button>

              <p className="flex items-center justify-center gap-1.5 text-center text-[10px] leading-5 text-[#A09890]">
                <ShieldCheck size={13} className="shrink-0" />
                Your details will be shared with the store for this order.
              </p>
            </form>
          </aside>
        </div>

        {/* Bottom Information */}
        <div className="mt-6 flex flex-wrap items-center justify-center gap-2 px-1 text-center text-[10px] leading-5 text-[#A09890] sm:mt-8 sm:text-xs">
          <PackageCheck size={14} className="shrink-0 text-[#A47A2C]" />
          <span>Order confirmation and final charges will be shared by the store.</span>
          <MapPin size={14} className="shrink-0" />
          <span>Delivery details are subject to store confirmation.</span>
        </div>
      </div>
    </main>
  );
}
