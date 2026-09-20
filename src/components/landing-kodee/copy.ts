/**
 * Copy da landing Kodee (/claude-kodee).
 *
 * Todo o texto vem da copy enviada pelo usuário — nada é inventado. A
 * estrutura segue a versão aprovada: hero, dor, solução, como funciona,
 * oferta, quebra de objeções, CTA final e perguntas frequentes.
 */

export const BRAND = "Kodee";

export const HERO = {
  eyebrow: "Para quem já usa Claude Code e não quer parar",
  headlinePre: "Seu projeto ",
  headlineHl: "não precisa parar",
  headlinePost: " quando o limite do Claude Code acaba.",
  sub:
    "Continue programando, criando sites, desenvolvendo sistemas e trabalhando em automações com mais capacidade de uso pela API do Claude.",
  ticks: ["Até 1 milhão de tokens", "Renovação a cada 5 horas"],
  cta: "Quero continuar meu projeto",
  micro: "Acesso rápido. Mais capacidade. Menos tempo esperando.",
  stats: [
    { b: "1M", s: "de tokens para continuar" },
    { b: "5h", s: "de renovação a cada janela" },
    { b: "R$ 75", s: "para continuar seu projeto" },
  ],
  mockLines: [
    { cls: "line", pmt: "›", text: " continuar meu projeto" },
    { cls: "line dim", text: "⏺ limite do Claude Code detectado" },
    { cls: "line dim", text: "⏺ conectando pela API do Claude" },
    { cls: "line ok", text: "✔ Kodee pronta · 1M tokens / 5h" },
    { cls: "line", pmt: "›", caret: true },
  ],
};

export const DOR = {
  eyebrow: "O problema",
  h2: "O limite apareceu no pior momento?",
  paras: [
    "Você estava no meio de uma implementação.",
    "Ou corrigindo um bug importante.",
    "Ou finalmente avançando naquela ideia que estava parada.",
    "Então o limite do Claude Code chegou.",
    "Agora você precisa esperar a renovação para continuar, mesmo quando ainda está no ritmo e sabe exatamente o que precisa fazer.",
  ],
  costLead: "Essa espera custa:",
  costs: ["Tempo", "Concentração", "Velocidade", "Oportunidades de entrega"],
  impact: "Seu fluxo de trabalho não deveria depender de uma tela de limite.",
};

export const SOLUTION = {
  eyebrow: "A solução",
  h2: "Continue construindo com a API do Claude Code",
  lede:
    "A Kodee oferece uma forma prática de continuar usando a API do Claude quando o limite do Claude Code atrapalha seu projeto. Você ganha mais capacidade para continuar:",
  uses: [
    "Programando",
    "Criando sites",
    "Desenvolvendo sistemas",
    "Construindo automações",
    "Trabalhando em SaaS",
    "Refatorando aplicações",
    "Estudando e testando novas ideias",
  ],
  close: "Quando a ideia está fluindo, você não precisa parar.",
  cta: "Quero usar a Kodee",
};

export const STEPS = {
  eyebrow: "Como funciona",
  h2: "Começar é simples",
  steps: [
    {
      t: "Você atinge o limite",
      d: "O Claude Code informa que seu uso chegou ao limite.",
    },
    {
      t: "Você acessa a Kodee",
      d: "Use a solução da Kodee para continuar seu projeto pela API do Claude.",
    },
    {
      t: "Você volta a construir",
      d: "Continue programando sem precisar abandonar o fluxo da sua tarefa.",
    },
  ],
  cta: "Continuar agora",
};

export const OFFER = {
  eyebrow: "A oferta",
  h2: "Continue seu projeto por R$ 75",
  receiveTitle: "Você recebe",
  receive: [
    "Até 1 milhão de tokens",
    "Renovação a cada 5 horas",
    "Acesso à API do Claude pela Kodee",
    "Mais capacidade para continuar seus projetos",
  ],
  priceTag: "Kodee",
  priceNote: "Sem esperar o limite do Claude Code renovar para voltar ao seu projeto.",
  cta: "Quero continuar programando",
};

export const OBJECTIONS = {
  eyebrow: "Antes de decidir",
  h2: "As dúvidas que aparecem no meio do projeto",
  items: [
    {
      q: "Eu preciso esperar o limite renovar?",
      a: "Não necessariamente. A Kodee foi criada para ajudar você a continuar usando a API do Claude quando o limite do Claude Code interromper seu fluxo.",
    },
    {
      q: "Posso usar para projetos maiores?",
      a: "Sim. A solução é voltada para quem trabalha em projetos de programação, sites, sistemas, automações e SaaS.",
    },
    {
      q: "Quanto eu recebo?",
      a: "A oferta inclui até 1 milhão de tokens, com renovação a cada 5 horas, pelo valor de R$ 75.",
    },
    {
      q: "É para quem está começando?",
      a: "A utilização depende da configuração e das condições de acesso à API. A Kodee é indicada para tarefas de desenvolvimento, programação, automação e criação de sistemas.",
    },
  ],
};

export const FAQ = {
  eyebrow: "Dúvidas",
  h2: "Perguntas frequentes",
  lede:
    "A Kodee é especialmente útil para quem já usa Claude Code e precisa de mais capacidade para continuar seus projetos.",
  items: [
    {
      q: "Funciona para qualquer tarefa?",
      a: "A utilização depende da configuração e das condições de acesso à API. A Kodee é indicada para tarefas de desenvolvimento, programação, automação e criação de sistemas.",
    },
  ],
};

export const FINAL = {
  h2: "Não deixe o limite interromper uma boa ideia",
  lines: [
    "Seu projeto já está em andamento.",
    "Você já sabe o que precisa construir.",
    "Não perca o ritmo por causa da espera.",
    "Continue programando com a Kodee.",
  ],
  cta: "Quero acessar a Kodee",
  micro: "Até 1 milhão de tokens. Renovação a cada 5 horas. R$ 75.",
};

export const FOOT_NAV = [
  { href: "#kodee", label: "A solução" },
  { href: "#como-funciona", label: "Como funciona" },
  { href: "#oferta", label: "Oferta" },
  { href: "#faq", label: "Perguntas frequentes" },
];

export const TOPNAV = [
  { href: "#kodee", label: "A solução" },
  { href: "#como-funciona", label: "Como funciona" },
  { href: "#oferta", label: "Oferta" },
  { href: "#faq", label: "Dúvidas" },
];
