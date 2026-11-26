-- Retire customer account data access without deleting existing customer records.
revoke all privileges on table
  public.customer_profiles,
  public.customer_addresses,
  public.customer_saved_kits
from anon, authenticated;
