/**
 * Copy da segunda oferta (`/claude2`) e da página de obrigado.
 *
 * ⚠️ QUATRO FACTOS AINDA NÃO TÊM RESPOSTA. Não foram inventados — aparecem na
 * página como marcadores `Pendente`, à vista, para que não se publiquem por
 * distração:
 *
 *   1. prazo de validade do acesso;
 *   2. método de entrega;
 *   3. política de garantia e reembolso;
 *   4. canal de suporte (número de WhatsApp).
 *
 * O texto original diz explicitamente «Não use essa expressão se não for
 * verdade» e «Informe a política real da oferta» — daí os marcadores em vez de
 * valores plausíveis. Preencher em `PENDENTES` e nos sítios marcados com
 * `pendente()` abaixo.
 *
 * A copy de `OBRIGADO` é a do utilizador, transcrita. A de `OFERTA` (a landing)
 * foi escrita para esta segunda oferta e é a única parte que não vem dele —
 * está toda entre este ficheiro e `Landing2Page.tsx`.
 */

/* ─────────────────────────────────────────────────────────────
   O que falta preencher
   ───────────────────────────────────────────────────────────── */

/** Prazo de validade do acesso. Ex.: "12 meses a contar da compra". */
export const VALIDADE_ACESSO = "";

/** Como o acesso chega ao cliente. Ex.: "e-mail em até 10 minutos". */
export const METODO_ENTREGA = "";

/** Política real. Ex.: "reembolso em até 7 dias pelo suporte". */
export const POLITICA_REEMBOLSO = "";

/** Número no formato internacional, só dígitos. Ex.: "5511999999999". */
export const SUPORTE_WHATSAPP = "";

/**
 * Enquanto isto for `false`, a área de acesso não mostra credencial nenhuma —
 * só explica o que tem de existir primeiro. É a decisão de segurança do próprio
 * utilizador: credencial não vai no URL nem é servida a quem não tem login.
 *
 * Ligar apenas quando existir login e a credencial vier do pedido pago.
 */
export const AREA_ACESSO_ATIVA = false;

/**
 * Bloco «Ponto importante de segurança»: são notas de operação, não copy de
 * cliente — falam de estorno e de registo de pedido. Ficam visíveis para não se
 * perderem, em painel marcado como interno. Pôr a `false` antes de publicar.
 */
export const MOSTRAR_NOTAS_INTERNAS = true;

export const PENDENTES = [
  { campo: VALIDADE_ACESSO, o_que: "prazo de validade do acesso" },
  { campo: METODO_ENTREGA, o_que: "método de entrega" },
  { campo: POLITICA_REEMBOLSO, o_que: "política de garantia e reembolso" },
  { campo: SUPORTE_WHATSAPP, o_que: "canal de suporte" },
].filter((p) => !p.campo);

/* ─────────────────────────────────────────────────────────────
   /claude2 — a oferta para quem já programa
   ───────────────────────────────────────────────────────────── */

export const NAV = [
  { href: "#como-funciona", label: "Como funciona" },
  { href: "#o-que-recebe", label: "O que você recebe" },
  { href: "#planos", label: "Planos" },
  { href: "#faq", label: "Dúvidas" },
];

export const FOOT_NAV = [
  ...NAV,
  { href: "/claude2/obrigado", label: "Já comprei" },
  { href: "/claude-code", label: "Claude Code na Prática" },
  { href: "/loja", label: "Marketplace" },
];

export const MARCA = {
  nome: "Claude Code — Capacidade",
  sub: "Para quem já programa e só precisa de janela.",
};

export const HERO = {
  eyebrow: "Para quem já usa a ferramenta",
  h1a: "Você já sabe o que pedir.",
  h1b: "O que trava é a janela fechar no meio.",
  lede: "Esta oferta não ensina a usar o Claude Code. Entrega acesso configurado com até 1 milhão de tokens a cada 5 horas, para você trabalhar num projeto de verdade sem parar a cada pouco para esperar a renovação.",
};

export const TICKS = [
  "Acesso configurado, sem montar gateway por conta própria;",
  "Até 1 milhão de tokens por janela de 5 horas;",
  "Instruções de conexão com o seu ambiente;",
  "Suporte na configuração inicial.",
];

export const DORES = [
  "Você está a meio de um refactor e a janela acaba.",
  "Perde o fio ao contexto que já tinha dado.",
  "Volta meia hora depois e o projeto já não está na cabeça.",
  "Reduz o pedido para caber na janela — e o resultado fica pior.",
];

export const PASSOS = [
  { n: "01", t: "Conecte", d: "Recebe as instruções e liga o acesso ao seu ambiente." },
  { n: "02", t: "Programe", d: "Trabalha no projeto com até 1 milhão de tokens por janela." },
  { n: "03", t: "Renove", d: "Ao atingir o limite, o sistema avisa e a janela seguinte abre." },
];

export const RECEBE = [
  {
    t: "Acesso configurado",
    p: "O gateway já vem montado. Você recebe o que precisa para ligar ao seu ambiente e não gasta uma tarde a configurar.",
    ico: '<path d="M12 3v18"/><path d="M5 8h14"/><path d="M5 16h14"/>',
  },
  {
    t: "1 milhão de tokens por janela",
    p: "Cada janela de 5 horas tem até 1 milhão de tokens. É o suficiente para um ciclo completo de trabalho num projeto médio.",
    ico: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
  },
  {
    t: "Instruções de conexão",
    p: "Passo a passo testado para ligar o acesso ao seu ambiente, com os comandos e o que verificar em cada etapa.",
    ico: '<path d="M4 6h16v12H4z"/><path d="M8 10l2 2-2 2"/><path d="M13 14h3"/>',
  },
  {
    t: "Suporte na configuração",
    p: "Se algo não ligar, o suporte orienta nos passos de conexão e teste até o acesso responder.",
    ico: '<path d="M4 12a8 8 0 1 1 3 6.2"/><path d="M4 18v-5h5"/>',
  },
];

export const PLANOS = [
  {
    lvl: "1M",
    t: "Janela de 1 milhão",
    para: "Para um projeto em curso",
    mini: [
      "1 milhão de tokens a cada 5 horas;",
      "Acesso configurado;",
      "Instruções de conexão;",
      "Suporte na configuração inicial.",
    ],
  },
  {
    lvl: "5M",
    t: "Janela de 5 milhões",
    para: "Para vários projetos ao mesmo tempo",
    mini: [
      "5 milhões de tokens a cada 5 horas;",
      "Tudo o que o plano de 1M inclui;",
      "Menos interrupções no meio do trabalho.",
    ],
    flag: "Plano acima",
  },
];

export const GARANTIA = [
  {
    t: "Reembolso",
    p: "",
  },
  {
    t: "Suporte",
    p: "Se a configuração não funcionar no seu ambiente, o suporte orienta nos passos de conexão, teste e integração até o acesso responder.",
    mini: [
      "Ajuda com a configuração;",
      "Orientação para executar os comandos;",
      "Apoio no teste do acesso.",
    ],
  },
];

export const FAQ = [
  {
    q: "Preciso saber programar?",
    a: "Sim — esta oferta não ensina a usar a ferramenta. É para quem já trabalha com Claude Code e quer mais capacidade por janela. Se você quer aprender a usar, a oferta certa é a Claude Code na Prática.",
  },
  {
    q: "Quanto tempo dura o acesso?",
    a: "", // preenchido com o marcador de pendente em Landing2Page
  },
  {
    q: "Posso pedir reembolso?",
    a: "", // idem
  },
  {
    q: "O serviço é ilimitado?",
    a: "Não. São até 1 milhão de tokens por janela de 5 horas. Ao atingir o limite, o sistema avisa e você espera a janela seguinte abrir. Não há cobrança por excedente.",
  },
  {
    q: "Como recebo o acesso depois de pagar?",
    a: "", // idem
  },
  {
    q: "Consigo usar num projeto que já está a meio?",
    a: "Sim. O acesso serve qualquer projeto no seu ambiente. A diferença está na janela: quanto maior, menos vezes o trabalho para no meio.",
  },
];

/* ─────────────────────────────────────────────────────────────
   /claude2/obrigado — copy do utilizador
   ───────────────────────────────────────────────────────────── */

export const OBRIGADO = {
  titulo: "Pagamento confirmado",
  lede: "Seu pagamento foi confirmado. Seu acesso está disponível abaixo.",
  passos: [
    "Copie as instruções de configuração;",
    "Siga o passo a passo indicado;",
    "Conecte o acesso ao seu ambiente;",
    "Comece a trabalhar no seu projeto com mais capacidade.",
  ],
  /**
   * Pares campo/valor, já separados — e não frases com «: » para partir depois.
   * A primeira linha da copy original («Até 1 milhão de tokens…;») não tem
   * separador nenhum, e uma divisão automática deixava-a como rótulo sem valor.
   */
  capacidade: [
    { k: "Tokens", v: "Até 1 milhão por janela de 5 horas" },
    { k: "Produto", v: "acesso Claude Code" },
    { k: "Plano adquirido", v: "R$ 75" },
  ],
  skillTitulo: "Comprou uma skill adicional?",
  skillLede: "Se você também adquiriu uma skill, o acesso aparece abaixo:",
  ajudaTitulo: "Precisa de ajuda?",
  ajudaLede: "Fale com o suporte pelo WhatsApp:",
  ajudaBotao: "Chamar o suporte",
  msgPreenchida: "Olá! Acabei de realizar a compra e preciso de ajuda para configurar meu acesso.",
};

/**
 * Notas de operação do utilizador — não são copy de cliente. Falam de estorno
 * e de registo de pedido; ficam em painel marcado como interno.
 */
export const NOTAS_INTERNAS = [
  "Acesso protegido por login;",
  "Link individual ou de uso único;",
  "Credencial exibida somente após confirmação do pagamento;",
  "Registro do pedido e do produto comprado;",
  "Bloqueio caso o pagamento seja estornado;",
  "Área separada para o acesso principal e para as skills adicionais.",
];
