create table if not exists public.customer_saved_kits (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  name text not null check (char_length(btrim(name)) between 1 and 48),
  items jsonb not null default '[]'::jsonb check (jsonb_typeof(items) = 'array'),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists customer_saved_kits_user_updated_idx
  on public.customer_saved_kits (user_id, updated_at desc);

alter table public.customer_saved_kits enable row level security;

drop policy if exists "Customers can read their own saved kits" on public.customer_saved_kits;
create policy "Customers can read their own saved kits"
  on public.customer_saved_kits for select to authenticated
  using ((select auth.uid()) = user_id);

drop policy if exists "Customers can create their own saved kits" on public.customer_saved_kits;
create policy "Customers can create their own saved kits"
  on public.customer_saved_kits for insert to authenticated
  with check ((select auth.uid()) = user_id);

drop policy if exists "Customers can update their own saved kits" on public.customer_saved_kits;
create policy "Customers can update their own saved kits"
  on public.customer_saved_kits for update to authenticated
  using ((select auth.uid()) = user_id)
  with check ((select auth.uid()) = user_id);

drop policy if exists "Customers can delete their own saved kits" on public.customer_saved_kits;
create policy "Customers can delete their own saved kits"
  on public.customer_saved_kits for delete to authenticated
  using ((select auth.uid()) = user_id);

grant select, insert, update, delete on public.customer_saved_kits to authenticated;
