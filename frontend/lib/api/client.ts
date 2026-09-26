/**
 * Frontend API client — placeholder.
 * The real FastAPI backend will be wired in later. Do not invent endpoints.
 */

export interface ApiRequestOptions extends Omit<RequestInit, "body"> {
  body?: unknown;
  token?: string | null;
  signal?: AbortSignal;
}

export interface ApiConfig {
  baseUrl: string;
}

export const apiConfig: ApiConfig = {
  baseUrl: "",
};

/**
 * Real HTTP call. Kept here so all API modules use the same primitive
 * when the backend lands. For now, no callers exercise this.
 */
export async function apiFetch<T>(
  path: string,
  options: ApiRequestOptions = {},
): Promise<T> {
  const { body, token, headers, ...rest } = options;

  const res = await fetch(`${apiConfig.baseUrl}${path}`, {
    ...rest,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(headers ?? {}),
    },
    body: body !== undefined ? JSON.stringify(body) : undefined,
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(
      `API ${res.status} ${res.statusText}${text ? ` — ${text}` : ""}`,
    );
  }

  return (await res.json()) as T;
}