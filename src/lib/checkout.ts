/**
 * Secure checkout — runs ONLY on the server.
 *
 * Why this file exists:
 *  - The browser must never see the Stripe secret key, and it must never be
 *    trusted to tell us how much to charge. Everything money-related happens
 *    here, on the server, using `createServerFn` from TanStack Start.
 *  - The browser only sends which products + sizes + quantities are in the
 *    cart. We look up the real price from PRODUCTS on the server, so a user
 *    editing prices in their browser can't change what they pay.
 *
 * Required environment variables (set these in Cloudflare — see DEPLOYMENT_GUIDE):
 *  - STRIPE_SECRET_KEY          (from Stripe dashboard)
 *  - SUPABASE_URL               (optional — for saving orders)
 *  - SUPABASE_SERVICE_ROLE_KEY  (optional — for saving orders)
 */
import { createServerFn } from "@tanstack/react-start";
import { getRequest } from "@tanstack/react-start/server";
import { z } from "zod";
import { PRODUCTS } from "./products";

// ---- Input validation ------------------------------------------------------
// We validate everything the browser sends. Anything unexpected is rejected.
const CheckoutInput = z.object({
  items: z
    .array(
      z.object({
        productId: z.string().min(1),
        size: z.string().min(1).max(4),
        quantity: z.number().int().min(1).max(20),
      }),
    )
    .min(1)
    .max(50),
});

type CheckoutInput = z.infer<typeof CheckoutInput>;

// Countries Stripe is allowed to collect a shipping address for.
const SHIPPING_COUNTRIES = ["US", "CA", "GB", "AU", "DE", "FR", "NL", "IE"] as const;

/**
 * Create a Stripe Checkout Session and return its hosted-payment URL.
 * The browser redirects the customer to that URL — we never touch card data.
 */
export const createCheckoutSession = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => CheckoutInput.parse(data))
  .handler(async ({ data }) => {
    // 1) Re-price the cart on the server. Never trust prices from the browser.
    const line_items = data.items.map((item) => {
      const product = PRODUCTS.find((p) => p.id === item.productId);
      if (!product) throw new Error(`Unknown product: ${item.productId}`);
      return {
        quantity: item.quantity,
        price_data: {
          currency: "usd",
          unit_amount: Math.round(product.price * 100), // Stripe uses cents
          product_data: { name: `${product.name} — ${item.size}` },
        },
      };
    });

    // 2) Talk to Stripe (imported lazily so it never ships to the browser).
    const secret = process.env.STRIPE_SECRET_KEY;
    if (!secret) throw new Error("STRIPE_SECRET_KEY is not configured");

    const { default: Stripe } = await import("stripe");
    const stripe = new Stripe(secret, {
      // Fetch-based client so this works on Cloudflare Workers.
      httpClient: Stripe.createFetchHttpClient(),
    });

    // 3) Build absolute success/cancel URLs from the incoming request.
    const reqUrl = new URL(getRequest().url);
    const origin = `${reqUrl.protocol}//${reqUrl.host}`;

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items,
      success_url: `${origin}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/checkout`,
      shipping_address_collection: { allowed_countries: [...SHIPPING_COUNTRIES] },
    });

    // 4) Best-effort: record a pending order in the database. If the DB isn't
    //    configured yet, checkout still works — we just skip saving.
    await saveOrder({
      stripe_session_id: session.id,
      status: "pending",
      amount_total: session.amount_total,
      items: data.items,
    });

    return { url: session.url };
  });

/**
 * Called by the success page after Stripe redirects back. It asks Stripe
 * whether the session was actually paid (so the "thank you" page can't be
 * faked), and flips the saved order to "paid".
 */
export const confirmCheckout = createServerFn({ method: "GET" })
  .inputValidator((sessionId: unknown) => z.string().min(1).parse(sessionId))
  .handler(async ({ data: sessionId }) => {
    const secret = process.env.STRIPE_SECRET_KEY;
    if (!secret) throw new Error("STRIPE_SECRET_KEY is not configured");

    const { default: Stripe } = await import("stripe");
    const stripe = new Stripe(secret, {
      httpClient: Stripe.createFetchHttpClient(),
    });

    const session = await stripe.checkout.sessions.retrieve(sessionId);
    const paid = session.payment_status === "paid";

    if (paid) {
      await updateOrderStatus(sessionId, "paid");
    }

    return { paid };
  });

// ---- Supabase (Postgres) via its REST API ----------------------------------
// We use plain fetch instead of an SDK so it stays tiny and edge-safe.

async function saveOrder(order: {
  stripe_session_id: string;
  status: string;
  amount_total: number | null;
  items: CheckoutInput["items"];
}) {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return; // DB not configured — skip silently.

  try {
    await fetch(`${url}/rest/v1/orders`, {
      method: "POST",
      headers: {
        apikey: key,
        Authorization: `Bearer ${key}`,
        "Content-Type": "application/json",
        Prefer: "return=minimal",
      },
      body: JSON.stringify({
        stripe_session_id: order.stripe_session_id,
        status: order.status,
        amount_total: order.amount_total,
        items: order.items,
      }),
    });
  } catch (err) {
    // Never let a DB hiccup break the customer's checkout.
    console.error("Failed to save order:", err);
  }
}

async function updateOrderStatus(sessionId: string, status: string) {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) return;

  try {
    await fetch(
      `${url}/rest/v1/orders?stripe_session_id=eq.${encodeURIComponent(sessionId)}`,
      {
        method: "PATCH",
        headers: {
          apikey: key,
          Authorization: `Bearer ${key}`,
          "Content-Type": "application/json",
          Prefer: "return=minimal",
        },
        body: JSON.stringify({ status }),
      },
    );
  } catch (err) {
    console.error("Failed to update order:", err);
  }
}
