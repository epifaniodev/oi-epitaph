import { FaqList, type Faq } from "@/components/landing/FaqList";
import { Reveal } from "@/components/landing/Reveal";
import { SVG_PROPS } from "@/components/landing/sections";
import { useLandingChrome } from "@/components/landing/useLandingChrome";

import { Pendente } from "./Pendente";
import { resolveCtaHref2 } from "./checkout2";
import {
  DORES,
  FAQ,
  FOOT_NAV,
  HERO,
  MARCA,
  METODO_ENTREGA,
  NAV,
  PASSOS,
  PLANOS,
  PENDENTES,
  POLITICA_REEMBOLSO,
  RECEBE,
  SUPORTE_WHATSAPP,
  TICKS,
  VALIDADE_ACESSO,
} from "./copy";

type CtaProps = {
  href?: string;
  className?: string;
  children: React.ReactNode;
  checkout?: boolean;
  upgrade?: boolean;
};

/**
 * Mesmo contrato do `<Cta>` da primeira landing, mas com o mapa de checkout
 * desta oferta — ver `checkout2.ts` para o motivo de não ser o mesmo mapa.
 */
function Cta({ href, className = "btn", children, ...offers }: CtaProps) {
  return (
    <a className={className} href={resolveCtaHref2(href, offers)}>
      {children}
    </a>
  );
}

function Ico({ path, size = 22 }: { path: string; size?: number }) {
  return (
    <svg {...SVG_PROPS} width={size} height={size} aria-hidden="true">
      <g dangerouslySetInnerHTML={{ __html: path }} />
    </svg>
  );
}

/**
 * Segunda oferta do Claude Code: mesma linguagem visual, outro público.
 *
 * A diferença de posicionamento é só a copy — quem chega aqui já sabe usar a
 * ferramenta, por isso caem as secções de método, tutorial e casos de uso, e
 * sobra o que esta oferta vende: capacidade por janela e acesso já configurado.
 *
 * O CSS é o mesmo da primeira landing (`landing.css`), mais o `extra.css`, que
 * só traz as classes novas desta página.
 */
export function Landing2Page() {
  const { stuck, menuOpen, setMenuOpen, heroRef, offerRef, menuBtnRef, stickyOn } =
    useLandingChrome();

  /**
   * Três respostas dependem de factos que ainda não existem. Sem isto ficavam
   * em branco ao abrir — indistinguíveis de uma resposta dada. Com o marcador,
   * quem lê sabe que falta preencher.
   */
  const pendente = (o_que: string) => <Pendente>{o_que}</Pendente>;

  const faq: Faq[] = FAQ.map((f) =>
    f.a
      ? f
      : {
          q: f.q,
          a:
            f.q === "Quanto tempo dura o acesso?"
              ? VALIDADE_ACESSO || pendente("informar o prazo real do acesso")
              : f.q === "Posso pedir reembolso?"
                ? POLITICA_REEMBOLSO || pendente("informar a política real de reembolso")
                : METODO_ENTREGA || pendente("informar como o acesso chega ao cliente"),
        },
  );

  return (
    <>
      <div className="noise" aria-hidden="true" />
      <div className="aura aura-a" aria-hidden="true" />
      <div className="aura aura-b" aria-hidden="true" />

      <a className="skip" href="#hero">
        Ir para o conteúdo
      </a>

      {/* Só aparece enquanto houver factos por preencher. Desaparece sozinha
          quando `copy.ts` estiver completo — não é preciso lembrar-se de a tirar. */}
      {PENDENTES.length > 0 ? (
        <div className="pend-banner" role="status">
          <div className="wrap">
            <strong>Rascunho</strong>
            <p>
              Faltam {PENDENTES.length} informações reais antes de publicar:{" "}
              {PENDENTES.map((p) => p.o_que).join(", ")}.
            </p>
          </div>
        </div>
      ) : null}

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
              <strong>{MARCA.nome}</strong>
              <small>{MARCA.sub}</small>
            </span>
          </a>

          <nav className="topnav" aria-label="Seções">
            {NAV.map((n) => (
              <a key={n.href} href={n.href}>
                {n.label}
              </a>
            ))}
          </nav>

          <Cta className="btn btn-sm">Quero o acesso</Cta>

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
            <a href="/claude2/obrigado">Já comprei</a>
            <Cta className="btn">Quero o acesso</Cta>
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
                {HERO.h1a} <span className="hl">{HERO.h1b}</span>
              </h1>
              <p className="lede">{HERO.lede}</p>

              <ul className="ticks">
                {TICKS.map((t) => (
                  <li key={t}>{t}</li>
                ))}
              </ul>

              <div className="cta-row">
                <Cta className="btn btn-lg">Quero o acesso agora</Cta>
                <a className="btn btn-lg ghost" href="#como-funciona">
                  Ver como funciona
                </a>
              </div>
              <p className="micro">
                Acesso configurado, instruções de conexão e suporte na configuração inicial.
              </p>
            </div>

            <div className="hero-visual">
              <p className="sr-only">
                Demonstração: a janela de uso em 1 milhão de tokens, o aviso ao atingir o limite e a
                abertura da janela seguinte.
              </p>
              <div className="mock">
                <div className="mock-bar">
                  <span className="dot r" aria-hidden="true" />
                  <span className="dot y" aria-hidden="true" />
                  <span className="dot g" aria-hidden="true" />
                  <span className="mock-title">acesso — janela de 5h</span>
                </div>

                <div className="mock-pane">
                  <p className="line">
                    <span className="pmt">›</span> continuar o refactor do módulo de faturação
                  </p>
                  <p className="line dim">
                    ⏺ Edit <b>billing/invoice.ts</b> <span className="ok">+84 −31</span>
                  </p>
                  <p className="line dim">
                    ⏺ Read <b>billing/__tests__/invoice.test.ts</b>
                  </p>
                  <p className="line dim">
                    ⏺ Edit <b>billing/__tests__/invoice.test.ts</b> <span className="ok">+46</span>
                  </p>
                  <p className="line ok">✔ 12 testes a passar · janela ainda aberta</p>
                  <p className="line dim">⏺ migração gerada · 1 ficheiro novo</p>
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
                  <div className="meter">
                    <div className="meter-head">
                      <span>Janela em curso</span>
                      <span className="meter-val">1M tokens / 5h</span>
                    </div>
                    <div className="meter-bar">
                      <i />
                    </div>
                  </div>
                  <div className="pv-cards">
                    <i />
                    <i />
                    <i />
                  </div>
                </div>

                <div className="float-chip chip-1" aria-hidden="true">
                  sem parar a meio
                </div>
                <div className="float-chip chip-2" aria-hidden="true">
                  1M / 5h
                </div>
                <div className="float-chip chip-3" aria-hidden="true">
                  já configurado
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
              <b>0</b>
              <span>passos de configuração do gateway</span>
            </div>
            <div>
              <b>1</b>
              <span>janela a renovar a cada 5 horas</span>
            </div>
            <div>
              <b>24h</b>
              <span>de suporte na configuração inicial</span>
            </div>
          </Reveal>
        </section>

        {/* ═══ BARRA DE CLAREZA ═══ */}
        <Reveal as="section" className="band">
          <div className="wrap">
            <p className="band-lead">
              <strong>Isto não é um curso.</strong> É capacidade contratada: acesso já configurado,
              com uma janela maior, para quem já sabe conduzir a ferramenta.
            </p>
            <h2 className="sr-only">Como a oferta funciona</h2>
            <div className="band-grid">
              {PASSOS.map((s) => (
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
            <h2>O travão não é o prompt. É a janela a fechar a meio.</h2>
            <p className="lede">
              Você já sabe o que pedir. Sabe dar contexto, estruturar a tarefa e revisar o
              resultado. O que atrapalha é o teto de tokens a acabar antes do trabalho:
            </p>

            <Reveal as="ul" className="questions">
              {DORES.map((q) => (
                <li key={q}>{q}</li>
              ))}
            </Reveal>

            <p className="lede">
              Não é falta de método. É trabalho interrompido — e trabalho interrompido custa mais
              tempo do que o que a janela pouparia.
            </p>

            <blockquote className="impact">Você já tem o volante. Falta o depósito.</blockquote>
          </div>
        </section>

        {/* ═══ SOLUÇÃO ═══ */}
        <section className="section solution" id="como-funciona">
          <div className="wrap narrow">
            <p className="eyebrow">A oferta</p>
            <h2>Capacidade maior por janela, para o trabalho não parar no meio.</h2>
            <p className="lede">
              Um ciclo de trabalho num projeto real gasta tokens em cada passo: ler os ficheiros,
              escrever, correr os testes, ver o que falhou, corrigir e repetir. Numa janela de 1
              milhão de tokens esse ciclo cabe inteiro — sobretudo quando são vários seguidos.
            </p>

            <Reveal className="notice">
              <span className="notice-ico" aria-hidden="true">
                !
              </span>
              <p>
                <strong>Importante:</strong> o serviço não é ilimitado. São até 1 milhão de tokens
                por janela de 5 horas. Ao atingir o limite, o sistema avisa e você espera a próxima
                janela abrir — não há cobrança por excedente.
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
              Mais capacidade por janela significa menos vezes a parar, e menos contexto perdido
              entre uma paragem e a seguinte.
            </p>
          </div>
        </section>

        {/* ═══ O QUE RECEBE ═══ */}
        <section className="section receive" id="o-que-recebe">
          <div className="wrap">
            <p className="eyebrow">O que você recebe</p>
            <h2 className="center">Acesso, instruções e apoio — sem montar nada</h2>

            <div className="cards">
              {RECEBE.map((c, i) => (
                <Reveal as="article" className="card" key={c.t} index={i}>
                  <span className="card-ico" aria-hidden="true">
                    <Ico path={c.ico} />
                  </span>
                  <h3>{c.t}</h3>
                  <p>{c.p}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ═══ PARA QUEM É / NÃO É ═══ */}
        <section className="section fit" id="para-quem">
          <div className="wrap fit-grid">
            <Reveal as="article" className="fit-col yes">
              <h2>Esta oferta é para você se…</h2>
              <ul className="ticks">
                <li>Você já usa o Claude Code e sabe conduzir a ferramenta;</li>
                <li>Trabalha em projetos que gastam a janela antes de terminarem;</li>
                <li>Não quer montar gateway nem resolver configuração;</li>
                <li>Quer continuar de onde parou, sem repetir o contexto do início.</li>
              </ul>
            </Reveal>

            <Reveal as="article" className="fit-col no">
              <h2>Talvez não seja para você se…</h2>
              <ul className="crosses">
                <li>Você ainda não usa o Claude Code — a oferta não ensina a usar;</li>
                <li>Quer um tutorial de zero, com prompts e casos de uso;</li>
                <li>Procura um serviço sem limite de tokens — este tem limite por janela;</li>
                <li>Só precisa de usar a ferramenta de vez em quando.</li>
              </ul>
            </Reveal>
          </div>
        </section>

        {/* ═══ DIFERENCIAÇÃO ═══ */}
        <section className="section diff" id="diferenca">
          <div className="wrap narrow">
            <p className="eyebrow">A diferença</p>
            <h2>Você não compra um curso. Compra janela e configuração pronta.</h2>

            <Reveal
              className="table"
              role="table"
              aria-label="Comparação entre a primeira oferta e a segunda"
            >
              <div className="tr th" role="row">
                <span role="columnheader">Claude Code na Prática</span>
                <span role="columnheader">{MARCA.nome}</span>
              </div>
              <div className="tr" role="row">
                <span role="cell">Ensina a usar a ferramenta</span>
                <span role="cell">Assume que você já usa</span>
              </div>
              <div className="tr" role="row">
                <span role="cell">Tutorial, prompts e casos de uso</span>
                <span role="cell">Instruções de conexão</span>
              </div>
              <div className="tr" role="row">
                <span role="cell">Skill de landing pages</span>
                <span role="cell">Acesso já configurado</span>
              </div>
              <div className="tr" role="row">
                <span role="cell">Para começar do zero</span>
                <span role="cell">Para quem já está a meio</span>
              </div>
            </Reveal>

            <p className="callout">
              Se você quer aprender a usar, a oferta certa é a{" "}
              <a href="/claude-code">Claude Code na Prática</a>. Esta segunda é para quem já passou
              dessa etapa.
            </p>
          </div>
        </section>

        {/* ═══ OFERTA ═══ */}
        <section className="section offer" id="oferta" ref={offerRef}>
          <div className="wrap narrow">
            <p className="eyebrow">A oferta</p>
            <h2 className="center">Comece com a janela de 1 milhão</h2>

            <Reveal className="offer-card">
              <div className="offer-body">
                <h3>Você recebe</h3>
                <ul className="ticks two">
                  <li>Acesso configurado ao Claude Code;</li>
                  <li>Até 1 milhão de tokens por janela de 5 horas;</li>
                  <li>Instruções de conexão com o seu ambiente;</li>
                  <li>Suporte na configuração inicial;</li>
                  <li>Aviso ao atingir o limite da janela;</li>
                  <li>Sem cobrança por excedente.</li>
                </ul>
              </div>

              <aside className="offer-price">
                <span className="offer-tag">Assinatura mensal</span>
                <p className="price-now">
                  <small>Por apenas</small>
                  <strong>R$ 75</strong>
                </p>
                <p className="price-note">Acesso configurado, instruções de conexão e suporte.</p>
                <Cta className="btn btn-lg block" checkout>
                  Quero o acesso
                </Cta>
                <p className="micro">
                  Validade do acesso:{" "}
                  {VALIDADE_ACESSO ? VALIDADE_ACESSO : <Pendente>informar o prazo real</Pendente>}
                </p>
              </aside>
            </Reveal>
          </div>
        </section>

        {/* ═══ PLANOS ═══ */}
        <section className="section ladder" id="planos">
          <div className="wrap">
            <p className="eyebrow">Quando o projeto cresce</p>
            <h2 className="center">O que muda quando a janela é maior</h2>
            <p className="lede center-lede">
              A diferença entre os planos é quantos tokens cabem em cada janela de 5 horas — e,
              portanto, quantas vezes o trabalho para. O preço por hora de trabalho cai conforme a
              janela sobe.
            </p>

            <div className="ladder-grid">
              {PLANOS.map((r, i) => (
                <Reveal as="article" className="rung" key={r.lvl} index={i}>
                  <span className="rung-lvl">{r.lvl}</span>
                  {"flag" in r && r.flag ? <span className="rung-flag">{r.flag}</span> : null}
                  <h3>{r.t}</h3>
                  <p className="rung-for">{r.para}</p>
                  <ul className="mini">
                    {r.mini.map((m) => (
                      <li key={m}>{m}</li>
                    ))}
                  </ul>
                  {r.lvl === "5M" ? (
                    <Cta className="rung-cta" href="#oferta" upgrade>
                      Falar sobre o plano de 5M
                    </Cta>
                  ) : null}
                </Reveal>
              ))}
            </div>

            <p className="callout center-lede">
              Você não precisa decidir agora. Comece com 1 milhão e mude quando a janela passar a
              ser o que trava.
            </p>
          </div>
        </section>

        {/* ═══ GARANTIA E SUPORTE ═══ */}
        <section className="section trust" id="garantia">
          <div className="wrap trust-grid">
            <Reveal as="article" className="trust-card">
              <span className="trust-ico" aria-hidden="true">
                <svg {...SVG_PROPS} width="24" height="24">
                  <path d="M12 3l7 3v6c0 4.2-2.9 7.6-7 9-4.1-1.4-7-4.8-7-9V6z" />
                  <path d="m9 12 2 2 4-4" />
                </svg>
              </span>
              <h2>Reembolso</h2>
              <p>
                {POLITICA_REEMBOLSO ? (
                  POLITICA_REEMBOLSO
                ) : (
                  <Pendente>informar a política real da oferta — prazo e como pedir</Pendente>
                )}
              </p>
            </Reveal>

            <Reveal as="article" className="trust-card">
              <span className="trust-ico" aria-hidden="true">
                <svg {...SVG_PROPS} width="24" height="24">
                  <path d="M4 12a8 8 0 1 1 3 6.2" />
                  <path d="M4 18v-5h5" />
                </svg>
              </span>
              <h2>Você não configura sozinho</h2>
              <p>
                Se o acesso não ligar no seu ambiente, o suporte orienta nos passos de conexão,
                teste e integração até responder.
              </p>
              <ul className="mini">
                <li>Ajuda com a configuração;</li>
                <li>Orientação para executar os comandos;</li>
                <li>Apoio no teste do acesso;</li>
                <li>Orientação sobre a notificação de limite.</li>
              </ul>
              <p className="micro">
                Canal de suporte:{" "}
                {SUPORTE_WHATSAPP ? SUPORTE_WHATSAPP : <Pendente>informar o canal real</Pendente>}
              </p>
            </Reveal>
          </div>
        </section>

        {/* ═══ FAQ ═══ */}
        <section className="section faq" id="faq">
          <div className="wrap narrow">
            <p className="eyebrow">Dúvidas</p>
            <h2 className="center">Perguntas frequentes</h2>
            <FaqList items={faq} />
          </div>
        </section>

        {/* ═══ CTA FINAL ═══ */}
        <section className="section final" id="comecar">
          <div className="wrap narrow center">
            <h2>O seu próximo projeto não precisa de parar a meio.</h2>
            <p className="lede">
              Acesso já configurado, com até 1 milhão de tokens por janela de 5 horas, para quem já
              sabe o que pedir e só precisa de espaço para o fazer.
            </p>
            <div className="center-row">
              <Cta className="btn btn-lg">Quero o acesso agora</Cta>
            </div>
            <p className="micro">
              Acesso configurado + instruções de conexão + suporte na configuração inicial.
            </p>
          </div>
        </section>
      </main>

      <footer className="foot">
        <div className="wrap foot-inner">
          <p>
            <strong>{MARCA.nome}</strong> — {MARCA.sub.toLowerCase()}
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
            com data de expiração. Validade do acesso e política de reembolso informadas na compra.
          </p>
        </div>
      </footer>

      {/* `hidden` cortaria as transições CSS; a classe é que manda. */}
      <div className={`sticky-cta${stickyOn ? " is-on" : ""}`} aria-hidden={!stickyOn}>
        <div>
          <strong>{MARCA.nome}</strong>
          <span>R$ 75 · assinatura mensal</span>
        </div>
        <Cta className="btn">Quero o acesso</Cta>
      </div>
    </>
  );
}
