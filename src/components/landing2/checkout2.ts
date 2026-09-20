import { resolveCtaHref, type OfferFlag } from "@/components/landing/checkout";

/**
 * Destinos de checkout da **segunda** oferta.
 *
 * Separado de `landing/checkout.ts` de propósito. Se as duas ofertas
 * partilhassem o mesmo mapa, preencher o URL da primeira passaria a mandar
 * também os botões da segunda para a página de pagamento errada — e a compra
 * sairia com o produto trocado, sem nada na página a denunciá-lo.
 *
 * ⚠️ Vazios, como os da primeira. Enquanto estiverem vazios, todos os CTAs
 * caem em `#oferta`, e é impossível distinguir, do lado do checkout, qual dos
 * planos (1M ou 5M) o cliente escolheu. Preencher antes de publicar:
 *
 *   CHECKOUT_2_URL → Claude Code — Capacidade, plano de 1M (R$ 75)
 *   UPGRADE_5M_2_URL → troca para o plano de 5M
 */
export const CHECKOUT_2_URL = "";
export const UPGRADE_5M_2_URL = "";

const CHECKOUTS_2 = {
  checkout: CHECKOUT_2_URL,
  upgrade: UPGRADE_5M_2_URL,
} satisfies Partial<Record<OfferFlag, string>>;

/**
 * O `href` final de um CTA desta oferta.
 *
 * `base` é o mapa da primeira landing: mantém-se porque a resolução genérica
 * (oferta própria → URL, senão a âncora do markup, senão `#oferta`) já está
 * feita lá e é a mesma regra. O que muda é o mapa — este, não aquele.
 */
export function resolveCtaHref2(
  href: string | undefined,
  offers: Partial<Record<OfferFlag, boolean>> = {},
): string {
  return resolveCtaHref(href, offers, CHECKOUTS_2);
}
