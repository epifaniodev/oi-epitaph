import { createFileRoute } from "@tanstack/react-router";

import { LandingPage } from "@/components/landing/LandingPage";

/**
 * Landing "Claude Code na Prática".
 *
 * Este é o URL canónico (não `/loja/claude-code`, que redireciona para cá) —
 * é o que já circula e o que a barra lateral da loja aponta.
 *
 * `og:image` e canonical pedem URL absoluto com o domínio de produção. Sem
 * domínio definido, o caminho relativo é o que o Facebook resolve e o Twitter
 * não mostra imagem — fica por preencher quando o domínio existir.
 */
export const Route = createFileRoute("/claude-code")({
  head: () => ({
    meta: [
      { title: "Claude Code na Prática · Crie projetos reais com inteligência artificial" },
      {
        name: "description",
        content:
          "Aprenda a configurar o Claude Code, use uma skill especializada em landing pages e siga um processo guiado para transformar ideias em projetos reais.",
      },
      /* Fundo creme: a barra do browser funde com a página, ao contrário do
         que acontece na loja (escura). */
      { name: "theme-color", content: "#f0eee6" },
      { name: "color-scheme", content: "light" },
      { property: "og:type", content: "website" },
      { property: "og:title", content: "Claude Code na Prática" },
      {
        property: "og:description",
        content: "Transforme suas ideias em landing pages e projetos reais com Claude Code.",
      },
      { property: "og:locale", content: "pt_BR" },
      { property: "og:image", content: "/claude-code/og-image.png" },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      {
        property: "og:image:alt",
        content:
          "Claude Code na Prática: transforme suas ideias em landing pages e projetos reais, com 1 milhão de tokens por janela de 5 horas.",
      },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: "/claude-code/og-image.png" },
      { name: "twitter:title", content: "Claude Code na Prática" },
      {
        name: "twitter:description",
        content: "Transforme suas ideias em landing pages e projetos reais com Claude Code.",
      },
    ],
    links: [
      { rel: "stylesheet", href: "/claude-code/landing.css" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,500;12..96,700;12..96,800&family=IBM+Plex+Mono:wght@400;500&family=Manrope:wght@400;500;600;700&display=swap",
      },
    ],
  }),
  component: LandingPage,
});
