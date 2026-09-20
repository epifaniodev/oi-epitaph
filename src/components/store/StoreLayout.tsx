/**
 * Layout partilhado das rotas da loja.
 *
 * Todas as rotas do catálogo (`/loja`, `/loja/$seccao`) têm a mesma grelha, o
 * mesmo painel lateral e o mesmo painel de detalhe; só mudam o título e os
 * produtos. O `errorComponent` vive aqui para não se repetir em cada rota, e
 * mostra a mensagem que a server function devolveu em vez do ecrã genérico de
 * "não carregou" — sem chave de API a causa é essa, e o utilizador precisa de a
 * ler.
 */

import type { ErrorComponentProps } from "@tanstack/react-router";

import { StoreShell } from "./StoreShell";
import { toUserMessage } from "@/lib/catalog.functions";
import type { CatalogResult } from "@/lib/catalog.functions";

export function StoreLayout({ data }: { data: CatalogResult }) {
  return (
    <StoreShell
      title={data.sectionLabel}
      meta={`${data.total} produto${data.total === 1 ? "" : "s"}`}
      items={data.items}
      current={data.section}
    />
  );
}

export function StoreError({ error }: ErrorComponentProps) {
  const message = toUserMessage(error);

  return (
    <div className="app">
      <div className="main">
        <header className="topbar">
          <h1 className="crumb">Marketplace Axye</h1>
        </header>
        <main className="content" id="content" tabIndex={-1}>
          <p className="meta" role="status">
            Falha
          </p>
          <div className="grid">
            <div className="error">{message}</div>
          </div>
        </main>
      </div>
    </div>
  );
}
