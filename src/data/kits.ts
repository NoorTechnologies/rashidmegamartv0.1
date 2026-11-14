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

// Real grocery kits will be loaded from the database in the backend phase.
export const kits: GroceryKit[] = [];

export const getFeaturedKits = () =>
  kits.filter((kit) => kit.isFeatured && kit.isAvailable);

export const getKitById = (id: string) =>
  kits.find((kit) => kit.id === id);
