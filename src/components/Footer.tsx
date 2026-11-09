
import Image from "next/image";
import Link from "next/link";
import {
  MapPin,
  Phone,
  Clock,
  Truck,
  ShieldCheck,
  Headset,
  ArrowUpRight,
} from "lucide-react";

const WHATSAPP_NUMBER = "918962531603";

const footerLinks = [
  { label: "Home", href: "/" },
  { label: "Shop", href: "/shop" },
  { label: "Grocery Kits", href: "/kits" },
  { label: "Cart", href: "/cart" },
];

const services = [
  { icon: Truck, title: "Free Delivery", description: "Within 5 KM" },
  { icon: ShieldCheck, title: "Trusted Quality", description: "Fresh & Genuine" },
  { icon: Headset, title: "Customer Support", description: "Here to Help" },
];

export default function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-green-100 bg-[#F7F8F3] text-[#202B24]">
      <div className="h-1.5 bg-gradient-to-r from-[#075C2B] via-[#F7C928] to-[#168447]" />

      <div className="mx-auto max-w-7xl px-3 pb-8 pt-8 sm:px-6 sm:pb-12 sm:pt-10 lg:px-12">
        <div className="grid min-w-0 gap-8 lg:grid-cols-2 lg:gap-16">
          <div className="min-w-0 text-center lg:text-left">
            <Link href="/" aria-label="Rashid Mega Mart Home" className="inline-block">
              <Image
                src="/images/logo.png"
                alt="Rashid Mega Mart"
                width={350}
                height={120}
                sizes="(max-width: 639px) 190px, 260px"
                className="mx-auto h-auto w-[190px] object-contain sm:w-[260px] lg:mx-0"
              />
            </Link>

            <h2 className="mt-4 text-xl font-extrabold leading-tight text-[#075C2B] min-[375px]:text-2xl sm:mt-5 sm:text-3xl">
              Your Neighbourhood
              <span className="block text-[#DCA900]">Grocery Store</span>
            </h2>

            <div className="mx-auto mt-3 h-1.5 w-16 rounded-full bg-[#F7C928] lg:mx-0" />

            <p className="mx-auto mt-3 max-w-md text-xs leading-6 text-gray-600 sm:mt-4 sm:text-sm sm:leading-7 lg:mx-0">
              Your everyday groceries and essentials, all in one
              convenient place. Quality products, great prices
              and friendly neighbourhood service.
            </p>

            <nav
              aria-label="Footer navigation"
              className="mt-6 flex flex-wrap justify-center gap-x-4 gap-y-3 sm:gap-x-6 lg:justify-start"
            >
              {footerLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-xs font-semibold text-[#075C2B] transition hover:text-[#DCA900] sm:text-sm"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          <div className="grid min-w-0 grid-cols-1 gap-3 min-[420px]:grid-cols-2 sm:gap-4">
            <div className="flex min-w-0 items-center gap-3 rounded-xl border border-green-100 bg-white p-3 shadow-sm sm:gap-4 sm:rounded-2xl sm:p-4">
              <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-green-50 text-[#168447] sm:size-12">
                <MapPin size={23} />
              </div>
              <div className="min-w-0">
                <h3 className="text-sm font-bold text-[#075C2B]">Our Store</h3>
                <p className="mt-1 text-[11px] leading-4 text-gray-500 sm:text-xs">
                  Store address pending
                </p>
              </div>
            </div>

            <a
              href={`https://wa.me/${WHATSAPP_NUMBER}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex min-w-0 items-center gap-3 rounded-xl border border-green-100 bg-white p-3 shadow-sm transition hover:border-green-300 sm:gap-4 sm:rounded-2xl sm:p-4"
            >
              <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-green-50 text-[#168447] sm:size-12">
                <Phone size={22} />
              </div>
              <div className="min-w-0">
                <h3 className="text-sm font-bold text-[#075C2B]">Call / WhatsApp</h3>
                <p className="mt-1 break-all text-[11px] leading-4 text-gray-500 sm:text-xs">
                  +91 89625 31603
                </p>
              </div>
            </a>

            <div className="flex min-w-0 items-center gap-3 rounded-xl border border-green-100 bg-white p-3 shadow-sm sm:gap-4 sm:rounded-2xl sm:p-4">
              <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-green-50 text-[#168447] sm:size-12">
                <Clock size={23} />
              </div>
              <div className="min-w-0">
                <h3 className="text-sm font-bold text-[#075C2B]">Store Hours</h3>
                <p className="mt-1 text-[11px] leading-4 text-gray-500 sm:text-xs">
                  9:00 AM – 9:00 PM
                </p>
              </div>
            </div>

            <div className="flex min-w-0 items-center gap-3 rounded-xl border border-green-100 bg-white p-3 shadow-sm sm:gap-4 sm:rounded-2xl sm:p-4">
              <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-green-50 text-[#168447] sm:size-12">
                <Truck size={23} />
              </div>
              <div className="min-w-0">
                <h3 className="text-sm font-bold text-[#075C2B]">Free Delivery</h3>
                <p className="mt-1 text-[11px] leading-4 text-gray-500 sm:text-xs">
                  Within 5 KM
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-7 grid grid-cols-1 gap-3 rounded-xl border border-green-100 bg-white p-3 shadow-sm min-[420px]:grid-cols-3 min-[420px]:divide-x min-[420px]:divide-green-100 min-[420px]:gap-0 sm:mt-10 sm:rounded-2xl sm:py-5">
          {services.map((service) => {
            const Icon = service.icon;

            return (
              <div
                key={service.title}
                className="flex items-center gap-3 rounded-lg px-2 py-2 min-[420px]:flex-col min-[420px]:gap-2 min-[420px]:text-center sm:min-[420px]:flex-row sm:min-[420px]:justify-center sm:min-[420px]:gap-3"
              >
                <Icon className="size-6 shrink-0 text-[#168447] sm:size-8" />

                <div className="min-w-0 min-[420px]:text-center sm:min-[420px]:text-left">
                  <h3 className="text-xs font-extrabold text-[#075C2B] sm:text-sm">
                    {service.title}
                  </h3>
                  <p className="mt-0.5 text-[10px] text-gray-500 sm:text-xs">
                    {service.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        <a
          href={`https://wa.me/${WHATSAPP_NUMBER}`}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Contact Rashid Mega Mart on WhatsApp"
          className="mx-auto mt-6 flex min-h-12 w-full max-w-sm items-center justify-center gap-2.5 rounded-full bg-[#075C2B] px-4 py-3 text-xs font-bold text-white shadow-md transition hover:bg-[#168447] active:scale-[0.98] sm:mt-8 sm:gap-3 sm:px-6 sm:py-3.5 sm:text-sm"
        >
          <Image
            src="/Whatsapp-3d.svg"
            alt=""
            width={30}
            height={30}
            unoptimized
            className="size-7 object-contain sm:size-8"
          />
          Contact Us on WhatsApp
          <ArrowUpRight size={17} />
        </a>

        <div className="mt-7 border-t border-green-100 pt-5 text-center sm:mt-9 sm:pt-6">
          <p className="text-[10px] text-gray-500 sm:text-xs">
            © {new Date().getFullYear()} Rashid Mega Mart. All rights reserved.
          </p>
          <p className="mt-2 text-[9px] font-semibold tracking-widest text-[#168447] sm:text-[10px]">
            YOUR EVERYDAY GROCERY PARTNER
          </p>
        </div>
      </div>
    </footer>
  );
}
