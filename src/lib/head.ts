/**
 * Peças de `<head>` partilhadas pelas rotas.
 *
 * As páginas da loja declaram a sua folha (`/styles.css`) e as fontes da
 * marca. Estão aqui, e não repetidas em cada rota, para não haver duas listas
 * de fontes a divergir — no original eram quatro linhas copiadas em dois
 * ficheiros HTML.
 */

/** Bricolage Grotesque (títulos), Manrope (texto), IBM Plex Mono (números). */
export const FONT_HREF =
  "https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,500;12..96,700;12..96,800&family=IBM+Plex+Mono:wght@400;500&family=Manrope:wght@400;500;600;700&display=swap";

/**
 * `<link>`s comuns a todas as páginas da loja, por ordem.
 *
 * `preconnect` antes da folha de fontes: sem ele o browser só descobre os
 * domínios das fontes depois de ler o CSS, e o `crossorigin` é obrigatório no
 * `fonts.gstatic.com` (é um pedido anónimo por CORS, não uma navegação).
 */
export const storeHeadLinks = [
  { rel: "stylesheet", href: "/styles.css" },
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" as const },
  { rel: "stylesheet", href: FONT_HREF },
];
