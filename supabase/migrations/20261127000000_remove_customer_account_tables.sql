-- Remove customer account-owned data tables after the account feature is retired.
drop table if exists public.customer_saved_kits;
drop table if exists public.customer_addresses;
drop table if exists public.customer_profiles;
