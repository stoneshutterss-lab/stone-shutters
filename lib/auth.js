// lib/auth.js
import crypto from "crypto";

const JWT_SECRET = process.env.ADMIN_JWT_SECRET || "stone-shutters-admin-session-secret-key-2026";
export const COOKIE_NAME = "stone_admin_session";

export const ADMIN_CREDENTIALS = {
  email: process.env.ADMIN_EMAIL || "stoneshutterss@gmail.com",
  password: process.env.ADMIN_PASSWORD || "Siddhu@0506",
};

/**
 * Base64URL encode/decode helpers
 */
function base64UrlEncode(str) {
  return Buffer.from(str)
    .toString("base64")
    .replace(/=/g, "")
    .replace(/\+/g, "-")
    .replace(/\//g, "_");
}

function base64UrlDecode(str) {
  let base64 = str.replace(/-/g, "+").replace(/_/g, "/");
  while (base64.length % 4) {
    base64 += "=";
  }
  return Buffer.from(base64, "base64").toString();
}

/**
 * Sign session token using native crypto (HMAC-SHA256)
 */
export function createSessionToken(payload = {}) {
  const header = JSON.stringify({ alg: "HS256", typ: "JWT" });
  const now = Math.floor(Date.now() / 1000);
  const data = JSON.stringify({
    ...payload,
    iat: now,
    exp: now + 60 * 60 * 24 * 7, // 7 days
  });

  const encodedHeader = base64UrlEncode(header);
  const encodedPayload = base64UrlEncode(data);

  const signature = crypto
    .createHmac("sha256", JWT_SECRET)
    .update(`${encodedHeader}.${encodedPayload}`)
    .digest("base64")
    .replace(/=/g, "")
    .replace(/\+/g, "-")
    .replace(/\//g, "_");

  return `${encodedHeader}.${encodedPayload}.${signature}`;
}

/**
 * Verify session token
 */
export function verifySessionToken(token) {
  if (!token || typeof token !== "string") return null;

  const parts = token.split(".");
  if (parts.length !== 3) return null;

  const [encodedHeader, encodedPayload, signature] = parts;

  const expectedSignature = crypto
    .createHmac("sha256", JWT_SECRET)
    .update(`${encodedHeader}.${encodedPayload}`)
    .digest("base64")
    .replace(/=/g, "")
    .replace(/\+/g, "-")
    .replace(/\//g, "_");

  if (signature !== expectedSignature) return null;

  try {
    const payload = JSON.parse(base64UrlDecode(encodedPayload));
    const now = Math.floor(Date.now() / 1000);
    if (payload.exp && payload.exp < now) {
      return null; // Expired
    }
    return payload;
  } catch {
    return null;
  }
}

/**
 * Verify credentials
 */
export function validateAdminCredentials(email, password) {
  const targetEmail = (ADMIN_CREDENTIALS.email || "").trim().toLowerCase();
  const inputEmail = (email || "").trim().toLowerCase();
  const targetPassword = ADMIN_CREDENTIALS.password || "";

  return inputEmail === targetEmail && password === targetPassword;
}
