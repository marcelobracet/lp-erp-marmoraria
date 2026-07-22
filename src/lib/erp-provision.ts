const DEFAULT_API = "http://127.0.0.1:8080";

export type ProvisionPayload = {
  company_name: string;
  admin_name: string;
  admin_email: string;
  admin_password: string;
  plan: "essencial" | "profissional";
  trade_name?: string;
  phone?: string;
};

export type ProvisionSuccess = {
  tenant: { id: string; company_name: string; plan: string; status: string };
  auth: {
    access_token: string;
    refresh_token: string;
    expires_in: number;
    token_type: string;
  };
};

function apiBase(): string {
  const base = process.env.NEXT_PUBLIC_ERP_API_URL?.replace(/\/+$/, "") ?? "";
  return base || DEFAULT_API;
}

/**
 * Creates tenant + admin and returns JWTs (trial starts per API / TENANT_FREE_TRIAL_DAYS).
 */
export async function provisionTenant(
  payload: ProvisionPayload
): Promise<ProvisionSuccess> {
  const url = `${apiBase()}/api/v1/auth/provision`;
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify(payload),
  });

  const data = (await res.json().catch(() => ({}))) as
    | ProvisionSuccess
    | { error?: string; message?: string };

  if (!res.ok) {
    const msg =
      typeof data === "object" && data !== null && "error" in data
        ? String((data as { error?: string }).error)
        : `HTTP ${res.status}`;
    throw new Error(msg || "Falha ao criar conta");
  }

  const ok = data as ProvisionSuccess;
  if (!ok.auth?.access_token) {
    throw new Error("Resposta inválida da API");
  }
  return ok;
}

export function appBaseUrl(): string {
  const u = process.env.NEXT_PUBLIC_APP_URL?.replace(/\/+$/, "") ?? "";
  if (u) return u;
  if (typeof window !== "undefined" && window.location.hostname === "localhost") {
    return "http://localhost:3000";
  }
  throw new Error("Configure NEXT_PUBLIC_APP_URL (ex.: https://app.onmarmoraria.com.br)");
}

export function redirectToAppWithTokens(accessToken: string, refreshToken: string): void {
  const app = appBaseUrl();
  const hash = new URLSearchParams({
    access_token: accessToken,
    refresh_token: refreshToken,
  }).toString();
  window.location.href = `${app}/auth/callback#${hash}`;
}
