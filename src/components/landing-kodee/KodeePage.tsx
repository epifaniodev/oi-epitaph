import { useEffect, useRef, useState } from "react";

import { FaqList } from "@/components/landing/FaqList";
import { Reveal } from "@/components/landing/Reveal";
import { resolveCtaHref } from "@/components/landing/checkout";
import {
  BRAND,
  DOR,
  FAQ,
  FINAL,
  FOOT_NAV,
  HERO,
  OBJECTIONS,
  OFFER,
  SOLUTION,
  STEPS,
  TOPNAV,
} from "./copy";

/**
 * Destino de checkout da Kodee.
 *
 * ⚠️ Vazio por decisão: tal como nas outras landings, o link de pagamento
 * ainda não foi fornecido. Enquanto estiver vazio, os CTAs caem na âncora
 * `#oferta` (comportamento de `resolveCtaHref`). Basta preencher a constante
 * para ligar a compra.
 */
const KODEE_CHECKOUT_URL = "";

const KODEE_CHECKOUTS = { kodee: KODEE_CHECKOUT_URL } as const;

/**
 * Botão de ação da Kodee. Mesmo mecanismo das outras landings: com o URL de
 * checkout preenchido, é ele que manda; sem ele, a âncora do markup.
 */
function Cta({ className = "btn", children }: { className?: string; children: React.ReactNode }) {
  return (
    <a className={className} href={resolveCtaHref(undefined, { kodee: true }, KODEE_CHECKOUTS)}>
      {children}
    </a>
  );
}

export function KodeePage() {
  const [stuck, setStuck] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [pastHero, setPastHero] = useState(false);
  const [offerVisible, setOfferVisible] = useState(false);

  const heroRef = useRef<HTMLElement>(null);
  const offerRef = useRef<HTMLElement>(null);
  const menuBtnRef = useRef<HTMLButtonElement>(null);

  /* Topbar sólida depois de o hero sair do ecrã; CTA fixo aparece depois do
     hero e desaparece enquanto a oferta está visível — mesmo comportamento
     das outras landings, porque partilham o mesmo CSS. */
  useEffect(() => {
    const hero = heroRef.current;
    if (!hero) return;

    const stuckObs = new IntersectionObserver(([entry]) => setStuck(!entry?.isIntersecting), {
      rootMargin: "-72px 0px 0px 0px",
      threshold: 0,
    });
    const heroObs = new IntersectionObserver(([entry]) => setPastHero(!entry?.isIntersecting), {
      threshold: 0,
    });
    stuckObs.observe(hero);
    heroObs.observe(hero);
    return () => {
      stuckObs.disconnect();
      heroObs.disconnect();
    };
  }, []);

  useEffect(() => {
    const offer = offerRef.current;
    if (!offer) return;
    const obs = new IntersectionObserver(([entry]) => setOfferVisible(Boolean(entry?.isIntersecting)), {
      threshold: 0,
    });
    obs.observe(offer);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      setMenuOpen(false);
      menuBtnRef.current?.focus();
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [menuOpen]);

  const stickyOn = pastHero && !offerVisible;

  return (
    <>
      <div className="noise" aria-hidden="true" />
      <div className="aura aura-a" aria-hidden="true" />
      <div className="aura aura-b" aria-hidden="true" />

      <a className="skip" href="#hero">
        Ir para o conteúdo
      </a>

      <header className={`topbar${stuck ? " is-stuck" : ""}`} id="topbar">
        <div className="wrap topbar-inner">
          <a className="brand" href="#hero">
            <span className="brand-mark" aria-hidden="true">
              <svg
                viewBox="0 0 24 24"
                width="16"
                height="16"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="m8 6-5 6 5 6M16 6l5 6-5 6" />
              </svg>
            </span>
            <span className="brand-text">
              <strong>{BRAND}</strong>
              <small>Continue construindo pela API do Claude.</small>
            </span>
          </a>

          <nav className="topnav" aria-label="Seções">
            {TOPNAV.map((n) => (
              <a key={n.href} href={n.href}>
                {n.label}
              </a>
            ))}
          </nav>

          <Cta className="btn btn-sm">Continuar</Cta>

          <button
            className="menu-btn"
            type="button"
            ref={menuBtnRef}
            aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((v) => !v)}
          >
            <span />
            <span />
          </button>
        </div>

        {menuOpen ? (
          <div className="mobile-nav" onClick={() => setMenuOpen(false)}>
            {TOPNAV.map((n) => (
              <a key={n.href} href={n.href}>
                {n.label}
              </a>
            ))}
            <Cta className="btn">Continuar</Cta>
          </div>
        ) : null}
      </header>

      <main>
        {/* ═══ HERO ═══ */}
        <section className="hero" id="hero" ref={heroRef}>
          <div className="wrap hero-grid">
            <div className="hero-copy">
              <p className="eyebrow">{HERO.eyebrow}</p>
              <h1>
                {HERO.headlinePre}
                <span className="hl">{HERO.headlineHl}</span>
                {HERO.headlinePost}
              </h1>
              <p className="lede">{HERO.sub}</p>

              <ul className="ticks">
                {HERO.ticks.map((t) => (
                  <li key={t}>{t}</li>
                ))}
              </ul>

              <div className="cta-row">
                <Cta className="btn btn-lg">{HERO.cta}</Cta>
                <a className="btn btn-lg ghost" href="#como-funciona">
                  Ver como funciona
                </a>
              </div>
              <p className="micro">{HERO.micro}</p>
            </div>

            <div className="hero-visual">
              <p className="sr-only">
                Demonstração: o Claude Code informa o limite, a Kodee conecta pela API do Claude e
                o projeto continua com 1 milhão de tokens por janela de 5 horas.
              </p>
              <div className="mock">
                <div className="mock-bar">
                  <span className="dot r" aria-hidden="true" />
                  <span className="dot y" aria-hidden="true" />
                  <span className="dot g" aria-hidden="true" />
                  <div className="mock-title">kodee — projeto em andamento/</div>
                </div>

                <div className="mock-pane">
                  {HERO.mockLines.map((l, i) => (
                    <p className={l.cls} key={i}>
                      {l.pmt ? <span className="pmt">{l.pmt}</span> : null}
                      {l.text}
                      {l.caret ? <span className="caret" aria-hidden="true" /> : null}
                    </p>
                  ))}
                </div>

                <div className="float-chip chip-1" aria-hidden="true">
                  limite
                </div>
                <div className="float-chip chip-2" aria-hidden="true">
                  API do Claude
                </div>
                <div className="float-chip chip-3" aria-hidden="true">
                  projeto continua
                </div>
              </div>
            </div>
          </div>

          <Reveal className="wrap stat-strip">
            {HERO.stats.map((s) => (
              <div key={s.b}>
                <b>{s.b}</b>
                <span>{s.s}</span>
              </div>
            ))}
          </Reveal>
        </section>

        {/* ═══ DOR ═══ */}
        <section className="section pain" id="problema">
          <div className="wrap narrow">
            <p className="eyebrow warm">{DOR.eyebrow}</p>
            <h2>{DOR.h2}</h2>

            {DOR.paras.map((p) => (
              <p className="lede" key={p}>
                {p}
              </p>
            ))}

            <p className="lede">
              <strong>{DOR.costLead}</strong>
            </p>
            <Reveal as="ul" className="questions">
              {DOR.costs.map((c) => (
                <li key={c}>{c}</li>
              ))}
            </Reveal>

            <blockquote className="impact">{DOR.impact}</blockquote>
          </div>
        </section>

        {/* ═══ SOLUÇÃO ═══ */}
        <section className="section solution" id="kodee">
          <div className="wrap narrow">
            <p className="eyebrow">{SOLUTION.eyebrow}</p>
            <h2>{SOLUTION.h2}</h2>
            <p className="lede">{SOLUTION.lede}</p>

            <ul className="ticks">
              {SOLUTION.uses.map((u) => (
                <li key={u}>{u}</li>
              ))}
            </ul>

            <p className="callout">{SOLUTION.close}</p>

            <div className="center-row">
              <Cta className="btn btn-lg">{SOLUTION.cta}</Cta>
            </div>
          </div>
        </section>

        {/* ═══ COMO FUNCIONA ═══ */}
        <section className="section steps" id="como-funciona">
          <div className="wrap narrow">
            <p className="eyebrow">{STEPS.eyebrow}</p>
            <h2>{STEPS.h2}</h2>

            <ol className="timeline">
              {STEPS.steps.map((s, i) => (
                <Reveal as="li" key={s.t} index={i}>
                  <span className="tl-num">{i + 1}</span>
                  <div>
                    <h3>{s.t}</h3>
                    <p>{s.d}</p>
                  </div>
                </Reveal>
              ))}
            </ol>

            <div className="center-row">
              <Cta className="btn btn-lg">{STEPS.cta}</Cta>
            </div>
          </div>
        </section>

        {/* ═══ OFERTA ═══ */}
        <section className="section offer" id="oferta" ref={offerRef}>
          <div className="wrap narrow">
            <p className="eyebrow">{OFFER.eyebrow}</p>
            <h2 className="center">{OFFER.h2}</h2>

            <Reveal className="offer-card">
              <div className="offer-body">
                <h3>{OFFER.receiveTitle}</h3>
                <ul className="ticks">
                  {OFFER.receive.map((t) => (
                    <li key={t}>{t}</li>
                  ))}
                </ul>
              </div>

              <aside className="offer-price">
                <span className="offer-tag">{OFFER.priceTag}</span>
                <p className="price-now">
                  <small>Por apenas</small>
                  <strong>R$ 75</strong>
                </p>
                <Cta className="btn btn-lg block">{OFFER.cta}</Cta>
                <p className="micro">{OFFER.priceNote}</p>
              </aside>
            </Reveal>
          </div>
        </section>

        {/* ═══ QUEBRA DE OBJEÇÕES ═══ */}
        <section className="section faq" id="objecoes">
          <div className="wrap narrow">
            <p className="eyebrow">{OBJECTIONS.eyebrow}</p>
            <h2 className="center">{OBJECTIONS.h2}</h2>
            <FaqList items={OBJECTIONS.items} />
          </div>
        </section>

        {/* ═══ CTA FINAL ═══ */}
        <section className="section final" id="comecar">
          <div className="wrap narrow center">
            <h2>{FINAL.h2}</h2>
            {FINAL.lines.map((l) => (
              <p className="lede" key={l}>
                {l}
              </p>
            ))}
            <div className="center-row">
              <Cta className="btn btn-lg">{FINAL.cta}</Cta>
            </div>
            <p className="micro">{FINAL.micro}</p>
          </div>
        </section>

        {/* ═══ PERGUNTAS FREQUENTES ═══ */}
        <section className="section faq" id="faq">
          <div className="wrap narrow">
            <p className="eyebrow">{FAQ.eyebrow}</p>
            <h2 className="center">{FAQ.h2}</h2>
            <p className="lede center-lede">{FAQ.lede}</p>
            <FaqList items={FAQ.items} />
          </div>
        </section>
      </main>

      <footer className="foot">
        <div className="wrap foot-inner">
          <p>
            <strong>{BRAND}</strong> — continue construindo pela API do Claude.
          </p>
          <nav aria-label="Rodapé">
            {FOOT_NAV.map((n) => (
              <a key={n.href} href={n.href}>
                {n.label}
              </a>
            ))}
          </nav>
          <p className="foot-fine">
            Serviço com limite de até 1 milhão de tokens por janela de 5 horas, por R$ 75.
          </p>
        </div>
      </footer>

      {/* `hidden` cortaria as transições CSS; a classe é que manda. */}
      <div className={`sticky-cta${stickyOn ? " is-on" : ""}`} aria-hidden={!stickyOn}>
        <div>
          <strong>{BRAND}</strong>
          <span>R$ 75 · até 1M de tokens</span>
        </div>
        <Cta className="btn">Continuar</Cta>
      </div>
    </>
  );
}
