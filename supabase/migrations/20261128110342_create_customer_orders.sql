create table if not exists public.customer_orders (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  customer_name text not null check (char_length(btrim(customer_name)) between 2 and 100),
  phone text not null check (phone ~ '^[6-9][0-9]{9}$'),
  delivery_address jsonb not null default '{}'::jsonb check (jsonb_typeof(delivery_address) = 'object'),
  items jsonb not null check (jsonb_typeof(items) = 'array' and jsonb_array_length(items) between 1 and 30),
  subtotal numeric(12,2) not null check (subtotal >= 0),
  payment_preference text not null check (payment_preference in ('cod','upi','confirm')),
  status text not null default 'pending_confirmation'
    check (status in ('pending_confirmation','confirmed','preparing','out_for_delivery','delivered','cancelled')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists customer_orders_user_created_idx
  on public.customer_orders (user_id, created_at desc);

alter table public.customer_orders enable row level security;

drop policy if exists "Customers can view own orders" on public.customer_orders;
create policy "Customers can view own orders"
  on public.customer_orders for select to authenticated
  using ((select auth.uid()) = user_id);

drop policy if exists "Customers can create own orders" on public.customer_orders;
create policy "Customers can create own orders"
  on public.customer_orders for insert to authenticated
  with check ((select auth.uid()) = user_id);

grant select, insert on public.customer_orders to authenticated;
