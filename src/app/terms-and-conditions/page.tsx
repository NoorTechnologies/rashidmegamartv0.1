import Link from "next/link";
import { ArrowLeft, FileText } from "lucide-react";

const sections = [
  {
    title: "Using this website",
    body: "You may browse our products, explore grocery kits and contact us for shopping enquiries. Please use the website lawfully and provide accurate information when contacting the store.",
  },
  {
    title: "Products, prices and availability",
    body: "Product listings, images, prices and availability are provided for general information and may change. Your order is subject to confirmation by Rashid Mega Mart, including the final price, quantity and availability.",
  },
  {
    title: "Orders and confirmation",
    body: "Sending an enquiry or cart message does not by itself mean that an order has been accepted. We will confirm the order details with you before it is treated as confirmed.",
  },
  {
    title: "Payments, delivery and collection",
    body: "Please confirm the available payment method, delivery or collection arrangements, applicable charges and expected timing with the store before completing your purchase. Do not share an OTP, card PIN or banking password with anyone.",
  },
  {
    title: "Cancellations, returns and product concerns",
    body: "If you need to change or cancel an order, or have a concern about a product, contact the store as soon as possible. Any return, replacement or refund request will be discussed with you based on the product and applicable requirements.",
  },
  {
    title: "Website content and updates",
    body: "We try to keep website information useful and up to date, but occasional errors or changes may occur. We may update products, content or these terms when needed.",
  },
];

export default function TermsAndConditionsPage() {
  return (
    <main className="min-h-screen bg-[#FFFDF8] px-4 py-10 text-[#30251F] sm:px-6 sm:py-14">
      <article className="mx-auto max-w-3xl">
        <Link href="/" className="inline-flex items-center gap-2 text-sm font-semibold text-[#A83250] transition hover:text-[#87263F]">
          <ArrowLeft size={16} /> Back to Home
        </Link>
        <div className="mt-8 rounded-3xl border border-[#A83250]/10 bg-white p-6 shadow-[0_16px_50px_rgba(70,40,30,0.05)] sm:p-10">
          <div className="flex size-12 items-center justify-center rounded-2xl bg-[#F8E8ED] text-[#A83250]">
            <FileText size={24} />
          </div>
          <p className="mt-5 text-xs font-extrabold uppercase tracking-[0.16em] text-[#A47A2C]">Rashid Mega Mart</p>
          <h1 className="mt-2 text-3xl font-black tracking-tight text-[#A83250] sm:text-4xl">Terms & Conditions</h1>
          <p className="mt-3 text-sm leading-7 text-[#76665C]">
            These terms explain the basic conditions for browsing our website and placing shopping enquiries with Rashid Mega Mart.
          </p>
          <div className="mt-8 space-y-7">
            {sections.map((section, index) => (
              <section key={section.title} className="border-t border-[#A83250]/10 pt-6">
                <h2 className="text-base font-extrabold text-[#30251F]">{index + 1}. {section.title}</h2>
                <p className="mt-2 text-sm leading-7 text-[#76665C]">{section.body}</p>
              </section>
            ))}
          </div>
          <div className="mt-8 rounded-2xl bg-[#FFF9D8]/70 p-5">
            <h2 className="text-sm font-extrabold text-[#30251F]">Need help with an order?</h2>
            <p className="mt-2 text-sm leading-6 text-[#76665C]">Talk to our team before confirming your purchase.</p>
            <a href="https://wa.me/918962531603" target="_blank" rel="noopener noreferrer" className="mt-4 inline-flex min-h-10 items-center justify-center rounded-xl bg-[#138047] px-4 py-2 text-sm font-bold text-white transition hover:bg-[#0F6B3B]">
              WhatsApp: +91 89625 31603
            </a>
          </div>
        </div>
      </article>
    </main>
  );
}
