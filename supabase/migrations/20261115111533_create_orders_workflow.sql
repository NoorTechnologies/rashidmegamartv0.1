create table if not exists public.orders (
 id uuid primary key default gen_random_uuid(),
 order_number text not null unique,
 customer_name text not null check (char_length(customer_name) between 2 and 100),
 customer_phone text not null check (customer_phone ~ '^[6-9][0-9]{9}$'),
 delivery_address text not null check (char_length(delivery_address) between 10 and 1000),
 customer_note text not null default '',
 payment_preference text not null default 'COD' check (payment_preference in ('COD','UPI')),
 subtotal numeric(12,2) not null check (subtotal >= 0),
 delivery_charge numeric(12,2) check (delivery_charge is null or delivery_charge >= 0),
 total_amount numeric(12,2) not null check (total_amount >= 0),
 status text not null default 'new' check (status in ('new','confirmed','preparing','out_for_delivery','delivered','cancelled')),
 source text not null default 'whatsapp_checkout',
 created_at timestamptz not null default now(),
 updated_at timestamptz not null default now()
);
create table if not exists public.order_items (
 id uuid primary key default gen_random_uuid(),
 order_id uuid not null references public.orders(id) on delete cascade,
 catalog_item_id text not null,
 item_type text not null check (item_type in ('product','kit')),
 item_name text not null,
 brand text not null default '',
 pack_size text not null default '',
 unit_price numeric(12,2) not null check (unit_price >= 0),
 quantity integer not null check (quantity between 1 and 99),
 line_total numeric(12,2) not null check (line_total >= 0),
 created_at timestamptz not null default now()
);
create index if not exists orders_created_at_idx on public.orders (created_at desc);
create index if not exists orders_status_created_at_idx on public.orders (status, created_at desc);
create index if not exists order_items_order_id_idx on public.order_items (order_id);
alter table public.orders enable row level security;
alter table public.order_items enable row level security;
revoke all on public.orders from anon, authenticated;
revoke all on public.order_items from anon, authenticated;
