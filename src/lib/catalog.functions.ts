/**
 * Server functions da loja.
 *
 * O cliente nunca fala com a API Axye: pede a este ficheiro, e é aqui — dentro
 * do `.handler()` — que a chave entra no pedido. Nada de `AXYE_API_KEY` a nível
 * de módulo: em edge o ambiente ainda não existe quando o módulo é avaliado.
 *
 * O nome termina em `.functions.ts` (e não `.server.ts`) porque, ao contrário
 * do que o ESLint deste projeto sugere, o import de `createServerFn` a partir de
 * `@tanstack/react-start` é permitido em qualquer módulo — só o pacote
 * `server-only` é que está bloqueado.
 */

import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

import { AxyeError, getProduct, listProducts } from "./axye";
import {
  findNav,
  groupByCategory,
  withCategory,
  type Product,
} from "./categories";

export type CatalogResult = {
  total: number;
  section: string;
  sectionLabel: string;
  categories: { category: string; count: number }[];
  groups: { category: string; items: Product[] }[];
  items: Product[];
};

/**
 * Erros que o utilizador deve ver tal como são. O resto (rede em baixo, JSON
 * inválido) vira uma mensagem genérica — não vale a pena expor detalhes
 * internos na página.
 */
function toUserMessage(err: unknown): string {
  if (err instanceof AxyeError) return err.message;
  if (err instanceof Error && /^Axye \d/.test(err.message)) return err.message;
  return "Não foi possível carregar o catálogo agora. Tente novamente.";
}

/** A API pagina de 100 em 100; o catálogo tem de vir inteiro para agrupar bem. */
async function fetchAllProducts(q?: string): Promise<Product[]> {
  const all: Product[] = [];
  let offset = 0;
  let total = Infinity;

  while (offset < total) {
    const r = await listProducts({ limit: 100, offset, q });
    const batch: Product[] = (r.data ?? []) as Product[];
    total = Number(r.count ?? batch.length);
    all.push(...batch);
    if (!batch.length) break;
    offset += 100;
    if (all.length >= total) break;
  }
  return all;
}

const catalogInput = z.object({
  section: z.string().optional(),
  q: z.string().optional(),
});

/**
 * Catálogo filtrado por secção.
 *
 * `strict: false` — a resposta não viaja no payload do pedido; é devolvida no
 * corpo da resposta. Sem isto o TanStack tentava serializar os produtos (com a
 * descrição em HTML e URLs de imagem) dentro do próprio pedido e o pedido
 * ficava maior do que a resposta.
 */
export const getCatalog = createServerFn({ method: "GET", strict: false })
  .validator((data: unknown) => catalogInput.parse(data ?? {}))
  .handler(async ({ data }): Promise<CatalogResult> => {
    const section = data.section || "produtos";
    const nav = findNav(section);

    // Uma secção `link` (ex.: /loja/claude-code) não tem catálogo próprio.
    if (nav.type !== "catalog") {
      throw new AxyeError("not_a_catalog", "Esta secção não tem catálogo.", 404);
    }

    let products = (await fetchAllProducts(data.q)).map(withCategory);

    if (nav.categories) {
      products = products.filter((p) => nav.categories!.includes(p.category!));
    }

    const groups = groupByCategory(products);
    const items = [...products].sort((a, b) => (b.sales_count || 0) - (a.sales_count || 0));

    return {
      total: products.length,
      section,
      sectionLabel: nav.label,
      categories: groups.map((g) => ({ category: g.category, count: g.items.length })),
      groups,
      items,
    };
  });

const productInput = z.object({ id: z.string().min(1) });

/** Detalhe de um produto, para o painel lateral. */
export const getProductDetail = createServerFn({ method: "GET", strict: false })
  .validator((data: unknown) => productInput.parse(data))
  .handler(async ({ data }): Promise<Product> => {
    const r = await getProduct(data.id);
    const p = r.data as Product | undefined;
    if (!p) throw new AxyeError("not_found", "Produto não encontrado.", 404);
    return withCategory(p);
  });

export { toUserMessage };
