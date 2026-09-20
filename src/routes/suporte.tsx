import { createFileRoute } from "@tanstack/react-router";

import { StoreShell } from "@/components/store/StoreShell";

export const Route = createFileRoute("/suporte")({
  head: () => ({
    meta: [
      { title: "Suporte · Marketplace Axye" },
      { name: "description", content: "Suporte do marketplace Axye." },
    ],
    links: [{ rel: "stylesheet", href: "/styles.css" }],
  }),
  component: Suporte,
});

function Suporte() {
  return (
    <StoreShell
      title="Suporte"
      meta=""
      items={[]}
      current="suporte"
      balance="—"
      page={
        <article className="page-card">
          <h2>Suporte</h2>
          <p>Problemas com o painel ou a API? Confira:</p>
          <ol>
            <li>
              Segredo <code>AXYE_API_KEY</code> definido no ambiente do servidor.
            </li>
            <li>
              Servidor a responder — <code>/loja</code> mostra o catálogo.
            </li>
            <li>
              Docs oficiais:{" "}
              <a href="https://axye.com.br/api-docs" target="_blank" rel="noreferrer">
                axye.com.br/api-docs
              </a>
            </li>
          </ol>
          <p>
            Erros da API vêm em <code>error.code</code> — trate sempre pelo código, não pela
            mensagem.
          </p>
        </article>
      }
    />
  );
}
