import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect } from "react";
import { z } from "zod";
import { Check } from "lucide-react";
import { confirmCheckout } from "@/lib/checkout";
import { useCart } from "@/lib/cart";

// Stripe redirects here after a successful payment, adding ?session_id=...
// We confirm with Stripe (server-side) that the session was really paid.
export const Route = createFileRoute("/checkout/success")({
  validateSearch: z.object({ session_id: z.string().optional() }),
  loaderDeps: ({ search }) => ({ sessionId: search.session_id }),
  loader: async ({ deps }) => {
    if (!deps.sessionId) return { paid: false };
    try {
      return await confirmCheckout({ data: deps.sessionId });
    } catch {
      return { paid: false };
    }
  },
  head: () => ({
    meta: [{ title: "Order confirmed — Roguecore" }],
  }),
  component: Success,
});

function Success() {
  const { paid } = Route.useLoaderData();
  const clear = useCart((s) => s.clear);

  // Empty the cart once the order is confirmed.
  useEffect(() => {
    if (paid) clear();
  }, [paid, clear]);

  return (
    <div className="flex min-h-[70vh] items-center justify-center px-4">
      <div className="text-center">
        <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-accent text-accent-foreground">
          <Check className="h-10 w-10" strokeWidth={3} />
        </div>
        <h1 className="font-display text-4xl uppercase md:text-5xl">
          {paid ? "Order confirmed" : "Thanks for your order"}
        </h1>
        <p className="mt-4 text-muted-foreground">
          {paid
            ? "Your payment went through. A receipt is on its way to your email."
            : "We're finishing up your order confirmation."}
        </p>
        <Link
          to="/"
          className="mt-8 inline-block text-xs font-bold uppercase tracking-wider text-accent hover:underline"
        >
          ← Back to shop
        </Link>
      </div>
    </div>
  );
}
