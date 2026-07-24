import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { useCart } from "@/lib/cart";
import { createCheckoutSession } from "@/lib/checkout";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/checkout")({
  head: () => ({
    meta: [
      { title: "Checkout — Roguecore" },
      { name: "description", content: "Complete your Roguecore order." },
    ],
  }),
  component: Checkout,
});

function Checkout() {
  const items = useCart((s) => s.items);
  const total = useCart((s) => s.total());
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // When the customer clicks "Pay", we ask our server to create a Stripe
  // Checkout Session, then send the browser to Stripe's secure payment page.
  // Card details are entered on Stripe — never on our site.
  async function handlePay() {
    setError(null);
    setLoading(true);
    try {
      const { url } = await createCheckoutSession({
        data: {
          items: items.map((i) => ({
            productId: i.productId,
            size: i.size,
            quantity: i.quantity,
          })),
        },
      });
      if (!url) throw new Error("Could not start checkout.");
      window.location.href = url; // redirect to Stripe
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Something went wrong. Please try again.",
      );
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-12 md:px-8 md:py-16">
      <h1 className="font-display mb-10 text-4xl uppercase md:text-5xl">Checkout</h1>

      <aside className="space-y-4 border border-border bg-secondary/30 p-6">
        <h2 className="font-display text-xl uppercase">Your Order</h2>

        {items.length === 0 ? (
          <div className="py-6 text-center">
            <p className="text-sm text-muted-foreground">Your cart is empty.</p>
            <Link
              to="/"
              className="mt-4 inline-block text-xs font-bold uppercase tracking-wider text-accent hover:underline"
            >
              ← Continue shopping
            </Link>
          </div>
        ) : (
          <>
            <ul className="space-y-3 border-b border-border pb-4">
              {items.map((i) => (
                <li
                  key={i.productId + i.size}
                  className="flex justify-between gap-2 text-sm"
                >
                  <span>
                    {i.name}{" "}
                    <span className="text-muted-foreground">
                      / {i.size} × {i.quantity}
                    </span>
                  </span>
                  <span className="font-medium">
                    ${(i.price * i.quantity).toFixed(2)}
                  </span>
                </li>
              ))}
            </ul>

            <div className="flex justify-between text-lg">
              <span className="font-display uppercase">Total</span>
              <span className="font-display">${total.toFixed(2)}</span>
            </div>

            {error && (
              <p className="text-sm font-medium text-destructive" role="alert">
                {error}
              </p>
            )}

            <Button
              onClick={handlePay}
              disabled={loading || items.length === 0}
              className="h-14 w-full rounded-none bg-accent text-base font-bold uppercase tracking-wider text-accent-foreground hover:bg-accent/90 disabled:opacity-40"
            >
              {loading ? "Redirecting…" : "Pay securely"}
            </Button>

            <p className="text-center text-xs text-muted-foreground">
              You'll enter payment and shipping details on Stripe's secure page.
            </p>
          </>
        )}
      </aside>
    </div>
  );
}
