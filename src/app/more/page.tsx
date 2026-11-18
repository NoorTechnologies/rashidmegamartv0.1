import Link from "next/link";
import Image from "next/image";
import { RotateCcw } from "lucide-react";
import { ArrowRight, CalendarDays, FileText, ShieldCheck } from "lucide-react";

const links = [
  { title: "Contact on WhatsApp", description: "Chat with Rashid Mega Mart for help and orders.", href: "https://wa.me/918962531603?text=" + encodeURIComponent("Namaste Rashid Mega Mart! Mujhe website par help chahiye. Please guide karein."), whatsapp: true, icon: CalendarDays },
  { title: "Monthly Grocery Planner", description: "Create and manage your personal grocery kits.", href: "/planner", icon: CalendarDays },
  { title: "Returns & Refunds", description: "What to do if an item is damaged, incorrect, or missing.", href: "/returns-refunds", icon: RotateCcw },
  { title: "Privacy Policy", description: "How customer information is handled.", href: "/privacy-policy", icon: ShieldCheck },
  { title: "Terms & Conditions", description: "Store policies and customer terms.", href: "/terms-and-conditions", icon: FileText },
];

export default function MorePage() {
  return (
    <main className="min-h-[70vh] bg-[#FAF8F5] px-4 py-7 pb-28 sm:py-10">
      <div className="mx-auto max-w-2xl">
        <p className="text-[11px] font-extrabold uppercase tracking-[0.2em] text-[#315F35]">Rashid Mega Mart</p>
        <h1 className="mt-2 text-2xl font-black text-[#24201E]">Customer Help & Policies</h1>
        <p className="mt-1 text-sm text-[#817A74]">Important store information, customer support and policies.</p>
        <div className="mt-6 space-y-3">
          {links.map(({ title, description, href, icon: Icon, whatsapp }) => {
            const content = (
              <>
                <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-[#EAF3E6] text-[#315F35]">
                  {whatsapp ? <Image src="/Whatsapp-3d.svg" alt="" width={25} height={25} unoptimized /> : Icon ? <Icon size={20} /> : null}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block text-sm font-extrabold text-[#29231F]">{title}</span>
                  <span className="mt-1 block text-xs text-[#817A74]">{description}</span>
                </span>
                <ArrowRight size={17} className="text-[#315F35]" />
              </>
            );
            return whatsapp ? (
              <a key={href} href={href} target="_blank" rel="noopener noreferrer" className="flex min-h-[76px] items-center gap-3 rounded-2xl border border-[#EEE8E1] bg-white p-4 transition hover:border-[#E5D4D9]">
                {content}
              </a>
            ) : (
              <Link key={href} href={href} className="flex min-h-[76px] items-center gap-3 rounded-2xl border border-[#EEE8E1] bg-white p-4 transition hover:border-[#E5D4D9]">
                {content}
              </Link>
            );
          })}
        </div>
      </div>
    </main>
  );
}
