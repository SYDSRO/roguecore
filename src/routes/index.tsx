import { createFileRoute, Link } from "@tanstack/react-router";
import { BEST_SELLERS, CATEGORIES } from "@/lib/products";
import { ProductCard } from "@/components/product-card";
import heroImg from "@/assets/hero.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Roguecore — Soccer gear forged for the modern game" },
      {
        name: "description",
        content:
          "Roguecore. Jerseys, hoodies, shorts, accessories and pants engineered for soccer players who play with edge.",
      },
      { property: "og:title", content: "Roguecore" },
      { property: "og:description", content: "Soccer apparel with bite." },
    ],
  }),
  component: Home,
});

function Home() {
  return (
    <div>
      {/* Hero */}
      <section className="relative h-[80vh] min-h-[520px] w-full overflow-hidden bg-foreground text-background">
        <img
          src={heroImg}
          alt="Roguecore player"
          width={1920}
          height={1080}
          className="absolute inset-0 h-full w-full object-cover opacity-70"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground via-foreground/40 to-transparent" />
        <div className="relative z-10 mx-auto flex h-full max-w-7xl flex-col justify-end px-4 pb-16 md:px-8 md:pb-24">
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.3em] text-accent">
            Drop 01 — Live now
          </p>
          <h1 className="font-display text-5xl uppercase leading-[0.9] md:text-8xl">
            Play <span className="text-accent">Rogue</span>.
            <br />
            Play Core.
          </h1>
          <p className="mt-6 max-w-md text-sm text-background/80 md:text-base">
            Kits, hoodies and training gear built for players who never play it safe.
          </p>
          <div className="mt-8 flex gap-3">
            <Link
              to="/shop/$category"
              params={{ category: "jerseys" }}
              className="inline-flex h-12 items-center bg-accent px-8 text-sm font-bold uppercase tracking-wider text-accent-foreground transition-colors hover:bg-accent/90"
            >
              Shop Jerseys
            </Link>
            <Link
              to="/shop/$category"
              params={{ category: "hoodies" }}
              className="inline-flex h-12 items-center border border-background/40 px-8 text-sm font-bold uppercase tracking-wider text-background transition-colors hover:bg-background/10"
            >
              Off Pitch
            </Link>
          </div>
        </div>
      </section>

      {/* Best sellers */}
      <section className="mx-auto max-w-7xl px-4 py-16 md:px-8 md:py-24">
        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            <p className="mb-2 text-xs font-bold uppercase tracking-[0.3em] text-accent">
              Best Sellers
            </p>
            <h2 className="font-display text-3xl uppercase md:text-5xl">
              Top of the table.
            </h2>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
          {BEST_SELLERS.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      {/* Categories */}
      <section className="border-t border-border bg-secondary/40 py-16 md:py-24">
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <p className="mb-2 text-xs font-bold uppercase tracking-[0.3em] text-accent">
            Shop By Category
          </p>
          <h2 className="font-display mb-10 text-3xl uppercase md:text-5xl">
            Pick your weapon.
          </h2>
          <div className="grid grid-cols-2 gap-3 md:grid-cols-5 md:gap-4">
            {CATEGORIES.map((c) => (
              <Link
                key={c.slug}
                to="/shop/$category"
                params={{ category: c.slug }}
                className="group relative flex aspect-square items-center justify-center overflow-hidden border border-border bg-background text-center transition-colors hover:bg-foreground hover:text-background"
              >
                <span className="font-display text-2xl uppercase md:text-3xl">
                  {c.label}
                </span>
                <span className="absolute bottom-3 right-3 text-xs uppercase opacity-0 transition-opacity group-hover:opacity-100">
                  Shop →
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
