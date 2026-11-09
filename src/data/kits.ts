
export interface GroceryKit {
  id: string;
  name: string;
  subtitle: string;
  category: string;
  image: string;
  price: number;
  oldPrice?: number;
  discount?: string;
  items: string[];
  description: string;
  isFeatured?: boolean;
  isAvailable: boolean;
}

export const kits: GroceryKit[] = [
  {
    id: "daily-essentials",
    name: "Daily Essentials Kit",
    subtitle: "Roz ke ghar ke zaroori samaan",
    category: "Daily Essentials",
    image: "/images/kits/daily-essentials.png",
    price: 599,
    oldPrice: 699,
    discount: "14% OFF",
    items: [
      "Rice - 1 kg",
      "Atta - 1 kg",
      "Sugar - 1 kg",
      "Cooking Oil - 1 L",
      "Salt - 1 pack",
    ],
    description:
      "Daily kitchen essentials ek convenient combo mein.",
    isFeatured: true,
    isAvailable: true,
  },
  {
    id: "family-grocery",
    name: "Family Grocery Kit",
    subtitle: "Family ke liye useful grocery combo",
    category: "Family Packs",
    image: "/images/kits/family-grocery.png",
    price: 1199,
    oldPrice: 1399,
    discount: "14% OFF",
    items: [
      "Rice - 5 kg",
      "Atta - 5 kg",
      "Sugar - 2 kg",
      "Cooking Oil - 2 L",
      "Toor Dal - 1 kg",
      "Salt - 1 kg",
    ],
    description:
      "Ghar ki regular grocery shopping ke liye family combo.",
    isFeatured: true,
    isAvailable: true,
  },
  {
    id: "monthly-grocery",
    name: "Monthly Grocery Kit",
    subtitle: "Monthly kitchen essentials",
    category: "Monthly Packs",
    image: "/images/kits/monthly-grocery.png",
    price: 2499,
    oldPrice: 2899,
    discount: "14% OFF",
    items: [
      "Rice - 10 kg",
      "Atta - 10 kg",
      "Sugar - 3 kg",
      "Cooking Oil - 5 L",
      "Toor Dal - 2 kg",
      "Tea - 500 g",
      "Salt - 2 kg",
    ],
    description:
      "Monthly household grocery ke liye sample combo package.",
    isFeatured: true,
    isAvailable: true,
  },
  {
    id: "basic-kitchen",
    name: "Basic Kitchen Kit",
    subtitle: "Kitchen ki basic zarooratein",
    category: "Kitchen Essentials",
    image: "/images/kits/basic-kitchen.png",
    price: 399,
    oldPrice: 449,
    discount: "11% OFF",
    items: [
      "Rice - 1 kg",
      "Toor Dal - 1 kg",
      "Sugar - 1 kg",
      "Salt - 1 kg",
    ],
    description:
      "Basic kitchen essentials ka affordable sample combo.",
    isAvailable: true,
  },
];

export const getFeaturedKits = () =>
  kits.filter((kit) => kit.isFeatured && kit.isAvailable);

export const getKitById = (id: string) =>
  kits.find((kit) => kit.id === id);
