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
import manchesterUnitedRetroRedFront from "@/assets/manchester-united-retro-red-front.png.asset.json";
import manchesterUnitedRetroBlackBack from "@/assets/manchester-united-retro-black-back-final.png.asset.json";
import manchesterUnitedRetroBlackFront from "@/assets/manchester-united-retro-black-front.png.asset.json";
import shortsIslandGrey from "@/assets/Islandgrey.webp.asset.json";
import shortsIslandPink from "@/assets/island-pink-shorts.png.asset.json";
import shortsEssentialsBlack from "@/assets/essentialsblack-new.jpg.asset.json";
import shortsEssentialsGrey from "@/assets/essentialsgrey-new.jpg.asset.json";
import shortsEssentialsLight from "@/assets/essentialslight-new.jpg.asset.json";
import shortsDenimBlack from "@/assets/denimblack.webp.asset.json";
import shortsDenimGrey from "@/assets/denimgrey.webp.asset.json";
import shortsCheckered from "@/assets/checkered.webp.asset.json";
import shortsEssentialCoral from "@/assets/essentialcoral.webp.asset.json";
import shortsDenimNavy from "@/assets/denimnavy.webp.asset.json";
import pantsEssentialBlack from "@/assets/essentialspantsblack.webp.asset.json";
import pantsEssentialGrey from "@/assets/essentialspantsgrey.webp.asset.json";
import pantsEssentialLight from "@/assets/essentialspantslight.webp.asset.json";
import pantsSGrey from "@/assets/spantsgrey.webp.asset.json";
import pantsAloBlack from "@/assets/aloblackpants.webp.asset.json";
import pantsAloGrey from "@/assets/alogreypants.webp.asset.json";
import pantsAloNavy from "@/assets/alonavypants.webp.asset.json";
import pants1997Black from "@/assets/1997blackpants.webp.asset.json";
import pants1997Grey from "@/assets/1997greypants.webp.asset.json";
import jPortugal2026 from "@/assets/jersey-2026away.webp.asset.json";
import jAcMilan from "@/assets/jersey-acmilanretro.webp.asset.json";
import jAjax from "@/assets/jersey-ajax.webp.asset.json";
import jBarcaJack from "@/assets/jersey-barcajack.webp.asset.json";
import jBlackoutBrazil from "@/assets/jersey-blackoutbrazil.webp.asset.json";
import jBrazil2002 from "@/assets/jersey-brazil2002.webp.asset.json";
import jBrazilEmerald from "@/assets/jersey-brazilemeraldnights.webp.asset.json";
import jItachi from "@/assets/jersey-itachi.webp.asset.json";
import jJapanPolo from "@/assets/jersey-japanpolo.webp.asset.json";
import jInterSnake from "@/assets/jersey-intermilansnake.webp.asset.json";
import jMadridGreen from "@/assets/jersey-madridgreen.webp.asset.json";
import jMadridPink from "@/assets/jersey-madridpink.webp.asset.json";
import jMiamiBape from "@/assets/jersey-miamibape.webp.asset.json";
import jPinkBarca from "@/assets/jersey-pinkbarca.webp.asset.json";
import jPortugalSui from "@/assets/jersey-portugalsui.webp.asset.json";
import jPsg from "@/assets/jersey-psg.webp.asset.json";
import jSantos from "@/assets/jersey-santos2012.webp.asset.json";
import jVersace from "@/assets/jersey-vercaceblack.webp.asset.json";
import hoodie1997Black from "@/assets/1997black-hoodie.png.asset.json";
import hoodie1997Grey from "@/assets/1997grey-hoodie.png.asset.json";
import hoodieSGrey from "@/assets/s-hoodie-grey.png.asset.json";
import hoodieSBlack from "@/assets/s-hoodie-black.png.asset.json";
import capIslandBlack from "@/assets/island-cap-black.png.asset.json";
import capIslandBlue from "@/assets/island-cap-blue.png.asset.json";
import capIslandGreen from "@/assets/island-cap-green.png.asset.json";
import manuRetroBlackBackV2 from "@/assets/manu-retro-black-back-v2.png.asset.json";

const HOODIES_IMAGES_BY_NAME: Record<string, string> = {
  "1997 Black Hoodie": hoodie1997Black.url,
  "1997 Grey Hoodie": hoodie1997Grey.url,
  "S Hoodie Grey": hoodieSGrey.url,
  "S Hoodie Black": hoodieSBlack.url,
};

const ACCESSORIES_IMAGES_BY_NAME: Record<string, string> = {
  "Island Cap Black": capIslandBlack.url,
  "Island Cap Blue": capIslandBlue.url,
  "Island Cap Green": capIslandGreen.url,
};



const JERSEY_IMAGES_BY_NAME: Record<string, string> = {
  "Portugal 2026 Away": jPortugal2026.url,
  "AC Milan Retro": jAcMilan.url,
  "Ajax Staryy Night": jAjax.url,
  "Barcelona Cactus Jack": jBarcaJack.url,
  "Brazil Blakcout": jBlackoutBrazil.url,
  "Brazil 2002 Retro": jBrazil2002.url,
  "Brazil Emerald Nights": jBrazilEmerald.url,
  "Japan Itachi Kit": jItachi.url,
  "Japan Polo Kit": jJapanPolo.url,
  "Inter Milan Black Snake": jInterSnake.url,
  "Madrid Green Dragon": jMadridGreen.url,
  "Real Madrid Pink Dragon": jMadridPink.url,
  "Inter Miami Bape": jMiamiBape.url,
  "Barcelona Pink Jersey": jPinkBarca.url,
  "Portugal SUI Jersey": jPortugalSui.url,
  "Paris Saint Gemain Nior": jPsg.url,
  "Santos 2012 Jersey": jSantos.url,
  "Italy Vercace Black": jVersace.url,
};

const SHORTS_IMAGES = [
  shortsIslandGrey, shortsIslandPink, shortsEssentialsBlack, shortsEssentialsGrey, shortsEssentialsLight,
  shortsDenimBlack, shortsDenimGrey, shortsCheckered, shortsEssentialCoral, shortsDenimNavy,
].map((a) => a.url);

const PANTS_IMAGES: (string | null)[] = [
  pantsEssentialBlack.url, pantsEssentialGrey.url, pantsEssentialLight.url, pantsSGrey.url,
  null, // S Pants Black — pending
  pantsAloBlack.url, pantsAloGrey.url, pantsAloNavy.url, pants1997Black.url, pants1997Grey.url,
];





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
    if (p.id === "jerseys-1") {
      return { ...p, name: "Manchester United Retro Red", front: manchesterUnitedRetroRedFront.url };
    }
    if (p.category === "jerseys" && JERSEY_IMAGES_BY_NAME[p.name]) {
      const img = JERSEY_IMAGES_BY_NAME[p.name];
      return { ...p, front: img, back: img };
    }
    if (p.category === "shorts") {
      const idx = parseInt(p.id.split("-")[1], 10) - 1;
      const img = SHORTS_IMAGES[idx];
      if (img) return { ...p, front: img, back: img };
    }
    if (p.category === "pants") {
      const idx = parseInt(p.id.split("-")[1], 10) - 1;
      const img = PANTS_IMAGES[idx];
      if (img) return { ...p, front: img, back: img };
    }
    if (p.category === "hoodies" && HOODIES_IMAGES_BY_NAME[p.name]) {
      const img = HOODIES_IMAGES_BY_NAME[p.name];
      return { ...p, front: img, back: img };
    }
    if (p.category === "accessories" && ACCESSORIES_IMAGES_BY_NAME[p.name]) {
      const img = ACCESSORIES_IMAGES_BY_NAME[p.name];
      return { ...p, front: img, back: img };
    }
    return p;
  }),

  {
    id: "jerseys-manchester-united-retro-black",
    name: "Manchester United Retro Black",
    category: "jerseys",
    price: 35,
    front: manchesterUnitedRetroBlackFront.url,
    back: manuRetroBlackBackV2.url,
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

export function getProduct(id: string): Product | undefined {
  return PRODUCTS.find((p) => p.id === id);
}

export function getByCategory(cat: Category): Product[] {
  return PRODUCTS.filter((p) => p.category === cat);
}
