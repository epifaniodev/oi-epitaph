import { createFileRoute } from "@tanstack/react-router";

import { StoreShell } from "@/components/store/StoreShell";

export const Route = createFileRoute("/tutorial")({
  head: () => ({
    meta: [
      { title: "Tutorial · Marketplace Axye" },
      { name: "description", content: "Como usar o marketplace Axye." },
    ],
    links: [{ rel: "stylesheet", href: "/styles.css" }],
  }),
  component: Tutorial,
});

function Tutorial() {
  return (
    <StoreShell
      title="Tutorial"
      meta=""
      items={[]}
      current="tutorial"
      balance="—"
      page={
        <article className="page-card">
          <h2>Como usar o marketplace</h2>
          <ol>
            <li>Escolha uma seção no menu (Claude, Proxies, Streaming, BM…).</li>
            <li>Use a busca e a ordenação no topo.</li>
            <li>Clique num produto para ver detalhes, estoque e entrega.</li>
            <li>As compras saem do saldo da conta Axye (API).</li>
          </ol>
          <p>
            Dica: em <strong>Lista de produtos</strong> você vê o catálogo completo, como numa loja.
          </p>
        </article>
      }
    />
  );
}
