import { createFileRoute } from "@tanstack/react-router";

import { StoreError, StoreLayout } from "@/components/store/StoreLayout";
import { getCatalog } from "@/lib/catalog.functions";
import { storeHeadLinks } from "@/lib/head";

export const Route = createFileRoute("/loja/")({
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

/* Componente com nome: `Route.useLoaderData()` é um hook, e a regra
   `react-hooks/rules-of-hooks` só o aceita dentro de uma função com maiúscula. */
function Catalogo() {
  return <StoreLayout data={Route.useLoaderData()} />;
}
