const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL ?? "";
const SUPABASE_KEY = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ?? "";
const SESSION_KEY = "rmm-supabase-session";

export type CustomerSession = {
  access_token: string;
  refresh_token: string;
  expires_at: number;
  user: { id: string; phone?: string; user_metadata?: Record<string, unknown> };
};

type AuthResponse = {
  access_token?: string;
  refresh_token?: string;
  expires_in?: number;
  user?: CustomerSession["user"];
};

function ensureConfig() {
  if (!SUPABASE_URL || !SUPABASE_KEY) {
    throw new Error("Account service is not configured yet. Please contact the store.");
  }
}

export function getCustomerSession(): CustomerSession | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(SESSION_KEY);
    if (!raw) return null;
    const value = JSON.parse(raw) as CustomerSession;
    if (!value.access_token || !value.refresh_token || !value.user?.id) return null;
    return value;
  } catch {
    return null;
  }
}

function saveSession(value: AuthResponse) {
  if (!value.access_token || !value.refresh_token || !value.user?.id) {
    throw new Error("We could not create a secure login session. Please try again.");
  }
  const session: CustomerSession = {
    access_token: value.access_token,
    refresh_token: value.refresh_token,
    expires_at: Math.floor(Date.now() / 1000) + (value.expires_in ?? 3600),
    user: value.user,
  };
  window.localStorage.setItem(SESSION_KEY, JSON.stringify(session));
  window.dispatchEvent(new Event("rmm-auth-change"));
  return session;
}

async function refreshCustomerSession() {
  ensureConfig();
  const current = getCustomerSession();
  if (!current?.refresh_token) return null;
  const response = await fetch(`${SUPABASE_URL}/auth/v1/token?grant_type=refresh_token`, {
    method: "POST",
    headers: { apikey: SUPABASE_KEY, "Content-Type": "application/json" },
    body: JSON.stringify({ refresh_token: current.refresh_token }),
  });
  if (!response.ok) {
    window.localStorage.removeItem(SESSION_KEY);
    window.dispatchEvent(new Event("rmm-auth-change"));
    return null;
  }
  return saveSession(await response.json() as AuthResponse);
}

export async function getValidCustomerSession() {
  const current = getCustomerSession();
  if (!current) return null;
  if (current.expires_at > Math.floor(Date.now() / 1000) + 60) return current;
  return refreshCustomerSession();
}

export async function sendPhoneOtp(phone: string) {
  ensureConfig();
  const response = await fetch(`${SUPABASE_URL}/auth/v1/otp`, {
    method: "POST",
    headers: { apikey: SUPABASE_KEY, "Content-Type": "application/json" },
    body: JSON.stringify({ phone: `+91${phone}`, create_user: true }),
  });
  const data = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(data.msg ?? data.message ?? "OTP could not be sent. Please try again.");
}

export async function verifyPhoneOtp(phone: string, token: string) {
  ensureConfig();
  const response = await fetch(`${SUPABASE_URL}/auth/v1/verify`, {
    method: "POST",
    headers: { apikey: SUPABASE_KEY, "Content-Type": "application/json" },
    body: JSON.stringify({ phone: `+91${phone}`, token, type: "sms" }),
  });
  const data = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(data.msg ?? data.message ?? "Incorrect or expired OTP.");
  return saveSession(data as AuthResponse);
}

export async function signOutCustomer() {
  ensureConfig();
  const session = await getValidCustomerSession();
  if (session) {
    await fetch(`${SUPABASE_URL}/auth/v1/logout`, {
      method: "POST",
      headers: { apikey: SUPABASE_KEY, Authorization: `Bearer ${session.access_token}` },
    }).catch(() => undefined);
  }
  window.localStorage.removeItem(SESSION_KEY);
  window.dispatchEvent(new Event("rmm-auth-change"));
}

export async function customerRequest<T>(path: string, init: RequestInit = {}): Promise<T> {
  ensureConfig();
  let session = await getValidCustomerSession();
  if (!session) throw new Error("Please sign in to continue.");
  const run = (token: string) => fetch(`${SUPABASE_URL}/rest/v1/${path}`, {
    ...init,
    headers: {
      apikey: SUPABASE_KEY,
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      ...(init.headers ?? {}),
    },
  });
  let response = await run(session.access_token);
  if (response.status === 401) {
    session = await refreshCustomerSession();
    if (!session) throw new Error("Your session expired. Please sign in again.");
    response = await run(session.access_token);
  }
  const body = await response.text();
  if (!response.ok) {
    let message = "We could not save your details. Please try again.";
    try {
      const parsed = JSON.parse(body);
      message = parsed.message ?? parsed.details ?? message;
    } catch { /* Keep the safe fallback. */ }
    throw new Error(message);
  }
  return (body ? JSON.parse(body) : null) as T;
}

export async function loadCustomerAccount(userId: string) {
  const [profiles, addresses, orders] = await Promise.all([
    customerRequest<Array<{ user_id: string; full_name: string; phone: string }>>(
      `customer_profiles?select=user_id,full_name,phone&user_id=eq.${encodeURIComponent(userId)}&limit=1`
    ),
    customerRequest<CustomerAddress[]>(
      `customer_addresses?select=id,label,recipient_name,phone,address_line1,address_line2,landmark,city,state,postal_code,is_default&user_id=eq.${encodeURIComponent(userId)}&order=is_default.desc,created_at.desc`
    ),
    customerRequest<CustomerOrder[]>(
      `customer_orders?select=id,customer_name,phone,items,subtotal,payment_preference,status,created_at&user_id=eq.${encodeURIComponent(userId)}&order=created_at.desc&limit=30`
    ),
  ]);
  return { profile: profiles[0] ?? null, addresses, orders };
}

export type CustomerAddress = {
  id: string; label: string; recipient_name: string; phone: string;
  address_line1: string; address_line2: string; landmark: string;
  city: string; state: string; postal_code: string; is_default: boolean;
};

export type CustomerOrder = {
  id: string; customer_name: string; phone: string; items: Array<{ name: string; quantity: number; unit_price: number; line_total: number }>;
  subtotal: number; payment_preference: "cod" | "upi" | "confirm"; status: string; created_at: string;
};

export async function saveCustomerProfile(userId: string, fullName: string, phone: string) {
  return customerRequest("customer_profiles?on_conflict=user_id", {
    method: "POST",
    headers: { Prefer: "resolution=merge-duplicates,return=representation" },
    body: JSON.stringify({ user_id: userId, full_name: fullName.trim(), phone }),
  });
}

export async function saveCustomerAddress(userId: string, value: Omit<CustomerAddress, "id">) {
  if (value.is_default) {
    await customerRequest(
      `customer_addresses?user_id=eq.${encodeURIComponent(userId)}`,
      { method: "PATCH", headers: { Prefer: "return=minimal" }, body: JSON.stringify({ is_default: false }) }
    );
  }
  return customerRequest<CustomerAddress[]>("customer_addresses", {
    method: "POST",
    headers: { Prefer: "return=representation" },
    body: JSON.stringify({ ...value, user_id: userId }),
  });
}


export async function updateCustomerAddress(userId: string, addressId: string, value: Omit<CustomerAddress, "id">) {
  if (value.is_default) {
    await customerRequest(
      `customer_addresses?user_id=eq.${encodeURIComponent(userId)}`,
      { method: "PATCH", headers: { Prefer: "return=minimal" }, body: JSON.stringify({ is_default: false }) }
    );
  }
  return customerRequest<CustomerAddress[]>(
    `customer_addresses?id=eq.${encodeURIComponent(addressId)}&user_id=eq.${encodeURIComponent(userId)}`,
    { method: "PATCH", headers: { Prefer: "return=representation" }, body: JSON.stringify(value) }
  );
}

export async function deleteCustomerAddress(userId: string, addressId: string) {
  return customerRequest(
    `customer_addresses?id=eq.${encodeURIComponent(addressId)}&user_id=eq.${encodeURIComponent(userId)}`,
    { method: "DELETE", headers: { Prefer: "return=minimal" } }
  );
}

export async function createCustomerOrder(input: {
  user_id: string; customer_name: string; phone: string;
  delivery_address: Record<string, string>; items: CustomerOrder["items"];
  subtotal: number; payment_preference: "cod" | "upi" | "confirm";
}) {
  const rows = await customerRequest<Array<{ id: string }>>("customer_orders", {
    method: "POST",
    headers: { Prefer: "return=representation" },
    body: JSON.stringify(input),
  });
  return rows[0];
}
