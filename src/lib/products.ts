// Category placeholder images (used when a product has no photo yet)
import jerseyFront from "@/assets/jersey-front.jpg";
import jerseyBack from "@/assets/jersey-back.jpg";
import shortsFront from "@/assets/shorts-front.jpg";
import shortsBack from "@/assets/shorts-back.jpg";
import hatFront from "@/assets/hat-front.jpg";
import hatBack from "@/assets/hat-back.jpg";
import hoodieFront from "@/assets/hoodie-front.jpg";
import hoodieBack from "@/assets/hoodie-back.jpg";
import pantsFront from "@/assets/pants-front.jpg";
import pantsBack from "@/assets/pants-back.jpg";

// Jersey photos — real image files bundled with the site.
// NOTE: the old *.asset.json imports were Lovable-hosted pointers whose
// "/__l5e/assets-v1/..." URLs only resolve on Lovable, so they 404 on
// Cloudflare and in local dev. Always import actual image files here.
import manuRedFront from "@/assets/manured.png";
import manuRedBack from "@/assets/manuredblack.webp";
import manuBlackFront from "@/assets/manublack.png";
import manuBlackBack from "@/assets/manublackback.webp";
import pinkBarcaFront from "@/assets/pinkbarca.webp";
import pinkBarcaBack from "@/assets/BarcaPinkBack.png";
import santosFront from "@/assets/Santos.png";
import santosBack from "@/assets/SantosBack.png";
import brazil2002Front from "@/assets/Brazil2002.png";
import brazil2002Back from "@/assets/Brazil2002back.png";
import brazilEmeraldFront from "@/assets/BrazilEmerald.png";
import brazilEmeraldBack from "@/assets/EmerladBack.png";
import acMilanFront from "@/assets/AcMilan.png";
import acMilanBack from "@/assets/Milanback.png";
import barcaJackFront from "@/assets/BarcaJack.webp";
import barcaJackBack from "@/assets/barcajackback.webp";
import portugal2026Front from "@/assets/portugal2026.webp";
import portugal2026Back from "@/assets/portugal2026back.webp";
import portugalSuiFront from "@/assets/jPortugal2026.webp";
import versaceFront from "@/assets/Versace.webp";
import versaceBack from "@/assets/Versaceback.webp";
import madridPinkFront from "@/assets/MadridPink.png";
import madridPinkBack from "@/assets/PinkMadridBack.png";
import interSnakeFront from "@/assets/InterSnake.png";
import interSnakeBack from "@/assets/intersnakeback.webp";
import itachiFront from "@/assets/Itachi.png";
import itachiBack from "@/assets/ItachiBack.png";
import japanPoloFront from "@/assets/JapanPolo.png";
import madridGreenFront from "@/assets/MadridGreen.png";
import madridGreenBack from "@/assets/MadridGreenBack.png";
import psgFront from "@/assets/Psg.png";
import psgBack from "@/assets/PsgBack.png";
import miamiBapeFront from "@/assets/MiamiBape.png";
import miamiBapeBack from "@/assets/miamibapeback.png";
import blackoutBrazilFront from "@/assets/BlackoutBrazil.png";
import ajaxFront from "@/assets/Ajax.png";
import ajaxBack from "@/assets/Ajaxback.png";

type ImagePair = { front: string; back: string };

const JERSEY_IMAGES_BY_NAME: Record<string, ImagePair> = {
  "Manchester United Retro Red": { front: manuRedFront, back: manuRedBack },
  "Barcelona Pink Jersey": { front: pinkBarcaFront, back: pinkBarcaBack },
  "Santos 2012 Jersey": { front: santosFront, back: santosBack },
  "Brazil 2002 Retro": { front: brazil2002Front, back: brazil2002Back },
  "Brazil Emerald Nights": { front: brazilEmeraldFront, back: brazilEmeraldBack },
  "AC Milan Retro": { front: acMilanFront, back: acMilanBack },
  "Barcelona Cactus Jack": { front: barcaJackFront, back: barcaJackBack },
  "Portugal 2026 Away": { front: portugal2026Front, back: portugal2026Back },
  "Italy Vercace Black": { front: versaceFront, back: versaceBack },
  "Real Madrid Pink Dragon": { front: madridPinkFront, back: madridPinkBack },
  "Inter Milan Black Snake": { front: interSnakeFront, back: interSnakeBack },
  "Japan Itachi Kit": { front: itachiFront, back: itachiBack },
  "Japan Polo Kit": { front: japanPoloFront, back: japanPoloFront }, // no back photo yet
  "Madrid Green Dragon": { front: madridGreenFront, back: madridGreenBack },
  "Paris Saint Gemain Nior": { front: psgFront, back: psgBack },
  "Inter Miami Bape": { front: miamiBapeFront, back: miamiBapeBack },
  "Brazil Blakcout": { front: blackoutBrazilFront, back: blackoutBrazilFront }, // no back photo yet
  "Ajax Staryy Night": { front: ajaxFront, back: ajaxBack },
  "Portugal SUI Jersey": { front: portugalSuiFront, back: portugalSuiFront }, // no back photo yet
};

// Shorts / pants / hoodies / accessories photos are NOT in the repo yet — the
// originals still live on Lovable. Drop the files into src/assets, import them
// above, and add entries here keyed by product name. Anything missing falls
// back to the category placeholder image.
const SHORTS_IMAGES_BY_NAME: Record<string, ImagePair> = {};
const PANTS_IMAGES_BY_NAME: Record<string, ImagePair> = {};
const HOODIES_IMAGES_BY_NAME: Record<string, ImagePair> = {};
const ACCESSORIES_IMAGES_BY_NAME: Record<string, ImagePair> = {};

const IMAGES_BY_CATEGORY: Record<Category, Record<string, ImagePair>> = {
  jerseys: JERSEY_IMAGES_BY_NAME,
  shorts: SHORTS_IMAGES_BY_NAME,
  accessories: ACCESSORIES_IMAGES_BY_NAME,
  hoodies: HOODIES_IMAGES_BY_NAME,
  pants: PANTS_IMAGES_BY_NAME,
};

export type Category = "jerseys" | "shorts" | "accessories" | "hoodies" | "pants";

export interface Product {
  id: string;
  name: string;
  category: Category;
  price: number;
  front: string;
  back: string;
}


const CATEGORY_IMAGES: Record<Category, { front: string; back: string }> = {
  jerseys: { front: jerseyFront, back: jerseyBack },
  shorts: { front: shortsFront, back: shortsBack },
  accessories: { front: hatFront, back: hatBack },
  hoodies: { front: hoodieFront, back: hoodieBack },
  pants: { front: pantsFront, back: pantsBack },
};

const NAMES: Record<Category, string[]> = {
  jerseys: [
    "Phantom Home Kit",
    "Barcelona Pink Jersey", "Santos 2012 Jersey", "Brazil 2002 Retro", "Brazil Emerald Nights", "AC Milan Retro",
    "Barcelona Cactus Jack", "Portugal 2026 Away", "Italy Vercace Black", "Real Madrid Pink Dragon", "Inter Milan Black Snake",
    "Japan Itachi Kit", "Japan Polo Kit", "Madrid Green Dragon", "Paris Saint Gemain Nior", "Inter Miami Bape",
    "Brazil Blakcout", "Ajax Staryy Night", "Portugal SUI Jersey",
  ],
  shorts: ["Island Shorts Grey", "Island Shorts Pink", "Essential Shorts Black", "Essential Shorts Grey", "Essential Shorts Light", "Denim Shorts Black", "Denim Shorts Grey", "Checkered Shorts", "Essentials Shorts Coral", "Denim Shorts Navy Blue"],
  accessories: ["Elite Backpack Black", "Elite Backpack Pink", "S Backpack Black", "Mono Cap Pink", "Island Cap Black", "Island Cap Blue", "Island Cap Green", "LV Beanie Grey", "LV Beanie Black", "Island Cap Pink"],
  hoodies: ["Essential Hoodie Black", "Essential Hoodie Grey", "Essential Hoodie Light", "S Hoodie Grey", "S Hoodie Black", "AL Hoodie Black", "AL Hoodie Grey", "AL Hoodie Navy Blue", "1997 Black Hoodie", "1997 Grey Hoodie"],
  pants: ["Essential Pants Black", "Essential Pants Grey", "Essential Pants Light", "S Pants Grey", "S Pants Black", "AL Pants Black", "AL Pants Grey", "AL Pants Navy Blue", "1997 Pants Black", "1997 Pants Grey"],
};

const PRICES: Record<Category, number[]> = {
  jerseys: [35, 35, 35, 35, 35, 35, 35, 35, 35, 35, 35, 35, 35, 35, 35, 35, 35, 35, 35],
  shorts: [40, 40, 40, 40, 40, 40, 40, 40, 40, 40],
  accessories: [40, 40, 40, 20, 20, 20, 20, 20, 20, 20],
  hoodies: [40, 40, 40, 40, 40, 40, 40, 40, 40, 40],
  pants: [40, 40, 40, 40, 40, 40, 40, 40, 40, 40],
};




const generatedProducts: Product[] = (
  ["jerseys", "shorts", "accessories", "hoodies", "pants"] as Category[]
).flatMap((cat) =>
  NAMES[cat].map((name, i) => ({
    id: `${cat}-${i + 1}`,
    name,
    category: cat,
    price: PRICES[cat][i],
    front: CATEGORY_IMAGES[cat].front,
    back: CATEGORY_IMAGES[cat].back,
  })),
);

export const PRODUCTS: Product[] = [
  ...generatedProducts.map((p) => {
    const name = p.id === "jerseys-1" ? "Manchester United Retro Red" : p.name;
    const img = IMAGES_BY_CATEGORY[p.category][name];
    return img ? { ...p, name, front: img.front, back: img.back } : { ...p, name };
  }),

  {
    id: "jerseys-manchester-united-retro-black",
    name: "Manchester United Retro Black",
    category: "jerseys",
    price: 35,
    front: manuBlackFront,
    back: manuBlackBack,
  },
];


export const BEST_SELLERS: Product[] = [
  PRODUCTS.find((p) => p.id === "jerseys-1")!,
  PRODUCTS.find((p) => p.id === "hoodies-1")!,
  PRODUCTS.find((p) => p.id === "accessories-1")!,
  PRODUCTS.find((p) => p.id === "pants-1")!,
];

export const CATEGORIES: { slug: Category; label: string }[] = [
  { slug: "jerseys", label: "Jerseys" },
  { slug: "shorts", label: "Shorts" },
  { slug: "accessories", label: "Accessories" },
  { slug: "hoodies", label: "Hoodies" },
  { slug: "pants", label: "Pants" },
];

export const SIZES = ["XS", "S", "M", "L", "XL", "OS"] as const;
export type Size = (typeof SIZES)[number];
export const APPAREL_SIZES = ["S", "M", "L", "XL"] as const;

// Only jerseys are purchasable right now; every other category is sold out.
// Remove a category from this set when its stock is ready to sell.
export const SOLD_OUT_CATEGORIES: ReadonlySet<Category> = new Set<Category>([
  "shorts",
  "accessories",
  "hoodies",
  "pants",
]);

export function isSoldOut(product: Product): boolean {
  return SOLD_OUT_CATEGORIES.has(product.category);
}

export function getProduct(id: string): Product | undefined {
  return PRODUCTS.find((p) => p.id === id);
}

export function getByCategory(cat: Category): Product[] {
  return PRODUCTS.filter((p) => p.category === cat);
}
