import Image from "next/image";
import Link from "next/link";
import { MapPin, Phone, Truck, ArrowUpRight, ShoppingBag, ShieldCheck, FileText } from "lucide-react";

const WHATSAPP_NUMBER = "918962531603";
const WHATSAPP_URL = "https://wa.me/" + WHATSAPP_NUMBER;
const STORE_MAP_URL = "https://maps.app.goo.gl/peGoceS36ZfBqKsdA";

const quickLinks = [
  { label: "Home", href: "/" },
  { label: "Grocery Kits", href: "/kits" },
  { label: "My Cart", href: "/cart" },
];

const policyLinks = [
  { label: "Privacy Policy", href: "/privacy-policy", icon: ShieldCheck },
  { label: "Terms & Conditions", href: "/terms-and-conditions", icon: FileText },
];

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-[#168447]/10 bg-[#F8FAF7] text-center text-[#202124]">
      <div className="h-1 bg-gradient-to-r from-[#168447] via-[#F7C928] to-[#168447]" />

      <div className="mx-auto max-w-7xl px-4 pb-5 pt-8 sm:px-6 sm:pb-7 sm:pt-10">
        <div className="grid grid-cols-1 justify-items-center gap-7 sm:grid-cols-2 sm:gap-9 lg:grid-cols-4 lg:gap-10">
          <div className="flex w-full max-w-sm flex-col items-center">
            <Link href="/" aria-label="Rashid Mega Mart Home">
              <Image src="/images/logo2.png" alt="Rashid Mega Mart" width={240} height={90} className="mx-auto h-auto w-[145px] object-contain sm:w-[170px]" />
            </Link>
            <h2 className="mt-3 text-lg font-black leading-tight tracking-tight text-[#168447] sm:text-xl">
              Grocery Kits Made
              <span className="block text-[#A27A2A]">Simple & Fresh.</span>
            </h2>
            <p className="mt-2 max-w-xs text-xs leading-5 text-[#748278] sm:text-sm sm:leading-6">
              Your trusted neighbourhood destination for thoughtfully packed grocery kits and easy ordering.
            </p>
            <div className="mt-3 inline-flex items-center justify-center gap-2 rounded-full border border-[#F7C928]/30 bg-[#FFF5D8]/60 px-3 py-2">
              <ShoppingBag size={14} className="shrink-0 text-[#168447]" />
              <span className="text-[10px] font-bold tracking-wide text-[#168447]">YOUR GROCERY KIT PARTNER</span>
            </div>
          </div>

          <div className="w-full">
            <h3 className="text-xs font-extrabold uppercase tracking-[0.14em] text-[#168447] sm:text-sm">Explore</h3>
            <ul className="mt-3 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 sm:flex-col sm:gap-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-xs text-[#748278] transition-colors hover:text-[#168447] sm:text-sm">{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="w-full">
            <h3 className="text-xs font-extrabold uppercase tracking-[0.14em] text-[#168447] sm:text-sm">Help & Policies</h3>
            <ul className="mt-3 flex flex-wrap items-center justify-center gap-x-4 gap-y-3 sm:flex-col sm:gap-3">
              <li>
                <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="text-xs text-[#748278] transition-colors hover:text-[#168447] sm:text-sm">Contact Us</a>
              </li>
              {policyLinks.map(({ label, href }) => (
                <li key={href}>
                  <Link href={href} className="text-xs text-[#748278] transition-colors hover:text-[#168447] sm:text-sm">{label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="w-full max-w-sm rounded-2xl border border-[#168447]/10 bg-[#FFF5D8]/40 p-4 sm:p-5">
            <h3 className="text-xs font-extrabold uppercase tracking-[0.14em] text-[#168447] sm:text-sm">Visit Our Store</h3>
            <a
              href={STORE_MAP_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Find Rashid Mega Mart on Google Maps"
              className="group mt-3 flex items-center gap-3 rounded-xl border border-[#168447]/20 bg-[#F8FAF7] p-3 text-left transition hover:border-[#168447]/50 hover:shadow-sm"
            >
              <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-[#168447]/10 text-[#168447] transition group-hover:bg-[#168447] group-hover:text-white">
                <MapPin size={21} />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block text-xs font-extrabold text-[#202124]">Find Us on Google Maps</span>
                <span className="mt-1 block text-[10px] text-[#748278]">Open store location & get directions</span>
              </span>
              <ArrowUpRight size={16} className="shrink-0 text-[#168447]" />
            </a>
            <div className="mt-4 flex flex-col items-center gap-1.5">
              <Phone size={17} className="text-[#168447]" />
              <div>
                <p className="text-xs font-bold text-[#202124]">Call / WhatsApp</p>
                <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="mt-1 inline-block text-xs text-[#748278] transition hover:text-[#168447]">+91 89625 31603</a>
              </div>
            </div>
            <div className="mt-3 flex flex-col items-center gap-1.5">
              <Truck size={17} className="text-[#168447]" />
              <div>
                <p className="text-xs font-bold text-[#202124]">Opening Hours</p>
                <p className="mt-1 text-[11px] text-[#748278]">9:00 AM – 9:00 PM</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mx-auto mt-7 flex max-w-3xl flex-col items-center gap-3 rounded-2xl bg-[#168447] p-4 text-center shadow-[0_10px_28px_rgba(22,132,71,0.12)] sm:mt-8 sm:px-6 sm:py-5">
          <div>
            <h3 className="text-sm font-extrabold text-white sm:text-base">Need help with your shopping?</h3>
            <p className="mt-1 text-[11px] text-white/75 sm:text-xs">Connect with our team on WhatsApp.</p>
          </div>
          <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="inline-flex min-h-10 w-full max-w-[220px] items-center justify-center gap-2 rounded-xl bg-white px-4 py-2.5 text-xs font-extrabold text-[#168447] transition hover:bg-[#FFF5D8] active:scale-[0.98] sm:min-h-11 sm:w-auto sm:px-5 sm:py-3 sm:text-sm">
            <Image src="/Whatsapp-3d.svg" alt="" width={23} height={23} unoptimized className="size-5 object-contain" />
            Chat With Us
            <ArrowUpRight size={16} />
          </a>
        </div>

        <div className="mt-6 flex flex-col items-center justify-center gap-2 border-t border-[#168447]/10 pt-4 text-center sm:mt-7 sm:pt-5">
          <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2">
            {policyLinks.map(({ label, href }) => (
              <Link key={href} href={href} className="text-[10px] font-semibold text-[#748278] transition-colors hover:text-[#168447] sm:text-xs">{label}</Link>
            ))}
          </div>
          <p className="text-[10px] text-[#748278] sm:text-xs">© {new Date().getFullYear()} Rashid Mega Mart. All rights reserved.</p>
          <span className="text-[10px] font-semibold text-[#A27A2A]">Made for your everyday needs</span>
          <span className="text-[10px] font-medium text-[#8A968D]">Created with heart by Noor Technologies</span>
        </div>
      </div>
    </footer>
  );
}
