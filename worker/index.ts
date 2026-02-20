import { EmailMessage } from "cloudflare:email";

interface AssetsBinding {
  fetch(input: RequestInfo | URL | string, init?: RequestInit): Promise<Response>;
}

interface SendEmailBinding {
  send(message: EmailMessage): Promise<void>;
}

interface Env {
  ASSETS: AssetsBinding;
  DB?: D1Database;
  APP_DASHBOARD_URL?: string;
  API_ORIGIN?: string;
  UPSTREAM_API_TOKEN?: string;
  CONTACT_TO_EMAIL?: string;
  CONTACT_FROM_EMAIL?: string;
  AUTH_LOGIN_PATH?: string;
  AUTH_FORGOT_PATH?: string;
  AUTH_TRIAL_PATH?: string;
  CONTACT_UPSTREAM_PATH?: string;
  WAITLIST_UPSTREAM_PATH?: string;
  EMAIL?: SendEmailBinding;
  GITHUB_OAUTH_ID?: string;
  GITHUB_OAUTH_SECRET?: string;
  GITHUB_REPO_PRIVATE?: string;
}

interface ContactSubmission {
  name: string;
  company: string;
  email: string;
  role: string;
  companySize: string;
  primaryHazard: string;
  message?: string;
}

interface WaitlistSubmission {
  name: string;
  organization: string;
  email: string;
  role?: string;
  phone?: string;
  teamSize?: string;
  notes?: string;
  source?: string;
}

interface AuthPayload {
  email: string;
  password: string;
}

interface TrialPayload {
  name: string;
  company: string;
  email: string;
  password: string;
}

interface AuthUserRow {
  user_id: string;
  email: string;
  name: string | null;
  password_hash: string;
}

const JSON_HEADERS = {
  "content-type": "application/json; charset=utf-8",
  "cache-control": "no-store",
};

const AUTH_PATHS: Record<string, keyof Env> = {
  "/api/auth/login": "AUTH_LOGIN_PATH",
  "/api/auth/forgot-password": "AUTH_FORGOT_PATH",
  "/api/auth/trial": "AUTH_TRIAL_PATH",
};

const DEFAULT_API_ORIGIN_PLACEHOLDER = "https://api.abateiq.com";
const DEFAULT_APP_DASHBOARD_URL = "https://app.abateiq.com";
const AUTH_HASH_ALGO = "pbkdf2_sha256";
const AUTH_HASH_DEFAULT_ITERATIONS = 100_000;

function jsonResponse(data: unknown, status = 200): Response {
  return new Response(JSON.stringify(data), {
    status,
    headers: JSON_HEADERS,
  });
}

async function parseJsonBody<T>(request: Request): Promise<T | null> {
  try {
    return (await request.json()) as T;
  } catch {
    return null;
  }
}

function trimTrailingSlash(url: string): string {
  return url.endsWith("/") ? url.slice(0, -1) : url;
}

function randomHex(bytes: number): string {
  const values = crypto.getRandomValues(new Uint8Array(bytes));
  return Array.from(values)
    .map((value) => value.toString(16).padStart(2, "0"))
    .join("");
}

function createOauthCallbackHtml(status: "success" | "error", payload: unknown): Response {
  const content = JSON.stringify(payload);
  const message = `authorization:github:${status}:${content}`;
  const html = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <title>Authorizing Decap...</title>
  </head>
  <body>
    <script>
      (function () {
        if (!window.opener) {
          return;
        }
        // Decap expects this handshake pattern from the OAuth popup.
        window.opener.postMessage('authorizing:github', '*');
        window.opener.postMessage('${message.replace(/'/g, "\\'")}', '*');
        setTimeout(function () {
          window.close();
        }, 300);
      })();
    </script>
  </body>
</html>`;

  return new Response(html, {
    headers: {
      "content-type": "text/html; charset=utf-8",
      "cache-control": "no-store",
    },
  });
}

async function handleCmsAuth(url: URL, env: Env): Promise<Response> {
  const provider = (url.searchParams.get("provider") || "github").toLowerCase();
  if (provider !== "github") {
    return jsonResponse({ ok: false, message: "Unsupported provider." }, 400);
  }

  if (!env.GITHUB_OAUTH_ID) {
    return jsonResponse({ ok: false, message: "Missing GITHUB_OAUTH_ID secret." }, 503);
  }

  const isPrivateRepo = Boolean(env.GITHUB_REPO_PRIVATE && env.GITHUB_REPO_PRIVATE !== "0");
  const scope = isPrivateRepo ? "repo,user" : "public_repo,user";
  const redirectUri = `https://${url.hostname}/api/cms/callback?provider=github`;
  const state = randomHex(16);

  const githubAuthUrl = new URL("https://github.com/login/oauth/authorize");
  githubAuthUrl.searchParams.set("client_id", env.GITHUB_OAUTH_ID);
  githubAuthUrl.searchParams.set("redirect_uri", redirectUri);
  githubAuthUrl.searchParams.set("scope", scope);
  githubAuthUrl.searchParams.set("state", state);

  return Response.redirect(githubAuthUrl.toString(), 302);
}

async function handleCmsCallback(url: URL, env: Env): Promise<Response> {
  const provider = (url.searchParams.get("provider") || "github").toLowerCase();
  if (provider !== "github") {
    return createOauthCallbackHtml("error", { error: "Unsupported provider." });
  }

  if (!env.GITHUB_OAUTH_ID || !env.GITHUB_OAUTH_SECRET) {
    return createOauthCallbackHtml("error", {
      error: "Missing GITHUB_OAUTH_ID or GITHUB_OAUTH_SECRET.",
    });
  }

  const code = url.searchParams.get("code");
  if (!code) {
    return createOauthCallbackHtml("error", { error: "Missing OAuth code." });
  }

  const redirectUri = `https://${url.hostname}/api/cms/callback?provider=github`;
  const tokenResponse = await fetch("https://github.com/login/oauth/access_token", {
    method: "POST",
    headers: {
      "content-type": "application/json",
      accept: "application/json",
    },
    body: JSON.stringify({
      client_id: env.GITHUB_OAUTH_ID,
      client_secret: env.GITHUB_OAUTH_SECRET,
      code,
      redirect_uri: redirectUri,
    }),
  });

  if (!tokenResponse.ok) {
    return createOauthCallbackHtml("error", {
      error: `GitHub token exchange failed (${tokenResponse.status}).`,
    });
  }

  const payload = (await tokenResponse.json()) as {
    access_token?: string;
    error?: string;
    error_description?: string;
  };

  if (!payload.access_token) {
    return createOauthCallbackHtml("error", {
      error: payload.error || "Token not returned by GitHub.",
      error_description: payload.error_description,
    });
  }

  return createOauthCallbackHtml("success", { token: payload.access_token, provider: "github" });
}

function buildUpstreamUrl(origin: string, path: string): string {
  const safePath = path.startsWith("/") ? path : `/${path}`;
  return `${trimTrailingSlash(origin)}${safePath}`;
}

function getConfiguredApiOrigin(env: Env): string | null {
  const raw = (env.API_ORIGIN || "").trim();
  if (!raw || raw === DEFAULT_API_ORIGIN_PLACEHOLDER) {
    return null;
  }
  return raw;
}

function normalizeEmail(email: string): string {
  return email.trim().toLowerCase();
}

function looksLikeEmail(email: string): boolean {
  return /.+@.+\..+/.test(email);
}

function timingSafeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) {
    return false;
  }

  let mismatch = 0;
  for (let i = 0; i < a.length; i += 1) {
    mismatch |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }

  return mismatch === 0;
}

function bytesToBase64(bytes: Uint8Array): string {
  let binary = "";
  for (const value of bytes) {
    binary += String.fromCharCode(value);
  }
  return btoa(binary);
}

function base64ToBytes(base64: string): Uint8Array {
  const binary = atob(base64);
  const out = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i += 1) {
    out[i] = binary.charCodeAt(i);
  }
  return out;
}

async function derivePbkdf2Sha256(
  password: string,
  salt: Uint8Array,
  iterations: number,
): Promise<Uint8Array> {
  const keyMaterial = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(password),
    "PBKDF2",
    false,
    ["deriveBits"],
  );

  const bits = await crypto.subtle.deriveBits(
    {
      name: "PBKDF2",
      hash: "SHA-256",
      iterations,
      salt: new Uint8Array(salt),
    },
    keyMaterial,
    256,
  );

  return new Uint8Array(bits);
}

function parseStoredPasswordHash(stored: string): {
  iterations: number;
  salt: Uint8Array;
  expectedHashBase64: string;
} | null {
  const parts = stored.split("$");
  if (parts.length !== 4) {
    return null;
  }

  const [algorithm, iterationsRaw, saltBase64, hashBase64] = parts;
  if (algorithm !== AUTH_HASH_ALGO) {
    return null;
  }

  const iterations = Number.parseInt(iterationsRaw, 10);
  if (!Number.isFinite(iterations) || iterations <= 0) {
    return null;
  }

  try {
    const salt = base64ToBytes(saltBase64);
    if (salt.length === 0) {
      return null;
    }

    return {
      iterations,
      salt,
      expectedHashBase64: hashBase64,
    };
  } catch {
    return null;
  }
}

async function verifyPasswordAgainstStoredHash(
  password: string,
  storedHash: string,
): Promise<boolean> {
  const parsed = parseStoredPasswordHash(storedHash);
  if (!parsed) {
    return false;
  }

  const derived = await derivePbkdf2Sha256(password, parsed.salt, parsed.iterations);
  const derivedBase64 = bytesToBase64(derived);
  return timingSafeEqual(derivedBase64, parsed.expectedHashBase64);
}

async function createStoredPasswordHash(password: string): Promise<string> {
  const salt = crypto.getRandomValues(new Uint8Array(16));
  const hash = await derivePbkdf2Sha256(password, salt, AUTH_HASH_DEFAULT_ITERATIONS);

  return `${AUTH_HASH_ALGO}$${AUTH_HASH_DEFAULT_ITERATIONS}$${bytesToBase64(salt)}$${bytesToBase64(hash)}`;
}

function createSessionPayload(
  env: Env,
  user: { id: string; email: string; name?: string | null },
  sessionId: string,
  expiresAtMs: number,
) {
  const dashboardUrl =
    (env.APP_DASHBOARD_URL || "").trim() || DEFAULT_APP_DASHBOARD_URL;

  return {
    accessToken: sessionId,
    expiresAt: new Date(expiresAtMs).toISOString(),
    dashboardUrl,
    user: {
      id: user.id,
      email: user.email,
      name: user.name || undefined,
    },
  };
}

async function createAuthSession(env: Env, request: Request, userId: string): Promise<{ sessionId: string; expiresAtMs: number }> {
  if (!env.DB) {
    throw new Error("DB binding is not configured.");
  }

  const now = Date.now();
  const expiresAtMs = now + 1000 * 60 * 60 * 12;
  const sessionId = crypto.randomUUID();
  const userAgent = request.headers.get("user-agent");
  const ipAddress = request.headers.get("CF-Connecting-IP") || request.headers.get("x-forwarded-for");

  await env.DB.prepare(
    `INSERT INTO auth_sessions
      (session_id, user_id, created_at, expires_at, user_agent, ip_address)
     VALUES (?, ?, ?, ?, ?, ?)`
  )
    .bind(sessionId, userId, now, expiresAtMs, userAgent, ipAddress)
    .run();

  return { sessionId, expiresAtMs };
}

async function proxyJson(request: Request, env: Env, upstreamPath: string): Promise<Response> {
  const apiOrigin = getConfiguredApiOrigin(env);
  if (!apiOrigin) {
    return jsonResponse(
      {
        ok: false,
        message: "API_ORIGIN is not configured on this Worker. Set a real backend origin.",
      },
      503,
    );
  }

  const url = buildUpstreamUrl(apiOrigin, upstreamPath);
  const body = request.method === "GET" || request.method === "HEAD" ? undefined : await request.text();
  const headers = new Headers();

  headers.set("content-type", "application/json");

  if (env.UPSTREAM_API_TOKEN) {
    headers.set("authorization", `Bearer ${env.UPSTREAM_API_TOKEN}`);
  }

  const authHeader = request.headers.get("authorization");
  if (authHeader) {
    headers.set("authorization", authHeader);
  }

  const response = await fetch(url, {
    method: request.method,
    headers,
    body,
  });

  if (!response.ok) {
    let errorText = "";
    try {
      errorText = await response.text();
    } catch {
      errorText = "";
    }

    const isCloudflare1016 =
      response.status === 530 &&
      (errorText.includes("1016") || errorText.includes("Origin DNS error"));

    if (isCloudflare1016) {
      return jsonResponse(
        {
          ok: false,
          message:
            "Upstream API DNS/origin error (Cloudflare 1016). Verify API_ORIGIN points to a resolvable backend host.",
          errors: [`API_ORIGIN=${apiOrigin}`, `upstream_path=${upstreamPath}`],
        },
        502,
      );
    }

    return jsonResponse(
      {
        ok: false,
        message: `Upstream API returned ${response.status}.`,
        errors: [errorText.slice(0, 300)],
      },
      response.status,
    );
  }

  return new Response(response.body, {
    status: response.status,
    headers: {
      ...Object.fromEntries(response.headers.entries()),
      "cache-control": "no-store",
    },
  });
}

function validateContact(payload: ContactSubmission | null): string | null {
  if (!payload) {
    return "Invalid JSON payload.";
  }

  const requiredFields: Array<keyof ContactSubmission> = [
    "name",
    "company",
    "email",
    "role",
    "companySize",
    "primaryHazard",
  ];

  for (const field of requiredFields) {
    if (!String(payload[field] || "").trim()) {
      return `Missing required field: ${field}`;
    }
  }

  if (!looksLikeEmail(payload.email)) {
    return "Invalid email address.";
  }

  return null;
}

function validateWaitlist(payload: WaitlistSubmission | null): string | null {
  if (!payload) {
    return "Invalid JSON payload.";
  }

  if (!String(payload.name || "").trim()) {
    return "Missing required field: name";
  }

  if (!String(payload.organization || "").trim()) {
    return "Missing required field: organization";
  }

  if (!String(payload.email || "").trim()) {
    return "Missing required field: email";
  }

  if (!looksLikeEmail(payload.email)) {
    return "Invalid email address.";
  }

  return null;
}

async function sendContactEmail(payload: ContactSubmission, env: Env): Promise<void> {
  if (!env.EMAIL || !env.CONTACT_TO_EMAIL || !env.CONTACT_FROM_EMAIL) {
    throw new Error("Missing email binding or destination/sender configuration.");
  }

  const subject = `New AbateIQ demo request: ${payload.company}`;
  const textBody = [
    "New contact form submission",
    "",
    `Name: ${payload.name}`,
    `Company: ${payload.company}`,
    `Email: ${payload.email}`,
    `Role: ${payload.role}`,
    `Company Size: ${payload.companySize}`,
    `Primary Hazard: ${payload.primaryHazard}`,
    `Message: ${payload.message || "(none)"}`,
  ].join("\n");

  const rawEmail = [
    `From: AbateIQ Website <${env.CONTACT_FROM_EMAIL}>`,
    `To: ${env.CONTACT_TO_EMAIL}`,
    `Subject: ${subject}`,
    "MIME-Version: 1.0",
    "Content-Type: text/plain; charset=UTF-8",
    "",
    textBody,
  ].join("\r\n");

  await env.EMAIL.send(
    new EmailMessage(env.CONTACT_FROM_EMAIL, env.CONTACT_TO_EMAIL, rawEmail),
  );
}

async function sendWaitlistEmail(payload: WaitlistSubmission, env: Env): Promise<void> {
  if (!env.EMAIL || !env.CONTACT_TO_EMAIL || !env.CONTACT_FROM_EMAIL) {
    throw new Error("Missing email binding or destination/sender configuration.");
  }

  const subject = `New AbateIQ iOS waitlist signup: ${payload.organization}`;
  const textBody = [
    "New iOS waitlist submission",
    "",
    `Name: ${payload.name}`,
    `Organization: ${payload.organization}`,
    `Email: ${payload.email}`,
    `Role: ${payload.role || "(none)"}`,
    `Phone: ${payload.phone || "(none)"}`,
    `Team Size: ${payload.teamSize || "(none)"}`,
    `Notes: ${payload.notes || "(none)"}`,
    `Source: ${payload.source || "ios-release-modal"}`,
  ].join("\n");

  const rawEmail = [
    `From: AbateIQ Website <${env.CONTACT_FROM_EMAIL}>`,
    `To: ${env.CONTACT_TO_EMAIL}`,
    `Subject: ${subject}`,
    "MIME-Version: 1.0",
    "Content-Type: text/plain; charset=UTF-8",
    "",
    textBody,
  ].join("\r\n");

  await env.EMAIL.send(
    new EmailMessage(env.CONTACT_FROM_EMAIL, env.CONTACT_TO_EMAIL, rawEmail),
  );
}

async function saveContactToD1(payload: ContactSubmission, env: Env): Promise<void> {
  if (!env.DB) {
    throw new Error("D1 binding is not configured.");
  }

  await env.DB.prepare(
    `INSERT INTO contact_submissions
      (name, company, email, role, company_size, primary_hazard, message, created_at)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?)`
  )
    .bind(
      payload.name.trim(),
      payload.company.trim(),
      normalizeEmail(payload.email),
      payload.role,
      payload.companySize,
      payload.primaryHazard,
      payload.message?.trim() || null,
      new Date().toISOString(),
    )
    .run();
}

async function saveWaitlistToD1(payload: WaitlistSubmission, env: Env): Promise<void> {
  if (!env.DB) {
    throw new Error("D1 binding is not configured.");
  }

  await env.DB.prepare(
    `INSERT INTO waitlist_submissions
      (name, organization, email, role, phone, team_size, notes, source, created_at)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`
  )
    .bind(
      payload.name.trim(),
      payload.organization.trim(),
      normalizeEmail(payload.email),
      payload.role?.trim() || null,
      payload.phone?.trim() || null,
      payload.teamSize?.trim() || null,
      payload.notes?.trim() || null,
      payload.source?.trim() || "ios-release-modal",
      new Date().toISOString(),
    )
    .run();
}

async function handleContact(request: Request, env: Env): Promise<Response> {
  if (request.method !== "POST") {
    return jsonResponse({ ok: false, message: "Method not allowed." }, 405);
  }

  const payload = await parseJsonBody<ContactSubmission>(request);
  const validationError = validateContact(payload);
  if (validationError) {
    return jsonResponse({ ok: false, message: validationError }, 400);
  }

  const apiOrigin = getConfiguredApiOrigin(env);
  const configuredForUpstream = Boolean(apiOrigin);
  const configuredForEmail = Boolean(env.EMAIL && env.CONTACT_TO_EMAIL && env.CONTACT_FROM_EMAIL);
  const configuredForD1 = Boolean(env.DB);

  if (!configuredForUpstream && !configuredForEmail && !configuredForD1) {
    return jsonResponse(
      {
        ok: false,
        message: "No contact handlers configured. Configure API_ORIGIN, EMAIL binding, or D1 DB.",
      },
      503,
    );
  }

  const errors: string[] = [];
  let deliveredToUpstream = false;
  let deliveredByEmail = false;
  let storedInD1 = false;

  if (configuredForUpstream) {
    try {
      const upstreamPath = env.CONTACT_UPSTREAM_PATH || "/marketing/contact";
      const upstreamResponse = await fetch(buildUpstreamUrl(apiOrigin!, upstreamPath), {
        method: "POST",
        headers: {
          "content-type": "application/json",
          ...(env.UPSTREAM_API_TOKEN
            ? { authorization: `Bearer ${env.UPSTREAM_API_TOKEN}` }
            : {}),
        },
        body: JSON.stringify(payload),
      });

      if (!upstreamResponse.ok) {
        errors.push(`Upstream API returned ${upstreamResponse.status}.`);
      } else {
        deliveredToUpstream = true;
      }
    } catch {
      errors.push("Upstream API request failed.");
    }
  }

  if (configuredForEmail) {
    try {
      await sendContactEmail(payload!, env);
      deliveredByEmail = true;
    } catch {
      errors.push("Email delivery failed. Verify Email Routing, sender domain, and destination address.");
    }
  }

  if (configuredForD1) {
    try {
      await saveContactToD1(payload!, env);
      storedInD1 = true;
    } catch {
      errors.push("D1 contact storage failed. Ensure contact_submissions table exists.");
    }
  }

  if (!deliveredToUpstream && !deliveredByEmail && !storedInD1) {
    return jsonResponse(
      {
        ok: false,
        message: "Contact submission failed.",
        errors,
      },
      502,
    );
  }

  return jsonResponse({
    ok: true,
    message: "Contact request received.",
    deliveredToUpstream,
    deliveredByEmail,
    storedInD1,
  });
}

async function handleWaitlist(request: Request, env: Env): Promise<Response> {
  if (request.method !== "POST") {
    return jsonResponse({ ok: false, message: "Method not allowed." }, 405);
  }

  const payload = await parseJsonBody<WaitlistSubmission>(request);
  const validationError = validateWaitlist(payload);
  if (validationError) {
    return jsonResponse({ ok: false, message: validationError }, 400);
  }

  const apiOrigin = getConfiguredApiOrigin(env);
  const configuredForUpstream = Boolean(apiOrigin);
  const configuredForEmail = Boolean(env.EMAIL && env.CONTACT_TO_EMAIL && env.CONTACT_FROM_EMAIL);
  const configuredForD1 = Boolean(env.DB);

  if (!configuredForUpstream && !configuredForEmail && !configuredForD1) {
    return jsonResponse(
      {
        ok: false,
        message: "No waitlist handlers configured. Configure API_ORIGIN, EMAIL binding, or D1 DB.",
      },
      503,
    );
  }

  const errors: string[] = [];
  let deliveredToUpstream = false;
  let deliveredByEmail = false;
  let storedInD1 = false;

  if (configuredForUpstream) {
    try {
      const upstreamPath = env.WAITLIST_UPSTREAM_PATH || "/marketing/waitlist";
      const upstreamResponse = await fetch(buildUpstreamUrl(apiOrigin!, upstreamPath), {
        method: "POST",
        headers: {
          "content-type": "application/json",
          ...(env.UPSTREAM_API_TOKEN
            ? { authorization: `Bearer ${env.UPSTREAM_API_TOKEN}` }
            : {}),
        },
        body: JSON.stringify(payload),
      });

      if (!upstreamResponse.ok) {
        errors.push(`Upstream API returned ${upstreamResponse.status}.`);
      } else {
        deliveredToUpstream = true;
      }
    } catch {
      errors.push("Upstream API request failed.");
    }
  }

  if (configuredForEmail) {
    try {
      await sendWaitlistEmail(payload!, env);
      deliveredByEmail = true;
    } catch {
      errors.push("Email delivery failed. Verify Email Routing, sender domain, and destination address.");
    }
  }

  if (configuredForD1) {
    try {
      await saveWaitlistToD1(payload!, env);
      storedInD1 = true;
    } catch {
      errors.push("D1 waitlist storage failed. Ensure waitlist_submissions table exists.");
    }
  }

  if (!deliveredToUpstream && !deliveredByEmail && !storedInD1) {
    return jsonResponse(
      {
        ok: false,
        message: "Waitlist submission failed.",
        errors,
      },
      502,
    );
  }

  return jsonResponse({
    ok: true,
    message: "Waitlist submission received.",
    deliveredToUpstream,
    deliveredByEmail,
    storedInD1,
  });
}

async function handleD1SignIn(request: Request, env: Env): Promise<Response> {
  if (!env.DB) {
    return jsonResponse({ ok: false, message: "DB binding is not configured." }, 503);
  }

  const payload = await parseJsonBody<AuthPayload>(request);
  if (!payload) {
    return jsonResponse({ ok: false, message: "Invalid JSON payload." }, 400);
  }

  const email = normalizeEmail(payload.email || "");
  const password = payload.password || "";

  if (!looksLikeEmail(email) || !password) {
    return jsonResponse({ ok: false, message: "Email and password are required." }, 400);
  }

  let user: AuthUserRow | null;
  try {
    user = await env.DB.prepare(
      "SELECT user_id, email, name, password_hash FROM auth_users WHERE email = ? LIMIT 1"
    )
      .bind(email)
      .first<AuthUserRow>();
  } catch {
    return jsonResponse(
      { ok: false, message: "Auth tables missing. Expected auth_users/auth_sessions in D1." },
      500,
    );
  }

  if (!user) {
    return jsonResponse({ ok: false, message: "Invalid email or password." }, 401);
  }

  const passwordValid = await verifyPasswordAgainstStoredHash(password, user.password_hash);
  if (!passwordValid) {
    return jsonResponse({ ok: false, message: "Invalid email or password." }, 401);
  }

  const now = Date.now();
  await env.DB.prepare(
    "UPDATE auth_users SET last_login_at = ?, updated_at = ? WHERE user_id = ?"
  )
    .bind(now, now, user.user_id)
    .run();

  const { sessionId, expiresAtMs } = await createAuthSession(env, request, user.user_id);

  return jsonResponse(
    createSessionPayload(
      env,
      {
        id: user.user_id,
        email: user.email,
        name: user.name,
      },
      sessionId,
      expiresAtMs,
    ),
  );
}

async function handleD1Trial(request: Request, env: Env): Promise<Response> {
  if (!env.DB) {
    return jsonResponse({ ok: false, message: "DB binding is not configured." }, 503);
  }

  const payload = await parseJsonBody<TrialPayload>(request);
  if (!payload) {
    return jsonResponse({ ok: false, message: "Invalid JSON payload." }, 400);
  }

  const name = (payload.name || "").trim();
  const company = (payload.company || "").trim();
  const email = normalizeEmail(payload.email || "");
  const password = payload.password || "";

  if (!name || !company || !looksLikeEmail(email) || password.length < 8) {
    return jsonResponse(
      { ok: false, message: "Name, company, valid email, and password (8+ chars) are required." },
      400,
    );
  }

  const userId = crypto.randomUUID();
  const passwordHash = await createStoredPasswordHash(password);
  const now = Date.now();

  try {
    await env.DB.prepare(
      `INSERT INTO auth_users
        (user_id, email, password_hash, name, created_at, updated_at, last_login_at)
       VALUES (?, ?, ?, ?, ?, ?, ?)`
    )
      .bind(userId, email, passwordHash, name, now, now, now)
      .run();

    const { sessionId, expiresAtMs } = await createAuthSession(env, request, userId);

    return jsonResponse(
      createSessionPayload(
        env,
        {
          id: userId,
          email,
          name,
        },
        sessionId,
        expiresAtMs,
      ),
      201,
    );
  } catch (error) {
    const message = String(error || "");
    if (message.includes("auth_users_email_unique") || message.includes("UNIQUE")) {
      return jsonResponse({ ok: false, message: "An account with this email already exists." }, 409);
    }

    return jsonResponse({ ok: false, message: "Unable to create trial account." }, 500);
  }
}

async function handleD1ForgotPassword(request: Request, env: Env): Promise<Response> {
  if (!env.DB) {
    return jsonResponse({ ok: false, message: "DB binding is not configured." }, 503);
  }

  const payload = await parseJsonBody<{ email: string }>(request);
  if (!payload) {
    return jsonResponse({ ok: false, message: "Invalid JSON payload." }, 400);
  }

  const email = normalizeEmail(payload.email || "");
  if (!looksLikeEmail(email)) {
    return jsonResponse({ ok: false, message: "Valid email is required." }, 400);
  }

  try {
    const user = await env.DB.prepare("SELECT user_id FROM auth_users WHERE email = ? LIMIT 1")
      .bind(email)
      .first<{ user_id: string }>();

    if (user) {
      await env.DB.prepare(
        `INSERT INTO password_reset_requests (email, token, created_at)
         VALUES (?, ?, ?)`
      )
        .bind(email, crypto.randomUUID(), new Date().toISOString())
        .run();
    }
  } catch {
    return jsonResponse(
      { ok: false, message: "Password reset flow not initialized. Ensure password_reset_requests table exists." },
      500,
    );
  }

  return jsonResponse({
    ok: true,
    message: "If this email exists, a password reset request has been created.",
  });
}

async function handleAuth(request: Request, env: Env, pathname: string): Promise<Response> {
  if (request.method !== "POST") {
    return jsonResponse({ ok: false, message: "Method not allowed." }, 405);
  }

  const apiOrigin = getConfiguredApiOrigin(env);
  if (apiOrigin) {
    const configKey = AUTH_PATHS[pathname];
    const upstreamPath = (env[configKey] as string | undefined) || pathname;
    return proxyJson(request, env, upstreamPath);
  }

  if (!env.DB) {
    return jsonResponse(
      {
        ok: false,
        message: "Auth backend is not configured. Set API_ORIGIN or configure D1 DB binding.",
      },
      503,
    );
  }

  if (pathname === "/api/auth/login") {
    return handleD1SignIn(request, env);
  }

  if (pathname === "/api/auth/trial") {
    return handleD1Trial(request, env);
  }

  if (pathname === "/api/auth/forgot-password") {
    return handleD1ForgotPassword(request, env);
  }

  return jsonResponse({ ok: false, message: "Unknown auth route." }, 404);
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);

    if (url.pathname === "/auth" || url.pathname === "/api/cms/auth") {
      return handleCmsAuth(url, env);
    }

    if (url.pathname === "/callback" || url.pathname === "/api/cms/callback") {
      return handleCmsCallback(url, env);
    }

    if (url.pathname === "/api/health") {
      return jsonResponse({
        ok: true,
        service: "abateiq-marketing-worker",
        hasUpstreamAuth: Boolean(getConfiguredApiOrigin(env)),
        hasD1: Boolean(env.DB),
      });
    }

    if (url.pathname === "/api/contact") {
      return handleContact(request, env);
    }

    if (url.pathname === "/api/waitlist") {
      return handleWaitlist(request, env);
    }

    if (url.pathname in AUTH_PATHS) {
      return handleAuth(request, env, url.pathname);
    }

    if (url.pathname.startsWith("/api/")) {
      return jsonResponse({ ok: false, message: "API route not found." }, 404);
    }

    return env.ASSETS.fetch(request);
  },
};
