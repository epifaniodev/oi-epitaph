import { createFileRoute } from "@tanstack/react-router";

import { StoreError, StoreLayout } from "@/components/store/StoreLayout";
import { getCatalog } from "@/lib/catalog.functions";

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
    links: [{ rel: "stylesheet", href: "/styles.css" }],
  }),
  loader: () => getCatalog({ data: { section: "produtos" } }),
  component: () => <StoreLayout data={Route.useLoaderData()} />,
  errorComponent: StoreError,
});
