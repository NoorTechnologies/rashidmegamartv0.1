create table if not exists public.customer_profiles (
  user_id uuid primary key references auth.users(id) on delete cascade,
  full_name text not null default '',
  phone text not null default '',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint customer_profiles_full_name_length check (char_length(full_name) <= 100),
  constraint customer_profiles_phone_format check (phone = '' or phone ~ '^[6-9][0-9]{9}$')
);
alter table public.customer_profiles enable row level security;
create policy "Customers can view own profile" on public.customer_profiles for select to authenticated using ((select auth.uid()) = user_id);
create policy "Customers can insert own profile" on public.customer_profiles for insert to authenticated with check ((select auth.uid()) = user_id);
create policy "Customers can update own profile" on public.customer_profiles for update to authenticated using ((select auth.uid()) = user_id) with check ((select auth.uid()) = user_id);
create table if not exists public.customer_addresses (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  label text not null default 'Home',
  recipient_name text not null,
  phone text not null,
  address_line1 text not null,
  address_line2 text not null default '',
  landmark text not null default '',
  city text not null,
  state text not null,
  postal_code text not null,
  is_default boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint customer_addresses_label_length check (char_length(label) between 1 and 32),
  constraint customer_addresses_name_length check (char_length(recipient_name) between 2 and 100),
  constraint customer_addresses_phone_format check (phone ~ '^[6-9][0-9]{9}$'),
  constraint customer_addresses_line1_length check (char_length(address_line1) between 5 and 180),
  constraint customer_addresses_city_length check (char_length(city) between 2 and 80),
  constraint customer_addresses_state_length check (char_length(state) between 2 and 80),
  constraint customer_addresses_postal_code_format check (postal_code ~ '^[1-9][0-9]{5}$')
);
create index if not exists customer_addresses_user_id_created_at_idx on public.customer_addresses (user_id, created_at desc);
alter table public.customer_addresses enable row level security;
create policy "Customers can view own addresses" on public.customer_addresses for select to authenticated using ((select auth.uid()) = user_id);
create policy "Customers can insert own addresses" on public.customer_addresses for insert to authenticated with check ((select auth.uid()) = user_id);
create policy "Customers can update own addresses" on public.customer_addresses for update to authenticated using ((select auth.uid()) = user_id) with check ((select auth.uid()) = user_id);
create policy "Customers can delete own addresses" on public.customer_addresses for delete to authenticated using ((select auth.uid()) = user_id);
grant select, insert, update on public.customer_profiles to authenticated;
grant select, insert, update, delete on public.customer_addresses to authenticated;