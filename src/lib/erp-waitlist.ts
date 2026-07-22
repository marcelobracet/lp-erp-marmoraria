const DEFAULT_API = "http://127.0.0.1:8080";

export type WaitlistPayload = {
  name: string;
  whatsapp: string;
  state: string;
  company_size: string;
  quotes_avg: string;
  source?: string;
};

function apiBase(): string {
  const base = process.env.NEXT_PUBLIC_ERP_API_URL?.replace(/\/+$/, "") ?? "";
  return base || DEFAULT_API;
}

export async function submitWaitlist(payload: WaitlistPayload): Promise<void> {
  const url = `${apiBase()}/api/v1/waitlist`;
  const res = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify({ ...payload, source: payload.source ?? "landing" }),
  });

  const data = (await res.json().catch(() => ({}))) as { error?: string };

  if (res.status === 409) {
    const err = new Error(data.error || "Este WhatsApp já está na lista de espera.");
    (err as Error & { code?: string }).code = "DUPLICATE";
    throw err;
  }

  if (!res.ok) {
    throw new Error(data.error || `HTTP ${res.status}`);
  }
}
