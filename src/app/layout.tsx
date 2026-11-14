import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";

import BottomNav from "@/components/BottomNav";
import { CartProvider } from "@/context/CartContext";

import "./globals.css";

const SITE_URL = "https://rashidmegamartv0-1.vercel.app";
const SITE_NAME = "Rashid Mega Mart";

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-plus-jakarta-sans",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),

  title: {
    default: "Rashid Mega Mart | Online Grocery Shopping",
    template: "%s | Rashid Mega Mart",
  },

  description:
    "Shop groceries, daily essentials and affordable grocery kits at Rashid Mega Mart. Order conveniently through WhatsApp and confirm delivery availability with our store.",

  applicationName: SITE_NAME,
  category: "shopping",

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },

  openGraph: {
    type: "website",
    locale: "en_IN",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: "Rashid Mega Mart | Online Grocery Shopping",
    description:
      "Your trusted destination for everyday groceries, daily essentials and affordable grocery kits.",
    images: [
      {
        url: "/images/logo.png",
        width: 512,
        height: 512,
        alt: "Rashid Mega Mart Logo",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Rashid Mega Mart | Online Grocery Shopping",
    description:
      "Shop groceries, daily essentials and affordable grocery kits at Rashid Mega Mart.",
    images: ["/images/logo.png"],
  },

  formatDetection: {
    telephone: false,
    email: false,
    address: false,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#A83250",
};

const structuredData = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: SITE_NAME,
  url: SITE_URL,
  logo: `${SITE_URL}/images/logo.png`,
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+918962531603",
    contactType: "customer service",
    areaServed: "IN",
    availableLanguage: ["English", "Hindi"],
  },
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData).replace(/</g, "\\u003c"),
          }}
        />

        <CartProvider>
          <div className="min-w-0 w-full flex-1 pb-[calc(5.5rem+env(safe-area-inset-bottom))] lg:pb-0">
            {children}
          </div>

          <BottomNav />
        </CartProvider>
      </body>
    </html>
  );
}
