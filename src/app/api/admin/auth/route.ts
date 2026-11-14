import { NextRequest, NextResponse } from "next/server";
import {
  ADMIN_SESSION_COOKIE,
  ADMIN_SESSION_MAX_AGE,
  createAdminSession,
  verifyAdminCredentials,
} from "@/lib/admin-auth";
import { checkAdminLoginRateLimit } from "@/lib/admin-rate-limit";

export const runtime = "nodejs";

function jsonError(message: string, status: number, headers?: HeadersInit) {
  return NextResponse.json(
    { message },
    { status, headers: { "Cache-Control": "no-store", ...headers } },
  );
}

function hasValidOrigin(request: NextRequest) {
  const origin = request.headers.get("origin");
  if (!origin || origin !== request.nextUrl.origin) return false;

  const fetchSite = request.headers.get("sec-fetch-site");
  return !fetchSite || fetchSite === "same-origin";
}

export async function POST(request: NextRequest) {
  if (!hasValidOrigin(request)) {
    return jsonError("Request origin is not allowed.", 403);
  }

  const contentType = request.headers.get("content-type") ?? "";
  if (!contentType.toLowerCase().includes("application/json")) {
    return jsonError("Content-Type must be application/json.", 415);
  }

  let rawBody: string;
  try {
    rawBody = await request.text();
  } catch {
    return jsonError("Invalid request.", 400);
  }

  if (Buffer.byteLength(rawBody, "utf8") > 8_192) {
    return jsonError("Request is too large.", 413);
  }

  let body: unknown;
  try {
    body = JSON.parse(rawBody);
  } catch {
    return jsonError("Invalid request.", 400);
  }

  if (typeof body !== "object" || body === null || !("action" in body)) {
    return jsonError("Invalid request.", 400);
  }

  if (body.action === "logout") {
    const response = NextResponse.json(
      { success: true },
      { headers: { "Cache-Control": "no-store" } },
    );
    response.cookies.set(ADMIN_SESSION_COOKIE, "", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
      maxAge: 0,
    });
    return response;
  }

  if (
    body.action !== "login" ||
    !("username" in body) ||
    !("password" in body) ||
    typeof body.username !== "string" ||
    typeof body.password !== "string" ||
    body.username.length < 1 ||
    body.username.length > 128 ||
    body.password.length < 1 ||
    body.password.length > 256 ||
    /[\u0000-\u001f\u007f]/.test(body.username)
  ) {
    return jsonError("Invalid credentials format.", 400);
  }

  if (
    !process.env.ADMIN_USERNAME ||
    !process.env.ADMIN_PASSWORD ||
    !process.env.ADMIN_SESSION_SECRET ||
    process.env.ADMIN_SESSION_SECRET.length < 32
  ) {
    return jsonError("Admin login is not configured.", 503);
  }

  let rateLimit;
  try {
    rateLimit = await checkAdminLoginRateLimit(request, body.username);
  } catch {
    // Fail closed: never allow password checks when the shared limiter is down.
    return jsonError("Login protection is temporarily unavailable. Please try again shortly.", 503);
  }

  if (!rateLimit.allowed) {
    return jsonError(
      "Too many login attempts. Please wait before trying again.",
      429,
      { "Retry-After": String(rateLimit.retry_after_seconds) },
    );
  }

  if (!verifyAdminCredentials(body.username, body.password)) {
    return jsonError("Username ya password galat hai.", 401);
  }

  const response = NextResponse.json(
    { success: true },
    { headers: { "Cache-Control": "no-store" } },
  );
  response.cookies.set(ADMIN_SESSION_COOKIE, createAdminSession(body.username), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    maxAge: ADMIN_SESSION_MAX_AGE,
  });

  return response;
}
