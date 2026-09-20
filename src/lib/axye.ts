/**
 * Cliente da API Axye.
 *
 * A chave é um segredo de servidor: `AXYE_API_KEY` nunca pode chegar ao
 * browser. Por isso tudo aqui corre dentro de server functions — o cliente só
 * vê o resultado já tratado.
 *
 * Portado de `lib/axye.js`.
 */

const DEFAULT_BASE_URL = "https://xydfessmlaghhgdkfhcz.supabase.co/functions/v1/public-api";

export class AxyeError extends Error {
  code: string | number;
  status: number;

  constructor(code: string | number, message: string, status: number) {
    super(message);
    this.name = "AxyeError";
    this.code = code;
    this.status = status;
  }
}

/**
 * Segredos lidos aqui dentro, nunca no escopo do módulo: em runtime de edge o
 * módulo é avaliado antes de o ambiente existir, e uma leitura no topo
 * encontra `undefined`.
 */
function env(name: string): string | undefined {
  return typeof process !== "undefined" ? process.env[name] : undefined;
}

export function getApiKey(): string {
  const key = env("AXYE_API_KEY");
  if (!key) {
    throw new AxyeError(
      "missing_api_key",
      "Falta AXYE_API_KEY no ambiente do servidor. Define o segredo antes de publicar.",
      500,
    );
  }
  return key;
}

function baseUrl(): string {
  return env("AXYE_BASE_URL") ?? DEFAULT_BASE_URL;
}

export async function axyeFetch<T = unknown>(
  path: string,
  query: Record<string, string | number | boolean | undefined> = {},
): Promise<T> {
  const url = new URL(`${baseUrl()}${path}`);
  for (const [k, v] of Object.entries(query)) {
    if (v !== undefined && v !== null && v !== "") {
      url.searchParams.set(k, String(v));
    }
  }

  const res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${getApiKey()}`,
      Accept: "application/json",
    },
  });

  const body = (await res.json().catch(() => null)) as {
    error?: { code?: string; message?: string };
  } | null;

  if (!res.ok) {
    // Tratado pelo código, não pela mensagem — a mensagem pode ser reescrita.
    const code = body?.error?.code ?? res.status;
    const message = body?.error?.message ?? res.statusText;
    throw new AxyeError(code, `Axye ${code}: ${message}`, res.status);
  }
  return body as T;
}

export type ProductsPage = {
  data?: Record<string, unknown>[];
  count?: number;
};

/** Lista produtos ativos. */
export function listProducts({
  limit = 20,
  offset = 0,
  q,
}: { limit?: number; offset?: number; q?: string | undefined } = {}) {
  return axyeFetch<ProductsPage>("/v1/products", { limit, offset, q });
}

/** Saldo da conta, em centavos. */
export function getBalance() {
  return axyeFetch<{ balance_cents?: number; currency?: string }>("/v1/account/balance");
}

/** Detalhe por UUID ou slug. */
export function getProduct(idOrSlug: string) {
  return axyeFetch<{ data?: Record<string, unknown> }>(
    `/v1/products/${encodeURIComponent(idOrSlug)}`,
  );
}
