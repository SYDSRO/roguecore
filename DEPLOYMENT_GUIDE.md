# Deploying Roguecore — step by step

This guide takes you from the code on your computer to a **live store on your
own domain**, using only free services:

| Piece | Service | Free tier |
| --- | --- | --- |
| Code storage | **GitHub** | Yes |
| Hosting | **Cloudflare** | Yes |
| Database | **Supabase** (Postgres) | Yes |
| Payments | **Stripe** | Free to start (small fee per sale) |
| Domain | **Your Shopify domain** | Already bought |

Do the steps **in order**. Each one takes a few minutes. Total: ~45–60 min.

> Tip: keep a note open and paste each key/value as you go — you'll need a few
> of them later.

---

## Step 1 — Put the code on GitHub

1. Create a free account at **github.com** if you don't have one.
2. Click the **+** (top right) → **New repository**. Name it `roguecore`,
   keep it **Private**, and click **Create repository**.
3. On your computer, open a terminal **in this project folder** and run:

   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/YOUR_USERNAME/roguecore.git
   git push -u origin main
   ```

   Replace `YOUR_USERNAME` with your GitHub username.

> Note: this project was created with Lovable. If Lovable already connected a
> GitHub repo for you, you can skip creating a new one and just `git push` to
> the existing one.

**Safety check:** the `.gitignore` is set up so your secret keys (the `.env`
file) are **never** uploaded. Never paste real keys into any file that gets
committed.

---

## Step 2 — Create the database (Supabase)

1. Go to **supabase.com** → sign in with GitHub → **New project**.
2. Give it a name (`roguecore`), set a database password (save it somewhere),
   pick the region closest to your customers, and click **Create**. Wait ~2 min.
3. In the left sidebar open **SQL Editor** → **New query**.
4. Open the file **`supabase-schema.sql`** from this project, copy everything,
   paste it into the editor, and click **Run**. This creates the `orders` table.
5. Now grab two values (you'll paste them into Cloudflare in Step 4):
   - **Project URL** — Settings (gear icon) → **Data API** → *Project URL*
     (looks like `https://abcd1234.supabase.co`).
   - **service_role key** — Settings → **API Keys** → reveal the
     **`service_role`** key and copy it.

> ⚠️ The `service_role` key is a master key for your database. Treat it like a
> password: only ever use it on the server (which is exactly what this project
> does). Never put it in front-end code.

---

## Step 3 — Set up payments (Stripe)

1. Go to **stripe.com** → create an account. You can start in **Test mode**
   (a toggle in the dashboard) — no bank details needed yet.
2. In the dashboard go to **Developers → API keys**.
3. Copy the **Secret key**. In test mode it starts with `sk_test_…`.
   (Ignore the "Publishable key" — this project doesn't need it.)

That's all you need for now. You'll switch to live keys in Step 7.

---

## Step 4 — Deploy to Cloudflare

### 4a. Connect your GitHub repo

1. Go to **dash.cloudflare.com** → sign up / log in (free).
2. In the sidebar click **Workers & Pages** → **Create** → **Import a
   repository** → connect GitHub and pick your `roguecore` repo.
3. When asked for build settings, enter:
   - **Build command:** `npm run build`
   - **Deploy command:** `npm run deploy`
   - (Leave the output directory blank — the deploy command handles it.)
4. Click **Save and Deploy**. The first build takes a few minutes. It may show
   an error about missing environment variables — that's expected; fix it next.

### 4b. Add your secret keys

1. Open your new Worker → **Settings** → **Variables and Secrets**.
2. Add these three, and mark each as a **Secret** (encrypted):

   | Name | Value |
   | --- | --- |
   | `STRIPE_SECRET_KEY` | your `sk_test_…` key from Step 3 |
   | `SUPABASE_URL` | your Project URL from Step 2 |
   | `SUPABASE_SERVICE_ROLE_KEY` | your service_role key from Step 2 |

3. Save, then go to **Deployments** → **Retry / redeploy** the latest build so
   it picks up the new secrets.

Once it finishes, Cloudflare gives you a temporary address like
`https://roguecore.YOUR-NAME.workers.dev`. Open it — your store is live.

> Every time you `git push` to GitHub from now on, Cloudflare rebuilds and
> redeploys automatically.

---

## Step 5 — Test the whole flow (before going live)

While still using Stripe **test** keys:

1. Open your `.workers.dev` site, add an item to the cart, and hit **Checkout →
   Pay securely**.
2. On the Stripe page, use Stripe's test card:
   - Card number: `4242 4242 4242 4242`
   - Expiry: any future date · CVC: any 3 digits · ZIP: any 5 digits
3. Complete payment. You should land on the **"Order confirmed"** page.
4. Back in **Supabase → Table editor → orders**, you should see a new row with
   status `paid`. 🎉 That confirms payments *and* the database are working.

---

## Step 6 — Connect your Shopify domain

Your Worker needs your domain to live on Cloudflare's DNS. Because your domain
was bought through Shopify, you have two options.

### Option A (recommended) — move DNS to Cloudflare

1. In Cloudflare go to the main dashboard → **Add a site** → type your domain →
   choose the **Free** plan. Cloudflare scans your existing DNS records and
   shows you **two nameservers** (like `xxx.ns.cloudflare.com`).
2. In **Shopify admin → Settings → Domains**, click your domain → look for
   **Manage DNS / Change nameservers**, and replace Shopify's nameservers with
   the two Cloudflare gave you. Save.
3. Wait for Cloudflare to say the domain is **Active** (usually under an hour,
   sometimes up to 24h). You'll get an email.
4. Back in your **Worker → Settings → Domains & Routes → Add → Custom domain**,
   enter your domain (e.g. `yourbrand.com` and `www.yourbrand.com`). Cloudflare
   creates the DNS records and a free SSL certificate automatically.

> If your domain is also used for **email** or anything else, tell me before you
> switch nameservers — those records need to be copied into Cloudflare first
> (Cloudflare's scan usually imports them, but it's worth double-checking).

### Option B — if Shopify won't let you change nameservers

Some Shopify-managed domains lock the nameservers. If so, **transfer the domain
to Cloudflare Registrar** (free, at wholesale price): in Shopify unlock the
domain and get the **authorization/EPP code**, then in Cloudflare go to
**Domain Registration → Transfer Domains** and follow the steps. Transfers take
a few days. Once done, the domain is on Cloudflare and you finish with step
A-4 above.

(Stuck on this step? It's the fiddliest part — send me what you see in Shopify's
domain settings and I'll give you the exact clicks.)

---

## Step 7 — Go live (accept real payments)

When you're ready to take real money:

1. In Stripe, complete **account activation** (business + bank details).
2. Switch the dashboard to **Live mode** and copy the **live** secret key
   (`sk_live_…`).
3. In Cloudflare → your Worker → **Variables and Secrets**, update
   `STRIPE_SECRET_KEY` to the live key. Redeploy.
4. Do one small real purchase yourself to confirm, then refund it in Stripe.

---

## What "secure" means here (so you can trust it)

- **No card data ever touches your site.** Customers type their card on
  **Stripe's** page. You have zero card-handling liability.
- **Prices are recalculated on the server.** A shopper can't edit prices in
  their browser to pay less — the server ignores the browser's numbers and uses
  the real catalog price.
- **Secrets live only on the server**, in Cloudflare's encrypted variables, and
  are excluded from GitHub by `.gitignore`.
- **The database is locked down** (Row Level Security on, no public access);
  only your server can write orders.
- **Security headers** are applied to every page (`public/_headers`).

---

## Troubleshooting

| Symptom | Fix |
| --- | --- |
| Checkout button errors "STRIPE_SECRET_KEY is not configured" | The secret isn't set on the Worker, or you didn't redeploy after adding it. Re-check Step 4b and redeploy. |
| Payment works but no row in Supabase | Check `SUPABASE_URL` and `SUPABASE_SERVICE_ROLE_KEY` are correct, and that you ran `supabase-schema.sql`. |
| Custom domain shows an SSL / 522 error | DNS is still propagating, or the domain isn't fully **Active** in Cloudflare yet. Wait, then retry. |
| Build fails on Cloudflare | Open the build log. Most often it's the **Deploy command** — make sure it's exactly `npm run deploy`. |

---

## Handy commands

```bash
npm run dev       # run locally at the URL it prints
npm run build     # build for production
npm run deploy    # deploy to Cloudflare from your machine (alternative to auto-deploy)
```
