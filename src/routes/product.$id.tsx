import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { getProduct, APPAREL_SIZES, type Size } from "@/lib/products";
import { useCart } from "@/lib/cart";
import { useStock } from "@/lib/stock";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";


export const Route = createFileRoute("/product/$id")({
  loader: ({ params }) => {
    const p = getProduct(params.id);
    if (!p) throw notFound();
    return { product: p };
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.product.name} — Roguecore` },
          {
            name: "description",
            content: `${loaderData.product.name} — $${loaderData.product.price}. Roguecore soccer apparel.`,
          },
          { property: "og:image", content: loaderData.product.front },
        ]
      : [],
  }),
  component: ProductPage,
  notFoundComponent: () => (
    <div className="p-16 text-center">Product not found.</div>
  ),
});

function ProductPage() {
  const { product } = Route.useLoaderData();
  const [view, setView] = useState(0); // 0=front, 100=back
  const [size, setSize] = useState<Size | null>(null);
  const add = useCart((s) => s.add);
  const stock = useStock((s) => s.stock[product.id] ?? 0);
  const decrementStock = useStock((s) => s.decrement);
  const outOfStock = stock <= 0;

  const showingBack = view >= 50;



  return (
    <div className="mx-auto max-w-7xl px-4 py-8 md:grid md:grid-cols-2 md:gap-12 md:px-8 md:py-16">
      {/* Image with slider */}
      <div>
        <div className="relative aspect-square overflow-hidden bg-muted">
          <img
            src={product.front}
            alt={`${product.name} front`}
            width={1024}
            height={1024}
            className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-300 ${showingBack ? "opacity-0" : "opacity-100"}`}
          />
          <img
            src={product.back}
            alt={`${product.name} back`}
            width={1024}
            height={1024}
            className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-300 ${showingBack ? "opacity-100" : "opacity-0"}`}
          />
        </div>
        <div className="mt-6 px-2">
          <div className="mb-2 flex justify-between text-xs font-bold uppercase tracking-wider">
            <span className={showingBack ? "text-muted-foreground" : "text-accent"}>
              ← Front
            </span>
            <span className={showingBack ? "text-accent" : "text-muted-foreground"}>
              Back →
            </span>
          </div>
          <Slider
            value={[view]}
            onValueChange={(v) => setView(v[0])}
            min={0}
            max={100}
            step={1}
            aria-label="Rotate view"
          />
        </div>
      </div>

      {/* Details */}
      <div className="mt-8 md:mt-0">
        <Link
          to="/shop/$category"
          params={{ category: product.category }}
          className="text-xs uppercase tracking-wider text-muted-foreground hover:text-foreground"
        >
          ← {product.category}
        </Link>
        <h1 className="font-display mt-3 text-3xl uppercase md:text-5xl">
          {product.name}
        </h1>
        <p className="font-display mt-3 text-2xl">${product.price}</p>

        <p
          className={`mt-3 text-xs font-bold uppercase tracking-wider ${
            outOfStock ? "text-destructive" : "text-accent"
          }`}
        >
          {outOfStock ? "Out of Stock" : `${stock} in Stock`}
        </p>


        <div className="mt-8">
          <p className="mb-3 text-xs font-bold uppercase tracking-wider">Size</p>
          {product.category === "accessories" ? (
            <p className="text-sm font-medium uppercase tracking-wider text-muted-foreground">
              One Size Available
            </p>
          ) : (
            <div className="grid grid-cols-4 gap-2">
              {APPAREL_SIZES.map((s) => (
                <button
                  key={s}
                  onClick={() => setSize(s)}
                  className={`h-12 border text-sm font-bold uppercase transition-colors ${
                    size === s
                      ? "border-foreground bg-foreground text-background"
                      : "border-border hover:border-foreground"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          )}
        </div>

        <Button
          className="mt-8 h-14 w-full rounded-none bg-accent text-base font-bold uppercase tracking-wider text-accent-foreground hover:bg-accent/90 disabled:opacity-40"
          disabled={outOfStock || (product.category !== "accessories" && !size)}
          onClick={() => {
            if (outOfStock) return;
            if (product.category !== "accessories" && !size) return;
            add({
              productId: product.id,
              name: product.name,
              price: product.price,
              image: product.front,
              size: product.category === "accessories" ? "OS" : (size as Size),
            });
            decrementStock(product.id, 1);
          }}
        >
          {outOfStock
            ? "Out of Stock"
            : product.category === "accessories" || size
              ? "Add to Cart"
              : "Select a Size"}
        </Button>



        <div className="mt-8 space-y-2 border-t border-border pt-6 text-sm text-muted-foreground">
          <p>· Engineered fabric, built to move.</p>
          <p>· 30-day returns.</p>

        </div>
      </div>
    </div>
  );
}
