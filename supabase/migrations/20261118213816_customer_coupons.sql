create table public.coupons (
  id uuid primary key default gen_random_uuid(),
  code text not null unique,
  title text not null,
  description text not null default '',
  discount_type text not null check (discount_type in ('percentage', 'fixed')),
  discount_value numeric(10,2) not null check (discount_value > 0),
  minimum_order numeric(10,2) not null default 0 check (minimum_order >= 0),
  valid_from timestamptz not null default now(),
  expires_at timestamptz,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint coupons_code_format check (code = upper(btrim(code)) and char_length(code) between 3 and 32),
  constraint coupons_title_length check (char_length(btrim(title)) between 2 and 100),
  constraint coupons_description_length check (char_length(description) <= 300),
  constraint coupons_validity_range check (expires_at is null or expires_at > valid_from)
);

create index coupons_active_validity_idx
  on public.coupons (is_active, valid_from, expires_at);

alter table public.coupons enable row level security;

create policy "Public can view currently active coupons"
  on public.coupons
  for select
  to anon, authenticated
  using (
    is_active = true
    and valid_from <= now()
    and (expires_at is null or expires_at >= now())
  );

grant select on public.coupons to anon, authenticated;
grant all on public.coupons to service_role;
