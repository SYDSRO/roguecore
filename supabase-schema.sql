-- ─────────────────────────────────────────────────────────────
--  Roguecore — database schema
--  Run this ONCE in your Supabase project:
--  Supabase dashboard → SQL Editor → New query → paste → Run.
-- ─────────────────────────────────────────────────────────────

create table if not exists public.orders (
  id                 uuid primary key default gen_random_uuid(),
  stripe_session_id  text unique not null,
  status             text not null default 'pending',   -- 'pending' | 'paid'
  amount_total       integer,                            -- total in cents
  items              jsonb not null default '[]'::jsonb, -- what was ordered
  created_at         timestamptz not null default now()
);

-- Turn on Row Level Security. With RLS on and NO public policies, the table
-- is locked to anonymous/browser access. Our server uses the service_role
-- key, which bypasses RLS — so orders can only be written by our backend.
alter table public.orders enable row level security;

-- Helpful index for looking an order up by its Stripe session id.
create index if not exists orders_stripe_session_id_idx
  on public.orders (stripe_session_id);
