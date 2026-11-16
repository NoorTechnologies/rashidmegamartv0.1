/** Shared image fallbacks for catalogue items without uploaded product photos. */
export function getGroceryItemImageFallback(itemName: string): string {
  const value = itemName.toLowerCase();
  if (/atta|flour|wheat|maida|besan|suji/.test(value)) return "/categories/atta.webp";
  if (/oil|ghee/.test(value)) return "/categories/oil.webp";
  if (/dal|pulse|chana|rajma|beans|rice|poha/.test(value)) return "/categories/cerels.webp";
  if (/milk|dairy|paneer|curd|butter/.test(value)) return "/categories/dairy.webp";
  if (/soap|shampoo|detergent|clean|personal|toothpaste/.test(value)) return "/categories/chips.webp";
  if (/spice|masala|turmeric|haldi|chilli|chili|mirch|cumin|jeera|salt|tea|coffee/.test(value)) return "/categories/practcle.webp";
  return "/categories/cerels.webp";
}

export const KIT_IMAGE_FALLBACK = "/hero.png";
