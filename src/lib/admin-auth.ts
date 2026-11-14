import { createHmac, timingSafeEqual } from "node:crypto";

export const ADMIN_SESSION_COOKIE = "rmm_admin_session";
const SESSION_TTL_SECONDS = 60 * 60 * 8;

function getSecret() {
  const secret = process.env.ADMIN_SESSION_SECRET;
  if (!secret || secret.length < 32) return null;
  return secret;
}

function safeEqual(left: string, right: string) {
  const leftBuffer = Buffer.from(left);
  const rightBuffer = Buffer.from(right);
  return leftBuffer.length === rightBuffer.length && timingSafeEqual(leftBuffer, rightBuffer);
}

function sign(value: string, secret: string) {
  return createHmac("sha256", secret).update(value).digest("base64url");
}

export function verifyAdminCredentials(username: string, password: string) {
  const expectedUsername = process.env.ADMIN_USERNAME;
  const expectedPassword = process.env.ADMIN_PASSWORD;

  if (!expectedUsername || !expectedPassword || !getSecret()) return false;
  return safeEqual(username, expectedUsername) && safeEqual(password, expectedPassword);
}

export function createAdminSession(username: string) {
  const secret = getSecret();
  if (!secret) throw new Error("ADMIN_SESSION_SECRET must contain at least 32 characters.");

  const payload = Buffer.from(
    JSON.stringify({
      sub: username,
      exp: Math.floor(Date.now() / 1000) + SESSION_TTL_SECONDS,
    }),
  ).toString("base64url");

  return `${payload}.${sign(payload, secret)}`;
}

export function verifyAdminSession(token: string | undefined) {
  const secret = getSecret();
  const expectedUsername = process.env.ADMIN_USERNAME;
  if (!token || !secret || !expectedUsername) return false;

  const [payload, signature, extra] = token.split(".");
  if (!payload || !signature || extra !== undefined) return false;

  const expectedSignature = sign(payload, secret);
  if (!safeEqual(signature, expectedSignature)) return false;

  try {
    const session: unknown = JSON.parse(Buffer.from(payload, "base64url").toString("utf8"));
    if (
      typeof session !== "object" ||
      session === null ||
      !("sub" in session) ||
      !("exp" in session) ||
      session.sub !== expectedUsername ||
      typeof session.exp !== "number"
    ) {
      return false;
    }

    return session.exp > Math.floor(Date.now() / 1000);
  } catch {
    return false;
  }
}

export const ADMIN_SESSION_MAX_AGE = SESSION_TTL_SECONDS;
