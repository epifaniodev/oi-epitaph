import { createFileRoute } from "@tanstack/react-router";

import { ObrigadoPage } from "@/components/landing2/ObrigadoPage";
import { FONT_HREF } from "@/lib/head";

/**
 * Página de obrigado da segunda oferta.
 *
 * `noindex`: é uma página de pós-compra, não tem nada que aparecer em busca —
 * e o URL não transporta pedido nem credencial, de propósito.
 */
export const Route = createFileRoute("/claude2/obrigado")({
  head: () => ({
    meta: [
      { title: "Pagamento confirmado · Claude Code — Capacidade" },
      { name: "robots", content: "noindex, nofollow" },
      { name: "theme-color", content: "#f0eee6" },
      { name: "color-scheme", content: "light" },
    ],
    links: [
      { rel: "stylesheet", href: "/claude-code/landing.css" },
      { rel: "stylesheet", href: "/claude2/extra.css" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      { rel: "stylesheet", href: FONT_HREF },
    ],
  }),
  component: ObrigadoPage,
});
