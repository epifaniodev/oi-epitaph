/**
 * Categorias heurísticas — a API da loja não expõe `category` nativa.
 *
 * Portado sem alterações de `lib/categories.js`. É lógica pura, por isso corre
 * tanto no servidor (a filtrar o catálogo) como no cliente (a montar a nav).
 */

export type NavItem =
  | { id: string; label: string; type: "catalog"; categories: string[] | null }
  | { id: string; label: string; type: "link"; href: string }
  | { id: string; label: string; type: "page" };

export type NavGroup = { group: string; items: NavItem[] };

export type Product = Record<string, unknown> & {
  id?: string;
  slug?: string;
  title?: string;
  price?: number;
  compare_price?: number | null;
  sales_count?: number;
  stock_quantity?: number | null;
  image_url?: string | null;
  description?: string | null;
  delivery_type?: string | null;
  category?: string;
};

const RULES: [RegExp, string][] = [
  [/claude\s*code|chatgpt|leonardo\s*ai|antigravity|gemini|chatprd/i, "IA & ferramentas"],
  [/manus/i, "Manus (créditos)"],
  [/lovable/i, "Lovable"],
  [/clonesupa|supabase|migração de projeto/i, "CloneSupa / Supabase"],
  [/\bbm0|\bbm\b|verifica[cç][aã]o da sua bm/i, "Business Manager (BM)"],
  [/g-?ads|google ads|pinterest ads|conta google ads/i, "Google / Pinterest Ads"],
  [/g-?mail forte|pacote \d+ e-?mails|e-?mail outlook|email outlook|hotmail/i, "E-mails"],
  [/perfil|fanpages|amigos|seguidores|tiktok/i, "Perfis sociais"],
  [/canva|capcut|kit criativo|design|edi[cç][aã]o|wallpapers|pack|lifestyle|piment/i, "Design & criativos"],
  [/\bproxy\b/i, "Proxies"],
  [/netflix|hbo|youtube premium/i, "Streaming"],
  [/api\s*\|+|iqoption|deriv|pocket option|quotex|exnova/i, "APIs trading"],
  [/telegram|whatsapp|disparo|zap voice/i, "WhatsApp / Telegram"],
  [/extens[aã]o|plano (di[aá]rio|semanal|mensal)|pro lite|300 cr[eé]ditos/i, "Planos & extensões"],
  [/landing|membros|sistema de sa[uú]de|coursera|an[aá]lise de seguran/i, "Sistemas & digitais"],
];

const ORDER = [...new Set([...RULES.map(([, c]) => c), "Outros"])];

/** Rotas do marketplace → filtro de categorias (`null` = todas). */
export const MARKET_NAV: NavGroup[] = [
  {
    group: "Loja",
    items: [
      { id: "produtos", label: "Lista de produtos", type: "catalog", categories: null },
      {
        id: "claude-code",
        label: "Claude Code na Prática",
        type: "link",
        href: "/claude-code",
      },
      { id: "claude", label: "Claude / IA", type: "catalog", categories: ["IA & ferramentas"] },
      { id: "proxies", label: "Proxies", type: "catalog", categories: ["Proxies"] },
      { id: "streaming", label: "Streaming", type: "catalog", categories: ["Streaming"] },
      { id: "bm", label: "BM", type: "catalog", categories: ["Business Manager (BM)"] },
      { id: "perfis", label: "Perfis", type: "catalog", categories: ["Perfis sociais"] },
      { id: "emails", label: "E-mails", type: "catalog", categories: ["E-mails"] },
      { id: "manus", label: "Manus", type: "catalog", categories: ["Manus (créditos)"] },
      { id: "ads", label: "Google / Ads", type: "catalog", categories: ["Google / Pinterest Ads"] },
      { id: "design", label: "Design", type: "catalog", categories: ["Design & criativos"] },
    ],
  },
  {
    group: "Ajuda",
    items: [
      { id: "tutorial", label: "Tutorial", type: "page" },
      { id: "suporte", label: "Suporte", type: "page" },
    ],
  },
];

export function categorizeProduct(p: Product): string {
  const t = `${p.title ?? ""} ${p.slug ?? ""}`;
  for (const [re, cat] of RULES) {
    if (re.test(t)) return cat;
  }
  return "Outros";
}

export function withCategory<T extends Product>(p: T): T & { category: string } {
  return { ...p, category: categorizeProduct(p) };
}

export function groupByCategory(products: Product[]): { category: string; items: Product[] }[] {
  const map = new Map<string, Product[]>();
  for (const raw of products) {
    const p = withCategory(raw);
    const bucket = map.get(p.category);
    if (bucket) bucket.push(p);
    else map.set(p.category, [p]);
  }
  const cats = [
    ...ORDER.filter((c) => map.has(c)),
    ...[...map.keys()].filter((c) => !ORDER.includes(c)),
  ];
  return cats.map((category) => ({
    category,
    items: (map.get(category) ?? []).sort((a, b) => (a.price || 0) - (b.price || 0)),
  }));
}

export function findNav(id: string): NavItem {
  for (const g of MARKET_NAV) {
    const hit = g.items.find((i) => i.id === id);
    if (hit) return hit;
  }
  return MARKET_NAV[0]!.items[0]!;
}

export { ORDER as CATEGORY_ORDER };
