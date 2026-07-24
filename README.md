# Roguecore — storefront

A soccer-apparel store built with **React + TanStack Start** (a full-stack
React framework) and **Tailwind CSS**. This file explains the project in plain
language so you can find your way around.

## The 60-second tour

When someone visits the site:

1. They land on the **home page** and browse products.
2. They open a product, pick a size, and **Add to Cart**.
3. They open the cart and hit **Checkout**.
4. Our **server** creates a secure Stripe payment and sends them to Stripe to pay.
5. Stripe brings them back to a **thank-you page**, and the order is saved.

Card details are only ever entered on **Stripe's** page — never on our site.
That's the single most important security decision in this project.

## Where things live

```
src/
  routes/            ← Each file is a page (URL). This is "file-based routing".
    index.tsx          the home page  (/)
    shop.$category.tsx a category page (/shop/jerseys, /shop/hoodies, …)
    product.$id.tsx    a single product page (/product/jerseys-1)
    checkout.tsx       the cart review + "Pay securely" button (/checkout)
    checkout.success.tsx the thank-you page Stripe returns to
    __root.tsx         the shared shell (header + footer) around every page

  components/
    header.tsx         top nav + the slide-out cart drawer
    footer.tsx         footer
    product-card.tsx   the product tile shown in grids
    ui/                reusable buttons, inputs, dialogs, etc. (design system)

  lib/                 ← the "brains" (no visuals here)
    products.ts        the product catalog (names, prices, images)
    cart.ts            the shopping cart (what's in it, add/remove, totals)
    stock.ts           how many of each item are left
    checkout.ts        SERVER-ONLY: creates Stripe payments, saves orders

  assets/              product images
```

## The two "state stores" (cart & stock)

`cart.ts` and `stock.ts` use a tiny library called **Zustand**. Think of each
as a small shared notebook the whole app can read and write:

- `cart.ts` — the list of items the shopper has added, plus helpers like
  `add`, `remove`, and `total()`.
- `stock.ts` — how many of each product remain. It's remembered in the
  browser so it survives a refresh.

## The catalog (`products.ts`)

Products are defined in code (not a database). The file builds a list of
products for each category, then swaps in the correct image for each one.
It looks busy only because there are many hand-matched product photos — the
shape of each product is simple:

```ts
{ id, name, category, price, front /* image */, back /* image */ }
```

To change a price or name, edit it here.

## Checkout & security (`checkout.ts`)

This file runs **only on the server**, never in the browser. It:

- Re-checks every price on the server (so a shopper can't tamper with prices).
- Creates a **Stripe Checkout Session** and returns the payment URL.
- Saves the order to the **Supabase** database (if configured).

Secrets (Stripe key, database key) are read from **environment variables** and
are never sent to the browser. See `.env.example` for the list.

## Running it locally

```bash
npm install
cp .env.example .env      # then fill in your test keys
npm run dev               # open the URL it prints
```

## Deploying it

See **DEPLOYMENT_GUIDE.md** for full step-by-step instructions (GitHub →
Supabase → Stripe → Cloudflare → your domain).
# roguecore
# roguecore
# roguecore
