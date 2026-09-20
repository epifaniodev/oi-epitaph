# INSTRUCTION.md — configuração do servidor e da API

Instruções para o agente com acesso ao servidor. O que falta depois de receber
este commit: **definir o segredo da API**, escolher o alvo de deploy e publicar.

## O que está neste commit

O projeto deixou de ser o scaffold em branco da Lovable. Passou a ser:

| Rota | Página |
|---|---|
| `/` e `/loja` | Catálogo Axye completo |
| `/loja/proxies`, `/loja/claude`, `/loja/emails`, … | Catálogo filtrado por secção |
| `/loja/claude-code` | Alias → redireciona (301) para `/claude-code` |
| `/claude-code` | Landing "Claude Code na Prática" |
| `/tutorial`, `/suporte` | Páginas de ajuda da loja |

O catálogo vem da API Axye e é **autenticado**. O browser nunca vê a chave: as
chamadas saem de server functions (`src/lib/catalog.functions.ts`), que correm no
servidor.

---

## 1. O segredo (passo obrigatório)

Sem isto o catálogo responde com erro. A chave **nunca** entra no repositório —
só no ambiente do servidor.

**No Cloudflare Workers** (alvo do build atual, ver `.output/nitro.json`):

```bash
npx wrangler secret put AXYE_API_KEY
```

Cola o valor quando pedir. Para o ambiente de testes, `.dev.vars` local (está no
`.gitignore`):

```
AXYE_API_KEY=<valor>
```

**Em Node** (se mudares de alvo, ver secção 3), um `.env` na raiz:

```
AXYE_API_KEY=<valor>
AXYE_BASE_URL=https://xydfessmlaghhgdkfhcz.supabase.co/functions/v1/public-api
```

`AXYE_BASE_URL` é opcional — sem ele usa-se o URL de produção acima.

> `process.env` é lido **dentro** do `.handler()` de cada server function, nunca
> no topo do módulo: em runtime de edge o módulo é avaliado antes de o ambiente
> existir, e uma leitura no escopo do módulo encontra `undefined`.

## 2. Instalar e correr

O repositório tem `bun.lock`, mas o `package-lock.json` do npm também funciona:

```bash
npm install
npm run dev      # http://localhost:3000
```

Verificação rápida:

1. `/` → grelha com o catálogo completo.
2. `/loja/proxies` → só proxies.
3. `/loja/inexistente` → 404, **não** uma lista vazia.
4. `/loja/claude-code` → salta para `/claude-code`.
5. `/claude-code` → landing, com o CSS creme aplicado.
6. Sem `AXYE_API_KEY` → mensagem a dizer que falta o segredo (não uma página em
   branco).

## 3. Escolher o alvo de deploy

O build atual aponta para **Cloudflare Workers** (foi o que o scaffold da Lovable
configurou):

```bash
npm run build
npx wrangler deploy
```

**Se o destino for um VPS ou contentor Node**, muda o preset em
`vite.config.ts`:

```ts
export default defineConfig({
  tanstackStart: { server: { entry: "server" } },
  nitro: { preset: "node-server" },
});
```

E depois `node .output/server/index.mjs`, com `AXYE_API_KEY` no ambiente.

**Se for Apache/cPanel estático:** lê o aviso no fim. O catálogo não funciona
nesse cenário.

## 4. Cache

O catálogo vem de uma API autenticada. Nunca marcar a resposta como
`Cache-Control: public` — está atrás de uma chave, não é conteúdo público. A
configuração atual não define cache para as respostas de servidor, o que é o
comportamento seguro.

---

## Pendências que **não** foram resolvidas neste commit

Estas não são configuráveis pelo agente do servidor — precisam de decisão de quem
gere o produto.

### Quatro URLs de checkout vazias

Em `src/components/landing/checkout.ts`, as quatro constantes continuam vazias,
tal como estavam no original:

```ts
export const CHECKOUT_URL = "";
export const BUMP_URL = "";
export const UPGRADE_5M_URL = "";
export const CROSS_URL = "";
```

Consequência enquanto estiverem vazias: os botões das ofertas com identidade
própria (bump, upgrade 5M, skill de segmento, checkout principal) mantêm a âncora
`#oferta`. Funcionam como navegação, não como compra — **e não há forma de saber,
do lado do checkout, qual das ofertas o cliente escolheu.** Preencher com o link
de cada oferta.

### Preço inconsistente

A landing anuncia **R$ 75**; o produto `claude-code-1m-tokens` no catálogo está a
**R$ 49,90**. Um dos dois está errado.

### `og:image` e canonical precisam de URL absoluto

Em `src/routes/claude-code.tsx`, o `og:image` aponta para
`/claude-code/og-image.png` (caminho relativo). O Facebook resolve-o, o Twitter
não mostra imagem. Quando o domínio de produção estiver definido, trocar por URL
absoluto e acrescentar o `<link rel="canonical">`.

### O `.htaccess` só serve cenário Apache

`public/.htaccess` existe porque foi pedido, mas o build é Cloudflare Workers —
num Workers o ficheiro é ignorado. **Se o destino for Apache estático, a loja não
funciona:** não há runtime de servidor onde guardar a chave da API, e a chave não
pode ir para o browser. Nesse cenário só a landing `/claude-code` é servível; a
loja precisa de Node ou Workers.
