
export interface Product {
  id: string;
  name: string;
  brand: string;
  category: string;
  packSize: string;
  price: number;
  oldPrice?: number;
  image: string;
  description: string;
  isFeatured?: boolean;
  isBestSeller?: boolean;
  isAvailable: boolean;
}

export const products: Product[] = [
  {
    id: "rice-001",
    name: "Premium Basmati Rice",
    brand: "Sample Brand",
    category: "Rice & Grains",
    packSize: "5 kg",
    price: 450,
    oldPrice: 520,
    image: "/images/products/basmati-rice.png",
    description: "Premium quality long-grain basmati rice.",
    isFeatured: true,
    isBestSeller: true,
    isAvailable: true,
  },
  {
    id: "atta-001",
    name: "Whole Wheat Atta",
    brand: "Sample Brand",
    category: "Atta & Flour",
    packSize: "5 kg",
    price: 230,
    oldPrice: 260,
    image: "/images/products/wheat-atta.png",
    description: "Fresh whole wheat flour for everyday meals.",
    isFeatured: true,
    isAvailable: true,
  },
  {
    id: "oil-001",
    name: "Refined Cooking Oil",
    brand: "Sample Brand",
    category: "Oil & Ghee",
    packSize: "1 L",
    price: 145,
    oldPrice: 165,
    image: "/images/products/cooking-oil.png",
    description: "Quality refined cooking oil.",
    isBestSeller: true,
    isAvailable: true,
  },
  {
    id: "sugar-001",
    name: "Premium White Sugar",
    brand: "Sample Brand",
    category: "Rice & Grains",
    packSize: "1 kg",
    price: 48,
    image: "/images/products/sugar.png",
    description: "Everyday household white sugar.",
    isAvailable: true,
  },
  {
    id: "dal-001",
    name: "Premium Toor Dal",
    brand: "Sample Brand",
    category: "Pulses & Dal",
    packSize: "1 kg",
    price: 125,
    oldPrice: 140,
    image: "/images/products/toor-dal.png",
    description: "Quality toor dal for daily cooking.",
    isFeatured: true,
    isAvailable: true,
  },
  {
    id: "tea-001",
    name: "Premium Tea",
    brand: "Sample Brand",
    category: "Tea & Coffee",
    packSize: "500 g",
    price: 220,
    oldPrice: 245,
    image: "/images/products/tea.png",
    description: "Rich taste and refreshing aroma.",
    isBestSeller: true,
    isAvailable: true,
  },
  {
    id: "salt-001",
    name: "Iodized Salt",
    brand: "Sample Brand",
    category: "Spices & Masala",
    packSize: "1 kg",
    price: 25,
    image: "/images/products/salt.png",
    description: "Everyday iodized cooking salt.",
    isAvailable: true,
  },
  {
    id: "soap-001",
    name: "Bathing Soap",
    brand: "Sample Brand",
    category: "Personal Care",
    packSize: "100 g",
    price: 38,
    oldPrice: 45,
    image: "/images/products/soap.png",
    description: "Daily personal care bathing soap.",
    isAvailable: true,
  },
];

export const getProductById = (id: string) =>
  products.find((product) => product.id === id);

export const getFeaturedProducts = () =>
  products.filter((product) => product.isFeatured && product.isAvailable);

export const getBestSellingProducts = () =>
  products.filter((product) => product.isBestSeller && product.isAvailable);
