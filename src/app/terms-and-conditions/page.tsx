import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, FileText } from "lucide-react";

export const metadata = {
  title: "Terms & Conditions | Rashid Mega Mart",
  description: "Read the terms for browsing Rashid Mega Mart and placing shopping enquiries.",
};

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
    <main className="min-h-screen bg-[#FAF7EF] px-4 py-10 text-[#202124] sm:px-6 sm:py-14">
      <article className="privacy-enter mx-auto max-w-3xl">
        <Link href="/" className="inline-flex items-center gap-2 text-sm font-semibold text-[#800020] transition-colors hover:text-[#A51D3D]">
          <ArrowLeft size={16} /> Back to Home
        </Link>

        <div className="mt-8 rounded-3xl border border-[#800020]/10 bg-white p-6 shadow-[0_16px_50px_rgba(70,40,30,0.05)] sm:p-10">
          <div className="flex items-center gap-4">
            <div className="flex size-14 shrink-0 items-center justify-center rounded-2xl bg-[#F8F5EC] p-2 ring-1 ring-[#E9E2D4]">
              <Image
                src="/images/logo2.png"
                alt="Rashid Mega Mart logo"
                width={48}
                height={48}
                priority
                className="size-full object-contain"
              />
            </div>
            <div className="min-w-0">
              <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-[#806000]">Rashid Mega Mart</p>
              <h1 className="mt-1 text-3xl font-black tracking-tight text-[#800020] sm:text-4xl">Terms & Conditions</h1>
            </div>
          </div>

          <p className="mt-5 text-sm leading-7 text-[#686868]">
            These terms explain the basic conditions for browsing our website and placing shopping enquiries with Rashid Mega Mart.
          </p>

          <div className="mt-8 space-y-7">
            {sections.map((section, index) => (
              <section key={section.title} className="privacy-section border-t border-[#800020]/10 pt-6" style={{ animationDelay: `${index * 90}ms` }}>
                <h2 className="text-base font-extrabold text-[#202124]">{index + 1}. {section.title}</h2>
                <p className="mt-2 text-sm leading-7 text-[#686868]">{section.body}</p>
              </section>
            ))}
          </div>

          <div className="mt-8 rounded-2xl bg-[#FAF0C8]/70 p-5">
            <div className="flex items-center gap-2">
              <FileText size={18} className="text-[#800020]" />
              <h2 className="text-sm font-extrabold text-[#202124]">Need help with an order?</h2>
            </div>
            <p className="mt-2 text-sm leading-6 text-[#686868]">Talk to our team before confirming your purchase.</p>
            <a href="https://wa.me/918962531603" target="_blank" rel="noopener noreferrer" className="mt-4 inline-flex min-h-10 items-center justify-center rounded-xl bg-[#168447] px-4 py-2 text-sm font-bold text-white transition-colors hover:bg-[#106B38]">
              WhatsApp: +91 89625 31603
            </a>
          </div>
        </div>
      </article>
    </main>
  );
}
