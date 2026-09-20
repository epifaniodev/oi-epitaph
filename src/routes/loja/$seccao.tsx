import { createFileRoute, notFound } from "@tanstack/react-router";

import { StoreError, StoreLayout } from "@/components/store/StoreLayout";
import { getCatalog } from "@/lib/catalog.functions";
import { findNav } from "@/lib/categories";
import { storeHeadLinks } from "@/lib/head";

/**
 * Secção do catálogo → URL próprio. Antes isto era uma rota hash (`#/proxies`),
 * que o servidor nunca via: não era indexável nem partilhável.
 *
 * A lista de secções vem de `MARKET_NAV`, a mesma fonte que alimenta a barra
 * lateral. Uma secção inexistente dá 404 — antes caía silenciosamente na lista
 * completa, o que fazia um URL errado parecer um URL válido.
 */
export const Route = createFileRoute("/loja/$seccao")({
  head: ({ params }) => {
    const label = findNav(params.seccao).label;
    return {
      meta: [
        { title: `${label} · Marketplace Axye` },
        { name: "description", content: `${label} no catálogo Axye.` },
      ],
      links: storeHeadLinks,
    };
  },
  loader: async ({ params }) => {
    const nav = findNav(params.seccao);
    // `findNav` devolve o primeiro item quando não encontra — daí a comparação.
    if (nav.id !== params.seccao || nav.type !== "catalog") {
      throw notFound();
    }
    return getCatalog({ data: { section: params.seccao } });
  },
  component: Seccao,
  errorComponent: StoreError,
});

/* Componente com nome: `Route.useLoaderData()` é um hook, e a regra
   `react-hooks/rules-of-hooks` só o aceita dentro de uma função com maiúscula. */
function Seccao() {
  return <StoreLayout data={Route.useLoaderData()} />;
}
