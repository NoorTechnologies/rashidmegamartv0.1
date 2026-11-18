import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const authorization = request.headers.get("authorization") ?? "";
  const accessToken = authorization.startsWith("Bearer ")
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

  try {
    const authClient = createClient(supabaseUrl, publishableKey, {
      auth: { persistSession: false, autoRefreshToken: false },
    });
    const { data, error: authError } = await authClient.auth.getUser(accessToken);

    if (authError || !data.user) {
      return NextResponse.json(
        { error: "Your session has expired. Please log in again." },
        { status: 401 },
      );
    }

    const adminClient = createClient(supabaseUrl, serviceRoleKey, {
      auth: { persistSession: false, autoRefreshToken: false },
    });

    // These account-owned tables reference auth.users with ON DELETE CASCADE.
    // Deleting the verified Auth user removes profile, addresses and saved kits
    // through the database foreign keys, avoiding a partially deleted account.
    const { error: deleteError } = await adminClient.auth.admin.deleteUser(data.user.id);

    if (deleteError) {
      console.error("Supabase Auth user deletion failed:", deleteError.message);
      return NextResponse.json(
        { error: "Account could not be deleted. Your data has not been intentionally changed; please try again or contact support." },
        { status: 500 },
      );
    }

    return NextResponse.json({ success: true });
  } catch (cause) {
    console.error(
      "Unexpected account deletion error:",
      cause instanceof Error ? cause.message : "Unknown error",
    );
    return NextResponse.json(
      { error: "Something went wrong while deleting the account. Please contact support." },
      { status: 500 },
    );
  }
}
