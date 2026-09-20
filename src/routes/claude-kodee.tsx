import { createFileRoute } from "@tanstack/react-router";

import { KodeePage } from "@/components/landing-kodee/KodeePage";
import { FONT_HREF } from "@/lib/head";

/**
 * Landing de oferta da Kodee: continuar o projeto pela API do Claude quando
 * o limite do Claude Code interrompe o fluxo. Segue o visual das outras
 * landings (folha `/claude-code/landing.css`, fundo creme).
 *
 * `og:image` pede URL absoluto com o domínio de produção — fica por preencher
 * quando o domínio existir, como nas outras páginas.
 */
export const Route = createFileRoute("/claude-kodee")({
  head: () => ({
    meta: [
      { title: "Kodee · Continue seu projeto quando o limite do Claude Code acaba" },
      {
        name: "description",
        content:
          "Até 1 milhão de tokens com renovação a cada 5 horas, por R$ 75. Continue programando, criando sites e desenvolvendo sistemas pela API do Claude.",
      },
      { name: "theme-color", content: "#f0eee6" },
      { name: "color-scheme", content: "light" },
      { property: "og:type", content: "website" },
      { property: "og:title", content: "Kodee · Continue seu projeto pela API do Claude" },
      {
        property: "og:description",
        content:
          "O limite do Claude Code apareceu no meio do projeto? Continue programando com até 1 milhão de tokens, renovação a cada 5 horas, por R$ 75.",
      },
      { property: "og:locale", content: "pt_BR" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Kodee · Continue seu projeto pela API do Claude" },
      {
        name: "twitter:description",
        content:
          "O limite do Claude Code apareceu no meio do projeto? Continue programando com até 1 milhão de tokens, renovação a cada 5 horas, por R$ 75.",
      },
    ],
    links: [
      { rel: "stylesheet", href: "/claude-code/landing.css" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      { rel: "stylesheet", href: FONT_HREF },
    ],
  }),
  component: KodeePage,
});
