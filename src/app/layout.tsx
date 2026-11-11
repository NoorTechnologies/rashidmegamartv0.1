
import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";

import BottomNav from "@/components/BottomNav";
import Footer from "@/components/Footer";
import { CartProvider } from "@/context/CartContext";

import "./globals.css";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta-sans",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://rashid-mega-mart.vercel.app"),

  title: {
    default: "Rashid Mega Mart | Online Grocery Shopping",
    template: "%s | Rashid Mega Mart",
  },

  description:
    "Shop groceries, daily essentials and affordable grocery kits at Rashid Mega Mart. Easy WhatsApp ordering with free home delivery up to 5 KM.",

  applicationName: "Rashid Mega Mart",

  robots: {
    index: true,
    follow: true,
  },

  openGraph: {
    title: "Rashid Mega Mart",
    description:
      "Your trusted destination for everyday groceries and essentials.",
    siteName: "Rashid Mega Mart",
    type: "website",
    locale: "en_IN",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#075C2B",
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({
  children,
}: Readonly<RootLayoutProps>) {
  return (
    <html lang="en-IN" className={plusJakartaSans.variable}>
      <body className="flex min-h-dvh flex-col antialiased">
        <CartProvider>
          <main className="min-w-0 w-full flex-1 pb-[calc(5.5rem+env(safe-area-inset-bottom))] lg:pb-0">
            {children}
          </main>

          <div className="pb-[calc(5.5rem+env(safe-area-inset-bottom))] lg:pb-0">
            <Footer />
          </div>

          <BottomNav />
        </CartProvider>
      </body>
    </html>
  );
}
