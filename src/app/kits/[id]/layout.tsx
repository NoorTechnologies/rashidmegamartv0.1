
import type { Metadata } from "next";
import { getKitById } from "@/data/kits";

interface KitLayoutProps {
  children: React.ReactNode;
  params: Promise<{ id: string }>;
}

export async function generateMetadata({
  params,
}: KitLayoutProps): Promise<Metadata> {
  const { id } = await params;
  const kit = getKitById(id);

  if (!kit) {
    return {
      title: "Grocery Kit Not Found",
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  const title = `${kit.name} - Grocery Kit`;
  const description = `${kit.description} Explore ${kit.items.length} included items at Rashid Mega Mart for ₹${kit.price.toLocaleString("en-IN")}.`;

  return {
    title,
    description,

    alternates: {
      canonical: `/kits/${encodeURIComponent(kit.id)}`,
    },

    robots: {
      index: kit.isAvailable,
      follow: true,
    },

    openGraph: {
      title: `${title} | Rashid Mega Mart`,
      description,
      url: `/kits/${encodeURIComponent(kit.id)}`,
      type: "website",
      images: [
        {
          url: kit.image,
          alt: kit.name,
        },
      ],
    },

    twitter: {
      card: "summary_large_image",
      title: `${title} | Rashid Mega Mart`,
      description,
      images: [kit.image],
    },
  };
}

export default function KitDetailLayout({
  children,
}: KitLayoutProps) {
  return children;
}
