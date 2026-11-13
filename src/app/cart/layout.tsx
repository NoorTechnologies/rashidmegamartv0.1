
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Shopping Cart",
  description: "Review your selected grocery items at Rashid Mega Mart.",

  robots: {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false,
    },
  },
};

export default function CartLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
