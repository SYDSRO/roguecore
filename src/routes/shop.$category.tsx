import { createFileRoute, notFound } from "@tanstack/react-router";
import { CATEGORIES, getByCategory, type Category } from "@/lib/products";
import { ProductCard } from "@/components/product-card";

const VALID = new Set(CATEGORIES.map((c) => c.slug));

export const Route = createFileRoute("/shop/$category")({
  loader: ({ params }) => {
    if (!VALID.has(params.category as Category)) throw notFound();
    return { category: params.category as Category };
  },
  head: ({ params }) => ({
    meta: [
      { title: `${cap(params.category)} — Roguecore` },
      {
        name: "description",
        content: `Shop ${params.category} from Roguecore. Soccer-built, street-tested.`,
      },
    ],
  }),
  component: CategoryPage,
  notFoundComponent: () => (
    <div className="p-16 text-center">Category not found.</div>
  ),
});

function cap(s: string) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

function CategoryPage() {
  const { category } = Route.useLoaderData();
  const products = getByCategory(category);
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 md:px-8 md:py-16">
      <p className="mb-2 text-xs font-bold uppercase tracking-[0.3em] text-accent">
        Collection
      </p>
      <h1 className="font-display mb-10 text-4xl uppercase md:text-6xl">
        {cap(category)}
      </h1>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
        {products.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </div>
  );
}
