/**
 * Texto que vem em HTML da API.
 *
 * Fica separado de `format.ts` de propósito: ali é dinheiro e estoque, aqui é
 * limpeza de markup. Nada disto usa uma biblioteca de sanitização porque o
 * resultado nunca é injetado como HTML — é sempre texto (`textContent`), e o
 * que se remove são as tags, não as que se mantêm.
 */

const ENTITIES: Record<string, string> = {
  "&nbsp;": " ",
  "&amp;": "&",
  "&lt;": "<",
  "&gt;": ">",
  "&quot;": '"',
  "&#39;": "'",
};

/**
 * O `description` da API vem em HTML; o painel mostra texto simples.
 *
 * As tags caem todos, mas o `&`/`<` que vinham escapados voltam a aparecer —
 * sem isto, `Kit Design &amp; Vídeos` lia-se com o `&amp;` à mostra.
 */
export function stripHtml(html: string): string {
  return html
    .replace(/<[^>]*>/g, " ")
    .replace(/&nbsp;|&amp;|&lt;|&gt;|&quot;|&#39;/g, (m) => ENTITIES[m] ?? m)
    .replace(/\s+/g, " ")
    .trim();
}
