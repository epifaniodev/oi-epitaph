import { Fragment } from "react";

import { Reveal } from "@/components/landing/Reveal";
import { SVG_PROPS } from "@/components/landing/sections";

import { Pendente } from "./Pendente";
import {
  AREA_ACESSO_ATIVA,
  METODO_ENTREGA,
  MOSTRAR_NOTAS_INTERNAS,
  NOTAS_INTERNAS,
  OBRIGADO,
  PENDENTES,
  POLITICA_REEMBOLSO,
  SUPORTE_WHATSAPP,
  VALIDADE_ACESSO,
} from "./copy";

/**
 * Página de obrigado — a copy é a do utilizador, transcrita.
 *
 * A decisão que a governa é dele e está no texto original: credencial não vai
 * no URL. Por isso não há aqui nada que leia `?token=` nem `?pedido=`, e a área
 * de acesso nasce fechada (`AREA_ACESSO_ATIVA` em `copy.ts`): enquanto não
 * existir login e a credencial não vier do pedido pago, o que se mostra é o que
 * tem de existir primeiro, não um placeholder que pareça um acesso a sério.
 */
export function ObrigadoPage() {
  const waHref = SUPORTE_WHATSAPP
    ? `https://wa.me/${SUPORTE_WHATSAPP}?text=${encodeURIComponent(OBRIGADO.msgPreenchida)}`
    : "";

  return (
    <>
      <div className="noise" aria-hidden="true" />
      <div className="aura aura-a" aria-hidden="true" />
      <div className="aura aura-b" aria-hidden="true" />

      <a className="skip" href="#acesso">
        Ir para o acesso
      </a>

      {PENDENTES.length > 0 ? (
        <div className="pend-banner" role="status">
          <div className="wrap">
            <strong>Rascunho</strong>
            <p>
              Faltam {PENDENTES.length} informações reais nesta página:{" "}
              {PENDENTES.map((p) => p.o_que).join(", ")}.
            </p>
          </div>
        </div>
      ) : null}

      <header className="thanks-head">
        <div className="wrap narrow">
          <span className="thanks-mark" aria-hidden="true">
            <svg {...SVG_PROPS} width="26" height="26">
              <path d="M5 13l4 4L19 7" />
            </svg>
          </span>
          <h1>{OBRIGADO.titulo}</h1>
          <p className="lede">{OBRIGADO.lede}</p>
        </div>
      </header>

      <main>
        {/* ═══ PRÓXIMOS PASSOS ═══ */}
        <section className="section steps" id="passos">
          <div className="wrap narrow">
            <h2>Próximos passos</h2>
            <ol className="thanks-steps">
              {OBRIGADO.passos.map((p) => (
                <li key={p}>{p}</li>
              ))}
            </ol>
          </div>
        </section>

        {/* ═══ ACESSO ═══ */}
        <section className="section" id="acesso">
          <div className="wrap narrow">
            <Reveal className={`access-box${AREA_ACESSO_ATIVA ? "" : " is-locked"}`}>
              <div className="access-head">
                <h2>Seu acesso</h2>
                <span className="access-state">
                  {AREA_ACESSO_ATIVA ? "Disponível" : "Ainda não ligado"}
                </span>
              </div>

              {AREA_ACESSO_ATIVA ? (
                /* Aqui entra a credencial, servida pelo pedido pago depois do
                   login — nunca pelo URL desta página. */
                <p>As instruções do seu acesso estão abaixo.</p>
              ) : (
                <>
                  <p>
                    Esta área vai mostrar as instruções de configuração quando o acesso estiver
                    ligado ao seu pedido. Por segurança, a credencial não viaja no endereço desta
                    página: ela é servida depois do login, apenas para o pedido que já está pago.
                  </p>
                  <p>
                    Método de entrega:{" "}
                    {METODO_ENTREGA ? (
                      METODO_ENTREGA
                    ) : (
                      <Pendente>informar como o acesso chega ao cliente</Pendente>
                    )}
                  </p>
                </>
              )}
            </Reveal>
          </div>
        </section>

        {/* ═══ CAPACIDADE CONTRATADA ═══ */}
        <section className="section" id="capacidade">
          <div className="wrap narrow">
            <h2>Capacidade contratada</h2>
            <dl className="kv">
              {OBRIGADO.capacidade.map((c) => (
                <Fragment key={c.k}>
                  <dt>{c.k}</dt>
                  <dd>{c.v}</dd>
                </Fragment>
              ))}
              <dt>Validade</dt>
              <dd>{VALIDADE_ACESSO ? VALIDADE_ACESSO : <Pendente>informar o prazo</Pendente>}</dd>
            </dl>
          </div>
        </section>

        {/* ═══ SKILL ADICIONAL ═══ */}
        <section className="section" id="skill">
          <div className="wrap narrow">
            <Reveal className="access-box is-locked">
              <div className="access-head">
                <h2>{OBRIGADO.skillTitulo}</h2>
                <span className="access-state">Se aplicável</span>
              </div>
              <p>{OBRIGADO.skillLede}</p>
              <dl className="kv">
                <dt>Skill adquirida</dt>
                <dd>
                  <Pendente>preenchido pelo pedido, quando existir skill</Pendente>
                </dd>
                <dt>Instruções</dt>
                <dd>
                  <Pendente>link ou conteúdo da skill</Pendente>
                </dd>
              </dl>
            </Reveal>
          </div>
        </section>

        {/* ═══ AJUDA ═══ */}
        <section className="section" id="ajuda">
          <div className="wrap narrow">
            <Reveal className="access-box">
              <div className="access-head">
                <h2>{OBRIGADO.ajudaTitulo}</h2>
              </div>
              <p>{OBRIGADO.ajudaLede}</p>

              {waHref ? (
                <a className="btn btn-lg" href={waHref}>
                  {OBRIGADO.ajudaBotao}
                </a>
              ) : (
                <p>
                  Canal de suporte: <Pendente>informar o número de WhatsApp do suporte</Pendente>
                </p>
              )}

              <p className="micro">Mensagem pré-preenchida: «{OBRIGADO.msgPreenchida}»</p>
            </Reveal>
          </div>
        </section>

        {/* ═══ NOTAS INTERNAS ═══ */}
        {MOSTRAR_NOTAS_INTERNAS ? (
          <section className="section" id="seguranca">
            <div className="wrap narrow">
              <Reveal className="internal">
                <span className="internal-tag">Nota interna — não publicar</span>
                <h2>Ponto importante de segurança</h2>
                <p>
                  Credencial ou token não vão no URL desta página. O acesso tem de cumprir os pontos
                  abaixo antes de esta área ser ligada:
                </p>
                <ul className="mini">
                  {NOTAS_INTERNAS.map((n) => (
                    <li key={n}>{n}</li>
                  ))}
                </ul>
                <p className="micro">
                  Política de reembolso a comunicar aqui:{" "}
                  {POLITICA_REEMBOLSO ? (
                    POLITICA_REEMBOLSO
                  ) : (
                    <Pendente>informar a política real</Pendente>
                  )}
                </p>
              </Reveal>
            </div>
          </section>
        ) : null}

        <section className="section final">
          <div className="wrap narrow center">
            <p className="lede">
              Guarde esta página. As instruções de configuração ficam disponíveis aqui assim que o
              acesso estiver ligado ao seu pedido.
            </p>
            <div className="center-row">
              <a className="btn btn-lg ghost" href="/claude2">
                Voltar à oferta
              </a>
            </div>
          </div>
        </section>
      </main>

      <footer className="foot">
        <div className="wrap foot-inner">
          <p>
            <strong>Claude Code — Capacidade</strong> — suporte e instruções de acesso.
          </p>
          <nav aria-label="Rodapé">
            <a href="/claude2">A oferta</a>
            <a href="/claude-code">Claude Code na Prática</a>
            <a href="/loja">Marketplace</a>
          </nav>
        </div>
      </footer>
    </>
  );
}
