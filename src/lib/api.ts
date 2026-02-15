import type { AuthSession } from "./session";
import { apiUrl } from "./env";

export interface ContactSubmission {
  name: string;
  company: string;
  email: string;
  role: string;
  companySize: string;
  primaryHazard: string;
  message?: string;
}

export interface WaitlistSubmission {
  name: string;
  organization: string;
  email: string;
  role?: string;
  phone?: string;
  teamSize?: string;
  notes?: string;
  source?: string;
}

export interface TrialPayload {
  name: string;
  email: string;
  company: string;
  password: string;
}

export interface ApiOkResponse {
  ok: true;
  message?: string;
}

interface ApiErrorPayload {
  message?: string;
  errors?: string[];
  [key: string]: unknown;
}

export class ApiError extends Error {
  readonly status: number;
  readonly details?: ApiErrorPayload;

  constructor(message: string, status: number, details?: ApiErrorPayload) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.details = details;
  }
}

async function parseResponse(response: Response): Promise<unknown> {
  const contentType = response.headers.get("content-type") || "";
  if (contentType.includes("application/json")) {
    return response.json();
  }

  const text = await response.text();
  if (!text) {
    return null;
  }

  return { message: text };
}

async function apiRequest<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(apiUrl(path), {
    headers: {
      "Content-Type": "application/json",
      ...(init?.headers || {}),
    },
    ...init,
  });

  const payload = (await parseResponse(response)) as ApiErrorPayload | null;

  if (!response.ok) {
    const message =
      typeof payload === "object" && payload !== null && "message" in payload
        ? String(payload.message)
        : `Request failed (${response.status})`;

    throw new ApiError(message, response.status, payload);
  }

  return payload as T;
}

export async function signIn(email: string, password: string): Promise<AuthSession> {
  return apiRequest<AuthSession>("/api/auth/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });
}

export async function requestPasswordReset(email: string): Promise<ApiOkResponse> {
  return apiRequest<ApiOkResponse>("/api/auth/forgot-password", {
    method: "POST",
    body: JSON.stringify({ email }),
  });
}

export async function startTrial(payload: TrialPayload): Promise<AuthSession> {
  return apiRequest<AuthSession>("/api/auth/trial", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export async function submitContactSubmission(
  payload: ContactSubmission,
): Promise<ApiOkResponse> {
  return apiRequest<ApiOkResponse>("/api/contact", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export async function submitWaitlistSubmission(
  payload: WaitlistSubmission,
): Promise<ApiOkResponse> {
  return apiRequest<ApiOkResponse>("/api/waitlist", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}
