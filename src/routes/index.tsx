import { createFileRoute } from "@tanstack/react-router";

import { StoreError, StoreLayout } from "@/components/store/StoreLayout";
import { getCatalog } from "@/lib/catalog.functions";
import { storeHeadLinks } from "@/lib/head";

/**
 * A raiz é a loja.
 *
 * `head` acrescenta o `<link>` da folha da loja: a landing usa outra folha, com
 * as mesmas variáveis CSS em valores opostos (fundo escuro aqui, creme lá), por
 * isso cada página carrega só a sua.
 */
export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Lista de produtos · Marketplace Axye" },
      {
        name: "description",
        content:
          "Catálogo Axye: contas, proxies, perfis, créditos de IA e ferramentas digitais com entrega automática.",
      },
    ],
    links: storeHeadLinks,
  }),
  loader: () => getCatalog({ data: { section: "produtos" } }),
  component: Catalogo,
  errorComponent: StoreError,
});

/* Componente com nome, e não uma arrow inline: `Route.useLoaderData()` é um
   hook, e a regra `react-hooks/rules-of-hooks` só o reconhece dentro de uma
   função que comece por maiúscula. */
function Catalogo() {
  return <StoreLayout data={Route.useLoaderData()} />;
}
