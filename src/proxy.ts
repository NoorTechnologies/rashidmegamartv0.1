import { NextRequest, NextResponse } from "next/server";
import { ADMIN_SESSION_COOKIE, verifyAdminSession } from "@/lib/admin-auth";

const MUTATING_METHODS = new Set(["POST", "PUT", "PATCH", "DELETE"]);

function hasValidOrigin(request: NextRequest) {
  const origin = request.headers.get("origin");
  if (!origin || origin !== request.nextUrl.origin) return false;

  const fetchSite = request.headers.get("sec-fetch-site");
  return !fetchSite || fetchSite === "same-origin";
}

export function proxy(request: NextRequest) {
  const { pathname, search } = request.nextUrl;

  // The login/logout endpoint performs its own origin and rate-limit checks.
  if (pathname === "/admin/login" || pathname === "/api/admin/auth") {
    return NextResponse.next();
  }

  // Reject cross-origin state changes before they reach an admin handler.
  if (pathname.startsWith("/api/admin/") && MUTATING_METHODS.has(request.method)) {
    if (!hasValidOrigin(request)) {
      return NextResponse.json(
        { message: "Request origin is not allowed." },
        { status: 403, headers: { "Cache-Control": "no-store" } },
      );
    }
  }

  const token = request.cookies.get(ADMIN_SESSION_COOKIE)?.value;
  if (verifyAdminSession(token)) {
    return NextResponse.next();
  }

  if (pathname.startsWith("/api/")) {
    return NextResponse.json(
      { message: "Unauthorized" },
      { status: 401, headers: { "Cache-Control": "no-store" } },
    );
  }

  const loginUrl = new URL("/admin/login", request.url);
  loginUrl.searchParams.set("next", `${pathname}${search}`);
  return NextResponse.redirect(loginUrl);
}

export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*"],
};
