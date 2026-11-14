import Image from "next/image";
import Link from "next/link";
import { MapPin, Phone, Clock, ArrowUpRight, ShoppingBag } from "lucide-react";

const WHATSAPP_NUMBER = "918962531603";
const WHATSAPP_URL = "https://wa.me/" + WHATSAPP_NUMBER;

const quickLinks = [
  { label: "Home", href: "/" },
  { label: "Shop All", href: "/shop" },
  { label: "Grocery Kits", href: "/kits" },
  { label: "My Cart", href: "/cart" },
];

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-[#A83250]/10 bg-[#FFFDF8] text-center text-[#30251F]">
      <div className="h-1 bg-gradient-to-r from-[#A83250] via-[#D4A84F] to-[#A83250]" />

      <div className="mx-auto max-w-7xl px-4 pb-5 pt-8 sm:px-6 sm:pb-7 sm:pt-10">
        <div className="grid grid-cols-1 justify-items-center gap-7 sm:grid-cols-2 sm:gap-9 lg:grid-cols-4 lg:gap-10">
          <div className="flex w-full max-w-sm flex-col items-center">
            <Link href="/" aria-label="Rashid Mega Mart Home">
              <Image src="/images/logo.png" alt="Rashid Mega Mart" width={240} height={90} className="mx-auto h-auto w-[145px] object-contain sm:w-[170px]" />
            </Link>
            <h2 className="mt-3 text-lg font-black leading-tight tracking-tight text-[#A83250] sm:text-xl">
              Groceries Made
              <span className="block text-[#A47A2C]">Simple & Fresh.</span>
            </h2>
            <p className="mt-2 max-w-xs text-xs leading-5 text-[#76665C] sm:text-sm sm:leading-6">
              Your trusted neighbourhood destination for everyday groceries,
              household essentials and family shopping.
            </p>
            <div className="mt-3 inline-flex items-center justify-center gap-2 rounded-full border border-[#D4A84F]/30 bg-[#FFF9D8]/60 px-3 py-2">
              <ShoppingBag size={14} className="shrink-0 text-[#A83250]" />
              <span className="text-[10px] font-bold tracking-wide text-[#A83250]">YOUR EVERYDAY GROCERY PARTNER</span>
            </div>
          </div>

          <div className="w-full">
            <h3 className="text-xs font-extrabold uppercase tracking-[0.14em] text-[#A83250] sm:text-sm">Explore</h3>
            <ul className="mt-3 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 sm:flex-col sm:gap-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-xs text-[#76665C] transition-colors hover:text-[#A83250] sm:text-sm">{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="w-full">
            <h3 className="text-xs font-extrabold uppercase tracking-[0.14em] text-[#A83250] sm:text-sm">Information</h3>
            <ul className="mt-3 flex items-center justify-center">
              <li>
                <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="text-xs text-[#76665C] transition-colors hover:text-[#A83250] sm:text-sm">Contact Us</a>
              </li>
            </ul>
          </div>

          <div className="w-full max-w-sm rounded-2xl border border-[#A83250]/10 bg-[#FFF9D8]/40 p-4 sm:p-5">
            <h3 className="text-xs font-extrabold uppercase tracking-[0.14em] text-[#A83250] sm:text-sm">Visit Our Store</h3>
            <div className="mt-4 space-y-3">
              <div className="flex flex-col items-center gap-1.5">
                <MapPin size={17} className="text-[#A83250]" />
                <div>
                  <p className="text-xs font-bold text-[#30251F]">Store Location</p>
                  <p className="mt-1 text-[11px] leading-5 text-[#76665C]">Address to be updated</p>
                </div>
              </div>
              <div className="flex flex-col items-center gap-1.5">
                <Phone size={17} className="text-[#A83250]" />
                <div>
                  <p className="text-xs font-bold text-[#30251F]">Call / WhatsApp</p>
                  <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="mt-1 inline-block text-xs text-[#76665C] transition hover:text-[#138047]">+91 89625 31603</a>
                </div>
              </div>
              <div className="flex flex-col items-center gap-1.5">
                <Clock size={17} className="text-[#A83250]" />
                <div>
                  <p className="text-xs font-bold text-[#30251F]">Opening Hours</p>
                  <p className="mt-1 text-[11px] text-[#76665C]">9:00 AM – 9:00 PM</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mx-auto mt-7 flex max-w-3xl flex-col items-center gap-3 rounded-2xl bg-[#A83250] p-4 text-center shadow-[0_10px_28px_rgba(168,50,80,0.14)] sm:mt-8 sm:px-6 sm:py-5">
          <div>
            <h3 className="text-sm font-extrabold text-white sm:text-base">Need help with your shopping?</h3>
            <p className="mt-1 text-[11px] text-white/75 sm:text-xs">Connect with our team on WhatsApp.</p>
          </div>
          <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-10 w-full max-w-[220px] items-center justify-center gap-2 rounded-xl bg-white px-4 py-2.5 text-xs font-extrabold text-[#A83250] transition hover:bg-[#FFF9D8] active:scale-[0.98] sm:min-h-11 sm:w-auto sm:px-5 sm:py-3 sm:text-sm">
            <Image src="/Whatsapp-3d.svg" alt="" width={23} height={23} unoptimized className="size-5 object-contain" />
            Chat With Us
            <ArrowUpRight size={16} />
          </a>
        </div>

        <div className="mt-6 flex flex-col items-center justify-center gap-2 border-t border-[#A83250]/10 pt-4 text-center sm:mt-7 sm:pt-5">
          <p className="text-[10px] text-[#76665C] sm:text-xs">© {new Date().getFullYear()} Rashid Mega Mart. All rights reserved.</p>
          <span className="text-[10px] font-semibold text-[#A47A2C]">Made for your everyday needs</span>
        </div>
      </div>
    </footer>
  );
}
