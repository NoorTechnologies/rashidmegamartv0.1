import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const authorization = request.headers.get("authorization");
  const accessToken = authorization?.startsWith("Bearer ")
    ? authorization.slice("Bearer ".length).trim()
    : "";

  if (!accessToken) {
    return NextResponse.json({ error: "Please log in again to continue." }, { status: 401 });
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const publishableKey =
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ??
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !publishableKey || !serviceRoleKey) {
    return NextResponse.json(
      { error: "Account deletion is not configured yet. Please contact support." },
      { status: 503 },
    );
  }

  const authClient = createClient(supabaseUrl, publishableKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
  const { data: authData, error: authError } = await authClient.auth.getUser(accessToken);

  if (authError || !authData.user) {
    return NextResponse.json({ error: "Your session has expired. Please log in again." }, { status: 401 });
  }

  const adminClient = createClient(supabaseUrl, serviceRoleKey, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
  const userId = authData.user.id;

  // Remove customer-owned data before deleting the Auth identity.
  // Each query is scoped to the verified user ID from Supabase Auth.
  const ownedTables = ["customer_saved_kits", "customer_addresses", "customer_profiles"] as const;

  for (const table of ownedTables) {
    const { error } = await adminClient.from(table).delete().eq("user_id", userId);
    if (error) {
      console.error("Account data deletion failed for table:", table, error.message);
      return NextResponse.json(
        { error: "Some account data could not be deleted. No further deletion was attempted; please contact support." },
        { status: 500 },
      );
    }
  }

  const { error: deleteUserError } = await adminClient.auth.admin.deleteUser(userId);
  if (deleteUserError) {
    console.error("Supabase Auth user deletion failed:", deleteUserError.message);
    return NextResponse.json(
      { error: "Your saved account data was removed, but the login account could not be deleted. Please contact support before trying again." },
      { status: 500 },
    );
  }

  return NextResponse.json({ success: true });
}
