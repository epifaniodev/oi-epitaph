/**
 * Conteúdo da landing, separado do markup.
 *
 * Os textos são os do original (`public/claude-code/index.html`) — não foram
 * reescritos. Ficam aqui porque o markup desta página é quase todo listas
 * (cartões, degraus, casos de uso, FAQ) e misturá-las com o JSX tornava o
 * ficheiro da secção ilegível.
 */

export const TICKS = [
  "Tutorial de configuração passo a passo;",
  "Skill especializada para criação de landing pages;",
  "Prompts prontos para diferentes nichos;",
  "Demonstração completa de um projeto real;",
  "Acesso ao gateway com 1 milhão de tokens por janela de 5 horas.",
];

export const STEPS = [
  {
    n: "01",
    t: "Aprenda",
    d: "Entenda como configurar e orientar o Claude Code.",
  },
  {
    n: "02",
    t: "Aplique",
    d: "Use uma skill e prompts prontos para criar suas páginas.",
  },
  {
    n: "03",
    t: "Produza",
    d: "Transforme ideias em projetos visuais e funcionais.",
  },
];

export const QUESTIONS = [
  "O que devo pedir?",
  "Como estruturo o projeto?",
  "Como faço o Claude entender o resultado que quero?",
  "Como corrijo os erros?",
  "Como deixo a página responsiva?",
  "O que faço quando o projeto começa a exigir muitas alterações?",
];

export const FLOW = ["Ideia", "Briefing", "Prompt", "Código", "Revisão", "Landing page"];

export const RECEIVE: { ico: string; t: string; p: string; mini?: string[] }[] = [
  {
    ico: '<path d="M4 5h16v11H4zM8 20h8M12 16v4M8 9l2 2-2 2M13 13h3"/>',
    t: "Tutorial prático de configuração",
    p: "Aprenda a acessar as configurações, conectar a API, inserir as informações necessárias, testar a integração e iniciar o Claude Code.",
  },
  {
    ico: '<path d="m12 3 2.2 5.4L20 10l-4.4 3.4L16.4 19 12 15.9 7.6 19l.8-5.6L4 10l5.8-1.6z"/>',
    t: "Skill especializada em landing pages",
    p: "Uma skill que orienta o Claude Code a estruturar páginas, criar seções, escrever textos, aplicar estilos, adaptar o layout para celular, corrigir erros e melhorar o resultado.",
  },
  {
    ico: '<path d="M5 4h11l3 3v13H5zM8 9h8M8 13h8M8 17h5"/>',
    t: "5 prompts prontos",
    p: "Comece com estruturas preparadas para:",
    mini: [
      "Clínica de estética;",
      "Restaurante;",
      "Imobiliária;",
      "Escritório de advocacia;",
      "Loja online.",
    ],
  },
  {
    ico: '<path d="M3 6h13v12H3zM16 10l5-3v10l-5-3"/>',
    t: "Demonstração completa",
    p: "Acompanhe a criação de uma landing page desde o briefing até a revisão final, entendendo como dar instruções, pedir alterações, testar e corrigir o projeto.",
  },
  {
    ico: '<path d="M12 3v18M5 8h14M5 16h14"/>',
    t: "Orientação sobre uso",
    p: "Aprenda a trabalhar com mais contexto em projetos que pedem idas e voltas de teste e ajuste, dentro do limite de 1 milhão de tokens por janela de 5 horas.",
  },
];

export const TIMELINE = [
  {
    t: "Receba o material",
    d: "Acesse o tutorial, o Painel Cloud Code, a skill e os prompts.",
  },
  {
    t: "Configure o ambiente",
    d: "Siga os comandos enviados para conectar a API e testar a integração.",
  },
  {
    t: "Integre suas sessões",
    d: "Execute o prompt indicado para continuar seus projetos no novo provedor.",
  },
  {
    t: "Crie seu primeiro projeto",
    d: "Use a skill e um dos prompts prontos para começar sua landing page.",
  },
  {
    t: "Revise e melhore",
    d: "Peça alterações ao Claude Code, corrija problemas e refine o resultado final.",
  },
];

export const CASES = [
  {
    t: "Landing pages para clientes",
    d: "Crie páginas para profissionais e empresas de diferentes nichos, com estrutura, textos, visual e versão para celular.",
  },
  {
    t: "Páginas de vendas",
    d: "Organize uma oferta em uma página com headline, benefícios, prova, objeções e chamada para ação.",
  },
  {
    t: "Sites institucionais",
    d: "Monte páginas para empresas, profissionais liberais, restaurantes, lojas e prestadores de serviço.",
  },
  {
    t: "Protótipos de produtos digitais",
    d: "Transforme uma ideia em uma primeira versão visual para testar e apresentar.",
  },
  {
    t: "Projetos pessoais",
    d: "Crie portfólios, páginas de projetos, páginas de captura e experiências digitais para suas próprias ideias.",
  },
];

export const FIT_YES = [
  "Quer criar sites e páginas com inteligência artificial;",
  "Usa ou quer começar a usar Claude Code;",
  "É freelancer, designer, social media ou empreendedor;",
  "Tem ideias, mas não sabe transformá-las em código;",
  "Quer criar protótipos e projetos digitais;",
  "Deseja aprender com um processo guiado;",
  "Está cansado de testar prompts sem saber o que está fazendo.",
];

export const FIT_NO = [
  "Procura uma ferramenta que faça tudo sozinha;",
  "Não quer executar nenhuma etapa de configuração;",
  "Espera acesso ilimitado;",
  "Não pretende colocar o processo em prática;",
  "Busca só conversar com um chatbot, sem criar projetos.",
];

export const DIFF_ROWS: [string, string][] = [
  ["Prompts aleatórios", "Skill e instruções estruturadas"],
  ["Tentativa e erro", "Etapas organizadas"],
  ["Projeto começa e trava", "Configuração preparada para mais contexto"],
  ["Não sabe corrigir", "Aprende a revisar e pedir alterações"],
  ["Não sabe por onde começar", "Prompts prontos por nicho"],
];

export const OFFER_TICKS = [
  "Tutorial de configuração;",
  "Painel Cloud Code;",
  "Skill para landing pages;",
  "Cinco prompts por nicho;",
  "Demonstração completa;",
  "Orientação sobre tokens;",
  "Suporte ao cliente;",
  "Garantia de 7 dias para pedir reembolso.",
];

export const LADDER = [
  {
    lvl: "1M",
    t: "Uma página por janela",
    for: "Para publicar a primeira página e aprender o processo.",
    mini: [
      "Você revisa e ajusta a página no mesmo dia;",
      "Cabe a configuração, a skill e o primeiro projeto.",
    ],
  },
  {
    lvl: "5M",
    flag: "Próximo nível",
    t: "Cinco páginas por janela",
    for: "Para quem atende mais de um cliente por mês.",
    mini: [
      "Você cria uma página de manhã e outra à tarde;",
      "Dá para revisar a página do cliente sem parar o seu próprio projeto.",
    ],
    upgrade: true,
  },
  {
    lvl: "10M",
    flag: "Recomendado com clone",
    t: "Dez páginas por janela",
    for: "Para agência pequena ou freelancer com fila de pedidos.",
    mini: [
      "Você mantém dois projetos abertos ao mesmo tempo;",
      "Publicar uma página não interrompe a criação da seguinte.",
    ],
  },
  {
    lvl: "20–40M",
    t: "Trabalho contínuo",
    for: "Para quem usa o Claude Code todo dia como ferramenta de trabalho.",
    mini: [
      "Vários clientes na mesma semana sem olhar para o limite;",
      "Refazer, testar e descartar versões deixa de custar o dia.",
    ],
  },
];

export const CROSS = [
  {
    ico: '<path d="M12 3l7 3v6c0 4.2-2.9 7.6-7 9-4.1-1.4-7-4.8-7-9V6z"/><path d="M12 8v4M12 15h.01"/>',
    t: "Saúde e estética",
    d: "Estrutura para quem vende procedimento: antes e depois, tempo de recuperação, quem pode fazer e o que responder antes do cliente perguntar.",
    hook: "Reduz a objeção do preço antes de ela aparecer.",
  },
  {
    ico: '<path d="M4 10h16M6 10V7a6 6 0 0 1 12 0v3M6 10l1 10h10l1-10"/>',
    t: "Alimentação e restaurantes",
    d: "Estrutura para quem vende experiência: cardápio em destaque, ambiente, reserva sem fricção e localização que abre no mapa.",
    hook: "O cliente decide pela foto e reserva pelo botão.",
  },
  {
    ico: '<path d="M3 11l9-7 9 7v9a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1z"/><path d="M9 21v-7h6v7"/>',
    t: "Imobiliárias",
    d: "Estrutura para quem vende imóvel: ficha do imóvel, galeria, valor de entrada, bairro e agendamento de visita direto na página.",
    hook: "Separa quem pesquisa de quem quer visitar esta semana.",
  },
  {
    ico: '<path d="M12 4v16M8 8h6a2.5 2.5 0 0 1 0 5H8h6a2.5 2.5 0 0 1 0 5H8"/>',
    t: "Advocacia",
    d: "Estrutura para quem vende confiança: áreas de atuação, como funciona o atendimento, sigilo e o que o cliente precisa trazer na primeira conversa.",
    hook: "Explica o processo antes de o cliente pedir orçamento.",
  },
  {
    ico: '<path d="M5 8h14l-1 12H6zM9 8V6a3 3 0 0 1 6 0v2"/>',
    t: "Loja online",
    d: "Estrutura para quem vende produto: vitrine, prova social com foto, política de troca visível e um caminho de compra sem desvio.",
    hook: "Tira a dúvida da troca antes de ela virar desistência.",
  },
];

export const FAQ: { q: string; a: string }[] = [
  {
    q: "Preciso saber programar?",
    a: "Não é necessário dominar programação para começar, mas você precisará seguir as instruções de configuração e executar alguns comandos no ambiente indicado.",
  },
  {
    q: "O acesso é ilimitado?",
    a: "Não. O serviço oferece 1 milhão de tokens por janela de 5 horas. Terminada a janela, o limite é restabelecido.",
  },
  {
    q: "O que acontece quando atinjo o limite?",
    a: "O sistema exibirá uma notificação informando que o limite da janela foi atingido. Será necessário aguardar a renovação da janela.",
  },
  {
    q: "Posso usar em qualquer ferramenta?",
    a: "O gateway pode ser usado em ambientes compatíveis com a API. A compatibilidade deve ser verificada antes da configuração.",
  },
  {
    q: "Posso usar no Claude Code?",
    a: "Sim, a oferta foi estruturada para orientar a configuração e o uso no Claude Code.",
  },
  {
    q: "Posso conectar ao Hermes Agent?",
    a: "Sim, se o ambiente aceitar a API do gateway. O material traz as instruções de conexão e o suporte orienta a configuração.",
  },
  {
    q: "O que acontece quando minha assinatura expira?",
    a: "O acesso será interrompido e o sistema exibirá uma notificação informando a expiração.",
  },
  {
    q: "Tenho suporte?",
    a: "Sim. Existe suporte para orientar a configuração e esclarecer dúvidas sobre o funcionamento do serviço.",
  },
  {
    q: "Existe garantia?",
    a: "Sim. Você tem 7 dias para pedir o reembolso pelo suporte, com o e-mail usado na compra.",
  },
];

export const NAV = [
  { href: "#como-funciona", label: "Como funciona" },
  { href: "#o-que-recebe", label: "O que você recebe" },
  { href: "#casos-de-uso", label: "Casos de uso" },
  { href: "#capacidade-extra", label: "Planos" },
];

export const FOOT_NAV = [
  ...NAV,
  { href: "#skills-segmento", label: "Skills por segmento" },
  { href: "#faq", label: "FAQ" },
  { href: "/loja", label: "Marketplace" },
];

export const SVG_PROPS = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.8,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};
