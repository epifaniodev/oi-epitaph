import { createFileRoute } from "@tanstack/react-router";

import { Landing2Page } from "@/components/landing2/Landing2Page";
import { FONT_HREF } from "@/lib/head";

/**
 * Segunda oferta — `/claude2`.
 *
 * Reutiliza a folha da primeira landing (`landing.css`) para que as duas
 * páginas partilhem tokens e componentes, e acrescenta `/claude2/extra.css`
 * com as classes que só esta introduz. A `landing.css` não foi tocada: também
 * serve `/claude-code`, que já está publicado.
 *
 * `og:image` continua relativo e por isso o Twitter não mostra imagem — fica
 * à espera do domínio de produção, como na primeira landing.
 */
export const Route = createFileRoute("/claude2/")({
  head: () => ({
    meta: [
      { title: "Claude Code — Capacidade · 1 milhão de tokens por janela de 5 horas" },
      {
        name: "description",
        content:
          "Acesso ao Claude Code já configurado, com até 1 milhão de tokens por janela de 5 horas. Para quem já programa e só precisa de janela para não parar a meio.",
      },
      { name: "theme-color", content: "#f0eee6" },
      { name: "color-scheme", content: "light" },
      { property: "og:type", content: "website" },
      { property: "og:title", content: "Claude Code — Capacidade" },
      {
        property: "og:description",
        content:
          "Acesso já configurado, com até 1 milhão de tokens por janela de 5 horas, para quem já sabe o que pedir.",
      },
      { property: "og:locale", content: "pt_BR" },
      { property: "og:image", content: "/claude-code/og-image.png" },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: "/claude-code/og-image.png" },
      { name: "twitter:title", content: "Claude Code — Capacidade" },
      {
        name: "twitter:description",
        content: "Acesso configurado e 1 milhão de tokens por janela de 5 horas.",
      },
    ],
    links: [
      { rel: "stylesheet", href: "/claude-code/landing.css" },
      { rel: "stylesheet", href: "/claude2/extra.css" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      { rel: "stylesheet", href: FONT_HREF },
    ],
  }),
  component: Landing2Page,
});
