
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
    image: "/images/categories/rice-grains.png",
    description: "Rice, sugar and daily essentials",
    href: "/shop?category=rice-grains",
  },
  {
    id: "atta-flour",
    name: "Atta & Flour",
    image: "/images/categories/atta-flour.png",
    description: "Atta, maida and flour",
    href: "/shop?category=atta-flour",
  },
  {
    id: "pulses-dal",
    name: "Pulses & Dal",
    image: "/images/categories/pulses-dal.png",
    description: "Everyday pulses and lentils",
    href: "/shop?category=pulses-dal",
  },
  {
    id: "oil-ghee",
    name: "Oil & Ghee",
    image: "/images/categories/oil-ghee.png",
    description: "Cooking oils and ghee",
    href: "/shop?category=oil-ghee",
  },
  {
    id: "spices-masala",
    name: "Spices & Masala",
    image: "/images/categories/spices-masala.png",
    description: "Spices and cooking masala",
    href: "/shop?category=spices-masala",
  },
  {
    id: "dairy",
    name: "Dairy Products",
    image: "/images/categories/dairy.png",
    description: "Milk and dairy essentials",
    href: "/shop?category=dairy",
  },
  {
    id: "tea-coffee",
    name: "Tea & Coffee",
    image: "/images/categories/tea-coffee.png",
    description: "Tea, coffee and beverages",
    href: "/shop?category=tea-coffee",
  },
  {
    id: "personal-care",
    name: "Personal Care",
    image: "/images/categories/personal-care.png",
    description: "Everyday personal care",
    href: "/shop?category=personal-care",
  },
];

export const getCategoryById = (id: string) =>
  categories.find((category) => category.id === id);
