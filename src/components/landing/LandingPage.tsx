import { useEffect, useRef, useState } from "react";

import { FaqList } from "./FaqList";
import { Reveal } from "./Reveal";
import {
  CASES,
  CROSS,
  DIFF_ROWS,
  FAQ,
  FIT_NO,
  FIT_YES,
  FLOW,
  FOOT_NAV,
  LADDER,
  NAV,
  OFFER_TICKS,
  QUESTIONS,
  RECEIVE,
  STEPS,
  SVG_PROPS,
  TICKS,
  TIMELINE,
} from "./sections";

type CtaProps = {
  href?: string;
  className?: string;
  children: React.ReactNode;
  bump?: boolean;
  upgrade?: boolean;
  cross?: boolean;
  checkout?: boolean;
};

/**
 * Botão de ação.
 *
 * Sem URL de checkout configurado (ver `checkout.ts`), o `href` continua a
 * âncora que o markup lhe deu — nunca `#`, que era um link morto. Quando os
 * URLs existirem, é o `href` que muda; o resto do componente fica igual.
 */
function Cta({ href, className = "btn", children, ...flags }: CtaProps) {
  return (
    <a className={className} href={href ?? "#oferta"}>
      {children}
    </a>
  );
}

function Ico({ path }: { path: string }) {
  return (
    <svg {...SVG_PROPS} width="22" height="22" aria-hidden="true">
      <g dangerouslySetInnerHTML={{ __html: path }} />
    </svg>
  );
}

export function LandingPage() {
  const [stuck, setStuck] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [pastHero, setPastHero] = useState(false);
  const [offerVisible, setOfferVisible] = useState(false);

  const heroRef = useRef<HTMLElement>(null);
  const offerRef = useRef<HTMLElement>(null);
  const menuBtnRef = useRef<HTMLButtonElement>(null);

  /* Topbar sólida depois de o hero sair do ecrã. */
  useEffect(() => {
    const hero = heroRef.current;
    if (!hero) return;
    const obs = new IntersectionObserver(([entry]) => setStuck(!entry?.isIntersecting), {
      rootMargin: "-72px 0px 0px 0px",
      threshold: 0,
    });
    obs.observe(hero);
    return () => obs.disconnect();
  }, []);

  /* CTA fixo: aparece depois do hero e desaparece enquanto a oferta está no
     ecrã — sobre a oferta seria ruído, é para lá que ele leva. */
  useEffect(() => {
    const hero = heroRef.current;
    if (!hero) return;

    const obs = new IntersectionObserver(([entry]) => setPastHero(!entry?.isIntersecting), {
      threshold: 0,
    });
    obs.observe(hero);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    const offer = offerRef.current;
    if (!offer) return;
    const obs = new IntersectionObserver(
      ([entry]) => setOfferVisible(Boolean(entry?.isIntersecting)),
      {
        threshold: 0,
      },
    );
    obs.observe(offer);
    return () => obs.disconnect();
  }, []);

  /* Escape fecha o menu mobile, senão ficava aberto por cima do conteúdo sem
     forma de o dispensar pelo teclado. */
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
              <strong>Claude Code na Prática</strong>
              <small>Crie projetos reais com inteligência artificial.</small>
            </span>
          </a>

          <nav className="topnav" aria-label="Seções">
            {NAV.map((n) => (
              <a key={n.href} href={n.href}>
                {n.label}
              </a>
            ))}
          </nav>

          <Cta className="btn btn-sm">Quero começar</Cta>

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
            {NAV.map((n) => (
              <a key={n.href} href={n.href}>
                {n.label}
              </a>
            ))}
            <a href="#skills-segmento">Skills por segmento</a>
            <a href="#faq">Perguntas frequentes</a>
            <Cta className="btn">Quero começar</Cta>
          </div>
        ) : null}
      </header>

      <main>
        {/* ═══ HERO ═══ */}
        <section className="hero" id="hero" ref={heroRef}>
          <div className="wrap hero-grid">
            <div className="hero-copy">
              <p className="eyebrow">Aprenda a usar o Claude Code na prática</p>
              <h1>
                Transforme suas ideias em <span className="hl">landing pages e projetos reais</span>{" "}
                com Claude Code.
              </h1>
              <p className="lede">
                Aprenda a configurar a ferramenta, use uma skill especializada e siga um processo
                prático para criar páginas profissionais com inteligência artificial, mesmo sem
                começar pela programação tradicional.
              </p>

              <ul className="ticks">
                {TICKS.map((t) => (
                  <li key={t}>{t}</li>
                ))}
              </ul>

              <div className="cta-row">
                <Cta className="btn btn-lg">Quero começar agora</Cta>
                <a className="btn btn-lg ghost" href="#como-funciona">
                  Ver como funciona
                </a>
              </div>
              <p className="micro">
                Acesso ao material, configuração guiada e suporte para começar.
              </p>
            </div>

            {/* O mockup mostra o produto a funcionar, por isso fica exposto à
                tecnologia de apoio. Só as partes sem texto ficam decorativas. */}
            <div className="hero-visual">
              <p className="sr-only">
                Demonstração: você escreve um pedido, o Claude Code lê a skill de landing pages e
                cria os arquivos da página, até ficar pronta e responsiva.
              </p>
              <div className="mock">
                <div className="mock-bar">
                  <span className="dot r" aria-hidden="true" />
                  <span className="dot y" aria-hidden="true" />
                  <span className="dot g" aria-hidden="true" />
                  <span className="mock-title">claude-code — landing-page/</span>
                </div>

                <div className="mock-pane">
                  <p className="line">
                    <span className="pmt">›</span> crie uma landing page para clínica de estética
                  </p>
                  <p className="line dim">
                    ⏺ Read <b>skill/landing-pages/SKILL.md</b>
                  </p>
                  <p className="line dim">
                    ⏺ Write <b>index.html</b> <span className="ok">+248</span>
                  </p>
                  <p className="line dim">
                    ⏺ Write <b>styles.css</b> <span className="ok">+512</span>
                  </p>
                  <p className="line dim">
                    ⏺ Edit <b>sections/hero.html</b> <span className="ok">+12 −4</span>
                  </p>
                  <p className="line ok">✔ página responsiva pronta · 6 seções</p>
                  <p className="line">
                    <span className="pmt">›</span> <span className="caret" aria-hidden="true" />
                  </p>
                </div>

                <div className="mock-preview" aria-hidden="true">
                  <div className="pv-bar">
                    <i />
                    <i />
                    <i />
                  </div>
                  <div className="pv-hero">
                    <span className="pv-tag">CLÍNICA DE ESTÉTICA</span>
                    <span className="pv-h1" />
                    <span className="pv-h1 short" />
                    <span className="pv-p" />
                    <span className="pv-p short" />
                    <span className="pv-btn" />
                  </div>
                  <div className="pv-cards">
                    <i />
                    <i />
                    <i />
                  </div>
                </div>

                <div className="float-chip chip-1" aria-hidden="true">
                  prompt
                </div>
                <div className="float-chip chip-2" aria-hidden="true">
                  código
                </div>
                <div className="float-chip chip-3" aria-hidden="true">
                  página pronta
                </div>
              </div>
            </div>
          </div>

          <Reveal className="wrap stat-strip">
            <div>
              <b>1M</b>
              <span>tokens por janela de 5 horas</span>
            </div>
            <div>
              <b>5</b>
              <span>prompts prontos por nicho</span>
            </div>
            <div>
              <b>1</b>
              <span>skill especializada em páginas</span>
            </div>
            <div>
              <b>7 dias</b>
              <span>de garantia para pedir reembolso</span>
            </div>
          </Reveal>
        </section>

        {/* ═══ BARRA DE CLAREZA ═══ */}
        <Reveal as="section" className="band">
          <div className="wrap">
            <p className="band-lead">
              <strong>Não é uma aula sobre IA.</strong> É um método prático para configurar o Claude
              Code e usar a ferramenta na criação de projetos reais.
            </p>
            {/* h2 visualmente escondido: a secção não tem título próprio (só a
                frase de entrada), e sem ele os h3 seguintes saltavam do h1. */}
            <h2 className="sr-only">Como o método funciona</h2>
            <div className="band-grid">
              {STEPS.map((s) => (
                <article key={s.n}>
                  <span className="band-num" aria-hidden="true">
                    {s.n}
                  </span>
                  <h3>{s.t}</h3>
                  <p>{s.d}</p>
                </article>
              ))}
            </div>
          </div>
        </Reveal>

        {/* ═══ DOR ═══ */}
        <section className="section pain" id="problema">
          <div className="wrap narrow">
            <p className="eyebrow warm">O problema</p>
            <h2>
              O problema não é falta de ideias. É não conseguir transformar a ideia em algo pronto.
            </h2>
            <p className="lede">
              Você sabe que o Claude Code pode ajudar a criar páginas, sistemas e produtos digitais.
              Mas, na prática, surgem várias dúvidas:
            </p>

            <Reveal as="ul" className="questions">
              {QUESTIONS.map((q) => (
                <li key={q}>{q}</li>
              ))}
            </Reveal>

            <p className="lede">
              Sem um processo, você perde tempo testando comandos aleatórios e tentando corrigir
              problemas sem saber exatamente o que pedir.
            </p>

            <blockquote className="impact">
              A ferramenta é poderosa. O que falta é saber conduzi-la.
            </blockquote>
          </div>
        </section>

        {/* ═══ SOLUÇÃO ═══ */}
        <section className="section solution" id="como-funciona">
          <div className="wrap narrow">
            <p className="eyebrow">A solução</p>
            <h2>Um processo guiado para sair da ideia e chegar a uma página funcionando.</h2>
            <p className="lede">
              O Claude Code na Prática mostra como configurar a ferramenta e utilizá-la como uma
              parceira de criação. Você aprende a fornecer contexto, organizar as etapas, revisar o
              resultado e pedir melhorias com mais precisão.
            </p>

            <Reveal as="ol" className="flow">
              {FLOW.map((f, i) => (
                <li key={f} className={i === FLOW.length - 1 ? "end" : undefined}>
                  <span>{f}</span>
                </li>
              ))}
            </Reveal>

            <p className="callout">
              Você não precisa tentar adivinhar o prompt perfeito. O processo foi organizado para
              que você saiba o que fazer em cada etapa.
            </p>
          </div>
        </section>

        {/* ═══ O QUE RECEBE ═══ */}
        <section className="section receive" id="o-que-recebe">
          <div className="wrap">
            <p className="eyebrow">O material</p>
            <h2 className="center">Tudo o que você precisa para começar a criar com Claude Code</h2>

            <div className="cards">
              {RECEIVE.map((c, i) => (
                <Reveal as="article" className="card" key={c.t} index={i}>
                  <span className="card-ico" aria-hidden="true">
                    <Ico path={c.ico} />
                  </span>
                  <h3>{c.t}</h3>
                  <p>{c.p}</p>
                  {c.mini ? (
                    <ul className="mini">
                      {c.mini.map((m) => (
                        <li key={m}>{m}</li>
                      ))}
                    </ul>
                  ) : null}
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ═══ PASSO A PASSO ═══ */}
        <section className="section steps" id="tutorial">
          <div className="wrap narrow">
            <p className="eyebrow">Passo a passo</p>
            <h2>Veja exatamente o que acontece depois da compra</h2>

            <ol className="timeline">
              {TIMELINE.map((s, i) => (
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
              <Cta className="btn btn-lg">Quero seguir o passo a passo</Cta>
            </div>
          </div>
        </section>

        {/* ═══ CASOS DE USO ═══ */}
        <section className="section cases" id="casos-de-uso">
          <div className="wrap">
            <p className="eyebrow">Casos de uso</p>
            <h2 className="center">O que você pode criar com Claude Code</h2>

            <div className="cases-grid">
              {CASES.map((c, i) => (
                <Reveal as="article" key={c.t} index={i}>
                  <span className="case-num">{i + 1}</span>
                  <h3>{c.t}</h3>
                  <p>{c.d}</p>
                </Reveal>
              ))}
            </div>

            <p className="transition">
              Você não aprende só a gerar código. Aprende a transformar uma ideia em um projeto
              utilizável.
            </p>
          </div>
        </section>

        {/* ═══ CAPACIDADE ═══ */}
        <section className="section capacity" id="capacidade">
          <div className="wrap narrow">
            <p className="eyebrow">Capacidade</p>
            <h2>Mais espaço para projetos que exigem contexto</h2>
            <p className="lede">
              Um projeto completo gasta tokens em cada etapa: ler os arquivos, escrever as seções,
              testar no celular, corrigir e refinar. A oferta inclui uma configuração de gateway com
              capacidade de <strong>1 milhão de tokens a cada 5 horas</strong>.
            </p>

            <Reveal className="notice">
              <span className="notice-ico" aria-hidden="true">
                !
              </span>
              <p>
                <strong>Importante:</strong> o serviço não é ilimitado. São 1 milhão de tokens por
                janela de 5 horas. Ao atingir o limite, o sistema avisa e você espera a próxima
                janela. A assinatura mensal tem data de expiração, informada na compra.
              </p>
            </Reveal>

            <Reveal className="meter">
              <div className="meter-head">
                <span>Janela de uso</span>
                <span className="meter-val">1M tokens / 5h</span>
              </div>
              <div className="meter-bar">
                <i />
              </div>
              <div className="meter-foot">
                <span>renovação por janela</span>
                <span>notificação ao atingir o limite</span>
              </div>
            </Reveal>

            <p className="callout">
              Mais capacidade por janela significa mais espaço para desenvolver, testar e melhorar
              seus projetos.
            </p>
          </div>
        </section>

        {/* ═══ PARA QUEM É / NÃO É ═══ */}
        <section className="section fit" id="para-quem">
          <div className="wrap fit-grid">
            <Reveal as="article" className="fit-col yes">
              <h2>Esta oferta é para você se…</h2>
              <ul className="ticks">
                {FIT_YES.map((t) => (
                  <li key={t}>{t}</li>
                ))}
              </ul>
            </Reveal>

            <Reveal as="article" className="fit-col no">
              <h2>Talvez não seja para você se…</h2>
              <ul className="crosses">
                {FIT_NO.map((t) => (
                  <li key={t}>{t}</li>
                ))}
              </ul>
            </Reveal>
          </div>
        </section>

        {/* ═══ DIFERENCIAÇÃO ═══ */}
        <section className="section diff" id="diferenca">
          <div className="wrap narrow">
            <p className="eyebrow">A diferença</p>
            <h2>Você não recebe só acesso. Recebe um caminho para produzir.</h2>

            {/* Sem role=table o leitor de ecrã lia 22 fragmentos soltos, sem
                ligação entre linha e coluna. */}
            <Reveal
              className="table"
              role="table"
              aria-label="Comparação entre trabalhar sem processo e com o Claude Code na Prática"
            >
              <div className="tr th" role="row">
                <span role="columnheader">Sem um processo</span>
                <span role="columnheader">Com o Claude Code na Prática</span>
              </div>
              {DIFF_ROWS.map(([a, b]) => (
                <div className="tr" role="row" key={a}>
                  <span role="cell">{a}</span>
                  <span role="cell">{b}</span>
                </div>
              ))}
            </Reveal>
          </div>
        </section>

        {/* ═══ OFERTA ═══ */}
        <section className="section offer" id="oferta" ref={offerRef}>
          <div className="wrap narrow">
            <p className="eyebrow">A oferta</p>
            <h2 className="center">Comece a criar com Claude Code hoje</h2>

            <Reveal className="offer-card">
              <div className="offer-body">
                <h3>Você recebe</h3>
                <ul className="ticks two">
                  {OFFER_TICKS.map((t) => (
                    <li key={t}>{t}</li>
                  ))}
                </ul>
              </div>

              <aside className="offer-price">
                <span className="offer-tag">Assinatura mensal</span>
                <p className="price-now">
                  <small>Por apenas</small>
                  <strong>R$ 75</strong>
                </p>
                <p className="price-note">Acesso ao material, configuração guiada e suporte.</p>
                <Cta className="btn btn-lg block" checkout>
                  Quero acessar o Claude Code na Prática
                </Cta>
                <p className="micro">
                  Configure, aprenda e comece seu primeiro projeto com orientação.
                </p>
              </aside>
            </Reveal>
          </div>
        </section>

        {/* ═══ ORDER BUMP ═══ */}
        <section className="section bump" id="order-bump">
          <div className="wrap narrow">
            <p className="eyebrow">Antes de finalizar</p>
            <h2>Adicione o clone que publica a sua página</h2>
            <p className="lede">
              A página pronta no seu computador ainda não tem endereço. Sem endereço, ninguém abre.
            </p>

            <Reveal className="bump-card">
              <div className="bump-check" aria-hidden="true">
                <svg
                  viewBox="0 0 24 24"
                  width="20"
                  height="20"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div className="bump-body">
                <span className="bump-tag">Adicionar por R$ 29,90</span>
                <h3>CloneSupa · 1 Clone</h3>
                <p>
                  Publica o projeto que você acabou de criar. O repositório do clone já vem com
                  banco de dados e hospedagem configurados, então você sobe a página e já consegue
                  mandar o link para o cliente.
                </p>
                <ul className="mini">
                  <li>Transforma o projeto local em link público;</li>
                  <li>O formulário da página passa a gravar os contatos;</li>
                  <li>Serve para os cinco nichos dos prompts prontos.</li>
                </ul>
              </div>
            </Reveal>

            <div className="bump-total">
              <div className="bump-price">
                <span>Total com o clone</span>
                <strong>R$ 104,90</strong>
              </div>
              <Cta className="btn btn-lg" bump>
                Quero com o clone
              </Cta>
              <a className="bump-skip" href="#oferta">
                Seguir só com o material
              </a>
            </div>

            <p className="callout">
              Se você já tem onde publicar, pule esta etapa. O material funciona sem ela.
            </p>
          </div>
        </section>

        {/* ═══ DEGRAUS DE CAPACIDADE ═══ */}
        <section className="section ladder" id="capacidade-extra">
          <div className="wrap">
            <p className="eyebrow">Quando o projeto cresce</p>
            <h2 className="center">O que muda quando você sobe de nível</h2>
            <p className="lede center-lede">
              A primeira landing page cabe na janela de 1M tokens. A partir da terceira, o tempo da
              janela passa a ser o que trava você: o projeto para no meio, você espera a renovação e
              perde o fio do que estava a fazer.
            </p>

            <div className="ladder-grid">
              {LADDER.map((r, i) => (
                <Reveal as="article" className="rung" key={r.lvl} index={i}>
                  <span className="rung-lvl">{r.lvl}</span>
                  {r.flag ? <span className="rung-flag">{r.flag}</span> : null}
                  <h3>{r.t}</h3>
                  <p className="rung-for">{r.for}</p>
                  <ul className="mini">
                    {r.mini.map((m) => (
                      <li key={m}>{m}</li>
                    ))}
                  </ul>
                  {r.upgrade ? (
                    <a className="rung-cta" href="#oferta">
                      Quero o plano de 5M
                    </a>
                  ) : null}
                </Reveal>
              ))}
            </div>

            <p className="callout center-lede">
              Você não precisa decidir agora. A diferença entre os planos é quantas páginas cabem em
              cada janela de 5 horas — o preço por página cai conforme a capacidade sobe.
            </p>
          </div>
        </section>

        {/* ═══ SKILLS POR SEGMENTO ═══ */}
        <section className="section cross" id="skills-segmento">
          <div className="wrap">
            <p className="eyebrow">Quando você já está a criar</p>
            <h2 className="center">O mesmo processo, ajustado ao seu segmento</h2>
            <p className="lede center-lede">
              A skill de landing pages ensina o método. Estes complementos trazem as regras do seu
              tipo de negócio — o que a página precisa mostrar, na ordem em que o cliente decide.
            </p>

            <div className="cross-grid">
              {CROSS.map((c, i) => (
                <Reveal as="article" className="cross-card" key={c.t} index={i}>
                  <span className="cross-ico" aria-hidden="true">
                    <svg
                      viewBox="0 0 24 24"
                      width="20"
                      height="20"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <g dangerouslySetInnerHTML={{ __html: c.ico }} />
                    </svg>
                  </span>
                  <h3>{c.t}</h3>
                  <p>{c.d}</p>
                  <span className="cross-hook">{c.hook}</span>
                </Reveal>
              ))}
            </div>

            <p className="callout center-lede">
              Cada complemento é uma skill que se instala ao lado da principal. O Claude Code passa
              a aplicar as regras do seu segmento sem você repetir o briefing a cada projeto.
            </p>

            <div className="center-row">
              <Cta className="btn btn-lg" cross>
                Quero a skill do meu segmento
              </Cta>
            </div>
          </div>
        </section>

        {/* ═══ GARANTIA E SUPORTE ═══ */}
        <section className="section trust" id="garantia">
          <div className="wrap trust-grid">
            <Reveal as="article" className="trust-card">
              <span className="trust-ico" aria-hidden="true">
                <svg
                  viewBox="0 0 24 24"
                  width="24"
                  height="24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M12 3l7 3v6c0 4.2-2.9 7.6-7 9-4.1-1.4-7-4.8-7-9V6z" />
                  <path d="m9 12 2 2 4-4" />
                </svg>
              </span>
              <h2>Você tem 7 dias para avaliar</h2>
              <p>
                Acesse o material, siga o passo a passo e veja se a solução faz sentido para você.
                Se perceber que o conteúdo não é adequado ao seu objetivo, peça o reembolso em até 7
                dias pelo suporte, com o e-mail usado na compra.
              </p>
            </Reveal>

            <Reveal as="article" className="trust-card">
              <span className="trust-ico" aria-hidden="true">
                <svg
                  viewBox="0 0 24 24"
                  width="24"
                  height="24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M4 12a8 8 0 1 1 3 6.2" />
                  <path d="M4 18v-5h5" />
                </svg>
              </span>
              <h2>Você não precisa configurar tudo sozinho</h2>
              <p>
                Se encontrar dificuldades durante a configuração, o suporte estará disponível para
                orientar você nos passos de conexão, teste e integração.
              </p>
              <ul className="mini">
                <li>Ajuda com a configuração;</li>
                <li>Orientação para executar os comandos;</li>
                <li>Apoio no teste da API;</li>
                <li>Dúvidas sobre o tutorial;</li>
                <li>Orientação sobre notificações de limite.</li>
              </ul>
            </Reveal>
          </div>
        </section>

        {/* ═══ FAQ ═══ */}
        <section className="section faq" id="faq">
          <div className="wrap narrow">
            <p className="eyebrow">Dúvidas</p>
            <h2 className="center">Perguntas frequentes</h2>
            <FaqList items={FAQ} />
          </div>
        </section>

        {/* ═══ CTA FINAL ═══ */}
        <section className="section final" id="comecar">
          <div className="wrap narrow center">
            <h2>Sua próxima página pode começar com uma ideia e alguns comandos.</h2>
            <p className="lede">
              Aprenda a configurar o Claude Code, use uma skill especializada e transforme suas
              ideias em landing pages e projetos reais com inteligência artificial.
            </p>
            <div className="center-row">
              <Cta className="btn btn-lg">Quero começar agora</Cta>
            </div>
            <p className="micro">Acesso ao material + configuração guiada + suporte.</p>
          </div>
        </section>
      </main>

      <footer className="foot">
        <div className="wrap foot-inner">
          <p>
            <strong>Claude Code na Prática</strong> — crie projetos reais com inteligência
            artificial.
          </p>
          <nav aria-label="Rodapé">
            {FOOT_NAV.map((n) => (
              <a key={n.href} href={n.href}>
                {n.label}
              </a>
            ))}
          </nav>
          <p className="foot-fine">
            Serviço com limite de até 1 milhão de tokens por janela de 5 horas e assinatura mensal
            com data de expiração. Garantia de 7 dias para pedir reembolso pelo suporte.
          </p>
        </div>
      </footer>

      {/* `hidden` cortaria as transições CSS; a classe é que manda. */}
      <div className={`sticky-cta${stickyOn ? " is-on" : ""}`} aria-hidden={!stickyOn}>
        <div>
          <strong>Claude Code na Prática</strong>
          <span>R$ 75 · assinatura mensal</span>
        </div>
        <Cta className="btn">Quero começar</Cta>
      </div>
    </>
  );
}
