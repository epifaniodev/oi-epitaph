/**
 * Destinos de checkout da landing.
 *
 * ⚠️ Continuam vazios, tal como em `public/claude-code/landing.js` — não foram
 * inventados. Enquanto estiverem vazios:
 *
 *   - os botões das ofertas com identidade própria (bump, upgrade, cross,
 *     checkout) mantêm a âncora `#oferta` e não há forma de saber, do lado do
 *     checkout, qual das ofertas o cliente escolheu;
 *   - os restantes CTAs caem em `#oferta` em vez de ficarem em `href="#"`.
 *
 * Preencher com o link de cada oferta antes de publicar:
 *   CHECKOUT_URL → Claude Code na Prática (R$ 75)
 *   BUMP_URL     → a mesma compra com o CloneSupa (R$ 104,90)
 *   UPGRADE_5M_URL → troca de plano para 5M tokens
 *   CROSS_URL    → skill de segmento (por nicho)
 */
export const CHECKOUT_URL = "";
export const BUMP_URL = "";
export const UPGRADE_5M_URL = "";
export const CROSS_URL = "";

/**
 * Oferta → URL configurado. Um valor vazio significa «ainda não há link».
 *
 * As chaves são as mesmas flags que o `<Cta>` aceita, para que acrescentar uma
 * oferta nova seja uma linha aqui e uma flag no componente.
 */
export const CHECKOUTS = {
  checkout: CHECKOUT_URL,
  bump: BUMP_URL,
  upgrade: UPGRADE_5M_URL,
  cross: CROSS_URL,
} as const;

export type OfferFlag = keyof typeof CHECKOUTS;

/**
 * Devolve o `href` final de um CTA da landing.
 *
 * Três casos, por ordem:
 *
 *   1. O botão tem oferta própria (bump, upgrade, cross, checkout) **e** essa
 *      oferta já tem URL → o URL. É este o caminho que faz a compra.
 *   2. Tem oferta própria e o URL ainda não existe → a âncora que o markup lhe
 *      deu. Não se inventa destino: mandar para `#oferta` um botão cuja oferta
 *      não se consegue distinguir do lado do checkout só trocava um link morto
 *      por uma compra ambígua.
 *   3. Não tem oferta própria → a âncora do markup; se for `#`, a secção da
 *      oferta, porque um link morto é pior do que um que leva ao sítio onde a
 *      decisão se toma.
 *
 * O original (`landing.js`) fazia isto escrevendo `href` no DOM depois de
 * carregar. Aqui é uma função pura: o mesmo resultado, sem o DOM como estado.
 */
export function resolveCtaHref(
  href: string | undefined,
  offers: Partial<Record<OfferFlag, boolean>> = {},
): string {
  const configured = (Object.keys(CHECKOUTS) as OfferFlag[]).find(
    (flag) => offers[flag] && CHECKOUTS[flag],
  );
  if (configured) return CHECKOUTS[configured];

  const hasOwnOffer = (Object.keys(CHECKOUTS) as OfferFlag[]).some((flag) => offers[flag]);
  if (hasOwnOffer) return href ?? "#oferta";

  return !href || href === "#" ? "#oferta" : href;
}
