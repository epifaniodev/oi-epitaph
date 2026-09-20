import { useEffect, useRef, useState } from "react";

import { getProductDetail } from "@/lib/catalog.functions";
import { brl, stockLabel } from "@/lib/format";
import { stripHtml } from "@/lib/html";
import type { Product } from "@/lib/categories";

type Loaded = {
  kicker: string;
  title: string;
  price: string;
  compare: string | null;
  chips: string[];
  description: string;
  image: string | null;
};

function toLoaded(p: Product): Loaded {
  return {
    kicker: [p.category, p.slug || p.id].filter(Boolean).join(" · "),
    title: p.title || "Produto",
    price: brl(p.price),
    compare: p.compare_price ? brl(p.compare_price) : null,
    chips: [
      p.category ? String(p.category) : "",
      stockLabel(p.stock_quantity),
      `${p.sales_count ?? 0} vendas`,
      String(p.delivery_type || "entrega"),
    ].filter(Boolean),
    description: stripHtml(String(p.description || "Sem descrição.")),
    image: p.image_url ? String(p.image_url) : null,
  };
}

export function Drawer({ productId, onClose }: { productId: string | null; onClose: () => void }) {
  const open = productId !== null;
  const panelRef = useRef<HTMLDivElement>(null);
  const [data, setData] = useState<Loaded | null>(null);
  const [error, setError] = useState<string | null>(null);

  /* Detalhe do produto. Limpa o estado anterior ao trocar de produto, senão o
     painel mostrava o preço do produto antigo enquanto o novo carregava. */
  useEffect(() => {
    if (productId === null) {
      setData(null);
      setError(null);
      return;
    }
    let alive = true;
    setData(null);
    setError(null);

    getProductDetail({ data: { id: productId } })
      .then((p) => {
        if (alive) setData(toLoaded(p));
      })
      .catch((err: unknown) => {
        if (alive) setError(err instanceof Error ? err.message : "Erro ao carregar");
      });

    return () => {
      alive = false;
    };
  }, [productId]);

  /* O painel recebe o foco ao abrir, para que o leitor de ecrã anuncie o
     diálogo em vez de continuar no card que o abriu. */
  useEffect(() => {
    if (!open) return;
    panelRef.current?.focus();
    // Classe em vez de `style.overflow`: a calha da scrollbar fica reservada
    // (scrollbar-gutter no html) e o conteúdo não salta ao abrir.
    document.body.classList.add("is-locked");
    return () => document.body.classList.remove("is-locked");
  }, [open]);

  /* Escape fecha e o Tab fica preso dentro do painel. Sem o trap, o Tab levava
     o foco para os cards por trás do scrim, que continuam tabuláveis porque
     `aria-modal` não muda o comportamento do browser. */
  useEffect(() => {
    if (!open) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
        return;
      }
      if (e.key !== "Tab") return;

      const panel = panelRef.current;
      if (!panel) return;

      /* O painel entra na lista (tem tabindex="-1"): com um só elemento focável
         — o botão de fechar — prender não chega, é preciso conseguir sair dele.
         Com o painel na lista, Tab alterna entre os dois. */
      const focusables = [
        panel,
        ...panel.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), input, select, textarea, [tabindex]:not([tabindex="-1"])',
        ),
      ];
      if (focusables.length < 2) return;

      const first = focusables[0]!;
      const last = focusables[focusables.length - 1]!;
      const current = document.activeElement;

      // Se o foco ainda estiver fora do diálogo, puxa-o para dentro.
      if (!panel.contains(current)) {
        e.preventDefault();
        first.focus();
        return;
      }
      if (e.shiftKey && current === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && current === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <aside className="drawer">
      <div className="drawer-scrim" onClick={onClose} />
      <div
        className="drawer-panel"
        role="dialog"
        aria-modal="true"
        aria-labelledby="d-title"
        tabIndex={-1}
        ref={panelRef}
      >
        <button
          type="button"
          className="drawer-close"
          onClick={onClose}
          aria-label="Fechar detalhes"
        >
          ×
        </button>
        <div className="drawer-media">{data?.image ? <img src={data.image} alt="" /> : null}</div>
        <div className="drawer-body">
          <p className="drawer-kicker">{data?.kicker ?? ""}</p>
          <h2 id="d-title">{error ?? data?.title ?? "Carregando…"}</h2>
          {data ? (
            <>
              <div className="drawer-price">
                {data.price}
                {data.compare ? <span className="compare"> {data.compare}</span> : null}
              </div>
              <div className="drawer-stats">
                {data.chips.map((c) => (
                  <span className="chip" key={c}>
                    {c}
                  </span>
                ))}
              </div>
              <div className="drawer-desc">{data.description}</div>
            </>
          ) : null}
        </div>
      </div>
    </aside>
  );
}
