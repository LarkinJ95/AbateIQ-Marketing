export const DEFAULT_DASHBOARD_PATH = "/app";

export function getDashboardUrl(): string {
  return import.meta.env.VITE_DASHBOARD_URL || DEFAULT_DASHBOARD_PATH;
}

export function getApiBaseUrl(): string {
  return (import.meta.env.VITE_API_BASE || "").replace(/\/$/, "");
}

export function apiUrl(path: string): string {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  const base = getApiBaseUrl();
  return base ? `${base}${normalizedPath}` : normalizedPath;
}
