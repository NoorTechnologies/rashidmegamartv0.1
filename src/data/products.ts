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
  stock?: number;
}

// Real products will be loaded from the database in the backend phase.
export const products: Product[] = [];

export const getProductById = (id: string) =>
  products.find((product) => product.id === id);

export const getFeaturedProducts = () =>
  products.filter((product) => product.isFeatured && product.isAvailable);

export const getBestSellingProducts = () =>
  products.filter((product) => product.isBestSeller && product.isAvailable);
