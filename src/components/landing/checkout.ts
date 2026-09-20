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
 * Atributo da oferta → URL. Um valor vazio deixa o botão como está no markup.
 */
export const CHECKOUTS: [string, string][] = [
  ["data-bump", BUMP_URL],
  ["data-upgrade", UPGRADE_5M_URL],
  ["data-cross", CROSS_URL],
  ["data-checkout", CHECKOUT_URL],
];

/**
 * Devolve o `href` final de um CTA da landing.
 *
 * Os que têm oferta própria ficam com a âncora que o markup lhes deu (quando o
 * URL existe, `CHECKOUTS` acima é que o aplica). Os restantes, se estiverem em
 * `#`, passam a apontar para a secção da oferta — um link morto é pior do que
 * um link que leva ao sítio onde a decisão se toma.
 */
export function resolveCtaHref(
  href: string | undefined,
  attrs: { bump?: boolean; upgrade?: boolean; cross?: boolean; checkout?: boolean },
): string {
  const hasOwnOffer = Boolean(attrs.bump || attrs.upgrade || attrs.cross || attrs.checkout);
  if (hasOwnOffer) return href ?? "#oferta";
  return !href || href === "#" ? "#oferta" : href;
}
