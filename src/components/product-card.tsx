import { Link } from "@tanstack/react-router";
import { isSoldOut, type Product } from "@/lib/products";

export function ProductCard({ product }: { product: Product }) {
  const soldOut = isSoldOut(product);
  return (
    <Link
      to="/product/$id"
      params={{ id: product.id }}
      className="group block"
    >
      <div className="relative aspect-square overflow-hidden bg-white border border-black">
        <img
          src={product.front}
          alt={product.name}
          loading="lazy"
          className={`absolute inset-0 h-full w-full object-contain transition-transform duration-500 group-hover:scale-105 ${soldOut ? "opacity-50" : ""} ${
            product.name.includes("Essential Shorts Black")
              ? "p-10 md:p-12"
              : product.name.includes("Essential Shorts")
                ? "p-6 md:p-8"
                : product.name === "Denim Shorts Black" || product.name === "Denim Shorts Navy Blue"
                  ? "p-2 md:p-3"
                  : product.name.includes("Island Shorts Pink")
                    ? "p-6 md:p-8"
                    : ""
          }`}
        />

        <div className="absolute left-0 top-0 m-3 bg-foreground px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-background opacity-0 transition-opacity group-hover:opacity-100">
          View
        </div>
        {soldOut && (
          <div className="absolute right-0 top-0 m-3 bg-destructive px-2 py-1 text-[10px] font-bold uppercase tracking-wider text-destructive-foreground">
            Sold Out
          </div>
        )}
      </div>
      <div className="mt-3 flex items-start justify-between gap-2">
        <h3 className="font-medium leading-tight">{product.name}</h3>
        <p className={`font-display whitespace-nowrap ${soldOut ? "text-muted-foreground" : ""}`}>
          ${product.price}
        </p>
      </div>
    </Link>
  );
}
