import Link from "next/link";
import { MessageCircle } from "lucide-react";
import { ArrowRight, CalendarDays, FileText, ShieldCheck } from "lucide-react";

const links = [
  { title: "Contact on WhatsApp", description: "Chat with Rashid Mega Mart for help and orders.", href: "https://wa.me/918962531603", icon: MessageCircle },
  { title: "Monthly Grocery Planner", description: "Create and manage your personal grocery kits.", href: "/planner", icon: CalendarDays },
  { title: "Privacy Policy", description: "How customer information is handled.", href: "/privacy-policy", icon: ShieldCheck },
  { title: "Terms & Conditions", description: "Store policies and customer terms.", href: "/terms", icon: FileText },
];

export default function MorePage() {
  return (
    <main className="min-h-[70vh] bg-[#FAF8F5] px-4 py-7 pb-28 sm:py-10">
      <div className="mx-auto max-w-2xl">
        <p className="text-[11px] font-extrabold uppercase tracking-[0.2em] text-[#A83250]">Rashid Mega Mart</p>
        <h1 className="mt-2 text-2xl font-black text-[#24201E]">More</h1>
        <p className="mt-1 text-sm text-[#817A74]">Useful links and customer information.</p>
        <div className="mt-6 space-y-3">
          {links.map(({ title, description, href, icon: Icon }) => (
            <Link key={href} href={href} target={href.startsWith("https://") ? "_blank" : undefined} rel={href.startsWith("https://") ? "noopener noreferrer" : undefined} className="flex min-h-[76px] items-center gap-3 rounded-2xl border border-[#EEE8E1] bg-white p-4 transition hover:border-[#E5D4D9]">
              <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-[#F8E8ED] text-[#A83250]"><Icon size={20} /></span>
              <span className="min-w-0 flex-1"><span className="block text-sm font-extrabold text-[#29231F]">{title}</span><span className="mt-1 block text-xs text-[#817A74]">{description}</span></span>
              <ArrowRight size={17} className="text-[#A83250]" />
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
