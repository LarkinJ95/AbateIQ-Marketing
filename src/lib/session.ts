export interface AuthUser {
  id?: string;
  email: string;
  name?: string;
}

export interface AuthSession {
  accessToken: string;
  refreshToken?: string;
  expiresAt?: string;
  dashboardUrl?: string;
  user?: AuthUser;
}

const SESSION_STORAGE_KEY = "abateiq_session";

export function readSession(): AuthSession | null {
  const raw = localStorage.getItem(SESSION_STORAGE_KEY);
  if (!raw) {
    return null;
  }

  try {
    const parsed = JSON.parse(raw) as AuthSession;
    if (!parsed.accessToken) {
      return null;
    }

    return parsed;
  } catch {
    return null;
  }
}

export function saveSession(session: AuthSession): void {
  localStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(session));
}

export function clearSession(): void {
  localStorage.removeItem(SESSION_STORAGE_KEY);
}
