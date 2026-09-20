import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";

import { Drawer } from "./Drawer";
import { ProductCard } from "./ProductCard";
import { SideNav } from "./SideNav";
import { getAccountBalance } from "@/lib/catalog.functions";
import type { Product } from "@/lib/categories";

type Sort = "sales" | "price-asc" | "price-desc" | "title";

function sortItems(items: Product[], sort: Sort): Product[] {
  const list = [...items];
  switch (sort) {
    case "price-asc":
      return list.sort((a, b) => (a.price || 0) - (b.price || 0));
    case "price-desc":
      return list.sort((a, b) => (b.price || 0) - (a.price || 0));
    case "title":
      return list.sort((a, b) => String(a.title || "").localeCompare(String(b.title || ""), "pt"));
    default:
      return list.sort((a, b) => (b.sales_count || 0) - (a.sales_count || 0));
  }
}

/**
 * Esqueleto da loja: barra lateral, topbar com busca e ordenação, grelha e
 * painel de detalhe.
 *
 * A busca e a ordenação são do cliente — o catálogo da secção já vem inteiro
 * no loader (uma secção tem dezenas de produtos, não milhares), por isso
 * filtrar aqui evita um round-trip por cada tecla.
 */
export function StoreShell({
  title,
  meta,
  items,
  current,
  error,
  page,
}: {
  title: string;
  meta: string;
  items: Product[];
  current: string;
  error?: string | undefined;
  /** Página estática (tutorial, suporte). Quando existe, substitui a grelha. */
  page?: ReactNode;
}) {
  const [balance, setBalance] = useState("—");
  const [q, setQ] = useState("");
  const [sort, setSort] = useState<Sort>("sales");
  const [openId, setOpenId] = useState<string | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  /* Elemento que abriu o drawer. Ao fechar, o foco volta para lá — sem isto o
     foco ficava no botão de fechar, que acaba de desmontar, e o teclado caía
     no início do documento. */
  const triggerRef = useRef<Element | null>(null);
  const menuToggleRef = useRef<HTMLButtonElement>(null);

  const visible = useMemo(() => {
    const needle = q.trim().toLowerCase();
    const filtered = needle
      ? items.filter((p) =>
          `${p.title ?? ""} ${p.category ?? ""} ${p.slug ?? ""}`.toLowerCase().includes(needle),
        )
      : items;
    return sortItems(filtered, sort);
  }, [items, q, sort]);

  const openProduct = (id: string) => {
    triggerRef.current = document.activeElement;
    setOpenId(id);
  };

  const closeDrawer = () => {
    setOpenId(null);
    // `?.` porque o card pode ter desaparecido se a busca mudou entretanto.
    const trigger = triggerRef.current as HTMLElement | null;
    if (trigger?.isConnected) trigger.focus();
    triggerRef.current = null;
  };

  const closeMenu = () => {
    setMenuOpen(false);
    menuToggleRef.current?.focus();
  };

  /* O saldo não bloqueia a página: o catálogo pinta já e a barra lateral
     preenche-se quando chegar. Se falhar, fica «—» — é informação acessória,
     não motivo para não mostrar a loja. */
  useEffect(() => {
    let alive = true;
    void getAccountBalance()
      .then((r) => {
        if (alive && r?.balance) setBalance(r.balance);
      })
      .catch(() => {});
    return () => {
      alive = false;
    };
  }, []);

  /* O menu lateral é uma gaveta em ecrã estreito: Escape fecha-a, senão ficava
     aberta por cima do conteúdo sem forma de a dispensar pelo teclado. */
  useEffect(() => {
    if (!menuOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeMenu();
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [menuOpen]);

  return (
    <>
      {/* Primeiro elemento focável da página: sem isto, quem navega por teclado
          tem de atravessar a barra lateral inteira antes de chegar ao catálogo. */}
      <a className="skip-link" href="#content">
        Pular para o catálogo
      </a>

      <div className="noise" aria-hidden="true" />
      <div className="glow" aria-hidden="true" />

      <div className={`app${menuOpen ? " side-open" : ""}`}>
        <SideNav current={current} balance={balance} />

        <div className="main">
          <header className="topbar">
            <button
              type="button"
              className="menu-toggle"
              ref={menuToggleRef}
              aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
              aria-expanded={menuOpen}
              aria-controls="side"
              onClick={() => setMenuOpen((v) => !v)}
            >
              <span aria-hidden="true">☰</span>
            </button>

            <h1 className="crumb">{title}</h1>

            <label className="search" hidden={Boolean(page)}>
              <span className="sr-only">Buscar produtos</span>
              <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true">
                <path
                  fill="currentColor"
                  d="M15.5 14h-.79l-.28-.27A6.47 6.47 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14"
                />
              </svg>
              <input
                type="search"
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Buscar produtos…"
                autoComplete="off"
                aria-describedby="meta"
              />
            </label>

            <select
              className="sort"
              hidden={Boolean(page)}
              aria-label="Ordenar produtos"
              value={sort}
              onChange={(e) => setSort(e.target.value as Sort)}
            >
              <option value="sales">Mais vendidos</option>
              <option value="price-asc">Menor preço</option>
              <option value="price-desc">Maior preço</option>
              <option value="title">A–Z</option>
            </select>
          </header>

          {/* tabindex="-1": o skip-link precisa de um alvo focável, senão o
              browser só faz scroll e o foco continua na barra lateral. */}
          <main className="content" id="content" tabIndex={-1}>
            {meta ? (
              <p className="meta" id="meta" role="status">
                {meta}
              </p>
            ) : null}
            <div className="grid">
              {page ? (
                page
              ) : error ? (
                <div className="error">{error}</div>
              ) : visible.length ? (
                visible.map((p, i) => (
                  <ProductCard key={String(p.id)} product={p} index={i} onOpen={openProduct} />
                ))
              ) : (
                <div className="empty">Nenhum produto nesta seção.</div>
              )}
            </div>
          </main>
        </div>
      </div>

      <Drawer productId={openId} onClose={closeDrawer} />
    </>
  );
}
