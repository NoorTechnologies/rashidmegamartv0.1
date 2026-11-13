
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Affordable Grocery Kits",
  description:
    "Explore affordable grocery kits at Rashid Mega Mart. Find useful everyday grocery combos and order conveniently through WhatsApp.",

  alternates: {
    canonical: "/kits",
  },

  openGraph: {
    title: "Affordable Grocery Kits | Rashid Mega Mart",
    description:
      "Discover affordable grocery kits and everyday essentials at Rashid Mega Mart.",
    url: "/kits",
    type: "website",
    images: [
      {
        url: "/images/rmmk.png",
        alt: "Rashid Mega Mart Grocery Kits",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    title: "Affordable Grocery Kits | Rashid Mega Mart",
    description:
      "Explore affordable grocery kits at Rashid Mega Mart.",
    images: ["/images/rmmk.png"],
  },
};

export default function KitsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
