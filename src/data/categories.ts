
export interface Category {
  id: string;
  name: string;
  image: string;
  description: string;
  href: string;
}

export const categories: Category[] = [
  {
    id: "rice-grains",
    name: "Rice & Grains",
    image: "/categories/cerels.webp",
    description: "Rice, sugar and daily essentials",
    href: "/shop?category=rice-grains",
  },
  {
    id: "atta-flour",
    name: "Atta & Flour",
    image: "/categories/atta.webp",
    description: "Atta, maida and flour",
    href: "/shop?category=atta-flour",
  },
  {
    id: "pulses-dal",
    name: "Pulses & Dal",
    image: "/categories/cerels.webp",
    description: "Everyday pulses and lentils",
    href: "/shop?category=pulses-dal",
  },
  {
    id: "oil-ghee",
    name: "Oil & Ghee",
    image: "/categories/oil.webp",
    description: "Cooking oils and ghee",
    href: "/shop?category=oil-ghee",
  },
  {
    id: "spices-masala",
    name: "Spices & Masala",
    image: "/categories/practcle.webp",
    description: "Spices and cooking masala",
    href: "/shop?category=spices-masala",
  },
  {
    id: "dairy",
    name: "Dairy Products",
    image: "/categories/dairy.webp",
    description: "Milk and dairy essentials",
    href: "/shop?category=dairy",
  },
  {
    id: "tea-coffee",
    name: "Tea & Coffee",
    image: "/categories/practcle.webp",
    description: "Tea, coffee and beverages",
    href: "/shop?category=tea-coffee",
  },
  {
    id: "personal-care",
    name: "Personal Care",
    image: "/categories/chips.webp",
    description: "Everyday personal care",
    href: "/shop?category=personal-care",
  },
];

export const getCategoryById = (id: string) =>
  categories.find((category) => category.id === id);
