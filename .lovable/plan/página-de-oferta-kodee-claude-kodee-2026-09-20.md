# Página de oferta Kodee — /claude-kodee

## O que será construído

Nova landing de oferta para a Kodee (continuar programando pela API do Claude quando o limite do Claude Code acaba), no endereço **/claude-kodee**, usando a copy completa enviada pelo usuário e o mesmo visual das landings existentes (fundo creme `#f0eee6`, tipografia e componentes de `/claude-code`).

## Decisões já confirmadas

- Endereço: `/claude-kodee`
- Visual: mesmo das landings existentes (stylesheet `/claude-code/landing.css`)
- Checkout: pendente, como nas outras páginas — botões caem na âncora da oferta até o usuário enviar os links

## Estrutura da página (seguindo a copy, na ordem)

1. **Hero** — Headline: "Seu projeto não precisa parar quando o limite do Claude Code acaba." · Subheadline · Oferta (1M tokens / renovação a cada 5h ) · Botão "Quero continuar meu projeto" · Texto de apoio "Acesso rápido. Mais capacidade. Menos tempo esperando."
2. **Dor** — "O limite apareceu no pior momento?" com a lista do que a espera custa (tempo, concentração, velocidade, entregas)
3. **Solução** — "Continue construindo com a API do Claude Code" 
  &nbsp;
4. **Como funciona** — 3 passos: atinge o limite → acessa a Kodee → volta a construir + botão "Continuar agora"
  &nbsp;
5. **Oferta** — "Continue seu projeto por R$ 75" com os itens recebidos, preço e CTA "Quero continuar programando" + texto de segurança
6. **Quebra de objeções** — 4 perguntas e respostas da copy, incluindo "Funciona para qualquer tarefa?"
  1. **CTA final** — "Não deixe o limite interromper uma boa ideia" + botão "Quero acessar a Kodee" + texto "Até 1 milhão de tokens. Renovação a cada 5 horas. R$ 75."  
    
  Preciso colcar perguntas frequentes no final

## Arquivos

- `src/routes/claude-kodee.tsx` — rota nova com `head()` próprio: título, description, og:title/og:description, og:type, twitter:card, theme-color creme e locale pt_BR (mesmo padrão de `claude-code.tsx`; og:image fica por preencher até existir domínio de produção)
- `src/components/landing-kodee/KodeePage.tsx` — componente da página, reutilizando o stylesheet e o padrão visual de `src/components/landing/`
- `src/components/landing-kodee/copy.ts` — todos os textos da copy em um só lugar (mesmo padrão de `landing2/copy.ts`)

## Detalhes técnicos

- Os CTAs usam o mesmo mecanismo de `resolveCtaHref`: enquanto não houver link de checkout, apontam para `#oferta` (âncora da seção 7). Basta preencher uma constante depois para ligar o pagamento.
- Nada é inventado: preço R$ 75, tokens e textos vêm exatamente da copy enviada.
- A página não altera nenhuma rota existente.

## Verificação

- Confirmar que `/claude-kodee` responde 200 e renderiza todas as 9 seções.
- Confirmar que as rotas existentes continuam funcionando.
- Checar no preview que o visual acompanha o padrão das outras landings (desktop e mobile).